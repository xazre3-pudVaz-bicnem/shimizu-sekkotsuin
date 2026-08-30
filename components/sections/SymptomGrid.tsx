import Link from "next/link";
import { symptoms } from "@/content/symptoms";
import { symptomCategories } from "@/content/types";
import { SymptomCard } from "@/components/content/SymptomCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/Icons";

export function SymptomGrid() {
  return (
    <section id="symptoms" className="section bg-cream">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading en="Symptoms" title="症状から探す" lead="気になる症状を選ぶと、原因の考え方・当院の施術・受診の目安をまとめた専用ページに移動します。" />
          <Link href="/symptoms" className="btn btn-outline">
            症状一覧を見る <ArrowIcon size={18} />
          </Link>
        </div>
        <div className="mt-10 space-y-10">
          {symptomCategories.map((cat) => {
            const list = symptoms.filter((s) => s.category === cat.id);
            if (!list.length) return null;
            return (
              <div key={cat.id}>
                <h3 className="flex items-center gap-3 text-lg font-bold text-ink">
                  <span className="h-6 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                  {cat.name}
                </h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {list.map((s) => (
                    <li key={s.slug} className="reveal">
                      <SymptomCard symptom={s} compact />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
