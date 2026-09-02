import { clinic } from "@/content/clinic";
import { cx } from "@/lib/utils";
import { LineIcon, PhoneIcon } from "@/components/ui/Icons";

type Props = {
  className?: string;
  align?: "start" | "center";
  /** 営業時間・注意書きを表示する */
  showNote?: boolean;
  size?: "md" | "lg";
};

export function CtaButtons({ className, align = "start", showNote = true, size = "lg" }: Props) {
  const btn = size === "lg" ? "min-h-14 px-7 text-lg" : "";
  return (
    <div className={cx(align === "center" && "text-center", className)}>
      <div className={cx("flex flex-col gap-3 sm:flex-row sm:flex-wrap", align === "center" && "sm:justify-center")}>
        <a href={clinic.line.url} target="_blank" rel="noopener noreferrer" className={cx("btn btn-line w-full sm:w-auto", btn)}>
          <LineIcon size={22} />
          {clinic.line.label}
        </a>
        <a href={clinic.telHref} className={cx("btn btn-primary w-full sm:w-auto", btn)}>
          <PhoneIcon size={20} />
          <span>
            電話で相談・予約 <span className="tel-link ml-1">{clinic.tel}</span>
          </span>
        </a>
      </div>
      {showNote && (
        <>
          <p className={cx("mt-3 text-[15px] font-medium leading-relaxed text-ink-soft", align === "center" && "mx-auto max-w-xl")}>
            「この症状でも相談できますか？」というご質問だけでも構いません。
          </p>
          <p className={cx("mt-2 text-sm leading-relaxed text-muted", align === "center" && "mx-auto max-w-xl")}>
            {clinic.reservation}｜{clinic.hours.map((h) => `${h.days} ${h.time}`).join("／")}｜定休日 {clinic.closed}
            <br />
            {clinic.telNote}
          </p>
        </>
      )}
    </div>
  );
}
