/**
 * 参考情報（一次情報・公的機関のみ）。
 *
 * ここに載せるURLは、すべて実在を確認したうえで登録している。
 * 存在しない文献・URLを推測で追加しないこと。確認できないものは登録しない
 * （登録がない症状ページでは参考情報セクション自体が表示されない）。
 *
 * 最終確認日: 2026-08-31
 */
export type Reference = { title: string; publisher: string; url: string };

const JOA = "公益社団法人 日本整形外科学会";
const JOA_BASE = "https://www.joa.or.jp/public/sick/condition";

/** 確認済みの参照先 */
export const references = {
  lumbago: { title: "腰痛", publisher: `${JOA}「症状・病気をしらべる」`, url: `${JOA_BASE}/lumbago.html` },
  discHerniation: { title: "腰椎椎間板ヘルニア", publisher: `${JOA}「症状・病気をしらべる」`, url: `${JOA_BASE}/lumbar_disc_herniation.html` },
  spinalStenosis: { title: "腰部脊柱管狭窄症", publisher: `${JOA}「症状・病気をしらべる」`, url: `${JOA_BASE}/lumbar_spinal_stenosis.html` },
  spondylolisthesis: { title: "腰椎変性すべり症", publisher: `${JOA}「症状・病気をしらべる」`, url: `${JOA_BASE}/spondylolisthesis.html` },
  spinalOsteophytosis: { title: "変形性脊椎症", publisher: `${JOA}「症状・病気をしらべる」`, url: `${JOA_BASE}/spinal_osteophytosis.html` },
  kneeOA: { title: "変形性膝関節症", publisher: `${JOA}「症状・病気をしらべる」`, url: `${JOA_BASE}/knee_osteoarthritis.html` },
  hipOA: { title: "変形性股関節症", publisher: `${JOA}「症状・病気をしらべる」`, url: `${JOA_BASE}/hip_osteoarthritis.html` },
  frozenShoulder: { title: "五十肩（肩関節周囲炎）", publisher: `${JOA}「症状・病気をしらべる」`, url: `${JOA_BASE}/frozen_shoulder.html` },
  rotatorCuffTear: { title: "肩腱板断裂", publisher: `${JOA}「症状・病気をしらべる」`, url: `${JOA_BASE}/rotator_cuff_tear.html` },
  cervicalMyelopathy: { title: "頸椎症性脊髄症", publisher: `${JOA}「症状・病気をしらべる」`, url: `${JOA_BASE}/cervical_spondylotic_myelopathy.html` },
  tennisElbow: { title: "テニス肘（上腕骨外側上顆炎）", publisher: `${JOA}「症状・病気をしらべる」`, url: `${JOA_BASE}/lateral_epicondylitis.html` },
  carpalTunnel: { title: "手根管症候群", publisher: `${JOA}「症状・病気をしらべる」`, url: `${JOA_BASE}/carpal_tunnel_syndrome.html` },
  halluxValgus: { title: "外反母趾", publisher: `${JOA}「症状・病気をしらべる」`, url: `${JOA_BASE}/hallux_valgus.html` },
  compressionFracture: { title: "脊椎椎体骨折", publisher: `${JOA}「症状・病気をしらべる」`, url: `${JOA_BASE}/vertebral_compression_fracture.html` },
  osteoporosis: { title: "骨粗鬆症", publisher: `${JOA}「症状・病気をしらべる」`, url: `${JOA_BASE}/osteoporosis.html` },
  stenosisGuideline: {
    title: "腰部脊柱管狭窄症診療ガイドライン2021（改訂第2版）",
    publisher: "Mindsガイドラインライブラリ（公益財団法人 日本医療機能評価機構）",
    url: "https://minds.jcqhc.or.jp/summary/c00646/",
  },
} as const satisfies Record<string, Reference>;

const R = references;

/** 症状スラッグ → 参考情報。該当がない症状は空配列（セクション非表示） */
const bySymptom: Record<string, Reference[]> = {
  "lower-back-pain": [R.lumbago, R.discHerniation, R.spinalStenosis],
  "chronic-lower-back-pain": [R.lumbago, R.spinalOsteophytosis],
  "acute-lower-back-pain": [R.lumbago, R.compressionFracture],
  "sciatica": [R.discHerniation, R.spinalStenosis, R.lumbago],
  "lumbar-disc-herniation": [R.discHerniation, R.lumbago],
  "spinal-stenosis": [R.spinalStenosis, R.stenosisGuideline],
  "spondylolisthesis": [R.spondylolisthesis, R.spinalStenosis],
  "leg-numbness": [R.spinalStenosis, R.discHerniation],
  "hip-pain": [R.hipOA],
  "hip-osteoarthritis": [R.hipOA],
  "knee-pain": [R.kneeOA],
  "knee-osteoarthritis": [R.kneeOA],
  "meniscus-injury": [R.kneeOA],
  "shoulder-stiffness": [R.cervicalMyelopathy],
  "neck-pain": [R.cervicalMyelopathy],
  "straight-neck": [R.cervicalMyelopathy],
  "frozen-shoulder": [R.frozenShoulder, R.rotatorCuffTear],
  "back-pain": [R.spinalOsteophytosis, R.compressionFracture],
  "elbow-wrist-pain": [R.tennisElbow, R.carpalTunnel],
  "ankle-foot-pain": [R.halluxValgus],
  "postpartum-back-pain": [R.lumbago],
};

export function referencesForSymptom(slug: string): Reference[] {
  return bySymptom[slug] ?? [];
}

/** 記事の関連症状から参考情報を集める（重複を除き最大3件） */
export function referencesForSymptoms(slugs: readonly string[], limit = 3): Reference[] {
  const seen = new Set<string>();
  const out: Reference[] = [];
  for (const slug of slugs) {
    for (const ref of referencesForSymptom(slug)) {
      if (seen.has(ref.url)) continue;
      seen.add(ref.url);
      out.push(ref);
      if (out.length >= limit) return out;
    }
  }
  return out;
}
