// 元写真 (LINE_ALBUM_*.jpg) を意味のあるファイル名にリネームし、EXIF除去・リサイズして public/images に出力する
// 実行: node scripts/optimize-images.mjs
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = process.argv[2] ?? "public";
const OUT = "public/images";
const MAX = 1600;

const map = {
  "LINE_ALBUM_20260825_260830_9.jpg": "clinic-exterior.jpg",
  "LINE_ALBUM_20260825_260830_11.jpg": "clinic-exterior-evening.jpg",
  "LINE_ALBUM_20260825_260830_22.jpg": "director-portrait.jpg",
  "LINE_ALBUM_20260825_260830_23.jpg": "director-smile.jpg",
  "LINE_ALBUM_20260825_260830_32.jpg": "director-front-of-clinic.jpg",
  "LINE_ALBUM_20260825_260830_14.jpg": "counseling-1.jpg",
  "LINE_ALBUM_20260825_260830_15.jpg": "counseling-2.jpg",
  "LINE_ALBUM_20260825_260830_16.jpg": "explanation-spine-1.jpg",
  "LINE_ALBUM_20260825_260830_17.jpg": "explanation-spine-2.jpg",
  "LINE_ALBUM_20260825_260830_18.jpg": "check-shoulder.jpg",
  "LINE_ALBUM_20260825_260830_19.jpg": "treatment-knee.jpg",
  "LINE_ALBUM_20260825_260830_20.jpg": "check-lower-back.jpg",
  "LINE_ALBUM_20260825_260830_21.jpg": "treatment-neck.jpg",
  "LINE_ALBUM_20260825_260830_6.jpg": "posture-check-1.jpg",
  "LINE_ALBUM_20260825_260830_7.jpg": "posture-check-2.jpg",
  "LINE_ALBUM_20260825_260830_8.jpg": "posture-check-3.jpg",
  "LINE_ALBUM_20260825_260830_1.jpg": "foot-measurement-1.jpg",
  "LINE_ALBUM_20260825_260830_3.jpg": "foot-measurement-2.jpg",
  "LINE_ALBUM_20260825_260830_4.jpg": "foot-measurement-3.jpg",
  "LINE_ALBUM_20260825_260830_12.jpg": "foot-print-analysis.jpg",
  "LINE_ALBUM_20260825_260830_2.jpg": "insole.jpg",
  "LINE_ALBUM_20260825_260830_13.jpg": "voice-is.jpg",
  "LINE_ALBUM_20260825_260830_10.jpg": "voice-mh.jpg",
  "LINE_ALBUM_20260825_260830_24.jpg": "voice-s-knee.jpg",
  "LINE_ALBUM_20260825_260830_35.jpg": "voice-s-sciatica.jpg",
  "LINE_ALBUM_20260825_260830_30.jpg": "voice-h.jpg",
  "LINE_ALBUM_20260825_260830_37.jpg": "voice-a.jpg",
  "LINE_ALBUM_20260825_260830_38.jpg": "voice-sk.jpg",
  "LINE_ALBUM_20260825_260830_29.jpg": "voice-sk-square.jpg",
  "LINE_ALBUM_20260825_260830_31.jpg": "voice-n.jpg",
  "LINE_ALBUM_20260825_260830_39.jpg": "voice-s-postpartum.jpg",
  "LINE_ALBUM_20260825_260830_28.jpg": "patient-1.jpg",
  "LINE_ALBUM_20260825_260830_33.jpg": "patient-2.jpg",
  "LINE_ALBUM_20260825_260830_34.jpg": "patient-3.jpg",
  "LINE_ALBUM_20260825_260830_36.jpg": "patient-4.jpg",
  "LINE_ALBUM_20260825_260830_26.jpg": "patients-collage.jpg",
};

fs.mkdirSync(OUT, { recursive: true });
const results = [];
for (const [src, dest] of Object.entries(map)) {
  const inPath = path.join(SRC, src);
  if (!fs.existsSync(inPath)) { console.warn("missing", src); continue; }
  const img = sharp(inPath).rotate();
  const meta = await img.metadata();
  const w = meta.width, h = meta.height;
  const resize = w >= h ? { width: Math.min(MAX, w) } : { height: Math.min(MAX, h) };
  const info = await img.resize(resize).jpeg({ quality: 80, progressive: true, mozjpeg: true }).toFile(path.join(OUT, dest));
  results.push({ key: dest.replace(/\.jpg$/, ""), file: dest, width: info.width, height: info.height, bytes: info.size });
}

// OG画像 (1200x630)
const og = [
  ["LINE_ALBUM_20260825_260830_20.jpg", "og-default.jpg"],
  ["LINE_ALBUM_20260825_260830_23.jpg", "og-director.jpg"],
  ["LINE_ALBUM_20260825_260830_9.jpg", "og-clinic.jpg"],
  ["LINE_ALBUM_20260825_260830_16.jpg", "og-symptoms.jpg"],
];
for (const [src, dest] of og) {
  const info = await sharp(path.join(SRC, src)).rotate().resize({ width: 1200, height: 630, fit: "cover", position: "attention" }).jpeg({ quality: 80, progressive: true, mozjpeg: true }).toFile(path.join(OUT, dest));
  results.push({ key: dest.replace(/\.jpg$/, ""), file: dest, width: info.width, height: info.height, bytes: info.size });
}
console.log(JSON.stringify(results, null, 2));
