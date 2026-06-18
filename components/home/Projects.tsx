"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Globe } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { useTranslations } from "next-intl";
import { useActiveProjects, usePublishedApps } from "@/lib/projects";
import Image from "next/image";

/* ── Her kartın viewport'a kendi girdiği anda reveal olmasını sağlar ── */
function CardReveal({ children, index }: { children: React.ReactNode; index: number }) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    obs.unobserve(el);
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms`,
            }}
        >
            {children}
        </div>
    );
}

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
                    <span className="font-mono text-sm text-rose-400/40 mr-3 align-middle">/ 02</span>
                    {t("title")}
                </h2>
                <div className="h-1 w-10 bg-rose-500 rounded-full mx-auto md:mx-0 mt-2 opacity-60"></div>
            </div>

            {/* Yayındaki Uygulamalar */}
            {publishedApps && publishedApps.length > 0 && (
                <div className="mb-12 flex flex-col gap-6">
                    {publishedApps.map((app, i) => (
                        <CardReveal key={app.id} index={i}>
                            <div 
                                className="group relative flex flex-col sm:flex-row gap-5 sm:gap-6 p-5 sm:p-6 rounded-3xl bg-transparent border border-border-main hover:bg-surface/40 hover:border-rose-500/30 transition-all duration-500 card-glow border-rotate shine"
                            >
                                {/* Logo */}
                                <div className="flex items-start gap-4 sm:block shrink-0">
                                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl overflow-hidden shadow-sm border border-border-main group-hover:border-rose-400/50 transition-all duration-500 bg-surface">
                                        <Image
                                            src={app.logoUrl}
                                            alt={app.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                
                                {/* İçerik */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-3">
                                        <h3 className="text-lg md:text-xl font-bold text-fg/90 group-hover:text-rose-400 transition-colors">
                                            {app.name}
                                        </h3>
                                    </div>
                                    
                                    <p className="text-sm md:text-base text-muted group-hover:text-fg/70 transition-colors mb-5 leading-relaxed">
                                        {app.description}
                                    </p>
                                    
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            {app.tags?.map((tag, i2) => (
                                                <div key={i2} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface border border-border-main text-[10px] md:text-xs text-muted group-hover:border-accent-30 transition-colors">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-border-main group-hover:bg-rose-400 transition-colors" />
                                                    {tag}
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            {app.stores?.map((store, i2) => (
                                                <Link 
                                                    key={i2}
                                                    href={store.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border-main text-muted hover:text-rose-400 hover:border-rose-500/30 text-xs font-medium transition-all duration-300"
                                                >
                                                    {store.type === "appstore" && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-3.5 h-3.5 fill-current"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                                                    )}
                                                    {store.type === "playstore" && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-3.5 h-3.5 fill-current"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                                                    )}
                                                    {store.type === "web" && <Globe size={14} />}
                                                    <span>
                                                        {store.type === "appstore" ? "App Store" : store.type === "playstore" ? "Play Store" : tCommon("web_sitesi")}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardReveal>
                    ))}
                </div>
            )}

            {/* Diğer Projeler (2'li Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {activeProjects.map((project, index) => (
                    <CardReveal key={project.slug} index={publishedApps.length + index}>
                        <Link
                            href={`/projeler/${project.slug}`}
                            className="group relative flex flex-col justify-between p-5 md:p-6 rounded-3xl bg-transparent border border-border-main hover:bg-surface/40 hover:border-rose-500/30 transition-all duration-500 card-glow border-rotate shine"
                        >
                            <div>
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-base md:text-lg font-bold text-fg/90 group-hover:text-rose-400 transition-colors line-clamp-1">
                                            {project.title}
                                        </h3>
                                        <ArrowUpRight size={16} className="text-muted opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-rose-400 transition-all duration-300 shrink-0" />
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${project.statusColor} whitespace-nowrap shrink-0`}>
                                        {project.status}
                                    </span>
                                </div>
                                
                                <p className="text-sm text-muted group-hover:text-fg/70 transition-colors mb-6 leading-relaxed line-clamp-3">
                                    {project.description}
                                </p>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-2 mt-auto">
                                {project.tags.map((tag, i) => (
                                    <div key={i} className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface border border-border-main text-[10px] text-muted group-hover:border-accent-30 transition-colors">
                                        <span className="w-1.5 h-1.5 rounded-full bg-border-main group-hover:bg-rose-400 transition-colors" />
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </Link>
                    </CardReveal>
                ))}
            </div>
        </section>
    );
}
