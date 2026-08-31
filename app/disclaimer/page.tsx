import type { Metadata } from "next";
import Link from "next/link";
import { clinic } from "@/content/clinic";
import { PageHero } from "@/components/ui/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "免責事項",
  description: "清水接骨院ウェブサイトの免責事項。掲載情報の性質、効果の保証について、医療機関との関係、お客様の声の位置づけ、外部リンク、著作権などについて定めています。",
  path: "/disclaimer",
});

const items: { t: string; body: string[] }[] = [
  {
    t: "掲載情報について",
    body: [
      "当サイトに掲載している症状の解説やコラム記事は、一般的な情報提供を目的としたものです。特定の疾患の診断や治療方針を示すものではなく、医師による診断・治療に代わるものではありません。",
      "掲載内容は作成時点の情報に基づいており、正確性・完全性・最新性を保証するものではありません。内容は予告なく変更することがあります。",
    ],
  },
  {
    t: "施術の効果について",
    body: [
      "施術の効果には個人差があり、すべての方に同じ結果を保証するものではありません。当サイト内の表現は、改善を目指す取り組みや一般的な考え方を述べたものであり、効果を約束するものではありません。",
      "掲載している「お客様の声」は、実際に来院された方の個人の感想です。施術の結果や効果を保証するものではありません。",
    ],
  },
  {
    t: "医療機関の受診について",
    body: [
      `${clinic.name}は接骨院であり、医療機関（病院・診療所）ではありません。急激な強い痛み、麻痺、排尿・排便の異常、発熱を伴う痛み、外傷後の強い症状、進行する筋力低下など、医療機関での診断が必要と考えられる状態のときは、当サイトの情報にかかわらず、速やかに医療機関を受診してください。`,
    ],
  },
  {
    t: "外部リンクについて",
    body: ["当サイトからリンクしている外部サイト（Googleマップ、LINE、クチコミサイト等）の内容については、当院は責任を負いません。各サイトの利用規約・プライバシーポリシーに従ってご利用ください。"],
  },
  {
    t: "損害等の責任",
    body: ["当サイトの情報を利用したことにより生じたいかなる損害についても、当院は責任を負いかねます。ご自身の判断と責任においてご利用ください。"],
  },
  {
    t: "著作権",
    body: ["当サイトに掲載している文章・写真・図表等の著作権は、当院または正当な権利者に帰属します。無断での転載・複製・改変はご遠慮ください。"],
  },
];

export default function DisclaimerPage() {
  return (
    <>
      <PageHero title="免責事項" breadcrumb={[{ name: "免責事項" }]} />
      <section className="section">
        <div className="container-x max-w-3xl space-y-8">
          {items.map((s) => (
            <div key={s.t}>
              <h2 className="text-xl font-bold text-ink">{s.t}</h2>
              <div className="mt-3 space-y-2 text-[1.0625rem] leading-[1.9] text-ink-soft">
                {s.body.map((b, i) => (
                  <p key={i}>{b}</p>
                ))}
              </div>
            </div>
          ))}
          <p className="text-[15px] text-ink-soft">
            記事の作成・監修方針は
            <Link href="/supervision" className="mx-1 font-bold text-brand-700 underline-offset-4 hover:underline">
              記事監修について
            </Link>
            をご覧ください。
          </p>
          <p className="text-sm text-muted">制定日：2026年8月30日</p>
        </div>
      </section>
    </>
  );
}
