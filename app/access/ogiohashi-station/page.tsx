import type { Metadata } from "next";
import { getStationGuide } from "@/content/access";
import { ogImages } from "@/content/images";
import { StationGuidePage } from "@/components/content/StationGuide";
import { buildMetadata } from "@/lib/seo";

const guide = getStationGuide("ogiohashi-station")!;

export const metadata: Metadata = buildMetadata({
  title: guide.seoTitle,
  description: guide.description,
  path: "/access/ogiohashi-station",
  ogImage: ogImages.clinic,
  keywords: ["扇大橋駅 接骨院", "扇大橋 腰痛", "扇大橋駅 整骨院", "扇大橋 清水接骨院 行き方"],
});

export default function OgiohashiStationPage() {
  return <StationGuidePage guide={guide} />;
}
