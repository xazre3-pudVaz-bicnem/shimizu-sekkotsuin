// 症状ページ・コラムの本文に、広告ガイドライン上避けるべき表現が含まれていないかを検査する。
// 実行: node scripts/validate-content.mjs （見つかれば終了コード1）
import fs from "node:fs";
import path from "node:path";

// 文字列は部分一致、正規表現はそのまま判定。「〜治りますか？」のような患者さんの質問形は除外する。
const FORBIDDEN = [
  "必ず治", "絶対に治", "絶対安全", "完治", "100%", "１００％", "根本改善", "根本治療", "No.1", "ナンバーワン", "口コミ1位", "最大級",
  "手術不要", "手術を回避", "一回で治", "1回で治", "診断します", "診断いたし", "診療", "治療します", "治療を行います", "治療いたし", "効果を保証", "保証します",
  "痛みが消えます", "必ず改善", /治ります(?!か)/, /治せます(?!か)/, "雑誌掲載", "テレビで紹介",
];
const hit = (line, w) => (typeof w === "string" ? line.includes(w) : w.test(line));
const label = (w) => (typeof w === "string" ? w : w.source);

const dirs = ["content/symptoms", "content/columns"];
const problems = [];
for (const dir of dirs) {
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".ts") || f === "index.ts") continue;
    const src = fs.readFileSync(path.join(dir, f), "utf8");
    const lines = src.split("\n");
    lines.forEach((line, i) => {
      for (const w of FORBIDDEN) {
        if (hit(line, w)) problems.push(`${dir}/${f}:${i + 1} 「${label(w)}」 ${line.trim().slice(0, 80)}`);
      }
    });
  }
}

if (problems.length) {
  console.error(`避けるべき表現が ${problems.length} 件見つかりました:`);
  for (const p of problems) console.error(" - " + p);
  process.exit(1);
}
console.log("content validation OK");
