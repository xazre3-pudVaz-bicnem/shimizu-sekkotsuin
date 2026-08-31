import Link from "next/link";
import { articles } from "@/content/columns";
import { articleCategories } from "@/content/types";
import { ArticleCard } from "@/components/content/ArticleCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/Icons";

export function ColumnSection() {
  const latest = articles.slice(0, 3);
  return (
    <section className="section">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading title="身体・腰痛の専門コラム" lead="腰痛や坐骨神経痛、しびれの仕組みや、日常生活での注意点を院長監修でわかりやすく解説しています。" />
          <Link href="/column" className="btn btn-outline">
            コラム一覧を見る <ArrowIcon size={18} />
          </Link>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {latest.map((a) => (
            <li key={a.slug} className="reveal">
              <ArticleCard article={a} />
            </li>
          ))}
        </ul>
        <ul className="mt-8 flex flex-wrap gap-2">
          {articleCategories.map((c) => (
            <li key={c.id}>
              <Link href={`/column/category/${c.id}`} className="inline-flex min-h-10 items-center rounded-full border border-line bg-white px-4 text-sm font-medium text-ink-soft hover:border-brand-300 hover:text-brand-700">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
