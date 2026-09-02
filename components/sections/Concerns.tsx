import Link from "next/link";
import { concernImages, concerns, HOME_CONCERNS_COUNT } from "@/content/concerns";
import { Photo } from "@/components/ui/Photo";
import { ArrowIcon } from "@/components/ui/Icons";

/**
 * 「何をしても変わらない」と感じていませんか？
 * 他院・医療機関を経験した方に向けたチェックリスト。各項目は症状ページへの内部リンク。
 */
export function Concerns() {
  const items = concerns.slice(0, HOME_CONCERNS_COUNT);
  return (
    <section className="section bg-cream">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-14">
          <div>
            <h2 className="text-[1.75rem] leading-[1.4] text-ink sm:text-[2.125rem]">
              <span className="inline-block">「何をしても変わらない」と</span>
              <span className="inline-block">感じていませんか？</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-[1.8] text-ink-soft sm:text-[17px]">
              ひとつでも当てはまる方は、我慢せずにご相談ください。当てはまる項目から、症状ごとの詳しいページへ進めます。
            </p>

            <ul className="mt-8 space-y-2.5">
              {items.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="group flex min-h-[64px] items-center gap-3.5 rounded-2xl border border-line bg-white px-4 py-3.5 text-[16px] font-medium leading-snug text-ink shadow-card transition-colors hover:border-brand-300 hover:bg-brand-50 sm:text-[17px]"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0 text-brand-600">
                      <path d="m4 12.5 5 5L20 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="flex-1">{c.text}</span>
                    <ArrowIcon size={18} className="shrink-0 text-brand-600 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:sticky lg:top-28">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-3xl bg-mist shadow-soft">
              <Photo id={concernImages[0]} fill sizes="(min-width: 1024px) 34vw, 100vw" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-mist">
              <Photo id={concernImages[1]} fill sizes="(min-width: 1024px) 17vw, 45vw" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-mist">
              <Photo id={concernImages[2]} fill sizes="(min-width: 1024px) 17vw, 45vw" />
            </div>
            <p className="col-span-2 text-xs text-muted">※症状のイメージ画像です。実際の来院者の写真ではありません。</p>
          </div>
        </div>
      </div>
    </section>
  );
}
