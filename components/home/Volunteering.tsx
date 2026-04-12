"use client";

import { Heart, Users, Megaphone } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { useTranslations } from "next-intl";

export default function Volunteering() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
    const t = useTranslations("Volunteering");

    const volunteers = [
        {
            role: t("gdg_role"),
            organization: t("gdg_org"),
            date: t("gdg_date"),
            description: t("gdg_desc"),
            icon: <Users size={16} />,
        },
        {
            role: t("gezi_role"),
            organization: t("gezi_org"),
            date: t("gezi_date"),
            description: t("gezi_desc"),
            icon: <Megaphone size={16} />,
        },
        {
            role: t("seo_role"),
            organization: t("seo_org"),
            date: t("seo_date"),
            description: t("seo_desc"),
            icon: <Heart size={16} />,
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
                <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                    {t("title")}
                </h2>
                <div className="h-1 w-10 bg-rose-500 rounded-full mx-auto md:mx-0 mt-2 opacity-60"></div>
            </div>

            {/* Zaman Çizelgesi */}
            <div className="relative flex flex-col gap-12">
                {/* Sürekli Dikey Çizgi */}
                <div className="absolute left-[7px] top-6 bottom-8 w-px bg-zinc-800/60 z-0"></div>

                {volunteers.map((item, index) => (
                    <div
                        key={index}
                        className="group relative flex gap-6 md:gap-8 items-start"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? "translateY(0)" : "translateY(16px)",
                            transition: `opacity 0.5s ease ${index * 120}ms, transform 0.5s ease ${index * 120}ms`,
                        }}
                    >
                        {/* Zaman Noktası */}
                        <div className="relative z-10 flex flex-col items-center mt-1.5">
                            <div className="relative flex h-3.5 w-3.5 shrink-0 rounded-full bg-zinc-800 border-2 border-zinc-700 group-hover:bg-rose-500/50 group-hover:border-rose-400 transition-all duration-500"></div>
                        </div>

                        {/* İçerik */}
                        <div className="flex-1 pb-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                                <h3 className="text-lg md:text-xl font-bold text-zinc-100 group-hover:text-white transition-colors">
                                    {item.role}
                                </h3>
                                <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full w-fit backdrop-blur-md bg-zinc-900 border border-zinc-800 text-zinc-500 transition-colors group-hover:text-zinc-300">
                                    {item.date}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm mb-4">
                                <span className="flex items-center gap-2 text-zinc-400 group-hover:text-rose-400 font-bold transition-colors">
                                    {item.icon}
                                    <span>{item.organization}</span>
                                </span>
                            </div>

                            <p className="text-sm md:text-base text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}