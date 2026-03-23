import React from 'react';

export default function CaptionImage({ src, alt, caption }: { src: string, alt: string, caption?: string }) {
    return (
        <figure className="my-10 w-full group">
            <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-zinc-950/80 backdrop-blur-xl">
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