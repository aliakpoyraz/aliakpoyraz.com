import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import MainLayout from "@/components/layout/MainLayout";
import ThemeProvider from "@/components/layout/ThemeProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/routing";
import { notFound } from "next/navigation";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Site");

  return {
    metadataBase: new URL("https://aliakpoyraz.com"),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(", "),
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
      title: t("title"),
      description: t("description"),
      siteName: "Ali Akpoyraz",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og-image.png"],
    },
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#ffffff' },
      { media: '(prefers-color-scheme: dark)', color: '#080808' },
    ],
  };
}

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
      <body className={`${spaceGrotesk.className} antialiased min-h-screen bg-ambient`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <MainLayout>{children}</MainLayout>
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
