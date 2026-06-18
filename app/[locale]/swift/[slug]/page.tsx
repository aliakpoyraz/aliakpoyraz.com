import { getSwiftStepBySlug, getSwiftSteps } from '@/lib/swift';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Link } from '@/routing';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { ArrowLeft, Calendar, ArrowLeft as ChevronLeft, ArrowRight as ChevronRight } from 'lucide-react';
import { Metadata } from 'next';
import Script from 'next/script';
import PreBlock from '@/components/blog/PreBlock';
import { getTranslations } from 'next-intl/server';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const step = getSwiftStepBySlug(slug);

    if (!step) {
        const t = await getTranslations("SwiftPost");
        return { title: t("not_found_title") };
    }

    const siteUrl = 'https://aliakpoyraz.com';
    const pageUrl = `${siteUrl}/swift/${slug}`;

    return {
        title: `${step.title} | Swift ${step.step}. Adım | Ali Akpoyraz`,
        description: step.description,
        metadataBase: new URL(siteUrl),
        alternates: {
            canonical: `/swift/${slug}`,
        },
        openGraph: {
            title: `${step.title} | Swift ${step.step}. Adım`,
            description: step.description,
            url: pageUrl,
            siteName: 'Ali Akpoyraz',
            locale: 'tr_TR',
            type: 'article',
            publishedTime: step.rawDate.toISOString(),
            authors: ['Ali Akpoyraz'],
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: step.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: step.title,
            description: step.description,
            images: ['/og-image.png'],
        },
    };
}

export default async function SwiftStepPage({ params }: Props) {
    const { slug } = await params;
    const step = getSwiftStepBySlug(slug);
    const t = await getTranslations("SwiftPost");

    if (!step) {
        notFound();
    }

    const allSteps = getSwiftSteps();
    const currentIndex = allSteps.findIndex(s => s.slug === slug);
    const nextStep = allSteps[currentIndex + 1] || null;
    const prevStep = allSteps[currentIndex - 1] || null;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: step.title,
        description: step.description,
        datePublished: step.rawDate.toISOString(),
        author: {
            '@type': 'Person',
            name: 'Ali Akpoyraz',
            url: 'https://aliakpoyraz.com',
        },
        educationalLevel: 'Beginner',
        about: {
            '@type': 'Thing',
            name: 'Swift Programming',
        },
    };

    return (
        <article className="w-full max-w-2xl mx-auto mt-8 md:mt-16 px-4 mb-20">

            <Script
                id="swift-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Link
                href="/swift"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-rose-400 mb-10 bg-surface border border-border-main hover:border-rose-500/30 hover:bg-accent-10 transition-all duration-300 group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                {t("back_to_list")}
            </Link>

            <header className="mb-10 pb-10 border-b border-border-main">
                <div className="flex items-center gap-3 mb-6 text-xs font-semibold font-mono">
                    <div className="flex items-center gap-1.5 bg-accent-10 text-rose-400 px-2.5 py-1.5 rounded-lg border border-accent-20 backdrop-blur-sm">
                        {t("step_label")} {step.step}
                    </div>
                    <div className="flex items-center gap-1.5 bg-surface text-muted px-2.5 py-1.5 rounded-lg border border-border-main backdrop-blur-sm hover:border-accent-30 transition-colors">
                        <Calendar size={14} className="text-rose-400" />
                        {step.date}
                    </div>
                </div>

                <h1 className="text-3xl sm:text-5xl font-bold text-fg mb-6 leading-tight tracking-tight transition-colors">
                    {step.title}
                </h1>

                <p className="text-lg text-muted leading-relaxed">
                    {step.description}
                </p>
            </header>

            <div className="prose dark:prose-invert prose-zinc max-w-none 
                prose-headings:scroll-mt-20
                prose-a:!text-rose-400 prose-a:!font-bold prose-a:!no-underline hover:prose-a:!no-underline
                prose-headings:font-bold prose-headings:text-fg 
                prose-p:text-fg/90 prose-p:leading-relaxed
                prose-strong:text-fg prose-strong:font-bold
                prose-ul:list-disc prose-ul:pl-5 prose-ul:marker:text-rose-500/50
                prose-ol:list-decimal prose-ol:pl-5 prose-ol:marker:text-rose-500/50
                prose-li:text-fg/90
                prose-code:text-rose-500 prose-code:bg-accent-10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-lg prose-code:font-semibold prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-transparent prose-pre:border prose-pre:border-border-main prose-pre:rounded-2xl
                prose-blockquote:border-l-4 prose-blockquote:border-rose-400/50 prose-blockquote:bg-accent-10/20 prose-blockquote:px-6 prose-blockquote:py-3 prose-blockquote:not-italic prose-blockquote:text-fg/80 transition-colors
            ">
                <MDXRemote
                    source={step.content}
                    components={{ pre: PreBlock }}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkGfm],
                            rehypePlugins: [rehypeSlug],
                        },
                    }}
                />
            </div>

            <nav className="mt-16 border-t border-border-main pt-8">
                <div className="flex justify-between gap-4">
                    {prevStep ? (
                        <Link
                            href={`/swift/${prevStep.slug}`}
                            className="flex flex-col p-4 text-left transition-all w-full group hover:bg-surface/50 rounded-xl"
                        >
                            <span className="text-xs font-semibold uppercase tracking-widest text-muted/60 flex items-center gap-1 group-hover:text-rose-400 transition-colors">
                                <ChevronLeft size={16} /> {t("prev_step")}
                            </span>
                            <span className="text-base font-bold text-muted group-hover:text-fg transition-colors mt-2 leading-relaxed">
                                {prevStep.title}
                            </span>
                        </Link>
                    ) : <div className="w-full"></div>}

                    {nextStep ? (
                        <Link
                            href={`/swift/${nextStep.slug}`}
                            className="flex flex-col p-4 text-right transition-all w-full group hover:bg-surface/50 rounded-xl"
                        >
                            <span className="text-xs font-semibold uppercase tracking-widest text-muted/60 flex items-center justify-end gap-1 group-hover:text-rose-400 transition-colors">
                                {t("next_step")} <ChevronRight size={16} />
                            </span>
                            <span className="text-base font-bold text-muted group-hover:text-fg transition-colors mt-2 leading-relaxed">
                                {nextStep.title}
                            </span>
                        </Link>
                    ) : <div className="w-full"></div>}
                </div>
            </nav>
        </article>
    );
}

export async function generateStaticParams() {
    const steps = getSwiftSteps();
    return steps.map((step) => ({
        slug: step.slug,
    }));
}
