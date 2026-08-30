import type { Metadata } from "next";
import Link from "next/link";
import { voices, VOICE_DISCLAIMER } from "@/content/voices";
import { getSymptom } from "@/content/symptoms";
import { clinic } from "@/content/clinic";
import { VoiceCard } from "@/components/content/VoiceCard";
import { CtaSection } from "@/components/content/CtaSection";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExternalIcon } from "@/components/ui/Icons";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "お客様の声・施術事例｜腰痛・坐骨神経痛・脊柱管狭窄症・膝など",
  description:
    "足立区扇・高野駅の清水接骨院に来院された方の声を、症状別（腰痛・坐骨神経痛・脊柱管狭窄症・ぎっくり腰・膝の痛み・背中の痛み）にご本人の言葉のまま掲載しています。個人の感想であり、施術の結果を保証するものではありません。",
  path: "/voice",
  keywords: ["清水接骨院 口コミ", "足立区 接骨院 口コミ", "腰痛 お客様の声", "坐骨神経痛 事例"],
});

const groups: { id: string; title: string; slugs: string[] }[] = [
  { id: "lower-back", title: "腰痛・慢性腰痛", slugs: ["lower-back-pain", "chronic-lower-back-pain"] },
  { id: "sciatica", title: "坐骨神経痛・足のしびれ", slugs: ["sciatica", "leg-numbness"] },
  { id: "stenosis", title: "脊柱管狭窄症", slugs: ["spinal-stenosis"] },
  { id: "acute", title: "ぎっくり腰", slugs: ["acute-lower-back-pain"] },
  { id: "knee", title: "膝の痛み", slugs: ["knee-pain", "knee-osteoarthritis"] },
  { id: "back", title: "背中・首肩の痛み", slugs: ["back-pain", "shoulder-stiffness", "neck-pain"] },
];

export default function VoicePage() {
  // 各声は「最初に該当したグループ」にのみ表示する
  const used = new Set<string>();
  const grouped = groups.map((g) => {
    const list = voices.filter((v) => !used.has(v.id) && v.symptomSlugs.some((s) => g.slugs.includes(s)));
    list.forEach((v) => used.add(v.id));
    return { ...g, list };
  });

  return (
    <>
      <PageHero
        en="Voice"
        title="お客様の声・施術事例"
        lead={
          <>
            <p>
              清水接骨院に来院された方からいただいた声を、ご本人の言葉のまま掲載しています。年齢や症状はさまざまですが、「どこに行っても変わらなかった」という状態から相談に来られる方が多くいらっしゃいます。
            </p>
            <p className="mt-3 text-sm text-muted">{VOICE_DISCLAIMER}</p>
          </>
        }
        breadcrumb={[{ name: "お客様の声" }]}
        image="voice-is"
      />

      <section className="section">
        <div className="container-x">
          <nav aria-label="症状別に見る">
            <ul className="flex flex-wrap gap-2">
              {grouped
                .filter((g) => g.list.length)
                .map((g) => (
                  <li key={g.id}>
                    <a href={`#${g.id}`} className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm font-medium text-ink-soft hover:border-brand-300 hover:text-brand-700">
                      {g.title}（{g.list.length}）
                    </a>
                  </li>
                ))}
            </ul>
          </nav>

          <div className="mt-12 space-y-16">
            {grouped
              .filter((g) => g.list.length)
              .map((g) => (
                <div key={g.id} id={g.id} className="scroll-mt-24">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <h2 className="flex items-center gap-3 text-2xl font-bold text-ink">
                      <span className="h-7 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                      {g.title}
                    </h2>
                    <div className="flex flex-wrap gap-x-4 text-sm">
                      {g.slugs
                        .map((s) => getSymptom(s))
                        .filter((s): s is NonNullable<typeof s> => Boolean(s))
                        .map((s) => (
                          <Link key={s.slug} href={`/symptoms/${s.slug}`} className="inline-flex min-h-11 items-center font-bold text-brand-700 underline-offset-4 hover:underline">
                            {s.name}のページ
                          </Link>
                        ))}
                    </div>
                  </div>
                  <ul className="mt-6 grid gap-5 md:grid-cols-2">
                    {g.list.map((v) => (
                      <li key={v.id}>
                        <VoiceCard voice={v} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-x">
          <SectionHeading en="Gallery" title="来院された方と" lead="掲載を承諾いただいた方のお写真です。" />
          <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {(["patient-1", "patient-2", "patient-3", "patient-4"] as const).map((id) => (
              <li key={id} className="relative aspect-square overflow-hidden rounded-2xl">
                <Photo id={id} fill sizes="(min-width: 768px) 25vw, 50vw" />
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={clinic.links.googleMaps} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Googleマップのクチコミを見る <ExternalIcon size={16} />
            </a>
            <a href={clinic.links.ekiten} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              エキテンのクチコミを見る <ExternalIcon size={16} />
            </a>
          </div>
          <p className="mt-6 text-sm text-muted">{VOICE_DISCLAIMER}</p>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
