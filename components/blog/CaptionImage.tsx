import React from 'react';

export default function CaptionImage({ src, alt, caption }: { src: string, alt: string, caption?: string }) {
    return (
        <figure className="my-8 w-full">
            {/* 1. 'flex flex-col': İçindeki görselin boşluk bırakmadan tam oturmasını sağlar (block/inline sorununu çözer).
        2. 'rounded-xl': Köşeleri yuvarlar.
        3. 'overflow-hidden': Görsel köşelerden taşmasın diye kırpar.
      */}
            <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-800 shadow-2xl bg-zinc-950">
                <img
                    src={src}
                    alt={alt}
                    // 1. '!m-0': Prose'un eklediği margin'i zorla siler.
                    // 2. '!rounded-none': Prose görseli yuvarlamaya çalışırsa iptal eder (kutunun yuvarlağına uyması için).
                    // 3. 'w-full': Genişliğe tam oturur.
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