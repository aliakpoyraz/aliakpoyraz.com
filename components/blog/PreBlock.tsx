"use client";

import React, { useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function PreBlock({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) {
    const preRef = useRef<HTMLPreElement>(null);
    const [copied, setCopied] = useState(false);

    const child = React.Children.only(children) as React.ReactElement<{ className?: string }> | undefined;
    const className = child?.props?.className || '';
    const match = className.match(/language-(\w+)/);
    const lang = match ? match[1] : null;

    const handleCopy = async () => {
        const text = preRef.current?.innerText ?? '';
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group/pre">
            <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5">
                {lang && (
                    <span className="text-[10px] font-mono font-semibold tracking-wider text-muted/40 group-hover/pre:text-muted/60 transition-colors pointer-events-none select-none">
                        {lang.toLocaleUpperCase('en-US')}
                    </span>
                )}
                <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg opacity-0 group-hover/pre:opacity-100 transition-all duration-200 bg-surface border border-border-main hover:border-muted/40 text-muted hover:text-fg"
                    aria-label="Kodu kopyala"
                >
                    {copied
                        ? <Check size={13} className="text-green-400" />
                        : <Copy size={13} />
                    }
                </button>
            </div>

            <pre ref={preRef} {...props}>{children}</pre>
        </div>
    );
}
