import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 親ディレクトリに別の lockfile があるため、ワークスペースルートを明示
  turbopack: { root: process.cwd() },
  images: {
    formats: ["image/avif", "image/webp"],
    // YouTube サムネイル（content/videos.ts に動画を登録した場合のみ使用）
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536],
    imageSizes: [96, 128, 260, 360, 448],
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
