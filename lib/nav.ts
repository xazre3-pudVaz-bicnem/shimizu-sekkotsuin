export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "症状から探す", href: "/symptoms" },
  { label: "施術について", href: "/treatment" },
  { label: "初めての方へ", href: "/first" },
  { label: "料金案内", href: "/price" },
  { label: "お客様の声", href: "/voice" },
  { label: "院長紹介", href: "/staff" },
  { label: "コラム", href: "/column" },
  { label: "アクセス", href: "/access" },
];

/** フッター・モバイルメニューに出す補助ページ */
export const subNav: NavItem[] = [
  { label: "清水接骨院について", href: "/about" },
  { label: "施術事例", href: "/cases" },
  { label: "よくある質問", href: "/faq" },
  { label: "高野駅からの道順", href: "/access/koya-station" },
  { label: "扇大橋駅からの道順", href: "/access/ogiohashi-station" },
  { label: "口コミのお願い", href: "/review" },
  { label: "記事監修について", href: "/supervision" },
];

export const policyNav: NavItem[] = [
  { label: "プライバシーポリシー", href: "/privacy" },
  { label: "免責事項", href: "/disclaimer" },
  { label: "サイトポリシー", href: "/site-policy" },
];
