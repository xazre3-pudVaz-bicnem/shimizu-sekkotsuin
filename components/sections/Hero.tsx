import { clinic } from "@/content/clinic";
import { Photo } from "@/components/ui/Photo";
import { LineIcon, PhoneIcon } from "@/components/ui/Icons";

/**
 * ヒーロー：清水接骨院の実際の施術風景（院長が腰の状態を確認している写真）を
 * セクション全面の背景として表示し、その上にテキストとCTAを重ねる。
 *
 * 写真の構図（1567×1045）
 *   ・左およそ1/3：無地のカーテン（テキストを載せる余白）
 *   ・院長の顔：横 37〜51% / 縦 9〜36%
 *   ・施術している手元：横 64〜82% / 縦 54〜71%
 *   ・患者さん：横 72〜100%
 * PCは横幅基準で拡大されるため縦位置（22%前後）で顔と手元が入るように調整し、
 * スマホは高さ基準で拡大されるため横位置（55%前後）で顔と手元が画面に残るようにしている。
 *
 * 可読性のためのオーバーレイは黒ではなく白。PCは左→右、スマホは上→下に白くする。
 */
const badges = ["柔道整復師（国家資格）", "完全予約制", "高野駅 徒歩5分"];

/** スマホ・タブレット：写真の帯の下端だけを白へなじませる（写真は極力そのまま見せる） */
const gradientMobile =
  "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 52%, rgba(255,255,255,0.72) 84%, rgb(255,255,255) 100%)";
/** PC：左から右へ白を薄くして、左側で文字が完全に読めるようにする */
const gradientDesktop =
  "linear-gradient(90deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.95) 26%, rgba(255,255,255,0.78) 44%, rgba(255,255,255,0.28) 64%, rgba(255,255,255,0.02) 82%, rgba(255,255,255,0) 100%)";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/*
        背景写真（LCP対象）
        PC（lg以上）はセクション全面。スマホ・タブレットは画面幅が狭く、
        全面にすると文字の背後に院長の顔が来てしまうため、上部の帯として見せる。
      */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[150px] sm:h-[280px] lg:inset-0 lg:h-auto">
        <Photo
          id="check-lower-back"
          fill
          priority
          sizes="100vw"
          quality={82}
          className="object-cover object-[52%_18%] lg:object-[50%_22%]"
        />
        <div aria-hidden="true" className="absolute inset-0 lg:hidden" style={{ background: gradientMobile }} />
        <div aria-hidden="true" className="absolute inset-0 hidden lg:block" style={{ background: gradientDesktop }} />
      </div>

      <div className="container-x flex min-h-[620px] flex-col justify-start pt-[120px] pb-10 sm:min-h-[640px] sm:pt-[248px] sm:pb-14 lg:min-h-[640px] lg:justify-center lg:pt-14 xl:min-h-[680px]">
        <div className="max-w-[560px]">
          <p className="inline-flex items-center rounded-full border border-brand-200 bg-white/90 px-3.5 py-1.5 text-[13px] font-bold text-brand-700 shadow-card sm:text-sm">
            足立区扇｜高野駅 徒歩5分・扇大橋駅 徒歩6分
          </p>

          <h1 className="mt-4 text-[2rem] leading-[1.34] tracking-tight sm:text-[2.5rem] lg:text-[3rem]" style={{ textWrap: "initial" }}>
            <span className="inline-block">足立区扇・高野駅の</span>
            <span className="inline-block">清水接骨院</span>
            <br />
            <span className="text-brand-700">
              <span className="inline-block">長引く腰・脚の痛みや</span>
              <span className="inline-block">しびれに</span>
            </span>
          </h1>

          <p className="mt-5 text-[17px] leading-[1.8] text-ink-soft sm:text-[19px]">
            腰痛・坐骨神経痛・椎間板ヘルニア・脊柱管狭窄症など。身体全体の状態を確認し、一人ひとりに合わせて施術を行います。
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={clinic.line.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-line min-h-[54px] w-full px-7 text-[17px] shadow-card sm:w-auto"
            >
              <LineIcon size={22} /> LINEで予約・相談
            </a>
            <a href={clinic.telHref} className="btn btn-outline min-h-[54px] w-full px-6 text-[17px] shadow-card sm:w-auto">
              <PhoneIcon size={20} /> 電話で予約する
            </a>
          </div>

          <ul className="mt-5 flex flex-wrap gap-2">
            {badges.map((b) => (
              <li
                key={b}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-[13px] font-bold text-ink-soft ring-1 ring-line sm:text-sm"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0 text-brand-600">
                  <path d="m5 12 5 5L20 7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
