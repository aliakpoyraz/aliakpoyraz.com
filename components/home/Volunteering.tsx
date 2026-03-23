"use client";

import { Heart, Users, Award, Megaphone } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export default function Volunteering() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
    const volunteers = [
        {
            role: "Core Team Member",
            organization: "Google Developer Student Clubs",
            date: "2024 - 2025",
            description: "2024-2025 Sezonunda 1000+ üyesiyle birlikte okulumuzun en büyük kulübü olan GDSC'nin Yazılım & Teknoloji departmanının core team üyesi olarak görev aldım. Bu kulüpte görev alan arkadaşlarımızla çeşitli projeler, sunumlar ve hackathon gibi etkinlikler düzenleyerek birçok öğrenciye ulaşmayı başardık.",
            icon: <Users size={20} className="text-blue-400" />,
        },
        {
            role: "Yönetim Kurulu Üyesi",
            organization: "Gezi Kulübü",
            date: "2024 - 2026",
            description: "Okulumuzun gezi kulübünde yönetim kurulu üyesi olarak görev aldım. Bu kulüp aracılığıyla çeşitli şehir içi ve şehir dışı geziler düzenleyerek öğrencilere yeni yerler keşfetme fırsatı sunduk.",
            icon: <Megaphone size={20} className="text-yellow-400" />,
        },
        {
            role: "Gönüllü Eğitmen",
            organization: "SEO Eğitmenliği",
            date: "Mart 2025",
            description: "GDSC OSTİMTECH kulübü bünyesinde düzenlenen SEO eğitimlerinde gönüllü eğitmen olarak görev aldım. Temel SEO kavramları, araçları ve stratejileri üzerine öğrencilere eğitim verdim.",
            icon: <Heart size={20} className="text-red-400" />,
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
                    <Heart className="text-zinc-400" size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">
                    Gönüllülük & Topluluk
                </h2>
            </div>
            <div className="border-b border-zinc-800 mb-6"></div>


            {/* Gönüllülük Listesi */}
            <div className="flex flex-col gap-6">
                {volunteers.map((item, index) => (
                    <div
                        key={index}
                        className="group p-5 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl hover:border-white/20 hover:bg-zinc-900/40 transition-all duration-300 shadow-xl w-full"
                    >
                        {/* Başlık: İkon ve Tarih */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2.5 rounded-full bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors backdrop-blur-md">
                                {item.icon}
                            </div>
                            <span className="text-xs font-medium text-zinc-500 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 backdrop-blur-sm">
                                {item.date}
                            </span>
                        </div>

                        {/* İçerik */}
                        <div>
                            <h3 className="text-base font-semibold text-zinc-200 group-hover:text-white transition-colors">
                                {item.role}
                            </h3>
                            <p className="text-xs text-zinc-500 font-medium mb-2">
                                {item.organization}
                            </p>
                            <p className="text-sm text-zinc-400 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}