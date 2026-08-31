import type { Metadata } from "next";
import { allFaqItems, faqGroups } from "@/content/faq";
import { CtaSection } from "@/components/content/CtaSection";
import { Faq } from "@/components/content/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { faqJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "よくある質問｜施術・予約・料金について",
  description:
    "足立区扇・高野駅の清水接骨院によくいただく質問。施術は痛くないか、健康保険は使えるか、予約は必要か、服装、駐車場、手術歴がある場合の施術、通院の頻度などにお答えします。",
  path: "/faq",
  keywords: ["接骨院 よくある質問", "足立区 接骨院 保険", "接骨院 予約 服装"],
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        title="よくある質問"
        lead={<p>施術の内容、予約や来院、料金についてよくいただくご質問をまとめました。掲載のないご質問は、お電話またはLINEでお気軽にお尋ねください。</p>}
        breadcrumb={[{ name: "よくある質問" }]}
      />
      <section className="section">
        <div className="container-x">
          <nav aria-label="質問のカテゴリ" className="flex flex-wrap gap-2">
            {faqGroups.map((g) => (
              <a key={g.id} href={`#${g.id}`} className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm font-medium text-ink-soft hover:border-brand-300 hover:text-brand-700">
                {g.title}
              </a>
            ))}
          </nav>
          <div className="mt-10 space-y-14">
            {faqGroups.map((g) => (
              <div key={g.id} id={g.id} className="scroll-mt-24">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-ink">
                  <span className="h-7 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                  {g.title}
                </h2>
                <Faq items={g.items} className="mt-5" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <JsonLd data={faqJsonLd(allFaqItems)} />
      <CtaSection />
    </>
  );
}
