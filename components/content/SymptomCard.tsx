import Link from "next/link";
import type { Symptom } from "@/content/types";
import { symptomCategories } from "@/content/types";
import { Photo } from "@/components/ui/Photo";
import { ArrowIcon } from "@/components/ui/Icons";

export function SymptomCard({ symptom, compact = false }: { symptom: Symptom; compact?: boolean }) {
  const cat = symptomCategories.find((c) => c.id === symptom.category);

  if (compact) {
    return (
      <Link
        href={`/symptoms/${symptom.slug}`}
        className="card group flex h-full items-center gap-3 p-3 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft"
      >
        <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white">
          <Photo id={symptom.image} fill sizes="64px" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-base font-bold text-ink">{symptom.name}</span>
          <span className="mt-0.5 line-clamp-2 block text-[13px] leading-relaxed text-muted">{symptom.short}</span>
        </span>
        <ArrowIcon size={16} className="shrink-0 text-brand-600 transition-transform group-hover:translate-x-0.5" />
      </Link>
    );
  }

  return (
    <Link
      href={`/symptoms/${symptom.slug}`}
      className="card group flex h-full flex-col overflow-hidden transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft"
    >
      <span className="relative block aspect-[4/3] w-full overflow-hidden bg-white">
        <Photo id={symptom.image} fill sizes="(min-width: 1024px) 300px, 46vw" className="transition-transform duration-500 group-hover:scale-[1.03]" />
      </span>
      <span className="flex flex-1 flex-col p-4 sm:p-5">
        {cat && <span className="text-xs font-bold text-brand-600">{cat.name}</span>}
        <span className="mt-1 text-base font-bold leading-snug text-ink sm:text-lg lg:text-xl">{symptom.name}</span>
        <span className="mt-2 text-[13px] leading-relaxed text-muted sm:text-sm">{symptom.short}</span>
        <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[13px] font-bold text-brand-700 sm:pt-4 sm:text-sm">
          詳しく見る
          <ArrowIcon size={16} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </span>
    </Link>
  );
}
