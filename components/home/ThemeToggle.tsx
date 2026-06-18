"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/context/ThemeContext";

/**
 * ThemeToggle, ThemeProvider'ın opacity wrapper'ı sayesinde
 * hydration hatası olmadan doğrudan theme context'ini okur.
 * Ayrı bir mounted state'e gerek yoktur.
 */
export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg transition-all duration-300 bg-transparent border border-transparent text-muted/60 hover:text-rose-400 hover:border-border-main hover:bg-surface group"
            title={theme === "dark" ? "Light Mode" : "Dark Mode"}
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? (
                <Sun size={16} className="transition-transform duration-500 group-hover:rotate-12" />
            ) : (
                <Moon size={16} className="transition-transform duration-500 group-hover:-rotate-12" />
            )}
        </button>
    );
}
