import "./globals.css";
import type { ReactNode } from "react";
import Navbar from "./components/navbar/Navbar";
import NoiseOverlay from "./components/common/NoiseOverlay";
import CustomCursor from "./components/common/CustomCursor";
// import CtaSection from "./components/sections/CtaSection";
import Footer from "./components/footer/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative overflow-x-hidden bg-black text-white">
        <NoiseOverlay />
        <CustomCursor />
        <Navbar />
          <main className="relative z-10">
            {children}
          </main>
        {/* <CtaSection /> */}
        <Footer />
      </body>
    </html>
  );
}
