import Link from "next/link";
import { JsonLd } from "@/components/ui/JsonLd";
import { ChevronIcon } from "@/components/ui/Icons";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export type Crumb = { name: string; href?: string };

export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  const all: Crumb[] = [{ name: "ホーム", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="パンくずリスト" className={className}>
        <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm text-muted">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={i} className="flex items-center gap-1">
                {c.href && !last ? (
                  <Link href={c.href} className="inline-flex min-h-10 items-center rounded px-1 hover:text-brand-700 hover:underline">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined} className="inline-flex min-h-10 items-center px-1 font-medium text-ink-soft">
                    {c.name}
                  </span>
                )}
                {!last && <ChevronIcon size={14} className="text-line" />}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}
