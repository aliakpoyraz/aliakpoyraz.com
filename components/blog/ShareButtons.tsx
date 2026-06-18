"use client";

import { useState } from 'react';
import { Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ShareButtonsProps {
    title: string;
    url: string;
    size?: 'sm' | 'md';
}

export default function ShareButtons({ title, url, size = 'md' }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const t = useTranslations("ShareButtons");

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            console.error(t("copy_error"));
        }
    };

    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);
    const iconSize = size === 'sm' ? 14 : 18;
    const sizeClasses = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';

    const baseBtnStyle = `flex items-center justify-center rounded-xl border bg-surface/80 backdrop-blur-xl text-muted border-border-main transition-all ${sizeClasses}`;

    return (
        <div className="flex items-center gap-2">
            <a
                href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseBtnStyle} hover:border-accent-30 hover:bg-accent-10 hover:text-fg shadow-lg shadow-black/5`}
                title={t("tooltip_twitter")}
            >
                <Twitter size={iconSize} />
            </a>

            <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseBtnStyle} hover:border-[#0077b5]/50 hover:bg-[#0077b5]/10 hover:text-[#0077b5] shadow-lg shadow-black/5`}
                title={t("tooltip_linkedin")}
            >
                <Linkedin size={iconSize} />
            </a>

            <button
                onClick={handleCopy}
                className={`${baseBtnStyle} hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-400 shadow-lg shadow-black/5`}
                title={t("tooltip_copy")}
            >
                {copied ? <Check size={iconSize} /> : <LinkIcon size={iconSize} />}
            </button>
        </div>
    );
}
