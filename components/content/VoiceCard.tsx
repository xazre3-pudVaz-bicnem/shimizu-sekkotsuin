import Link from "next/link";
import type { Voice } from "@/content/types";
import { getSymptom } from "@/content/symptoms";
import { Photo } from "@/components/ui/Photo";
import { QuoteIcon } from "@/components/ui/Icons";

/**
 * excerpt: 一覧用の抜粋表示。トップでは本文が長くなりすぎるため1段落＋4行までに切り、
 * 続きは「声をすべて読む」から /voice へ送る（文章はHTMLに残るのでSEOには影響しない）。
 */
export function VoiceCard({ voice, excerpt = false }: { voice: Voice; excerpt?: boolean }) {
  const paragraphs = excerpt ? voice.body.slice(0, 1) : voice.body;
  return (
    <article id={`voice-${voice.id}`} className="card flex h-full flex-col overflow-hidden scroll-mt-24">
      {voice.image && (
        <div className="relative aspect-[4/3] w-full bg-mist">
          <Photo id={voice.image} fill sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-ink-soft">{voice.who}</span>
          {voice.symptoms.map((s) => (
            <span key={s} className="rounded-full bg-brand-50 px-2.5 py-1 font-bold text-brand-700">
              {s}
            </span>
          ))}
        </div>
        <p className="mt-3 flex gap-2 text-base font-bold leading-snug text-ink sm:text-lg">
          <QuoteIcon size={18} className="mt-1 shrink-0 text-brand-300" />
          <span>{voice.headline}</span>
        </p>
        <div className="mt-3 space-y-2 text-[15px] leading-relaxed text-ink-soft">
          {paragraphs.map((p, i) => (
            <p key={i} className={excerpt ? "line-clamp-4" : undefined}>
              {p}
            </p>
          ))}
        </div>
        {excerpt && voice.body.length > 1 && (
          <Link href={`/voice#voice-${voice.id}`} className="mt-2 inline-flex min-h-11 items-center self-start text-sm font-bold text-brand-700 underline-offset-4 hover:underline">
            {voice.who}の声をすべて読む
          </Link>
        )}
        {!excerpt && (
          <p className="mt-3 flex flex-wrap gap-x-4 text-sm">
            {voice.symptomSlugs
              .map((slug) => getSymptom(slug))
              .filter((s): s is NonNullable<typeof s> => Boolean(s))
              .map((s) => (
                <Link key={s.slug} href={`/symptoms/${s.slug}`} className="inline-flex min-h-11 items-center text-brand-700 underline decoration-brand-300 underline-offset-4 hover:decoration-brand-600">
                  {s.name}のページへ
                </Link>
              ))}
          </p>
        )}
        <p className="mt-auto pt-4 text-xs text-muted">※個人の感想であり、施術の結果を保証するものではありません。</p>
      </div>
    </article>
  );
}
