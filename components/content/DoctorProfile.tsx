import Link from "next/link";
import { clinic, director } from "@/content/clinic";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon, CheckIcon } from "@/components/ui/Icons";

/** トップページ等で使う院長紹介セクション */
export function DoctorProfile() {
  return (
    <section id="director" className="section">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl shadow-soft lg:max-w-none">
            <Photo id="director-portrait" sizes="(min-width: 1024px) 40vw, (min-width: 640px) 448px, 100vw" />
          </div>
          <div>
            <SectionHeading title="院長紹介" />
            <p className="mt-6 text-2xl font-bold text-ink sm:text-3xl">
              {director.name}
              <span className="ml-3 text-base font-medium text-muted">
                {clinic.name} {director.role}
              </span>
            </p>
            <p className="mt-1 font-bold text-brand-700">{director.license}</p>
            <ul className="mt-5 space-y-2">
              {director.facts.map((f) => (
                <li key={f} className="flex gap-3 text-[15px] text-ink-soft sm:text-base">
                  <CheckIcon size={18} className="mt-1 shrink-0 text-brand-600" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <blockquote className="mt-6 border-l-4 border-brand-200 pl-4 text-[15px] leading-relaxed text-ink-soft sm:text-base">
              {director.greeting[0]}
            </blockquote>
            <Link href="/staff" className="btn btn-outline mt-7">
              院長プロフィールを見る <ArrowIcon size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
