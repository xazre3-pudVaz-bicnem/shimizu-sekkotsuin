import Link from "next/link";
import type { Article } from "@/content/types";
import { articleCategories } from "@/content/types";
import { Photo } from "@/components/ui/Photo";
import { formatDate } from "@/lib/utils";

export function ArticleCard({ article }: { article: Article }) {
  const cat = articleCategories.find((c) => c.id === article.category);
  return (
    <article className="card group flex h-full flex-col overflow-hidden transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft">
      <Link href={`/column/${article.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-mist">
          <Photo id={article.image} fill sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-500 group-hover:scale-[1.03]" />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2 text-xs text-muted">
            {cat && <span className="rounded-full bg-brand-50 px-2.5 py-1 font-bold text-brand-700">{cat.name}</span>}
            <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)} 更新</time>
          </div>
          <h3 className="mt-3 text-base font-bold leading-snug text-ink group-hover:text-brand-700 sm:text-lg">{article.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{article.description}</p>
        </div>
      </Link>
    </article>
  );
}
