import type { Metadata } from "next";
import { clinic } from "@/content/clinic";
import { PageHero } from "@/components/ui/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "プライバシーポリシー",
  description: "清水接骨院（東京都足立区扇）の個人情報の取り扱いについて。取得する情報、利用目的、第三者提供、安全管理、開示等の請求窓口を定めています。",
  path: "/privacy",
});

const sections: { t: string; body: string[] }[] = [
  {
    t: "1. 基本方針",
    body: [`${clinic.name}（以下「当院」）は、患者さん・ご利用者の個人情報を適切に取り扱うことが重要な責務であると考え、個人情報の保護に関する法律その他の関係法令を遵守し、以下の方針に基づいて個人情報を取り扱います。`],
  },
  {
    t: "2. 取得する情報",
    body: [
      "当院は、ご予約・お問い合わせ・来院時に、氏名、電話番号、LINEアカウント情報、住所、生年月日、症状や既往歴、生活習慣など、施術に必要な範囲の情報をお伺いします。",
      "ウェブサイトの閲覧に際しては、Cookieやアクセス解析ツールにより、閲覧ページや利用環境などの情報を統計的に取得する場合があります。これらの情報から個人を特定することはありません。",
    ],
  },
  {
    t: "3. 利用目的",
    body: [
      "取得した個人情報は、次の目的の範囲内で利用します。",
      "・ご予約の受付・変更・確認のご連絡",
      "・カウンセリング、身体の状態確認、施術およびアフターフォロー",
      "・お問い合わせへの回答",
      "・当院からのお知らせ（休診日の変更など）",
      "・ウェブサイトの改善のための統計分析",
    ],
  },
  {
    t: "4. 第三者への提供",
    body: ["法令に基づく場合、または本人の同意がある場合を除き、個人情報を第三者に提供することはありません。医療機関の受診をお勧めする際に、ご本人の希望に基づいて情報を共有する場合は、事前に同意をいただきます。"],
  },
  {
    t: "5. 安全管理",
    body: ["個人情報への不正アクセス、紛失、漏えい等を防止するため、必要かつ適切な安全管理措置を講じます。問診票などの書類は施錠管理し、施術に関係のない者が閲覧できないようにします。"],
  },
  {
    t: "6. LINE等の外部サービスについて",
    body: ["LINEでのご予約・ご相談には、LINEヤフー株式会社が提供するサービスを利用します。同サービスにおける情報の取り扱いは、同社のプライバシーポリシーに従います。Googleマップの埋め込みなど、外部サービスの利用時も同様です。"],
  },
  {
    t: "7. お客様の声・写真の掲載",
    body: ["ウェブサイトに掲載しているお客様の声やお写真は、ご本人の承諾を得たものです。掲載の取り下げをご希望の場合は、下記窓口までご連絡ください。速やかに対応します。"],
  },
  {
    t: "8. 開示・訂正・削除等の請求",
    body: [`ご本人から個人情報の開示、訂正、利用停止、削除等のお申し出があった場合は、ご本人確認のうえ、法令に従って速やかに対応します。窓口：${clinic.name}（電話 ${clinic.tel}）`],
  },
  {
    t: "9. 方針の変更",
    body: ["本方針は、法令の改正や運用の見直しに応じて変更することがあります。変更後の方針は、本ページに掲載した時点から適用されます。"],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero en="Privacy Policy" title="プライバシーポリシー" breadcrumb={[{ name: "プライバシーポリシー" }]} />
      <section className="section">
        <div className="container-x max-w-3xl space-y-8">
          {sections.map((s) => (
            <div key={s.t}>
              <h2 className="text-xl font-bold text-ink">{s.t}</h2>
              <div className="mt-3 space-y-2 text-[1.0625rem] leading-[1.9] text-ink-soft">
                {s.body.map((b, i) => (
                  <p key={i}>{b}</p>
                ))}
              </div>
            </div>
          ))}
          <p className="text-sm text-muted">制定日：2026年8月30日</p>
          <p className="text-[15px] text-ink-soft">
            {clinic.name}
            <br />
            〒{clinic.address.postalCode} {clinic.address.full}
            <br />
            電話 {clinic.tel}
          </p>
        </div>
      </section>
    </>
  );
}
