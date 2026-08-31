import { clinic } from "@/content/clinic";
import { Photo } from "@/components/ui/Photo";
import { LineIcon, PhoneIcon } from "@/components/ui/Icons";

/**
 * ヒーロー。
 * ファーストビューでは「どこの・何の院か」「相談できる症状」「予約方法」だけを見せ、
 * 実績や営業時間の詳細は直下の信頼バー／各セクションへ送る。
 * スマホでは 文章 → CTA → 写真 の順（写真だけが最初に表示される状態を避ける）。
 */
const badges = ["柔道整復師（国家資格）", "完全予約制", "高野駅 徒歩5分"];

export function Hero() {
  return (
    <section className="border-b border-line bg-white">
      <div className="container-x grid items-center gap-8 py-8 sm:py-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12 lg:py-16">
        <div>
          <p className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-[13px] font-bold text-brand-700 sm:text-sm">
            足立区扇｜高野駅 徒歩5分・扇大橋駅 徒歩6分
          </p>

          <h1 className="mt-4 text-[1.95rem] leading-[1.34] tracking-tight sm:text-[2.35rem] lg:text-[2.35rem] xl:text-[2.75rem]" style={{ textWrap: "initial" }}>
            <span className="inline-block">足立区扇・高野駅の</span>
            <span className="inline-block">清水接骨院</span>
            <br />
            <span className="text-brand-700">
              <span className="inline-block">長引く腰・脚の</span>
              <span className="inline-block">痛みやしびれに</span>
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-[17px] leading-[1.8] text-ink-soft sm:text-[19px]">
            腰痛・坐骨神経痛・椎間板ヘルニア・脊柱管狭窄症など。身体全体の状態を確認し、一人ひとりに合わせて施術を行います。
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={clinic.line.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-line min-h-[52px] w-full px-7 text-[17px] sm:w-auto"
            >
              <LineIcon size={22} /> LINEで予約・相談
            </a>
            <a href={clinic.telHref} className="btn btn-outline min-h-[52px] w-full px-6 text-[17px] sm:w-auto">
              <PhoneIcon size={20} /> 電話で予約する
            </a>
          </div>

          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
            {badges.map((b) => (
              <li key={b} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft">
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0 text-brand-600">
                  <path d="m5 12 5 5L20 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-mist shadow-soft">
          <div className="relative aspect-[4/3] w-full">
            <Photo id="check-lower-back" fill priority sizes="(min-width: 1024px) 48vw, 100vw" quality={80} className="object-cover object-[center_35%]" />
          </div>
        </div>
      </div>
    </section>
  );
}
