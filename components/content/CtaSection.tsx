import { clinic } from "@/content/clinic";
import { CtaButtons } from "@/components/ui/CtaButtons";

type Props = { title?: string; text?: string };

export function CtaSection({
  title = "あきらめてしまう前に、一度ご相談ください",
  text = "予約を決めていなくても構いません。当院でできることと、医療機関で確認していただきたいことを分けてお伝えします。",
}: Props) {
  return (
    <section className="bg-brand-800 text-white">
      <div className="container-x py-14 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold text-brand-200">ご相談・ご予約</p>
          <h2 className="mt-3 text-2xl text-white sm:text-3xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-brand-100 sm:text-lg">{text}</p>
          <div className="mt-8 rounded-3xl bg-white p-6 text-ink sm:p-8">
            <p className="text-lg font-bold">{clinic.name}｜{clinic.tagline}</p>
            <CtaButtons align="center" className="mt-5" />
          </div>
        </div>
      </div>
    </section>
  );
}
