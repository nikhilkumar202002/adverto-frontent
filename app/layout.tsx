import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import NoiseOverlay from "./components/common/NoiseOverlay";
import CustomCursor from "./components/common/CustomCursor";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative overflow-x-hidden bg-black text-white">
        <NoiseOverlay />
        <CustomCursor />
        <Navbar />
          <main className="relative z-10">
            {children}
          </main>
      </body>
    </html>
  );
}