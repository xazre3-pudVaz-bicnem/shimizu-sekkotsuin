import Link from "next/link";
import { clinic, director } from "@/content/clinic";
import { Photo } from "@/components/ui/Photo";
import { ArrowIcon } from "@/components/ui/Icons";

/**
 * 院長メッセージ。
 * 1文目は content/clinic.ts の director.greeting[0]（既存サイトに載っていた院長の言葉）を
 * そのまま引用している。2文目以降もその範囲の再構成で、新しい経歴・実績は加えない。
 *
 * 重複対策: 施術歴30年以上・累計10万件超は TrustBar と4POINTで触れているため、
 * ここでは繰り返さず、肩書きは資格名までにとどめる。
 */
const message = [
  director.greeting[0],
  "病院や接骨院などに長く通ってもつらさが続き、「もう年だから仕方がない」「このまま付き合うしかない」と感じている方に、数多くお会いしてきました。",
  "そうした方にこそ、もう一度ご自身の身体に向き合う機会を持っていただきたい。まずは今の状態を一緒に確認するところから始めます。",
];

export function DirectorMessage() {
  return (
    <section id="director" className="section bg-mist">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-soft lg:max-w-none">
            <Photo id="director-portrait" fill sizes="(min-width: 1024px) 36vw, (min-width: 640px) 384px, 100vw" />
          </div>

          <div>
            <p className="text-sm font-bold tracking-wide text-brand-700">院長からのメッセージ</p>
            <h2 className="mt-3 text-[1.75rem] leading-[1.4] tracking-tight text-ink sm:text-[2.25rem] lg:text-[2.5rem]">
              <span className="inline-block">痛みのせいで、</span>
              <span className="inline-block">やりたいことを</span>
              <span className="inline-block">諦めてほしくない。</span>
            </h2>

            <div className="mt-7 space-y-4 border-l-4 border-brand-200 pl-5 text-[16px] leading-[1.9] text-ink-soft sm:text-[17px]">
              {message.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <p className="mt-7 text-lg font-bold text-ink">
              {clinic.name} {director.role}　{director.name}
              <span className="mt-1 block text-sm font-bold text-brand-700">{director.license}</span>
            </p>

            <Link href="/staff" className="btn btn-outline mt-7">
              院長プロフィールを見る <ArrowIcon size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
