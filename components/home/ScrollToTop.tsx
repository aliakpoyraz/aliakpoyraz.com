"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`
        fixed bottom-24 right-4 xl:bottom-8 xl:right-8 z-50 p-3 rounded-full 
        bg-surface/80 border border-border-main text-fg shadow-xl backdrop-blur-md
        transition-all duration-500 hover:bg-accent-10 hover:text-rose-400 hover:scale-110 hover:-translate-y-1
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
      `}
            aria-label="Yukarı Çık"
        >
            <ArrowUp size={20} />

            {/* Parlama Efekti */}
            <div className="absolute inset-0 -z-10 rounded-full bg-accent-10 blur-md group-hover:bg-accent-20 transition-colors" />
        </button>
    );
}