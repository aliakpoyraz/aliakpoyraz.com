"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/routing";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();
    const nextLocale = locale === "tr" ? "en" : "tr";

    // Blog is accessible without prefix normally, but next-intl Link handles it.
    // Ensure we don't crash without pathname.
    if (!pathname) return null;

    return (
        <Link
            href={pathname as any}
            locale={nextLocale}
            className="flex items-center justify-center text-lg sm:text-xl transition-all duration-300 w-[34px] h-[34px] sm:w-10 sm:h-10 xl:w-11 xl:h-11 rounded-xl bg-zinc-950/50 border border-white/5 hover:border-white/10 hover:bg-zinc-900/50 hover:scale-110 flex-shrink-0"
            title={locale === "tr" ? "Switch to English" : "Türkçe'ye Geç"}
        >
            {locale === "tr" ? "🇬🇧" : "🇹🇷"}
        </Link>
    );
}
