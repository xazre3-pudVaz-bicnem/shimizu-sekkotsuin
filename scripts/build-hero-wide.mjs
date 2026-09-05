/**
 * ヒーロー用の横長素材をつくる。
 *
 * 実行: node scripts/build-hero-wide.mjs
 *
 * なぜ必要か
 *  いただいた写真（2836×1953）は寄りの構図なので、そのまま画面全面の背景にすると
 *  横1920pxでは縦が46%切り取られ、院長の顔だけが大写しになってしまう。
 *  そこで写真を右に置き、左側は写真の左端（無地のカーテン）を横に伸ばして継ぎ足し、
 *  全面背景に耐える横長のキャンバスにする。
 *
 * つくり方
 *  1. 元写真をキャンバスの高さに合わせて縮小し、右端に配置
 *  2. 写真の左端24pxを取り出してぼかし、残りの幅いっぱいに引き伸ばして左に配置
 *     （カーテンの折り目は縦方向なので、横に伸ばしても不自然にならない。
 *      継ぎ目は写真の左端そのものなので段差が出ない）
 *
 * 出力: public/images/hero-treatment-wide.jpg（3600×1320／横縦比 2.727）
 *  この比率なら 1920×700 のヒーローでほぼ無切り抜き、1280〜1440では高さ基準で
 *  拡大されるため院長の大きさが画面幅によらず一定になる。
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = "_source-photos/hero";
const OUT = "public/images/hero-treatment-wide.jpg";

const CANVAS_W = 3600;
const CANVAS_H = 1320;
/** 引き伸ばしの種にする、写真左端のスライス幅 */
const SLICE = 24;

const src = fs.readdirSync(SRC_DIR).find((f) => /\.jpe?g$/i.test(f));
if (!src) {
  console.error(`元写真が見つかりません: ${SRC_DIR}`);
  process.exit(1);
}
const from = path.join(SRC_DIR, src);

// 1. 元写真をキャンバスの高さに合わせる
const photo = await sharp(from).resize({ height: CANVAS_H }).toBuffer();
const photoMeta = await sharp(photo).metadata();
const photoLeft = CANVAS_W - photoMeta.width;
if (photoLeft < 0) {
  console.error("キャンバスが写真より狭いです");
  process.exit(1);
}

// 2. 写真の左端スライスを、左の余白いっぱいに引き伸ばす
const extension = await sharp(photo)
  .extract({ left: 0, top: 0, width: SLICE, height: CANVAS_H })
  .blur(6)
  .resize({ width: photoLeft, height: CANVAS_H, fit: "fill" })
  .toBuffer();

await sharp({ create: { width: CANVAS_W, height: CANVAS_H, channels: 3, background: "#ffffff" } })
  .composite([
    { input: extension, left: 0, top: 0 },
    { input: photo, left: photoLeft, top: 0 },
  ])
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(OUT);

const out = await sharp(OUT).metadata();
console.log(
  `${src} (${(await sharp(from).metadata()).width}×${(await sharp(from).metadata()).height}) → ${OUT}`,
  `${out.width}×${out.height}（横縦比 ${(out.width / out.height).toFixed(3)}）`,
  `${Math.round(fs.statSync(OUT).size / 1024)}KB`,
);
console.log(`写真は左端 ${photoLeft}px から右（キャンバス幅の ${Math.round((photoLeft / CANVAS_W) * 100)}% 以降）に配置`);
