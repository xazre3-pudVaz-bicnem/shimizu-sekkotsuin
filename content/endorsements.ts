/**
 * 同業の先生・専門家からの推薦。
 *
 * 出典: 旧腰痛LP https://shimizu.sei-kotsu.com/lp/koshi/ （2026-09-02 にHTMLを直接確認）
 * 掲載されている氏名・肩書き・推薦文をそのまま転載している。要約・改変・創作はしない。
 *
 * 【要オーナー確認】
 *  - 3名それぞれについて、現在も掲載してよいかの許諾確認が必要（旧LP掲載時の許諾が
 *    新サイトにも及ぶかは、コード上では判断できない）。
 *  - 旧LPには推薦者の顔写真（recom-mori.jpg / recom-aramaki.jpg / recom-kosiisi.jpg）が
 *    あるが、肖像の使用許諾が確認できないため本サイトでは使用していない。
 *  - 許諾が取れた場合は public/images に配置し、content/images.ts に登録して photo を追加する。
 *
 * 表現上の注意: 推薦文はご本人の見解であり、当院が効果を約束するものではない。
 * セクションに必ず ENDORSEMENT_DISCLAIMER を表示すること。
 *
 * 表記の統一: 旧LPは半角中黒（U+FF65 HALFWIDTH KATAKANA MIDDLE DOT）を使っていたが、
 * 環境によって表示が崩れるため全角中黒（U+30FB「・」）に統一している。
 * 文字幅を揃えただけで、文言そのものは一字も変えていない。
 */
export type Endorsement = {
  id: string;
  /** 氏名（旧LP表記のまま） */
  name: string;
  /** 職種・資格（旧LP表記のまま） */
  profession: string;
  /** 所属・肩書き（旧LP表記のまま。ない場合は省略） */
  affiliation?: string;
  /** 推薦文（旧LP原文のまま。改行位置のみ整理） */
  quote: string;
};

export const endorsements: Endorsement[] = [
  {
    id: "mori",
    name: "森 康則 様",
    profession: "ボディビルダー",
    affiliation: "ボディメイク大会 優勝・準優勝多数",
    quote:
      "根本的な症状・原因に合わせた施術を行ってくれるので、数多くある整体院の中でも、清水接骨院をお勧めします。",
  },
  {
    id: "aramaki",
    name: "荒蒔 聡 様",
    profession: "鍼灸師",
    affiliation: "あらまき鍼灸整骨院 院長",
    quote:
      "清水先生は治療技術・経験に加え、“病”を診るのではなく“人”をしっかりと診て、患者様に寄り添ってくれる信頼できる先生です。",
  },
  {
    id: "koshiishi",
    name: "輿石 隆太 様",
    profession: "柔道整復師",
    affiliation: "目黒駅前こしいし整体院 院長",
    quote:
      "少しでも早く清水接骨院の施術を受けて、治療方針やあなたがどう改善していくのか相談してみてください。本当に体が楽になり、また楽しい生活が待っているはずです！",
  },
];

export const ENDORSEMENT_DISCLAIMER =
  "※推薦文は旧サイトに掲載していたものをそのまま転載しています。ご本人の見解であり、施術の結果や効果を保証するものではありません。";
