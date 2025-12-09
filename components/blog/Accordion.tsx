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
        <div className="my-4 rounded-lg border border-zinc-800 bg-zinc-900/50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-zinc-200 transition-colors hover:bg-zinc-800/50 rounded-t-lg"
            >
                <span>{title}</span>
                {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>

            {/* Animasyonlu açılma efekti için basit bir mantık */}
            <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="border-t border-zinc-800 px-4 py-4 text-zinc-400 text-sm">
                    {children}
                </div>
            </div>
        </div>
    );
}