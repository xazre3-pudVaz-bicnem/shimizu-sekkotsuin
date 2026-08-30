import { reasons } from "@/content/reasons";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Reasons({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <ul className="grid gap-3 sm:grid-cols-2">
        {reasons.map((r) => (
          <li key={r.no} className="flex gap-3 rounded-2xl border border-line bg-white p-4">
            <span className="font-latin text-sm font-extrabold tracking-wider text-brand-600">{r.no}</span>
            <div>
              <p className="font-bold text-ink">{r.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{r.text}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <section className="section bg-cream">
      <div className="container-x">
        <SectionHeading en="Reasons" title="清水接骨院が選ばれる7つの理由" align="center" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <li key={r.no} className="card reveal p-6">
              <p className="font-latin text-sm font-extrabold tracking-[0.2em] text-brand-600">POINT {r.no}</p>
              <h3 className="mt-2 text-lg font-bold text-ink">{r.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{r.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
