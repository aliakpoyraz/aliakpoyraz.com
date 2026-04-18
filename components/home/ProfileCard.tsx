"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { useTranslations } from "next-intl";

export default function ProfileCard() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
    const t = useTranslations("ProfileCard");
    const [activeTab, setActiveTab] = useState<"languages" | "tools" | "others">("languages");

    const socialLinks = [
        { icon: <Mail size={18} />, href: "mailto:aliakpoyraz@gmail.com", tKey: "social_email" },
        { icon: <FileText size={18} />, href: "/cv.pdf", tKey: "social_cv" },
        { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/aliakpoyraz", tKey: "social_linkedin" },
        { icon: <Github size={18} />, href: "https://github.com/aliakpoyraz", tKey: "social_github" },
    ];

    const stackData = {
        languages: ["Swift", "C#", "SQL", "Javascript"],
        tools: ["SwiftUI", "Node.js", "Next.js", "Supabase", "Firebase", "Postman", "Git", "Vercel"],
        others: ["HTML", "CSS", "Linux", "Seo"]
    };

    return (
        <div
            ref={ref}
            className={`relative w-full max-w-2xl mx-auto group transition-all duration-1000 ease-out px-4 md:px-0 ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
                }`}
        >
            <div className="relative space-y-10 md:space-y-12 pb-12 md:pb-16 border-b border-border-main">

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
                <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left text-muted leading-relaxed text-base md:text-lg font-medium">
                    <p>{t("bio_1")}</p>
                    <p className="mt-4">{t("bio_2")}</p>
                </div>

                {/* Terminal v2: Çerçeveli & MacOS Kontrollü Dikey Düzen */}
                <div className="w-full max-w-xl mx-auto md:mx-0">
                    <div className="bg-surface border border-border-main rounded-xl overflow-hidden shadow-2xl shadow-rose-500/5 transition-all duration-500 hover:border-rose-500/20">

                        {/* MacOS Style Header */}
                        <div className="bg-border-main/20 px-4 py-3 flex items-center gap-4 border-b border-border-main">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/40 border border-red-500/20" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/40 border border-yellow-500/20" />
                                <div className="w-3 h-3 rounded-full bg-green-500/40 border border-green-500/20" />
                            </div>
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-muted/60">
                                {t("stack_label")}
                            </span>
                        </div>

                        {/* Internal Navigation / Tabs */}
                        <div className="flex flex-nowrap items-center justify-center md:justify-start gap-x-6 md:gap-x-8 px-2 md:px-6 py-4 border-b border-border-main/30 overflow-hidden">
                            {(Object.keys(stackData) as Array<keyof typeof stackData>).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`text-[10px] md:text-xs font-black tracking-[0.2em] uppercase transition-all duration-300 relative py-1 flex-shrink-0 ${activeTab === key
                                            ? "text-rose-500"
                                            : "text-muted/40 hover:text-fg/60"
                                        }`}
                                >

                                    {t(`stack_tabs.${key}`)}
                                    {activeTab === key && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rose-500 rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Dikey Liste (Numarasız) */}
                        <div className="p-6 md:p-8 min-h-[160px] flex flex-col gap-3 font-mono">
                            {stackData[activeTab].map((item, index) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-4 group/item"
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? "translateY(0)" : "translateY(8px)",
                                        transition: `all 0.4s ease ${index * 50}ms`
                                    }}
                                >
                                    <span className="text-rose-500/80 font-black text-xs select-none">
                                        &gt;
                                    </span>
                                    <span className="text-sm md:text-base font-bold text-fg/80 group-hover/item:text-rose-400 transition-colors duration-300 tracking-tight">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Alt Bölüm: Sosyal Medya Linkleri */}
                <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-8 pt-4">
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