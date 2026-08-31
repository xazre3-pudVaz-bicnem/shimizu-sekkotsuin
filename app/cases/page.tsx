import type { Metadata } from "next";
import Link from "next/link";
import { cases, CASE_DISCLAIMER } from "@/content/cases";
import { getVoice } from "@/content/voices";
import { getSymptom, symptoms } from "@/content/symptoms";
import { CtaSection } from "@/components/content/CtaSection";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { ArrowIcon, QuoteIcon } from "@/components/ui/Icons";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "施術事例｜腰痛・坐骨神経痛・脊柱管狭窄症・膝など症状別の経過",
  description:
    "足立区扇・高野駅の清水接骨院の施術事例。腰痛・慢性腰痛・ぎっくり腰・坐骨神経痛・脊柱管狭窄症・膝の痛みなど、来院前の状況、医療機関での経過、通院後の変化と回数の目安を、ご本人の言葉をもとに症状別に整理しました。個人の経過であり結果を保証するものではありません。",
  path: "/cases",
  keywords: ["接骨院 施術事例 足立区", "腰痛 施術事例", "坐骨神経痛 事例 通院回数", "脊柱管狭窄症 事例"],
});

export default function CasesPage() {
  const slugsWithCases = symptoms.map((s) => s.slug).filter((slug) => cases.some((c) => c.symptomSlugs.includes(slug)));

  return (
    <>
      <PageHero
        title="施術事例"
        lead={
          <>
            <p>
              来院前の状況、医療機関や他院での経過、当院に通院してからの変化と回数の目安を、掲載を承諾いただいた方のお言葉をもとに症状別に整理しました。「同じような症状で、どのくらいで変化があったのか」の参考にしてください。
            </p>
            <p className="mt-3 text-sm text-muted">{CASE_DISCLAIMER}</p>
          </>
        }
        breadcrumb={[{ name: "施術事例" }]}
        image="counseling-2"
      />

      <section className="section">
        <div className="container-x">
          <nav aria-label="症状別に見る">
            <ul className="flex flex-wrap gap-2">
              {slugsWithCases.map((slug) => {
                const s = getSymptom(slug)!;
                const n = cases.filter((c) => c.symptomSlugs.includes(slug)).length;
                return (
                  <li key={slug}>
                    <a href={`#${slug}`} className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm font-medium text-ink-soft hover:border-brand-300 hover:text-brand-700">
                      {s.name}（{n}）
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-12 space-y-16">
            {slugsWithCases.map((slug) => {
              const s = getSymptom(slug)!;
              const primary = cases.filter((c) => c.symptomSlugs[0] === slug);
              const secondary = cases.filter((c) => c.symptomSlugs[0] !== slug && c.symptomSlugs.includes(slug));
              return (
                <div key={slug} id={slug} className="scroll-mt-24">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <h2 className="flex items-center gap-3 text-2xl font-bold text-ink">
                      <span className="h-7 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                      {s.name}の事例
                    </h2>
                    <Link href={`/symptoms/${slug}`} className="inline-flex min-h-11 items-center gap-1 text-sm font-bold text-brand-700 underline-offset-4 hover:underline">
                      {s.name}のページへ <ArrowIcon size={16} />
                    </Link>
                  </div>

                  {primary.length > 0 && (
                    <ul className="mt-6 grid gap-5 md:grid-cols-2">
                      {primary.map((c) => {
                        const v = getVoice(c.voiceId);
                        return (
                          <li key={c.id} id={c.id} className="card flex h-full flex-col overflow-hidden scroll-mt-24">
                            {v?.image && (
                              <div className="relative aspect-[16/9] w-full bg-mist">
                                <Photo id={v.image} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-[center_30%]" />
                              </div>
                            )}
                            <div className="flex flex-1 flex-col p-5 sm:p-6">
                              <p className="text-xs font-bold text-brand-700">{v?.who}</p>
                              <h3 className="mt-1 text-lg font-bold leading-snug text-ink">{c.title}</h3>
                              <dl className="mt-4 space-y-3 text-[15px] leading-relaxed">
                                <div>
                                  <dt className="text-xs font-bold text-muted">来院前の状況</dt>
                                  <dd className="mt-0.5 text-ink-soft">{c.before}</dd>
                                </div>
                                {c.medical && (
                                  <div>
                                    <dt className="text-xs font-bold text-muted">医療機関・他院での経過</dt>
                                    <dd className="mt-0.5 text-ink-soft">{c.medical}</dd>
                                  </div>
                                )}
                                <div>
                                  <dt className="text-xs font-bold text-muted">通院後の変化（ご本人談）</dt>
                                  <dd className="mt-0.5 flex gap-2 text-ink">
                                    <QuoteIcon size={16} className="mt-1 shrink-0 text-brand-300" />
                                    <span>{c.after}</span>
                                  </dd>
                                </div>
                                {c.visits && (
                                  <div>
                                    <dt className="text-xs font-bold text-muted">通院の目安</dt>
                                    <dd className="mt-0.5 text-ink-soft">{c.visits}</dd>
                                  </div>
                                )}
                              </dl>
                              <div className="mt-auto flex flex-wrap gap-x-4 pt-4 text-sm">
                                <Link href={`/voice#voice-${c.voiceId}`} className="inline-flex min-h-11 items-center font-bold text-brand-700 underline-offset-4 hover:underline">
                                  この方の声を全文読む
                                </Link>
                                {c.symptomSlugs.slice(1).map((sl) => {
                                  const rs = getSymptom(sl);
                                  return rs ? (
                                    <Link key={sl} href={`/symptoms/${sl}`} className="inline-flex min-h-11 items-center text-ink-soft underline decoration-brand-300 underline-offset-4 hover:text-brand-700">
                                      {rs.name}
                                    </Link>
                                  ) : null;
                                })}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {secondary.length > 0 && (
                    <div className="mt-5 rounded-2xl border border-line bg-mist p-4">
                      <p className="text-sm font-bold text-ink-soft">{s.name}に関連する他の事例</p>
                      <ul className="mt-2 flex flex-wrap gap-x-5">
                        {secondary.map((c) => (
                          <li key={c.id}>
                            <a href={`#${c.id}`} className="inline-flex min-h-11 items-center text-sm text-brand-700 underline decoration-brand-300 underline-offset-4 hover:decoration-brand-600">
                              {c.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p className="mt-12 text-sm text-muted">{CASE_DISCLAIMER}</p>
        </div>
      </section>
      <CtaSection title="同じような症状でお悩みの方へ" text="事例はあくまで一例です。身体の状態は一人ひとり異なりますので、まずは現在の症状と経過をお聞かせください。医療機関での確認が必要と考えられる場合は、その旨もお伝えします。" />
    </>
  );
}
