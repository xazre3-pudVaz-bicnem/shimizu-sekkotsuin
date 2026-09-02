import { Photo } from "@/components/ui/Photo";

/**
 * ヒーロー。旧腰痛LPの構成（症状タグ → 大きいキャッチ → 施術の掛け合わせ → 実績バッジ）に寄せつつ、
 * 表現と装飾は現サイトのトーンに合わせている。
 *
 * 旧LPから引き継がなかったもの
 *  ・「根本から改善！」…効果の保証・断定にあたるため使用しない
 *  ・「腰痛に特化した専門整体」…接骨院での「専門」標榜・整体表記は避ける
 *  ・「専門家も多数推薦」…実在の推薦は3名なので「多数」とは書けない
 *  ・王冠アイコン…順位を連想させ比較優良に読まれうるのでチェックアイコンにする
 *
 * SEO: H1に「腰の痛み・しびれ」と「足立区扇・高野駅の清水接骨院」を残し、
 * 症状タグで慢性腰痛・坐骨神経痛・椎間板ヘルニア・脊柱管狭窄症を自然に含める。
 *
 * 写真の構図（1567×1045）
 *   ・左およそ1/3：無地のカーテン（テキストを載せる余白）
 *   ・院長の顔：横 37〜51% / 縦 9〜36%　・施術している手元：横 64〜82% / 縦 54〜71%
 * PCは横幅基準で拡大されるため縦位置（22%前後）で、
 * スマホは高さ基準で拡大されるため横位置（52%前後）で顔と手元が画面に残るようにしている。
 */
/** 旧LPと同じ4症状。「椎間板ヘルニア」は横幅の都合で短縮（正式名は症状ページ・症状カードに掲載） */
const tags = ["慢性腰痛", "ヘルニア", "坐骨神経痛", "脊柱管狭窄症"];

/** content/clinic.ts の director.methods のうち、来院前の方に伝わる2つ */
const methods = ["筋膜・筋肉へのソフトな手技", "骨格・骨盤のバランス調整"];

const badges = ["高野駅から徒歩5分", "国家資格の院長が毎回担当", "施術歴30年以上・10万件超"];

/** スマホ・タブレット：写真の下半分を白へなじませ、その上に文字を置く */
const gradientMobile =
  "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.04) 16%, rgba(246,250,247,0.6) 28%, rgba(252,254,252,0.96) 40%, rgb(255,255,255) 52%)";
/** PC：左から右へ白〜薄緑を薄くして、左側で文字が完全に読めるようにする */
const gradientDesktop =
  "linear-gradient(90deg, rgba(246,251,248,0.99) 0%, rgba(247,251,249,0.98) 30%, rgba(250,253,251,0.86) 48%, rgba(255,255,255,0.34) 66%, rgba(255,255,255,0.03) 84%, rgba(255,255,255,0) 100%)";

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

      <div className="container-x flex min-h-[700px] flex-col justify-end pb-10 pt-10 sm:min-h-[700px] sm:pb-14 lg:min-h-[700px] lg:justify-center lg:pb-0 lg:pt-0 xl:min-h-[720px]">
        <div className="max-w-[620px]">
          {/* 症状タグ */}
          <ul className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <li
                key={t}
                className="rounded-md bg-brand-600 px-2.5 py-1 text-[13px] font-bold tracking-wide text-white shadow-card sm:text-sm"
              >
                {t}
              </li>
            ))}
          </ul>

          <p className="mt-4 text-[15px] font-bold leading-[1.7] text-brand-700 sm:text-[17px]">
            <span className="inline-block">整形外科や接骨院に通っても</span>
            <span className="inline-block">つらさが続いている方へ</span>
          </p>

          <h1 className="mt-2.5 text-[2rem] leading-[1.32] tracking-tight sm:text-[2.5rem] lg:text-[3rem]" style={{ textWrap: "initial" }}>
            <span className="inline-block">歩くのもつらい</span>
            <span className="mx-[-0.1em] inline-block rounded bg-brand-100/80 px-[0.1em] text-brand-700">腰の痛み・しびれ</span>
            <br />
            <span className="inline-block">「もう仕方がない」と</span>
            <span className="inline-block">あきらめる前に。</span>
            <span className="mt-3 block text-[16px] font-bold leading-snug text-ink-soft sm:text-lg lg:text-xl">
              足立区扇・高野駅の清水接骨院
            </span>
          </h1>

          {/*
            施術の掛け合わせと実績バッジ。
            スマホは院長の顔を隠さないよう、枠を外して文字だけで詰めて表示する。
            sm 以上ではピル・カードとして見せる。
          */}
          <p className="mt-4 text-[14px] font-bold leading-[1.9] text-ink-soft sm:mt-5 sm:text-[15px] sm:leading-normal">
            {methods.map((m, i) => (
              <span key={m} className="whitespace-nowrap">
                {i > 0 && (
                  <span aria-hidden="true" className="mx-1.5 font-latin text-[15px] font-extrabold text-brand-500 sm:mx-2.5 sm:text-lg">
                    ×
                  </span>
                )}
                <span className="sm:inline-block sm:rounded-full sm:border sm:border-brand-200 sm:bg-white/90 sm:px-3 sm:py-1.5">{m}</span>
              </span>
            ))}
          </p>

          <ul className="mt-3.5 flex flex-wrap gap-x-3 gap-y-1 sm:mt-5 sm:gap-2">
            {badges.map((b) => (
              <li
                key={b}
                className="inline-flex items-center gap-1.5 text-[13px] font-bold text-brand-800 sm:rounded-lg sm:bg-white/95 sm:px-3 sm:py-2 sm:text-sm sm:shadow-card sm:ring-1 sm:ring-brand-200"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0 text-brand-600">
                  <path d="m5 12 5 5L20 7" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
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
