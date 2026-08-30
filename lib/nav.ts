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

export const subNav: NavItem[] = [
  { label: "清水接骨院について", href: "/about" },
  { label: "よくある質問", href: "/faq" },
  { label: "記事監修について", href: "/supervision" },
  { label: "プライバシーポリシー", href: "/privacy" },
  { label: "免責事項", href: "/disclaimer" },
  { label: "サイトポリシー", href: "/site-policy" },
];
