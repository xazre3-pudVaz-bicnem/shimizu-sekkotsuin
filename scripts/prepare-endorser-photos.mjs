/**
 * 同業の先生からいただいた推薦者の顔写真を、サイト用に整える。
 *
 * 実行: node scripts/prepare-endorser-photos.mjs
 *
 * やっていること
 *  1. 院から届いた元ファイル（ファイル名がバラバラ）を endorser-*.jpg に統一
 *  2. 長辺 1000px・quality 82 に最適化
 *  3. 木村先生の写真は切り抜き素材をJPEGで受け取ったため背景が真っ黒になっている。
 *     外周から黒い領域だけを塗りつぶして白背景に置き換える
 *     （服の黒は人物に囲まれていて外周とつながっていないので塗られない）
 *
 * 元ファイルは _source-photos/endorsers/ に退避する（.gitignore 済みで公開されない）。
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DIR = "public/images";
const BACKUP = "_source-photos/endorsers";

/** 元ファイル名（届いたまま） → 出力名 */
const MAP = [
  { src: "S__78217224.jpg", out: "endorser-kobayashi.jpg", whiteFill: false },
  { src: "52780.jpg", out: "endorser-kimura.jpg", whiteFill: true },
  { src: "6968.jpg", out: "endorser-ri.jpg", whiteFill: false },
  // ファイル名の「のコピー」が濁点分解（NFD）で保存されているため、名前ではなくパターンで探す
  { match: /^_D0A1742/, out: "endorser-kajita.jpg", whiteFill: false },
];

/** 外周から届く「ほぼ黒」の領域だけを白に置き換える */
function floodFillBackgroundToWhite(data, width, height, channels, tol = 34) {
  const isDark = (i) => data[i] <= tol && data[i + 1] <= tol && data[i + 2] <= tol;
  const seen = new Uint8Array(width * height);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (seen[p]) return;
    if (!isDark(p * channels)) return;
    seen[p] = 1;
    stack.push(p);
  };
  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }
  while (stack.length) {
    const p = stack.pop();
    const x = p % width;
    const y = (p - x) / width;
    const i = p * channels;
    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
    push(x - 1, y);
    push(x + 1, y);
    push(x, y - 1);
    push(x, y + 1);
  }
  return seen;
}

/** 塗り残した輪郭の暗いふちを白へ寄せて、境界のギザつきを目立たなくする */
function feather(data, seen, width, height, channels) {
  const copy = Uint8Array.from(seen);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const p = y * width + x;
      if (copy[p]) continue;
      const nearBg = copy[p - 1] || copy[p + 1] || copy[p - width] || copy[p + width];
      if (!nearBg) continue;
      const i = p * channels;
      const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
      if (lum > 110) continue; // 明るい画素（肌・白衣）はそのまま
      const t = 0.55;
      data[i] = Math.round(data[i] * (1 - t) + 255 * t);
      data[i + 1] = Math.round(data[i + 1] * (1 - t) + 255 * t);
      data[i + 2] = Math.round(data[i + 2] * (1 - t) + 255 * t);
    }
  }
}

fs.mkdirSync(BACKUP, { recursive: true });

const entries = fs.readdirSync(DIR);

for (const item of MAP) {
  const { out } = item;
  const src = item.src ?? entries.find((f) => item.match.test(f));
  const from = src ? path.join(DIR, src) : "";
  if (!src || !fs.existsSync(from)) {
    console.log(`skip（元ファイルなし）: ${item.src ?? item.match}`);
    continue;
  }
  const meta = await sharp(from).metadata();
  const resized = sharp(from).resize({ width: 1000, height: 1000, fit: "inside", withoutEnlargement: true });

  let pipeline = resized;
  if (item.whiteFill) {
    const { data, info } = await resized.raw().toBuffer({ resolveWithObject: true });
    const seen = floodFillBackgroundToWhite(data, info.width, info.height, info.channels);
    feather(data, seen, info.width, info.height, info.channels);
    pipeline = sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } });
  }

  const to = path.join(DIR, out);
  await pipeline.jpeg({ quality: 82, mozjpeg: true }).toFile(to);
  const after = await sharp(to).metadata();
  console.log(`${src} (${meta.width}x${meta.height}) → ${out} (${after.width}x${after.height}, ${Math.round(fs.statSync(to).size / 1024)}KB)`);

  fs.renameSync(from, path.join(BACKUP, src));
}

console.log("完了。元ファイルは", BACKUP, "に退避しました");
