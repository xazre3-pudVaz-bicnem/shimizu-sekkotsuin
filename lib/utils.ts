export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${y}年${m}月${d}日`;
}

export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** 日本語本文の目安読了時間（分） */
export function readingMinutes(text: string): number {
  const chars = text.replace(/\s+/g, "").length;
  return Math.max(1, Math.round(chars / 500));
}

/**
 * 一覧カード用の抜粋。
 * meta description には地域名と監修者の定型文が入っているため、
 * カードでは重複する定型部分を落として本題だけを見せる。
 */
export function articleExcerpt(description: string, max = 76): string {
  let s = description
    .replace(/[^。]*足立区扇の清水接骨院の院長（柔道整復師）が[^。]*。/g, "")
    .replace(/[^。]*清水接骨院の院長（柔道整復師）が[^。]*。/g, "")
    .replace(/[^。]*柔道整復師の院長が解説[^。]*。/g, "")
    .trim();
  if (!s) s = description;
  if (s.length > max) s = s.slice(0, max).replace(/[、。]$/, "") + "…";
  return s;
}
