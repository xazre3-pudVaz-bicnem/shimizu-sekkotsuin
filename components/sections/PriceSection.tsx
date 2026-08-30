import Link from "next/link";
import { pricing, formatYen } from "@/content/pricing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/Icons";

/** 料金の表。トップと /price で共用。 */
export function PriceTable() {
  const c = pricing.campaign;
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
      <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <div className="p-6 sm:p-8">
          <p className="text-sm font-bold text-brand-700">初回</p>
          <p className="mt-1 text-base text-ink-soft">{pricing.first.label}</p>
          {c.enabled ? (
            <>
              <p className="mt-4 text-sm text-muted">
                通常 <span className="line-through">{formatYen(pricing.first.total)}</span>
                （初診料{formatYen(pricing.first.consultationFee)}＋施術料{formatYen(pricing.first.treatmentFee)}）
              </p>
              <p className="mt-1 text-ink">
                <span className="text-sm font-bold text-brand-700">{c.label}</span>
                <br />
                <span className="font-latin text-4xl font-extrabold tracking-tight text-brand-700">{c.price.toLocaleString("ja-JP")}</span>
                <span className="ml-1 font-bold">円（税込）</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {c.howTo}
                {c.dailyLimit ? `1日${c.dailyLimit}名様までの受付です。` : ""}
              </p>
            </>
          ) : (
            <p className="mt-4 text-ink">
              <span className="font-latin text-4xl font-extrabold tracking-tight text-brand-700">{pricing.first.total.toLocaleString("ja-JP")}</span>
              <span className="ml-1 font-bold">円（税込）</span>
              <span className="block text-sm text-muted">初診料{formatYen(pricing.first.consultationFee)}＋施術料{formatYen(pricing.first.treatmentFee)}</span>
            </p>
          )}
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-sm font-bold text-brand-700">2回目以降</p>
          <p className="mt-1 text-base text-ink-soft">{pricing.regular.label}</p>
          <p className="mt-4 text-ink">
            <span className="font-latin text-4xl font-extrabold tracking-tight text-ink">{pricing.regular.price.toLocaleString("ja-JP")}</span>
            <span className="ml-1 font-bold">円（税込）</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            身体の状態確認・施術・施術後の説明とセルフケアのアドバイスを含みます。回数券などの事前購入はありません。
          </p>
        </div>
      </div>
      <div className="border-t border-line bg-mist px-6 py-4 text-sm leading-relaxed text-ink-soft sm:px-8">
        <p>{pricing.insurance.policy}</p>
        {pricing.guarantee.enabled && (
          <p className="mt-2">
            <span className="font-bold text-ink">{pricing.guarantee.label}：</span>
            {pricing.guarantee.description}
            {pricing.guarantee.note}
          </p>
        )}
      </div>
    </div>
  );
}

export function PriceSection() {
  return (
    <section id="price" className="section bg-cream">
      <div className="container-x">
        <SectionHeading
          en="Price"
          title="料金案内"
          lead="すべて税込表示です。初回はカウンセリングと身体の状態確認を含みます。ご不明な点はご予約時にお気軽にお尋ねください。"
        />
        <div className="mt-10">
          <PriceTable />
        </div>
        <div className="mt-6">
          <Link href="/price" className="btn btn-outline">
            料金の詳細・施術の注意点を見る <ArrowIcon size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
