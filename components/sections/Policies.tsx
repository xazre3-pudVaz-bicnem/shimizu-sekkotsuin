import Link from "next/link";
import { roleRows, ROLE_NOTE } from "@/content/policies";
import { ArrowIcon } from "@/components/ui/Icons";

/**
 * 「医療機関と接骨院は、役割が違います」。
 *
 * 旧LPの「当院／病院／整骨院」比較表は比較優良表現にあたるため復活させていない。
 * ここでは優劣ではなく役割の違いとして説明し、必要な場合は受診を勧める姿勢を明示する。
 * 当院の方針そのものは Differentiators（4POINT）で扱うので、ここで繰り返さない。
 */
export function Policies() {
  return (
    <section className="section bg-mist">
      <div className="container-x">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-[1.75rem] leading-[1.4] text-ink sm:text-[2.125rem]">
              <span className="inline-block">医療機関と接骨院は、</span>
              <span className="inline-block">役割が違います</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-[1.85] text-ink-soft sm:text-[17px]">
              どちらが優れているという話ではありません。できることが違うので、必要に応じて使い分けていただくのが一番だと考えています。
            </p>
          </div>

          {/* PC：表。スマホ：横スクロールさせると右列（当院）を見落とすため、行ごとのカードに切り替える */}
          <div className="mt-10 hidden md:block">
            <table className="w-full border-collapse overflow-hidden rounded-2xl bg-white text-left shadow-card">
              <thead>
                <tr className="bg-brand-50">
                  <th scope="col" className="w-[26%] p-4 text-sm font-bold text-muted">
                    <span className="sr-only">項目</span>
                  </th>
                  <th scope="col" className="w-[37%] p-4 text-base font-bold text-ink">
                    医療機関（整形外科など）
                  </th>
                  <th scope="col" className="w-[37%] p-4 text-base font-bold text-brand-800">
                    清水接骨院
                  </th>
                </tr>
              </thead>
              <tbody>
                {roleRows.map((r) => (
                  <tr key={r.scene} className="border-t border-line align-top">
                    <th scope="row" className="p-4 text-[15px] font-bold text-brand-800">
                      {r.scene}
                    </th>
                    <td className="p-4 text-[15px] leading-[1.8] text-ink-soft">{r.medical}</td>
                    <td className="bg-brand-50/40 p-4 text-[15px] leading-[1.8] text-ink-soft">{r.clinic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-8 space-y-3 md:hidden">
            {roleRows.map((r) => (
              <li key={r.scene} className="overflow-hidden rounded-2xl bg-white shadow-card">
                <p className="bg-brand-50 px-4 py-2.5 text-[14px] font-bold text-brand-800">{r.scene}</p>
                <dl className="divide-y divide-line">
                  <div className="px-4 py-3.5">
                    <dt className="text-[13px] font-bold text-muted">医療機関（整形外科など）</dt>
                    <dd className="mt-1 text-[14px] leading-[1.8] text-ink-soft">{r.medical}</dd>
                  </div>
                  <div className="bg-brand-50/40 px-4 py-3.5">
                    <dt className="text-[13px] font-bold text-brand-800">清水接骨院</dt>
                    <dd className="mt-1 text-[14px] leading-[1.8] text-ink-soft">{r.clinic}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>

          <p className="mt-5 rounded-2xl border border-line bg-white p-5 text-[14px] leading-[1.85] text-muted sm:text-[15px]">
            {ROLE_NOTE}
          </p>

          <div className="mt-8 text-center">
            <Link href="/about" className="btn btn-outline">
              清水接骨院について詳しく <ArrowIcon size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
