import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@prismqr/ui-web", "@prismqr/db"],
};

export default nextConfig;
