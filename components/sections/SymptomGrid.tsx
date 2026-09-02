import Link from "next/link";
import { featuredSymptomSlugs, getSymptom, secondarySymptomSlugs, symptoms } from "@/content/symptoms";
import { SymptomCard } from "@/components/content/SymptomCard";
import { ArrowIcon } from "@/components/ui/Icons";

/**
 * トップページでは特に多い8症状のみカードで表示し、そのほかはテキストリンクと
 * 一覧ページへ送る（症状ページ自体は削除せず、内部リンクも維持する）。
 */
export function SymptomGrid() {
  const featured = featuredSymptomSlugs.map((s) => getSymptom(s)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const secondary = secondarySymptomSlugs.map((s) => getSymptom(s)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  return (
    <section id="symptoms" className="section bg-white">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold tracking-wide text-brand-700">症状から探す</p>
          <h2 className="mt-3 text-[1.75rem] leading-[1.4] text-ink sm:text-[2.125rem]">
            <span className="inline-block">腰痛・坐骨神経痛など、</span>
            <span className="inline-block">特に多い症状</span>
          </h2>
          <p className="mt-4 text-base leading-[1.8] text-ink-soft sm:text-[17px]">
            症状ごとに、考えられる原因・当院の施術・医療機関を受診すべき目安をまとめています。
          </p>
        </div>

        {/* スマホでも2列。8枚を1列で積むと縦に長くなりすぎるため */}
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {featured.map((s) => (
            <li key={s.slug}>
              <SymptomCard symptom={s} />
            </li>
          ))}
        </ul>

        <p className="mt-8 flex flex-wrap justify-center gap-x-1 gap-y-1 text-sm text-muted">
          {secondary.map((s) => (
            <Link
              key={s.slug}
              href={`/symptoms/${s.slug}`}
              className="inline-flex min-h-11 items-center rounded-full px-3 text-brand-700 underline decoration-brand-300 underline-offset-4 hover:bg-brand-50 hover:decoration-brand-600"
            >
              {s.name}
            </Link>
          ))}
        </p>

        <div className="mt-6 text-center">
          <Link href="/symptoms" className="btn btn-outline min-h-[52px] px-7 text-[17px]">
            すべての症状を見る（全{symptoms.length}症状） <ArrowIcon size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
