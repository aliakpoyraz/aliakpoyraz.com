import Link from "next/link";
import { Star, GitFork, ArrowUpRight, Folder } from "lucide-react";

interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
}

const GITHUB_USERNAME = "aliakpoyraz";

async function getRepos() {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
        next: { revalidate: 3600 }
    });

    if (!res.ok) return [];

    const repos: Repo[] = await res.json();

    return repos
        .filter(repo => !repo.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 4);
}

export default async function Projects() {
    const repos = await getRepos();

    return (
        <section className="w-full max-w-2xl mx-auto mt-16 px-0 md:px-0">

            {/* BAŞLIK VE TÜMÜNÜ GÖR BUTONU */}
            {/* Alt kenarlık kaldırıldı */}
            <div className="flex items-center justify-between mb-4 px-2">

                {/* Sol Taraf: Kutu İkon ve Başlık */}
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                        <Folder className="text-zinc-400" size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-white">
                        Son Projeler
                    </h2>
                </div>

                {/* Sağ Taraf: Link */}
                <Link
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    className="text-xs text-zinc-500 hover:text-white flex items-center gap-1 transition-colors bg-zinc-900/50 px-3 py-1.5 rounded-full border border-zinc-800 hover:border-zinc-600"
                >
                    Tümünü Gör <ArrowUpRight size={12} />
                </Link>
            </div>

            {/* YENİ AYIRICI ÇİZGİ: Başlık ve Liste arasında tam genişlikte çizgi */}
            <div className="border-b border-zinc-800 mb-6"></div>


            {/* LİSTE GÖRÜNÜMÜ */}
            <div className="flex flex-col gap-3">
                {repos.map((repo) => (
                    <Link
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        className="group relative flex items-center justify-between p-5 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-white/10 hover:bg-zinc-800/50 transition-all duration-300"
                    >
                        <div className="flex-1 min-w-0 pr-4">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-base font-semibold text-zinc-200 group-hover:text-white truncate">
                                    {repo.name}
                                </h3>
                                <ArrowUpRight size={14} className="text-zinc-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                            </div>

                            <p className="text-sm text-zinc-500 truncate group-hover:text-zinc-400 transition-colors">
                                {repo.description || "Açıklama yok."}
                            </p>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-zinc-500 flex-shrink-0">
                            {repo.language && (
                                <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-900 border border-zinc-800">
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