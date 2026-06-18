"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const t = useTranslations("ScrollToTop");

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", toggleVisibility, { passive: true });
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={scrollToTop}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToTop(); }}
            className={`
        fixed bottom-24 right-4 xl:bottom-8 xl:right-8 z-50 p-3 rounded-full 
        bg-surface/80 border border-border-main text-fg shadow-xl backdrop-blur-md
        transition-all duration-500 hover:bg-accent-10 hover:text-rose-400 hover:scale-110 hover:-translate-y-1
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
      `}
            aria-label={t("aria_label")}
        >
            <ArrowUp size={20} />
            <div className="absolute inset-0 -z-10 rounded-full bg-accent-10 blur-md group-hover:bg-accent-20 transition-colors" />
        </button>
    );
}
