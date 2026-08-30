import Link from "next/link";
import { faqGroups } from "@/content/faq";
import { Faq } from "@/components/content/Faq";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/Icons";

export function FaqSection() {
  const picks = [faqGroups[0].items[0], faqGroups[2].items[0], faqGroups[1].items[0], faqGroups[0].items[2], faqGroups[1].items[3]];
  return (
    <section className="section bg-cream">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading en="FAQ" title="よくある質問" lead="施術の内容や予約、料金について、よくいただくご質問にお答えします。" />
          <Link href="/faq" className="btn btn-outline mt-6">
            よくある質問をすべて見る <ArrowIcon size={18} />
          </Link>
        </div>
        <Faq items={picks} />
      </div>
    </section>
  );
}
