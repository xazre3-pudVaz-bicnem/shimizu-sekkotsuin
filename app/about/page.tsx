import type { Metadata } from "next";
import Link from "next/link";
import { clinic, director } from "@/content/clinic";
import { symptoms } from "@/content/symptoms";
import { ogImages } from "@/content/images";
import { DoctorProfile } from "@/components/content/DoctorProfile";
import { VideoSection } from "@/components/content/VideoSection";
import { AccessSection } from "@/components/content/AccessSection";
import { CtaSection } from "@/components/content/CtaSection";
import { SymptomCard } from "@/components/content/SymptomCard";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon, CheckIcon } from "@/components/ui/Icons";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "清水接骨院について｜足立区扇で身体全体をみる接骨院",
  description:
    "足立区扇・高野駅徒歩5分の清水接骨院の特徴と施術方針。柔道整復師の院長が、腰痛・坐骨神経痛など身体の痛みやしびれに対して、痛い場所だけでなく身体全体の状態を確認し、一人ひとりに合わせたソフトな施術とセルフケアの指導を行います。",
  path: "/about",
  ogImage: ogImages.clinic,
  keywords: ["足立区 接骨院", "扇 接骨院", "高野駅 接骨院", "清水接骨院 特徴"],
});

const pillars = [
  {
    title: "身体全体の状態を確認する",
    text: "痛みが出ている場所は「結果」であることが少なくありません。姿勢、関節の動き、筋肉の緊張、日常の身体の使い方を全身で確認し、負担が集まっている理由を探します。",
  },
  {
    title: "強く押さない、鳴らさないソフトな手技",
    text: "筋膜や筋肉、骨格・骨盤のバランスにやさしく働きかけます。ご高齢の方や強い刺激が苦手な方も受けやすい施術です。強さはご希望に合わせて調整します。",
  },
  {
    title: "施術後のセルフケアと生活習慣まで",
    text: "施術で整えた状態を日常で保てるよう、ご自宅でできるストレッチや座り方・立ち方の工夫をお伝えします。LINEや電話でのご相談にも対応しています。",
  },
];

export default function AboutPage() {
  const primary = symptoms.filter((s) => s.priority === 1);
  return (
    <>
      <PageHero
        en="About"
        title="清水接骨院について"
        lead={
          <p>
            清水接骨院は、東京都足立区扇にある接骨院です。日暮里・舎人ライナー「高野駅」から徒歩5分、「扇大橋駅」から徒歩6分。柔道整復師の院長が、腰痛や坐骨神経痛、脚のしびれなど長く続く身体の悩みに、身体全体を確認しながら向き合っています。
          </p>
        }
        breadcrumb={[{ name: "清水接骨院について" }]}
        image="clinic-exterior"
      />

      <section className="section">
        <div className="container-x">
          <SectionHeading en="Policy" title="清水接骨院が大切にしている3つのこと" />
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {pillars.map((p, i) => (
              <li key={p.title} className="card p-6">
                <p className="font-latin text-sm font-extrabold tracking-[0.2em] text-brand-600">0{i + 1}</p>
                <h3 className="mt-2 text-lg font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading en="Clinic" title="院内の様子と衛生管理" />
            <p className="mt-6 text-base leading-[1.9] text-ink-soft sm:text-lg">
              施術はカーテンで仕切られた落ち着いた施術スペースで行います。完全予約制のため、他の患者さんと重なることが少なく、ご自身の身体のことに集中していただけます。
            </p>
            <ul className="mt-5 space-y-2">
              {[
                "施術室の定期的な換気",
                "ベッド・机・ドアノブなど手に触れる場所のアルコール消毒",
                "施術者の手洗い・体調管理の徹底",
                "来院時の手指消毒のお願い",
                `${clinic.reservation}で院内は最小限の人数`,
              ].map((t) => (
                <li key={t} className="flex gap-2 text-[15px] text-ink-soft">
                  <CheckIcon size={18} className="mt-1 shrink-0 text-brand-600" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-soft">
              <Photo id="posture-check-1" fill sizes="(min-width: 1024px) 22vw, 50vw" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-soft">
              <Photo id="posture-check-2" fill sizes="(min-width: 1024px) 22vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading en="Symptoms" title="力を入れている症状" lead="腰・お尻・脚の痛みやしびれを中心に、身体の痛みについて幅広くご相談いただけます。" />
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

      <DoctorProfile />
      <VideoSection />

      <section className="section bg-mist">
        <div className="container-x">
          <SectionHeading en="Information" title="運営者情報" />
          <dl className="mt-8 max-w-3xl">
            {[
              ["名称", clinic.name],
              ["代表", `${director.name}（${director.license}）`],
              ["所在地", `〒${clinic.address.postalCode} ${clinic.address.full}`],
              ["電話番号", clinic.tel],
              ["営業時間", clinic.hours.map((h) => `${h.days} ${h.time}`).join("／")],
              ["定休日", clinic.closed],
              ["施術者", `${director.name}（施術はすべて院長が担当）`],
              ["施術形態", `${clinic.reservation}・自費施術`],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[6rem_1fr] gap-3 border-b border-line py-3 text-[15px] sm:grid-cols-[9rem_1fr] sm:text-base">
                <dt className="font-bold text-ink-soft">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <AccessSection />
      <CtaSection />
    </>
  );
}
