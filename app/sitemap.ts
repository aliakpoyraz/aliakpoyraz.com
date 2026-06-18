import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/mdx';
import { getSwiftSteps } from '@/lib/swift';
import { activeProjects } from '@/lib/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = 'https://aliakpoyraz.com';
    const now = new Date().toISOString();

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: siteUrl,
            lastModified: now,
            changeFrequency: 'yearly',
            priority: 1,
            alternates: {
                languages: {
                    tr: siteUrl,
                    en: `${siteUrl}/en`,
                },
            },
        },
        {
            url: `${siteUrl}/blog`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.8,
            alternates: {
                languages: {
                    tr: `${siteUrl}/blog`,
                    en: `${siteUrl}/en/blog`,
                },
            },
        },
        {
            url: `${siteUrl}/swift`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.7,
            alternates: {
                languages: {
                    tr: `${siteUrl}/swift`,
                    en: `${siteUrl}/en/swift`,
                },
            },
        },
    ];

    // Blog yazıları
    const blogPosts: MetadataRoute.Sitemap = (await getBlogPosts()).map((post) => ({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: post.rawDate.toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
            languages: {
                tr: `${siteUrl}/blog/${post.slug}`,
                en: `${siteUrl}/en/blog/${post.slug}`,
            },
        },
    }));

    // Swift adımları
    const swiftSteps: MetadataRoute.Sitemap = getSwiftSteps().map((step) => ({
        url: `${siteUrl}/swift/${step.slug}`,
        lastModified: step.rawDate.toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        alternates: {
            languages: {
                tr: `${siteUrl}/swift/${step.slug}`,
                en: `${siteUrl}/en/swift/${step.slug}`,
            },
        },
    }));

    // Proje detayları
    const projectPages: MetadataRoute.Sitemap = activeProjects.map((project) => ({
        url: `${siteUrl}/projeler/${project.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        alternates: {
            languages: {
                tr: `${siteUrl}/projeler/${project.slug}`,
                en: `${siteUrl}/en/projeler/${project.slug}`,
            },
        },
    }));

    return [
        ...staticPages,
        ...blogPosts,
        ...swiftSteps,
        ...projectPages,
    ];
}
