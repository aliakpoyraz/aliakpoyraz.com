"use client";

import { BriefcaseBusiness, Calendar, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { useTranslations } from "next-intl";

export default function Experience() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
    const t = useTranslations("Experience");

    const experiences = [
        {
            company: "AktifTech (AktifBank A.Ş.)",
            url: "https://www.aktiftech.com",
            role: t("aktif_tech_role"),
            date: t("aktif_tech_date"),
            location: t("aktif_tech_location"),
            description: t("aktif_tech_desc"),
            tech: ["Agile", "SDLC", "SDTC", "QA", "Test Yönetimi"],
            current: false,
        },
        {
            company: "Kayısır",
            url: "https://www.kayisir.com",
            role: t("kayisir_role"),
            date: t("kayisir_date"),
            location: t("kayisir_location"),
            description: t("kayisir_desc"),
            tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
            current: true,
        },
        {
            company: "SwordSec Siber Güvenlik",
            url: "https://www.swordsec.com",
            role: t("swordsec_role"),
            date: t("swordsec_date"),
            location: t("swordsec_location"),
            description: t("swordsec_desc"),
            tech: ["Python", "Nmap", "Burpsuite", "Metasploit"],
            current: false,
        },
        {
            company: "Toya Yazılım (ToyaPOS)",
            url: "https://www.toyayazilim.com.tr",
            role: t("toya_role"),
            date: t("toya_date"),
            location: t("toya_location"),
            description: t("toya_desc"),
            tech: ["JavaScript", "HTML", "CSS"],
            current: false,
        },
    ];

    return (
        <section
            ref={ref}
            className={`w-full max-w-2xl mx-auto mt-12 md:mt-24 transition-all duration-700 ease-out ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
                }`}
        >
            <div className="mb-10 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-extrabold text-fg tracking-tight transition-colors">
                    {t("title")}
                </h2>
                <div className="h-1 w-10 bg-rose-500 rounded-full mx-auto md:mx-0 mt-2 opacity-60"></div>
            </div>

            {/* Zaman Çizelgesi */}
            <div className="relative flex flex-col gap-12">
                {/* Sürekli Dikey Çizgi */}
                <div className="absolute left-[7px] top-6 bottom-8 w-px bg-border-main z-0"></div>

                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className="group experience-item relative flex gap-6 md:gap-8 items-start"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? "translateY(0)" : "translateY(16px)",
                            transition: `opacity 0.5s ease ${index * 120}ms, transform 0.5s ease ${index * 120}ms`,
                        }}
                    >
                        {/* Zaman Noktası */}
                        <div className="relative z-10 flex flex-col items-center mt-1.5">
                            <div className={`
                                timeline-dot relative flex h-3.5 w-3.5 shrink-0 rounded-full transition-all duration-500
                                ${exp.current
                                    ? "bg-rose-500 shadow-[0_0_15px_rgba(251,113,133,0.5)] scale-110"
                                    : "bg-surface border-2 border-border-main"}
                            `}>
                                {exp.current && <div className="absolute inset-0 rounded-full bg-rose-400 animate-ping opacity-75"></div>}
                            </div>
                        </div>

                        {/* Kart İçeriği */}
                        <div className="flex-1 pb-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                                <h3 className="text-lg md:text-xl font-bold text-fg/90 group-hover:text-fg transition-colors">
                                    {exp.role}
                                </h3>
                                <div className={`flex items-center gap-1.5 text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full w-fit backdrop-blur-md transition-all ${exp.current ? "bg-accent-10 text-rose-400 border border-accent-20" : "bg-surface border border-border-main text-muted group-hover:text-fg/80"}`}>
                                    <Calendar size={12} className={exp.current ? "text-rose-400" : "text-muted"} />
                                    {exp.date}
                                </div>
                            </div>

                            {/* Şirket Bilgisi */}
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm mb-4">
                                {exp.url ? (
                                    <a
                                        href={exp.url}
                                        target="_blank"
                                        rel="noopener noreferrer nofollow"
                                        className="company-name font-bold text-muted/80 group-hover:text-rose-400 transition-all duration-300"
                                    >
                                        {exp.company}
                                    </a>
                                ) : (
                                    <span className="company-name font-bold text-muted/80 transition-all duration-300">{exp.company}</span>
                                )}
                                <span className="flex items-center gap-1.5 text-muted font-medium">
                                    <MapPin size={14} className="opacity-60" /> {exp.location}
                                </span>
                            </div>

                            <p className="text-sm md:text-base text-muted leading-relaxed mb-5 group-hover:text-fg/70 transition-colors">
                                {exp.description}
                            </p>

                            {/* Kullanılan Teknolojiler */}
                            <div className="flex flex-wrap gap-2">
                                {exp.tech.map((t, i) => (
                                    <span
                                        key={i}
                                        className="px-2.5 py-1 text-[10px] md:text-xs font-medium rounded-md bg-surface border border-border-main text-muted group-hover:border-accent-30 group-hover:text-rose-400 transition-all backdrop-blur-sm"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}