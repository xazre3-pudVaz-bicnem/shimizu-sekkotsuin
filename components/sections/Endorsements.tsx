import { endorsements, ENDORSEMENT_DISCLAIMER } from "@/content/endorsements";
import { Photo } from "@/components/ui/Photo";
import { QuoteIcon } from "@/components/ui/Icons";

/**
 * 同業の先生・専門家からの推薦。
 * 氏名・院名・地域・お写真・推薦文は content/endorsements.ts（院からいただいた情報）を参照する。
 * 推薦文は原文のまま。文章を補って書かないこと。
 *
 * レイアウト: 推薦文が長いため、4列に並べると1列が細長くなり読みにくい。
 * 写真を左に置いた横並びカードを、PCは2列・スマホは1列で表示する。
 *
 * 旧LPが推薦欄に付けていた比較優良・誇大な煽り見出しは引き継がない。
 */
export function Endorsements() {
  return (
    <section className="section bg-cream">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold tracking-wide text-brand-700">第三者からの評価</p>
          <h2 className="mt-3 text-[1.75rem] leading-[1.4] text-ink sm:text-[2.125rem]">
            <span className="inline-block">同業の先生・専門家からも</span>
            <span className="inline-block">推薦をいただいています</span>
          </h2>
        </div>

        <ul className="mx-auto mt-10 grid max-w-5xl gap-4 lg:grid-cols-2 lg:gap-5">
          {endorsements.map((e) => (
            <li key={e.id}>
              <figure className="card flex h-full gap-4 p-4 sm:gap-5 sm:p-5">
                {/* self-start がないと flex の stretch で縦に伸びて正方形にならない */}
                <div className="relative aspect-square w-[92px] shrink-0 self-start overflow-hidden rounded-xl bg-white sm:w-[112px]">
                  <Photo id={e.image} fill sizes="112px" />
                </div>

                <div className="min-w-0 flex-1">
                  <figcaption>
                    <span className="block text-[15px] font-bold leading-snug text-ink sm:text-base">{e.name}</span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-brand-700">{e.affiliation}</span>
                    {e.area && <span className="text-[13px] leading-snug text-muted">{e.area}</span>}
                  </figcaption>

                  {e.quote && (
                    <blockquote className="mt-2.5 flex gap-2 text-[14px] leading-[1.85] text-ink-soft sm:text-[15px]">
                      <QuoteIcon size={16} className="mt-1 shrink-0 text-brand-300" />
                      <span>{e.quote}</span>
                    </blockquote>
                  )}
                </div>
              </figure>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-6 max-w-5xl text-sm leading-relaxed text-muted">{ENDORSEMENT_DISCLAIMER}</p>
      </div>
    </section>
  );
}
