import type { ImageKey } from "@/content/images";

/**
 * 同業の先生・専門家からの推薦。
 *
 * 出典: 2026-09-02 に院（オーナー）から直接いただいた4名。氏名・院名・地域・顔写真は
 * いただいた情報をそのまま登録している。推測で肩書きや資格を補わないこと。
 *
 * 【要オーナー確認・未対応】
 *  - 推薦文（コメント本文）はまだいただいていない。文章を創作することはできないため、
 *    現状は氏名・院名・地域・お写真のみを掲載している。
 *    4名それぞれのコメントが届いたら quote に入れるだけで表示される。
 *  - 木村先生・梶田先生は役職（院長など）の記載がなかったため付けていない。
 *  - 梶田先生は所在地の記載がなかったため area を空にしている。
 *
 * 旧腰痛LP（https://shimizu.sei-kotsu.com/lp/koshi/）に載っていた
 * 森康則様・荒蒔聡様・輿石隆太様は、オーナーの指示により2026-09-02に差し替えた。
 *
 * 表現上の注意: 推薦はご本人の見解であり、当院が効果を約束するものではない。
 * セクションに必ず ENDORSEMENT_DISCLAIMER を表示すること。
 */
export type Endorsement = {
  id: string;
  /** 氏名（いただいた表記のまま） */
  name: string;
  /** 院名・肩書き（いただいた表記のまま） */
  affiliation: string;
  /** 所在地。記載がない場合は省略 */
  area?: string;
  /** ご本人の顔写真 */
  image: ImageKey;
  /** 推薦文。いただき次第ここに入れる（未入力の間は本文を表示しない） */
  quote?: string;
};

export const endorsements: Endorsement[] = [
  {
    id: "kobayashi",
    name: "小林 和哉 先生",
    affiliation: "かず御幸整体院 院長",
    area: "広島県福山市",
    image: "endorser-kobayashi",
  },
  {
    id: "kimura",
    name: "木村 有軌 先生",
    affiliation: "たいよう鍼灸整骨院",
    area: "京都市伏見区",
    image: "endorser-kimura",
  },
  {
    id: "ri",
    name: "李 光林 先生",
    affiliation: "北京気功整体院 院長",
    area: "大阪府八尾市",
    image: "endorser-ri",
  },
  {
    id: "kajita",
    name: "梶田 哲平 先生",
    affiliation: "中央元気堂整体院",
    image: "endorser-kajita",
  },
];

export const ENDORSEMENT_DISCLAIMER =
  "※推薦はご本人の見解であり、施術の結果や効果を保証するものではありません。";
