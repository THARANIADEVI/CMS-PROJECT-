import type { NextConfig } from "next";

const ADMIN_ORIGIN = "https://cms-project-1-22fq.onrender.com";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/admin", destination: `${ADMIN_ORIGIN}/` },
      { source: "/admin/:path*", destination: `${ADMIN_ORIGIN}/:path*` },
      { source: "/assets/:path*", destination: `${ADMIN_ORIGIN}/assets/:path*` },
      { source: "/favicon.svg", destination: `${ADMIN_ORIGIN}/favicon.svg` },
    ];
  },
};

export default nextConfig;
