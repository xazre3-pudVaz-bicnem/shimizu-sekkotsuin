import { Photo } from "@/components/ui/Photo";

/**
 * ヒーロー：清水接骨院の実際の施術風景（院長が腰の状態を確認している写真）を
 * セクション全面の背景として表示し、その上にコピーを重ねる。
 *
 * コピーの狙い
 *   ・アイブロウで「整形外科や接骨院に通っても続いている方」と読み手を名指しする
 *   ・メインコピーは感情訴求（キーワード羅列にしない）
 *   ・H1内に「足立区扇・高野駅の清水接骨院」を置き、地域名・院名・駅名を自然に残す
 *   ・リード文に腰痛・坐骨神経痛・椎間板ヘルニア・脊柱管狭窄症と施術歴を入れる
 *
 * 写真の構図（1567×1045）
 *   ・左およそ1/3：無地のカーテン（テキストを載せる余白）
 *   ・院長の顔：横 37〜51% / 縦 9〜36%
 *   ・施術している手元：横 64〜82% / 縦 54〜71%
 * PCは横幅基準で拡大されるため縦位置（22%前後）で、
 * スマホは高さ基準で拡大されるため横位置（52%前後）で顔と手元が画面に残るようにしている。
 *
 * 可読性のためのオーバーレイは黒ではなく白〜薄緑。PCは左→右、スマホは上→下。
 */

/** スマホ・タブレット：写真の下半分を白へなじませ、その上に文字を置く */
const gradientMobile =
  "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.04) 20%, rgba(246,250,247,0.55) 34%, rgba(252,254,252,0.95) 46%, rgb(255,255,255) 58%)";
/** PC：左から右へ白〜薄緑を薄くして、左側で文字が完全に読めるようにする */
const gradientDesktop =
  "linear-gradient(90deg, rgba(247,251,248,0.98) 0%, rgba(248,251,249,0.96) 26%, rgba(250,253,251,0.8) 44%, rgba(255,255,255,0.28) 64%, rgba(255,255,255,0.02) 82%, rgba(255,255,255,0) 100%)";

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

      <div className="container-x flex min-h-[620px] flex-col justify-end pb-12 pt-10 sm:min-h-[640px] sm:pb-14 lg:min-h-[660px] lg:justify-center lg:pb-0 lg:pt-0 xl:min-h-[680px]">
        <div className="max-w-[580px]">
          <p className="text-[15px] font-bold leading-[1.7] text-brand-700 sm:text-[17px]">
            <span className="inline-block">整形外科や接骨院に通っても</span>
            <span className="inline-block">腰・脚のつらさが続いている方へ</span>
          </p>

          <h1 className="mt-3 text-[2.125rem] leading-[1.3] tracking-tight sm:text-[2.75rem] lg:text-[3.25rem]" style={{ textWrap: "initial" }}>
            <span className="inline-block">「もう仕方がない」と</span>
            <span className="inline-block">あきらめる前に。</span>
            <span className="mt-3 block text-[17px] font-bold leading-snug text-brand-700 sm:text-xl lg:text-[1.375rem]">
              足立区扇・高野駅の清水接骨院
            </span>
          </h1>

          <p className="mt-5 text-[16px] leading-[1.8] text-ink-soft sm:text-[18px]">
            腰痛・坐骨神経痛・椎間板ヘルニア・脊柱管狭窄症など。施術歴30年以上の柔道整復師が、痛む場所だけでなく身体全体の状態を確認します。
          </p>
        </div>
      </div>
    </section>
  );
}
