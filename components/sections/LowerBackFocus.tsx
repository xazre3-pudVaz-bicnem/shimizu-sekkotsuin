import Link from "next/link";
import { getSymptom, lowerBackFocusSlugs } from "@/content/symptoms";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/Icons";

export function LowerBackFocus() {
  const list = lowerBackFocusSlugs.map((s) => getSymptom(s)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  return (
    <section className="section bg-brand-900 text-white">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHeading
              en="Lower Back"
              title="腰痛・坐骨神経痛など、腰まわりの症状に力を入れています"
              light
              lead="慢性的な腰痛、お尻から脚への痛みやしびれ、椎間板ヘルニアや脊柱管狭窄症と言われた方、急なぎっくり腰。清水接骨院では、腰まわりの症状を中心に施術を行ってきました。"
            />
            <p className="mt-5 text-base leading-[1.9] text-brand-100 sm:text-lg">
              腰の痛みは、腰だけが原因とは限りません。股関節や背中、足元の使い方、長年の姿勢の癖が重なって腰に負担が集まっていることが少なくありません。当院では身体全体の状態を確認し、負担の元になっている部分にも働きかけます。
            </p>
            <Link href="/symptoms/lower-back-pain" className="btn mt-7 bg-white text-brand-800 hover:bg-brand-50">
              腰痛のページを見る <ArrowIcon size={18} />
            </Link>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-soft">
            <Photo id="explanation-spine-2" fill sizes="(min-width: 1024px) 42vw, 100vw" />
          </div>
        </div>
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <li key={s.slug} className="reveal">
              <Link
                href={`/symptoms/${s.slug}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-brand-700 bg-brand-800/70 p-5 transition-colors hover:bg-brand-700"
              >
                <div>
                  <p className="text-lg font-bold text-white">{s.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-100">{s.short}</p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-200">
                  詳しく見る <ArrowIcon size={16} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
