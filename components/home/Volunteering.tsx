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
                <h2 className="text-2xl md:text-3xl font-extrabold text-fg tracking-tight transition-colors">
                    <span className="font-mono text-sm text-rose-400/40 mr-3 align-middle">/ 03</span>
                    {t("title")}
                </h2>
                <div className="h-1 w-10 bg-rose-500 rounded-full mx-auto md:mx-0 mt-2 opacity-60"></div>
            </div>

            {/* Bağımsız Kart (Card) Yapısı - Timeline Çizgisi Kaldırıldı */}
            <div className="flex flex-col gap-5">
                {volunteers.map((item, index) => (
                    <div
                        key={index}
                        className="group relative flex flex-col p-5 md:p-6 rounded-3xl bg-transparent border border-border-main hover:bg-surface/40 hover:border-rose-500/30 transition-all duration-500 card-glow"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? "translateY(0)" : "translateY(16px)",
                            transition: `opacity 0.5s ease ${index * 120}ms, transform 0.5s ease ${index * 120}ms`,
                        }}
                    >
                        {/* Üst Bilgi: Rol ve Tarih */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
                            <h3 className="text-lg font-bold text-fg/90 group-hover:text-rose-400 transition-colors">
                                {item.role}
                            </h3>
                            <span className="flex items-center text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full border border-border-main text-muted whitespace-nowrap bg-surface group-hover:text-fg/80 transition-colors">
                                {item.date}
                            </span>
                        </div>

                        {/* Alt Bilgi: Organizasyon ve İkon */}
                        <div className="flex items-center gap-2 text-sm mb-4">
                            <span className="flex items-center gap-2 text-muted font-medium group-hover:text-fg/90 transition-colors">
                                <span className="text-rose-400/80 group-hover:text-rose-500 transition-colors">
                                    {item.icon}
                                </span>
                                <span>{item.organization}</span>
                            </span>
                        </div>

                        {/* Açıklama */}
                        <p className="text-sm md:text-base text-muted leading-relaxed group-hover:text-fg/70 transition-colors text-justify md:text-left">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}