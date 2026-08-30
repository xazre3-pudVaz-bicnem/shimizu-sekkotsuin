# 清水接骨院 公式サイト

足立区扇・高野駅徒歩5分の清水接骨院の公式サイト。腰痛・坐骨神経痛など症状別ページ × 専門コラム × 院長の専門性 × 地域性で検索流入を獲得する「SEO資産型」サイトとして設計しています。

- Next.js 16（App Router / Server Components 中心） + TypeScript + Tailwind CSS v4
- 全ページ静的生成（SSG）。外部ライブラリは最小限（アニメーションもCSSのみ）
- 画像は `next/image`（AVIF/WebP自動変換）

## セットアップ

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 本番ビルド（型チェック込み）
npm run lint     # ESLint
npm start        # 本番サーバー
```

## 本番URLの設定（重要）

`NEXT_PUBLIC_SITE_URL` に本番のURL（末尾スラッシュなし）を設定してください。

```
NEXT_PUBLIC_SITE_URL=https://example.com
```

- 設定あり: canonical / OG URL / sitemap.xml / robots.txt（Allow）が本番URLで出力されます
- 設定なし: canonical・sitemapを出力せず、robots.txt は全ページ Disallow、meta robots は noindex になります（プレビュー環境の誤インデックス防止）

Vercel の場合は Project Settings → Environment Variables に Production 用として登録し、再デプロイしてください。`.env.example` も参照。

## ディレクトリ構成

```
app/                ページ（App Router）
  symptoms/[slug]/  症状別ページ（content/symptoms から生成）
  column/[slug]/    コラム記事（content/columns から生成）
  column/category/[category]/  コラムカテゴリ一覧
  sitemap.ts robots.ts not-found.tsx icon.svg
components/
  layout/           Header / Footer / MobileNav / MobileCtaBar
  sections/         トップページ等のセクション
  content/          SymptomCard / ArticleCard / VoiceCard / SupervisorBox / RedFlagBox / Faq / AccessSection など
  ui/               Breadcrumb / CtaButtons / Photo / PageHero / SectionHeading / JsonLd / Icons
content/
  clinic.ts         院情報（NAP・営業時間・アクセス・院長情報）※表記統一の唯一のソース
  pricing.ts        料金・キャンペーン・保証・リスク注意（金額変更はここだけ）
  images.ts         写真レジストリ（src / width / height / alt）
  symptoms/         症状ページデータ（1症状1ファイル）+ index.ts
  columns/          コラム記事データ（1記事1ファイル）+ index.ts
  voices.ts         お客様の声（既存サイトからご本人の言葉のまま転載）
  faq.ts reasons.ts flow.ts concerns.ts types.ts
lib/
  site.ts seo.ts jsonld.ts markdown.tsx nav.ts utils.ts
scripts/
  optimize-images.mjs  元写真のリネーム・EXIF除去・リサイズ
  audit-html.mjs       ビルド後HTMLの監査（title/description重複、H1、canonical、リンク切れ等）
public/images/      最適化済み写真
_source-photos/     元写真（gitignore）
```

## コンテンツの追加・更新

### 症状ページを追加する

1. `content/symptoms/` に `slug.ts` を作成（既存ファイルをコピーして編集。型は `content/types.ts` の `Symptom`）
2. `content/symptoms/index.ts` の import と配列に追加
3. `npm run build` で `/symptoms/slug` が生成され、sitemap・一覧・関連リンクに自動反映

### コラム記事を追加する

1. `content/columns/` に `slug.ts` を作成（型は `Article`）。本文は簡易Markdown（`##` `###` 見出し、`-` 箇条書き、`1.` 番号、`>` 注記、`**強調**`、`[リンク](/path)`）
2. `content/columns/index.ts` に追加
3. `relatedSymptoms` に症状スラッグを入れると、記事→症状ページの内部リンクが自動で張られます

### 料金・キャンペーンを変更する

`content/pricing.ts` を編集します。キャンペーン終了時は `campaign.enabled: false`。

### 院情報・営業時間を変更する

`content/clinic.ts` を編集します。フッター・アクセス・JSON-LD・各CTAにすべて反映されます。

### 写真を追加する

`_source-photos/` に元写真を置き、`scripts/optimize-images.mjs` のマッピングに追加して `node scripts/optimize-images.mjs _source-photos` を実行、`content/images.ts` に width / height / alt を登録します。

## ビルド後の監査

```bash
NEXT_PUBLIC_SITE_URL=https://example.com npm run build
node scripts/audit-html.mjs
```

title / description の重複、H1 の欠落・重複、canonical、OG、JSON-LD の妥当性、内部リンク切れ、画像リンク切れを一括チェックします。

## 表現上のルール（広告ガイドライン・E-E-A-T）

- 「治る」「完治」「必ず改善」「一回で」「診断」「診療」「専門」「根本改善」などの表現は使わない
- 医療機関を受診すべき目安（レッドフラッグ）を症状ページ・コラムに必ず記載する
- お客様の声には「個人の感想であり結果を保証するものではない」旨を併記する
- 比較優良（○○No.1、雑誌掲載、他院より優れている等）や費用の過度な強調はしない
- 症状解説・コラムは院長（柔道整復師）が監修者として明記される（SupervisorBox）
