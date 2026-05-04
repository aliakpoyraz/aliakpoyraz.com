import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { parse, format } from 'date-fns';
import { tr } from 'date-fns/locale';

const swiftContentDirectory = path.join(process.cwd(), 'content/swift');

function parseDateString(dateStr: string): Date {
    return parse(dateStr, 'dd-MM-yyyy', new Date());
}

export function getSwiftSteps() {
    if (!fs.existsSync(swiftContentDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(swiftContentDirectory);

    const allStepsData = fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, '');
            const fullPath = path.join(swiftContentDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);
            
            const parsedDate = data.date ? parseDateString(data.date) : new Date();
            const formattedDateDisplay = data.date ? format(parsedDate, 'dd MMMM yyyy', {
                locale: tr,
            }) : '';

            return {
                slug,
                title: data.title || '',
                step: data.step !== undefined ? data.step : 999,
                rawDate: parsedDate,
                date: formattedDateDisplay,
                originalDateString: data.date || '',
                description: data.description || "",
                content: content,
            };
        });

    return allStepsData.sort((a, b) => {
        return a.step - b.step; // Sort by step ascending
    });
}

export function getSwiftStepBySlug(slug: string) {
    const fullPath = path.join(swiftContentDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const parsedDate = data.date ? parseDateString(data.date) : new Date();
    const formattedDateDisplay = data.date ? format(parsedDate, 'dd MMMM yyyy', {
        locale: tr,
    }) : '';

    return {
        slug,
        title: data.title || '',
        step: data.step !== undefined ? data.step : 999,
        rawDate: parsedDate,
        date: formattedDateDisplay,
        originalDateString: data.date || '',
        description: data.description || "",
        content: content,
    };
}
