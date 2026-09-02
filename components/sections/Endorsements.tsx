import { endorsements, ENDORSEMENT_DISCLAIMER } from "@/content/endorsements";
import { QuoteIcon } from "@/components/ui/Icons";

/**
 * 同業の先生・専門家からの推薦。
 * 文面は旧LPの原文をそのまま転載（content/endorsements.ts を参照）。
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
          <p className="mt-4 text-base leading-[1.8] text-ink-soft sm:text-[17px]">
            鍼灸師・柔道整復師など、身体をみる仕事をしている方からいただいた言葉です。
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {endorsements.map((e) => (
            <li key={e.id}>
              <figure className="card flex h-full flex-col p-6 sm:p-7">
                <QuoteIcon size={26} className="shrink-0 text-brand-300" />
                <blockquote className="mt-3 flex-1 text-[15px] leading-[1.9] text-ink-soft sm:text-base">
                  {e.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-line pt-4">
                  <span className="inline-flex rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
                    {e.profession}
                  </span>
                  {e.affiliation && <span className="mt-2 block text-[13px] leading-snug text-muted">{e.affiliation}</span>}
                  <span className="mt-1 block text-base font-bold text-ink">{e.name}</span>
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
