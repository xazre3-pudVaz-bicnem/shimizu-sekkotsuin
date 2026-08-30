import Link from "next/link";
import type { Symptom } from "@/content/types";
import { symptomCategories } from "@/content/types";
import { ArrowIcon } from "@/components/ui/Icons";
import { cx } from "@/lib/utils";

export function SymptomCard({ symptom, compact = false }: { symptom: Symptom; compact?: boolean }) {
  const cat = symptomCategories.find((c) => c.id === symptom.category);
  return (
    <Link
      href={`/symptoms/${symptom.slug}`}
      className={cx(
        "card group flex h-full flex-col justify-between gap-3 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft",
        compact ? "p-4" : "p-5 sm:p-6",
      )}
    >
      <div>
        {!compact && cat && <p className="text-xs font-bold text-brand-600">{cat.name}</p>}
        <p className={cx("font-bold text-ink", compact ? "text-base" : "mt-1 text-lg sm:text-xl")}>{symptom.name}</p>
        <p className={cx("leading-relaxed text-muted", compact ? "mt-1.5 line-clamp-2 text-[13px]" : "mt-2 text-sm")}>{symptom.short}</p>
      </div>
      <span className="inline-flex items-center gap-1 text-sm font-bold text-brand-700">
        詳しく見る
        <ArrowIcon size={16} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
