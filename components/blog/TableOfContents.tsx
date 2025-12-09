import React from 'react';

type Heading = {
    text: string;
    level: number;
    slug: string;
};

export default function TableOfContents({ headings }: { headings: Heading[] }) {
    if (headings.length === 0) return null;

    return (
        <nav className="my-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="mb-4 text-lg font-bold text-white">İçindekiler</h2>
            <ul className="flex flex-col gap-2.5">
                {headings.map((heading, index) => (
                    <li
                        key={index}
                        className={`text-sm transition-colors hover:text-indigo-400 ${heading.level === 3 ? 'ml-4 text-zinc-500' : 'text-zinc-300'
                            }`}
                    >
                        <a
                            href={`#${heading.slug}`}
                            className="block no-underline hover:underline"
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}