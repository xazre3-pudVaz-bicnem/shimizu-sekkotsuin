// 複数写真が並んだコラージュ画像を、白い余白を検出して個別の写真に切り出す。
// 使い方: node scripts/crop-collages.mjs <入力画像...> --out <出力ディレクトリ>
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const outIdx = args.indexOf("--out");
const OUT = outIdx >= 0 ? args[outIdx + 1] : "scratchpad/tiles";
const inputs = args.filter((a, i) => a !== "--out" && i !== outIdx + 1);
fs.mkdirSync(OUT, { recursive: true });

const WHITE = 232; // これ以上の明るさは「余白」とみなす
const MIN_RUN = 90; // タイルの最小サイズ(px)
const CONTENT_RATIO = 0.18; // 非白ピクセルがこの割合を超える行/列を「写真」とみなす

function runs(flags, minRun) {
  const out = [];
  let start = -1;
  for (let i = 0; i <= flags.length; i++) {
    const on = i < flags.length && flags[i];
    if (on && start < 0) start = i;
    if (!on && start >= 0) {
      if (i - start >= minRun) out.push([start, i]);
      start = -1;
    }
  }
  return out;
}

for (const input of inputs) {
  const img = sharp(input);
  const { width, height } = await img.metadata();
  const raw = await img.greyscale().raw().toBuffer();
  const colCount = new Array(width).fill(0);
  const rowCount = new Array(height).fill(0);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (raw[y * width + x] < WHITE) {
        colCount[x]++;
        rowCount[y]++;
      }
    }
  }
  const colFlags = colCount.map((c) => c / height > CONTENT_RATIO);
  const rowFlags = rowCount.map((c) => c / width > CONTENT_RATIO);
  const cols = runs(colFlags, MIN_RUN);
  const rows = runs(rowFlags, MIN_RUN);
  const base = path.basename(input).replace(/\.[a-z]+$/i, "").replace(/[^\w]+/g, "_");
  console.log(`${path.basename(input)} ${width}x${height} -> cols ${cols.length} rows ${rows.length}`);
  let n = 0;
  for (const [y0, y1] of rows) {
    for (const [x0, x1] of cols) {
      // タイル内が本当に写真か（余白だけでないか）を確認
      let dark = 0;
      for (let y = y0; y < y1; y += 4) for (let x = x0; x < x1; x += 4) if (raw[y * width + x] < WHITE) dark++;
      const ratio = dark / (((y1 - y0) / 4) * ((x1 - x0) / 4));
      if (ratio < 0.2) continue;
      n++;
      const file = path.join(OUT, `${base}-${String(n).padStart(2, "0")}.jpg`);
      await sharp(input).extract({ left: x0, top: y0, width: x1 - x0, height: y1 - y0 }).jpeg({ quality: 84, mozjpeg: true }).toFile(file);
      console.log(`  tile ${n}: x ${x0}-${x1} y ${y0}-${y1} (${x1 - x0}x${y1 - y0})`);
    }
  }
}
