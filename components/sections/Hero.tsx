import { clinic, director } from "@/content/clinic";
import { CtaButtons } from "@/components/ui/CtaButtons";
import { Photo } from "@/components/ui/Photo";
import { CheckIcon } from "@/components/ui/Icons";

const chips = ["施術歴30年以上の柔道整復師", "累計10万件超の施術経験", "毎回、院長が担当", "強く押さないソフトな施術"];

/** ヒーロー：写真を画面幅いっぱいに出し、その下にテキストカードを重ねる構成 */
export function Hero() {
  return (
    <section className="relative bg-white">
      <div className="relative h-[62vw] max-h-[620px] min-h-[280px] w-full lg:h-[64vh] lg:min-h-[520px]">
        <Photo id="check-lower-back" fill priority sizes="100vw" quality={82} className="object-cover object-[center_30%]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/70 to-transparent" />
        <p className="absolute top-4 right-4 rounded-xl bg-white/90 px-3 py-2 text-right text-xs leading-snug text-ink-soft shadow-card sm:right-8 sm:text-sm lg:top-auto lg:bottom-4">
          {clinic.name} {director.role}
          <span className="block font-bold text-ink">
            {director.name} <span className="font-medium text-brand-700">{director.license}</span>
          </span>
        </p>
      </div>

      <div className="container-x relative -mt-14 pb-12 sm:-mt-20 sm:pb-16 lg:-mt-28">
        <div className="max-w-3xl rounded-3xl bg-white/95 p-6 shadow-soft ring-1 ring-line sm:p-10">
          <p className="label-en">Shimizu Sekkotsuin</p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-bold text-brand-700">
            足立区扇・高野駅徒歩5分｜{clinic.reservation}
          </p>
          <h1 className="mt-4 text-[1.85rem] leading-[1.35] sm:text-4xl lg:text-[2.6rem]" style={{ textWrap: "initial" }}>
            <span className="inline-block">足立区扇・高野駅の</span>
            <span className="inline-block">清水接骨院</span>
            <br />
            <span className="text-brand-700">
              <span className="inline-block">腰痛・身体の</span>
              <span className="inline-block">痛みやしびれに</span>
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-[1.9] text-ink-soft sm:text-lg">
            腰・お尻・脚の痛みやしびれなど、長く続く身体のお悩みに向き合います。柔道整復師の院長が身体全体の状態を確認し、一人ひとりに合わせたソフトな施術と、再発を防ぐためのセルフケアまでお伝えします。
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {chips.map((c) => (
              <li key={c} className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5 text-sm font-medium text-ink-soft">
                <CheckIcon size={16} className="text-brand-600" />
                {c}
              </li>
            ))}
          </ul>
          <CtaButtons className="mt-8" />
        </div>
      </div>
    </section>
  );
}
