import Link from "next/link";
import { concerns } from "@/content/concerns";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/Icons";

export function Concerns() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading en="Concerns" title="このようなお悩みはありませんか？" align="center" />
        <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
          {concerns.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="group flex min-h-16 items-center gap-3 rounded-2xl border border-line bg-white p-2 pr-4 text-base font-medium text-ink shadow-card transition-colors hover:border-brand-300 hover:bg-brand-50 sm:text-lg"
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
        <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-ink-soft sm:text-lg">
          ひとつでも当てはまる方は、我慢せずにご相談ください。清水接骨院では、痛みの出ている場所だけでなく身体全体の状態を確認し、原因と考えられる部分に目を向けた施術を行っています。
        </p>
        <p className="mt-2 text-center text-xs text-muted">※写真はイメージです。</p>
      </div>
    </section>
  );
}
