import Link from "next/link";
import { differentiators } from "@/content/differentiators";
import { Photo } from "@/components/ui/Photo";
import { ArrowIcon, CheckIcon } from "@/components/ui/Icons";

/**
 * 「なぜ、他で変わらなかった方が清水接骨院を訪れるのか」。
 * 4POINTを、実際の院内写真とセットで交互レイアウトで見せる。
 * 他院・医療機関を下げる表現は置かない（当院の方針だけを述べる）。
 */
export function Differentiators() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold tracking-wide text-brand-700">清水接骨院の方針</p>
          <h2 className="mt-3 text-[1.75rem] leading-[1.4] text-ink sm:text-[2.125rem]">
            {/* スマホで語の途中から折り返さないよう、短い塊に分けている */}
            <span className="inline-block">なぜ、他で</span>
            <span className="inline-block">変わらなかった方が</span>
            <span className="inline-block">清水接骨院を訪れるのか</span>
          </h2>
        </div>

        <div className="mt-12 space-y-8 lg:space-y-14">
          {differentiators.map((d, i) => (
            <article
              key={d.no}
              className="grid items-center gap-6 lg:grid-cols-2 lg:gap-14"
            >
              {/* スマホは写真4枚で縦に伸びるため16:9。PCは横並びなので4:3のまま */}
              <div className={`relative aspect-[16/9] overflow-hidden rounded-3xl bg-mist shadow-soft lg:aspect-[4/3] ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <Photo id={d.image} fill sizes="(min-width: 1024px) 46vw, 100vw" />
              </div>

              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <p className="font-latin text-sm font-extrabold tracking-[0.2em] text-brand-600">POINT {d.no}</p>
                <h3 className="mt-2 text-xl font-bold leading-snug text-ink sm:text-2xl">{d.title}</h3>
                <p className="mt-3 text-base leading-[1.85] text-ink-soft sm:text-[17px]">{d.lead}</p>
                <ul className="mt-5 space-y-2">
                  {d.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-soft sm:text-base">
                      <CheckIcon size={18} className="mt-1 shrink-0 text-brand-600" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/treatment" className="btn btn-outline min-h-[52px] px-7 text-[17px]">
            施術の内容を詳しく見る <ArrowIcon size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
