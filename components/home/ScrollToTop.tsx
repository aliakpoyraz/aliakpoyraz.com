"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";

const CIRCLE_RADIUS = 16;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const t = useTranslations("ScrollToTop");

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

            setIsVisible(scrollY > 300);

            if (scrollHeight > 0) {
                setProgress(Math.min(100, (scrollY / scrollHeight) * 100));
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const offset = CIRCLE_CIRCUMFERENCE - (progress / 100) * CIRCLE_CIRCUMFERENCE;

    return (
        <button
            onClick={scrollToTop}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToTop(); }}
            className={`
                fixed bottom-24 right-4 xl:bottom-8 xl:right-8 z-50 rounded-full
                bg-surface/80 border border-border-main text-fg shadow-xl backdrop-blur-md
                transition-all duration-500 hover:bg-accent-10 hover:text-rose-400 hover:scale-110 hover:-translate-y-1
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
            `}
            aria-label={t("aria_label")}
        >
            <svg
                className="absolute inset-0 -rotate-90"
                width="100%"
                height="100%"
                viewBox="0 0 40 40"
            >
                <circle
                    cx="20"
                    cy="20"
                    r={CIRCLE_RADIUS}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-border-main"
                />
                <circle
                    cx="20"
                    cy="20"
                    r={CIRCLE_RADIUS}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="text-rose-400 transition-[stroke-dashoffset] duration-200 ease-out"
                    strokeDasharray={CIRCLE_CIRCUMFERENCE}
                    strokeDashoffset={offset}
                />
            </svg>
            <div className="relative p-3">
                <ArrowUp size={20} />
            </div>
        </button>
    );
}
