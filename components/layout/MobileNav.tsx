"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { CloseIcon, LineIcon, MenuIcon, PhoneIcon } from "@/components/ui/Icons";

type LinkItem = { label: string; href: string };

type Props = {
  main: LinkItem[];
  sub: LinkItem[];
  symptoms: LinkItem[];
  tel: string;
  telHref: string;
  lineUrl: string;
};

export function MobileNav({ main, sub, symptoms, tel, telHref, lineUrl }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const close = () => setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        className="flex h-12 w-12 items-center justify-center rounded-full text-ink hover:bg-brand-50"
      >
        {open ? <CloseIcon size={26} /> : <MenuIcon size={26} />}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-white pb-24 lg:top-20"
      >
        <nav aria-label="メニュー" className="container-x py-4">
          <ul className="divide-y divide-line">
            {main.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={close} className="flex min-h-14 items-center justify-between py-3 text-lg font-bold text-ink">
                  {item.label}
                  <span aria-hidden="true" className="text-brand-600">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-6 mb-2 text-sm font-bold text-muted">症状から探す</p>
          <ul className="grid grid-cols-2 gap-2">
            {symptoms.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  onClick={close}
                  className="flex min-h-12 items-center rounded-xl border border-line bg-mist px-3 py-2 text-[15px] font-medium text-ink-soft"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
            {sub.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={close} className="inline-block py-2 underline-offset-4 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 grid gap-3">
            <a href={lineUrl} target="_blank" rel="noopener noreferrer" className="btn btn-line min-h-14 text-lg">
              <LineIcon size={22} /> LINEで相談・予約
            </a>
            <a href={telHref} className="btn btn-primary min-h-14 text-lg">
              <PhoneIcon size={20} /> <span className="tel-link">{tel}</span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
