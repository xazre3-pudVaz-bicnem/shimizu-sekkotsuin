import Link from "next/link";
import { clinic } from "@/content/clinic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon, CalendarIcon, ClockIcon, UserIcon } from "@/components/ui/Icons";

export function FirstVisitSection() {
  const cards = [
    {
      icon: <CalendarIcon size={24} />,
      title: "ご予約について",
      text: `${clinic.reservation}です。LINE（24時間受付）またはお電話でご予約ください。当日のご予約も空きがあれば可能です。`,
    },
    {
      icon: <UserIcon size={24} />,
      title: "当日の服装",
      text: "動きやすい服装でお越しください。デニムや革など伸びにくい素材はお控えいただくと安心です。院内でのお着替えもできます。",
    },
    {
      icon: <ClockIcon size={24} />,
      title: "来院の目安",
      text: "予約時間の5分前を目安にお越しください。問診票の記入後、カウンセリングと身体の状態確認から始めます。",
    },
  ];
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading title="初めての方へ" lead="「どんなところか分からなくて不安」という方のために、来院前に知っておいていただきたいことをまとめました。" />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {cards.map((c) => (
            <li key={c.title} className="card reveal p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">{c.icon}</span>
              <h3 className="mt-4 text-lg font-bold text-ink">{c.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{c.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link href="/first" className="btn btn-outline">
            初めての方へのご案内を見る <ArrowIcon size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
