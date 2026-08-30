/**
 * 料金設定。金額は既存公式サイト（https://shimizu.sei-kotsu.com/lp/koshi/ 2026-08-30 確認）の
 * 料金表画像・本文から取得。変更時はこのファイルだけを編集する。
 */
export const pricing = {
  taxIncluded: true,
  currency: "JPY",
  /** 通常料金（2回目以降） */
  regular: { label: "施術料（2回目以降）", price: 12000 },
  /** 初回の内訳 */
  first: {
    label: "初回（カウンセリング・身体の状態確認＋施術）",
    consultationFee: 0,
    treatmentFee: 12000,
    total: 12000,
  },
  /** 初回限定キャンペーン。終了時は enabled を false にする */
  campaign: {
    enabled: true,
    label: "初回限定お試しキャンペーン",
    price: 3300,
    dailyLimit: 2,
    howTo: "ご予約の際に「ホームページのキャンペーンを見た」とお伝えください。",
    sourceNote: "既存サイトの料金表画像より（2026-08-30時点）",
  },
  /** 全額返金保証（既存サイト記載）。運用しない場合は enabled を false にする */
  guarantee: {
    enabled: true,
    label: "初回全額返金保証",
    description: "初回の施術にご満足いただけなかった場合は、施術料を全額返金します。",
    note: "初回の施術が対象です。詳しい条件は院にてご確認ください。",
  },
  insurance: {
    policy:
      "当院の施術は自費（保険外）です。健康保険を使った施術は内容に制限があり、身体全体を確認しながら行う当院の施術を十分に提供できないためです。",
  },
  /** 未確認のため非表示。院に確認後 verified を true にする */
  payment: {
    verified: false,
    methods: ["現金", "LINE Pay", "d払い", "メルペイ", "au PAY"],
  },
  risks: [
    "施術後に一時的なだるさや眠気、軽い痛みを感じることがあります。多くは数日以内に落ち着きますが、気になる場合はご連絡ください。",
    "発熱、強い痛み、しびれや筋力低下の進行、排尿・排便の異常など、医療機関での確認が必要と考えられる状態のときは施術を行わず、受診をお勧めします。",
    "持病のある方、通院中の方、妊娠中の方、手術歴のある方は、カウンセリング時に必ずお知らせください。状態に応じて施術内容を調整します。",
  ],
} as const;

export const formatYen = (n: number) => `${n.toLocaleString("ja-JP")}円`;
