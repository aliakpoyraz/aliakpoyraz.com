import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail, FileText, Code2, Terminal, Database, Cpu } from "lucide-react";

export default function ProfileCard() {
    const socialLinks = [
        { icon: <Mail size={18} />, href: "mailto:aliakpoyraz@gmail.com", label: "Email" },
        { icon: <FileText size={18} />, href: "/cv", label: "CV" },
        { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/aliakpoyraz", label: "LinkedIn" },
        { icon: <Github size={18} />, href: "https://github.com/aliakpoyraz", label: "GitHub" },
    ];

    // Kullandığın teknolojiler (İstersen burayı değiştirebilirsin)
    const techStack = [
        { icon: <Code2 size={16} />, name: "Next.js" },
        { icon: <Terminal size={16} />, name: "React" },
        { icon: <Database size={16} />, name: "PostgreSQL" },
        { icon: <Cpu size={16} />, name: "Docker" },
    ];

    return (
        <div className="relative w-full max-w-2xl mx-auto group">

            {/* 1. KARTIN ARKASINDAKİ GRADYAN ÇERÇEVE (PARLAMA EFEKTİ) */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700 rounded-[2rem] opacity-20 blur group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

            {/* KARTIN KENDİSİ */}
            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8 p-8 rounded-[1.7rem] bg-[#0c0c0e] border border-white/5 shadow-2xl overflow-hidden">

                {/* Arka plan dokusu (Grid) - Çok silik */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

                {/* SOL: Fotoğraf Alanı */}
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
                    {/* Fotoğrafın altına küçük bir etiket (Opsiyonel) */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-zinc-800/90 border border-zinc-700 rounded-full text-[10px] text-zinc-300 whitespace-nowrap shadow-lg">
                        HackGDG'25 🚀
                    </div>
                </div>

                {/* SAĞ: İçerik */}
                <div className="flex-1 text-center md:text-left space-y-5 z-10">

                    {/* Başlık ve Durum */}
                    <div className="space-y-1">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <h1 className="text-3xl font-bold tracking-tight text-white">
                                Ali AKPOYRAZ
                            </h1>
                            {/* Yanıp sönen yeşil nokta (Available) */}
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                        </div>

                        <p className="text-zinc-400 text-sm font-medium">
                            Yazılım Mühendisi <span className="text-zinc-600 mx-1">•</span> Öğrenci
                        </p>
                    </div>

                    {/* Biyografi */}
                    <p className="text-zinc-500 leading-relaxed text-sm">
                        Merhaba! Ben Ali Akpoyraz Yazılım Mühendisliği 3. Sınıf öğrencisiyim. Yeni teknolojiler öğrenmeyi ve projeler geliştirmeyi seviyorum. Kariyerime Full Stack Yazılım Geliştirme alanında devam etmeyi planlıyorum ve bu alanda kendimi sürekli geliştirmeye çalışıyorum. <br></br> <br></br>
                        Kendimi geliştirirken aynı zamanda öğrendiklerimi başkalarına aktarmayı da önemsiyorum bu yüzden çeşitli blog yazıları yazıyorum, bunlara göz atmak için blog sayfamı ziyaret edebilirsiniz.
                    </p>

                    {/* YENİ: Tech Stack (Teknoloji Rozetleri) */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        {techStack.map((tech, i) => (
                            <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900/50 border border-zinc-800 text-xs text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 transition-colors cursor-default">
                                {tech.icon}
                                <span>{tech.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* Sosyal İkonlar */}
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