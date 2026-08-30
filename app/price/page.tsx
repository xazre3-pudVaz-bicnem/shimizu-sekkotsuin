import type { Metadata } from "next";
import { faqGroups } from "@/content/faq";
import { pricing, formatYen } from "@/content/pricing";
import { CtaSection } from "@/components/content/CtaSection";
import { Faq } from "@/components/content/Faq";
import { PriceTable } from "@/components/sections/PriceSection";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AlertIcon, CheckIcon } from "@/components/ui/Icons";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "料金案内｜初回・2回目以降の施術料金",
  description: `足立区扇・高野駅の清水接骨院の料金案内。初回はカウンセリング・身体の状態確認と施術で${formatYen(pricing.first.total)}（税込）${pricing.campaign.enabled ? `、初回限定キャンペーン${formatYen(pricing.campaign.price)}` : ""}。2回目以降は施術料${formatYen(pricing.regular.price)}（税込）。自費施術・完全予約制。施術のリスクや注意点も掲載しています。`,
  path: "/price",
  keywords: ["足立区 接骨院 料金", "接骨院 自費 料金", "高野駅 接骨院 初回"],
});

export default function PricePage() {
  const included = [
    "カウンセリング（お悩み・経過・生活習慣の確認）",
    "身体の状態確認（姿勢・動き・筋肉や関節の状態）",
    "施術（身体の状態に合わせたソフトな手技）",
    "施術後の変化の確認と、状態のご説明",
    "セルフケア・生活習慣のアドバイス",
  ];
  return (
    <>
      <PageHero
        en="Price"
        title="料金案内"
        lead={
          <p>
            料金はすべて税込表示です。清水接骨院の施術は自費（保険外）で、初回はカウンセリング・身体の状態確認と施術を含みます。ご不明な点は、ご予約時にお気軽にお尋ねください。
          </p>
        }
        breadcrumb={[{ name: "料金案内" }]}
      />

      <section className="section">
        <div className="container-x">
          <PriceTable />
          {pricing.campaign.enabled && (
            <p className="mt-4 text-sm text-muted">
              ※{pricing.campaign.label}は予告なく終了する場合があります。{pricing.campaign.dailyLimit ? `1日${pricing.campaign.dailyLimit}名様までの受付です。` : ""}
            </p>
          )}
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading en="Included" title="施術料に含まれるもの" />
            <ul className="mt-6 space-y-2">
              {included.map((t) => (
                <li key={t} className="flex gap-3 rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink sm:text-base">
                  <CheckIcon size={20} className="mt-0.5 shrink-0 text-brand-600" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">回数券やプリペイドカードなど、事前にまとめてお支払いいただく仕組みはありません。</p>
          </div>
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-bold text-ink">健康保険について</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{pricing.insurance.policy}</p>
            </div>
            {pricing.guarantee.enabled && (
              <div className="card p-6">
                <h3 className="text-lg font-bold text-ink">{pricing.guarantee.label}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {pricing.guarantee.description}
                  {pricing.guarantee.note}
                </p>
              </div>
            )}
            {pricing.payment.verified && (
              <div className="card p-6">
                <h3 className="text-lg font-bold text-ink">お支払い方法</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{pricing.payment.methods.join("・")}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section bg-warn-bg">
        <div className="container-x">
          <SectionHeading en="Notice" title="施術に関する注意点・リスクについて" />
          <ul className="mt-8 space-y-3">
            {pricing.risks.map((r) => (
              <li key={r} className="flex gap-3 rounded-2xl border border-warn-line bg-white p-4 text-[15px] leading-relaxed text-ink-soft sm:text-base">
                <AlertIcon size={20} className="mt-0.5 shrink-0 text-warn" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading en="FAQ" title="料金・保険についてよくある質問" />
          <Faq items={[...faqGroups[2].items, faqGroups[1].items[1]]} className="mt-8" withSchema />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
