import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SideNav from "../components/home/SideNav";
import ScrollToTop from "../components/home/ScrollToTop";
import Footer from "../components/home/Footer";
import Background from "../components/home/Background";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Ali Akpoyraz",
  description: "Kişisel Website",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} antialiased`}>
        <Background />
        <SideNav />
        <ScrollToTop />
        <main className="relative z-10 flex-1 pt-6 md:pt-28 pb-24 xl:pb-0 min-h-screen px-4 md:px-0">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>

    </html>
  );
}