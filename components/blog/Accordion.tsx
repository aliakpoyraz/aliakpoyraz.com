"use client";

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface AccordionProps {
    title: string;
    children: React.ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="my-6 rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl shadow-xl overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-zinc-100 transition-all hover:bg-zinc-900/40"
            >
                <span>{title}</span>
                {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>

            {/* Animasyonlu açılma efekti için basit bir mantık */}
            <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="border-t border-white/5 px-5 py-5 text-zinc-400 text-sm leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
}