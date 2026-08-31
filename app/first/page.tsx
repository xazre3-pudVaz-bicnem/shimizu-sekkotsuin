import type { Metadata } from "next";
import Link from "next/link";
import { clinic } from "@/content/clinic";
import { faqGroups } from "@/content/faq";
import { CtaSection } from "@/components/content/CtaSection";
import { Faq } from "@/components/content/Faq";
import { RedFlagBox } from "@/components/content/RedFlagBox";
import { Flow } from "@/components/sections/Flow";
import { PriceTable } from "@/components/sections/PriceSection";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaButtons } from "@/components/ui/CtaButtons";
import { ArrowIcon, CheckIcon, LineIcon, PhoneIcon } from "@/components/ui/Icons";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "初めての方へ｜初回の流れ・予約方法・服装",
  description:
    "足立区扇・高野駅の清水接骨院に初めて来院される方へ。LINE・電話での予約方法、初回の流れ（カウンセリング・身体の状態確認・施術・説明）、当日の服装、初回料金、医療機関を先に受診すべき目安をまとめました。完全予約制。",
  path: "/first",
  keywords: ["足立区 接骨院 初めて", "接骨院 初回 流れ", "高野駅 接骨院 予約"],
});

export default function FirstPage() {
  return (
    <>
      <PageHero
        title="初めての方へ"
        lead={
          <p>
            「接骨院に行くのは初めて」「この症状で相談していいのか分からない」という方も、安心してお越しいただけるよう、予約から施術後までの流れをまとめました。清水接骨院は{clinic.reservation}で、カウンセリングから施術まで院長が担当します。
          </p>
        }
        breadcrumb={[{ name: "初めての方へ" }]}
        image="counseling-1"
      />

      <section className="section">
        <div className="container-x">
          <SectionHeading title="ご予約の方法" lead="LINEまたはお電話でご予約ください。当日でも空きがあればご案内できます。" />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="card p-6 sm:p-8">
              <p className="flex items-center gap-2 text-lg font-bold text-ink">
                <LineIcon size={24} className="text-linebrand" /> LINEで予約する（24時間受付）
              </p>
              <ol className="mt-4 space-y-3">
                {[
                  "下のボタンから友だち追加します。",
                  "お名前・電話番号・ご希望の日時・症状をメッセージで送ります。",
                  "内容を確認して、院からご連絡します。",
                ].map((t, i) => (
                  <li key={t} className="flex gap-3 text-[15px] text-ink-soft">
                    <span className="font-latin flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">{i + 1}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
              <a href={clinic.line.url} target="_blank" rel="noopener noreferrer" className="btn btn-line mt-6 w-full">
                <LineIcon size={22} /> {clinic.line.label}
              </a>
            </div>
            <div className="card p-6 sm:p-8">
              <p className="flex items-center gap-2 text-lg font-bold text-ink">
                <PhoneIcon size={22} className="text-brand-600" /> 電話で予約する
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                受付時間内にお電話ください。{clinic.telNote}
              </p>
              <p className="mt-3 text-sm text-muted">
                {clinic.hours.map((h) => `${h.days} ${h.time}`).join("／")}｜定休日 {clinic.closed}
              </p>
              <a href={clinic.telHref} className="btn btn-primary mt-6 w-full">
                <PhoneIcon size={20} /> <span className="tel-link text-lg">{clinic.tel}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-x">
          <SectionHeading title="来院前に知っておいていただきたいこと" />
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { t: "服装", d: "動きやすい服装でお越しください。デニムや革など伸びにくい素材は避けていただくと施術がスムーズです。院内でのお着替えも可能です。" },
              { t: "持ち物", d: "特別な持ち物は必要ありません。医療機関で検査を受けている方は、結果や処方内容が分かるものがあれば参考になります。" },
              { t: "来院時間", d: "予約時間の5分前を目安にお越しください。問診票の記入後、カウンセリングから始めます。" },
            ].map((c) => (
              <li key={c.t} className="card p-6">
                <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                  <CheckIcon size={20} className="text-brand-600" /> {c.t}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{c.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Flow withHeading />

      <section className="section bg-mist">
        <div className="container-x">
          <SectionHeading title="初回の料金" lead="初回はカウンセリング・身体の状態確認と施術を行います。" />
          <div className="mt-8">
            <PriceTable />
          </div>
          <Link href="/price" className="btn btn-outline mt-6">
            料金案内を見る <ArrowIcon size={18} />
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading title="先に医療機関を受診していただきたいケース" />
          <div className="mt-8">
            <RedFlagBox
              intro="接骨院の施術は、医療機関の検査や診断に代わるものではありません。次のような症状がある場合は、施術より先に整形外科などの医療機関を受診してください。"
              items={[
                "転倒や事故などの外傷のあとの強い痛み・腫れ・変形",
                "急に出た強い痛みで、安静にしていても楽にならない",
                "脚や腕の麻痺、力が入らない状態が進んでいる",
                "排尿・排便がしにくい、感覚が鈍い",
                "発熱を伴う痛み、原因不明の体重減少を伴う痛み",
                "がんの治療歴がある方の新しい痛み",
              ]}
              outro="判断に迷う場合は、症状の様子をお電話またはLINEでお知らせください。状況を伺ったうえで、受診をお勧めするか、来院いただくかをご案内します。"
            />
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-x">
          <SectionHeading title="初めての方からよくあるご質問" />
          <Faq items={[...faqGroups[1].items, faqGroups[0].items[0], faqGroups[0].items[2]]} className="mt-8" withSchema />
          <CtaButtons className="mt-10" />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
