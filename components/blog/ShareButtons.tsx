"use client";

import { useState } from 'react';
import { Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react';

interface ShareButtonsProps {
    title: string;
    url: string;
    size?: 'sm' | 'md';
}

export default function ShareButtons({ title, url, size = 'md' }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Kopyalama başarısız', err);
        }
    };

    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);
    const iconSize = size === 'sm' ? 14 : 18;
    const sizeClasses = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';

    // Boyuta göre sınıf ve ikon büyüklüğü ayarı
    const baseBtnStyle = `flex items-center justify-center rounded-xl border bg-zinc-950/80 backdrop-blur-xl text-zinc-400 border-white/5 transition-all ${sizeClasses}`;

    return (
        <div className="flex items-center gap-2">
            <a
                href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseBtnStyle} hover:border-white/20 hover:bg-zinc-900/50 hover:text-white shadow-lg shadow-black/20`}
                title="Twitter'da Paylaş"
            >
                <Twitter size={iconSize} />
            </a>

            <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseBtnStyle} hover:border-[#0077b5]/50 hover:bg-[#0077b5]/20 hover:text-[#0077b5] shadow-lg shadow-black/20`}
                title="LinkedIn'de Paylaş"
            >
                <Linkedin size={iconSize} />
            </a>

            <button
                onClick={handleCopy}
                className={`${baseBtnStyle} hover:border-indigo-500/50 hover:bg-indigo-500/20 hover:text-indigo-400 shadow-lg shadow-black/20`}
                title="Linki Kopyala"
            >
                {copied ? <Check size={iconSize} /> : <LinkIcon size={iconSize} />}
            </button>
        </div>
    );
}