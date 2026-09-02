import type { ImageKey } from "@/content/images";

/**
 * トップページ「いろいろ試したけれど、変わらないと感じていませんか？」
 *
 * 想定しているのは「初めて腰痛になった方」ではなく、
 * 整形外科・他の接骨院・整体院・湿布や痛み止めをひととおり試しても
 * つらさが続いている方。各項目から該当する症状ページへ内部リンクする。
 */
export const concerns: { text: string; href: string }[] = [
  { text: "整形外科に通っているが、腰や脚のつらさが続いている", href: "/symptoms/lower-back-pain" },
  { text: "接骨院や整体院を何軒も回った", href: "/symptoms/chronic-lower-back-pain" },
  { text: "湿布や痛み止めでしのいでいる", href: "/symptoms/sciatica" },
  { text: "マッサージを受けてもまた戻ってしまう", href: "/symptoms/shoulder-stiffness" },
  { text: "ヘルニアや脊柱管狭窄症と言われ、不安を感じている", href: "/symptoms/lumbar-disc-herniation" },
  { text: "年齢だから仕方ないと諦めかけている", href: "/symptoms/spinal-stenosis" },
];

/** セクションに添える症状イメージ（AI生成の症状説明用画像。実際の来院者ではない） */
export const concernImages: ImageKey[] = ["photo-lower-back-standing", "photo-hip-sofa-man", "photo-knee-senior-woman"];

/** トップページに表示する件数 */
export const HOME_CONCERNS_COUNT = 6;
