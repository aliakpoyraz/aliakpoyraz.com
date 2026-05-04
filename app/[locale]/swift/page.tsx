import { getSwiftSteps } from '@/lib/swift';
import { Link } from '@/routing';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Calendar, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Swift Öğrenme Serüvenim | Ali Akpoyraz',
  description: 'Swift ve iOS geliştirme yolculuğumu adım adım paylaşıyorum.',
};

export default async function SwiftJourneyPage() {
  const steps = getSwiftSteps();
  const t = await getTranslations(); // If needed

  const startDate = '05 Mayıs 2026';
  const endDate = 'Devam Ediyor';
  const progressPercent = 1; // This could be calculated or hardcoded

  return (
    <main className="w-full max-w-2xl mx-auto mt-12 md:mt-24 px-4 pb-24 transition-all duration-700 ease-out opacity-100 translate-y-0">

      {/* Başlık Alanı */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-fg tracking-tight transition-colors mb-2">
          Swift Geliştirme Yolculuğum
        </h1>
        <div className="h-1 w-10 bg-rose-500 rounded-full mx-auto md:mx-0 mt-3 opacity-60 mb-6"></div>
        <p className="text-base md:text-lg text-muted text-balance leading-relaxed">
          Sıfırdan başlayarak iOS ekosistemini, Swift dilini ve SwiftUI çerçevesini öğrenme sürecimi burada belgeliyorum.
        </p>
      </div>

      {/* İstatistik / İlerleme Kartı */}
      <div className="bg-surface border border-border-main rounded-2xl p-6 shadow-sm mb-16 hover:border-accent-30 transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-muted mb-2">
              Amaç
            </h3>
            <p className="text-fg/90 text-sm md:text-base font-medium">
              Modern, performanslı ve harika görünen native iOS uygulamaları geliştirmek.
            </p>
          </div>
          <div className="flex flex-col md:items-end justify-center space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-muted">
                Başlangıç:
              </span>
              <span className="text-fg/90 font-medium text-sm">{startDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-muted">
                Bitiş:
              </span>
              <span className="text-rose-400 font-medium bg-accent-10 px-2 py-0.5 rounded-md text-sm border border-accent-20">
                {endDate}
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-3">
            <h3 className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-muted">
              İlerleme
            </h3>
            <span className="text-sm font-bold text-rose-400">
              %{progressPercent}
            </span>
          </div>
          <div className="w-full bg-border-main rounded-full h-2.5 overflow-hidden border border-border-main">
            <div
              className="bg-rose-500 h-2.5 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(251,113,133,0.3)]"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Zaman Çizelgesi (Timeline) */}
      <div className="relative flex flex-col gap-12">
        {/* Sürekli Dikey Çizgi */}
        <div className="absolute left-[7px] top-6 bottom-8 w-px bg-border-main z-0 hidden sm:block"></div>

        {steps.map((step, index) => (
          <Link
            key={step.slug}
            href={`/swift/${step.slug}`}
            className="group relative flex gap-6 md:gap-8 items-start"
          >
            {/* Zaman Noktası */}
            <div className="relative z-10 hidden sm:flex flex-col items-center mt-2.5">
              <div className="relative flex h-3.5 w-3.5 shrink-0 rounded-full bg-surface border-2 border-border-main group-hover:bg-rose-500/50 group-hover:border-rose-400 transition-all duration-500"></div>
            </div>

            {/* Kart İçeriği */}
            <div className="flex-1 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm md:text-base font-extrabold px-3 py-1 rounded-lg bg-surface border-2 border-border-main text-muted group-hover:border-accent-30 group-hover:text-rose-400 transition-colors shadow-sm">
                    #{step.step}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-fg/90 group-hover:text-rose-400 transition-colors flex items-center">
                    {step.title}
                    <ArrowUpRight size={16} className="text-muted opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-rose-400 transition-all duration-300 ml-1" />
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full w-fit backdrop-blur-md bg-surface border border-border-main text-muted group-hover:text-fg/80 transition-all">
                  <Calendar size={12} className="text-muted" />
                  {step.date}
                </div>
              </div>

              <p className="text-sm md:text-base text-muted group-hover:text-fg/70 transition-colors text-balance leading-relaxed">
                {step.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
