import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSymptom, symptoms } from "@/content/symptoms";
import { getVoice, VOICE_DISCLAIMER } from "@/content/voices";
import { symptomCategories } from "@/content/types";
import { images, symptomOgImage } from "@/content/images";
import { clinic } from "@/content/clinic";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CtaButtons } from "@/components/ui/CtaButtons";
import { JsonLd } from "@/components/ui/JsonLd";
import { Photo } from "@/components/ui/Photo";
import { AlertIcon, CheckIcon, LineIcon, PhoneIcon } from "@/components/ui/Icons";
import { RedFlagBox } from "@/components/content/RedFlagBox";
import { SupervisorBox } from "@/components/content/SupervisorBox";
import { VoiceCard } from "@/components/content/VoiceCard";
import { Faq } from "@/components/content/Faq";
import { RelatedSymptoms } from "@/components/content/RelatedSymptoms";
import { RelatedArticles } from "@/components/content/RelatedArticles";
import { AccessSection } from "@/components/content/AccessSection";
import { CtaSection } from "@/components/content/CtaSection";
import { Reasons } from "@/components/sections/Reasons";
import { articleJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return symptoms.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getSymptom(slug);
  if (!s) return {};
  return buildMetadata({
    title: s.seo.title,
    absoluteTitle: true,
    description: s.seo.description,
    path: `/symptoms/${s.slug}`,
    ogTitle: s.seo.ogTitle,
    ogDescription: s.seo.ogDescription,
    ogImage: symptomOgImage(s.slug),
    type: "article",
    publishedTime: s.publishedAt,
    modifiedTime: s.updatedAt,
    keywords: s.seo.keywords,
  });
}

const toc = [
  { id: "concerns", label: "こんなお悩みありませんか" },
  { id: "about", label: "症状について" },
  { id: "common", label: "よく見られる症状" },
  { id: "causes", label: "考えられる原因" },
  { id: "daily", label: "日常生活との関係" },
  { id: "redflags", label: "医療機関を受診すべきケース" },
  { id: "approach", label: "清水接骨院での考え方" },
  { id: "examination", label: "カウンセリング・検査" },
  { id: "treatment", label: "施術について" },
  { id: "whole-body", label: "痛い場所だけを施術しない理由" },
  { id: "prevention", label: "再発予防・生活習慣" },
  { id: "reasons", label: "選ばれる理由" },
  { id: "voice", label: "お客様の声" },
  { id: "faq", label: "よくある質問" },
  { id: "related", label: "関連する症状・コラム" },
];

function Section({ id, title, children, className = "" }: { id: string; title: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="border-l-4 border-brand-500 pl-4 text-xl font-bold text-ink sm:text-2xl">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Paragraphs({ items }: { items: readonly string[] }) {
  return (
    <div className="space-y-4 text-[1.0625rem] leading-[1.95] text-ink-soft sm:text-lg">
      {items.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

export default async function SymptomPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = getSymptom(slug);
  if (!s) notFound();

  const cat = symptomCategories.find((c) => c.id === s.category);
  const voiceList = s.voiceIds.map((id) => getVoice(id)).filter((v): v is NonNullable<typeof v> => Boolean(v));
  const crumbs = [{ name: "症状から探す", href: "/symptoms" }, { name: s.name }];

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          type: "Article",
          headline: s.h1,
          description: s.seo.description,
          path: `/symptoms/${s.slug}`,
          image: images[s.image].src,
          datePublished: s.publishedAt,
          dateModified: s.updatedAt,
          keywords: s.seo.keywords,
        })}
      />

      {/* ファーストビュー */}
      <section className="border-b border-line bg-mist">
        <div className="container-x pt-5 pb-10 sm:pb-14">
          <Breadcrumb items={crumbs} />
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div>
              <p className="flex flex-wrap items-center gap-2 text-sm">
                {cat && <span className="rounded-full bg-brand-100 px-3 py-1 font-bold text-brand-700">{cat.name}</span>}
                <span className="rounded-full border border-line bg-white px-3 py-1 font-medium text-ink-soft">足立区扇・高野駅徒歩5分</span>
                <span className="rounded-full border border-line bg-white px-3 py-1 font-medium text-ink-soft">{clinic.reservation}</span>
              </p>
              <h1 className="mt-4 text-[1.75rem] leading-snug sm:text-4xl lg:text-[2.5rem]">{s.h1}</h1>
              <div className="mt-5 space-y-3 text-base leading-[1.9] text-ink-soft sm:text-lg">
                {s.lead.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <CtaButtons className="mt-7" showNote={false} size="md" />
            </div>
            <div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-soft">
                <Photo id={s.image} fill priority sizes="(min-width: 1024px) 45vw, 100vw" />
              </div>
              <p className="mt-2 text-right text-xs text-muted">※イラスト・写真はイメージです</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-x grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 lg:py-16">
        <article className="min-w-0 space-y-14">
          {/* 目次（スマホ用） */}
          <nav aria-label="このページの内容" className="rounded-2xl border border-line bg-mist p-5 lg:hidden">
            <p className="text-sm font-bold text-brand-700">このページの内容</p>
            <ol className="mt-3 grid gap-x-4 gap-y-1 text-[15px] sm:grid-cols-2">
              {toc.map((t, i) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="inline-flex min-h-11 items-center text-ink-soft underline-offset-4 hover:text-brand-700 hover:underline">
                    {i + 1}. {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <Section id="concerns" title="こんなお悩みはありませんか？">
            <ul className="grid gap-2 sm:grid-cols-2">
              {s.concerns.map((c) => (
                <li key={c} className="flex gap-3 rounded-xl border border-line bg-white px-4 py-3 text-base text-ink">
                  <CheckIcon size={20} className="mt-0.5 shrink-0 text-brand-600" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[15px] text-muted">ひとつでも当てはまる方は、我慢せずにご相談ください。</p>
          </Section>

          <Section id="about" title={`${s.name}について`}>
            <Paragraphs items={s.about} />
          </Section>

          <Section id="common" title="よく見られる症状">
            <ul className="space-y-2">
              {s.commonSymptoms.map((c) => (
                <li key={c} className="flex gap-3 text-[1.0625rem] leading-relaxed text-ink-soft sm:text-lg">
                  <span aria-hidden="true" className="mt-[0.85em] block h-2 w-2 shrink-0 rounded-full bg-brand-400" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="causes" title="考えられる原因">
            <ul className="grid gap-4 sm:grid-cols-2">
              {s.causes.map((c) => (
                <li key={c.title} className="card p-5">
                  <h3 className="text-lg font-bold text-ink">{c.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{c.text}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="daily" title="日常生活との関係">
            <Paragraphs items={s.dailyLife} />
          </Section>

          <Section id="redflags" title="病院・整形外科を受診すべきケース">
            <RedFlagBox intro={s.redFlags.intro} items={s.redFlags.items} outro={s.redFlags.outro} />
          </Section>

          <Section id="approach" title={`清水接骨院での${s.name}の考え方`}>
            <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
              <Paragraphs items={s.approach} />
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl lg:aspect-[3/4]">
                <Photo id="explanation-spine-2" fill sizes="(min-width: 1024px) 260px, 100vw" />
              </div>
            </div>
          </Section>

          <Section id="examination" title="カウンセリング・検査（身体の状態確認）">
            <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
              <Paragraphs items={s.examination} />
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl lg:aspect-[3/4]">
                <Photo id="counseling-2" fill sizes="(min-width: 1024px) 260px, 100vw" />
              </div>
            </div>
          </Section>

          <Section id="treatment" title="施術について">
            <Paragraphs items={s.treatment} />
            <p className="mt-4 text-[15px] text-muted">
              施術の内容や強さは、身体の状態やご希望に合わせて調整します。詳しくは
              <Link href="/treatment" className="mx-1 font-bold text-brand-700 underline-offset-4 hover:underline">
                施術について
              </Link>
              のページをご覧ください。
            </p>
          </Section>

          <Section id="whole-body" title="なぜ痛みが出ている場所だけを施術しないのか">
            <Paragraphs items={s.whyWholeBody} />
          </Section>

          <Section id="prevention" title="再発予防・生活習慣へのアドバイス">
            <ul className="grid gap-4 sm:grid-cols-2">
              {s.prevention.map((p) => (
                <li key={p.title} className="rounded-2xl border border-line bg-mist p-5">
                  <h3 className="font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{p.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">
              ※セルフケアは一般的な目安です。痛みが強くなる場合は中止し、来院時または医療機関でご相談ください。
            </p>
          </Section>

          <Section id="reasons" title="清水接骨院が選ばれる理由">
            <Reasons compact />
          </Section>

          {voiceList.length > 0 && (
            <Section id="voice" title={`${s.name}で来院された方の声`}>
              <ul className="grid gap-5 md:grid-cols-2">
                {voiceList.slice(0, 4).map((v) => (
                  <li key={v.id}>
                    <VoiceCard voice={v} excerpt />
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">{VOICE_DISCLAIMER}</p>
              <div className="flex flex-wrap gap-x-6">
                <Link href="/voice" className="mt-2 inline-flex min-h-11 items-center text-sm font-bold text-brand-700 underline-offset-4 hover:underline">
                  お客様の声をすべて見る
                </Link>
                <Link href={`/cases#${s.slug}`} className="mt-2 inline-flex min-h-11 items-center text-sm font-bold text-brand-700 underline-offset-4 hover:underline">
                  {s.name}の施術事例を見る
                </Link>
              </div>
            </Section>
          )}

          <Section id="faq" title={`${s.name}に関するよくある質問`}>
            <Faq items={s.faq} withSchema />
          </Section>

          <div id="related" className="scroll-mt-24 space-y-12">
            <RelatedSymptoms slugs={s.relatedSymptoms} exclude={s.slug} />
            <RelatedArticles slugs={s.relatedArticles} />
          </div>

          <SupervisorBox publishedAt={s.publishedAt} updatedAt={s.updatedAt} label="このページの監修者" />
        </article>

        {/* サイドバー（PC） */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-5">
            <nav aria-label="このページの内容（サイド）" className="rounded-2xl border border-line bg-mist p-5">
              <p className="text-sm font-bold text-brand-700">このページの内容</p>
              <ol className="mt-3 space-y-0.5 text-[14px]">
                {toc.map((t, i) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="block rounded px-1 py-1 text-ink-soft hover:bg-white hover:text-brand-700">
                      {i + 1}. {t.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="rounded-2xl border border-brand-200 bg-white p-5 shadow-card">
              <p className="font-bold text-ink">ご相談・ご予約</p>
              <p className="mt-1 text-sm text-muted">{clinic.reservation}｜{clinic.hours.map((h) => `${h.days} ${h.time}`).join("／")}</p>
              <a href={clinic.line.url} target="_blank" rel="noopener noreferrer" className="btn btn-line mt-3 w-full min-h-12 text-sm">
                <LineIcon size={18} /> LINEで相談・予約
              </a>
              <a href={clinic.telHref} className="btn btn-primary mt-2 w-full min-h-12 text-sm">
                <PhoneIcon size={18} /> <span className="tel-link">{clinic.tel}</span>
              </a>
            </div>
            <div className="rounded-2xl border border-warn-line bg-warn-bg p-4 text-sm text-ink-soft">
              <p className="flex items-center gap-2 font-bold text-warn">
                <AlertIcon size={18} /> 受診の目安
              </p>
              <p className="mt-1 leading-relaxed">急激な強い痛み、麻痺、排尿・排便の異常、発熱を伴う痛みがあるときは、まず医療機関を受診してください。</p>
            </div>
          </div>
        </aside>
      </div>

      <AccessSection />
      <CtaSection title={`${s.name}でお悩みの方へ`} />
    </>
  );
}
