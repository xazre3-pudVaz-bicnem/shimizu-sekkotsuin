import type { Metadata } from "next";
import { clinic } from "@/content/clinic";
import { ogImages } from "@/content/images";
import { AccessSection } from "@/components/content/AccessSection";
import { CtaSection } from "@/components/content/CtaSection";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CarIcon, MapPinIcon, TrainIcon } from "@/components/ui/Icons";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "アクセス｜足立区扇2-35-8・高野駅徒歩5分・扇大橋駅徒歩6分",
  description: `清水接骨院へのアクセス。住所は${clinic.address.full}（〒${clinic.address.postalCode}）。日暮里・舎人ライナー「高野駅」徒歩5分、「扇大橋駅」徒歩6分。小型車1台分の駐車場と徒歩1分のコインパーキングあり。営業時間・定休日・地図を掲載。`,
  path: "/access",
  ogImage: ogImages.clinic,
  keywords: ["清水接骨院 アクセス", "高野駅 接骨院", "扇大橋駅 接骨院", "足立区扇 接骨院 地図"],
});

export default function AccessPage() {
  return (
    <>
      <PageHero
        en="Access"
        title="アクセス"
        lead={
          <p>
            清水接骨院は、東京都足立区扇2丁目、日暮里・舎人ライナー「高野駅」から徒歩5分、「扇大橋駅」から徒歩6分の場所にあります。パークハイツ扇の1階南側、緑の看板と症状のイラストが描かれた窓が目印です。
          </p>
        }
        breadcrumb={[{ name: "アクセス" }]}
        image="clinic-exterior"
      />
      <AccessSection withHeading={false} />

      <section className="section">
        <div className="container-x">
          <SectionHeading en="How to get here" title="来院方法" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="card p-6">
              <p className="flex items-center gap-2 text-lg font-bold text-ink">
                <TrainIcon size={22} className="text-brand-600" /> 高野駅から
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                日暮里・舎人ライナー「高野駅」から徒歩5分。日暮里駅から乗車の場合、高野駅までは扇大橋駅の次の駅です。駅を出て扇2丁目方面へお進みください。
              </p>
            </div>
            <div className="card p-6">
              <p className="flex items-center gap-2 text-lg font-bold text-ink">
                <TrainIcon size={22} className="text-brand-600" /> 扇大橋駅から
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                日暮里・舎人ライナー「扇大橋駅」から徒歩6分。荒川を渡ってすぐの駅で、荒川区方面からもお越しいただきやすい駅です。
              </p>
            </div>
            <div className="card p-6">
              <p className="flex items-center gap-2 text-lg font-bold text-ink">
                <CarIcon size={22} className="text-brand-600" /> お車で
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                {clinic.access.parking}
                {clinic.access.parkingNote}
              </p>
            </div>
          </div>
          <div className="mt-8 rounded-2xl border border-line bg-mist p-6">
            <p className="flex items-center gap-2 font-bold text-ink">
              <MapPinIcon size={20} className="text-brand-600" /> 来院時の目印
            </p>
            <ul className="mt-3 grid gap-2 text-[15px] text-ink-soft sm:grid-cols-2">
              <li>・建物名「パークハイツ扇」の1階・南側です</li>
              <li>・緑色の「清水接骨院」の看板</li>
              <li>・窓に腰痛・膝痛などの症状イラスト</li>
              <li>・入口ドアに営業時間と電話番号の表示</li>
            </ul>
            <p className="mt-3 text-sm text-muted">道に迷われた場合は、お気軽にお電話ください。</p>
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[3/4] max-h-[520px] overflow-hidden rounded-3xl shadow-soft">
            <Photo id="clinic-exterior-evening" fill sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
          <div>
            <SectionHeading en="Area" title="足立区扇を中心に、近隣からもお越しいただいています" />
            <p className="mt-6 text-base leading-[1.9] text-ink-soft sm:text-lg">
              清水接骨院がある足立区扇は、日暮里・舎人ライナー沿線で荒川にも近いエリアです。扇・高野・江北・西新井方面のほか、扇大橋を渡った荒川区からも通いやすい場所にあります。実際に、足立区内だけでなく荒川区から通われている方もいらっしゃいます。
            </p>
            <p className="mt-4 text-base leading-[1.9] text-ink-soft sm:text-lg">
              夕方以降は入口の明かりが目印になります。平日は19:00まで、土曜は17:00まで受け付けていますので、お仕事帰りのご来院もご相談ください。
            </p>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
