import Link from "next/link";
import type { StationGuide as Guide } from "@/content/access";
import { stationGuides } from "@/content/access";
import { clinic } from "@/content/clinic";
import { ClinicInfo } from "@/components/content/ClinicInfo";
import { Faq } from "@/components/content/Faq";
import { CtaSection } from "@/components/content/CtaSection";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon, CheckIcon, ExternalIcon, MapPinIcon, TrainIcon } from "@/components/ui/Icons";

export function StationGuidePage({ guide }: { guide: Guide }) {
  const other = stationGuides.find((g) => g.slug !== guide.slug);
  return (
    <>
      <PageHero
        title={guide.h1}
        lead={
          <>
            {guide.intro.map((p, i) => (
              <p key={i} className={i ? "mt-3" : ""}>
                {p}
              </p>
            ))}
          </>
        }
        breadcrumb={[{ name: "アクセス", href: "/access" }, { name: `${guide.station}からの道順` }]}
        image="clinic-exterior"
      />

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div>
            <SectionHeading title={`${guide.station}からの徒歩ルート`} />
            <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-soft">
              <iframe
                src={guide.mapsEmbedUrl}
                title={`${guide.station}から清水接骨院までの徒歩ルート（Googleマップ）`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <a href={guide.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-4 min-h-12">
              <MapPinIcon size={18} /> Googleマップで徒歩ルートを開く <ExternalIcon size={14} />
            </a>
          </div>
          <div>
            <SectionHeading title="院までの流れ" />
            <ol className="mt-6 space-y-3">
              {guide.steps.map((s, i) => (
                <li key={i} className="flex gap-3 rounded-2xl border border-line bg-white p-4">
                  <span className="font-latin flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">{i + 1}</span>
                  <span className="text-[15px] leading-relaxed text-ink-soft sm:text-base">{s}</span>
                </li>
              ))}
            </ol>
            <div className="mt-6 rounded-2xl border border-line bg-mist p-5">
              <p className="flex items-center gap-2 font-bold text-ink">
                <TrainIcon size={20} className="text-brand-600" /> {guide.line}「{guide.station}」{guide.walk}
              </p>
              <p className="mt-2 text-sm text-muted">
                〒{clinic.address.postalCode} {clinic.address.full}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading title={`${guide.station}が便利な方`} />
            <ul className="mt-6 space-y-2">
              {guide.forWhom.map((t) => (
                <li key={t} className="flex gap-3 text-[15px] text-ink-soft sm:text-base">
                  <CheckIcon size={18} className="mt-1 shrink-0 text-brand-600" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <SectionHeading title="来院前に知っておいていただきたいこと" className="mt-10" />
            <ul className="mt-6 space-y-2">
              {guide.tips.map((t) => (
                <li key={t} className="flex gap-3 text-[15px] text-ink-soft sm:text-base">
                  <CheckIcon size={18} className="mt-1 shrink-0 text-brand-600" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft">
              <Photo id="clinic-exterior-evening" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-[center_60%]" />
            </div>
            <p className="mt-2 text-sm text-muted">到着後の目印：パークハイツ扇1階・南側、緑の看板と症状イラストの窓</p>
            <ClinicInfo className="mt-6" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading title={`${guide.station}からの来院についてよくある質問`} />
          <Faq items={guide.faq} className="mt-8" withSchema />
          <div className="mt-8 flex flex-wrap gap-3">
            {other && (
              <Link href={`/access/${other.slug}`} className="btn btn-outline">
                {other.station}からの道順 <ArrowIcon size={18} />
              </Link>
            )}
            <Link href="/access" className="btn btn-ghost">
              アクセス情報へ戻る
            </Link>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
