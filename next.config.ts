import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile GSAP for compatibility
  transpilePackages: ["gsap"],
  // Export static HTML to `out/` when building
  output: "export",
  // Disable Image Optimization for static export
  images: {
    unoptimized: true,
    qualities: [72, 75],
  },
};

export default nextConfig;
