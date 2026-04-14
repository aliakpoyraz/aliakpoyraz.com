"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail, FileText, Code2, Terminal, Database, Cpu } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { useTranslations } from "next-intl";

export default function ProfileCard() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
    const t = useTranslations("ProfileCard");
    const socialLinks = [
        { icon: <Mail size={18} />, href: "mailto:aliakpoyraz@gmail.com", label: "Email" },
        { icon: <FileText size={18} />, href: "/cv.pdf", label: "CV" },
        { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/aliakpoyraz", label: "LinkedIn" },
        { icon: <Github size={18} />, href: "https://github.com/aliakpoyraz", label: "GitHub" },
    ];

    const techStack = [
        { icon: <Code2 size={16} />, name: "Swift" },
        { icon: <Terminal size={16} />, name: "React" },
        { icon: <Database size={16} />, name: "PostgreSQL" },
        { icon: <Cpu size={16} />, name: "Docker" },
    ];

    return (
        <div
            ref={ref}
            className={`relative w-full max-w-2xl mx-auto group transition-all duration-700 ease-out ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
                }`}
        >
            {/* Şeffaf ve Minimal Profil Başlığı */}
            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 pb-10 border-b border-white/5">

                {/* Profil Fotoğrafı */}
                <div className="relative flex-shrink-0">
                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border border-rose-500/30 shadow-[0_0_30px_rgba(251,113,133,0.15)] relative group/img">
                        <Image
                            src="/uploads/me.jpg"
                            alt="Ali Akpoyraz"
                            fill
                            className="object-cover transition-transform duration-700 group-hover/img:scale-110"
                            priority
                        />
                    </div>
                    {/* Rozet */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 md:px-4 md:py-1.5 bg-zinc-900 border border-rose-500/30 rounded-full text-[10px] md:text-xs text-rose-400 whitespace-nowrap shadow-xl">
                        {t("badge")}
                    </div>
                </div>

                {/* İçerik */}
                <div className="flex-1 text-center md:text-left space-y-4 md:space-y-5 z-10 w-full pt-2">

                    {/* Başlık */}
                    <div className="space-y-1">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                                Ali AKPOYRAZ
                            </h1>
                        </div>

                        <p className="text-zinc-500 text-sm md:text-base font-light mt-1">
                            <span className="text-rose-400">{t("title")}</span> <span className="text-rose-500/60 mx-2">•</span> {t("subtitle_student")}
                        </p>
                    </div>

                    {/* Biyografi */}
                    <p className="text-zinc-500 leading-relaxed text-sm md:text-base">
                        {t("bio_1")}
                        <span className="block h-2 md:h-4"></span>
                        {t("bio_2")}
                    </p>

                    {/* Teknolojiler */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        {techStack.map((tech, i) => (
                            <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/40 transition-colors cursor-default">
                                {tech.icon}
                                <span>{tech.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* Sosyal Medya */}
                    <div className="pt-2 flex justify-center md:justify-start gap-3">
                        {socialLinks.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-500 hover:text-rose-400 hover:border-rose-500/30 hover:bg-rose-500/10 transition-all duration-300"
                                title={item.label}
                            >
                                {item.icon}
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}