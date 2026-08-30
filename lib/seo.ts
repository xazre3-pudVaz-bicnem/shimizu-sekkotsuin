import type { Metadata } from "next";
import { IS_INDEXABLE, SITE_NAME, absUrl } from "@/lib/site";

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  /** 完全なタイトルをそのまま使う（サイト名を付けない） */
  absoluteTitle?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
  noindex?: boolean;
};

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const title = input.absoluteTitle ? input.title : `${input.title}｜${SITE_NAME}`;
  const ogTitle = input.ogTitle ?? title;
  const ogDescription = input.ogDescription ?? input.description;
  const ogImage = input.ogImage ?? "/images/og-default.jpg";
  const url = absUrl(input.path);
  const index = IS_INDEXABLE && !input.noindex;

  return {
    title: { absolute: title },
    description: input.description,
    keywords: input.keywords,
    alternates: IS_INDEXABLE ? { canonical: url } : undefined,
    robots: index
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
      : { index: false, follow: false },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: IS_INDEXABLE ? url : undefined,
      siteName: SITE_NAME,
      locale: "ja_JP",
      type: input.type ?? "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
      ...(input.type === "article"
        ? { publishedTime: input.publishedTime, modifiedTime: input.modifiedTime, authors: ["清水 正尊"] }
        : {}),
    },
    twitter: { card: "summary_large_image", title: ogTitle, description: ogDescription, images: [ogImage] },
  };
}
