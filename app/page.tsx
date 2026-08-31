import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Concerns } from "@/components/sections/Concerns";
import { SymptomGrid } from "@/components/sections/SymptomGrid";
import { LowerBackFocus } from "@/components/sections/LowerBackFocus";
import { AboutClinic } from "@/components/sections/AboutClinic";
import { Reasons } from "@/components/sections/Reasons";
import { DoctorProfile } from "@/components/content/DoctorProfile";
import { VoiceSection } from "@/components/sections/VoiceSection";
import { Flow } from "@/components/sections/Flow";
import { PriceSection } from "@/components/sections/PriceSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ColumnSection } from "@/components/sections/ColumnSection";
import { AccessSection } from "@/components/content/AccessSection";
import { CtaSection } from "@/components/content/CtaSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { websiteJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: SITE_TITLE,
  absoluteTitle: true,
  description: SITE_DESCRIPTION,
  path: "/",
  ogTitle: "足立区扇・高野駅の清水接骨院｜腰痛・身体の痛みやしびれに",
  ogDescription:
    "高野駅徒歩5分・扇大橋駅徒歩6分。柔道整復師の院長が身体全体を確認し、腰痛・坐骨神経痛・ヘルニア・脊柱管狭窄症などに一人ひとり合わせたソフトな施術を行います。完全予約制。",
  keywords: ["足立区 接骨院", "足立区扇 接骨院", "扇 接骨院", "高野 接骨院", "足立区 腰痛", "高野駅 接骨院", "扇大橋 接骨院"],
});

/**
 * トップページのセクション順は「予約までの心理導線」に沿って並べている。
 * 1 ヒーロー → 2 信頼バー → 3 悩み → 4 主な症状 → 5 腰まわり → 6 施術の考え方
 * → 7 選ばれる理由 → 8 院長 → 9 声 → 10 流れ → 11 料金 → 12 FAQ → 13 アクセス → 14 コラム → 15 CTA
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Concerns />
      <SymptomGrid />
      <LowerBackFocus />
      <AboutClinic />
      <Reasons />
      <DoctorProfile />
      <VoiceSection />
      <Flow />
      <PriceSection />
      <FaqSection />
      <AccessSection />
      <ColumnSection />
      <CtaSection />
      <JsonLd data={websiteJsonLd()} />
    </>
  );
}
