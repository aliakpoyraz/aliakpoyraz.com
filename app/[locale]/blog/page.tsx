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
    };
}

export default function BlogPage() {
    const posts = getBlogPosts();
    return <BlogList posts={posts} />;
}
