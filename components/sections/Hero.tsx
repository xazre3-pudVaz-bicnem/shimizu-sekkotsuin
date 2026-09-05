import { Photo } from "@/components/ui/Photo";

/**
 * ヒーロー。旧腰痛LPの構成（症状タグ → 大きいキャッチ → 施術の掛け合わせ → 実績バッジ）に寄せつつ、
 * 表現と装飾は現サイトのトーンに合わせている。
 *
 * 旧LPから引き継がなかったもの
 *  ・「根本から改善！」…効果の保証・断定にあたるため使用しない
 *  ・「腰痛に特化した専門整体」…接骨院での「専門」標榜・整体表記は避ける
 *  ・「専門家も多数推薦」…実在の推薦は4名なので「多数」とは書けない
 *  ・王冠アイコン…順位を連想させ比較優良に読まれうるのでチェックアイコンにする
 *
 * SEO: H1に「腰の痛み・しびれ」と「足立区扇・高野駅の清水接骨院」を残し、
 * 症状タグで慢性腰痛・坐骨神経痛・椎間板ヘルニア・脊柱管狭窄症を自然に含める。
 *
 * 写真の出し方（hero-treatment.jpg は 2400×1653 ＝ 寄りの構図）
 *  枠の縦横比を写真と同じ 2400/1653 にしているので、どの画面幅でも切り抜きが起きず
 *  写真の全体が見える。
 *   ・スマホ／タブレット: container の左右余白を打ち消して幅いっぱいの帯にする
 *   ・PC: 右側のパネル。以前は画面全面の背景にしていたが、寄りの写真を横1920pxまで
 *     引き伸ばすと院長の顔だけが大写しになってしまうため、写真は本文と同じ幅の中に収める
 */
const tags = ["慢性腰痛", "ヘルニア", "坐骨神経痛", "脊柱管狭窄症"];

/** content/clinic.ts の director.methods のうち、来院前の方に伝わる2つ */
const methods = ["筋膜・筋肉へのソフトな手技", "骨格・骨盤のバランス調整"];

const badges = ["高野駅から徒歩5分", "国家資格の院長が毎回担当", "施術歴30年以上・10万件超"];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-brand-50/60 to-white">
      <div className="container-x pb-12 sm:pb-14 lg:py-16 xl:py-20">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-12">
          {/* 写真（LCP対象）。縦横比が写真と同じなので切り抜きは起きない */}
          <div className="relative -mx-5 aspect-[2400/1653] overflow-hidden bg-mist sm:-mx-8 lg:order-2 lg:mx-0 lg:rounded-3xl lg:shadow-soft">
            <Photo
              id="hero-treatment"
              fill
              priority
              sizes="(min-width: 1024px) 620px, 100vw"
              quality={82}
              className="object-cover"
            />
          </div>

          <div className="max-w-[620px] pt-7 sm:pt-9 lg:order-1 lg:pt-0">
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

            <h1 className="mt-2.5 text-[2rem] leading-[1.32] tracking-tight sm:text-[2.5rem] lg:text-[2.75rem] xl:text-[3rem]" style={{ textWrap: "initial" }}>
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
              スマホは枠を外して文字だけで詰め、sm 以上ではピル・カードとして見せる。
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
      </div>
    </section>
  );
}
