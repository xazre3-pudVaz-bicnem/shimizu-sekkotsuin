import type { Metadata } from "next";
import Link from "next/link";
import { director } from "@/content/clinic";
import { pricing } from "@/content/pricing";
import { faqGroups } from "@/content/faq";
import { symptoms } from "@/content/symptoms";
import { CtaSection } from "@/components/content/CtaSection";
import { Faq } from "@/components/content/Faq";
import { SymptomCard } from "@/components/content/SymptomCard";
import { Flow } from "@/components/sections/Flow";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AlertIcon, ArrowIcon } from "@/components/ui/Icons";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "施術について｜強く押さないソフトな手技で身体全体を整える",
  description:
    "足立区扇・高野駅の清水接骨院の施術内容。柔道整復師の院長が身体全体の状態を確認し、筋膜・筋肉・骨格・骨盤のバランスにやさしく働きかけるソフトな手技で、腰痛・坐骨神経痛などの痛みやしびれの改善を目指します。施術のリスクや医療機関との役割分担も掲載。",
  path: "/treatment",
  keywords: ["足立区 接骨院 施術", "ソフト 整体 足立区", "腰痛 施術 高野駅", "筋膜 骨盤 施術"],
});

const features = [
  { title: "全身の状態確認から始める", text: "姿勢・動き・筋肉の緊張・関節の可動域を確認し、痛みに関係していると考えられる部分を探します。「なぜ今その場所に負担が集まっているのか」を一緒に確認します。" },
  { title: "ソフトで心地よい刺激", text: "バキバキ・ボキボキと鳴らす施術は行いません。うとうとされる方も多い、やさしい手技が中心です。強めをご希望の方には相談のうえ調整します。" },
  { title: "一人ひとりに合わせた内容", text: "同じ「腰痛」でも、原因と考えられる部分は人によって異なります。皮膚・筋膜・筋肉・関節・靭帯・お腹まわりなど、状態に応じて働きかける場所と方法を選びます。" },
  { title: "施術後の変化を一緒に確認", text: "施術の前後で動きや痛みの変化を確認し、今の状態と今後の目安をご説明します。分からないことはその場でお尋ねください。" },
  { title: "セルフケア・生活習慣の指導", text: "施術で整えた状態を保つために、ご自宅でできるストレッチや座り方・立ち方の工夫をお伝えします。" },
  { title: "医療機関との役割分担", text: "身体の状態から医療機関での確認が必要と考えられる場合は、施術より先に受診をお勧めします。通院中の方は主治医の指示を優先してください。" },
];

export default function TreatmentPage() {
  const primary = symptoms.filter((s) => s.priority === 1);
  return (
    <>
      <PageHero
        en="Treatment"
        title="施術について"
        lead={
          <p>
            清水接骨院の施術は、痛みが出ている場所だけでなく身体全体の状態を確認したうえで、筋膜・筋肉・骨格・骨盤のバランスにやさしく働きかけるソフトな手技が中心です。すべて柔道整復師の院長が担当します。
          </p>
        }
        breadcrumb={[{ name: "施術について" }]}
        image="treatment-neck"
      />

      <section className="section">
        <div className="container-x">
          <SectionHeading en="Features" title="清水接骨院の施術の特徴" />
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <li key={f.title} className="card p-6">
                <p className="font-latin text-sm font-extrabold tracking-[0.2em] text-brand-600">0{i + 1}</p>
                <h3 className="mt-2 text-lg font-bold text-ink">{f.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative col-span-2 aspect-[3/2] overflow-hidden rounded-3xl shadow-soft">
              <Photo id="check-lower-back" fill sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
              <Photo id="treatment-knee" fill sizes="(min-width: 1024px) 22vw, 50vw" />
            </div>
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
              <Photo id="check-shoulder" fill sizes="(min-width: 1024px) 22vw, 50vw" />
            </div>
          </div>
          <div>
            <SectionHeading en="Approach" title="取り入れている考え方・手技" />
            <p className="mt-6 text-base leading-[1.9] text-ink-soft sm:text-lg">
              腰痛の多くは、レントゲンには写らない筋肉・靭帯・筋膜などの硬さや、身体の使い方の偏りが関わっています。当院では次のような考え方を組み合わせ、痛みが出ている場所と、その負担の元になっている場所の両方に働きかけます。
            </p>
            <ul className="mt-5 space-y-2">
              {director.methods.map((m) => (
                <li key={m} className="flex gap-3 rounded-xl border border-line bg-white px-4 py-3 text-[15px] font-medium text-ink">
                  <span aria-hidden="true" className="mt-[0.6em] block h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                  {m}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">※施術内容は身体の状態により異なります。効果には個人差があります。</p>
          </div>
        </div>
      </section>

      <Flow withHeading />

      <section className="section bg-mist">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHeading en="Foot" title="足元から身体を見る" lead="足の状態は、立ち方・歩き方を通して膝や腰の負担に影響します。" />
            <p className="mt-6 text-base leading-[1.9] text-ink-soft sm:text-lg">
              当院では、必要に応じて足の長さ・幅の測定や足型（フットプリント）の確認を行い、横アーチの崩れや荷重の偏りなど、足元からの負担を確認しています。ご希望の方にはインソールについてもご相談いただけます。膝や腰の痛みが歩き方と関係していると考えられる場合に、身体全体を見る手がかりのひとつとして活用しています。
            </p>
            <p className="mt-3 text-sm text-muted">※足の測定・インソールの詳細や費用は、ご予約時またはご来院時にお尋ねください。</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-soft">
              <Photo id="foot-measurement-1" fill sizes="(min-width: 1024px) 20vw, 50vw" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-soft">
              <Photo id="foot-print-analysis" fill sizes="(min-width: 1024px) 20vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading en="Symptoms" title="施術で多くご相談いただく症状" />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {primary.map((s) => (
              <li key={s.slug}>
                <SymptomCard symptom={s} compact />
              </li>
            ))}
          </ul>
          <Link href="/symptoms" className="btn btn-outline mt-8">
            症状一覧を見る <ArrowIcon size={18} />
          </Link>
        </div>
      </section>

      <section className="section bg-warn-bg">
        <div className="container-x">
          <SectionHeading en="Notice" title="施術に関する注意点・リスクについて" lead="安心して施術を受けていただくために、あらかじめお読みください。" />
          <ul className="mt-8 space-y-3">
            {pricing.risks.map((r) => (
              <li key={r} className="flex gap-3 rounded-2xl border border-warn-line bg-white p-4 text-[15px] leading-relaxed text-ink-soft sm:text-base">
                <AlertIcon size={20} className="mt-0.5 shrink-0 text-warn" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
            接骨院の施術は医療機関の診断・治療に代わるものではありません。検査や診断が必要と考えられる場合は、整形外科などの医療機関の受診をお勧めしています。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading en="FAQ" title="施術についてよくある質問" />
          <Faq items={faqGroups[0].items} className="mt-8" withSchema />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
