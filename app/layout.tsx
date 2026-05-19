import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import NoiseOverlay from "./components/common/NoiseOverlay";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative overflow-x-hidden bg-black text-white">
        <NoiseOverlay />
        <Navbar />
          <main className="relative z-10">
            {children}
          </main>
      </body>
    </html>
  );
}