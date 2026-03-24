import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface AiSummaryProps {
    summary?: string;
}

export default function AiSummary({ summary }: AiSummaryProps) {
    if (!summary) return null;

    return (
        <section className="my-8 relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-xl p-6 shadow-2xl transition-all hover:border-indigo-500/40 group">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-indigo-500/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 -ml-4 -mb-4 w-24 h-24 bg-purple-500/10 blur-3xl rounded-full" />

            <div className="relative flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles size={18} className="text-indigo-400" />
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight">AI Özet</h2>
            </div>

            <p className="relative text-zinc-300 leading-relaxed text-sm md:text-base italic whitespace-pre-line">
                {summary}
            </p>

            <div className="mt-6 flex items-center justify-between opacity-40 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all duration-500">
                    <div className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
                        Gemini ile oluşturuldu
                    </span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-mono">
                    <span className="text-zinc-500 font-extrabold uppercase">WE</span>
                    <Heart size={10} className="text-red-500 fill-red-500" />
                    <div className="flex gap-1 font-bold tracking-tighter">
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
