import { format, parse } from 'date-fns';
import { tr } from 'date-fns/locale';
import fs from 'fs/promises';
import { existsSync, readdirSync } from 'fs';
import matter from 'gray-matter';
import path from 'path';
import GithubSlugger from 'github-slugger';

const contentDirectory = path.join(process.cwd(), 'content', 'blog');

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  summary?: string;
  image?: string;
  [key: string]: unknown;
}

export interface PostListItem {
  slug: string;
  title: string;
  rawDate: Date;
  date: string;
  originalDateString: string;
  description: string;
  readingTime: string;
  content: string;
}

export interface Heading {
  text: string;
  level: number;
  slug: string;
}

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

export function parseDateString(dateStr: string): Date {
  return parse(dateStr, 'dd-MM-yyyy', new Date());
}

export function formatToTurkishDisplay(date: Date): string {
  return format(date, 'dd MMMM yyyy', { locale: tr });
}

/**
 * Okuma süresi hesaplar, kod bloklarını atlayarak daha doğru sonuç verir.
 */
export function calculateReadingTime(content: string): string {
  // Kod bloklarını çıkar (```...```)
  const withoutCode = content.replace(/```[\s\S]*?```/g, '');
  const wordsPerMinute = 200;
  const words = withoutCode.trim().split(/\s+/).filter(Boolean).length;
  const time = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${time} dk okuma`;
}

// ──────────────────────────────────────────────
// Headings
// ──────────────────────────────────────────────

export function getHeadings(source: string): Heading[] {
  const slugger = new GithubSlugger();
  const headingLines = source.split('\n').filter((line) => line.match(/^#{2,3}\s/));

  return headingLines.map((raw) => {
    const text = raw.replace(/^#{2,3}\s/, '');
    const level = raw.startsWith('###') ? 3 : 2;
    const slug = slugger.slug(text);
    return { text, level, slug };
  });
}

// ──────────────────────────────────────────────
// Single post
// ──────────────────────────────────────────────

export async function getPost(slug: string) {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const frontmatterData = data as PostFrontmatter;
    const parsedDate = parseDateString(frontmatterData.date);

    return {
      frontmatter: {
        ...frontmatterData,
        isoDate: parsedDate.toISOString(),
        turkishDisplayDate: formatToTurkishDisplay(parsedDate),
      },
      content,
    };
  } catch {
    return null;
  }
}

// ──────────────────────────────────────────────
// Sorted posts (for prev / next navigation)
// ──────────────────────────────────────────────

export async function getSortedPosts(): Promise<
  { slug: string; dateTimestamp: number; title: string }[]
> {
  if (!existsSync(contentDirectory)) return [];

  const files = readdirSync(contentDirectory);

  const posts = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(contentDirectory, filename);
      const fileContent = await fs.readFile(filePath, 'utf8');
      const { data } = matter(fileContent);
      const parsedDate = parseDateString(data.date);
      return {
        slug: filename.replace('.mdx', ''),
        dateTimestamp: parsedDate.getTime(),
        title: data.title,
      };
    })
  );

  return posts.sort((a, b) => b.dateTimestamp - a.dateTimestamp);
}

// ──────────────────────────────────────────────
// All posts (for blog list page)
// ──────────────────────────────────────────────

export async function getBlogPosts(): Promise<PostListItem[]> {
  if (!existsSync(contentDirectory)) return [];

  const fileNames = readdirSync(contentDirectory);

  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = await fs.readFile(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const parsedDate = parseDateString(data.date);
      const formattedDateDisplay = formatToTurkishDisplay(parsedDate);

      return {
        slug,
        title: data.title,
        rawDate: parsedDate,
        date: formattedDateDisplay,
        originalDateString: data.date,
        description: data.description || '',
        readingTime: calculateReadingTime(content),
        content,
      };
    })
  );

  return allPostsData.sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());
}
