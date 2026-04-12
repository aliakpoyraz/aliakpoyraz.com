"use client";

import { useEffect, useState } from "react";
import { Link } from "@/routing";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Home, Briefcase, Heart, Github, BookOpen, Activity } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function SideNav() {
    const t = useTranslations("SideNav");
    
    const navItems = [
        { id: "baslangic", label: t("baslangic"), icon: <Home size={18} />, href: "/#baslangic" },
        { id: "deneyim", label: t("deneyim"), icon: <Briefcase size={18} />, href: "/#deneyim" },
        { id: "gonulluluk", label: t("gonulluluk"), icon: <Heart size={18} />, href: "/#gonulluluk" },
        { id: "aktif-calismalar", label: t("aktif-calismalar"), icon: <Activity size={18} />, href: "/#aktif-calismalar" },
        { id: "son-projeler", label: t("son-projeler"), icon: <Github size={18} />, href: "/#son-projeler" },
        { id: "blog", label: t("blog"), icon: <BookOpen size={18} />, href: "/blog" },
    ];

    const [activeSection, setActiveSection] = useState("baslangic");
    const [isVisible, setIsVisible] = useState(true);
    const pathname = usePathname();
    const isHome = pathname === "/" || pathname === "/en" || pathname === "/tr";

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(!entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        const footer = document.getElementById("footer");
        if (footer) observer.observe(footer);

        if (!isHome) {
            if (pathname?.includes("/blog")) {
                setActiveSection("blog");
            }
            return () => {
                if (footer) observer.unobserve(footer);
            };
        }

        const handleScroll = () => {
            const sections = navItems
                .filter(item => item.id !== "blog")
                .map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(navItems[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        // İlk kaydırma kontrolü
        handleScroll();
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (footer) observer.unobserve(footer);
        };
    }, [isHome, pathname]);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        if (isHome && id !== "blog") {
            e.preventDefault();
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <aside id="sidenav" className={`fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 xl:bottom-auto xl:left-[calc(50%-26rem)] xl:top-[55%] xl:-translate-y-1/2 z-50 flex flex-row xl:flex-col gap-1.5 sm:gap-3 xl:gap-4 p-1.5 sm:p-2 xl:p-0 rounded-2xl xl:rounded-none bg-zinc-950/80 xl:bg-transparent backdrop-blur-xl xl:backdrop-blur-none border border-white/5 xl:border-none shadow-2xl xl:shadow-none transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}>
            
            <LanguageSwitcher />
            
            {/* Ayırıcı Çizgi */}
            <div className="w-[1px] xl:w-full h-8 xl:h-[1px] bg-white/10 rounded-full mx-1 xl:mx-0 xl:my-1 flex-shrink-0" />

            {navItems.map((item) => {
                const isItemActive = activeSection === item.id;

                return (
                    <Link
                        key={item.id}
                        href={item.href as any}
                        onClick={(e) => scrollToSection(e, item.id)}
                        className="group relative flex items-center gap-4 transition-all duration-300"
                    >
                        {/* Menü Etiketi */}
                        <span className={`
                            absolute left-full ml-4 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 
                            text-xs font-medium text-zinc-400 whitespace-nowrap
                            opacity-0 -translate-x-2 pointer-events-none hidden xl:block
                            group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300
                        `}>
                            {item.label}
                        </span>

                        {/* İkon Taşıyıcısı */}
                        <div className={`
                            relative flex items-center justify-center w-[34px] h-[34px] sm:w-10 sm:h-10 xl:w-11 xl:h-11 rounded-xl border transition-all duration-300
                            ${isItemActive
                                ? "bg-white/10 border-white/20 text-white shadow-[0_0_25px_rgba(255,255,255,0.1)] scale-110"
                                : "bg-zinc-950/50 border-white/5 text-zinc-500 hover:text-zinc-200 hover:border-white/10 hover:bg-zinc-900/50"}
                        `}>
                            {item.icon}
                        </div>
                    </Link>
                );
            })}
        </aside>
    );
}
