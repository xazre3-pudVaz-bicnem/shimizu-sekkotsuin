import Link from "next/link";
import { featuredSymptomSlugs, getSymptom, symptoms } from "@/content/symptoms";
import { SymptomCard } from "@/components/content/SymptomCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/Icons";

/**
 * トップページでは主要8症状のみを表示し、残りは症状一覧ページへ送る。
 * （症状ページ自体は削除せず、フッターと /symptoms から全ページに到達できる）
 */
export function SymptomGrid() {
  const featured = featuredSymptomSlugs.map((s) => getSymptom(s)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  return (
    <section id="symptoms" className="section bg-cream">
      <div className="container-x">
        <SectionHeading
          kicker="症状から探す"
          title="主なご相談内容"
          lead="気になる症状を選ぶと、原因の考え方・当院の施術・医療機関を受診すべき目安をまとめた専用ページに移動します。"
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((s) => (
            <li key={s.slug}>
              <SymptomCard symptom={s} />
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <Link href="/symptoms" className="btn btn-outline min-h-[52px] px-7 text-[17px]">
            すべての症状を見る（全{symptoms.length}症状） <ArrowIcon size={18} />
          </Link>
          <p className="mt-3 text-sm text-muted">
            股関節痛・変形性膝関節症・半月板損傷・四十肩五十肩・ストレートネック・頭痛・産後の腰痛・スポーツによる痛みなども掲載しています。
          </p>
        </div>
      </div>
    </section>
  );
}
