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
        <div className="my-6 rounded-2xl border border-border-main bg-surface/80 backdrop-blur-xl shadow-xl overflow-hidden transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-fg transition-all hover:bg-accent-10"
            >
                <span>{title}</span>
                {isOpen ? <ChevronDown size={18} className="text-rose-400" /> : <ChevronRight size={18} className="text-muted" />}
            </button>

            {/* Animasyonlu açılma efekti için basit bir mantık */}
            <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="border-t border-border-main px-5 py-5 text-muted text-sm leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
}