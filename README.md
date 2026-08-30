# 清水接骨院 公式サイト

足立区扇・高野駅徒歩5分の清水接骨院の公式サイト。腰痛・坐骨神経痛など症状別ページ × 専門コラム × 院長の専門性 × 地域性で検索流入を獲得する「SEO資産型」サイトとして設計しています。

- Next.js 16（App Router / Server Components 中心） + TypeScript + Tailwind CSS v4
- 全ページ静的生成（SSG）。外部ライブラリは最小限（表示アニメーションなし、日本語Webフォントなし）
- 画像は `next/image`（AVIF/WebP自動変換）

## セットアップ

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 本番ビルド（型チェック込み）
npm run lint     # ESLint
npm start        # 本番サーバー
```

## 環境変数（`.env.example` 参照）

| 変数 | 必須 | 内容 |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **必須** | 本番URL（末尾スラッシュなし）。未設定だと canonical / OG / sitemap を出力せず、robots.txt は全ページ Disallow、meta robots は noindex になります（プレビュー環境の誤インデックス防止） |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | 任意 | GA4 の測定ID（`G-XXXX`）。本番URL設定時のみ計測タグを出力 |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | 任意 | Search Console の HTML タグ方式トークン。`<meta name="google-site-verification">` として出力 |
| `ANTHROPIC_API_KEY` | 自動投稿のみ | コラム自動生成（GitHub Actions の Secrets に設定） |

Vercel の場合は Project Settings → Environment Variables に Production 用として登録し、再デプロイしてください。

## Search Console / GA4 の登録手順

1. Search Console でプロパティ（URLプレフィックス）を追加 → 「HTMLタグ」の `content` 値を `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` に設定して再デプロイ → 確認
2. Search Console の「サイトマップ」に `https://<本番URL>/sitemap.xml` を送信
3. GA4 でプロパティ作成 → 測定ID を `NEXT_PUBLIC_GA_MEASUREMENT_ID` に設定して再デプロイ
4. Googleビジネスプロフィールの「ウェブサイト」欄に本番URLを設定し、NAP（院名・住所・電話）が `content/clinic.ts` と一致しているか確認

## ディレクトリ構成

```text
app/                ページ（App Router）
  symptoms/[slug]/  症状別ページ（content/symptoms から生成・24症状）
  column/[slug]/    コラム記事（content/columns から生成）
  column/category/[category]/  コラムカテゴリ一覧
  access/koya-station/ access/ogiohashi-station/  駅別の道順ページ
  cases/            施術事例（お客様の声をもとに症状別に整理）
  review/           口コミのお願い（GoogleクチコミQR・LINE QR）
  sitemap.ts robots.ts not-found.tsx icon.svg
components/
  layout/           Header / Footer / MobileNav / MobileCtaBar
  sections/         トップページ等のセクション（Hero は写真を全面表示）
  content/          SymptomCard / ArticleCard / VoiceCard / SupervisorBox / RedFlagBox / Faq / AccessSection / StationGuide / VideoSection など
  ui/               Breadcrumb / CtaButtons / Photo / PageHero / SectionHeading / JsonLd / Icons
content/
  clinic.ts         院情報（NAP・営業時間・アクセス・院長情報・各種リンク）※表記統一の唯一のソース
  pricing.ts        料金・キャンペーン・保証・リスク注意（金額変更はここだけ）
  images.ts         実写真レジストリ（src / width / height / alt）
  images-ai.ts      AI生成イメージ画像レジストリ（scripts/prepare-ai-images.mjs が生成。手で編集しない）
  symptoms/         症状ページデータ（1症状1ファイル）+ index.ts
  columns/          コラム記事データ（1記事1ファイル）+ index.ts + topics.json（自動投稿のキュー）
  cases.ts          施術事例（voices.ts を参照）
  access.ts         駅別道順ページのデータ
  videos.ts         院内・施術動画（YouTube ID。空なら非表示）
  voices.ts faq.ts reasons.ts flow.ts concerns.ts types.ts
lib/                site.ts seo.ts jsonld.ts markdown.tsx nav.ts utils.ts
scripts/
  optimize-images.mjs   実写真のリネーム・EXIF除去・リサイズ
  prepare-ai-images.mjs AI画像の配置・症状別OG画像生成・レジストリ生成
  crop-collages.mjs     コラージュ画像の自動切り出し
  generate-column.mjs   コラム自動生成（Claude API）
  validate-content.mjs  避けるべき表現の検査
  generate-qr.mjs       QRコード（SVG）生成
  audit-html.mjs        ビルド後HTMLの監査
docs/gbp-post-templates.md  Googleビジネスプロフィール投稿テンプレート
public/images/      最適化済み画像
_source-photos/     元写真・元PNG（gitignore）
```

## コンテンツの追加・更新

### 症状ページを追加する

1. `content/symptoms/` に `slug.ts` を作成（既存ファイルをコピーして編集。型は `content/types.ts` の `Symptom`）
2. `content/symptoms/index.ts` の import と配列に追加
3. 必要なら `scripts/prepare-ai-images.mjs` の `ogSymptoms` に OG画像の対応を追加して実行
4. `npm run build` で `/symptoms/slug` が生成され、sitemap・一覧・関連リンク・フッターに自動反映

### コラム記事を追加する（手動）

1. `content/columns/` に `slug.ts` を作成（型は `Article`）。本文は簡易Markdown（`##` `###` 見出し、`-` 箇条書き、`1.` 番号、`>` 注記、`**強調**`、`[リンク](/path)`）
2. `content/columns/index.ts` の `// [auto-import]` `// [auto-list]` の前に追加
3. `relatedSymptoms` に症状スラッグを入れると、記事→症状ページの内部リンクが自動で張られます

### コラム記事の自動投稿（GitHub Actions）

- `.github/workflows/daily-column.yml` が毎日 09:17 JST に `scripts/generate-column.mjs` を実行し、`content/columns/topics.json` の未作成トピックを上から1本生成して main にコミットします
- 生成モデルは `claude-opus-5`（`COLUMN_MODEL` で変更可）。安全性による拒否時はサーバー側フォールバックで別モデルに自動切替します
- 生成物は禁止表現・リンク先の実在・分量・既存記事との類似度を検証し、1つでも失敗すると保存せず終了します
- 設定: リポジトリの Secrets に `ANTHROPIC_API_KEY`、Variables に `NEXT_PUBLIC_SITE_URL`
- トピックを増やすときは `topics.json` に追記。ローカルで試す: `ANTHROPIC_API_KEY=... npm run column:dry-run`
- **公開前に院長が内容を確認する運用を推奨**（自動生成記事のファイル冒頭にその旨のコメントが入ります）

### 料金・キャンペーン / 院情報 / 動画

- 料金: `content/pricing.ts`（キャンペーン終了時は `campaign.enabled: false`）
- 院情報・営業時間・リンク: `content/clinic.ts`（フッター・アクセス・JSON-LD・各CTAにすべて反映）
- 動画: `content/videos.ts` に YouTube の動画IDを追加すると `/about` と `/treatment` に表示

### 画像を追加する

- 実写真: `_source-photos/` に置き、`scripts/optimize-images.mjs` のマッピングに追加して実行、`content/images.ts` に登録
- AI生成画像: `public/images/` に置き、`scripts/prepare-ai-images.mjs` の `singles` に追加して `npm run images:ai`

## ビルド後の監査

```bash
NEXT_PUBLIC_SITE_URL=https://example.com npm run build
npm run audit            # title/description重複、H1、canonical、OG、JSON-LD、リンク切れ、画像切れ
npm run content:validate # 避けるべき表現の検査
```

## 表現上のルール（広告ガイドライン・E-E-A-T）

- 「治る」「完治」「必ず改善」「一回で」「診断」「診療」「専門」「根本改善」などの表現は使わない（`npm run content:validate` で検査）
- 医療機関を受診すべき目安（レッドフラッグ）を症状ページ・コラムに必ず記載する
- お客様の声・施術事例には「個人の感想・経過であり結果を保証するものではない」旨を併記する
- 比較優良（○○No.1、雑誌掲載、他院より優れている等）や費用の過度な強調はしない
- 症状のイラスト・写真はイメージであることを明記する（実在の患者ではない）
- 症状解説・コラムは院長（柔道整復師）が監修者として明記される（SupervisorBox）
