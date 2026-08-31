import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { clinic } from "@/content/clinic";
import { CtaSection } from "@/components/content/CtaSection";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExternalIcon, LineIcon } from "@/components/ui/Icons";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "口コミのお願い｜Googleクチコミ・LINE友だち追加",
  description:
    "清水接骨院（足立区扇・高野駅徒歩5分）をご利用いただいた方へ、Googleマップへのクチコミ投稿のお願いと手順、LINE友だち追加のご案内です。率直なご感想が、同じ症状で悩む方の参考になります。",
  path: "/review",
});

const steps = [
  "下の「Googleにクチコミを書く」ボタンを押すか、QRコードをスマートフォンで読み取ります。",
  "Googleアカウントでログインします（お持ちでない場合は作成が必要です）。",
  "星の数を選び、来院のきっかけや施術を受けた感想を、ご自身の言葉で書いてください。",
  "「投稿」を押して完了です。お名前や症状の詳細は、書きたくない範囲で構いません。",
];

export default function ReviewPage() {
  return (
    <>
      <PageHero
        title="口コミのお願い"
        lead={
          <p>
            清水接骨院をご利用いただき、ありがとうございます。よろしければ、Googleマップに率直なご感想をお寄せください。「どんな症状で来院し、どう感じたか」というお言葉は、同じ症状で悩んでいる方が院を選ぶときの大きな参考になります。
          </p>
        }
        breadcrumb={[{ name: "口コミのお願い" }]}
      />

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
          <div>
            <SectionHeading title="Googleクチコミの書き方" />
            <ol className="mt-6 space-y-3">
              {steps.map((s, i) => (
                <li key={i} className="flex gap-3 rounded-2xl border border-line bg-white p-4">
                  <span className="font-latin flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">{i + 1}</span>
                  <span className="text-[15px] leading-relaxed text-ink-soft sm:text-base">{s}</span>
                </li>
              ))}
            </ol>
            <a href={clinic.links.googleReview} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6 min-h-14 text-lg">
              Googleにクチコミを書く <ExternalIcon size={16} />
            </a>
            <div className="mt-8 rounded-2xl border border-line bg-mist p-5 text-[15px] leading-relaxed text-ink-soft">
              <p className="font-bold text-ink">お願い</p>
              <ul className="mt-2 space-y-1">
                <li>・感じたままを、ご自身の言葉でお書きください。良かった点も、改善してほしい点も参考になります。</li>
                <li>・施術の効果には個人差があります。「必ず良くなる」といった表現ではなく、ご自身の経過としてお書きいただけると助かります。</li>
                <li>・クチコミの投稿に対して、割引や特典をお渡しすることはありません。</li>
              </ul>
            </div>
          </div>
          <aside className="space-y-6">
            <div className="card p-6 text-center">
              <p className="font-bold text-ink">Googleクチコミ</p>
              <Image src="/images/qr-google-review.svg" alt="Googleクチコミ投稿ページのQRコード" width={200} height={200} unoptimized className="mx-auto mt-3 h-auto w-40" />
              <p className="mt-2 text-xs text-muted">スマートフォンのカメラで読み取ってください</p>
            </div>
            <div className="card p-6 text-center">
              <p className="flex items-center justify-center gap-2 font-bold text-ink">
                <LineIcon size={20} className="text-linebrand" /> LINE友だち追加
              </p>
              <Image src="/images/qr-line.svg" alt="清水接骨院のLINE友だち追加QRコード" width={200} height={200} unoptimized className="mx-auto mt-3 h-auto w-40" />
              <a href={clinic.line.url} target="_blank" rel="noopener noreferrer" className="btn btn-line mt-3 w-full min-h-12 text-sm">
                <LineIcon size={18} /> LINEで友だち追加
              </a>
              <p className="mt-2 text-xs text-muted">ご予約・ご相談は24時間受付（返信は営業時間内）</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-x">
          <SectionHeading title="これまでにいただいた声" lead="来院された方の声や、症状別の施術事例もご覧いただけます。" />
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/voice" className="btn btn-outline">
              お客様の声を見る
            </Link>
            <Link href="/cases" className="btn btn-outline">
              施術事例を見る
            </Link>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
