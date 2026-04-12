import Link from 'next/link';
import { Frown } from 'lucide-react';

export default function NotFound() {

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center pt-20">
            {/* Navigasyon barını (/SideNav) 404 sayfasında tamamen gizle */}
            <style dangerouslySetInnerHTML={{ __html: `
                #sidenav { display: none !important; }
            `}} />

            <Frown size={64} className="text-zinc-600 mb-4" />

            <h1 className="text-6xl font-extrabold text-white mb-4">
                404
            </h1>

            <p className="text-lg text-zinc-400 mb-6 max-w-md">
                Üzgünüz, aradığınız sayfa bulunamadı. Lütfen adresi kontrol edin.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold rounded-lg bg-rose-500 text-white transition-colors hover:bg-rose-400 shadow-md"
                >
                    Ana Sayfaya Dön
                </Link>
            </div>

        </div>
    );
}