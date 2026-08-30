import Link from "next/link";
import { getArticle } from "@/content/columns";
import { ArticleCard } from "@/components/content/ArticleCard";
import { ArrowIcon } from "@/components/ui/Icons";

export function RelatedArticles({ slugs, title = "関連するコラム", exclude }: { slugs: readonly string[]; title?: string; exclude?: string }) {
  const list = slugs
    .filter((s) => s !== exclude)
    .map((s) => getArticle(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  if (!list.length) return null;
  return (
    <section aria-labelledby="related-articles">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 id="related-articles" className="text-xl font-bold text-ink sm:text-2xl">
          {title}
        </h2>
        <Link href="/column" className="inline-flex min-h-11 items-center gap-1 text-sm font-bold text-brand-700 underline-offset-4 hover:underline">
          コラム一覧 <ArrowIcon size={16} />
        </Link>
      </div>
      <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => (
          <li key={a.slug}>
            <ArticleCard article={a} />
          </li>
        ))}
      </ul>
    </section>
  );
}
