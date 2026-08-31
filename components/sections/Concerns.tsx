import Link from "next/link";
import { concerns, HOME_CONCERNS_COUNT } from "@/content/concerns";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/Icons";

export function Concerns() {
  const items = concerns.slice(0, HOME_CONCERNS_COUNT);
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading
          title="このようなお悩みはありませんか？"
          align="center"
          lead="ひとつでも当てはまる方は、我慢せずにご相談ください。痛みの出ている場所だけでなく、身体全体の状態を確認したうえで施術を行います。"
        />
        <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
          {items.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="group flex min-h-[72px] items-center gap-3 rounded-2xl border border-line bg-white p-2 pr-4 text-base font-medium text-ink shadow-card transition-colors hover:border-brand-300 hover:bg-brand-50 sm:text-[17px]"
              >
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-mist">
                  <Photo id={c.image} fill sizes="64px" />
                </span>
                <span className="flex-1 leading-snug">{c.text}</span>
                <ArrowIcon size={18} className="shrink-0 text-brand-600 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center text-xs text-muted">※写真はイメージです。</p>
      </div>
    </section>
  );
}
