// ビルド済みHTML（.next/server/app）を監査する。実行: node scripts/audit-html.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = ".next/server/app";
const PUBLIC = "public";

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

const unescape = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const files = walk(ROOT);
const pages = [];
for (const f of files) {
  const html = fs.readFileSync(f, "utf8");
  let route = "/" + path.relative(ROOT, f).replace(/\\/g, "/").replace(/\.html$/, "");
  if (route === "/index") route = "/";
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] ?? "";
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] ?? "";
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] ?? "";
  const ogTitle = (html.match(/<meta property="og:title" content="([^"]*)"/) || [])[1] ?? "";
  const ogDesc = (html.match(/<meta property="og:description" content="([^"]*)"/) || [])[1] ?? "";
  const ogImage = (html.match(/<meta property="og:image" content="([^"]*)"/) || [])[1] ?? "";
  const robots = (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] ?? "";
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1].replace(/<[^>]+>/g, "").trim());
  const jsonld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => {
    try {
      const d = JSON.parse(m[1]);
      return Array.isArray(d) ? d.map((x) => x["@type"]).join("+") : d["@type"];
    } catch {
      return "INVALID_JSON";
    }
  });
  const links = new Set([...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]).filter((l) => !l.startsWith("/_next/")));
  const imgs = new Set();
  for (const m of html.matchAll(/(?:src|href)="\/_next\/image\?url=([^&"]+)/g)) imgs.add(decodeURIComponent(m[1]));
  for (const m of html.matchAll(/(?:src|content)="(\/images\/[^"]+)"/g)) imgs.add(m[1]);
  for (const m of html.matchAll(/content="https?:\/\/[^"/]+(\/images\/[^"]+)"/g)) imgs.add(m[1]);
  pages.push({ route, title: unescape(title), desc: unescape(desc), canonical, ogTitle: unescape(ogTitle), ogDesc: unescape(ogDesc), ogImage, robots, h1s, jsonld, links: [...links], imgs: [...imgs], bytes: html.length });
}

const routes = new Set(pages.map((p) => p.route));
const extra = new Set(["/sitemap.xml", "/robots.txt", "/icon.svg"]);
const problems = [];

// 重複チェック
const byTitle = new Map();
const byDesc = new Map();
for (const p of pages) {
  if (p.route === "/_not-found") continue;
  byTitle.set(p.title, [...(byTitle.get(p.title) ?? []), p.route]);
  byDesc.set(p.desc, [...(byDesc.get(p.desc) ?? []), p.route]);
}
for (const [t, rs] of byTitle) if (rs.length > 1) problems.push(`DUP TITLE "${t}": ${rs.join(", ")}`);
for (const [d, rs] of byDesc) if (rs.length > 1) problems.push(`DUP DESC "${d.slice(0, 40)}...": ${rs.join(", ")}`);

for (const p of pages) {
  if (p.route === "/_not-found") continue;
  if (!p.title) problems.push(`NO TITLE ${p.route}`);
  if (!p.desc) problems.push(`NO DESC ${p.route}`);
  if (p.h1s.length !== 1) problems.push(`H1 x${p.h1s.length} ${p.route}`);
  if (!p.canonical) problems.push(`NO CANONICAL ${p.route}`);
  else if (!p.canonical.endsWith(p.route === "/" ? "" : p.route)) problems.push(`CANONICAL MISMATCH ${p.route} -> ${p.canonical}`);
  if (!p.ogTitle) problems.push(`NO OG:TITLE ${p.route}`);
  if (!p.ogImage) problems.push(`NO OG:IMAGE ${p.route}`);
  if (p.jsonld.includes("INVALID_JSON")) problems.push(`INVALID JSON-LD ${p.route}`);
  if (p.title.length > 70) problems.push(`LONG TITLE (${p.title.length}) ${p.route}`);
  if (p.desc.length > 160) problems.push(`LONG DESC (${p.desc.length}) ${p.route}`);
  for (const l of p.links) {
    const clean = l.replace(/\/$/, "") || "/";
    if (!routes.has(clean) && !extra.has(clean) && !clean.startsWith("/images/")) problems.push(`BROKEN LINK ${p.route} -> ${l}`);
  }
  for (const i of p.imgs) {
    if (!fs.existsSync(path.join(PUBLIC, i))) problems.push(`MISSING IMAGE ${p.route} -> ${i}`);
  }
}

console.log(`pages: ${pages.length}`);
console.log(`problems: ${problems.length}`);
for (const pr of [...new Set(problems)]) console.log("  - " + pr);

// サマリー
console.log("\n--- JSON-LD types per route ---");
for (const p of pages) console.log(`${p.route.padEnd(48)} ${p.jsonld.join(" | ")}`);
console.log("\n--- titles ---");
for (const p of pages) console.log(`${p.route.padEnd(48)} [${p.title.length}] ${p.title}`);
console.log("\n--- robots meta (unique) ---");
console.log([...new Set(pages.map((p) => `${p.route === "/_not-found" ? "404" : "page"}: ${p.robots}`))].join("\n"));

// 内部リンクグラフ：症状ページ↔コラム
const symptomPages = pages.filter((p) => p.route.startsWith("/symptoms/"));
const columnPages = pages.filter((p) => p.route.startsWith("/column/") && !p.route.startsWith("/column/category"));
console.log("\n--- symptom pages: links to other symptoms / columns ---");
for (const p of symptomPages) {
  const s = p.links.filter((l) => l.startsWith("/symptoms/") && l !== p.route).length;
  const c = p.links.filter((l) => l.startsWith("/column/") && !l.startsWith("/column/category")).length;
  console.log(`${p.route.padEnd(48)} symptoms:${s} columns:${c} bytes:${Math.round(p.bytes / 1024)}KB`);
}
console.log("\n--- column pages: links to symptom pages ---");
for (const p of columnPages) {
  const s = p.links.filter((l) => l.startsWith("/symptoms/")).length;
  console.log(`${p.route.padEnd(48)} symptoms:${s}`);
}
