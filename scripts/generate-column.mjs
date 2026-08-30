/**
 * コラム記事を1本自動生成して content/columns に追加する（GitHub Actions から毎日実行）。
 *
 * 使い方: ANTHROPIC_API_KEY=... node scripts/generate-column.mjs [--dry-run] [--topic <slug>]
 *
 * 流れ: topics.json から未作成のトピックを選ぶ → Claude で構造化出力（JSON）を生成
 *      → 禁止表現・リンク先・分量・類似度を検証 → content/columns/<slug>.ts を書き出し
 *      → content/columns/index.ts の [auto-import] / [auto-list] マーカーに登録
 * 生成に失敗した場合は何も書き込まず、終了コード1で終了する。
 */
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const COLUMNS_DIR = path.join(ROOT, "content/columns");
const SYMPTOMS_DIR = path.join(ROOT, "content/symptoms");
const MODEL = process.env.COLUMN_MODEL ?? "claude-opus-5";
const DRY_RUN = process.argv.includes("--dry-run");
const TOPIC_ARG = (() => {
  const i = process.argv.indexOf("--topic");
  return i >= 0 ? process.argv[i + 1] : null;
})();

/* ---------- 院の事実（これ以外の事実は書かせない） ---------- */
const CLINIC_FACTS = `
- 院名: 清水接骨院（足立区扇2-35-8 パークハイツ扇1F南）。日暮里・舎人ライナー 高野駅 徒歩5分、扇大橋駅 徒歩6分。完全予約制。
- 院長: 清水 正尊。国家資格「柔道整復師」。施術歴30年以上、累計10万件超の施術経験。施術はすべて院長が担当。
- 施術方針: 痛い場所だけでなく身体全体（姿勢・関節の動き・筋肉の緊張・足元の荷重）を確認し、負担が集まる理由に働きかける。強く押したり無理に身体を鳴らしたりしないソフトな手技。筋膜・筋肉、骨格・骨盤のバランス、運動連鎖、トリガーポイントの考え方。施術後にセルフケア・生活習慣のアドバイス。足の測定（フットプリント）とインソールの相談が可能。
- 医療機関での確認が必要な状態のときは施術を行わず受診を勧める。自費施術。
`;

/* ---------- 表現ルール ---------- */
const FORBIDDEN = [
  "必ず治", "絶対に治", "絶対安全", "完治", "100%", "１００％", "根本改善", "根本治療", "No.1", "ナンバーワン", "口コミ1位", "1位", "最大級",
  "手術不要", "手術を回避", "一回で治", "1回で治", "診断します", "診断いたし", "診療", "治療します", "治療を行います", "治療いたし", "効果を保証", "保証します",
  "痛みが消えます", "改善します。", "必ず改善", "治ります", "治せます", "雑誌掲載", "テレビで紹介",
];

const STYLE_RULES = `
あなたは接骨院のウェブサイトに掲載する、一般の方向けの健康コラムのライターです。以下のルールを厳守してください。
1. 医学的な断定・効果の保証をしない。「〜と考えられています」「〜とされています」「〜を目指します」「効果には個人差があります」の表現を使う。
2. 禁止表現: ${FORBIDDEN.join("、")}。「治る」「治療」「診断」「専門」「根本」は、医療機関の行為として説明する場合を除き使わない（接骨院の施術には「施術」「身体の状態確認」を使う）。
3. 医療機関を受診すべき目安（レッドフラッグ）を、本文中に必ず「> 」で始まる注記ブロックとして1つ以上入れる。緊急性の高い症状（麻痺・排尿排便の異常・発熱・外傷後・突然の激しい痛み等）はテーマに合わせて具体的に書く。
4. 実在しない統計・研究名・数値・症例・口コミ・人物を作らない。院の事実は与えられたものだけを使う。他院や医療機関との比較優良をしない。
5. 文体: です・ます調。一文は60文字以内を目安。専門用語には短い説明を添える。高齢の読者にも読みやすく。
6. 地域名（足立区・扇・高野駅・扇大橋駅）は自然な範囲で1〜3回。キーワードの羅列はしない。
7. 構成: 「## 」見出しを5〜8個。最初の見出しの前に導入文（読者の状況に寄り添う2〜3段落）。最後の見出しは「清水接骨院での考え方」とし、対象の症状ページへ [症状名のページ](/symptoms/slug) 形式でリンクする。本文中に既存コラムへのリンクを2〜3本、[記事タイトル](/column/slug) 形式で入れる（与えられた一覧のslugのみ使用）。
8. 箇条書きは「- 」、番号付きは「1. 」、強調は **太字**。表・HTML・画像・絵文字は使わない。
9. 本文は日本語で1,800〜3,200文字。descriptionは110〜130文字で地域名と症状を含める。titleは32〜45文字、focusKeywordの語を自然に含める。summaryは記事の要点を3〜4項目、各40〜70文字。
`;

const ArticleSchema = z.object({
  title: z.string(),
  description: z.string(),
  summary: z.array(z.string()),
  body: z.string(),
  relatedSymptoms: z.array(z.string()),
  relatedArticles: z.array(z.string()),
});

/* ---------- 既存コンテンツの読み込み ---------- */
function readTs(dir) {
  return fs.readdirSync(dir).filter((f) => f.endsWith(".ts") && f !== "index.ts").map((f) => ({ file: f, slug: f.replace(/\.ts$/, ""), src: fs.readFileSync(path.join(dir, f), "utf8") }));
}
const symptomFiles = readTs(SYMPTOMS_DIR);
const articleFiles = readTs(COLUMNS_DIR);
const symptomList = symptomFiles.map((s) => ({ slug: s.slug, name: (s.src.match(/^\s*name: "([^"]+)"/m) || [])[1] ?? s.slug }));
const articleList = articleFiles.map((a) => ({ slug: a.slug, title: (a.src.match(/^\s*title: "([^"]+)"/m) || [])[1] ?? a.slug }));
const existingSlugs = new Set(articleList.map((a) => a.slug));

const topicsJson = JSON.parse(fs.readFileSync(path.join(COLUMNS_DIR, "topics.json"), "utf8"));
const topic = TOPIC_ARG ? topicsJson.topics.find((t) => t.slug === TOPIC_ARG) : topicsJson.topics.find((t) => !existingSlugs.has(t.slug));
if (!topic) {
  console.log("生成するトピックがありません（topics.json のすべてが記事化済み）。");
  process.exit(0);
}
if (existingSlugs.has(topic.slug) && !TOPIC_ARG) {
  console.log("既に存在します:", topic.slug);
  process.exit(0);
}
console.log("topic:", topic.slug, "-", topic.title);

/* ---------- 生成 ---------- */
const client = new Anthropic();
const system = `${STYLE_RULES}\n\n【院の事実】${CLINIC_FACTS}\n\n【症状ページ一覧（slug: 名称）】\n${symptomList.map((s) => `- ${s.slug}: ${s.name}`).join("\n")}\n\n【既存コラム一覧（slug: タイトル）】\n${articleList.map((a) => `- ${a.slug}: ${a.title}`).join("\n")}`;
const user = `次のトピックでコラム記事を作成してください。
- 仮タイトル: ${topic.title}
- 狙う検索語: ${topic.focusKeyword}
- 切り口: ${topic.angle}
- 対象の症状ページ（relatedSymptoms に含め、本文からもリンクする）: ${topic.targetSymptoms.join(", ")}
- カテゴリ: ${topic.category}
relatedArticles には既存コラムから関連の強いもののslugを2〜4本選んでください。`;

async function generate() {
  // 既定: サーバー側フォールバック付きのベータ呼び出し（安全性による拒否時に別モデルへ自動切替）
  try {
    const res = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system,
      messages: [{ role: "user", content: user }],
      output_config: { format: zodOutputFormat(ArticleSchema) },
    });
    if (res.stop_reason === "refusal") throw new Error(`refusal: ${JSON.stringify(res.stop_details)}`);
    const text = res.content.filter((b) => b.type === "text").map((b) => b.text).join("");
    return ArticleSchema.parse(JSON.parse(text));
  } catch (e) {
    if (e instanceof Anthropic.BadRequestError) {
      // ベータのパラメータが使えない環境では通常の構造化出力にフォールバック
      console.warn("beta call rejected, falling back to messages.parse:", e.message);
      const res = await client.messages.parse({
        model: MODEL,
        max_tokens: 16000,
        system,
        messages: [{ role: "user", content: user }],
        output_config: { format: zodOutputFormat(ArticleSchema) },
      });
      if (!res.parsed_output) throw new Error("parsed_output is null");
      return res.parsed_output;
    }
    throw e;
  }
}

/* ---------- 検証 ---------- */
function bigrams(s) {
  const t = s.replace(/\s+/g, "");
  const set = new Set();
  for (let i = 0; i < t.length - 1; i++) set.add(t.slice(i, i + 2));
  return set;
}
function jaccard(a, b) {
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

function validate(a) {
  const errors = [];
  const all = `${a.title}\n${a.description}\n${a.summary.join("\n")}\n${a.body}`;
  for (const w of FORBIDDEN) if (all.includes(w)) errors.push(`禁止表現: ${w}`);
  const bodyLen = a.body.replace(/\s+/g, "").length;
  if (bodyLen < 1600 || bodyLen > 3600) errors.push(`本文の長さが範囲外: ${bodyLen}`);
  if (a.title.length < 20 || a.title.length > 50) errors.push(`titleの長さ: ${a.title.length}`);
  if (a.description.length < 80 || a.description.length > 140) errors.push(`descriptionの長さ: ${a.description.length}`);
  if (a.summary.length < 3 || a.summary.length > 4) errors.push(`summaryの数: ${a.summary.length}`);
  if ((a.body.match(/^## /gm) || []).length < 4) errors.push("## 見出しが少ない");
  if (!/^>\s?/m.test(a.body)) errors.push("受診目安の注記ブロック（>）がない");
  for (const m of a.body.matchAll(/\]\((\/[^)]+)\)/g)) {
    const href = m[1];
    if (href.startsWith("/symptoms/")) {
      if (!symptomList.some((s) => s.slug === href.slice("/symptoms/".length))) errors.push(`存在しない症状リンク: ${href}`);
    } else if (href.startsWith("/column/")) {
      if (!existingSlugs.has(href.slice("/column/".length))) errors.push(`存在しないコラムリンク: ${href}`);
    } else if (!["/treatment", "/first", "/price", "/access", "/faq", "/staff", "/about", "/cases", "/voice"].includes(href)) {
      errors.push(`想定外のリンク: ${href}`);
    }
  }
  if (!a.relatedSymptoms.length) errors.push("relatedSymptoms が空");
  for (const s of a.relatedSymptoms) if (!symptomList.some((x) => x.slug === s)) errors.push(`relatedSymptoms に不明なslug: ${s}`);
  for (const s of a.relatedArticles) if (!existingSlugs.has(s)) errors.push(`relatedArticles に不明なslug: ${s}`);
  if (a.relatedArticles.length < 2) errors.push("relatedArticles が2本未満");
  const bg = bigrams(a.body);
  for (const ex of articleFiles) {
    const m = ex.src.match(/body: `([\s\S]*?)`,\s*relatedSymptoms/);
    if (!m) continue;
    const sim = jaccard(bg, bigrams(m[1]));
    if (sim > 0.45) errors.push(`既存記事と類似: ${ex.slug} (${sim.toFixed(2)})`);
  }
  return errors;
}

/* ---------- 書き出し ---------- */
function camel(slug) {
  return slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}
function tsString(s) {
  return JSON.stringify(s);
}
function todayJst() {
  const d = new Date(Date.now() + 9 * 3600 * 1000);
  return d.toISOString().slice(0, 10);
}

function writeArticle(a) {
  const name = camel(topic.slug);
  const date = todayJst();
  const body = a.body.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
  const ts = `import type { Article } from "@/content/types";

/** 自動生成（scripts/generate-column.mjs / ${date}）。公開前に院長が内容を確認してください。 */
export const ${name}: Article = {
  slug: ${tsString(topic.slug)},
  title: ${tsString(a.title)},
  description: ${tsString(a.description)},
  category: ${tsString(topic.category)},
  publishedAt: ${tsString(date)},
  updatedAt: ${tsString(date)},
  image: ${tsString(topic.image ?? "explanation-spine-1")},
  summary: [
${a.summary.map((s) => `    ${tsString(s)},`).join("\n")}
  ],
  body: \`
${body.trim()}
\`,
  relatedSymptoms: [${a.relatedSymptoms.map(tsString).join(", ")}],
  relatedArticles: [${a.relatedArticles.map(tsString).join(", ")}],
};
`;
  const file = path.join(COLUMNS_DIR, `${topic.slug}.ts`);
  fs.writeFileSync(file, ts);

  const indexPath = path.join(COLUMNS_DIR, "index.ts");
  let index = fs.readFileSync(indexPath, "utf8");
  index = index.replace("// [auto-import]", `import { ${name} } from "./${topic.slug}";\n// [auto-import]`);
  index = index.replace("  // [auto-list]", `  ${name},\n  // [auto-list]`);
  fs.writeFileSync(indexPath, index);
  console.log("wrote", file, "and registered in index.ts");
}

const article = await generate();
const errors = validate(article);
if (errors.length) {
  console.error("検証エラー:\n - " + errors.join("\n - "));
  console.error("\n--- 生成結果（未保存） ---\n" + JSON.stringify(article, null, 2).slice(0, 4000));
  process.exit(1);
}
if (DRY_RUN) {
  console.log(JSON.stringify(article, null, 2));
  process.exit(0);
}
writeArticle(article);
