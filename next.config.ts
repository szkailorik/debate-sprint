import type { NextConfig } from "next";

// Custom domain debate.kailorik.com is served from the project root, so basePath
// is empty. The old https://szkailorik.github.io/debate-sprint/ URL keeps
// working — GitHub auto-redirects it to the custom domain.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
