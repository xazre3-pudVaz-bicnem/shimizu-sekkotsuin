// 口コミ依頼・LINE友だち追加用のQRコード（SVG）を生成する。実行: node scripts/generate-qr.mjs
import QRCode from "qrcode";
import fs from "node:fs";

const targets = [
  { file: "public/images/qr-google-review.svg", url: "https://g.page/shimizu-sekkotsuin/review?rc" },
  { file: "public/images/qr-line.svg", url: "https://page.line.me/ory2666w" },
  { file: "public/images/qr-google-maps.svg", url: "https://g.page/shimizu-sekkotsuin?share" },
];

for (const t of targets) {
  const svg = await QRCode.toString(t.url, { type: "svg", margin: 1, width: 320, color: { dark: "#183b30", light: "#ffffff" } });
  fs.writeFileSync(t.file, svg);
  console.log("wrote", t.file, "->", t.url);
}
