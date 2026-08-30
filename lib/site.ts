const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

/** 本番URL。未設定なら null（canonical / OG / sitemap を出力せず、robots は noindex）。 */
export const SITE_URL: string | null = raw ? raw.replace(/\/+$/, "") : null;
export const IS_INDEXABLE = Boolean(SITE_URL);
export const SITE_NAME = "清水接骨院";
export const SITE_TITLE = "足立区扇・高野駅の清水接骨院｜腰痛・坐骨神経痛など身体の痛みやしびれに";
export const SITE_DESCRIPTION =
  "足立区扇・高野駅徒歩5分の清水接骨院。柔道整復師の院長が、腰痛・坐骨神経痛・椎間板ヘルニア・脊柱管狭窄症・ぎっくり腰・足のしびれ・肩こり・膝の痛みなどに一人ひとり合わせた施術を行います。完全予約制。";

export function absUrl(path = "/"): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return SITE_URL ? `${SITE_URL}${p}` : p;
}
