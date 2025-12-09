import { BriefcaseBusiness, Calendar, MapPin } from "lucide-react";

export default function Experience() {
    // DENEYİMLER
    // NOT: Tüm URL'leri gerçek değerlerle değiştirmeyi unutmayın!
    const experiences = [
        {
            company: "AktifTech (AktifBank A.Ş.)",
            url: "https://www.aktiftech.com",
            role: "Stajyer Yazılım Mühendisi",
            date: "Ocak 2026 - Halen",
            location: "İstanbul (Uzaktan)",
            description: "Eklenecek...",
            tech: ["Eklenecek..."],
            current: true, // Bu true ise tarih yeşil görünür
        },
        {
            company: "Kayısır",
            url: "https://www.kayisir.com",
            role: "Yazılım Geliştirici",
            date: "2023 - Halen",
            location: "Malatya (Uzaktan)",
            description: "E-ticaret platformu için başlangıçta Wordpress tabanlı bir sistemimiz vardı bunun üzerine geliştirmeler yaparak SEO ve pazarlama süreçlerini yönetiyorum. Ayrıca Trendyol ve diğer pazaryerleri entegrasyonlarını ve yönetimini sağlıyorum. Bunlara ek olarak kendi özel web uygulamamızı geliştiriyorum.",
            tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
            current: true, // Bu true ise tarih yeşil görünür
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
        <section className="w-full max-w-2xl mx-auto mt-16 px-0 md:px-0">

            {/* BAŞLIK */}
            {/* px-2 padding ile başlık kenarlığını koruduk. */}
            <div className="flex items-center gap-3 mb-4 px-2">
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                    <BriefcaseBusiness className="text-zinc-400" size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">
                    İş & Staj Deneyimi
                </h2>
            </div>

            {/* AYIRICI ÇİZGİ: Başlık ve Liste arasında tam genişlikte çizgi */}
            {/* Bu, Projects bileşeninizdeki stil ile aynıdır. */}
            <div className="border-b border-zinc-800 mb-8"></div>


            {/* TIMELINE LİSTESİ */}
            <div className="flex flex-col gap-8">
                {experiences.map((exp, index) => (
                    <div key={index} className="group relative flex gap-6">

                        <div className="flex flex-col items-center">
                            {/* Nokta (Aktif ise yeşil ve parlayan, değilse gri) */}
                            <div className={`
                relative z-10 flex h-3 w-3 shrink-0 rounded-full 
                ${exp.current
                                    ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"
                                    : "bg-zinc-700 border border-zinc-600 group-hover:bg-zinc-500 transition-colors"}
              `}>
                                {exp.current && <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></div>}
                            </div>

                            {/* Çizgi (Son eleman hariç uzar) */}
                            {index !== experiences.length - 1 && (
                                <div className="h-full w-px bg-zinc-800 my-2 group-hover:bg-zinc-700 transition-colors"></div>
                            )}
                        </div>

                        {/* SAĞ: Kart İçeriği */}
                        <div className="flex-1 pb-2">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                                <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors">
                                    {exp.role}
                                </h3>
                                <div className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full w-fit ${exp.current ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-zinc-900 border border-zinc-800 text-zinc-500"}`}>
                                    <Calendar size={12} />
                                    {exp.date}
                                </div>
                            </div>

                            {/* ŞİRKET ADI*/}
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

                            {/* Tech Stack Rozetleri */}
                            <div className="flex flex-wrap gap-2">
                                {exp.tech.map((t, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-1 text-[10px] sm:text-xs font-medium rounded-md bg-zinc-900 border border-zinc-800 text-zinc-500 group-hover:border-zinc-700 group-hover:text-zinc-300 transition-colors"
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