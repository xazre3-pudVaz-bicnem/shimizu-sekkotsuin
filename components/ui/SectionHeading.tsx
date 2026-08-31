import { cx } from "@/lib/utils";

type Props = {
  /** 見出しの上に置く短い日本語ラベル（任意） */
  kicker?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  level?: 2 | 3;
  className?: string;
  light?: boolean;
};

export function SectionHeading({ kicker, title, lead, align = "left", level = 2, className, light = false }: Props) {
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <div className={cx(align === "center" && "text-center", className)}>
      {kicker && (
        <p className={cx("mb-2.5 text-sm font-bold tracking-wide", light ? "text-brand-200" : "text-brand-700")}>{kicker}</p>
      )}
      <Tag className={cx("text-2xl leading-snug sm:text-3xl lg:text-[2.125rem]", light ? "text-white" : "text-ink")}>{title}</Tag>
      {lead && (
        <p
          className={cx(
            "mt-4 max-w-2xl text-base leading-[1.8] sm:text-[17px]",
            align === "center" && "mx-auto",
            light ? "text-brand-100" : "text-ink-soft",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
