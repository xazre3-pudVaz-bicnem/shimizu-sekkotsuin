import type { Metadata } from "next";
import Link from "next/link";
import { clinic, director } from "@/content/clinic";
import { PageHero } from "@/components/ui/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "サイトポリシー",
  description: "清水接骨院ウェブサイトの運営者情報、著作権、リンク、推奨環境、お問い合わせ先などのサイトポリシーです。",
  path: "/site-policy",
});

export default function SitePolicyPage() {
  const items: { t: string; body: string[] }[] = [
    {
      t: "運営者",
      body: [`当サイトは、${clinic.name}（${clinic.address.full}／電話 ${clinic.tel}／代表 ${director.name}）が運営しています。`],
    },
    {
      t: "サイトの目的",
      body: ["当サイトは、当院の施術内容・料金・アクセスなどのご案内と、腰痛や坐骨神経痛など身体の痛みやしびれに関する一般的な情報提供を目的としています。"],
    },
    {
      t: "著作権・商標",
      body: ["当サイトに掲載している文章・写真・イラスト・ロゴ等の著作権は、当院または正当な権利者に帰属します。私的利用など法律で認められた範囲を超えて、無断で複製・転載・改変することはできません。"],
    },
    {
      t: "リンクについて",
      body: ["当サイトへのリンクは原則として自由です。ただし、公序良俗に反するサイトからのリンク、当院を誹謗中傷する目的のリンク、フレーム内表示など当サイトのコンテンツであることが分かりにくくなる形のリンクはお断りします。"],
    },
    {
      t: "推奨環境",
      body: ["当サイトは、主要なブラウザ（Chrome、Safari、Edge、Firefox）の最新版でご覧いただくことを推奨しています。スマートフォン・タブレットでもご覧いただけます。"],
    },
    {
      t: "アクセシビリティ",
      body: ["ご高齢の方にも読みやすいよう、文字サイズや行間、ボタンの大きさに配慮しています。見づらい点や操作しづらい点がありましたら、お知らせいただけると幸いです。"],
    },
    {
      t: "お問い合わせ",
      body: [`当サイトに関するお問い合わせは、お電話（${clinic.tel}）またはLINEでお願いします。施術中は電話に出られないことがありますので、あらかじめご了承ください。`],
    },
  ];
  return (
    <>
      <PageHero en="Site Policy" title="サイトポリシー" breadcrumb={[{ name: "サイトポリシー" }]} />
      <section className="section">
        <div className="container-x max-w-3xl space-y-8">
          {items.map((s) => (
            <div key={s.t}>
              <h2 className="text-xl font-bold text-ink">{s.t}</h2>
              <div className="mt-3 space-y-2 text-[1.0625rem] leading-[1.9] text-ink-soft">
                {s.body.map((b, i) => (
                  <p key={i}>{b}</p>
                ))}
              </div>
            </div>
          ))}
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
            <li>
              <Link href="/privacy" className="font-bold text-brand-700 underline-offset-4 hover:underline">
                プライバシーポリシー
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="font-bold text-brand-700 underline-offset-4 hover:underline">
                免責事項
              </Link>
            </li>
            <li>
              <Link href="/supervision" className="font-bold text-brand-700 underline-offset-4 hover:underline">
                記事監修について
              </Link>
            </li>
          </ul>
          <p className="text-sm text-muted">制定日：2026年8月30日</p>
        </div>
      </section>
    </>
  );
}
