import type { ImageKey } from "@/content/images";

export type FaqItem = { q: string; a: string };

export type SymptomCategoryId = "lower-back" | "hip-leg" | "knee" | "neck-shoulder" | "back" | "head" | "injury" | "limbs";

export const symptomCategories: { id: SymptomCategoryId; name: string; description: string; image: ImageKey }[] = [
  { id: "lower-back", name: "腰の痛み", description: "腰痛・慢性腰痛・ぎっくり腰・椎間板ヘルニア・脊柱管狭窄症・腰椎すべり症・産後の腰痛", image: "tile-b-03" },
  { id: "hip-leg", name: "お尻・脚の痛みやしびれ", description: "坐骨神経痛・足のしびれ・股関節痛・変形性股関節症", image: "tile-a-07" },
  { id: "knee", name: "膝の痛み", description: "膝の痛み・変形性膝関節症・半月板損傷", image: "tile-d-02" },
  { id: "neck-shoulder", name: "首・肩の痛み", description: "肩こり・首の痛み・ストレートネック・四十肩・五十肩", image: "tile-d-06" },
  { id: "head", name: "頭痛", description: "首や肩のこりに伴う緊張型頭痛", image: "tile-a-09" },
  { id: "back", name: "背中の痛み", description: "背中の張り・痛み", image: "tile-e-10" },
  { id: "injury", name: "ケガ・スポーツによる痛み", description: "捻挫・打撲・肉離れ、スポーツによる痛み", image: "tile-c-04" },
  { id: "limbs", name: "肘・手首・足の痛み", description: "肘・手首の痛み、足首・足の痛み", image: "tile-e-08" },
];

export type Symptom = {
  slug: string;
  name: string;
  /** カードなどで使う短い説明 */
  short: string;
  category: SymptomCategoryId;
  /** 1 = 最重要ページ（情報量を厚くする） */
  priority: 1 | 2;
  seo: { title: string; description: string; ogTitle: string; ogDescription: string; keywords: string[] };
  h1: string;
  /** ファーストビュー：患者が抱える悩みと当院の方針 */
  lead: string[];
  concerns: string[];
  about: string[];
  commonSymptoms: string[];
  causes: { title: string; text: string }[];
  dailyLife: string[];
  redFlags: { intro: string; items: string[]; outro: string };
  approach: string[];
  examination: string[];
  treatment: string[];
  whyWholeBody: string[];
  prevention: { title: string; text: string }[];
  voiceIds: string[];
  faq: FaqItem[];
  relatedSymptoms: string[];
  relatedArticles: string[];
  image: ImageKey;
  publishedAt: string;
  updatedAt: string;
};

export type ArticleCategoryId =
  | "lower-back"
  | "sciatica"
  | "herniation"
  | "stenosis"
  | "acute"
  | "posture"
  | "self-care"
  | "numbness"
  | "neck-shoulder"
  | "knee"
  | "body";

export const articleCategories: { id: ArticleCategoryId; name: string; description: string }[] = [
  { id: "lower-back", name: "腰痛", description: "腰痛が長引く理由や、日常生活での腰の痛みについて" },
  { id: "sciatica", name: "坐骨神経痛", description: "お尻から脚にかけての痛み・しびれについて" },
  { id: "herniation", name: "椎間板ヘルニア", description: "椎間板ヘルニアの基礎知識と坐骨神経痛との関係" },
  { id: "stenosis", name: "脊柱管狭窄症", description: "歩くとつらくなる腰の症状、間欠性跛行について" },
  { id: "acute", name: "ぎっくり腰", description: "急な腰の痛みが出たときの対応と注意点" },
  { id: "posture", name: "姿勢", description: "姿勢・座り方・デスクワークと身体の痛みの関係" },
  { id: "self-care", name: "セルフケア", description: "自宅でできる工夫と、やってはいけないこと" },
  { id: "numbness", name: "足のしびれ", description: "脚やお尻のしびれについて知っておきたいこと" },
  { id: "neck-shoulder", name: "肩・首", description: "肩こり・首の痛み・ストレートネックについて" },
  { id: "knee", name: "膝", description: "膝の痛みと歩き方・日常動作の関係" },
  { id: "body", name: "身体の仕組み", description: "背骨・骨盤・筋肉のつながりから痛みを理解する" },
];

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategoryId;
  publishedAt: string;
  updatedAt: string;
  image: ImageKey;
  /** 記事の要点（3〜4個） */
  summary: string[];
  /** 簡易Markdown（## / ### / - / 1. / > / **強調** / [リンク](/path)） */
  body: string;
  relatedSymptoms: string[];
  relatedArticles: string[];
};

export type Voice = {
  id: string;
  who: string;
  symptoms: string[];
  symptomSlugs: string[];
  /** 本文からの引用（患者さんの言葉） */
  headline: string;
  body: string[];
  image?: ImageKey;
  featured?: boolean;
};
