import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages. In dev we skip it so /api/* can be
  // proxied to `wrangler pages dev` (rewrites aren't allowed with `export`).
  output: isDev ? undefined : "export",
  images: {
    unoptimized: true,
  },
  ...(isDev && {
    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination: "http://localhost:8788/api/:path*",
        },
      ];
    },
  }),
};

export default nextConfig;
