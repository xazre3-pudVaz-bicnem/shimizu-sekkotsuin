import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon, CheckIcon } from "@/components/ui/Icons";

const points = [
  "足立区扇で地域の方の身体と向き合ってきた接骨院",
  "国家資格「柔道整復師」を持つ院長が施術",
  "施術歴30年以上・累計10万件を超える施術経験",
  "カウンセリングから施術・アフターフォローまで院長が担当",
  "完全予約制で、待ち時間の負担が少ない",
  "痛い場所だけでなく、身体全体の状態を確認",
  "一人ひとりの状態に合わせた施術内容",
  "強く押したり無理に鳴らしたりしないソフトな手技",
  "生活習慣やセルフケアまでアドバイス",
];

export function AboutClinic() {
  return (
    <section className="section">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <SectionHeading title="清水接骨院について" />
          <p className="mt-6 text-base leading-[1.9] text-ink-soft sm:text-lg">
            清水接骨院は、東京都足立区扇にある接骨院です。日暮里・舎人ライナー「高野駅」から徒歩5分、「扇大橋駅」から徒歩6分。腰痛や坐骨神経痛、脚のしびれなど、長く続く身体の悩みを抱えた方が多く来院されています。
          </p>
          <p className="mt-4 text-base leading-[1.9] text-ink-soft sm:text-lg">
            「腰が痛いから腰だけをもむ」のではなく、姿勢や動き、筋肉の緊張、関節の動きを全身で確認し、痛みに関係していると考えられる部分に働きかけます。施術後は、ご自宅でできるセルフケアや生活習慣の工夫もお伝えします。
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex gap-2 text-[15px] text-ink-soft">
                <CheckIcon size={18} className="mt-1 shrink-0 text-brand-600" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <Link href="/about" className="btn btn-outline mt-8">
            清水接骨院について詳しく <ArrowIcon size={18} />
          </Link>
        </div>
        <div className="order-1 grid grid-cols-2 gap-3 lg:order-2">
          <div className="relative col-span-2 aspect-[3/2] overflow-hidden rounded-3xl shadow-soft">
            <Photo id="explanation-spine-1" fill sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Photo id="clinic-exterior" fill sizes="(min-width: 1024px) 22vw, 50vw" />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Photo id="treatment-neck" fill sizes="(min-width: 1024px) 22vw, 50vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
