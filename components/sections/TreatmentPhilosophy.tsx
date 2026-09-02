import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { ArrowIcon } from "@/components/ui/Icons";

/**
 * 施術の考え方。トップページでは要点だけを短く示し、
 * 詳しい説明は /treatment・/about・症状ページへ内部リンクで送る。
 * （長文はトップに置かず、クラスタ側のページに集約する方針）
 */
const points = [
  { title: "腰だけを見ない", text: "腰の負担の背景に、股関節・背中・足元の使い方や長年の姿勢の癖が重なっていることがあります。" },
  { title: "強く押さない", text: "筋膜・筋肉・骨格のバランスにやさしく働きかける手技です。無理に身体を鳴らすことはしません。" },
  { title: "その日の状態に合わせる", text: "決まった手順を当てはめるのではなく、来院時の姿勢や動きを確認してから内容を組み立てます。" },
];

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
              腰痛・坐骨神経痛・椎間板ヘルニア・脊柱管狭窄症など、腰まわりの症状を中心に施術を行ってきました。身体全体の状態を確認し、負担の元になっている部分にも働きかけます。
            </p>

            <ul className="mt-7 space-y-4">
              {points.map((p) => (
                <li key={p.title} className="border-l-2 border-brand-500 pl-4">
                  <p className="text-[17px] font-bold text-white">{p.title}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-brand-100">{p.text}</p>
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
