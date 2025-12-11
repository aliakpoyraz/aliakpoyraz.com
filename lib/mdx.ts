import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { parse, format } from 'date-fns';
import { tr } from 'date-fns/locale';

const contentDirectory = path.join(process.cwd(), 'content');

function calculateReadingTime(content: string) {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return `${time} dk okuma`;
}
function parseDateString(dateStr: string): Date {
    return parse(dateStr, 'dd-MM-yyyy', new Date());
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
        const { data, content } = matter(fileContents);
        const parsedDate = parseDateString(data.date);

        const formattedDateDisplay = format(parsedDate, 'dd MMMM yyyy', {
            locale: tr,
        });

        return {
            slug,
            title: data.title,
            rawDate: parsedDate,
            date: formattedDateDisplay,
            originalDateString: data.date,
            description: data.description || "",
            readingTime: calculateReadingTime(content),
            content: content,
        };
    });

    return allPostsData.sort((a, b) => {
        return b.rawDate.getTime() - a.rawDate.getTime();
    });
}