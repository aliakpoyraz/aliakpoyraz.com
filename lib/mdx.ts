import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

// Okuma süresi hesaplama fonksiyonu (Ortalama 200 kelime/dk)
function calculateReadingTime(content: string) {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return `${time} dk okuma`;
}

export function getBlogPosts() {
    if (!fs.existsSync(contentDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(contentDirectory);

    const allPostsData = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(contentDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // matter ile hem üst veriyi (data) hem içeriği (content) alıyoruz
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title,
            date: data.date,
            description: data.description || "", // Açıklama yoksa boş dön
            readingTime: calculateReadingTime(content), // İçerikten süreyi hesapla
            content: content,
        };
    });

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}