import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
// parse ve format fonksiyonlarını import ediyoruz
import { parse, format } from 'date-fns';
// 🇹🇷 Türkçe locale'i import ediyoruz
import { tr } from 'date-fns/locale';

const contentDirectory = path.join(process.cwd(), 'content');

// Okuma süresi hesaplama fonksiyonu (değişmedi)
function calculateReadingTime(content: string) {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return `${time} dk okuma`;
}

// Dizeyi güvenli bir Date nesnesine çeviren helper fonksiyonu (değişmedi)
function parseDateString(dateStr: string): Date {
    // Frontmatter'dan gelen GG-AA-YYYY formatını güvenli bir şekilde Date nesnesine çevirir.
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

        // Girdiğiniz formatı (DD-MM-YYYY) güvenli bir Date nesnesine çeviriyoruz
        const parsedDate = parseDateString(data.date);

        // 🚀 TARİHİ TÜRKÇE FORMATTA GÖRÜNTÜLEME 🚀
        // format fonksiyonuna 'locale: tr' parametresini ekliyoruz.
        const formattedDateDisplay = format(parsedDate, 'dd MMMM yyyy', {
            locale: tr, // Burası Türkçe ay isimlerini kullanmasını sağlar
        });
        // Örnek çıktı: "12 Şubat 2025"

        return {
            slug,
            title: data.title,
            rawDate: parsedDate,
            date: formattedDateDisplay, // Görüntüleme için (12 Şubat 2025)
            originalDateString: data.date,
            description: data.description || "",
            readingTime: calculateReadingTime(content),
            content: content,
        };
    });

    // Sıralamayı Date nesnesine (rawDate) göre yapıyoruz (En yeni en üstte)
    return allPostsData.sort((a, b) => {
        return b.rawDate.getTime() - a.rawDate.getTime();
    });
}