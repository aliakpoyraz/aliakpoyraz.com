"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Sayfa hatası:', error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <style dangerouslySetInnerHTML={{ __html: `
                #sidenav { display: none !important; }
            `}} />

            <AlertTriangle size={64} className="text-rose-400/60 mb-4" />

            <h1 className="text-4xl font-extrabold text-fg mb-3">
                Bir hata oluştu
            </h1>

            <p className="text-muted text-base max-w-md mb-8 leading-relaxed">
                Üzgünüz, sayfa yüklenirken beklenmedik bir hata oluştu.
                Lütfen tekrar deneyin veya ana sayfaya dönün.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={reset}
                    className="px-6 py-3 rounded-xl bg-surface border border-border-main text-muted font-semibold hover:text-rose-400 hover:border-rose-500/30 hover:bg-accent-10 transition-all duration-300"
                >
                    Tekrar Dene
                </button>

                <Link
                    href="/"
                    className="px-6 py-3 rounded-xl bg-rose-500 text-white font-semibold hover:bg-rose-400 transition-colors"
                >
                    Ana Sayfaya Dön
                </Link>
            </div>
        </div>
    );
}
