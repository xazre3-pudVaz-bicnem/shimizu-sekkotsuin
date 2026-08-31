/**
 * サイト内の文章に、あはき・柔整の広告ガイドライン上で避けるべき表現が
 * 含まれていないかを検査する。
 * 実行: node scripts/validate-content.mjs （見つかれば終了コード1）
 */
import fs from "node:fs";
import path from "node:path";

/** 文字列は部分一致、正規表現はそのまま判定 */
const FORBIDDEN = [
  // 効果の保証・断定
  "必ず治", "絶対に治", "絶対安全", "完治", /100[%％]s*[のな]?s*(改善|回復|満足|効果|成功)/, /１００％s*[のな]?s*(改善|回復|満足|効果|成功)/, "効果を保証", "保証します",
  "痛みが消えます", "痛みが取れます", "痛みがなくなります", "必ず改善", /治ります(?!か)/, /治せます(?!か)/,
  "一回で治", "1回で治", "根本改善", "根本治療", "軟骨が再生",
  // 病気の進行・可動範囲への断定
  "進行を防", "進行を止め", "歩ける距離を伸ば",
  // 医療機関と誤認させる表現
  "診断します", "診断いたし", /診療(?!ガイドライン|所)/, "治療します", "治療を行います", "治療いたし",
  // 比較優良・費用や受療の過度な強調
  "No.1", "ナンバーワン", "口コミ1位", "最大級", "手術不要", "手術を回避",
  "雑誌掲載", "テレビで紹介", "残りわずか", "今すぐご予約", "限定価格", "特別価格",
];

/**
 * 打ち消し文脈の行は検査から除外する。
 * 例：「効果を保証するものではありません」「〜という表現は使用しません」
 */
const ALLOW_LINE = [
  "ものではありません",
  "ではありません",
  "ではないこと",
  "使用しません",
  "使いません",
  "は行いません",
  "とは限りません",
  "約束することはできません",
  "できません",
];

const hit = (line, w) => (typeof w === "string" ? line.includes(w) : w.test(line));
const label = (w) => (typeof w === "string" ? w : w.source);

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.tsx?$/.test(e.name)) out.push(p);
  }
  return out;
}

const dirs = ["content", "app", "components", "lib"];
const problems = [];

for (const dir of dirs) {
  for (const file of walk(dir)) {
    const lines = fs.readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      if (ALLOW_LINE.some((a) => line.includes(a))) return;
      for (const w of FORBIDDEN) {
        if (hit(line, w)) problems.push(`${file.replace(/\\/g, "/")}:${i + 1} 「${label(w)}」 ${line.trim().slice(0, 90)}`);
      }
    });
  }
}

if (problems.length) {
  console.error(`避けるべき表現が ${problems.length} 件見つかりました:`);
  for (const p of problems) console.error(" - " + p);
  process.exit(1);
}
console.log("content validation OK（避けるべき表現は見つかりませんでした）");
