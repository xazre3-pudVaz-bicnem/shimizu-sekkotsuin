import type { Metadata } from "next";
import Link from "next/link";
import { clinic, director } from "@/content/clinic";
import { getSymptom } from "@/content/symptoms";
import { ogImages } from "@/content/images";
import { CtaSection } from "@/components/content/CtaSection";
import { SymptomCard } from "@/components/content/SymptomCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CtaButtons } from "@/components/ui/CtaButtons";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/ui/Icons";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "院長紹介｜清水正尊（柔道整復師・施術歴30年以上）",
  description:
    "足立区扇・高野駅の清水接骨院 院長 清水正尊のプロフィール。国家資格・柔道整復師。施術歴30年以上、累計10万件超の施術経験。腰痛・坐骨神経痛・ヘルニア・脊柱管狭窄症など腰まわりの症状を中心に、身体全体を確認するソフトな施術を行います。",
  path: "/staff",
  ogImage: ogImages.director,
  keywords: ["清水接骨院 院長", "清水正尊", "柔道整復師 足立区", "足立区 接骨院 院長"],
});

const focusSlugs = ["lower-back-pain", "sciatica", "lumbar-disc-herniation", "spinal-stenosis", "acute-lower-back-pain", "knee-pain", "shoulder-stiffness", "hip-pain"];

const methodDetails: Record<string, string> = {
  "筋膜・筋肉へのソフトな手技": "硬くなった筋肉や筋膜にやさしく働きかけ、動きを取り戻すことを目指します。強く押したり、無理に身体を鳴らしたりはしません。",
  "骨格・骨盤のバランス調整": "かばい合ってゆがんだ全身のバランスを確認し、関節が動きやすい状態へ整えていきます。",
  "運動連鎖（身体のつながり）の考え方": "足元・股関節・背中・首はつながって動いています。腰の痛みでも、離れた場所の使い方が関係していることを前提に確認します。",
  "トリガーポイントの考え方": "痛みを感じる場所と、痛みの元になっている筋肉の硬さが離れていることがあります。その関係を踏まえて施術部位を選びます。",
  "内臓まわりの緊張への配慮": "お腹まわりの緊張が姿勢や腰の動きに影響することがあるため、必要に応じてやさしく確認します。",
};

export default function StaffPage() {
  const focus = focusSlugs.map((s) => getSymptom(s)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  return (
    <>
      <section className="border-b border-line bg-mist">
        <div className="container-x pt-5 pb-10 sm:pb-14">
          <Breadcrumb items={[{ name: "院長紹介" }]} />
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-14">
            <div>
              <p className="label-en">Director</p>
              <h1 className="mt-3 text-[1.75rem] leading-snug sm:text-4xl">
                院長紹介
                <span className="mt-2 block text-xl text-ink-soft sm:text-2xl">
                  {clinic.name} {director.role} {director.name}
                </span>
              </h1>
              <p className="mt-3 text-lg font-bold text-brand-700">{director.license}</p>
              <p className="mt-5 text-base leading-[1.9] text-ink-soft sm:text-lg">
                施術歴{director.careerYears}、{director.totalCases}の施術経験を持つ柔道整復師。足立区扇の清水接骨院で、腰痛・坐骨神経痛・椎間板ヘルニア・脊柱管狭窄症など腰まわりの症状を中心に、身体全体を確認しながら一人ひとりに合わせた施術を行っています。当サイトの症状解説・コラムの監修も担当しています。
              </p>
              <ul className="mt-6 space-y-2">
                {director.facts.map((f) => (
                  <li key={f} className="flex gap-3 text-[15px] text-ink-soft sm:text-base">
                    <CheckIcon size={18} className="mt-1 shrink-0 text-brand-600" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-soft">
              <Photo id="director-portrait" fill priority sizes="(min-width: 1024px) 36vw, (min-width: 640px) 448px, 100vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHeading en="Greeting" title="ごあいさつ" />
            <div className="mt-6 space-y-4 text-base leading-[1.95] text-ink-soft sm:text-lg">
              {director.greeting.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="mt-6 text-right font-bold text-ink">
              {clinic.name} {director.role} {director.name}
            </p>
          </div>
          <div className="space-y-4">
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-soft">
              <Photo id="director-smile" fill sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-soft">
              <Photo id="explanation-spine-1" fill sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-x">
          <SectionHeading en="Profile" title="プロフィール・経歴" lead="既存の公式サイト等で確認できる事実のみを掲載しています。" />
          <dl className="mt-8 max-w-3xl">
            {[
              ["氏名", director.name],
              ["役職", `${clinic.name} ${director.role}`],
              ["資格", director.license],
              ["施術歴", `${director.careerYears}（${director.totalCases}）`],
              ["経歴", "柔道整復師の国家資格を取得後、複数の接骨院で幅広い施術経験を積み、東京都足立区扇に清水接骨院を開設。現在に至る。"],
              ["担当", "カウンセリング・身体の状態確認・施術・アフターフォローのすべて"],
              ["監修", "当サイトの症状解説ページおよびコラム記事"],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[5rem_1fr] gap-3 border-b border-line py-3 text-[15px] sm:grid-cols-[8rem_1fr] sm:text-base">
                <dt className="font-bold text-ink-soft">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading en="Approach" title="施術で大切にしている考え方" />
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {director.methods.map((m) => (
              <li key={m} className="card p-6">
                <h3 className="text-lg font-bold text-ink">{m}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{methodDetails[m]}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            ※施術内容は身体の状態により異なります。医療機関での確認が必要と考えられる場合は、施術より先に受診をお勧めします。
          </p>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container-x">
          <SectionHeading en="Symptoms" title="院長が特に多く担当してきた症状" lead="各症状の考え方と施術方針は、症状ページで詳しく解説しています。" />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {focus.map((s) => (
              <li key={s.slug}>
                <SymptomCard symptom={s} compact />
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[15px] text-ink-soft">
            サイト内の記事の監修方針については
            <Link href="/supervision" className="mx-1 font-bold text-brand-700 underline-offset-4 hover:underline">
              記事監修について
            </Link>
            をご覧ください。
          </p>
          <CtaButtons className="mt-10" />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
