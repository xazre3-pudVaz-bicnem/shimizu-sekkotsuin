import Link from "next/link";
import { voices, VOICE_DISCLAIMER } from "@/content/voices";
import { VoiceCard } from "@/components/content/VoiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/Icons";

export function VoiceSection() {
  const featured = voices.filter((v) => v.featured && v.image).slice(0, 3);
  return (
    <section className="section bg-mist">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading en="Voice" title="お客様の声" lead="腰痛・坐骨神経痛・脊柱管狭窄症・膝の痛みなどで来院された方の声を、ご本人の言葉のまま掲載しています。" />
          <Link href="/voice" className="btn btn-outline">
            お客様の声をすべて見る <ArrowIcon size={18} />
          </Link>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {featured.map((v) => (
            <li key={v.id} className="reveal">
              <VoiceCard voice={v} excerpt />
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">{VOICE_DISCLAIMER}</p>
      </div>
    </section>
  );
}
