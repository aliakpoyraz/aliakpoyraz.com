"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileUser, Mail, BookOpen } from 'lucide-react';

const navItems = [
    { icon: <Home size={18} />, href: "/", label: "Anasayfa" },
    { icon: <FileUser size={18} />, href: "/cv", label: "CV" },
    { icon: <BookOpen size={18} />, href: "/blog", label: "Blog" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="absolute top-6 left-1/2 -translate-x-1/2 z-50 group">

            {/* GLOW */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-700 via-zinc-400 to-zinc-700 rounded-full opacity-20 blur-md group-hover:opacity-60 transition duration-500"></div>

            <nav className="relative flex items-center gap-1 p-1.5 rounded-full border border-white/10 bg-zinc-950/95 backdrop-blur-2xl shadow-2xl">

                {navItems.map((item, index) => {
                    const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                    return (
                        <div key={index} className="flex items-center">
                            <Link
                                href={item.href}
                                className={`
                  relative px-4 py-2.5 rounded-full transition-all duration-300 group/item
                  ${isActive ? "text-white" : "text-zinc-500 hover:text-zinc-200"}
                `}
                                title={item.label}
                            >
                                {/* AKTİF İSE ARKADAKİ IŞIK (Pill Shape) */}
                                {isActive && (
                                    <span className="absolute inset-0 bg-white/10 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)]"></span>
                                )}

                                {/* HOVER EFEKTİ */}
                                <span className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover/item:opacity-100 transition-opacity scale-90 group-hover/item:scale-100"></span>

                                {/* İKON */}
                                <span className={`relative z-10 block transition-transform duration-300 ${isActive ? "scale-110" : "group-hover/item:scale-110"}`}>
                                    {item.icon}
                                </span>

                            </Link>
                            {index < navItems.length - 1 && (
                                <div className="h-4 w-[1px] bg-zinc-800/50 mx-1"></div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </header>
    );
}