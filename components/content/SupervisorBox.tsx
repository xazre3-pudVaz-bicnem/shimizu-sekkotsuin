import Link from "next/link";
import { clinic, director } from "@/content/clinic";
import { Photo } from "@/components/ui/Photo";
import { formatDate } from "@/lib/utils";

type Props = { publishedAt: string; updatedAt: string; label?: string };

/** 記事・症状ページの監修者情報（E-E-A-T） */
export function SupervisorBox({ publishedAt, updatedAt, label = "この記事の監修者" }: Props) {
  return (
    <aside aria-label={label} className="rounded-2xl border border-line bg-mist p-5 sm:p-6">
      <p className="text-xs font-bold tracking-wider text-brand-600">{label}</p>
      <div className="mt-3 flex gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full sm:h-24 sm:w-24">
          <Photo id="director-portrait" fill sizes="96px" />
        </div>
        <div className="min-w-0">
          <p className="text-lg font-bold text-ink">
            {director.name}
            <span className="ml-2 text-sm font-medium text-muted">
              {clinic.name} {director.role}
            </span>
          </p>
          <p className="mt-1 text-sm text-ink-soft">{director.license}｜施術歴{director.careerYears}・{director.totalCases}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            足立区扇で腰痛・坐骨神経痛など身体の痛みやしびれに向き合う接骨院の院長。当サイトの症状解説・コラムは、一般的な情報として院長が内容を確認しています。個別の症状については医療機関の診断を優先してください。
          </p>
          <div className="mt-2 flex flex-wrap gap-x-5 text-sm">
            <Link href="/staff" className="inline-flex min-h-11 items-center font-bold text-brand-700 underline-offset-4 hover:underline">
              院長プロフィール
            </Link>
            <Link href="/supervision" className="inline-flex min-h-11 items-center font-bold text-brand-700 underline-offset-4 hover:underline">
              記事監修について
            </Link>
          </div>
        </div>
      </div>
      <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 border-t border-line pt-3 text-xs text-muted">
        <div className="flex gap-2">
          <dt>公開日</dt>
          <dd>
            <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
          </dd>
        </div>
        <div className="flex gap-2">
          <dt>最終更新日</dt>
          <dd>
            <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
          </dd>
        </div>
        <div className="flex gap-2">
          <dt>運営</dt>
          <dd>
            {clinic.name}（{clinic.address.full}／{clinic.tel}）
          </dd>
        </div>
      </dl>
    </aside>
  );
}
