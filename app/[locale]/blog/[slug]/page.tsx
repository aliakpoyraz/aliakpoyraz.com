import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, ArrowLeft as ChevronLeft, ArrowRight as ChevronRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import GithubSlugger from 'github-slugger';
import Script from 'next/script';
import { parse, format } from 'date-fns';
import { tr } from 'date-fns/locale';

import YouTubeCard from '@/components/blog/YoutubeCard';
import Callout from '@/components/blog/Callout';
import ProsCons from '@/components/blog/ProsCons';
import CaptionImage from '@/components/blog/CaptionImage';
import Accordion from '@/components/blog/Accordion';
import TableOfContents from '@/components/blog/TableOfContents';
import ReadingProgress from '@/components/blog/ReadingProgress';
import ShareButtons from '@/components/blog/ShareButtons';
import AiSummary from '@/components/blog/AiSummary';

// TypeScript Arayüzü: Frontmatter'dan beklenen verileri tanımlar
interface PostFrontmatter {
    title: string;
    date: string; // GG-AA-YYYY formatında gelen orijinal tarih
    description: string;
    summary?: string;
    image?: string; // Zorunlu olmayan alanlar için '?' kullanılır
    [key: string]: any; // Diğer tüm custom alanlara izin verir
}

const mdxComponents = {
    YouTubeCard,
    Callout,
    ProsCons,
    CaptionImage,
    Accordion,
};

function parseDateString(dateStr: string): Date {
    const parsedDate = parse(dateStr, 'dd-MM-yyyy', new Date(), { locale: tr });

    if (isNaN(parsedDate.getTime())) {
        return new Date('1970-01-01');
    }
    return parsedDate;
}

function formatToTurkishDisplay(date: Date): string {
    return format(date, 'dd MMMM yyyy', { locale: tr });
}

function getSortedPosts() {
    const contentDir = path.join(process.cwd(), 'content');
    const files = fs.readdirSync(contentDir);

    const posts = files.map((filename) => {
        const filePath = path.join(contentDir, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);

        const parsedDate = parseDateString(data.date);

        return {
            slug: filename.replace('.mdx', ''),
            dateTimestamp: parsedDate.getTime(),
            title: data.title,
        };
    });

    return posts.sort((a, b) => b.dateTimestamp - a.dateTimestamp);
}

function getHeadings(source: string) {
    const slugger = new GithubSlugger();
    const headingLines = source.split('\n').filter((line) => line.match(/^#{2,3}\s/));

    return headingLines.map((raw) => {
        const text = raw.replace(/^#{2,3}\s/, '');
        const level = raw.startsWith('###') ? 3 : 2;
        const slug = slugger.slug(text);

        return { text, level, slug };
    });
}

function getPost(slug: string) {
    const contentDir = path.join(process.cwd(), 'content');
    const filePath = path.join(contentDir, `${slug}.mdx`);

    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        const frontmatterData = data as PostFrontmatter;

        const parsedDate = parseDateString(frontmatterData.date);

        return {
            frontmatter: {
                ...frontmatterData,
                isoDate: parsedDate.toISOString(),
                turkishDisplayDate: formatToTurkishDisplay(parsedDate),
            },
            content
        };
    } catch (err) {
        return null;
    }
}

function calculateReadingTime(content: string) {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return `${time} dk okuma`;
}

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) return { title: 'Yazı Bulunamadı' };

    const siteUrl = 'https://aliakpoyraz.com';
    const ogImage = post.frontmatter.image
        ? `${siteUrl}${post.frontmatter.image}`
        : `${siteUrl}/opengraph-image.png`;

    return {
        title: `${post.frontmatter.title} | Ali Akpoyraz`,
        description: post.frontmatter.description,
        metadataBase: new URL(siteUrl),
        alternates: {
            canonical: `/blog/${slug}`,
        },
        openGraph: {
            title: post.frontmatter.title,
            description: post.frontmatter.description,
            url: `/blog/${slug}`,
            siteName: 'Ali Akpoyraz Blog',
            locale: 'tr_TR',
            type: 'article',
            publishedTime: post.frontmatter.isoDate,
            authors: ['Ali Akpoyraz'],
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: post.frontmatter.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.frontmatter.title,
            description: post.frontmatter.description,
            images: [ogImage],
        },
    };
}

export default async function BlogPost({ params }: Props) {
    const { slug } = await params;
    const post = getPost(slug);

    if (!post) {
        notFound();
    }

    const readingTime = calculateReadingTime(post.content);
    const headings = getHeadings(post.content);

    const siteUrl = 'https://aliakpoyraz.com';
    const shareUrl = `${siteUrl}/blog/${slug}`;

    const sortedPosts = getSortedPosts();
    const currentIndex = sortedPosts.findIndex(p => p.slug === slug);

    const prevPost = sortedPosts[currentIndex + 1] || null;
    const nextPost = sortedPosts[currentIndex - 1] || null;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.frontmatter.title,
        description: post.frontmatter.description,
        image: post.frontmatter.image ? `${siteUrl}${post.frontmatter.image}` : `${siteUrl}/opengraph-image.png`,
        datePublished: post.frontmatter.isoDate,
        dateModified: post.frontmatter.isoDate,
        author: {
            '@type': 'Person',
            name: 'Ali Akpoyraz',
            url: siteUrl,
        },
    };

    return (
        <article className="w-full max-w-2xl mx-auto mt-8 md:mt-16 px-4 mb-20">

            <Script
                id="blog-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <ReadingProgress />

            <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-500 hover:text-rose-400 mb-10 bg-zinc-900/50 border border-zinc-800 hover:border-rose-500/30 hover:bg-rose-500/5 transition-all duration-300 group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Blog Listesine Dön
            </Link>

            <header className="mb-10 pb-10 border-b border-white/5">
                <h1 className="text-3xl sm:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                    {post.frontmatter.title}
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8">
                    <div className="flex items-center gap-3 text-xs font-semibold text-zinc-500 font-mono">
                        <div className="flex items-center gap-1.5 bg-zinc-900/50 px-2.5 py-1.5 rounded-lg border border-zinc-800 backdrop-blur-sm hover:border-rose-500/30 transition-colors">
                            <Calendar size={14} className="text-rose-400" />
                            {post.frontmatter.turkishDisplayDate}
                        </div>
                        <div className="flex items-center gap-1.5 bg-zinc-900/50 px-2.5 py-1.5 rounded-lg border border-zinc-800 backdrop-blur-sm hover:border-rose-500/30 transition-colors">
                            <Clock size={14} className="text-rose-400" />
                            {readingTime}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-600 font-mono hidden sm:block">Paylaş:</span>
                        <ShareButtons title={post.frontmatter.title} url={shareUrl} />
                    </div>
                </div>
            </header>

            {headings.length > 0 && <TableOfContents headings={headings} />}

            {post.frontmatter.summary && <AiSummary summary={post.frontmatter.summary} />}

            {post.frontmatter.summary && (
                <div className="w-full h-px bg-white/5 mb-8" />
            )}

            <div className="prose prose-invert prose-zinc max-w-none 
                prose-headings:scroll-mt-20
                prose-a:!text-rose-400 prose-a:!font-bold prose-a:!no-underline hover:prose-a:underline
                prose-headings:font-bold prose-headings:text-white 
                prose-p:text-zinc-500 prose-p:leading-relaxed
                prose-strong:text-zinc-300 prose-strong:font-semibold
                prose-ul:list-disc prose-ul:pl-5 prose-ul:marker:text-zinc-600
                prose-ol:list-decimal prose-ol:pl-5 prose-ol:marker:text-zinc-600
                prose-code:text-rose-300 prose-code:bg-rose-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-lg prose-code:font-normal
                prose-pre:bg-transparent prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-2xl
                prose-table:border-collapse prose-table:w-full prose-table:my-8
                prose-thead:border-b prose-thead:border-zinc-800
                prose-th:text-zinc-300 prose-th:font-semibold prose-th:p-3 prose-th:text-left
                prose-tr:border-b prose-tr:border-zinc-800/50 hover:prose-tr:bg-zinc-900/30
                prose-td:text-zinc-500 prose-td:p-3
                prose-blockquote:border-l-2 prose-blockquote:border-zinc-700 prose-blockquote:bg-transparent prose-blockquote:px-5 prose-blockquote:py-2 prose-blockquote:not-italic prose-blockquote:text-zinc-400
            ">
                <MDXRemote
                    source={post.content}
                    components={mdxComponents}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkGfm],
                            rehypePlugins: [rehypeSlug],
                            // @ts-ignore - blockJS is a valid option in v6 but might not be in types yet
                            blockJS: false,
                        },
                    }}
                />
            </div>

            {/* Navigation */}
            <nav className="mt-16 border-t border-zinc-800 pt-8">
                <div className="flex justify-between gap-4">

                    {prevPost ? (
                        <Link
                            href={`/blog/${prevPost.slug}`}
                            className="flex flex-col p-4 text-left transition-all w-full group"
                        >
                            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600 flex items-center gap-1 group-hover:text-rose-400 transition-colors">
                                <ChevronLeft size={16} /> Önceki
                            </span>
                            <span className="text-base font-bold text-zinc-400 mt-2 leading-relaxed group-hover:text-white transition-colors">
                                {prevPost.title}
                            </span>
                        </Link>
                    ) : (
                        <div className="w-full"></div>
                    )}

                    {nextPost ? (
                        <Link
                            href={`/blog/${nextPost.slug}`}
                            className="flex flex-col p-4 text-right transition-all w-full group"
                        >
                            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600 flex items-center justify-end gap-1 group-hover:text-rose-400 transition-colors">
                                Sonraki <ChevronRight size={16} />
                            </span>
                            <span className="text-base font-bold text-zinc-400 mt-2 leading-relaxed group-hover:text-white transition-colors">
                                {nextPost.title}
                            </span>
                        </Link>
                    ) : (
                        <div className="w-full"></div>
                    )}

                </div>
            </nav>

            {/* Share section */}
            <div className="mt-8 border-t border-zinc-800 pt-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-zinc-400 text-sm">
                        Bu yazıyı faydalı bulduysanız paylaşabilirsiniz:
                    </p>
                    <ShareButtons title={post.frontmatter.title} url={shareUrl} />
                </div>
            </div>

        </article>
    );
}

export async function generateStaticParams() {
    const files = fs.readdirSync(path.join(process.cwd(), 'content'));
    return files.map((filename) => ({
        slug: filename.replace('.mdx', ''),
    }));
}