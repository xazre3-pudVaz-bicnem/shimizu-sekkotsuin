import type { MetadataRoute } from "next";
import { symptoms } from "@/content/symptoms";
import { articles } from "@/content/columns";
import { articleCategories } from "@/content/types";
import { SITE_URL, absUrl } from "@/lib/site";

export const dynamic = "force-static";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/symptoms", priority: 0.9, changeFrequency: "weekly" },
  { path: "/treatment", priority: 0.8, changeFrequency: "monthly" },
  { path: "/first", priority: 0.8, changeFrequency: "monthly" },
  { path: "/price", priority: 0.8, changeFrequency: "monthly" },
  { path: "/voice", priority: 0.7, changeFrequency: "monthly" },
  { path: "/staff", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/access", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/column", priority: 0.7, changeFrequency: "weekly" },
  { path: "/supervision", priority: 0.4, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/disclaimer", priority: 0.2, changeFrequency: "yearly" },
  { path: "/site-policy", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_URL) return [];
  const now = new Date();

  const latestArticle = articles.map((a) => a.updatedAt).sort().at(-1);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: absUrl(r.path),
    lastModified: r.path === "/column" && latestArticle ? new Date(latestArticle) : now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const symptomEntries: MetadataRoute.Sitemap = symptoms.map((s) => ({
    url: absUrl(`/symptoms/${s.slug}`),
    lastModified: new Date(s.updatedAt),
    changeFrequency: "monthly",
    priority: s.priority === 1 ? 0.9 : 0.8,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: absUrl(`/column/${a.slug}`),
    lastModified: new Date(a.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const categoryEntries: MetadataRoute.Sitemap = articleCategories
    .filter((c) => articles.some((a) => a.category === c.id))
    .map((c) => ({
      url: absUrl(`/column/category/${c.id}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    }));

  return [...staticEntries, ...symptomEntries, ...articleEntries, ...categoryEntries];
}
