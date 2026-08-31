import type { ImageKey } from "@/content/images";

/**
 * トップページ「このようなお悩みはありませんか？」
 * 上位6件をトップに表示する（残りは症状一覧・フッターから到達できる）。
 */
export const concerns: { text: string; href: string; image: ImageKey }[] = [
  { text: "長い間、腰の痛みが続いている", href: "/symptoms/chronic-lower-back-pain", image: "tile-b-01" },
  { text: "お尻から脚にかけて痛みやしびれがある", href: "/symptoms/sciatica", image: "tile-a-07" },
  { text: "病院で椎間板ヘルニアと言われた", href: "/symptoms/lumbar-disc-herniation", image: "tile-b-04" },
  { text: "歩くと脚がつらくなり、休むと楽になる", href: "/symptoms/spinal-stenosis", image: "tile-c-07" },
  { text: "急に腰が痛くなって動けない", href: "/symptoms/acute-lower-back-pain", image: "tile-b-10" },
  { text: "膝が痛くて階段や正座がつらい", href: "/symptoms/knee-pain", image: "tile-a-02" },
  { text: "足のしびれがなかなか取れない", href: "/symptoms/leg-numbness", image: "tile-e-08" },
  { text: "首や肩のこり・痛みがつらい", href: "/symptoms/shoulder-stiffness", image: "tile-d-05" },
  { text: "首や肩のこりから頭痛が起こる", href: "/symptoms/tension-headache", image: "tile-a-09" },
  { text: "産後、腰や骨盤まわりがつらい", href: "/symptoms/postpartum-back-pain", image: "tile-e-07" },
];

/** トップページに表示する件数 */
export const HOME_CONCERNS_COUNT = 6;
