import { Photo } from "@/components/ui/Photo";

/**
 * ヒーロー：清水接骨院の実際の施術風景（院長が腰の状態を確認している写真）を
 * セクション全面の背景として表示し、その上に見出しとリード文だけを重ねる。
 *
 * 写真の構図（1567×1045）
 *   ・左およそ1/3：無地のカーテン（テキストを載せる余白）
 *   ・院長の顔：横 37〜51% / 縦 9〜36%
 *   ・施術している手元：横 64〜82% / 縦 54〜71%
 *   ・患者さん：横 72〜100%
 * PCは横幅基準で拡大されるため縦位置（22%前後）で顔と手元が入るように調整し、
 * スマホは高さ基準で拡大されるため横位置（52%前後）で顔と手元が画面に残るようにしている。
 *
 * 可読性のためのオーバーレイは黒ではなく白。PCは左→右、スマホは上→下に白くする。
 */

/** スマホ・タブレット：写真の下半分を白へなじませ、その上に文字を置く */
const gradientMobile =
  "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.04) 26%, rgba(255,255,255,0.58) 41%, rgba(255,255,255,0.95) 53%, rgb(255,255,255) 65%)";
/** PC：左から右へ白を薄くして、左側で文字が完全に読めるようにする */
const gradientDesktop =
  "linear-gradient(90deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.95) 26%, rgba(255,255,255,0.78) 44%, rgba(255,255,255,0.28) 64%, rgba(255,255,255,0.02) 82%, rgba(255,255,255,0) 100%)";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* 背景写真（LCP対象） */}
      <div className="absolute inset-0 -z-10">
        <Photo
          id="check-lower-back"
          fill
          priority
          sizes="100vw"
          quality={82}
          className="object-cover object-[52%_center] lg:object-[50%_22%]"
        />
        <div aria-hidden="true" className="absolute inset-0 lg:hidden" style={{ background: gradientMobile }} />
        <div aria-hidden="true" className="absolute inset-0 hidden lg:block" style={{ background: gradientDesktop }} />
      </div>

      <div className="container-x flex min-h-[600px] flex-col justify-end pb-12 pt-10 sm:min-h-[620px] sm:pb-14 lg:min-h-[640px] lg:justify-center lg:pb-0 lg:pt-0 xl:min-h-[680px]">
        <div className="max-w-[560px]">
          <h1 className="text-[2rem] leading-[1.34] tracking-tight sm:text-[2.5rem] lg:text-[3rem]" style={{ textWrap: "initial" }}>
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
        </div>
      </div>
    </section>
  );
}
