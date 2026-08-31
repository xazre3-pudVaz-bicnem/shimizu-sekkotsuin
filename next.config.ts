import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 親ディレクトリに別の lockfile があるため、ワークスペースルートを明示
  turbopack: { root: process.cwd() },
  images: {
    formats: ["image/avif", "image/webp"],
    // YouTube サムネイル（content/videos.ts に動画を登録した場合のみ使用）
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      // 重複インデックス防止：Vercel の共有ドメインは本番ドメインへ恒久リダイレクト
      {
        source: "/:path*",
        has: [{ type: "host", value: "shimizu-sekkotsuin.vercel.app" }],
        destination: "https://www.shimizusekkotsuin.jp/:path*",
        permanent: true,
      },
      // 旧サイト（sei-kotsu.com）から移設した場合に備えた受け皿
      { source: "/lp/koshi", destination: "/symptoms/lower-back-pain", permanent: true },
      { source: "/lp/koshi/:path*", destination: "/symptoms/lower-back-pain", permanent: true },
    ];
  },
};

export default nextConfig;
