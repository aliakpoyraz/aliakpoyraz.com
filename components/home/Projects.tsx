"use client";

import Link from "next/link";
import { ArrowUpRight, Globe } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { useTranslations } from "next-intl";
import { useActiveProjects, usePublishedApps } from "@/lib/projects";
import Image from "next/image";

export default function Projects() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
    const t = useTranslations("ActiveProjects");
    const tCommon = useTranslations("Projects");
    const activeProjects = useActiveProjects();
    const publishedApps = usePublishedApps();

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

            {/* Yayındaki Uygulamalar */}
            {publishedApps && publishedApps.length > 0 && (
                <div className="mb-16 flex flex-col gap-6">
                    {publishedApps.map((app) => (
                        <div 
                            key={app.id} 
                            className="group relative flex gap-6 md:gap-8 items-start p-5 sm:p-6 rounded-3xl bg-transparent border border-border-main hover:bg-surface/40 hover:border-rose-500/30 transition-all duration-500"
                        >
                            {/* Logo */}
                            <div className="relative z-10 flex flex-col items-center mt-1">
                                <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-xl overflow-hidden shadow-sm border border-border-main group-hover:border-rose-400/50 transition-all duration-500 bg-surface">
                                    <Image
                                        src={app.logoUrl}
                                        alt={app.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            
                            {/* İçerik */}
                            <div className="flex-1 pb-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <h3 className="text-lg md:text-xl font-bold text-fg/90 group-hover:text-rose-400 transition-colors">
                                        {app.name}
                                    </h3>
                                </div>
                                
                                {/* Description tam genişliği kaplıyor ve sağdan butonlarla aynı pikselde bitiyor */}
                                <p className="text-sm md:text-base text-muted group-hover:text-fg/70 transition-colors mb-5 leading-relaxed w-full text-justify">
                                    {app.description}
                                </p>
                                
                                {/* Alt Kısım: Tags (Solda) & Butonlar (Sağda) */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        {app.tags?.map((tag, i) => (
                                            <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface border border-border-main text-[10px] md:text-xs text-muted group-hover:border-accent-30 transition-colors">
                                                <span className="w-1.5 h-1.5 rounded-full bg-border-main group-hover:bg-rose-400 transition-colors" />
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-2 shrink-0">
                                        {app.stores?.map((store, i) => (
                                            <Link 
                                                key={i}
                                                href={store.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border-main text-fg/80 hover:bg-rose-500 hover:border-rose-500 hover:text-white font-medium text-xs transition-all duration-300 shadow-sm"
                                            >
                                                {store.type === "appstore" && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-3.5 h-3.5 fill-current"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                                                )}
                                                {store.type === "playstore" && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-3.5 h-3.5 fill-current"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                                                )}
                                                {store.type === "web" && <Globe size={14} />}
                                                <span className="whitespace-nowrap">
                                                    {store.type === "appstore" ? "App Store" : store.type === "playstore" ? "Play Store" : tCommon("web_sitesi")}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Zaman Çizelgesi Yapısı (Projeler İçin) */}
            <div className="relative flex flex-col gap-12">
                {/* Sürekli Dikey Çizgi */}
                <div className="absolute left-[7px] top-6 bottom-8 w-px bg-border-main z-0"></div>

                {activeProjects.map((project, index) => (
                    <Link
                        key={index}
                        href={`/projeler/${project.slug}`}
                        className="group relative flex gap-6 md:gap-8 items-start"
                    >
                        {/* Zaman Noktası */}
                        <div className="relative z-10 flex flex-col items-center mt-2.5">
                            <div className="relative flex h-3.5 w-3.5 shrink-0 rounded-full bg-surface border-2 border-border-main group-hover:bg-rose-500/50 group-hover:border-rose-400 transition-all duration-500"></div>
                        </div>

                        {/* İçerik */}
                        <div className="flex-1 pb-4">
                            <div className="flex items-center gap-2 mb-3">
                                <h3 className="text-lg md:text-xl font-bold text-fg/90 group-hover:text-rose-400 transition-colors">
                                    {project.title}
                                </h3>
                                <ArrowUpRight size={16} className="text-muted opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-rose-400 transition-all duration-300" />
                            </div>
                            
                            <p className="text-sm md:text-base text-muted group-hover:text-fg/70 transition-colors mb-5 text-balance leading-relaxed">
                                {project.description}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="flex flex-wrap items-center gap-2 flex-1">
                                    {project.tags.map((tag, i) => (
                                        <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface border border-border-main text-[10px] md:text-xs text-muted group-hover:border-accent-30 transition-colors">
                                            <span className="w-1.5 h-1.5 rounded-full bg-border-main group-hover:bg-rose-400 transition-colors" />
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                                <span className={`text-[10px] md:text-xs font-bold px-3 py-1 rounded-full border ${project.statusColor} whitespace-nowrap w-fit`}>
                                    {project.status}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}