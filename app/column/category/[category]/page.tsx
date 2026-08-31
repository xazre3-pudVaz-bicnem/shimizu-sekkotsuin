import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticlesByCategory } from "@/content/columns";
import { articleCategories, type ArticleCategoryId } from "@/content/types";
import { ArticleCard } from "@/components/content/ArticleCard";
import { CtaSection } from "@/components/content/CtaSection";
import { PageHero } from "@/components/ui/PageHero";
import { buildMetadata } from "@/lib/seo";

type Params = { category: string };

function activeCategories() {
  return articleCategories.filter((c) => articles.some((a) => a.category === c.id));
}

export function generateStaticParams(): Params[] {
  return activeCategories().map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params;
  const cat = articleCategories.find((c) => c.id === category);
  if (!cat) return {};
  return buildMetadata({
    title: `${cat.name}に関するコラム一覧`,
    description: `${cat.description}。足立区扇・高野駅の清水接骨院の院長（柔道整復師）が監修する「${cat.name}」カテゴリのコラム一覧です。`,
    path: `/column/category/${cat.id}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const cat = articleCategories.find((c) => c.id === category);
  if (!cat) notFound();
  const list = getArticlesByCategory(cat.id as ArticleCategoryId);
  if (!list.length) notFound();

  return (
    <>
      <PageHero
        title={`${cat.name}に関するコラム`}
        lead={<p>{cat.description}。</p>}
        breadcrumb={[{ name: "コラム", href: "/column" }, { name: cat.name }]}
      />
      <section className="section">
        <div className="container-x">
          <nav aria-label="カテゴリ">
            <ul className="flex flex-wrap gap-2">
              {activeCategories().map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/column/category/${c.id}`}
                    aria-current={c.id === cat.id ? "page" : undefined}
                    className={
                      c.id === cat.id
                        ? "inline-flex min-h-11 items-center rounded-full bg-brand-600 px-4 text-sm font-bold text-white"
                        : "inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm font-medium text-ink-soft hover:border-brand-300 hover:text-brand-700"
                    }
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
