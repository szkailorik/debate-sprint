import type { NextConfig } from "next";

// basePath comes from build-time env var so the same source can deploy to:
//   - Cloudflare Pages (debate-sprint.pages.dev / debate.kailorik.com): no env
//     set, so basePath is "" and the site lives at "/"
//   - GitHub Pages (szkailorik.github.io/debate-sprint/): GH Actions workflow
//     sets NEXT_PUBLIC_BASE_PATH=/debate-sprint so assets resolve under that
//     prefix.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
