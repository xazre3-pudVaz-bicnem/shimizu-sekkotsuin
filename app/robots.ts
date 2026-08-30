import type { MetadataRoute } from "next";
import { SITE_URL, absUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!SITE_URL) {
    // 本番URL未設定（プレビュー環境など）では誤インデックスを防ぐ
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: absUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
