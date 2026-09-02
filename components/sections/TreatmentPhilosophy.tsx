import Link from "next/link";
import { director } from "@/content/clinic";
import { Photo } from "@/components/ui/Photo";
import { ArrowIcon } from "@/components/ui/Icons";

/**
 * 施術の考え方。
 *
 * 重複対策: 「腰だけを見ない」「強く押さない」「院長が担当」は
 * TrustBar と Differentiators（4POINT）で既に述べているため、ここでは繰り返さない。
 * このセクションでしか出てこない情報＝実際に取り入れている手技の考え方
 * （content/clinic.ts の director.methods）を置き、詳細は /treatment へ送る。
 */
export function TreatmentPhilosophy() {
  return (
    <section className="section bg-brand-900 text-white">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <p className="text-sm font-bold tracking-wide text-brand-200">施術の考え方</p>
            <h2 className="mt-3 text-[1.75rem] leading-[1.4] text-white sm:text-[2.125rem]">
              <span className="inline-block">痛みの出ている場所は、</span>
              <span className="inline-block">結果かもしれません</span>
            </h2>
            <p className="mt-5 text-base leading-[1.85] text-brand-100 sm:text-[17px]">
              腰痛・坐骨神経痛・椎間板ヘルニア・脊柱管狭窄症など、腰まわりの症状を中心に施術を行ってきました。その日の姿勢や動きを確認してから、負担の元になっている部分に働きかけます。
            </p>

            <p className="mt-8 text-sm font-bold text-brand-200">取り入れている考え方</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {director.methods.map((m) => (
                <li key={m} className="rounded-full border border-brand-700 bg-brand-800/70 px-3.5 py-2 text-[14px] font-medium text-brand-50">
                  {m}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/treatment" className="btn bg-white text-brand-800 hover:bg-brand-50">
                施術内容を見る <ArrowIcon size={18} />
              </Link>
              <Link href="/symptoms/lower-back-pain" className="btn border border-brand-500 text-white hover:bg-brand-800">
                腰痛のページを見る <ArrowIcon size={18} />
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-soft">
              <Photo id="explanation-spine-2" fill sizes="(min-width: 1024px) 42vw, 100vw" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Photo id="treatment-neck" fill sizes="(min-width: 1024px) 21vw, 45vw" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Photo id="clinic-exterior" fill sizes="(min-width: 1024px) 21vw, 45vw" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
