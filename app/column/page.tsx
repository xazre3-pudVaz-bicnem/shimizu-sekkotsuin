import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/content/columns";
import { articleCategories } from "@/content/types";
import { ArticleCard } from "@/components/content/ArticleCard";
import { CtaSection } from "@/components/content/CtaSection";
import { SupervisorBox } from "@/components/content/SupervisorBox";
import { PageHero } from "@/components/ui/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "身体・腰痛の専門コラム一覧｜院長監修",
  description:
    "足立区扇・高野駅の清水接骨院の院長（柔道整復師）が監修する、腰痛・坐骨神経痛・椎間板ヘルニア・脊柱管狭窄症・ぎっくり腰・足のしびれ・姿勢・セルフケアなどに関するコラム一覧です。",
  path: "/column",
  keywords: ["腰痛 コラム", "坐骨神経痛 原因", "脊柱管狭窄症 歩行", "ぎっくり腰 直後", "足のしびれ 続く"],
});

export default function ColumnIndexPage() {
  const latest = articles[0];
  return (
    <>
      <PageHero
        title="身体・腰痛の専門コラム"
        lead={
          <p>
            腰痛や坐骨神経痛、脚のしびれなどについて、「なぜそうなるのか」「日常で何に気をつければよいか」を、清水接骨院の院長（柔道整復師）が一般の方向けにわかりやすく解説します。気になる症状がある方は、各記事から症状ページもご覧ください。
          </p>
        }
        breadcrumb={[{ name: "コラム" }]}
        image="counseling-1"
      />
      <section className="section">
        <div className="container-x">
          <nav aria-label="カテゴリ">
            <ul className="flex flex-wrap gap-2">
              {articleCategories.map((c) => {
                const count = articles.filter((a) => a.category === c.id).length;
                if (!count) return null;
                return (
                  <li key={c.id}>
                    <Link href={`/column/category/${c.id}`} className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-white px-4 text-sm font-medium text-ink-soft hover:border-brand-300 hover:text-brand-700">
                      {c.name}
                      <span className="font-latin text-xs text-muted">{count}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
          <div className="mt-14">
            <SupervisorBox publishedAt={articles.at(-1)?.publishedAt ?? latest.publishedAt} updatedAt={latest.updatedAt} label="コラムの監修者" />
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
