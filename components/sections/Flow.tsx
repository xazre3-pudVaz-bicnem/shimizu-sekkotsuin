import Link from "next/link";
import { flow } from "@/content/flow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { ArrowIcon } from "@/components/ui/Icons";

export function Flow({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section className="section">
      <div className="container-x">
        {withHeading && (
          <SectionHeading en="Flow" title="初回施術の流れ" lead="初めての方が安心して来院できるよう、初回の流れをご案内します。カウンセリングから施術後の説明まで、すべて院長が担当します。" />
        )}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <ol className="space-y-4">
            {flow.map((f) => (
              <li key={f.step} className="reveal flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-card">
                <span className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-600 text-white">
                  <span className="font-latin text-[10px] font-bold leading-none tracking-wider">STEP</span>
                  <span className="font-latin text-xl font-extrabold leading-none">{f.step}</span>
                </span>
                <div>
                  <h3 className="text-lg font-bold text-ink">{f.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{f.text}</p>
                  {f.note && <p className="mt-1 text-sm text-muted">{f.note}</p>}
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
