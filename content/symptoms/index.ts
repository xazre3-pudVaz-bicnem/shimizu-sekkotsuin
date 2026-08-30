import type { Symptom, SymptomCategoryId } from "@/content/types";
import { lowerBackPain } from "./lower-back-pain";
import { chronicLowerBackPain } from "./chronic-lower-back-pain";
import { acuteLowerBackPain } from "./acute-lower-back-pain";
import { sciatica } from "./sciatica";
import { lumbarDiscHerniation } from "./lumbar-disc-herniation";
import { spinalStenosis } from "./spinal-stenosis";
import { spondylolisthesis } from "./spondylolisthesis";
import { legNumbness } from "./leg-numbness";
import { hipPain } from "./hip-pain";
import { kneePain } from "./knee-pain";
import { kneeOsteoarthritis } from "./knee-osteoarthritis";
import { shoulderStiffness } from "./shoulder-stiffness";
import { neckPain } from "./neck-pain";
import { straightNeck } from "./straight-neck";
import { frozenShoulder } from "./frozen-shoulder";
import { backPain } from "./back-pain";

/** 表示順 = 一覧の並び順 */
export const symptoms: Symptom[] = [
  lowerBackPain,
  chronicLowerBackPain,
  acuteLowerBackPain,
  sciatica,
  lumbarDiscHerniation,
  spinalStenosis,
  spondylolisthesis,
  legNumbness,
  hipPain,
  kneePain,
  kneeOsteoarthritis,
  shoulderStiffness,
  neckPain,
  straightNeck,
  frozenShoulder,
  backPain,
];

export function getSymptom(slug: string): Symptom | undefined {
  return symptoms.find((s) => s.slug === slug);
}

export function getSymptomsByCategory(category: SymptomCategoryId): Symptom[] {
  return symptoms.filter((s) => s.category === category);
}

/** トップページ「腰痛を重点訴求」で使う最重要6症状 */
export const lowerBackFocusSlugs = [
  "lower-back-pain",
  "chronic-lower-back-pain",
  "sciatica",
  "lumbar-disc-herniation",
  "spinal-stenosis",
  "acute-lower-back-pain",
] as const;
