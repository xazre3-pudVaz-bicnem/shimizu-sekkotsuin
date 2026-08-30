import { clinic, director } from "@/content/clinic";
import { images } from "@/content/images";
import { pricing, formatYen } from "@/content/pricing";
import { SITE_NAME, SITE_DESCRIPTION, absUrl } from "@/lib/site";

export type JsonLd = Record<string, unknown>;

export const CLINIC_ID = () => `${absUrl("/")}#clinic`;
export const DIRECTOR_ID = () => `${absUrl("/staff")}#director`;
export const WEBSITE_ID = () => `${absUrl("/")}#website`;

/** 接骨院は医療機関ではないため MedicalClinic 等は使わず LocalBusiness とする */
export function localBusinessJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": CLINIC_ID(),
    name: clinic.name,
    url: absUrl("/"),
    telephone: `+81-${clinic.tel.replace(/^0/, "")}`,
    description: SITE_DESCRIPTION,
    image: [absUrl(images["clinic-exterior"].src), absUrl(images["director-smile"].src)],
    logo: absUrl("/icon.svg"),
    address: {
      "@type": "PostalAddress",
      postalCode: clinic.address.postalCode,
      addressRegion: clinic.address.region,
      addressLocality: clinic.address.locality,
      streetAddress: `${clinic.address.street} ${clinic.address.building}`,
      addressCountry: "JP",
    },
    openingHoursSpecification: clinic.openingHoursSpecification.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    priceRange: pricing.campaign.enabled
      ? `${formatYen(pricing.campaign.price)}〜${formatYen(pricing.regular.price)}`
      : formatYen(pricing.regular.price),
    currenciesAccepted: "JPY",
    founder: { "@id": DIRECTOR_ID() },
    employee: { "@id": DIRECTOR_ID() },
    sameAs: [clinic.links.googleMaps, clinic.links.ekiten, clinic.line.url],
    areaServed: [
      { "@type": "AdministrativeArea", name: "東京都足立区" },
      { "@type": "Place", name: "足立区扇" },
      { "@type": "Place", name: "高野駅周辺" },
      { "@type": "Place", name: "扇大橋駅周辺" },
    ],
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID(),
    name: SITE_NAME,
    url: absUrl("/"),
    inLanguage: "ja",
    publisher: { "@id": CLINIC_ID() },
  };
}

export function personJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": DIRECTOR_ID(),
    name: director.name,
    jobTitle: director.role,
    image: absUrl(images["director-portrait"].src),
    url: absUrl("/staff"),
    worksFor: { "@id": CLINIC_ID() },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "国家資格",
      name: "柔道整復師",
    },
    knowsAbout: ["腰痛", "坐骨神経痛", "椎間板ヘルニア", "脊柱管狭窄症", "ぎっくり腰", "膝の痛み", "肩こり"],
  };
}

export function breadcrumbJsonLd(items: { name: string; href?: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: absUrl(item.href) } : {}),
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleJsonLd(input: {
  type: "Article" | "BlogPosting";
  headline: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified: string;
  keywords?: string[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": input.type,
    headline: input.headline,
    description: input.description,
    inLanguage: "ja",
    mainEntityOfPage: { "@type": "WebPage", "@id": absUrl(input.path) },
    image: [absUrl(input.image)],
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: { "@id": DIRECTOR_ID() },
    publisher: { "@id": CLINIC_ID() },
    ...(input.keywords?.length ? { keywords: input.keywords.join(",") } : {}),
  };
}

/** script タグに安全に埋め込むための文字列化 */
export function serializeJsonLd(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
