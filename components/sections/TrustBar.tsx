import { clinic, director } from "@/content/clinic";

/** ヒーロー直下の信頼バー。ヒーローから移した実績・体制の要点をここでまとめて伝える。 */
const items = [
  { title: "柔道整復師（国家資格）", text: `院長 ${director.name} がカウンセリングから施術まで担当します` },
  { title: `施術歴${director.careerYears}`, text: `${director.totalCases}の施術経験。腰・お尻・脚の症状のご相談が多い院です` },
  { title: clinic.reservation, text: "お待たせしないよう予約制。院内は最小限の人数です" },
  { title: "高野駅 徒歩5分", text: "扇大橋駅 徒歩6分。小型車1台分の駐車場あり" },
];

export function TrustBar() {
  return (
    <section aria-label="清水接骨院の特徴" className="border-b border-line bg-mist">
      <div className="container-x py-8 sm:py-10">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.title} className="rounded-2xl bg-white p-5 shadow-card">
              <p className="flex items-start gap-2 text-base font-bold text-ink">
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 shrink-0 text-brand-600">
                  <path d="m5 12 5 5L20 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-center text-sm leading-relaxed text-muted">
          {clinic.hours.map((h) => `${h.days} ${h.time}`).join("／")}｜定休日 {clinic.closed}
          <span className="mt-1 block">{clinic.telNote}</span>
        </p>
      </div>
    </section>
  );
}
