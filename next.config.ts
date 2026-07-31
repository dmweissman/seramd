import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Routes from the previous site concept; preserved as redirects so old
    // shared links land on the current experience.
    return ["/clinical", "/partnerships", "/company", "/charter"].map((source) => ({
      source,
      destination: "/",
      permanent: false,
    }));
  },
};

export default nextConfig;
