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

// Tarih ve zaman kütüphanesi
import { parse, format } from 'date-fns';
import { tr } from 'date-fns/locale';

// Bileşenler
import YouTubeCard from '@/components/blog/YoutubeCard';
import Callout from '@/components/blog/Callout';
import ProsCons from '@/components/blog/ProsCons';
import CaptionImage from '@/components/blog/CaptionImage';
import Accordion from '@/components/blog/Accordion';
import TableOfContents from '@/components/blog/TableOfContents';
import ReadingProgress from '@/components/blog/ReadingProgress';
import ShareButtons from '@/components/blog/ShareButtons';

// TypeScript Arayüzü: Frontmatter'dan beklenen verileri tanımlar
interface PostFrontmatter {
    title: string;
    date: string; // GG-AA-YYYY formatında gelen orijinal tarih
    description: string;
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

// GG-AA-YYYY formatındaki dizeyi Date nesnesine çevirir.
function parseDateString(dateStr: string): Date {
    const parsedDate = parse(dateStr, 'dd-MM-yyyy', new Date(), { locale: tr });

    if (isNaN(parsedDate.getTime())) {
        return new Date('1970-01-01');
    }
    return parsedDate;
}

// Tarihi Türkçe formatına çevirir (12 Şubat 2025)
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

    // En yeniyi en başa al
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

// TypeScript hatası için PostFrontmatter arayüzü kullanılır.
function getPost(slug: string) {
    const contentDir = path.join(process.cwd(), 'content');
    const filePath = path.join(contentDir, `${slug}.mdx`);

    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        // Orijinal frontmatter verisine tipi atar
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

    // Dizideki bir sonraki eleman kronolojik olarak daha eskidir (Önceki Yazı)
    const prevPost = sortedPosts[currentIndex + 1] || null;
    // Dizideki bir önceki eleman kronolojik olarak daha yenidir (Sonraki Yazı)
    const nextPost = sortedPosts[currentIndex - 1] || null;

    // JSON-LD Verisi (Schema Markup)
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
        <article className="w-full max-w-2xl mx-auto mt-32 px-4 mb-20 animate-in fade-in duration-700">

            {/* JSON-LD Script */}
            <Script
                id="blog-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <ReadingProgress />

            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white mb-8 transition-colors group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Blog Listesine Dön
            </Link>

            <header className="mb-10 pb-10 border-b border-zinc-800">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                    {post.frontmatter.title}
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4 text-sm text-zinc-500 font-mono">
                        <div className="flex items-center gap-1.5 bg-zinc-900/50 px-2 py-1 rounded border border-zinc-800">
                            <Calendar size={14} />
                            {post.frontmatter.turkishDisplayDate}
                        </div>
                        <div className="flex items-center gap-1.5 bg-zinc-900/50 px-2 py-1 rounded border border-zinc-800">
                            <Clock size={14} />
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

            <div className="prose prose-invert prose-zinc max-w-none 
                prose-headings:scroll-mt-20
                prose-a:!text-indigo-400 prose-a:!font-bold prose-a:!no-underline 
                prose-headings:font-bold prose-headings:text-white 
                prose-p:text-zinc-400 prose-p:leading-relaxed
                prose-strong:text-white prose-strong:font-semibold
                prose-ul:list-disc prose-ul:pl-5 prose-ul:marker:text-zinc-600
                prose-ol:list-decimal prose-ol:pl-5 prose-ol:marker:text-zinc-600
                prose-code:text-indigo-200 prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-normal
                prose-pre:bg-[#0c0c0e] prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-xl
                prose-table:border-collapse prose-table:w-full prose-table:my-8
                prose-thead:border-b prose-thead:border-zinc-700
                prose-th:text-zinc-200 prose-th:font-semibold prose-th:p-3 prose-th:text-left
                prose-tr:border-b prose-tr:border-zinc-800/50 hover:prose-tr:bg-zinc-900/30
                prose-td:text-zinc-400 prose-td:p-3
                prose-blockquote:border-l-4 prose-blockquote:border-zinc-700 prose-blockquote:bg-zinc-900/20 prose-blockquote:px-4 prose-blockquote:py-1 prose-blockquote:not-italic prose-blockquote:text-zinc-300
            ">
                <MDXRemote
                    source={post.content}
                    components={mdxComponents}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkGfm],
                            rehypePlugins: [rehypeSlug],
                        },
                    }}
                />
            </div>

            {/* NAVİGASYON BÖLÜMÜ */}
            <nav className="mt-16 border-t border-zinc-800 pt-8">
                <div className="flex justify-between gap-4">

                    {/* ÖNCEKİ YAZI (Daha Eski) */}
                    {prevPost ? (
                        <Link
                            href={`/blog/${prevPost.slug}`}
                            className="flex flex-col rounded-lg border border-zinc-800 p-4 text-left transition-colors hover:bg-zinc-900/50 hover:border-indigo-500/50 w-full"
                        >
                            <span className="text-xs text-zinc-500 flex items-center gap-1">
                                <ChevronLeft size={14} /> Önceki Yazı
                            </span>
                            <span className="text-sm font-semibold text-white mt-1 leading-snug">
                                {prevPost.title}
                            </span>
                        </Link>
                    ) : (
                        <div className="w-full"></div>
                    )}

                    {/* SONRAKİ YAZI (Daha Yeni) */}
                    {nextPost ? (
                        <Link
                            href={`/blog/${nextPost.slug}`}
                            className="flex flex-col rounded-lg border border-zinc-800 p-4 text-right transition-colors hover:bg-zinc-900/50 hover:border-indigo-500/50 w-full"
                        >
                            <span className="text-xs text-zinc-500 flex items-center justify-end gap-1">
                                Sonraki Yazı <ChevronRight size={14} />
                            </span>
                            <span className="text-sm font-semibold text-white mt-1 leading-snug">
                                {nextPost.title}
                            </span>
                        </Link>
                    ) : (
                        <div className="w-full"></div>
                    )}

                </div>
            </nav>
            {/* NAVİGASYON BÖLÜMÜ BİTİŞİ */}

            {/* Paylaşım Alanı (En altta) */}
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