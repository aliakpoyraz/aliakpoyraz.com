import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Star, Github, ExternalLink } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { getProjectBySlug, activeProjects } from '@/lib/projects';
import { getTranslations } from 'next-intl/server';

// Minimalist tech etiği stili
function getTechColor() {
    return 'px-3 py-1.5 text-xs font-semibold rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-400 transition-colors cursor-default';
}

// Yıldız sayısı ve repo bilgileri için
async function getGithubRepo(repoStr: string) {
    try {
        const res = await fetch(`https://api.github.com/repos/${repoStr}`, {
            headers: { Accept: 'application/vnd.github.v3+json' },
            cache: 'no-store',
        });
        if (!res.ok) return null;
        return res.json();
    } catch (e) {
        return null;
    }
}

// Yazılım dillerini çekmek için
async function getGithubLanguages(repoStr: string) {
    try {
        const res = await fetch(`https://api.github.com/repos/${repoStr}/languages`, {
            headers: { Accept: 'application/vnd.github.v3+json' },
            cache: 'no-store',
        });
        if (!res.ok) return null;
        return res.json();
    } catch (e) {
        return null;
    }
}

// Helper to self-close void HTML tags and fix relative image URLs
function fixMdxHtml(content: string, repoStr: string, branch: string): string {
    const rawBaseUrl = `https://raw.githubusercontent.com/${repoStr}/${branch}/`;

    return content
        // Self-close void elements
        .replace(/<img\s+([^>]*[^\/])>/gi, '<img $1 />')
        .replace(/<br\s*([^>]*[^\/])?>/gi, '<br $1 />')
        .replace(/<hr\s*([^>]*[^\/])?>/gi, '<hr $1 />')
        // Fix relative image tags: <img src="relative/path"... />
        .replace(/<img([^>]*)src=["'](?!http|https|data:)([^"']+)["']([^>]*)>/gi, `<img$1src="${rawBaseUrl}$2"$3>`)
        // Fix relative Markdown images: ![alt](relative/path)
        .replace(/!\[([^\]]*)\]\((?!http|https|#)([^)]+)\)/g, `![$1](${rawBaseUrl}$2)`);
}

// Fetch the README.md content from GitHub
async function getGithubReadme(repoStr: string, branch: string) {
    try {
        const res = await fetch(`https://api.github.com/repos/${repoStr}/readme`, {
            headers: {
                Accept: 'application/vnd.github.v3.raw',
            },
            next: { revalidate: 3600 },
        });
        if (!res.ok) return null;
        const text = await res.text();
        return fixMdxHtml(text, repoStr, branch);
    } catch (e) {
        return null;
    }
}

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) return { title: 'Proje Bulunamadı' };

    return {
        title: `${project.title} | Ali Akpoyraz`,
        description: project.description,
    };
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    const t = await getTranslations("ProjectDetails");
    const tData = await getTranslations("ProjectData");
    const tProjects = await getTranslations("Projects");

    if (!project) {
        notFound();
    }
    
    const translatedTitle = tData(`${project.slug}.title` as any) || project.title;
    const translatedDesc = tData(`${project.slug}.desc` as any) || project.description;
    const translatedStatus = project.status === "Canlı" ? tProjects("status_canli") : tProjects("status_gelistirildi");

    const [repoData, languagesData] = await Promise.all([
        getGithubRepo(project.githubRepo),
        getGithubLanguages(project.githubRepo)
    ]);
    const branch = repoData?.default_branch || 'main';
    const readmeContent = await getGithubReadme(project.githubRepo, branch);

    const stars = repoData?.stargazers_count ?? 0;
    const languages = languagesData ? Object.keys(languagesData) : [];
    const topics = (repoData?.topics || []).map((t: string) => {
        // Özel isimlendirme kuralları (Next.js, iOS vb. için)
        const lower = t.toLowerCase();
        if (lower === 'nextjs') return 'Next.js';
        if (lower === 'ios') return 'iOS';
        if (lower === 'macos') return 'macOS';
        return t.charAt(0).toUpperCase() + t.slice(1);
    });

    // Tekrarlanan etiketleri önlemek için benzersiz bir dizi (Set) oluşturuyoruz
    const allTechStack = Array.from(new Set([...languages, ...topics]));

    return (
        <article className="w-full max-w-3xl mx-auto mt-8 md:mt-16 px-4 mb-20">
            <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-500 hover:text-rose-400 mb-10 bg-zinc-900/50 border border-zinc-800 hover:border-rose-500/30 hover:bg-rose-500/5 transition-all duration-300 group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                {t("back_to_home")}
            </Link>

            <header className="mb-10 pb-10 border-b border-white/5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-6">
                    <div>
                        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
                            {translatedTitle}
                        </h1>
                        <p className="text-zinc-500 text-lg leading-relaxed max-w-2xl">
                            {translatedDesc}
                        </p>
                    </div>

                    <div className="flex flex-col items-start sm:items-end gap-3 flex-shrink-0">
                        <div className="flex items-center gap-2">
                            <span className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border ${project.statusColor}`}>
                                {translatedStatus}
                            </span>
                            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold">
                                <Star size={14} className="text-rose-500 fill-rose-500/20" />
                                {stars}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-6">
                    <a
                        href={`https://github.com/${project.githubRepo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-rose-400 bg-zinc-900/50 border border-zinc-800 hover:border-rose-500/30 hover:bg-rose-500/10 transition-all duration-300 group"
                    >
                        <Github size={16} className="group-hover:text-rose-400 transition-colors" />
                        <span>{t("github_repo")}</span>
                    </a>

                    {project.demoLink && (
                        <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-rose-400 bg-zinc-900/50 border border-zinc-800 hover:border-rose-500/30 hover:bg-rose-500/10 transition-all duration-300 group"
                        >
                            <ExternalLink size={16} className="group-hover:text-rose-400 transition-colors" />
                            <span>{t("live_preview")}</span>
                        </a>
                    )}
                </div>

                {allTechStack.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-white/5">
                        <h3 className="text-xs font-semibold text-zinc-500 mb-3 uppercase tracking-wider">{t("tech_used")}</h3>
                        <div className="flex flex-wrap items-center gap-2">
                            {allTechStack.map((tech) => (
                                <span key={tech} className={getTechColor()}>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            <div className="mb-8">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
                    <Github size={20} className="text-zinc-500" />
                    <h2 className="text-lg font-bold text-zinc-300">README.md</h2>
                </div>

                {readmeContent ? (
                    <div className="prose prose-invert prose-zinc max-w-none 
                        prose-headings:scroll-mt-20
                        prose-a:!text-rose-400 prose-a:!font-bold prose-a:!no-underline hover:prose-a:underline
                        prose-headings:font-bold prose-headings:text-white 
                        prose-p:text-zinc-500 prose-p:leading-relaxed
                        prose-strong:text-zinc-300 prose-strong:font-semibold
                        prose-ul:list-disc prose-ul:pl-5 prose-ul:marker:text-zinc-600
                        prose-ol:list-decimal prose-ol:pl-5 prose-ol:marker:text-zinc-600
                        prose-code:text-rose-300 prose-code:bg-rose-500/10 prose-code:border prose-code:border-rose-500/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-lg prose-code:font-normal
                        prose-pre:bg-zinc-900/50 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-2xl
                        prose-table:border-collapse prose-table:w-full prose-table:my-8
                        prose-thead:border-b prose-thead:border-zinc-800
                        prose-th:text-zinc-300 prose-th:font-semibold prose-th:p-3 prose-th:text-left
                        prose-tr:border-b prose-tr:border-zinc-800/50 hover:prose-tr:bg-zinc-900/30
                        prose-td:text-zinc-500 prose-td:p-3
                        prose-blockquote:border-l-2 prose-blockquote:border-rose-500/50 prose-blockquote:bg-zinc-900/30 prose-blockquote:px-5 prose-blockquote:py-2 prose-blockquote:not-italic prose-blockquote:text-zinc-400
                        prose-img:rounded-2xl prose-img:border prose-img:border-zinc-800
                    ">
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
                    <div className="text-zinc-500 py-10 text-center">
                        {t("readme_error")}
                    </div>
                )}
            </div>
        </article>
    );
}

export function generateStaticParams() {
    return activeProjects.map((project) => ({
        slug: project.slug,
    }));
}
