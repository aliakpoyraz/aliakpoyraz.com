"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { useTranslations } from "next-intl";

export default function ProfileCard() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
    const t = useTranslations("ProfileCard");
    
    const socialLinks = [
        { icon: <Mail size={18} />, href: "mailto:aliakpoyraz@gmail.com", tKey: "social_email" },
        { icon: <FileText size={18} />, href: "/cv.pdf", tKey: "social_cv" },
        { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/aliakpoyraz", tKey: "social_linkedin" },
        { icon: <Github size={18} />, href: "https://github.com/aliakpoyraz", tKey: "social_github" },
    ];

    return (
        <div
            ref={ref}
            className={`relative w-full max-w-2xl mx-auto group transition-all duration-1000 ease-out px-4 md:px-0 ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
                }`}
        >
            <div className="relative space-y-8 md:space-y-10 pb-12 md:pb-16 border-b border-border-main">
                
                {/* Başlık Bölümü: İsim ve Ünvan */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-center md:text-left">
                    <div className="space-y-6 w-full">
                        <div className="space-y-3">
                            <p className="text-rose-400 text-sm md:text-xs font-bold tracking-[0.2em] uppercase animate-pulse">
                                {t("greeting")}
                            </p>
                            <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-fg transition-colors leading-[0.9]">
                                Ali <span className="text-rose-500">AKPOYRAZ</span>
                            </h1>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                                <span className="text-muted text-sm md:text-base font-medium">
                                    {t("title")} <span className="opacity-20 mx-1">/</span> {t("subtitle_student")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Biyografi Bölümü */}
                <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left">
                    <p className="text-muted leading-relaxed text-base md:text-lg transition-colors font-medium">
                        {t("bio_1")}
                        <span className="block h-4 md:h-6"></span>
                        {t("bio_2")}
                    </p>
                </div>

                {/* Alt Bölüm: Sosyal Medya Linkleri */}
                <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-8 pt-4 md:pt-6">
                    <div className="flex items-center justify-center gap-3">
                        {socialLinks.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-12 h-12 md:w-11 md:h-11 rounded-2xl bg-surface border border-border-main text-muted hover:text-rose-400 hover:border-rose-500/30 hover:shadow-lg hover:shadow-rose-500/5 transition-all duration-300"
                                title={t(item.tKey)}
                            >
                                {item.icon}
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}