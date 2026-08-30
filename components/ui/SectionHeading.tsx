import { cx } from "@/lib/utils";

type Props = {
  en?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  level?: 2 | 3;
  className?: string;
  light?: boolean;
};

export function SectionHeading({ en, title, lead, align = "left", level = 2, className, light = false }: Props) {
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <div className={cx(align === "center" && "text-center", className)}>
      {en && <p className={cx("label-en mb-3", light && "text-brand-200")}>{en}</p>}
      <Tag className={cx("text-2xl leading-snug sm:text-3xl lg:text-[2.125rem]", light ? "text-white" : "text-ink")}>{title}</Tag>
      {lead && (
        <p className={cx("mt-4 max-w-2xl text-base leading-relaxed sm:text-lg", align === "center" && "mx-auto", light ? "text-brand-100" : "text-muted")}>
          {lead}
        </p>
      )}
    </div>
  );
}
