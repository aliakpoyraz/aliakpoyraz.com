import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "../components/home/Navbar";
import ScrollToTop from "../components/home/ScrollToTop";
import Footer from "../components/home/Footer";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Ali Akpoyraz",
  description: "Kişisel Website",

  // Favicon ve Cache-Busting Ayarı
  icons: {
    icon: '/favicon.png',
  },
};
// -----------------------------

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <ScrollToTop />
        <main className="flex-1 pt-28 min-h-screen px-4 md:px-0">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>

    </html>
  );
}