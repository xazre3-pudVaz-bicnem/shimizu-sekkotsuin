import Script from "next/script";
import { IS_INDEXABLE } from "@/lib/site";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

/**
 * アクセス解析タグ。
 *
 * ・GA4（NEXT_PUBLIC_GA_MEASUREMENT_ID）… 流入数・流入経路・CVの計測
 * ・Microsoft Clarity（NEXT_PUBLIC_CLARITY_PROJECT_ID）… ヒートマップ・セッション録画
 *
 * どちらも「IDが設定されていて、かつ本番URLが設定されているとき」だけ出力する。
 * プレビュー環境や検証ビルドのアクセスが計測データに混ざらないようにするため。
 *
 * Clarity は個人の行動を録画するため、以下を守ること。
 *  ・管理画面の Masking を Strict にして、入力値・テキストを既定でマスクする
 *  ・録画されたくない要素には data-clarity-mask="true" を付ける
 *  ・プライバシーポリシー（/privacy）に利用を明記する（記載済み）
 */
export function Analytics() {
  if (!IS_INDEXABLE) return null;

  return (
    <>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {CLARITY_ID && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
      )}
    </>
  );
}
