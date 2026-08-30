import { clinic, director } from "@/content/clinic";
import { CtaButtons } from "@/components/ui/CtaButtons";
import { Photo } from "@/components/ui/Photo";
import { CheckIcon } from "@/components/ui/Icons";

const chips = ["施術歴30年以上の柔道整復師", "累計10万件超の施術経験", "毎回、院長が担当", "強く押さないソフトな施術"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-mist">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-brand-100/60 blur-3xl" />
      <div className="container-x relative grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-20">
        <div>
          <p className="label-en">Shimizu Sekkotsuin</p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-sm font-bold text-brand-700">
            足立区扇・高野駅徒歩5分｜{clinic.reservation}
          </p>
          <h1 className="mt-5 text-[1.9rem] leading-[1.35] sm:text-4xl lg:text-[2.75rem]" style={{ textWrap: "initial" }}>
            <span className="inline-block">足立区扇・高野駅の</span>
            <span className="inline-block">清水接骨院</span>
            <br />
            <span className="text-brand-700">
              <span className="inline-block">腰痛・身体の</span>
              <span className="inline-block">痛みやしびれに</span>
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-[1.9] text-ink-soft sm:text-lg">
            腰・お尻・脚の痛みやしびれなど、長く続く身体のお悩みに向き合います。柔道整復師の院長が身体全体の状態を確認し、一人ひとりに合わせたソフトな施術と、再発を防ぐためのセルフケアまでお伝えします。
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {chips.map((c) => (
              <li key={c} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-ink-soft shadow-card">
                <CheckIcon size={16} className="text-brand-600" />
                {c}
              </li>
            ))}
          </ul>
          <CtaButtons className="mt-8" />
        </div>
        <div className="relative">
          <div className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-soft">
            <Photo id="check-lower-back" fill priority sizes="(min-width: 1024px) 48vw, 100vw" />
          </div>
          <div className="absolute -bottom-4 left-4 rounded-2xl bg-white/95 px-4 py-3 shadow-card sm:left-6">
            <p className="text-xs text-muted">
              {clinic.name} {director.role}
            </p>
            <p className="text-base font-bold text-ink">
              {director.name} <span className="text-sm font-medium text-brand-700">{director.license}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
