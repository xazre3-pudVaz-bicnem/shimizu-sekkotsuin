import { clinic } from "@/content/clinic";
import { ClinicInfo } from "@/components/content/ClinicInfo";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CarIcon, ExternalIcon, MapPinIcon, TrainIcon } from "@/components/ui/Icons";

export function AccessSection({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section id="access" className="section bg-mist">
      <div className="container-x">
        {withHeading && (
          <SectionHeading
            title="アクセス｜足立区扇・高野駅徒歩5分"
            lead="日暮里・舎人ライナー「高野駅」から徒歩5分、「扇大橋駅」から徒歩6分。緑の看板と、症状のイラストが描かれた窓が目印です。"
          />
        )}
        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-soft">
              <iframe
                src={clinic.mapEmbedUrl}
                title="清水接骨院の地図（Googleマップ）"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={clinic.links.googleMaps} target="_blank" rel="noopener noreferrer" className="btn btn-outline min-h-12">
                <MapPinIcon size={18} /> Googleマップで開く <ExternalIcon size={14} />
              </a>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="card p-5">
                <p className="flex items-center gap-2 font-bold text-ink">
                  <TrainIcon size={20} className="text-brand-600" /> 電車でお越しの方
                </p>
                <ul className="mt-2 space-y-1 text-[15px] text-ink-soft">
                  {clinic.access.stations.map((s) => (
                    <li key={s.station}>
                      {s.line}「{s.station}」{s.walk}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card p-5">
                <p className="flex items-center gap-2 font-bold text-ink">
                  <CarIcon size={20} className="text-brand-600" /> お車でお越しの方
                </p>
                <p className="mt-2 text-[15px] text-ink-soft">{clinic.access.parking}</p>
                <p className="mt-1 text-sm text-muted">{clinic.access.parkingNote}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft">
              <Photo id="clinic-exterior" fill sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
            <ClinicInfo className="mt-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
