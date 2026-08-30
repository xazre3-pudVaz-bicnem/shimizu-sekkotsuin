import Link from "next/link";
import type { ReactNode } from "react";

/**
 * 依存ライブラリなしの簡易Markdownレンダラー。
 * 対応: ## / ### 見出し、段落、- 箇条書き、1. 番号付き、> 注記ブロック、**強調**、[リンク](/path)
 */

export type Heading = { id: string; text: string; level: 2 | 3 };

function headingId(index: number) {
  return `sec-${index}`;
}

export function extractHeadings(md: string): Heading[] {
  const out: Heading[] = [];
  let i = 0;
  for (const line of md.split("\n")) {
    const m = /^(##|###)\s+(.+)$/.exec(line.trim());
    if (m) {
      i += 1;
      out.push({ id: headingId(i), text: m[2].trim(), level: m[1] === "##" ? 2 : 3 });
    }
  }
  return out;
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const token = m[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={`${keyPrefix}-b${k++}`} className="font-bold text-ink">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      const lm = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (lm) {
        const [, label, href] = lm;
        if (href.startsWith("/")) {
          nodes.push(
            <Link
              key={`${keyPrefix}-l${k++}`}
              href={href}
              className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-4 hover:decoration-brand-600"
            >
              {label}
            </Link>,
          );
        } else {
          nodes.push(
            <a
              key={`${keyPrefix}-l${k++}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-4"
            >
              {label}
            </a>,
          );
        }
      }
    }
    last = m.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

type Block =
  | { type: "h2" | "h3"; text: string; id: string }
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "note"; lines: string[] };

function parse(md: string): Block[] {
  const lines = md.split("\n");
  const blocks: Block[] = [];
  let para: string[] = [];
  let headingIndex = 0;

  const flushPara = () => {
    if (para.length) {
      blocks.push({ type: "p", text: para.join("") });
      para = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      flushPara();
      continue;
    }
    const h = /^(##|###)\s+(.+)$/.exec(line);
    if (h) {
      flushPara();
      headingIndex += 1;
      blocks.push({ type: h[1] === "##" ? "h2" : "h3", text: h[2].trim(), id: headingId(headingIndex) });
      continue;
    }
    if (/^-\s+/.test(line)) {
      flushPara();
      const items: string[] = [];
      while (i < lines.length && /^-\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^-\s+/, ""));
        i++;
      }
      i--;
      blocks.push({ type: "ul", items });
      continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      flushPara();
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      i--;
      blocks.push({ type: "ol", items });
      continue;
    }
    if (/^>\s?/.test(line)) {
      flushPara();
      const noteLines: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i].trim())) {
        noteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      i--;
      blocks.push({ type: "note", lines: noteLines });
      continue;
    }
    para.push(line);
  }
  flushPara();
  return blocks;
}

export function Prose({ markdown }: { markdown: string }) {
  const blocks = parse(markdown);
  return (
    <div className="text-[1.0625rem] leading-[1.95] text-ink-soft sm:text-lg">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={b.id}
                className="mt-14 mb-5 scroll-mt-24 border-l-4 border-brand-500 pl-4 text-xl font-bold text-ink sm:text-2xl"
              >
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={b.id} className="mt-9 mb-3 scroll-mt-24 text-lg font-bold text-ink sm:text-xl">
                {b.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="my-5 space-y-2 pl-1">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.8em] block h-2 w-2 shrink-0 rounded-full bg-brand-400" />
                    <span>{renderInline(it, `${i}-${j}`)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="my-5 space-y-2 pl-1">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="font-latin mt-[0.15em] flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                      {j + 1}
                    </span>
                    <span>{renderInline(it, `${i}-${j}`)}</span>
                  </li>
                ))}
              </ol>
            );
          case "note":
            return (
              <aside key={i} className="my-6 rounded-2xl border border-warn-line bg-warn-bg px-5 py-4 text-base text-ink-soft">
                {b.lines.map((l, j) => (
                  <p key={j} className={j ? "mt-2" : ""}>
                    {renderInline(l, `${i}-${j}`)}
                  </p>
                ))}
              </aside>
            );
          default:
            return (
              <p key={i} className="my-4">
                {renderInline(b.text, `${i}`)}
              </p>
            );
        }
      })}
    </div>
  );
}
