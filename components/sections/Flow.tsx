import Link from "next/link";
import { flow } from "@/content/flow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { ArrowIcon } from "@/components/ui/Icons";

/**
 * compact: トップページ用。各ステップの説明を2行までにし、補足は省く。
 * 全文は /first・/treatment で読んでもらう（文章はHTMLに残るのでSEOには影響しない）。
 */
export function Flow({ withHeading = true, compact = false }: { withHeading?: boolean; compact?: boolean }) {
  return (
    <section className="section">
      <div className="container-x">
        {withHeading && <SectionHeading title="初回施術の流れ" lead="ご予約から施術後の説明まで、初回の流れです。" />}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <ol className={compact ? "space-y-2.5" : "space-y-4"}>
            {flow.map((f) => (
              <li
                key={f.step}
                className={`flex items-center gap-4 rounded-2xl border border-line bg-white shadow-card ${compact ? "p-4" : "items-start p-5"}`}
              >
                <span
                  className={`flex shrink-0 flex-col items-center justify-center rounded-xl bg-brand-600 text-white ${compact ? "h-10 w-10" : "h-12 w-12"}`}
                >
                  <span className="font-latin text-[10px] font-bold leading-none tracking-wider">STEP</span>
                  <span className={`font-latin font-extrabold leading-none ${compact ? "text-base" : "text-xl"}`}>{f.step}</span>
                </span>
                <div>
                  <h3 className={`font-bold text-ink ${compact ? "text-[17px] leading-snug" : "text-lg"}`}>{f.title}</h3>
                  {!compact && (
                    <>
                      <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{f.text}</p>
                      {f.note && <p className="mt-1 text-sm text-muted">{f.note}</p>}
                    </>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <div className="space-y-4">
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-soft">
              <Photo id="counseling-1" fill sizes="(min-width: 1024px) 38vw, 100vw" />
            </div>
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-soft">
              <Photo id="check-shoulder" fill sizes="(min-width: 1024px) 38vw, 100vw" />
            </div>
            {withHeading && (
              <Link href="/first" className="btn btn-outline w-full">
                初めての方へ <ArrowIcon size={18} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
