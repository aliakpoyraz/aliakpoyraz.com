import React from 'react';

type Heading = {
    text: string;
    level: number;
    slug: string;
};

export default function TableOfContents({ headings }: { headings: Heading[] }) {
    if (headings.length === 0) return null;

    return (
        <nav className="my-8 pl-4 border-l border-rose-500/30">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">İçindekiler</h2>
            <ul className="flex flex-col gap-2">
                {headings.map((heading, index) => (
                    <li
                        key={index}
                        className={`text-sm transition-colors duration-200 hover:text-rose-400 ${heading.level === 3 ? 'ml-3 text-muted/60' : 'text-muted/80'
                            }`}
                    >
                        <a
                            href={`#${heading.slug}`}
                            className="block no-underline"
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}