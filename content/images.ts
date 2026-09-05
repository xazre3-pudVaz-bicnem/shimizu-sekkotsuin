/**
 * public/images に配置した写真のレジストリ。
 * realPhotos: 院から提供された実写真（scripts/optimize-images.mjs でリネーム・最適化済み）
 * aiImages : AI生成のイメージ画像（scripts/prepare-ai-images.mjs で配置。content/images-ai.ts）
 * alt は画像の内容を正確に説明する（検索キーワードの詰め込みはしない）。
 */
import { aiImages } from "@/content/images-ai";

/**
 * position: object-fit: cover で切り抜かれるときの表示位置（CSS object-position）。
 * 縦長の写真を 4:3 や 16:9 の枠に入れると中央基準では顔が切れるため、
 * 顔が枠に残る位置を写真ごとに指定する。未指定なら中央（50% 50%）。
 */
export type ImageAsset = { src: string; width: number; height: number; alt: string; position?: string };

export const realPhotos = {
  "clinic-exterior": { src: "/images/clinic-exterior.jpg", width: 1247, height: 1313, alt: "清水接骨院の外観。緑の看板と、腰痛・膝痛など対応症状のイラストが描かれた窓が目印" },
  "clinic-exterior-evening": { src: "/images/clinic-exterior-evening.jpg", width: 1108, height: 1477, alt: "夕方の清水接骨院の外観。入口の明かりと、のぼり旗が立っている", position: "50% 35%" },
  "director-portrait": { src: "/images/director-portrait.jpg", width: 1163, height: 1407, alt: "清水接骨院 院長・清水正尊（柔道整復師）のポートレート" },
  "director-smile": { src: "/images/director-smile.jpg", width: 1567, height: 1045, alt: "屋外で笑顔を見せる清水接骨院 院長・清水正尊" },
  "director-front-of-clinic": { src: "/images/director-front-of-clinic.jpg", width: 1045, height: 1567, alt: "清水接骨院の看板の前に立つ院長・清水正尊", position: "50% 25%" },
  "counseling-1": { src: "/images/counseling-1.jpg", width: 1567, height: 1045, alt: "初回のカウンセリングで、問診票を見ながら患者さんの話を聞く清水接骨院の院長" },
  "counseling-2": { src: "/images/counseling-2.jpg", width: 1567, height: 1045, alt: "問診票をもとに患者さんと症状について話す清水接骨院の院長" },
  "explanation-spine-1": { src: "/images/explanation-spine-1.jpg", width: 1567, height: 1045, alt: "背骨の模型を使って、身体の状態を患者さんに説明する清水接骨院の院長" },
  "explanation-spine-2": { src: "/images/explanation-spine-2.jpg", width: 1567, height: 1045, alt: "骨盤と腰椎の模型を指しながら、腰の状態を説明する清水接骨院の院長" },
  "check-shoulder": { src: "/images/check-shoulder.jpg", width: 1567, height: 1045, alt: "患者さんに腕を挙げてもらい、肩の動きを確認する清水接骨院の院長" },
  "treatment-knee": { src: "/images/treatment-knee.jpg", width: 1567, height: 1045, alt: "ベッドに横になった患者さんの膝の状態を確認しながら施術する清水接骨院の院長" },
  "check-lower-back": { src: "/images/check-lower-back.jpg", width: 1567, height: 1045, alt: "立った姿勢の患者さんの腰に手を当て、腰の状態を確認する清水接骨院の院長" },
  "treatment-neck": { src: "/images/treatment-neck.jpg", width: 1567, height: 1045, alt: "仰向けの患者さんの首まわりをやさしく施術する清水接骨院の院長" },
  /* ヒーロー用。写真を右に置き、左は写真左端のカーテンを横へ延長した横長素材。
     scripts/build-hero-wide.mjs が生成。全面背景にしても院長の顔が大写しにならない */
  "hero-treatment-wide": { src: "/images/hero-treatment-wide.jpg", width: 3600, height: 1320, alt: "施術ベッドに横になった患者さんの首まわりを施術する清水接骨院 院長・清水正尊" },
  "posture-check-1": { src: "/images/posture-check-1.jpg", width: 1108, height: 1477, alt: "清水接骨院の施術室で、患者さんの立ち姿勢を横から確認している様子" },
  "posture-check-2": { src: "/images/posture-check-2.jpg", width: 1096, height: 1492, alt: "施術ベッドの横で、患者さんの姿勢を確認している様子" },
  "posture-check-3": { src: "/images/posture-check-3.jpg", width: 703, height: 1600, alt: "背骨の模型が置かれた施術室で、患者さんの姿勢を横から確認している様子" },
  "foot-measurement-1": { src: "/images/foot-measurement-1.jpg", width: 1108, height: 1477, alt: "足の長さ・幅・周囲を記録した測定シートと、足型・インソール" },
  "foot-measurement-2": { src: "/images/foot-measurement-2.jpg", width: 1108, height: 1477, alt: "左右の足型（フットプリント）とインソールを並べた様子" },
  "foot-measurement-3": { src: "/images/foot-measurement-3.jpg", width: 1108, height: 1477, alt: "スニーカーと、左右の足型（フットプリント）を記録した用紙" },
  "foot-print-analysis": { src: "/images/foot-print-analysis.jpg", width: 1108, height: 1477, alt: "足型から横アーチの崩れや荷重の偏りを書き込んだ分析シート" },
  "insole": { src: "/images/insole.jpg", width: 1108, height: 1477, alt: "作成途中のインソール" },
  "voice-is": { src: "/images/voice-is.jpg", width: 1477, height: 1108, alt: "清水接骨院の院長と、腰痛・股関節の痛みで来院された90代の患者さん" },
  "voice-mh": { src: "/images/voice-mh.jpg", width: 1478, height: 1108, alt: "清水接骨院の院長と、腰痛・膝の痛みで来院された70代の患者さん" },
  "voice-s-knee": { src: "/images/voice-s-knee.jpg", width: 1600, height: 900, alt: "清水接骨院の院長と、腰痛・坐骨神経痛・膝の痛みで来院された患者さん" },
  "voice-s-sciatica": { src: "/images/voice-s-sciatica.jpg", width: 1458, height: 1094, alt: "清水接骨院の院長と、腰痛・坐骨神経痛で来院された患者さん" },
  "voice-h": { src: "/images/voice-h.jpg", width: 1280, height: 1280, alt: "清水接骨院の院長と、腰痛・足のしびれで来院された患者さん" },
  "voice-a": { src: "/images/voice-a.jpg", width: 900, height: 1600, alt: "清水接骨院の院長と、坐骨神経痛で来院された患者さん", position: "50% 22%" },
  "voice-sk": { src: "/images/voice-sk.jpg", width: 900, height: 1600, alt: "清水接骨院の院長と、腰痛で来院された患者さん", position: "50% 20%" },
  "voice-sk-square": { src: "/images/voice-sk-square.jpg", width: 1280, height: 1280, alt: "清水接骨院の院長と、腰痛で来院された患者さん" },
  "voice-n": { src: "/images/voice-n.jpg", width: 1280, height: 1280, alt: "清水接骨院の院長と、坐骨神経痛で来院された患者さん" },
  "voice-s-postpartum": { src: "/images/voice-s-postpartum.jpg", width: 900, height: 1600, alt: "清水接骨院の院長と、産後の膝の痛みで来院されたお母さんと赤ちゃん", position: "50% 27%" },
  "patient-1": { src: "/images/patient-1.jpg", width: 1280, height: 1280, alt: "清水接骨院の院長と来院された患者さん" },
  "patient-2": { src: "/images/patient-2.jpg", width: 1600, height: 900, alt: "清水接骨院の院長と来院された患者さん" },
  "patient-3": { src: "/images/patient-3.jpg", width: 1284, height: 1276, alt: "清水接骨院の院長と来院された患者さん" },
  "patient-4": { src: "/images/patient-4.jpg", width: 1114, height: 1468, alt: "清水接骨院の院長と来院された患者さん", position: "50% 25%" },
  "patients-collage": { src: "/images/patients-collage.jpg", width: 1280, height: 1280, alt: "清水接骨院に来院された患者さんと院長の記念写真" },

  /* 推薦者の顔写真（ご本人からご提供。scripts/prepare-endorser-photos.mjs で最適化） */
  "endorser-kobayashi": { src: "/images/endorser-kobayashi.jpg", width: 667, height: 1000, alt: "かず御幸整体院 院長 小林和哉先生", position: "50% 12%" },
  "endorser-kimura": { src: "/images/endorser-kimura.jpg", width: 704, height: 1000, alt: "たいよう鍼灸整骨院 木村有軌先生", position: "50% 8%" },
  "endorser-ri": { src: "/images/endorser-ri.jpg", width: 800, height: 800, alt: "北京気功整体院 院長 李光林先生" },
  "endorser-kajita": { src: "/images/endorser-kajita.jpg", width: 1000, height: 1000, alt: "中央元気堂整体院 梶田哲平先生" },
} as const satisfies Record<string, ImageAsset>;

export const images = { ...realPhotos, ...aiImages } as const;

export type ImageKey = keyof typeof images;

export const ogImages = {
  default: "/images/og-default.jpg",
  director: "/images/og-director.jpg",
  clinic: "/images/og-clinic.jpg",
  symptoms: "/images/og-symptoms.jpg",
} as const;

/** 症状ページ用のOG画像（scripts/prepare-ai-images.mjs が生成）。存在しないslugは既定画像にフォールバック */
export function symptomOgImage(slug: string): string {
  return SYMPTOM_OG_SLUGS.has(slug) ? `/images/og-symptom-${slug}.jpg` : ogImages.symptoms;
}

const SYMPTOM_OG_SLUGS = new Set([
  "lower-back-pain", "chronic-lower-back-pain", "acute-lower-back-pain", "sciatica", "lumbar-disc-herniation", "spinal-stenosis", "spondylolisthesis",
  "leg-numbness", "hip-pain", "knee-pain", "knee-osteoarthritis", "shoulder-stiffness", "neck-pain", "straight-neck", "frozen-shoulder", "back-pain",
  "meniscus-injury", "hip-osteoarthritis", "sports-injury", "sprain-bruise-strain", "postpartum-back-pain", "tension-headache", "elbow-wrist-pain", "ankle-foot-pain",
]);
