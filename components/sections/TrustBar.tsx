import { clinic, director } from "@/content/clinic";

/**
 * ヒーロー直下の信頼バー。
 * 数字を大きく煽らず、ラベル（小）＋値（中）の組みで淡々と事実だけを並べる。
 * 掲載できるのは content/clinic.ts で確認済みの事実のみ。
 */
const items = [
  { label: "国家資格", value: "柔道整復師" },
  { label: "施術歴", value: director.careerYears },
  { label: "累計施術経験", value: "10万件超" },
  { label: "毎回", value: "院長本人が担当" },
];

export function TrustBar() {
  return (
    <section aria-label="清水接骨院の実績と体制" className="border-y border-line bg-white">
      <div className="container-x py-7 sm:py-9">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-7 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.label} className="relative text-center lg:px-4">
              <p className="text-xs font-bold tracking-wide text-brand-700 sm:text-[13px]">{item.label}</p>
              <p className="mt-1.5 text-[17px] font-bold leading-snug text-ink sm:text-xl">{item.value}</p>
            </li>
          ))}
        </ul>
        <p className="mt-7 border-t border-line pt-5 text-center text-sm leading-relaxed text-muted">
          {clinic.reservation}｜{clinic.hours.map((h) => `${h.days} ${h.time}`).join("／")}｜定休日 {clinic.closed}
          <span className="mt-1 block">日暮里・舎人ライナー「高野駅」徒歩5分／「扇大橋駅」徒歩6分</span>
        </p>
      </div>
    </section>
  );
}
