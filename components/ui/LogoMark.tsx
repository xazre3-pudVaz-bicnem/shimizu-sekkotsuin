/**
 * ロゴマーク（装飾）。
 * 以前は「清」の文字を表示していたが、リンクのアクセシブルネームが
 * 「清清水接骨院」と読まれてしまうため、テキストを持たないSVGに置き換えている。
 */
export function LogoMark({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect width="40" height="40" rx="11" fill="var(--color-brand-600)" />
      {/* 背骨をモチーフにしたマーク */}
      <path d="M20 9c-2.6 5-7.6 7-7.6 13.2A7.6 7.6 0 0 0 20 30a7.6 7.6 0 0 0 7.6-7.8C27.6 16 22.6 14 20 9z" fill="#fff" opacity="0.95" />
      <path d="M20 15.5v10M16 20.5h8" stroke="var(--color-brand-600)" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
