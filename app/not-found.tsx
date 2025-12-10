// app/not-found.tsx

import Link from 'next/link';
import { Frown } from 'lucide-react';

export default function NotFound() {

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center pt-20">

            {/* İkon */}
            <Frown size={64} className="text-zinc-600 mb-4" />

            {/* Başlık */}
            <h1 className="text-6xl font-extrabold text-white mb-4">
                404
            </h1>

            {/* Mesaj */}
            <p className="text-lg text-zinc-400 mb-6 max-w-md">
                Üzgünüz, aradığınız sayfa bulunamadı. Lütfen adresi kontrol edin.
            </p>

            {/* Ana Sayfa Butonu */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold rounded-lg bg-indigo-600 text-white transition-colors hover:bg-indigo-500 shadow-md"
                >
                    Ana Sayfaya Dön
                </Link>
            </div>

        </div>
    );
}