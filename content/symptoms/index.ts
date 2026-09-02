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

/** トップページの「特に多い症状」で表示する8症状（残りは /symptoms へ誘導） */
export const featuredSymptomSlugs = [
  "lower-back-pain",
  "chronic-lower-back-pain",
  "sciatica",
  "lumbar-disc-herniation",
  "spinal-stenosis",
  "leg-numbness",
  "knee-pain",
  "shoulder-stiffness",
] as const;

/**
 * カード8枚に入りきらないが、トップページからの内部リンクを維持したい症状。
 * カードではなくテキストリンクの行として控えめに置く。
 */
export const secondarySymptomSlugs = [
  "acute-lower-back-pain",
  "hip-pain",
  "knee-osteoarthritis",
  "frozen-shoulder",
  "neck-pain",
  "straight-neck",
  "back-pain",
  "postpartum-back-pain",
  "tension-headache",
  "sports-injury",
] as const;

/** 腰まわりの最重要6症状（フッター・症状一覧など、腰痛クラスタの導線で使う） */
export const lowerBackFocusSlugs = [
  "lower-back-pain",
  "chronic-lower-back-pain",
  "sciatica",
  "lumbar-disc-herniation",
  "spinal-stenosis",
  "acute-lower-back-pain",
] as const;
