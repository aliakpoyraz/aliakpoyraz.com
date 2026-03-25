"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, GitFork, ArrowUpRight, Github } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    fork: boolean;
}

const GITHUB_USERNAME = "aliakpoyraz";

async function getRepos() {
    try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
            next: { revalidate: 3600 }
        });

        if (!res.ok) return [];

        const data: Repo[] = await res.json();
        
        if (!Array.isArray(data)) return [];

        return data
            .filter(repo => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 4);
            
    } catch (error) {
        console.error("GitHub API Hatası:", error);
        return [];
    }
}

export default function Projects() {
    const [repos, setRepos] = useState<Repo[]>([]);
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

    useEffect(() => {
        getRepos().then(setRepos);
    }, []);

    return (
        <section
            ref={ref}
            className={`w-full max-w-2xl mx-auto mt-6 md:mt-16 px-0 md:px-0 transition-all duration-700 ease-out ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
                }`}
        >

            {/* Başlık Bölümü */}
            <div className="flex items-center justify-between mb-4 px-2">

                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-zinc-950/50 border border-white/10 backdrop-blur-md shadow-lg">
                        <Github className="text-zinc-400" size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-white">
                        Herkese Açık Projeler
                    </h2>
                </div>

                <Link
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    className="text-xs text-zinc-500 hover:text-white flex items-center gap-1 transition-colors bg-white/5 px-3 py-1.5 rounded-full border border-white/5 hover:border-white/10 backdrop-blur-sm"
                >
                    Tümünü Gör <ArrowUpRight size={12} />
                </Link>
            </div>

            <div className="border-b border-zinc-800 mb-6"></div>

            {/* Projeler Listesi */}
            <div className="flex flex-col gap-3">
                {repos.map((repo) => (
                    <Link
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        className="group relative flex items-center justify-between p-5 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl hover:border-white/20 hover:bg-zinc-900/40 transition-all duration-300 shadow-xl"
                    >
                        <div className="flex-1 min-w-0 pr-4">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-base font-semibold text-zinc-200 group-hover:text-white truncate">
                                    {repo.name}
                                </h3>
                                <ArrowUpRight size={14} className="text-zinc-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                            </div>

                            <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors mt-2 text-balance leading-relaxed">
                                {repo.description || "Açıklama yok."}
                            </p>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-zinc-500 flex-shrink-0">
                            {repo.language && (
                                <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/5 backdrop-blur-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                    {repo.language}
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1 hover:text-yellow-500 transition-colors">
                                    <Star size={14} /> {repo.stargazers_count}
                                </span>
                                <span className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                                    <GitFork size={14} /> {repo.forks_count}
                                </span>
                            </div>
                        </div>

                    </Link>
                ))}
            </div>
        </section>
    );
}