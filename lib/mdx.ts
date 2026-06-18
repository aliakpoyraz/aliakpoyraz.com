import { format, parse } from 'date-fns';
import { tr } from 'date-fns/locale';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import GithubSlugger from 'github-slugger';

const contentDirectory = path.join(process.cwd(), 'content', 'blog');

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

export interface PostFrontmatter {
  title: string;
  date: string; // GG-AA-YYYY
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

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
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

export function getPost(slug: string) {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
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

export function getSortedPosts(): { slug: string; dateTimestamp: number; title: string }[] {
  if (!fs.existsSync(contentDirectory)) return [];

  const files = fs.readdirSync(contentDirectory);
  return files
    .map((filename) => {
      const filePath = path.join(contentDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      const parsedDate = parseDateString(data.date);
      return {
        slug: filename.replace('.mdx', ''),
        dateTimestamp: parsedDate.getTime(),
        title: data.title,
      };
    })
    .sort((a, b) => b.dateTimestamp - a.dateTimestamp);
}

// ──────────────────────────────────────────────
// All posts (for blog list page)
// ──────────────────────────────────────────────

export function getBlogPosts(): PostListItem[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(contentDirectory);

  const allPostsData: PostListItem[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
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
  });

  return allPostsData.sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());
}
