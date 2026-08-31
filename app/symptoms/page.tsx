import type { Metadata } from "next";
import { symptoms } from "@/content/symptoms";
import { symptomCategories } from "@/content/types";
import { ogImages } from "@/content/images";
import { SymptomCard } from "@/components/content/SymptomCard";
import { CtaSection } from "@/components/content/CtaSection";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "症状から探す｜足立区扇・高野駅の清水接骨院",
  description:
    "足立区扇・高野駅徒歩5分の清水接骨院が対応する症状の一覧です。腰痛・坐骨神経痛・椎間板ヘルニア・脊柱管狭窄症をはじめ、膝・首肩・頭痛・ケガまで、症状ごとに原因の考え方と医療機関を受診すべき目安をまとめています。",
  path: "/symptoms",
  ogImage: ogImages.symptoms,
  keywords: ["足立区 接骨院 症状", "腰痛", "坐骨神経痛", "椎間板ヘルニア", "脊柱管狭窄症", "膝の痛み", "肩こり", "頭痛", "捻挫"],
});

export default function SymptomsIndexPage() {
  return (
    <>
      <PageHero
        title="症状から探す"
        lead={
          <p>
            気になる症状を選んでください。それぞれのページで、症状の一般的な説明、考えられる原因、医療機関を受診すべき目安、清水接骨院での考え方と施術、再発予防のアドバイスをまとめています。
          </p>
        }
        breadcrumb={[{ name: "症状から探す" }]}
        image="explanation-spine-1"
      />
      <section className="border-b border-line bg-white">
        <div className="container-x py-6">
          <nav aria-label="症状カテゴリ">
            <ul className="flex flex-wrap gap-2">
              {symptomCategories.map((cat) => (
                <li key={cat.id}>
                  <a href={`#${cat.id}`} className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm font-medium text-ink-soft hover:border-brand-300 hover:text-brand-700">
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
      <section className="section">
        <div className="container-x space-y-16">
          {symptomCategories.map((cat) => {
            const list = symptoms.filter((s) => s.category === cat.id);
            if (!list.length) return null;
            return (
              <div key={cat.id} id={cat.id} className="scroll-mt-24">
                <div className="flex items-center gap-4">
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-mist">
                    <Photo id={cat.image} fill sizes="64px" />
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold text-ink">{cat.name}</h2>
                    <p className="mt-1 text-sm text-muted">{cat.description}</p>
                  </div>
                </div>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((s) => (
                    <li key={s.slug}>
                      <SymptomCard symptom={s} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <div className="rounded-2xl border border-line bg-mist p-6 text-[15px] leading-relaxed text-ink-soft">
            <p className="font-bold text-ink">一覧にない症状について</p>
            <p className="mt-2">
              一覧にない症状でも、身体の痛みやしびれ、動かしにくさについてはご相談いただけます。まずはお電話またはLINEで状況をお知らせください。発熱を伴う痛み、外傷後の強い痛み、急な麻痺や排尿・排便の異常などがある場合は、先に医療機関を受診してください。
            </p>
            <p className="mt-2 text-xs text-muted">※症状のイラスト・写真はイメージです。</p>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
