import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "./components/navbar/Navbar";
import NoiseOverlay from "./components/common/NoiseOverlay";
import CustomCursor from "./components/common/CustomCursor";
import Preloader from "./components/common/Preloader";
// import CtaSection from "./components/sections/CtaSection";
import Footer from "./components/footer/Footer";

export const metadata: Metadata = {
  title: {
    default: "Adverto | Creative Advertising Agency",
    template: "%s | Adverto",
  },
  description:
    "Adverto is a creative advertising agency building brands, campaigns, films, and social media experiences for ambitious businesses.",
  icons: {
    icon: "/main_icon-02.svg",
    shortcut: "/main_icon-02.svg",
    apple: "/main_icon-02.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="relative overflow-x-hidden bg-black text-white">
        <Preloader />
        <NoiseOverlay />
        <CustomCursor />
        <Navbar />
          <main className="relative z-10 min-h-[100svh]">
            {children}
          </main>
        {/* <CtaSection /> */}
        <Footer />
      </body>
    </html>
  );
}
