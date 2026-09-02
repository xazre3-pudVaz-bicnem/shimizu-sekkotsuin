import type { ImageKey } from "@/content/images";

/**
 * トップページ「『何をしても変わらない』と感じていませんか？」
 *
 * 想定しているのは「初めて腰痛になった方」ではなく、
 * 整形外科・他の接骨院・整体院・湿布や痛み止めをひととおり経験しても
 * つらさが続いている方。各項目から該当する症状ページへ内部リンクする。
 */
export const concerns: { text: string; href: string }[] = [
  { text: "整形外科に通っているが、腰や脚のつらさが続いている", href: "/symptoms/lower-back-pain" },
  { text: "接骨院・整体院を何軒も回ったが、そのたびに元に戻る", href: "/symptoms/chronic-lower-back-pain" },
  { text: "湿布や痛み止めを続けているが、このままでいいのか不安", href: "/symptoms/sciatica" },
  { text: "マッサージを受けても、しばらくすると同じ状態になる", href: "/symptoms/shoulder-stiffness" },
  { text: "ヘルニア・坐骨神経痛・脊柱管狭窄症と言われた", href: "/symptoms/lumbar-disc-herniation" },
  { text: "長く歩くこと、出かけることを諦め始めている", href: "/symptoms/spinal-stenosis" },
];

/** セクションに添える症状イメージ（AI生成の症状説明用画像。実際の来院者ではない） */
export const concernImages: ImageKey[] = ["photo-lower-back-standing", "photo-hip-sofa-man", "photo-knee-senior-woman"];

/** トップページに表示する件数 */
export const HOME_CONCERNS_COUNT = 6;
