import { clinic } from "@/content/clinic";

/** NAP（院名・住所・電話）と営業情報。表記はすべて content/clinic.ts から取得。 */
export function ClinicInfo({ className }: { className?: string }) {
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "院名", value: clinic.name },
    {
      label: "住所",
      value: (
        <>
          〒{clinic.address.postalCode} {clinic.address.full}
        </>
      ),
    },
    {
      label: "電話番号",
      value: (
        <a href={clinic.telHref} className="tel-link inline-flex min-h-11 items-center text-lg text-brand-700 underline-offset-4 hover:underline">
          {clinic.tel}
        </a>
      ),
    },
    {
      label: "営業時間",
      value: (
        <ul className="space-y-0.5">
          {clinic.hours.map((h) => (
            <li key={h.days}>
              {h.days} {h.time}
            </li>
          ))}
        </ul>
      ),
    },
    { label: "定休日", value: clinic.closed },
    { label: "予約", value: `${clinic.reservation}（${clinic.staffNote}）` },
    {
      label: "アクセス",
      value: (
        <ul className="space-y-0.5">
          {clinic.access.stations.map((s) => (
            <li key={s.station}>
              {s.line}「{s.station}」{s.walk}
            </li>
          ))}
        </ul>
      ),
    },
    { label: "駐車場", value: clinic.access.parking },
  ];
  return (
    <dl className={className}>
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[6rem_1fr] gap-3 border-b border-line py-3 text-[15px] sm:grid-cols-[8rem_1fr] sm:text-base">
          <dt className="font-bold text-ink-soft">{r.label}</dt>
          <dd className="text-ink">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
