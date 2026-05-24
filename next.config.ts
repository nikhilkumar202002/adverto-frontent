import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile GSAP for compatibility
  transpilePackages: ["gsap"],
  // Export static HTML to `out/` when building
  output: "export",
  // Disable Image Optimization for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
