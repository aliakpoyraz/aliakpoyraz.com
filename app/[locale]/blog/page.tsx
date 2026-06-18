import { getBlogPosts } from '@/lib/mdx';
import BlogList from '@/components/blog/BlogList';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("BlogPage");
    return {
        title: t("title"),
        description: t("description"),
        alternates: {
            types: {
                'application/rss+xml': '/rss.xml',
            },
        },
        openGraph: {
            title: t("title"),
            description: t("description"),
            url: 'https://aliakpoyraz.com/blog',
            siteName: 'Ali Akpoyraz',
            type: 'website',
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: t("title"),
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: t("title"),
            description: t("description"),
            images: ['/og-image.png'],
        },
    };
}

export default async function BlogPage() {
    const posts = await getBlogPosts();
    return <BlogList posts={posts} />;
}
