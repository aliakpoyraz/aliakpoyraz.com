"use client";

import { BriefcaseBusiness, Calendar, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export default function Experience() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

    const experiences = [
        {
            company: "AktifTech (AktifBank A.Ş.)",
            url: "https://www.aktiftech.com",
            role: "Test ve Kalite Yönetimi Stajyeri",
            date: "Ocak 2026",
            location: "İstanbul (Uzaktan)",
            description: "Yazılım geliştirme yaşam döngüsü (SDLC, SDTC) adımlarını ve metodolojilerini inceleyerek QA süreçlerine entegrasyonuna katkıda bulundum. Fonksiyonel testlerin yürütülmesi, hata raporlarının hazırlanması ve çevik (Agile) çalışma ortamında ekip içi iletişim ve koordinasyon konularında deneyim kazandım.",
            tech: ["Agile", "SDLC", "SDTC", "QA", "Test Yönetimi"],
            current: false,
        },
        {
            company: "Kayısır",
            url: "https://www.kayisir.com",
            role: "Yazılım Geliştirici",
            date: "2023 - Halen",
            location: "Malatya (Uzaktan)",
            description: "E-ticaret altyapısının uçtan uca yönetimini gerçekleştirmekteyim. Mevcut WordPress tabanlı sistemi baz alarak, kapsamlı SEO optimizasyonu ve dijital pazarlama faaliyetlerini başarıyla yönettim. Ek olarak, Trendyol başta olmak üzere çeşitli pazar yerleri ile tam entegrasyonu kurarak bu kanalların merkezi yönetimini sağlamaktayım. Halihazırda, iş süreçlerini optimize edecek özel bir web uygulaması geliştirme projesini yürütüyorum.",
            tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
            current: true, // true olursa tarih yeşil renkte gösterilir
        },
        {
            company: "SwordSec Siber Güvenlik",
            url: "https://www.swordsec.com",
            role: "Stajyer Yazılım Mühendisi",
            date: "Haziran 2025 - Temmuz 2025",
            location: "Ankara (Hybrid)",
            description: "Siber güvenlik alanında sızma testleri, Nmap, Burpsuite, Metasploit gibi araçların kullanımı üzerine deneyim kazandım. Gerçek dünya senaryolarında güvenlik açıklarını tespit edip raporladım.",
            tech: ["Python", "Nmap", "Burpsuite", "Metasploit"],
            current: false,
        },
        {
            company: "Toya Yazılım (ToyaPOS)",
            url: "https://www.toyayazilim.com.tr",
            role: "Stajyer Yazılım Mühendisi",
            date: "Ocak 2025 - Şubat 2025",
            location: "Ankara (Hybrid)",
            description: "Toya Pos Sistemleri ve ERP çözümleri üzerinde çalıştım. Web geliştirme projelerinde yer aldım ve ekip ile birlikte yazılım süreçlerine katkıda bulundum.",
            tech: ["JavaScript", "HTML", "CSS"],
            current: false,
        },
    ];

    return (
        <section
            ref={ref}
            className={`w-full max-w-2xl mx-auto mt-6 md:mt-16 px-0 md:px-0 transition-all duration-700 ease-out ${isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
        >

            {/* Başlık */}
            <div className="flex items-center gap-3 mb-4 px-2">
                <div className="p-2 rounded-xl bg-zinc-950/50 border border-white/10 backdrop-blur-md shadow-lg">
                    <BriefcaseBusiness className="text-zinc-400" size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">
                    İş & Staj Deneyimi
                </h2>
            </div>

            {/* Ayırıcı */}
            <div className="border-b border-zinc-800 mb-8"></div>

            {/* Zaman Çizelgesi */}
            <div className="flex flex-col gap-8">
                {experiences.map((exp, index) => (
                    <div key={index} className="group relative flex gap-6">

                        <div className="flex flex-col items-center">
                            {/* Zaman noktası */}
                            <div className={`
                relative z-10 flex h-3 w-3 shrink-0 rounded-full 
                ${exp.current
                                    ? "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                                    : "bg-zinc-800 border border-white/10 group-hover:bg-zinc-600 transition-colors"}
              `}>
                                {exp.current && <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></div>}
                            </div>

                            {/* Zaman çizgisi */}
                            {index !== experiences.length - 1 && (
                                <div className="h-full w-px bg-zinc-800 my-2 group-hover:bg-zinc-700 transition-colors"></div>
                            )}
                        </div>

                        {/* Kart İçeriği */}
                        <div className="flex-1 pb-2">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                                <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors">
                                    {exp.role}
                                </h3>
                                <div className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg w-fit backdrop-blur-md ${exp.current ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-white/5 border border-white/5 text-zinc-500"}`}>
                                    <Calendar size={12} />
                                    {exp.date}
                                </div>
                            </div>

                            {/* Şirket Bilgisi */}
                            <div className="flex items-center gap-2 text-sm text-zinc-400 mb-3">
                                {exp.url ? (
                                    <a
                                        href={exp.url}
                                        target="_blank"
                                        rel="noopener noreferrer nofollow"
                                        className="font-medium text-zinc-300 hover:text-indigo-400 transition-colors underline-offset-4 hover:underline"
                                    >
                                        {exp.company}
                                    </a>
                                ) : (
                                    <span className="font-medium text-zinc-300">{exp.company}</span>
                                )}
                                <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                                <span className="flex items-center gap-1 text-zinc-500">
                                    <MapPin size={12} /> {exp.location}
                                </span>
                            </div>

                            <p className="text-sm text-zinc-400 leading-relaxed mb-4 group-hover:text-zinc-300 transition-colors">
                                {exp.description}
                            </p>

                            {/* Kullanılan Teknolojiler */}
                            <div className="flex flex-wrap gap-2">
                                {exp.tech.map((t, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-1 text-[10px] sm:text-xs font-medium rounded-lg bg-white/5 border border-white/5 text-zinc-500 group-hover:border-white/10 group-hover:text-zinc-300 transition-colors backdrop-blur-sm"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
}