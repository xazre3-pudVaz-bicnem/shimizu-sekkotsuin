import type { FaqItem } from "@/content/types";
import { JsonLd } from "@/components/ui/JsonLd";
import { ChevronDownIcon } from "@/components/ui/Icons";
import { faqJsonLd } from "@/lib/jsonld";

type Props = { items: FaqItem[]; withSchema?: boolean; className?: string };

/** JSに依存しない details/summary のアコーディオン */
export function Faq({ items, withSchema = false, className }: Props) {
  return (
    <div className={className}>
      <div className="divide-y divide-line rounded-2xl border border-line bg-white">
        {items.map((item, i) => (
          <details key={i} className="group" open={i === 0}>
            <summary className="flex cursor-pointer items-start gap-3 px-5 py-4 text-left text-base font-bold text-ink sm:px-6 sm:py-5 sm:text-lg">
              <span aria-hidden="true" className="font-latin mt-0.5 text-brand-600">
                Q
              </span>
              <span className="flex-1">{item.q}</span>
              <ChevronDownIcon size={20} className="mt-1 shrink-0 text-muted transition-transform group-open:rotate-180" />
            </summary>
            <div className="flex gap-3 px-5 pb-5 sm:px-6 sm:pb-6">
              <span aria-hidden="true" className="font-latin font-bold text-warn">
                A
              </span>
              <p className="flex-1 text-[15px] leading-relaxed text-ink-soft sm:text-base">{item.a}</p>
            </div>
          </details>
        ))}
      </div>
      {withSchema && <JsonLd data={faqJsonLd(items)} />}
    </div>
  );
}
