import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import MainLayout from "../../components/layout/MainLayout";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/routing";
import { notFound } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://aliakpoyraz.com"),
  title: "Ali Akpoyraz | Yazılım Mühendisi",
  description: "Ben Ali Akpoyraz, yazılım mühendisliği öğrencisiyim. Bu sitede projelerimi, blog yazılarını ve kişisel deneyimlerimi paylaşıyorum.",
  keywords: ["Ali Akpoyraz", "Yazılım Mühendisi", "Software Engineer", "Öğrenci", "React", "Next.js", "Swift", "Blog", "Portfolyo"],
  authors: [{ name: "Ali Akpoyraz", url: "https://aliakpoyraz.com" }],
  creator: "Ali Akpoyraz",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://aliakpoyraz.com",
    title: "Ali Akpoyraz | Yazılım Mühendisi",
    description: "Ben Ali Akpoyraz, yazılım mühendisliği öğrencisiyim. Bu sitede projelerimi, blog yazılarını ve kişisel deneyimlerimi paylaşıyorum.",
    siteName: "Ali Akpoyraz",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ali Akpoyraz | Yazılım Mühendisi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Akpoyraz | Yazılım Mühendisi",
    description: "Ben Ali Akpoyraz, yazılım mühendisliği öğrencisiyim. Bu sitede projelerimi, blog yazılarını ve kişisel deneyimlerimi paylaşıyorum.",
    images: ["/og-image.png"],
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const resolvedParams = await params;
  if (!routing.locales.includes(resolvedParams.locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={resolvedParams.locale}>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <MainLayout>{children}</MainLayout>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}