import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { JsonLd } from "@/components/ui/JsonLd";
import { localBusinessJsonLd, personJsonLd } from "@/lib/jsonld";
import { IS_INDEXABLE, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

/**
 * 日本語本文は OS 標準フォント（ヒラギノ / Noto Sans CJK / メイリオ）を使用。
 * Noto Sans JP を next/font で読み込むと日本語ページでは100以上のサブセット（1MB超）が
 * 転送され LCP を大きく悪化させるため、意図的に Web フォントを使わない。
 * 欧文ラベル・数字のみ Manrope（軽量）を使用。
 */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});

/** Google Analytics 4（測定ID）・Search Console 所有権確認は環境変数で有効化する */
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
const GSC_TOKEN = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
  title: { default: SITE_TITLE, template: `%s｜${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  robots: IS_INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { siteName: SITE_NAME, locale: "ja_JP", type: "website" },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: true },
  ...(GSC_TOKEN ? { verification: { google: GSC_TOKEN } } : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2b7157",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={manrope.variable}>
      <body className="flex min-h-svh flex-col">
        {/* キーボード操作でヘッダーのリンクを飛ばして本文へ（WCAG 2.4.1）。Tabで初めて表示される */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-full focus:bg-brand-700 focus:px-5 focus:text-[15px] focus:font-bold focus:text-white focus:shadow-soft"
        >
          本文へスキップ
        </a>
        <Header />
        {/* tabIndex={-1} がないと、スキップリンクで飛んでもフォーカスが本文に移らない */}
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <MobileCtaBar />
        <JsonLd data={[localBusinessJsonLd(), personJsonLd()]} />
        {GA_ID && IS_INDEXABLE && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
