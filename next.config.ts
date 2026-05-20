import type { NextConfig } from "next";

// Served from https://szkailorik.github.io/debate-sprint/ via GitHub Pages.
// Custom domain debate.kailorik.com is parked until the Cloudflare DNS is
// repointed away from debate-sprint.pages.dev to szkailorik.github.io.
const isProd = process.env.NODE_ENV === "production";
const repo = "debate-sprint";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
