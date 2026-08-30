import Link from "next/link";
import { clinic, director } from "@/content/clinic";
import { symptoms } from "@/content/symptoms";
import { articleCategories } from "@/content/types";
import { mainNav, subNav } from "@/lib/nav";
import { LineIcon, PhoneIcon } from "@/components/ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-cream pb-24 md:pb-0">
      <div className="container-x py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="text-xl font-bold text-ink">{clinic.name}</p>
            <p className="mt-1 text-sm text-muted">{clinic.tagline}</p>
            <address className="mt-4 text-[15px] not-italic leading-relaxed text-ink-soft">
              〒{clinic.address.postalCode}
              <br />
              {clinic.address.full}
            </address>
            <a href={clinic.telHref} className="mt-3 inline-flex min-h-11 items-center gap-2 text-ink">
              <PhoneIcon size={18} className="text-brand-600" />
              <span className="tel-link text-xl">{clinic.tel}</span>
            </a>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[15px] text-ink-soft">
              {clinic.hours.map((h) => (
                <div key={h.days} className="contents">
                  <dt className="font-medium">{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
              <dt className="font-medium">定休日</dt>
              <dd>{clinic.closed}</dd>
              <dt className="font-medium">予約</dt>
              <dd>{clinic.reservation}</dd>
            </dl>
            <a href={clinic.line.url} target="_blank" rel="noopener noreferrer" className="btn btn-line mt-5 min-h-12">
              <LineIcon size={20} /> {clinic.line.label}
            </a>
          </div>

          <nav aria-label="フッターナビゲーション">
            <p className="text-sm font-bold text-muted">メニュー</p>
            <ul className="mt-3 space-y-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-11 items-center text-[15px] text-ink-soft hover:text-brand-700 hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
              {subNav.slice(0, 3).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-11 items-center text-[15px] text-ink-soft hover:text-brand-700 hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="症状別ページ">
            <p className="text-sm font-bold text-muted">症状から探す</p>
            <ul className="mt-3 space-y-1">
              {symptoms.map((s) => (
                <li key={s.slug}>
                  <Link href={`/symptoms/${s.slug}`} className="inline-flex min-h-11 items-center text-[15px] text-ink-soft hover:text-brand-700 hover:underline">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="コラムカテゴリ">
            <p className="text-sm font-bold text-muted">コラムカテゴリ</p>
            <ul className="mt-3 space-y-1">
              {articleCategories.map((c) => (
                <li key={c.id}>
                  <Link href={`/column/category/${c.id}`} className="inline-flex min-h-11 items-center text-[15px] text-ink-soft hover:text-brand-700 hover:underline">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-line pt-6 text-sm text-muted">
          <p>
            サイト内の症状・コラム記事は、{clinic.name} {director.role} {director.name}（{director.license}）が監修しています。掲載内容は一般的な情報提供を目的としたものであり、医学的な診断に代わるものではありません。
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
            {subNav.slice(3).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center hover:text-brand-700 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4">© {year} {clinic.name}</p>
        </div>
      </div>
    </footer>
  );
}
