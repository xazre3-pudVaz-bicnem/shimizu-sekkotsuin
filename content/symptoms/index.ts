import type { Symptom, SymptomCategoryId } from "@/content/types";
import { lowerBackPain } from "./lower-back-pain";
import { chronicLowerBackPain } from "./chronic-lower-back-pain";
import { acuteLowerBackPain } from "./acute-lower-back-pain";
import { sciatica } from "./sciatica";
import { lumbarDiscHerniation } from "./lumbar-disc-herniation";
import { spinalStenosis } from "./spinal-stenosis";
import { spondylolisthesis } from "./spondylolisthesis";
import { postpartumBackPain } from "./postpartum-back-pain";
import { legNumbness } from "./leg-numbness";
import { hipPain } from "./hip-pain";
import { hipOsteoarthritis } from "./hip-osteoarthritis";
import { kneePain } from "./knee-pain";
import { kneeOsteoarthritis } from "./knee-osteoarthritis";
import { meniscusInjury } from "./meniscus-injury";
import { shoulderStiffness } from "./shoulder-stiffness";
import { neckPain } from "./neck-pain";
import { straightNeck } from "./straight-neck";
import { frozenShoulder } from "./frozen-shoulder";
import { tensionHeadache } from "./tension-headache";
import { backPain } from "./back-pain";
import { sprainBruiseStrain } from "./sprain-bruise-strain";
import { sportsInjury } from "./sports-injury";
import { elbowWristPain } from "./elbow-wrist-pain";
import { ankleFootPain } from "./ankle-foot-pain";

/** 表示順 = 一覧の並び順 */
export const symptoms: Symptom[] = [
  lowerBackPain,
  chronicLowerBackPain,
  acuteLowerBackPain,
  sciatica,
  lumbarDiscHerniation,
  spinalStenosis,
  spondylolisthesis,
  postpartumBackPain,
  legNumbness,
  hipPain,
  hipOsteoarthritis,
  kneePain,
  kneeOsteoarthritis,
  meniscusInjury,
  shoulderStiffness,
  neckPain,
  straightNeck,
  frozenShoulder,
  tensionHeadache,
  backPain,
  sprainBruiseStrain,
  sportsInjury,
  elbowWristPain,
  ankleFootPain,
];

export function getSymptom(slug: string): Symptom | undefined {
  return symptoms.find((s) => s.slug === slug);
}

export function getSymptomsByCategory(category: SymptomCategoryId): Symptom[] {
  return symptoms.filter((s) => s.category === category);
}

/** トップページの「主な症状から探す」で表示する8症状（残りは /symptoms へ誘導） */
export const featuredSymptomSlugs = [
  "lower-back-pain",
  "chronic-lower-back-pain",
  "acute-lower-back-pain",
  "sciatica",
  "lumbar-disc-herniation",
  "spinal-stenosis",
  "knee-pain",
  "shoulder-stiffness",
] as const;

/** トップページ「腰痛を重点訴求」で使う最重要6症状 */
export const lowerBackFocusSlugs = [
  "lower-back-pain",
  "chronic-lower-back-pain",
  "sciatica",
  "lumbar-disc-herniation",
  "spinal-stenosis",
  "acute-lower-back-pain",
] as const;
