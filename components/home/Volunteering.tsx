import { Heart, Users, Award, Megaphone } from "lucide-react";

export default function Volunteering() {
    const volunteers = [
        {
            role: "Core Team Member",
            organization: "Google Developer Student Clubs",
            date: "2024 - 2025",
            description: "2024-2025 Sezonunda 1000+ üyesiyle birlikte okulumuzun en büyük kulübü olan GDSC'nin Yazılım & Teknoloji departmanının core team üyesi olarak görev aldım. Bu kulüpte görev alan arkadaşlarımızla çeşitli projeler, sunumlar ve hackathon gibi etkinlikler düzenleyerek birçok öğrenciye ulaşmayı başardık.",
            icon: <Users size={20} className="text-blue-400" />, // Özel renk verebilirsin
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
        <section className="w-full max-w-2xl mx-auto mt-16 px-0 md:px-0">

            {/* BAŞLIK */}
            <div className="flex items-center gap-3 mb-4 px-2">
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                    <Heart className="text-zinc-400" size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">
                    Gönüllülük & Topluluk
                </h2>
            </div>
            <div className="border-b border-zinc-800 mb-6"></div>


            {/* ALT ALTA LİSTE */}
            <div className="flex flex-col gap-6">
                {volunteers.map((item, index) => (
                    <div
                        key={index}
                        className="group p-5 rounded-2xl bg-zinc-900/20 border border-white/5 hover:border-white/10 hover:bg-zinc-800/40 transition-all duration-300 hover:-translate-y-1 w-full"
                    >
                        {/* Üst Kısım: İkon ve Tarih */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                                {item.icon}
                            </div>
                            <span className="text-xs font-medium text-zinc-500 bg-zinc-900/50 px-2 py-1 rounded-md border border-zinc-800/50">
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
                            {/* Açıklama (Tam görünür) */}
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