import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import MainLayout from "../components/layout/MainLayout";

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
        <MainLayout>{children}</MainLayout>
        <Analytics />
      </body>
    </html>
  );
}