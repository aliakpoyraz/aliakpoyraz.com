import { getSwiftSteps } from '@/lib/swift';
import { Link } from '@/routing';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Calendar, ArrowUpRight, Target } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("SwiftPage");
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default async function SwiftJourneyPage() {
    const steps = getSwiftSteps();
    const t = await getTranslations("SwiftPage");

    const progressPercent = 1;

    return (
        <main className="w-full max-w-2xl mx-auto mt-8 md:mt-16 px-4 pb-24">

            {/* Başlık */}
            <div className="flex items-center gap-4 mb-12 pb-6 border-b border-border-main">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-fg tracking-tight transition-colors">
                        {t("title")}
                    </h1>
                </div>
            </div>

            {/* Meta Bilgiler */}
            <div className="flex flex-col gap-6 mb-12">
                <p className="text-base text-fg/70 leading-relaxed">
                    {t("description")}
                </p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-muted">
                    <div className="flex items-center gap-1.5">
                        <Target size={14} className="text-rose-400" />
                        <span>{t("goal_text")}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-muted/50 text-xs uppercase tracking-wider">{t("start_label")}</span>
                        <span className="text-fg/80">{t("start_date")}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-muted/50 text-xs uppercase tracking-wider">{t("end_label")}</span>
                        <span className="text-rose-400 font-semibold">{t("end_date")}</span>
                    </div>
                </div>

                {/* İlerleme Çubuğu */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                            {t("progress_label")}
                        </span>
                        <span className="text-xs font-bold text-rose-400">%{progressPercent}</span>
                    </div>
                    <div className="w-full bg-border-main rounded-full h-1.5 overflow-hidden">
                        <div
                            className="bg-rose-500 h-1.5 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Adımlar */}
            <div className="flex flex-col">
                {steps.map((step) => (
                    <Link
                        key={step.slug}
                        href={`/swift/${step.slug}`}
                        className="group relative w-full block py-6 sm:py-8 border-b border-border-main last:border-none"
                    >
                        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 transition-all duration-300">

                            {/* Metin İçerik */}
                            <div className="flex-1">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold font-mono text-rose-400/70">
                                            #{step.step}
                                        </span>
                                        <h2 className="text-xl sm:text-2xl font-bold text-fg/90 group-hover:text-rose-400 transition-colors leading-tight">
                                            {step.title}
                                        </h2>
                                    </div>
                                    <ArrowUpRight
                                        size={22}
                                        className="text-muted md:hidden group-hover:text-rose-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 mt-1"
                                    />
                                </div>

                                {step.description && (
                                    <p className="text-base text-fg/70 leading-relaxed line-clamp-2 mb-4 group-hover:text-fg/90 transition-colors">
                                        {step.description}
                                    </p>
                                )}

                                <div className="flex items-center gap-1.5 text-xs font-medium text-muted font-mono">
                                    <Calendar size={13} className="text-muted" />
                                    <span>{step.date}</span>
                                </div>
                            </div>

                            {/* Sağ Ok (Masaüstü) */}
                            <div className="hidden md:flex flex-shrink-0 mt-1">
                                <ArrowUpRight
                                    size={28}
                                    className="text-muted/40 group-hover:text-rose-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                                />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
