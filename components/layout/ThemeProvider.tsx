"use client";

import React, { useEffect, useState } from "react";
import { Theme, ThemeContext } from "../context/ThemeContext";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");
    const [mounted, setMounted] = useState(false);

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        // localStorage'dan tema tercihini oku
        const savedTheme = localStorage.getItem("theme") as Theme | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle("dark", savedTheme === "dark");
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const initialTheme = prefersDark ? "dark" : "light";
            setTheme(initialTheme);
            document.documentElement.classList.toggle("dark", initialTheme === "dark");
        }
        setMounted(true);
    }, []);
    /* eslint-enable react-hooks/set-state-in-effect */

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div style={{ opacity: mounted ? 1 : 0 }} className="transition-opacity duration-300">
                {children}
            </div>
        </ThemeContext.Provider>
    );
}
