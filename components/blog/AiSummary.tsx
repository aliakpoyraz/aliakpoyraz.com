"use client";

import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface AiSummaryProps {
    summary?: string;
}

export default function AiSummary({ summary }: AiSummaryProps) {
    if (!summary) return null;

    return (
        <section className="mt-14 mb-8 pl-4 border-l border-rose-500/30">
            <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-rose-400" />
                <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">AI Özet</h2>
            </div>

            <p className="text-muted leading-relaxed text-sm italic whitespace-pre-line group-hover:text-fg/80 transition-colors">
                {summary}
            </p>

            <div className="mt-3 flex items-center gap-2 opacity-60">
                <div className="w-1 h-1 rounded-full bg-rose-500 animate-pulse" />
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted/80 uppercase tracking-widest">
                    <span>Gemini ile oluşturuldu</span>
                    <span>•</span>
                    <span>WE</span>
                    <Heart size={9} className="text-red-500 fill-red-500" />
                    <div className="flex gap-0.5 font-bold tracking-tighter">
                        <span className="text-[#4285F4]">G</span>
                        <span className="text-[#EA4335]">o</span>
                        <span className="text-[#FBBC05]">o</span>
                        <span className="text-[#4285F4]">g</span>
                        <span className="text-[#34A853]">l</span>
                        <span className="text-[#EA4335]">e</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
