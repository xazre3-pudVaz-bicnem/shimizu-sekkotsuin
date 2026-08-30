import type { Metadata } from "next";
import Link from "next/link";
import { clinic, director } from "@/content/clinic";
import { CtaSection } from "@/components/content/CtaSection";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "記事監修について｜サイト内コンテンツの作成・監修方針",
  description:
    "清水接骨院のウェブサイトに掲載する症状解説・コラム記事の作成方針と監修体制。柔道整復師である院長 清水正尊が内容を確認し、医療機関の受診が必要な目安を明記するなど、YMYL領域として慎重に情報提供を行っています。",
  path: "/supervision",
});

const policies = [
  { t: "監修者", d: `サイト内の症状解説ページおよびコラム記事は、${clinic.name} ${director.role} ${director.name}（${director.license}）が内容を確認しています。監修者のプロフィールは院長紹介ページをご覧ください。` },
  { t: "目的と位置づけ", d: "記事は、腰痛や坐骨神経痛などに悩む方が、症状の一般的な考え方や日常生活での注意点を理解するための情報提供を目的としています。医師による診断・治療に代わるものではありません。" },
  { t: "表現のルール", d: "「必ず治る」「一回で改善」など効果を保証する表現、医療機関と比較して優れているとする表現、根拠のない数値や順位、医療機関と誤認させる表現（診断・診療など）は使用しません。" },
  { t: "医療機関の受診案内", d: "各症状ページには、急激な強い痛み、麻痺、排尿・排便の異常、発熱を伴う痛み、外傷後の強い症状など、医療機関の受診を優先すべき目安を必ず掲載しています。" },
  { t: "情報の根拠", d: "症状の一般的な説明は、公的機関や学会などが一般向けに公開している情報と、柔道整復師としての臨床経験をもとに作成しています。個別の症状の判断は、必ず医療機関にご相談ください。" },
  { t: "更新について", d: "各ページには公開日と最終更新日を表示しています。内容に誤りが見つかった場合や、ガイドライン等の改定があった場合は、速やかに修正します。" },
  { t: "お客様の声について", d: "掲載しているお客様の声は、実際に来院された方からいただいた言葉をそのまま掲載しています。個人の感想であり、施術の結果や効果を保証するものではないことを明記しています。" },
];

export default function SupervisionPage() {
  return (
    <>
      <PageHero
        en="Editorial Policy"
        title="記事監修について"
        lead={<p>このサイトは身体や健康に関わる情報を扱うため、次の方針で作成・監修しています。</p>}
        breadcrumb={[{ name: "記事監修について" }]}
      />
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div className="space-y-8">
            {policies.map((p) => (
              <div key={p.t}>
                <h2 className="border-l-4 border-brand-500 pl-4 text-xl font-bold text-ink">{p.t}</h2>
                <p className="mt-3 text-[1.0625rem] leading-[1.95] text-ink-soft">{p.d}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-line bg-mist p-6 text-[15px] leading-relaxed text-ink-soft">
              <p className="font-bold text-ink">読者の方へのお願い</p>
              <p className="mt-2">
                記事の内容は一般的な情報であり、すべての方に当てはまるとは限りません。症状が強い、長く続く、しびれや筋力低下が進むなどの場合は、自己判断せず医療機関を受診してください。記事に関するご意見・ご指摘は、お電話（{clinic.tel}）またはLINEでお寄せください。
              </p>
            </div>
          </div>
          <aside>
            <div className="card sticky top-24 p-6">
              <div className="relative mx-auto aspect-square w-32 overflow-hidden rounded-full">
                <Photo id="director-portrait" fill sizes="128px" />
              </div>
              <p className="mt-4 text-center text-lg font-bold text-ink">{director.name}</p>
              <p className="text-center text-sm text-muted">
                {clinic.name} {director.role}
                <br />
                {director.license}
              </p>
              <p className="mt-3 text-center text-sm text-ink-soft">
                施術歴{director.careerYears}・{director.totalCases}
              </p>
              <Link href="/staff" className="btn btn-outline mt-5 w-full min-h-12 text-sm">
                院長プロフィール
              </Link>
            </div>
          </aside>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
