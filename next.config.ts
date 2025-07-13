import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 開発時のパフォーマンス改善
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
  },
  // プリコンパイル設定
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
