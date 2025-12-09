import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
    const contentDir = path.join(process.cwd(), 'content');
    const files = fs.readdirSync(contentDir);

    const siteUrl = 'https://aliakpoyraz.com';

    const posts = files.map((file) => ({
        url: `${siteUrl}/blog/${file.replace('.mdx', '')}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [
        {
            url: siteUrl,
            lastModified: new Date().toISOString(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${siteUrl}/blog`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...posts,
    ];
}