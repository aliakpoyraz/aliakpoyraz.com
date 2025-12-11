"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail, FileText, Code2, Terminal, Database, Cpu } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export default function ProfileCard() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
    const socialLinks = [
        { icon: <Mail size={18} />, href: "mailto:aliakpoyraz@gmail.com", label: "Email" },
        { icon: <FileText size={18} />, href: "/cv", label: "CV" },
        { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/aliakpoyraz", label: "LinkedIn" },
        { icon: <Github size={18} />, href: "https://github.com/aliakpoyraz", label: "GitHub" },
    ];

    const techStack = [
        { icon: <Code2 size={16} />, name: "Next.js" },
        { icon: <Terminal size={16} />, name: "React" },
        { icon: <Database size={16} />, name: "PostgreSQL" },
        { icon: <Cpu size={16} />, name: "Docker" },
    ];

    return (
        <div 
            ref={ref}
            className={`relative w-full max-w-2xl mx-auto group transition-all duration-700 ease-out ${
                isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-8"
            }`}
        >

            {/* Gradient glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700 rounded-[2rem] opacity-20 blur group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

            {/* Card container */}
            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8 p-8 rounded-[1.7rem] bg-[#0c0c0e] border border-white/5 shadow-2xl overflow-hidden">

                {/* Background texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

                {/* Profile image */}
                <div className="relative flex-shrink-0">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border border-white/10 shadow-lg relative group/img">
                        <Image
                            src="/uploads/me.jpg"
                            alt="Ali Akpoyraz"
                            fill
                            className="object-cover transition-transform duration-700 group-hover/img:scale-110"
                            priority
                        />
                    </div>
                    {/* Badge */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-zinc-800/90 border border-zinc-700 rounded-full text-[10px] text-zinc-300 whitespace-nowrap shadow-lg">
                        HackGDG&apos;25 🚀
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left space-y-5 z-10">

                    {/* Header */}
                    <div className="space-y-1">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <h1 className="text-3xl font-bold tracking-tight text-white">
                                Ali AKPOYRAZ
                            </h1>
                            {/* Status indicator */}
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                        </div>

                        <p className="text-zinc-400 text-sm font-medium">
                            Yazılım Mühendisi <span className="text-zinc-600 mx-1">•</span> Öğrenci
                        </p>
                    </div>

                    {/* Bio */}
                    <p className="text-zinc-500 leading-relaxed text-sm">
                        Merhaba! Ben Ali Akpoyraz Yazılım Mühendisliği 3. Sınıf öğrencisiyim. Yeni teknolojiler öğrenmeyi ve projeler geliştirmeyi seviyorum. Kariyerime Full Stack Yazılım Geliştirme alanında devam etmeyi planlıyorum ve bu alanda kendimi sürekli geliştirmeye çalışıyorum. <br></br> <br></br>
                        Kendimi geliştirirken aynı zamanda öğrendiklerimi başkalarına aktarmayı da önemsiyorum bu yüzden çeşitli blog yazıları yazıyorum, bunlara göz atmak için blog sayfamı ziyaret edebilirsiniz.
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        {techStack.map((tech, i) => (
                            <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900/50 border border-zinc-800 text-xs text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 transition-colors cursor-default">
                                {tech.icon}
                                <span>{tech.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* Social links */}
                    <div className="pt-2 flex justify-center md:justify-start gap-3">
                        {socialLinks.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 hover:bg-zinc-800 transition-all duration-200"
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