import type { Article, ArticleCategoryId } from "@/content/types";
import { whyLowerBackPainLasts } from "./why-lower-back-pain-lasts";
import { morningLowerBackPain } from "./morning-lower-back-pain";
import { sittingLowerBackPain } from "./sitting-lower-back-pain";
import { walkingLowerBackPain } from "./walking-lower-back-pain";
import { postureAndLowerBackPain } from "./posture-and-lower-back-pain";
import { lowerBackPainDonts } from "./lower-back-pain-donts";
import { whatIsChronicLowerBackPain } from "./what-is-chronic-lower-back-pain";
import { acuteLowerBackPainFirstAid } from "./acute-lower-back-pain-first-aid";
import { whatIsSciatica } from "./what-is-sciatica";
import { sciaticaVsLowerBackPain } from "./sciatica-vs-lower-back-pain";
import { sciaticaButtockPain } from "./sciatica-buttock-pain";
import { sciaticaLegNumbness } from "./sciatica-leg-numbness";
import { whatIsDiscHerniation } from "./what-is-disc-herniation";
import { herniationAndSciatica } from "./herniation-and-sciatica";
import { whatIsSpinalStenosis } from "./what-is-spinal-stenosis";
import { stenosisWalkingSymptoms } from "./stenosis-walking-symptoms";
import { intermittentClaudication } from "./intermittent-claudication";
import { whatIsSpondylolisthesis } from "./what-is-spondylolisthesis";
import { persistentLegNumbness } from "./persistent-leg-numbness";
import { elderlyLowerBackConcerns } from "./elderly-lower-back-concerns";
import { lowerBackPainSelfCare } from "./lower-back-pain-self-care";
import { deskWorkLowerBackPain } from "./desk-work-lower-back-pain";
import { drivingLowerBackPain } from "./driving-lower-back-pain";
import { sleepingPostureLowerBackPain } from "./sleeping-posture-lower-back-pain";
import { neckShoulderStiffnessSmartphone } from "./neck-shoulder-stiffness-smartphone";
import { kneePainStairs } from "./knee-pain-stairs";
import { howSpineAndPelvisWork } from "./how-spine-and-pelvis-work";
// [auto-import] scripts/generate-column.mjs がこの行の直前に import を追加します

const all: Article[] = [
  whyLowerBackPainLasts,
  morningLowerBackPain,
  sittingLowerBackPain,
  walkingLowerBackPain,
  postureAndLowerBackPain,
  lowerBackPainDonts,
  whatIsChronicLowerBackPain,
  acuteLowerBackPainFirstAid,
  whatIsSciatica,
  sciaticaVsLowerBackPain,
  sciaticaButtockPain,
  sciaticaLegNumbness,
  whatIsDiscHerniation,
  herniationAndSciatica,
  whatIsSpinalStenosis,
  stenosisWalkingSymptoms,
  intermittentClaudication,
  whatIsSpondylolisthesis,
  persistentLegNumbness,
  elderlyLowerBackConcerns,
  lowerBackPainSelfCare,
  deskWorkLowerBackPain,
  drivingLowerBackPain,
  sleepingPostureLowerBackPain,
  neckShoulderStiffnessSmartphone,
  kneePainStairs,
  howSpineAndPelvisWork,
  // [auto-list] scripts/generate-column.mjs がこの行の直前に記事を追加します
];

/** 更新日の新しい順 */
export const articles: Article[] = [...all].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0));

export function getArticle(slug: string): Article | undefined {
  return all.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: ArticleCategoryId): Article[] {
  return articles.filter((a) => a.category === category);
}

export function getArticlesBySymptom(slug: string): Article[] {
  return articles.filter((a) => a.relatedSymptoms.includes(slug));
}
