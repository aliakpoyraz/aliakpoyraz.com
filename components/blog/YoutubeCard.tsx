import React from 'react';

const YouTubeCard = ({ url }: { url: string }) => {
    const videoId = url.split('v=')[1]?.split('&')[0];

    if (!videoId) return <p className="text-red-500">Hatalı YouTube Linki</p>;

    return (
        <div className="my-8 w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl shadow-2xl">
            <div className="relative pb-[56.25%] h-0">
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video"
                    allowFullScreen
                />
            </div>
        </div>
    );
};

export default YouTubeCard;