import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/content/columns";
import { articleCategories } from "@/content/types";
import { images } from "@/content/images";
import { clinic } from "@/content/clinic";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JsonLd } from "@/components/ui/JsonLd";
import { Photo } from "@/components/ui/Photo";
import { LineIcon, PhoneIcon } from "@/components/ui/Icons";
import { SupervisorBox } from "@/components/content/SupervisorBox";
import { RelatedSymptoms } from "@/components/content/RelatedSymptoms";
import { RelatedArticles } from "@/components/content/RelatedArticles";
import { CtaSection } from "@/components/content/CtaSection";
import { articleJsonLd } from "@/lib/jsonld";
import { extractHeadings, Prose } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";
import { formatDate, readingMinutes } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return buildMetadata({
    title: a.title,
    description: a.description,
    path: `/column/${a.slug}`,
    ogImage: "/images/og-default.jpg",
    type: "article",
    publishedTime: a.publishedAt,
    modifiedTime: a.updatedAt,
  });
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const cat = articleCategories.find((c) => c.id === a.category);
  const headings = extractHeadings(a.body).filter((h) => h.level === 2);
  const minutes = readingMinutes(a.body);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          type: "BlogPosting",
          headline: a.title,
          description: a.description,
          path: `/column/${a.slug}`,
          image: images[a.image].src,
          datePublished: a.publishedAt,
          dateModified: a.updatedAt,
        })}
      />
      <div className="container-x pt-5">
        <Breadcrumb items={[{ name: "コラム", href: "/column" }, ...(cat ? [{ name: cat.name, href: `/column/category/${cat.id}` }] : []), { name: a.title }]} />
      </div>

      <div className="container-x grid gap-12 py-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 lg:py-12">
        <article className="min-w-0">
          <header>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
              {cat && (
                <Link href={`/column/category/${cat.id}`} className="inline-flex min-h-10 items-center rounded-full bg-brand-50 px-3 font-bold text-brand-700">
                  {cat.name}
                </Link>
              )}
              <span>
                公開 <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>
              </span>
              <span>
                更新 <time dateTime={a.updatedAt}>{formatDate(a.updatedAt)}</time>
              </span>
              <span>約{minutes}分で読めます</span>
            </div>
            <h1 className="mt-4 text-[1.75rem] leading-snug sm:text-4xl">{a.title}</h1>
            <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">{a.description}</p>
            <p className="mt-3 text-sm text-muted">監修：清水接骨院 院長 清水 正尊（柔道整復師）</p>
          </header>

          <div className="relative mt-8 aspect-[3/2] overflow-hidden rounded-3xl shadow-soft">
            <Photo id={a.image} fill priority sizes="(min-width: 1024px) 60vw, 100vw" />
          </div>

          <div className="mt-8 rounded-2xl border border-brand-200 bg-brand-50 p-5 sm:p-6">
            <p className="text-sm font-bold text-brand-700">この記事の要点</p>
            <ul className="mt-2 space-y-1.5">
              {a.summary.map((s) => (
                <li key={s} className="flex gap-2 text-[15px] leading-relaxed text-ink sm:text-base">
                  <span aria-hidden="true" className="mt-[0.7em] block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {headings.length > 2 && (
            <nav aria-label="目次" className="mt-6 rounded-2xl border border-line bg-mist p-5 lg:hidden">
              <p className="text-sm font-bold text-brand-700">目次</p>
              <ol className="mt-2 space-y-1 text-[15px]">
                {headings.map((h, i) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="inline-flex min-h-11 items-center text-ink-soft underline-offset-4 hover:text-brand-700 hover:underline">
                      {i + 1}. {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <Prose markdown={a.body} />

          <p className="mt-10 rounded-2xl border border-line bg-mist p-5 text-sm leading-relaxed text-muted">
            本記事は一般的な情報提供を目的としたもので、特定の症状の診断や治療効果を保証するものではありません。症状が強い場合や長く続く場合、しびれや筋力低下、排尿・排便の異常などがある場合は、医療機関を受診してください。
          </p>

          <div className="mt-10 space-y-12">
            <RelatedSymptoms slugs={a.relatedSymptoms} title="この記事に関連する症状ページ" />
            <RelatedArticles slugs={a.relatedArticles} exclude={a.slug} />
          </div>

          <div className="mt-12">
            <SupervisorBox publishedAt={a.publishedAt} updatedAt={a.updatedAt} />
          </div>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-5">
            {headings.length > 0 && (
              <nav aria-label="目次（サイド）" className="rounded-2xl border border-line bg-mist p-5">
                <p className="text-sm font-bold text-brand-700">目次</p>
                <ol className="mt-3 space-y-0.5 text-[14px]">
                  {headings.map((h, i) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="block rounded px-1 py-1 text-ink-soft hover:bg-white hover:text-brand-700">
                        {i + 1}. {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className="rounded-2xl border border-brand-200 bg-white p-5 shadow-card">
              <p className="font-bold text-ink">{clinic.name}</p>
              <p className="mt-1 text-sm text-muted">{clinic.tagline}｜{clinic.reservation}</p>
              <a href={clinic.line.url} target="_blank" rel="noopener noreferrer" className="btn btn-line mt-3 w-full min-h-12 text-sm">
                <LineIcon size={18} /> LINEで相談・予約
              </a>
              <a href={clinic.telHref} className="btn btn-primary mt-2 w-full min-h-12 text-sm">
                <PhoneIcon size={18} /> <span className="tel-link">{clinic.tel}</span>
              </a>
            </div>
          </div>
        </aside>
      </div>
      <CtaSection />
    </>
  );
}
