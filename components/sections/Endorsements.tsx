import { endorsements, ENDORSEMENT_DISCLAIMER } from "@/content/endorsements";
import { Photo } from "@/components/ui/Photo";
import { QuoteIcon } from "@/components/ui/Icons";

/**
 * 同業の先生・専門家からの推薦。
 * 氏名・院名・地域・お写真は content/endorsements.ts（院からいただいた情報）を参照する。
 * 推薦文（quote）が入っている先生だけコメントを表示する。文章を補って書かないこと。
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

        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {endorsements.map((e) => (
            <li key={e.id}>
              <figure className="card flex h-full flex-col overflow-hidden">
                <div className="relative aspect-square w-full bg-white">
                  <Photo id={e.image} fill sizes="(min-width: 1024px) 300px, 46vw" />
                </div>
                <figcaption className="flex flex-1 flex-col p-4 sm:p-5">
                  <span className="text-[15px] font-bold leading-snug text-ink sm:text-base">{e.name}</span>
                  <span className="mt-1 text-[13px] leading-snug text-brand-700">{e.affiliation}</span>
                  {e.area && <span className="mt-0.5 text-[13px] leading-snug text-muted">{e.area}</span>}
                  {e.quote && (
                    <blockquote className="mt-3 flex gap-2 border-t border-line pt-3 text-[14px] leading-[1.85] text-ink-soft">
                      <QuoteIcon size={16} className="mt-1 shrink-0 text-brand-300" />
                      <span>{e.quote}</span>
                    </blockquote>
                  )}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm leading-relaxed text-muted">{ENDORSEMENT_DISCLAIMER}</p>
      </div>
    </section>
  );
}
