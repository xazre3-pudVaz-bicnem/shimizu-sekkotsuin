import Link from "next/link";
import { getVoice, homeVoiceIds, VOICE_DISCLAIMER } from "@/content/voices";
import { VoiceCard } from "@/components/content/VoiceCard";
import { ArrowIcon } from "@/components/ui/Icons";

/**
 * ご利用者の声。トップページ上部（悩みの直後）に置き、
 * 「病院や他院に通ったが続いていた」という背景を持つ方の声を優先して出す。
 */
export function VoiceSection() {
  const featured = homeVoiceIds.map((id) => getVoice(id)).filter((v): v is NonNullable<typeof v> => Boolean(v));
  return (
    <section className="section bg-mist">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <h2 className="text-[1.75rem] leading-[1.4] text-ink sm:text-[2.125rem]">
              <span className="inline-block">同じように、長く悩まれていた方が</span>
              <span className="inline-block">来院されています</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-[1.8] text-ink-soft sm:text-[17px]">
              病院や他の施術院に通ったうえで来院された方の声です。ご本人の言葉のまま掲載しています。
            </p>
          </div>
          <Link href="/voice" className="btn btn-outline">
            お客様の声をすべて見る <ArrowIcon size={18} />
          </Link>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {featured.map((v) => (
            <li key={v.id}>
              <VoiceCard voice={v} excerpt />
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <Link href="/cases" className="btn btn-outline min-h-[52px] px-7 text-[17px]">
            来院前から現在までの施術事例を見る <ArrowIcon size={18} />
          </Link>
        </div>

        <p className="mt-6 text-sm text-muted">{VOICE_DISCLAIMER}</p>
      </div>
    </section>
  );
}
