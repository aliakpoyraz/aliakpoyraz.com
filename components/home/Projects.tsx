"use client";

import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { useTranslations } from "next-intl";
import { useActiveProjects } from "@/lib/projects";

export default function Projects() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
    const t = useTranslations("ActiveProjects");
    const activeProjects = useActiveProjects();

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

            {/* Zaman Çizelgesi Yapısı (Projeler İçin) */}
            <div className="relative flex flex-col gap-12">
                {/* Sürekli Dikey Çizgi */}
                <div className="absolute left-[7px] top-6 bottom-8 w-px bg-zinc-800/60 z-0"></div>

                {activeProjects.map((project, index) => (
                    <Link
                        key={index}
                        href={`/projeler/${project.slug}`}
                        className="group relative flex gap-6 md:gap-8 items-start"
                    >
                        {/* Zaman Noktası */}
                        <div className="relative z-10 flex flex-col items-center mt-2.5">
                            <div className="relative flex h-3.5 w-3.5 shrink-0 rounded-full bg-zinc-800 border-2 border-zinc-700 group-hover:bg-rose-500/50 group-hover:border-rose-400 transition-all duration-500"></div>
                        </div>

                        {/* İçerik */}
                        <div className="flex-1 pb-4">
                            <div className="flex items-center gap-2 mb-3">
                                <h3 className="text-lg md:text-xl font-bold text-zinc-100 group-hover:text-rose-400 transition-colors">
                                    {project.title}
                                </h3>
                                <ArrowUpRight size={16} className="text-zinc-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-rose-400 transition-all duration-300" />
                            </div>
                            
                            <p className="text-sm md:text-base text-zinc-500 group-hover:text-zinc-400 transition-colors mb-5 text-balance leading-relaxed">
                                {project.description}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="flex flex-wrap items-center gap-2 flex-1">
                                    {project.tags.map((tag, i) => (
                                        <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900/50 border border-zinc-800 text-[10px] md:text-xs text-zinc-500 group-hover:border-zinc-700 transition-colors">
                                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-rose-400 transition-colors" />
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