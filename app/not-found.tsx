import Link from "next/link";
import type { Metadata } from "next";
import { symptoms } from "@/content/symptoms";
import { SymptomCard } from "@/components/content/SymptomCard";
import { CtaButtons } from "@/components/ui/CtaButtons";

export const metadata: Metadata = {
  title: "ページが見つかりません",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const primary = symptoms.filter((s) => s.priority === 1).slice(0, 6);
  return (
    <section className="section">
      <div className="container-x">
        <p className="text-sm font-bold text-brand-700">ページが見つかりません（404）</p>
        <h1 className="mt-3 text-3xl sm:text-4xl">ページが見つかりませんでした</h1>
        <p className="mt-4 max-w-2xl text-ink-soft">
          お探しのページは移動または削除された可能性があります。症状から探すか、トップページからご覧ください。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            トップページへ
          </Link>
          <Link href="/symptoms" className="btn btn-outline">
            症状から探す
          </Link>
        </div>
        <h2 className="mt-14 text-xl font-bold">よく見られている症状ページ</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {primary.map((s) => (
            <li key={s.slug}>
              <SymptomCard symptom={s} compact />
            </li>
          ))}
        </ul>
        <CtaButtons className="mt-14" />
      </div>
    </section>
  );
}
