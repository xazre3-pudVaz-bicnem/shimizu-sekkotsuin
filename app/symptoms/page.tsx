import type { Metadata } from "next";
import { symptoms } from "@/content/symptoms";
import { symptomCategories } from "@/content/types";
import { ogImages } from "@/content/images";
import { SymptomCard } from "@/components/content/SymptomCard";
import { CtaSection } from "@/components/content/CtaSection";
import { PageHero } from "@/components/ui/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "症状から探す｜腰痛・坐骨神経痛・ヘルニア・脊柱管狭窄症・膝・首肩",
  description:
    "足立区扇・高野駅の清水接骨院が対応する症状の一覧。腰痛・慢性腰痛・ぎっくり腰・坐骨神経痛・椎間板ヘルニア・脊柱管狭窄症・腰椎すべり症・足のしびれ・股関節痛・膝の痛み・肩こり・首の痛み・四十肩五十肩・背中の痛みについて、原因の考え方と施術方針を症状別に解説します。",
  path: "/symptoms",
  ogImage: ogImages.symptoms,
  keywords: ["足立区 接骨院 症状", "腰痛", "坐骨神経痛", "椎間板ヘルニア", "脊柱管狭窄症", "膝の痛み", "肩こり"],
});

export default function SymptomsIndexPage() {
  return (
    <>
      <PageHero
        en="Symptoms"
        title="症状から探す"
        lead={
          <p>
            気になる症状を選んでください。それぞれのページで、症状の一般的な説明、考えられる原因、医療機関を受診すべき目安、清水接骨院での考え方と施術、再発予防のアドバイスをまとめています。
          </p>
        }
        breadcrumb={[{ name: "症状から探す" }]}
        image="explanation-spine-1"
      />
      <section className="section">
        <div className="container-x space-y-14">
          {symptomCategories.map((cat) => {
            const list = symptoms.filter((s) => s.category === cat.id);
            if (!list.length) return null;
            return (
              <div key={cat.id} id={cat.id} className="scroll-mt-24">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-ink">
                  <span className="h-7 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                  {cat.name}
                </h2>
                <p className="mt-2 text-muted">{cat.description}</p>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
