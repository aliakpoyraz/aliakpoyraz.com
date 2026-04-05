"use client";

import Link from "next/link";
import { ArrowUpRight, Activity } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

import { activeProjects } from "@/lib/projects";

export default function ActiveProjects() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

    return (
        <section
            ref={ref}
            className={`w-full max-w-2xl mx-auto mt-6 md:mt-16 px-0 md:px-0 transition-all duration-700 ease-out ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
                }`}
        >
            {/* Başlık */}
            <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-zinc-950/50 border border-white/10 backdrop-blur-md shadow-lg">
                        <Activity className="text-zinc-400" size={20} />
                    </div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold text-white">
                            Aktif Çalışmalar
                        </h2>
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="border-b border-zinc-800 mb-6"></div>

            {/* İçerik Listesi */}
            <div className="flex flex-col gap-3">
                {activeProjects.map((project, index) => (
                    <Link
                        key={index}
                        href={`/projeler/${project.slug}`}
                        className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-4 p-5 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl hover:border-white/20 hover:bg-zinc-900/40 transition-all duration-300 shadow-xl"
                    >
                        <div className="flex-1 min-w-0 pr-0 sm:pr-4 w-full">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-base font-semibold text-zinc-200 group-hover:text-white truncate">
                                    {project.title}
                                </h3>
                                <ArrowUpRight size={14} className="text-zinc-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                            </div>

                            <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors mt-2 text-balance leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        <div className="flex flex-row items-center justify-between sm:justify-end gap-4 text-xs text-zinc-500 flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0 pt-3 border-t border-white/5 sm:pt-0 sm:border-none">
                            <div className="flex flex-wrap items-center gap-2">
                                {project.tags.map((tag, i) => (
                                    <div key={i} className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/5 backdrop-blur-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                                        {tag}
                                    </div>
                                ))}
                            </div>

                            <span className={`text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-lg border ${project.statusColor} whitespace-nowrap`}>
                                {project.status}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
