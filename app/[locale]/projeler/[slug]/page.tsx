import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Star, Github, ExternalLink, GitFork, Eye, Clock, Circle } from 'lucide-react';
import Script from 'next/script';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { getProjectBySlug, activeProjects } from '@/lib/projects';
import { getTranslations } from 'next-intl/server';

// ──────────────────────────────────────────────
// GitHub API
// ──────────────────────────────────────────────

async function getGithubRepo(repoStr: string) {
  try {
    const res = await fetch(`https://api.github.com/repos/${repoStr}`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getGithubLanguages(repoStr: string) {
  try {
    const res = await fetch(`https://api.github.com/repos/${repoStr}/languages`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function fixMdxHtml(content: string, repoStr: string, branch: string): string {
  const rawBaseUrl = `https://raw.githubusercontent.com/${repoStr}/${branch}/`;
  return content
    .replace(/<img\s+([^>]*[^/])>/gi, '<img $1 />')
    .replace(/<br\s*([^>]*[^/])?>/gi, '<br $1 />')
    .replace(/<hr\s*([^>]*[^/])?>/gi, '<hr $1 />')
    .replace(/<img([^>]*)src=["'](?!http|https|data:)([^"']+)["']([^>]*)>/gi, `<img$1src="${rawBaseUrl}$2"$3>`)
    .replace(/!\[([^\]]*)]\((?!http|https|#)([^)]+)\)/g, `![$1](${rawBaseUrl}$2)`);
}

async function getGithubReadme(repoStr: string, branch: string) {
  try {
    const res = await fetch(`https://api.github.com/repos/${repoStr}/readme`, {
      headers: { Accept: 'application/vnd.github.v3.raw' },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const text = await res.text();
    return fixMdxHtml(text, repoStr, branch);
  } catch {
    return null;
  }
}

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

// timeAgo → çeviri dosyasındaki key + count döndürür, render'da t() ile çözülür
function getTimeAgo(dateStr: string): { key: string; count: number } | null {
  if (!dateStr) return null;
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (days < 1) return { key: 'today', count: 1 };
  if (days < 30) return { key: 'day_ago', count: days };
  const months = Math.floor(days / 30);
  if (months < 12) return { key: 'month_ago', count: months };
  return { key: 'year_ago', count: Math.floor(days / 365) };
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6', JavaScript: '#f1e05a', Swift: '#f05138',
  'C#': '#178600', Python: '#3572a5', HTML: '#e34c26', CSS: '#563d7c',
  Go: '#00add8', Rust: '#dea584', Kotlin: '#a97bff', Dart: '#00b4ab',
  Shell: '#89e051', Dockerfile: '#384d54', Markdown: '#083fa1',
};

function getLangColor(lang: string): string {
  return LANG_COLORS[lang] || '#6e7681';
}

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Proje Bulunamadı' };

  const siteUrl = 'https://aliakpoyraz.com';
  const pageUrl = `${siteUrl}/projeler/${slug}`;

  return {
    title: `${project.title} | Ali Akpoyraz`,
    description: project.description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/projeler/${slug}`,
    },
    openGraph: {
      title: `${project.title} | Ali Akpoyraz`,
      description: project.description,
      url: pageUrl,
      siteName: 'Ali Akpoyraz',
      locale: 'tr_TR',
      type: 'article',
      authors: ['Ali Akpoyraz'],
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: ['/og-image.png'],
    },
  };
}

// ──────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const t = await getTranslations('ProjectDetails');
  const tData = await getTranslations('ProjectData');
  const tProjects = await getTranslations('Projects');

  if (!project) notFound();

  const translatedTitle = tData(`${project.slug}.title` as never) || project.title;
  const translatedDesc = tData(`${project.slug}.desc` as never) || project.description;
  const translatedStatus =
    project.status === 'Canlı' ? tProjects('status_canli') : tProjects('status_gelistirildi');

  const [repoData, languagesData] = await Promise.all([
    getGithubRepo(project.githubRepo),
    getGithubLanguages(project.githubRepo),
  ]);
  const branch = repoData?.default_branch || 'main';
  const readmeContent = await getGithubReadme(project.githubRepo, branch);

  const stars = repoData?.stargazers_count ?? 0;
  const forks = repoData?.forks_count ?? 0;
  const watchers = repoData?.watchers_count ?? 0;
  const updatedAt = repoData?.updated_at ?? null;
  const repoDescription = repoData?.description ?? null;
  const license = repoData?.license?.spdx_id ?? null;
  const timeInfo = updatedAt ? getTimeAgo(updatedAt) : null;

  const languages = languagesData
    ? Object.entries(languagesData as Record<string, number>)
        .sort(([, a], [, b]) => b - a)
        .map(([name, bytes]) => ({ name, bytes }))
    : [];
  const totalBytes = languages.reduce((sum, l) => sum + l.bytes, 0);

  const topics: string[] = (repoData?.topics || []).map((t: string) => {
    const lower = t.toLowerCase();
    if (lower === 'nextjs') return 'Next.js';
    if (lower === 'ios') return 'iOS';
    if (lower === 'macos') return 'macOS';
    return t.charAt(0).toUpperCase() + t.slice(1);
  });

  const allTechStack = Array.from(new Set([...project.tags, ...topics]));

  // Bileşenlerde tekrar eden buton stili
  const btnOutline =
    'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-surface border border-border-main text-muted hover:text-rose-400 hover:border-rose-500/30 hover:bg-rose-500/5 transition-all duration-300 group';

  const metaBadge =
    'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface border border-border-main backdrop-blur-sm text-xs font-semibold';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: translatedTitle,
    description: translatedDesc,
    url: `https://aliakpoyraz.com/projeler/${project.slug}`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: repoData?.description?.includes('iOS') || project.tags.includes('Swift') ? 'iOS, macOS' : 'Web, Cross-platform',
    author: {
      '@type': 'Person',
      name: 'Ali Akpoyraz',
      url: 'https://aliakpoyraz.com',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <article className="w-full max-w-2xl mx-auto mt-8 md:mt-16 px-4 mb-20">
      <Script
        id="project-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Geri dön ── */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-rose-400 mb-8 bg-surface border border-border-main hover:border-rose-500/30 hover:bg-accent-10 transition-all duration-300 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        {t('back_to_home')}
      </Link>

      {/* ══════════════════════════════════════════
          HEADER — site kart stili
          ══════════════════════════════════════════ */}
      <header className="group relative flex flex-col p-6 md:p-8 rounded-3xl bg-transparent border border-border-main hover:border-rose-500/30 transition-all duration-500 mb-14">
        {/* Başlık + rozetler */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tighter text-fg mb-3 leading-tight group-hover:text-rose-400 transition-colors">
              {translatedTitle}
            </h1>
            <p className="text-muted text-base leading-relaxed max-w-2xl font-medium group-hover:text-fg/70 transition-colors">
              {repoDescription || translatedDesc}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border ${project.statusColor}`}>
              {translatedStatus}
            </span>
            {license && (
              <span className="text-[10px] font-semibold text-muted/60 uppercase tracking-wider bg-surface border border-border-main px-2 py-1 rounded-md">
                {license}
              </span>
            )}
          </div>
        </div>

        {/* ── GitHub Meta ── */}
        <div className="flex flex-wrap items-center gap-2 mb-6 font-mono">
          <div className={`${metaBadge} text-rose-500/80 bg-rose-500/5 border-rose-500/10`}>
            <Star size={13} className="text-rose-500 fill-rose-500/20" />
            <span className="text-fg/90">{formatNumber(stars)}</span>
          </div>
          <div className={`${metaBadge} text-muted/70`}>
            <GitFork size={13} />
            <span className="text-fg/90">{formatNumber(forks)}</span>
          </div>
          <div className={`${metaBadge} text-muted/70`}>
            <Eye size={13} />
            <span className="text-fg/90">{formatNumber(watchers)}</span>
          </div>
          {timeInfo && (
            <div className={`${metaBadge} text-muted/70`}>
              <Clock size={13} />
              <span>{t(timeInfo.key, { count: timeInfo.count })}</span>
            </div>
          )}
        </div>

        {/* ── Dil Dağılımı ── */}
        {languages.length > 0 && (
          <div className="mb-6">
            <div className="flex h-2 rounded-full overflow-hidden mb-3 bg-border-main/30">
              {languages.map((lang) => {
                const pct = (lang.bytes / totalBytes) * 100;
                return pct < 2 ? null : (
                  <span
                    key={lang.name}
                    className="h-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: getLangColor(lang.name) }}
                    title={`${lang.name} ${pct.toFixed(1)}%`}
                  />
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
              {languages.slice(0, 6).map((lang) => (
                <div key={lang.name} className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: getLangColor(lang.name) }}
                  />
                  <span className="text-xs font-medium text-muted">
                    {lang.name}
                    <span className="text-muted/50 ml-1">
                      {((lang.bytes / totalBytes) * 100).toFixed(1)}%
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Butonlar ── */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`https://github.com/${project.githubRepo}`}
            target="_blank"
            rel="noopener noreferrer"
            className={btnOutline}
          >
            <Github size={16} className="group-hover:text-rose-400 transition-colors" />
            <span>{t('github_repo')}</span>
          </a>

          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className={btnOutline}
            >
              <ExternalLink size={16} className="group-hover:text-rose-400 transition-colors" />
              <span>{t('live_preview')}</span>
            </a>
          )}
        </div>

        {/* ── Tech Stack ── */}
        {allTechStack.length > 0 && (
          <div className="mt-6 pt-6 border-t border-border-main">
            <h3 className="text-[10px] font-bold text-muted/50 mb-3 uppercase tracking-[0.2em]">
              {t('tech_used')}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              {allTechStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-transparent border border-border-main text-muted hover:border-rose-500/30 hover:text-rose-400 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════
          README
          ══════════════════════════════════════════ */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-8 rounded-full bg-rose-500/40" />
          <div className="flex items-center gap-2.5">
            <Github size={18} className="text-muted" />
            <h2 className="text-lg font-bold text-fg">README.md</h2>
          </div>
        </div>

        {readmeContent ? (
          <div
            className="prose prose-zinc dark:prose-invert max-w-none 
              prose-headings:scroll-mt-20
              prose-a:!text-rose-400 prose-a:!font-bold prose-a:!no-underline hover:prose-a:underline
              prose-headings:font-bold prose-headings:text-fg
              prose-p:text-muted prose-p:leading-relaxed
              prose-strong:text-fg prose-strong:font-semibold
              prose-ul:list-disc prose-ul:pl-5 prose-ul:marker:text-border-main
              prose-ol:list-decimal prose-ol:pl-5 prose-ol:marker:text-border-main
              prose-code:text-rose-500 dark:prose-code:text-rose-300 prose-code:bg-rose-500/10 prose-code:border prose-code:border-rose-500/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-lg prose-code:font-normal
              prose-pre:bg-surface prose-pre:border prose-pre:border-border-main prose-pre:rounded-2xl
              prose-table:border-collapse prose-table:w-full prose-table:my-8
              prose-thead:border-b prose-thead:border-border-main
              prose-th:text-fg prose-th:font-semibold prose-th:p-3 prose-th:text-left
              prose-tr:border-b prose-tr:border-border-main hover:prose-tr:bg-surface
              prose-td:text-muted prose-td:p-3
              prose-blockquote:border-l-2 prose-blockquote:border-rose-500/50 prose-blockquote:bg-surface prose-blockquote:px-5 prose-blockquote:py-2 prose-blockquote:not-italic prose-blockquote:text-muted
              prose-img:rounded-2xl prose-img:border prose-img:border-border-main
            "
          >
            <MDXRemote
              source={readmeContent}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center rounded-3xl border border-border-main bg-transparent">
            <Circle size={40} className="text-muted/30 mb-4" />
            <p className="text-muted/60 text-sm font-medium">{t('readme_error')}</p>
          </div>
        )}
      </section>

      {/* ── Alt Navigasyon ── */}
      <div className="mt-14 pt-6 border-t border-border-main">
        <Link
          href="/#projeler"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-rose-400 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          {t('see_other_projects')}
        </Link>
      </div>
    </article>
  );
}

export function generateStaticParams() {
  return activeProjects.map((project) => ({
    slug: project.slug,
  }));
}
