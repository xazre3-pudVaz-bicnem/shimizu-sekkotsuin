import type { Metadata } from "next";
import { getStationGuide } from "@/content/access";
import { ogImages } from "@/content/images";
import { StationGuidePage } from "@/components/content/StationGuide";
import { buildMetadata } from "@/lib/seo";

const guide = getStationGuide("koya-station")!;

export const metadata: Metadata = buildMetadata({
  title: guide.seoTitle,
  description: guide.description,
  path: "/access/koya-station",
  ogImage: ogImages.clinic,
  keywords: ["高野駅 接骨院", "高野駅 腰痛", "高野駅 整骨院", "高野駅 清水接骨院 行き方"],
});

export default function KoyaStationPage() {
  return <StationGuidePage guide={guide} />;
}
