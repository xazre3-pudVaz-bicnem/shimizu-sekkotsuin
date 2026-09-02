import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Concerns } from "@/components/sections/Concerns";
import { VoiceSection } from "@/components/sections/VoiceSection";
import { DirectorMessage } from "@/components/sections/DirectorMessage";
import { Differentiators } from "@/components/sections/Differentiators";
import { Endorsements } from "@/components/sections/Endorsements";
import { Policies } from "@/components/sections/Policies";
import { SymptomGrid } from "@/components/sections/SymptomGrid";
import { TreatmentPhilosophy } from "@/components/sections/TreatmentPhilosophy";
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
 * トップページのセクション順。
 * 「整形外科や他院に通ってもつらさが続いている方」に向けた心理導線で並べている。
 *  1 ヒーロー（誰に向けた院か）→ 2 信頼バー → 3 悩みの言語化 → 4 同じ悩みだった方の声
 *  → 5 院長の考え → 6 何が違うのか → 7 第三者からの推薦 → 8 大切にしていること・医療機関との役割
 *  → 9 症状から探す → 10 施術の考え方 → 11 流れ → 12 料金 → 13 FAQ → 14 アクセス → 15 コラム → 16 CTA
 *
 * 長い説明文はトップに置かず、/about・/treatment・症状ページ・コラムへ内部リンクで送る。
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Concerns />
      <VoiceSection />
      <DirectorMessage />
      <Differentiators />
      <Endorsements />
      <Policies />
      <SymptomGrid />
      <TreatmentPhilosophy />
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
