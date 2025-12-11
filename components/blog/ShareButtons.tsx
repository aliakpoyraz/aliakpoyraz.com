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

    // Boyuta göre sınıf ve ikon büyüklüğü ayarı
    const sizeClasses = size === 'sm' ? 'h-8 w-8 border-zinc-800' : 'h-10 w-10 border-zinc-800';
    const iconSize = size === 'sm' ? 14 : 18;

    // Ortak buton stili
    const baseBtnStyle = `flex items-center justify-center rounded-full border bg-zinc-900 text-zinc-400 transition-all ${sizeClasses}`;

    return (
        <div className="flex items-center gap-2">
            <a
                href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseBtnStyle} hover:border-zinc-700 hover:bg-zinc-800 hover:text-white`}
                title="Twitter'da Paylaş"
            >
                <Twitter size={iconSize} />
            </a>

            <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseBtnStyle} hover:border-[#0077b5] hover:bg-[#0077b5] hover:text-white`}
                title="LinkedIn'de Paylaş"
            >
                <Linkedin size={iconSize} />
            </a>

            <button
                onClick={handleCopy}
                className={`${baseBtnStyle} hover:border-indigo-500 hover:bg-indigo-500 hover:text-white`}
                title="Linki Kopyala"
            >
                {copied ? <Check size={iconSize} /> : <LinkIcon size={iconSize} />}
            </button>
        </div>
    );
}