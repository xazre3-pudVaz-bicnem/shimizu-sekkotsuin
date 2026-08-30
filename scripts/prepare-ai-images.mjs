// AI生成のイメージ画像（ChatGPT Image *.png）とコラージュ切り出しタイルを、
// 意味のあるファイル名で public/images に配置し、content/images-ai.ts を生成する。
// 実行: node scripts/prepare-ai-images.mjs [tilesDir]
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "public/images";
const OUT = "public/images";
const ARCHIVE = "_source-photos/ai-images";
const TILES = process.argv[2] ?? "scratchpad/tiles";
const P = "ChatGPT Image 2026年8月31日 ";

// [元ファイル名, 出力キー, alt]
const singles = [
  [`${P}00_03_57 (1).png`, "illust-m-lower-back", "腰に手を当てて痛みを感じている男性のイラスト（腰痛のイメージ）"],
  [`${P}00_03_57 (2).png`, "illust-m-chronic-lower-back", "両手で腰を押さえる男性のイラスト（慢性的な腰痛のイメージ）"],
  [`${P}00_03_57 (3).png`, "illust-m-acute-lower-back", "急な腰の痛みに顔をしかめる男性のイラスト（ぎっくり腰のイメージ）"],
  [`${P}00_03_58 (4).png`, "illust-m-sciatica", "椅子に座り、腰からお尻・脚にかけて痛みが走る男性のイラスト（坐骨神経痛のイメージ）"],
  [`${P}00_03_59 (5).png`, "illust-m-herniation", "腰の背骨から脚にかけて痛みが走る男性のイラスト（椎間板ヘルニアのイメージ）"],
  [`${P}00_03_59 (6).png`, "illust-m-stenosis", "歩行中に腰から脚へ痛みが出ている男性のイラスト（脊柱管狭窄症・間欠性跛行のイメージ）"],
  [`${P}00_03_59 (7).png`, "illust-m-leg-numbness", "椅子に座り、しびれる脚を押さえる男性のイラスト（足のしびれのイメージ）"],
  [`${P}00_03_59 (8).png`, "illust-m-hip-pain", "股関節の付け根を押さえる男性のイラスト（股関節痛のイメージ）"],
  [`${P}00_04_00 (10).png`, "illust-m-neck-shoulder", "首から肩を押さえる男性のイラスト（肩こり・首の痛みのイメージ）"],
  [`${P}00_04_00 (9).png`, "illust-m-knee-pain", "膝を押さえて前かがみになる男性のイラスト（膝の痛みのイメージ）"],
  [`${P}00_04_05 (1).png`, "illust-f-lower-back", "腰に手を当てて痛みを感じている女性のイラスト（腰痛のイメージ）"],
  [`${P}00_04_05 (2).png`, "illust-f-chronic-lower-back", "両手で腰を押さえる女性のイラスト（慢性的な腰痛のイメージ）"],
  [`${P}00_04_06 (3).png`, "illust-f-acute-lower-back", "急な腰の痛みに顔をしかめる女性のイラスト（ぎっくり腰のイメージ）"],
  [`${P}00_04_06 (4).png`, "illust-f-sciatica", "椅子に座り、腰からお尻・脚にかけて痛みが走る女性のイラスト（坐骨神経痛のイメージ）"],
  [`${P}00_04_06 (5).png`, "illust-f-herniation", "腰の背骨から脚にかけて痛みが走る女性のイラスト（椎間板ヘルニアのイメージ）"],
  [`${P}00_04_07 (6).png`, "illust-f-stenosis", "歩行中に腰から脚へ痛みが出ている女性のイラスト（脊柱管狭窄症・間欠性跛行のイメージ）"],
  [`${P}00_04_07 (7).png`, "illust-f-leg-numbness", "椅子に座り、しびれる脚を押さえる女性のイラスト（足のしびれのイメージ）"],
  [`${P}00_04_07 (8).png`, "illust-f-hip-pain", "股関節の付け根を押さえる女性のイラスト（股関節痛のイメージ）"],
  [`${P}00_04_08 (10).png`, "illust-f-neck-shoulder", "首から肩を押さえる女性のイラスト（肩こり・首の痛みのイメージ）"],
  [`${P}00_04_08 (9).png`, "illust-f-knee-pain", "膝を押さえて前かがみになる女性のイラスト（膝の痛みのイメージ）"],
  [`${P}00_16_01 (1).png`, "photo-lower-back-sofa", "ソファに座って腰に手を当てる女性（イメージ）"],
  [`${P}00_16_01 (2).png`, "photo-lower-back-back-view", "後ろ姿で腰を押さえる女性（イメージ）"],
  [`${P}00_16_02 (4).png`, "photo-lower-back-standing", "リビングで立ったまま腰を押さえる女性（イメージ）"],
  [`${P}00_16_02 (5).png`, "photo-lower-back-sitting", "ソファに腰かけて腰を押さえる女性（イメージ）"],
  [`${P}00_16_04 (10).png`, "photo-lower-back-closeup", "腰に両手を当てる女性の後ろ姿（イメージ）"],
  [`${P}00_16_04 (7).png`, "photo-lower-back-closeup-2", "腰に手を当てる女性の上半身（イメージ）"],
  [`${P}00_16_04 (8).png`, "photo-lower-back-standing-2", "腰を押さえて立つ女性の横姿（イメージ）"],
  [`${P}00_16_04 (9).png`, "photo-lower-back-sitting-back-view", "座って腰を押さえる女性の後ろ姿（イメージ）"],
  [`${P}00_22_00 (1).png`, "photo-lower-back-standing-3", "腰を押さえて立つ女性（イメージ）"],
  [`${P}00_22_00 (2).png`, "photo-hip-sofa-man", "ソファで股関節の付け根から太ももを押さえる男性（イメージ）"],
  [`${P}00_22_00 (3).png`, "photo-knee-senior-woman", "ソファで膝を押さえる年配の女性（イメージ）"],
  [`${P}00_22_01 (4).png`, "photo-shoulder-desk-man", "パソコン作業中に肩を押さえる男性（イメージ）"],
  [`${P}00_22_01 (5).png`, "photo-neck-woman", "首の後ろを押さえる女性（イメージ）"],
  [`${P}00_22_02 (6).png`, "photo-headache-woman", "こめかみを押さえる女性（頭痛のイメージ）"],
  [`${P}00_22_02 (7).png`, "photo-hip-standing-man", "立ったまま腰から股関節を押さえる男性（イメージ）"],
  [`${P}00_22_02 (8).png`, "photo-calf-woman", "ソファに座ってふくらはぎを押さえる女性（イメージ）"],
  [`${P}00_22_03 (10).png`, "photo-shoulder-back-man", "後ろ姿で肩を押さえる男性（イメージ）"],
  [`${P}00_22_03 (9).png`, "photo-shoulder-senior-woman", "肩を押さえる年配の女性（四十肩・五十肩のイメージ）"],
  [`${P}00_24_36 (1).png`, "photo-lower-back-standing-4", "腰を押さえて立つ女性（イメージ）"],
  [`${P}00_24_37 (2).png`, "photo-hip-sofa-man-2", "ソファで股関節の付け根から太ももを押さえる男性（イメージ）"],
  [`${P}00_24_37 (3).png`, "photo-knee-senior-woman-2", "ソファで膝を押さえる年配の女性（イメージ）"],
  [`${P}00_24_37 (4).png`, "photo-neck-woman-2", "首の後ろを押さえる女性（イメージ）"],
  [`${P}00_24_38 (5).png`, "photo-shoulder-desk-man-2", "パソコン作業中に肩を押さえる男性（イメージ）"],
  [`${P}00_24_38 (6).png`, "photo-headache-woman-2", "こめかみを押さえる女性（頭痛のイメージ）"],
  [`${P}00_24_38 (7).png`, "photo-hip-standing-man-2", "立ったまま腰から股関節を押さえる男性（イメージ）"],
  [`${P}00_24_38 (8).png`, "photo-calf-woman-2", "ソファに座ってふくらはぎを押さえる女性（イメージ）"],
  [`${P}00_24_39 (10).png`, "photo-shoulder-back-man-2", "後ろ姿で肩を押さえる男性（イメージ）"],
  [`${P}00_24_39 (9).png`, "photo-shoulder-senior-woman-2", "肩を押さえる年配の女性（四十肩・五十肩のイメージ）"],
];

// コラージュ（切り出し済みタイル）: [タイルファイル名の接頭辞, 出力キーの接頭辞, alt配列]
const collages = [
  ["ChatGPT_Image_2026_8_31_00_04_16", "tile-a", [
    "腰に手を当てて座る女性（イメージ）", "膝を押さえて座る女性（イメージ）", "肩を押さえる女性（イメージ）", "パソコンの前で頭を抱える女性（イメージ）", "肩を押さえる女性（四十肩・五十肩のイメージ）",
    "首を押さえる女性（イメージ）", "座って股関節の付け根を押さえる女性（イメージ）", "腰を押さえる女性（イメージ）", "こめかみを押さえる女性（頭痛のイメージ）", "後ろ姿で腰を押さえる女性（イメージ）",
  ]],
  ["ChatGPT_Image_2026_8_31_00_04_38", "tile-b", [
    "ソファで腰を押さえる女性（イメージ）", "デスクワーク中に腰を押さえる男性（イメージ）", "立ったまま腰を押さえる女性（イメージ）", "後ろ姿で腰を押さえる男性（イメージ）", "腰を押さえる年配の男性（イメージ）",
    "寝室で腰を押さえる女性（イメージ）", "ソファで腰を押さえる年配の女性（イメージ）", "後ろ姿で腰を押さえる女性（イメージ）", "座って腰を押さえる女性（イメージ）", "オフィスチェアから立ち上がり腰を押さえる男性（イメージ）",
  ]],
  ["ChatGPT_Image_2026_8_31_00_05_29", "tile-c", [
    "ソファで腰を押さえる男性（イメージ）", "パソコン作業中に肩を押さえる男性（イメージ）", "肩を押さえる年配の女性（イメージ）", "膝を押さえる男性（イメージ）", "後ろ姿で首を押さえる男性（イメージ）",
    "こめかみを押さえる女性（頭痛のイメージ）", "階段の手すりにつかまり腰を押さえる年配の男性（イメージ）", "座って股関節の付け根を押さえる女性（イメージ）", "肩を押さえる女性（イメージ）", "後ろ姿で腰を押さえる女性（イメージ）",
  ]],
  ["ChatGPT_Image_2026_8_31_00_16_02_3_", "tile-d", [
    "腰に手を当てる女性（イメージ）", "座って膝を押さえる女性（イメージ）", "肩を押さえる女性（イメージ）", "テーブルで頭を押さえる女性（頭痛のイメージ）", "首から肩を押さえる女性（イメージ）",
    "首を押さえる女性（イメージ）", "ソファで腰を押さえる年配の女性（イメージ）", "パソコン作業中に腰を押さえる女性（イメージ）", "こめかみを押さえる女性（頭痛のイメージ）", "後ろ姿で腰を押さえる女性（イメージ）",
  ]],
  ["ChatGPT_Image_2026_8_31_00_16_03_6_", "tile-e", [
    "腰を押さえて立つ女性（イメージ）", "座って膝を押さえる女性（イメージ）", "肩を押さえる女性（イメージ）", "テーブルで頭を押さえる女性（頭痛のイメージ）", "首を押さえる女性（イメージ）",
    "ソファで首を押さえる女性（イメージ）", "ベッドの上で腰を押さえる女性（朝の腰痛のイメージ）", "座ってふくらはぎを押さえる女性（イメージ）", "腰に手を当てて立つ女性（イメージ）", "後ろ姿で肩を押さえる女性（イメージ）",
  ]],
];

// 症状ページ用OG画像（1200x630）: [slug, 画像キー]
const ogSymptoms = [
  ["lower-back-pain", "illust-f-lower-back"], ["chronic-lower-back-pain", "illust-m-chronic-lower-back"], ["acute-lower-back-pain", "illust-f-acute-lower-back"],
  ["sciatica", "illust-m-sciatica"], ["lumbar-disc-herniation", "illust-f-herniation"], ["spinal-stenosis", "illust-m-stenosis"], ["spondylolisthesis", "illust-m-herniation"],
  ["leg-numbness", "illust-f-leg-numbness"], ["hip-pain", "illust-m-hip-pain"], ["knee-pain", "illust-f-knee-pain"], ["knee-osteoarthritis", "illust-m-knee-pain"],
  ["shoulder-stiffness", "illust-f-neck-shoulder"], ["neck-pain", "illust-m-neck-shoulder"], ["straight-neck", "photo-neck-woman"], ["frozen-shoulder", "photo-shoulder-senior-woman"],
  ["back-pain", "photo-shoulder-back-man"], ["meniscus-injury", "photo-knee-senior-woman-2"], ["hip-osteoarthritis", "photo-hip-standing-man"], ["sports-injury", "photo-calf-woman"],
  ["sprain-bruise-strain", "photo-calf-woman-2"], ["postpartum-back-pain", "photo-lower-back-sofa"], ["tension-headache", "photo-headache-woman"],
  ["elbow-wrist-pain", "photo-shoulder-desk-man-2"], ["ankle-foot-pain", "photo-calf-woman-2"],
];

fs.mkdirSync(ARCHIVE, { recursive: true });
const registry = [];

for (const [src, key, alt] of singles) {
  const inPath = path.join(SRC, src);
  if (!fs.existsSync(inPath)) { console.warn("missing", src); continue; }
  const outPath = path.join(OUT, `${key}.jpg`);
  const meta = await sharp(inPath).metadata();
  const resize = meta.width >= meta.height ? { width: Math.min(1600, meta.width) } : { height: Math.min(1600, meta.height) };
  const info = await sharp(inPath).flatten({ background: "#ffffff" }).resize(resize).jpeg({ quality: 82, progressive: true, mozjpeg: true }).toFile(outPath);
  registry.push({ key, file: `${key}.jpg`, width: info.width, height: info.height, alt });
  fs.renameSync(inPath, path.join(ARCHIVE, src));
}

// コラージュ元PNGも退避
for (const src of [`${P}00_04_16.png`, `${P}00_04_38.png`, `${P}00_05_29.png`, `${P}00_16_02 (3).png`, `${P}00_16_03 (6).png`]) {
  const inPath = path.join(SRC, src);
  if (fs.existsSync(inPath)) fs.renameSync(inPath, path.join(ARCHIVE, src));
}

for (const [prefix, keyPrefix, alts] of collages) {
  for (let i = 1; i <= 10; i++) {
    const tile = path.join(TILES, `${prefix}-${String(i).padStart(2, "0")}.jpg`);
    if (!fs.existsSync(tile)) { console.warn("missing tile", tile); continue; }
    const key = `${keyPrefix}-${String(i).padStart(2, "0")}`;
    const info = await sharp(tile).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(OUT, `${key}.jpg`));
    registry.push({ key, file: `${key}.jpg`, width: info.width, height: info.height, alt: alts[i - 1] });
  }
}

const byKey = Object.fromEntries(registry.map((r) => [r.key, r]));
for (const [slug, key] of ogSymptoms) {
  const r = byKey[key];
  if (!r) { console.warn("og: missing key", key); continue; }
  const isIllust = key.startsWith("illust-");
  const base = sharp(path.join(OUT, r.file));
  const out = path.join(OUT, `og-symptom-${slug}.jpg`);
  if (isIllust) {
    await base.resize({ width: 1200, height: 630, fit: "contain", background: "#ffffff" }).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  } else {
    await base.resize({ width: 1200, height: 630, fit: "cover", position: "attention" }).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  }
}

const lines = registry.map((r) => `  "${r.key}": { src: "/images/${r.file}", width: ${r.width}, height: ${r.height}, alt: "${r.alt}" },`);
const ts = `/**
 * AI生成のイメージ画像（院から提供）。scripts/prepare-ai-images.mjs が生成するファイル。手で編集しない。
 * 実在の患者・スタッフではないため alt には「（イメージ）」を含める。
 */
import type { ImageAsset } from "@/content/images";

export const aiImages = {
${lines.join("\n")}
} as const satisfies Record<string, ImageAsset>;
`;
fs.writeFileSync("content/images-ai.ts", ts);
console.log(`registered ${registry.length} images, og images: ${ogSymptoms.length}`);
