import Link from "next/link";
import { clinic } from "@/content/clinic";
import { symptoms } from "@/content/symptoms";
import { mainNav, policyNav, subNav } from "@/lib/nav";
import { LineIcon, PhoneIcon } from "@/components/ui/Icons";
import { LogoMark } from "@/components/ui/LogoMark";
import { MobileNav } from "@/components/layout/MobileNav";

export function Header() {
  const symptomLinks = symptoms.map((s) => ({ label: s.name, href: `/symptoms/${s.slug}` }));
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
        {/* ロゴマークは装飾。リンクのアクセシブルネームは「清水接骨院」のみになる */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <LogoMark size={40} />
          <span className="leading-tight">
            <span className="block whitespace-nowrap text-lg font-bold tracking-wide text-ink sm:text-xl">{clinic.name}</span>
            <span className="hidden whitespace-nowrap text-[11px] text-muted sm:block xl:hidden 2xl:block">足立区扇・高野駅徒歩5分｜完全予約制</span>
          </span>
        </Link>

        <nav aria-label="メインナビゲーション" className="hidden xl:block">
          <ul className="flex items-center">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-2.5 text-[14px] font-medium text-ink-soft hover:bg-brand-50 hover:text-brand-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <a
            href={clinic.telHref}
            className="inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-full px-2 text-ink hover:bg-brand-50"
            aria-label={`電話で予約する ${clinic.tel}`}
          >
            <PhoneIcon size={18} className="text-brand-600" />
            <span className="tel-link text-[17px]">{clinic.tel}</span>
          </a>
          <a href={clinic.line.url} target="_blank" rel="noopener noreferrer" className="btn btn-line min-h-11 whitespace-nowrap px-4 text-sm">
            <LineIcon size={18} /> LINEで予約
          </a>
        </div>

        <MobileNav
          main={mainNav}
          sub={[...subNav, ...policyNav]}
          symptoms={symptomLinks}
          tel={clinic.tel}
          telHref={clinic.telHref}
          lineUrl={clinic.line.url}
        />
      </div>
    </header>
  );
}
