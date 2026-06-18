"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/routing";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();
    const t = useTranslations("LanguageSwitcher");
    const nextLocale = locale === "tr" ? "en" : "tr";

    if (!pathname) return null;

    return (
        <Link
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            href={pathname as any}
            locale={nextLocale}
            className="flex items-center justify-center text-sm transition-all duration-300 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-transparent border border-transparent text-muted/60 hover:text-rose-400 hover:border-border-main hover:bg-surface hover:scale-105 flex-shrink-0 font-bold"
            title={locale === "tr" ? t("tooltip_en") : t("tooltip_tr")}
        >
            {locale === "tr" ? "EN" : "TR"}
        </Link>
    );
}
