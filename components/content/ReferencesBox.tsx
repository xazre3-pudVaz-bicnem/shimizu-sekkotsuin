import type { Reference } from "@/content/references";
import { ExternalIcon } from "@/components/ui/Icons";

/** 参考情報（公的機関・学会の一次情報のみ）。該当がなければ何も表示しない。 */
export function ReferencesBox({ items, className }: { items: Reference[]; className?: string }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="references-heading" className={className}>
      <h2 id="references-heading" className="text-lg font-bold text-ink">
        参考情報
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        このページの一般的な説明は、公的機関・学会が公開している次の情報を参考にしています。症状の判断や診断については、医療機関にご相談ください。
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((r) => (
          <li key={r.url} className="text-sm leading-relaxed">
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 font-medium text-brand-700 underline decoration-brand-300 underline-offset-4 hover:decoration-brand-600"
            >
              {r.title}
              <ExternalIcon size={13} />
            </a>
            <span className="ml-1 text-muted">／ {r.publisher}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted">最終確認日：2026年8月31日</p>
    </section>
  );
}
