import React from 'react';

export default function CaptionImage({ src, alt, caption }: { src: string, alt: string, caption?: string }) {
    return (
        <figure className="my-8 w-full">
            <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-800 shadow-2xl bg-zinc-950">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-auto object-cover !m-0 !rounded-none"
                />
            </div>

            {caption && (
                <figcaption className="mt-3 text-center text-sm text-zinc-500 italic">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}