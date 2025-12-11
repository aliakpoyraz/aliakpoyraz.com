"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const updateScroll = () => {
            const currentScroll = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

            if (scrollHeight) {
                setWidth((currentScroll / scrollHeight) * 100);
            }
        };

        window.addEventListener("scroll", updateScroll);
        return () => window.removeEventListener("scroll", updateScroll);
    }, []);

    if (width === 0) return null;

    return (
        <div className="fixed left-0 top-0 z-50 w-full h-[2px] bg-transparent">
            <div
                className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                style={{
                    width: `${width}%`,
                    transition: 'width 100ms ease-out'
                }}
            />
        </div>
    );
}