/**
 * 院の基本情報（NAP）。Googleビジネスプロフィール等と表記を統一するため、必ずここから参照する。
 * 出典: 既存公式サイト https://shimizu.sei-kotsu.com/lp/koshi/ （2026-08-30 確認）
 */
export const clinic = {
  name: "清水接骨院",
  nameReading: "しみずせっこついん",
  tagline: "足立区扇・高野駅徒歩5分の接骨院",
  address: {
    postalCode: "123-0873",
    region: "東京都",
    locality: "足立区",
    street: "扇2-35-8",
    building: "パークハイツ扇 1F南",
    /** 表記統一用（Googleビジネスプロフィールと照合すること） */
    full: "東京都足立区扇2-35-8 パークハイツ扇1F南",
  },
  tel: "03-3855-8976",
  telHref: "tel:03-3855-8976",
  telNote: "施術中は電話に出られないことがあります。その場合は折り返しご連絡しますので、LINEでのご連絡もご利用ください。",
  line: {
    url: "https://page.line.me/ory2666w",
    label: "LINEで相談・予約",
    note: "24時間受付（返信は営業時間内）",
  },
  hours: [
    { days: "平日", time: "9:30〜19:00" },
    { days: "土曜", time: "9:30〜17:00" },
  ],
  closed: "日曜・祝日",
  reservation: "完全予約制",
  staffNote: "施術はすべて院長が担当します",
  /** Schema.org openingHoursSpecification 用 */
  openingHoursSpecification: [
    { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:30", closes: "19:00" },
    { dayOfWeek: ["Saturday"], opens: "09:30", closes: "17:00" },
  ],
  access: {
    stations: [
      { line: "日暮里・舎人ライナー", station: "高野駅", walk: "徒歩5分" },
      { line: "日暮里・舎人ライナー", station: "扇大橋駅", walk: "徒歩6分" },
    ],
    parking: "駐車場1台あり（小型車のみ）。徒歩1分にコインパーキングもあります。",
    parkingNote: "お車で来院希望の方は、ご予約時にご相談ください。ご案内します。",
  },
  links: {
    googleMaps: "https://g.page/shimizu-sekkotsuin?share",
    /** Googleクチコミ投稿リンク（g.page の短縮名からの標準形式。実際に投稿画面が開くか要確認） */
    googleReview: "https://g.page/shimizu-sekkotsuin/review?rc",
    ekiten: "https://www.ekiten.jp/shop_45920/",
  },
  /** 埋め込み地図（APIキー不要の検索埋め込み） */
  mapEmbedUrl:
    "https://maps.google.com/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E8%B6%B3%E7%AB%8B%E5%8C%BA%E6%89%872-35-8%20%E6%B8%85%E6%B0%B4%E6%8E%A5%E9%AA%A8%E9%99%A2&z=16&output=embed",
} as const;

export const director = {
  name: "清水 正尊",
  nameCompact: "清水正尊",
  role: "院長",
  license: "柔道整復師（国家資格）",
  careerYears: "30年以上",
  totalCases: "累計10万件超",
  /** 既存サイトで確認できた事実のみ */
  facts: [
    "国家資格「柔道整復師」を保有",
    "施術歴30年以上、累計10万件を超える施術経験",
    "他の接骨院で幅広い施術経験を積んだのち、足立区扇に清水接骨院を開設",
    "腰・お尻・脚の痛みやしびれに関する施術経験が豊富",
    "施術はすべて院長が担当（完全予約制）",
  ],
  /** 施術で取り入れている考え方・手技（既存サイト記載をもとに再構成） */
  methods: [
    "筋膜・筋肉へのソフトな手技",
    "骨格・骨盤のバランス調整",
    "運動連鎖（身体のつながり）の考え方",
    "トリガーポイントの考え方",
    "内臓まわりの緊張への配慮",
  ],
  greeting: [
    "どこに行っても変わらず、痛みのせいで好きなことを諦めかけている方の力になりたい。そんな思いで、足立区扇で清水接骨院を続けています。",
    "私は柔道整復師の国家資格を持ち、これまでに30年以上、累計10万件を超える施術に携わってきました。中でも腰やお尻の痛み、脚のしびれに関するご相談は多く、身体全体のつながりを確認しながら一人ひとりに合わせた施術を行っています。",
    "当院の施術は、強く押したり無理に身体を鳴らしたりしない、ソフトな手技が中心です。筋膜や筋肉、骨格や骨盤のバランス、運動連鎖やトリガーポイントの考え方を組み合わせ、痛みが出ている場所だけでなく、その背景にある身体の使い方まで目を向けます。",
    "病院や他の施術で思うような変化がなかった方、諦めかけている方も、まずは一度ご相談ください。身体の状態を確認したうえで、今できることを一緒に考えます。必要と判断した場合は、医療機関の受診をお勧めすることもあります。",
  ],
} as const;
