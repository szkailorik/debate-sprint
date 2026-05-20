import type { NextConfig } from "next";

// Deployed to Cloudflare Pages → debate-sprint.pages.dev + debate.kailorik.com.
// Both serve from "/", so no basePath. (GitHub Pages URL is no longer the
// primary; that deploy still runs but the URL won't fully work without
// basePath — acceptable since CF Pages is canonical now.)
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
