"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Post {
    slug: string;
    title: string;
    date: string;
    description: string;
    readingTime: string;
    content: string;
    image?: string;
}

function useDebounce(value: string, delay: number): string {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debounced;
}

export default function BlogList({ posts }: { posts: Post[] }) {
    const t = useTranslations("BlogList");
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedQuery = useDebounce(searchQuery, 300);
    const query = debouncedQuery.toLowerCase();

    const titleMatches = posts.filter((post) =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query)
    );

    const contentMatches = posts.filter((post) => {
        const inTitle = post.title.toLowerCase().includes(query) || post.description.toLowerCase().includes(query);
        const inContent = post.content.toLowerCase().includes(query);
        return !inTitle && inContent;
    });

    const hasAnyResult = titleMatches.length > 0 || contentMatches.length > 0;

    const renderPostCard = (post: Post, isContentMatch = false) => (
        <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group relative w-full block py-6 sm:py-8 border-b border-border-main last:border-none"
        >
            <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-4 md:gap-8 transition-all duration-300">
                
                {/* Thumbnail */}
                {post.image && (
                    <div className="flex-shrink-0 w-full md:w-28 h-40 md:h-20 rounded-xl overflow-hidden border border-border-main group-hover:border-rose-500/30 transition-colors">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                )}

                {/* Sol Taraf: Metin İçerik */}
                <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                        <h2 className="text-xl sm:text-2xl font-bold text-fg/90 group-hover:text-rose-400 transition-colors leading-tight">
                            {post.title}
                        </h2>
                        <ArrowUpRight
                            size={22}
                            className="text-muted md:hidden group-hover:text-rose-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 mt-1"
                        />
                    </div>

                    {post.description && (
                        <p className="text-base text-fg/70 leading-relaxed line-clamp-2 md:line-clamp-3 mb-4 group-hover:text-fg/90 transition-colors">
                            {post.description}
                        </p>
                    )}

                    {isContentMatch && searchQuery && (
                        <div className="mb-4 text-xs font-semibold text-rose-400 bg-accent-10 px-2.5 py-1.5 rounded-lg w-fit border border-accent-20">
                            ✨ {t("content_match_badge")} &quot;{searchQuery}&quot;
                        </div>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted font-mono mt-2">
                        <div className="flex items-center gap-1.5 hover:text-rose-400 transition-colors">
                            <Calendar size={14} className="group-hover:text-rose-400 transition-colors" />
                            <span>{post.date}</span>
                        </div>

                        <span className="opacity-20">•</span>

                        <div className="flex items-center gap-1.5 hover:text-rose-400 transition-colors">
                            <Clock size={14} className="group-hover:text-rose-400 transition-colors" />
                            <span>{post.readingTime}</span>
                        </div>
                    </div>
                </div>

                {/* Sağ Taraf: İkon (Masaüstü için) */}
                <div className="hidden md:flex flex-shrink-0 mt-1">
                    <ArrowUpRight
                        size={28}
                        className="text-muted/40 group-hover:text-rose-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                    />
                </div>

            </div>
        </Link>
    );

    return (
        <section className="w-full max-w-2xl mx-auto mt-8 md:mt-16 px-4 mb-20">

            {/* Başlık */}
            <div className="flex items-center gap-4 mb-12 pb-6 border-b border-border-main">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight transition-colors">{t("title")}</h1>
                </div>
            </div>

            {/* Minimal Arama Input */}
            <div className="relative w-full mb-12 group">
                <div className="relative flex items-center border-b border-border-main pb-2 transition-all duration-300 focus-within:border-rose-500/50 hover:border-muted">
                    <div className="pl-1 text-muted group-focus-within:text-rose-400 transition-colors z-10">
                        <Search size={22} />
                    </div>
                    <input
                        type="text"
                        placeholder={t("search_placeholder")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-12 bg-transparent border-none text-fg placeholder:text-muted/50 px-4 outline-none z-10 relative text-sm sm:text-base font-medium"
                    />
                </div>
            </div>

            {/* Sonuçlar */}
            <div className="flex flex-col">

                {!searchQuery && posts.map(post => renderPostCard(post))}

                {searchQuery && (
                    <>
                        {!hasAnyResult && (
                            <div className="flex flex-col items-center justify-center py-20 text-muted bg-transparent">
                                <Search size={32} className="mb-4 opacity-30 text-rose-400" />
                                <p className="text-sm tracking-wide">{t("no_results", { query: searchQuery })}</p>
                            </div>
                        )}

                        {titleMatches.length > 0 && (
                            <div className="flex flex-col">
                                {titleMatches.map(post => renderPostCard(post))}
                            </div>
                        )}

                        {contentMatches.length > 0 && (
                            <div className="mt-12">
                                <div className="flex items-center gap-3 mb-4 px-2">
                                    <span className="text-xs font-semibold text-rose-400/70 tracking-widest uppercase">
                                        {titleMatches.length === 0
                                            ? t("content_match_header_only")
                                            : t("content_match_header")}
                                    </span>
                                    <div className="h-px flex-1 bg-border-main"></div>
                                </div>
                                <div className="flex flex-col">
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
