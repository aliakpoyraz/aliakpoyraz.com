"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, Calendar, Clock, ArrowUpRight, BookOpen } from 'lucide-react';

interface Post {
    slug: string;
    title: string;
    date: string;
    description: string;
    readingTime: string;
    content: string;
}

export default function BlogList({ posts }: { posts: Post[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const query = searchQuery.toLowerCase();

    // 1. GRUP: Başlık Eşleşmeleri
    const titleMatches = posts.filter((post) =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query)
    );

    // 2. GRUP: Sadece İçerik Eşleşmeleri
    const contentMatches = posts.filter((post) => {
        const inTitle = post.title.toLowerCase().includes(query) || post.description.toLowerCase().includes(query);
        const inContent = post.content.toLowerCase().includes(query);
        return !inTitle && inContent;
    });

    const hasAnyResult = titleMatches.length > 0 || contentMatches.length > 0;

    // Kart Render Fonksiyonu
    const renderPostCard = (post: Post, isContentMatch = false) => (
        <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group relative w-full block"
        >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700 rounded-[2rem] opacity-20 blur group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

            <div className="relative h-full flex flex-col p-6 sm:p-8 rounded-[1.7rem] bg-[#0c0c0e] border border-white/5 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <h2 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors leading-snug">
                            {post.title}
                        </h2>
                        <ArrowUpRight
                            size={22}
                            className="text-zinc-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0"
                        />
                    </div>

                    {post.description && (
                        <p className="text-base text-zinc-500 leading-relaxed line-clamp-2 mb-6 group-hover:text-zinc-400 transition-colors">
                            {post.description}
                        </p>
                    )}

                    {isContentMatch && searchQuery && (
                        <div className="mb-4 text-xs text-indigo-400 font-mono bg-indigo-500/10 px-2 py-1 rounded w-fit border border-indigo-500/20">
                            ✨ İçerikte &quot;{searchQuery}&quot; geçiyor
                        </div>
                    )}

                    <div className="flex items-center gap-3 text-xs font-medium text-zinc-500 font-mono mt-auto pt-4 border-t border-zinc-800/50 w-full">
                        <div className="flex items-center gap-1.5 bg-zinc-900/50 px-2.5 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
                            <Calendar size={12} />
                            <span>{post.date}</span>
                        </div>

                        <div className="flex items-center gap-1.5 bg-zinc-900/50 px-2.5 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
                            <Clock size={12} />
                            <span>{post.readingTime}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );

    return (
        <section className="w-full max-w-2xl mx-auto mt-32 px-4 mb-20 animate-in fade-in zoom-in duration-700">

            {/* BAŞLIK */}
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-zinc-800">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0c0c0e] border border-white/5 text-zinc-400 shadow-lg">
                    <BookOpen size={24} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Blog</h1>
                </div>
            </div>

            {/* ARAMA KARTI */}
            <div className="relative w-full mb-10 group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700 rounded-[2rem] opacity-20 blur group-focus-within:opacity-50 transition duration-500"></div>
                <div className="relative flex items-center bg-[#0c0c0e] border border-white/5 rounded-[1.7rem] shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
                    <div className="pl-6 text-zinc-500 group-focus-within:text-white transition-colors z-10">
                        <Search size={22} />
                    </div>
                    <input
                        type="text"
                        placeholder="Yazı başlığı veya içeriği ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-16 bg-transparent border-none text-lg text-zinc-200 placeholder:text-zinc-600 px-4 outline-none z-10 relative"
                    />
                </div>
            </div>

            {/* SONUÇ ALANI */}
            <div className="flex flex-col gap-8">

                {/* --- DURUM 1: ARAMA YOKSA (Varsayılan) --- */}
                {!searchQuery && posts.map(post => renderPostCard(post))}


                {/* --- DURUM 2: ARAMA VARSA --- */}
                {searchQuery && (
                    <>
                        {/* 2a. Hiçbir sonuç yoksa */}
                        {!hasAnyResult && (
                            <div className="flex flex-col items-center justify-center py-20 text-zinc-500 border border-dashed border-zinc-800 rounded-[1.7rem] bg-[#0c0c0e]/50">
                                <Search size={32} className="mb-3 opacity-30" />
                                <p className="text-sm">&quot;{searchQuery}&quot; ile eşleşen yazı yok.</p>
                            </div>
                        )}

                        {/* 2b. Başlık Eşleşmeleri */}
                        {titleMatches.length > 0 && (
                            <div className="flex flex-col gap-6">
                                {titleMatches.map(post => renderPostCard(post))}
                            </div>
                        )}

                        {/* 2c. İçerik Eşleşmeleri */}
                        {contentMatches.length > 0 && (
                            <div className="mt-4">
                                <div className="flex items-center gap-3 mb-6 px-2">
                                    <div className="h-px flex-1 bg-zinc-800"></div>
                                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                                        {titleMatches.length === 0
                                            ? "Başlıkta yok ama içerikte bulundu "
                                            : "Ayrıca içerikte geçenler"}
                                    </span>
                                    <div className="h-px flex-1 bg-zinc-800"></div>
                                </div>
                                <div className="flex flex-col gap-6 opacity-90">
                                    {contentMatches.map(post => renderPostCard(post, true))}
                                </div>
                            </div>
                        )}
                    </>
                )}

            </div>
        </section>
    );
}