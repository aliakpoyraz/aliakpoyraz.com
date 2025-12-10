import Link from 'next/link';
import { Mail, Phone, MapPin, Github, Linkedin, Download } from 'lucide-react';

// public klasörüne yüklediğiniz dosyanın adını buraya yazın
const CV_FILE_URL = '/uploads/aliakpoyraz-cv.pdf';

export const metadata = {
    title: 'Özgeçmiş (CV) | Ali Akpoyraz',
    description: 'Ali Akpoyraz\'ın iş deneyimi, eğitim ve teknik becerileri.',
};

export default function CVPage() {
    return (
        <main className="w-full mx-auto py-10 px-4 sm:pt-20 mb-20">

            <div className="max-w-4xl mx-auto p-4 sm:p-10 border border-zinc-700 rounded-2xl bg-[#0c0c0e] shadow-xl">

                <header className="mb-8 pb-6 border-b border-zinc-700">

                    <div className="flex justify-between items-start gap-4 mb-4">
                        <div>
                            <h1 className="text-4xl font-extrabold text-white tracking-tight">
                                ALİ AKPOYRAZ
                            </h1>
                            <p className="text-xl text-indigo-400 mt-1 font-medium">
                                YAZILIM MÜHENDİSİ
                            </p>
                        </div>

                        {/* İndirme Butonu */}
                        <a
                            href={CV_FILE_URL}
                            download="Ali-Akpoyraz-CV.pdf"
                            className="print:hidden flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white transition-colors hover:bg-indigo-500 hover:-translate-y-0.5 shadow-md flex-shrink-0"
                            target="_blank"
                        >
                            <Download size={18} />
                            CV İndir
                        </a>
                    </div>

                    {/* İletişim Bilgileri */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-400">
                        <div className="flex items-center gap-1.5">
                            <Mail size={14} className="text-zinc-600" />
                            <a href="mailto:aliakpoyraz@gmail.com" className="hover:text-white transition-colors">aliakpoyraz@gmail.com</a>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Phone size={14} className="text-zinc-600" />
                            <span>+90 534 657 4464</span>
                        </div>
                    </div>

                    {/* Sosyal Linkler */}
                    <div className="mt-4 flex items-center gap-4 text-sm text-zinc-400">
                        <a href="https://github.com/aliakpoyraz" target="_blank" className="flex items-center gap-1 hover:text-white transition-colors">
                            <Github size={14} /> GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/aliakpoyraz" target="_blank" className="flex items-center gap-1 hover:text-white transition-colors">
                            <Linkedin size={14} /> LinkedIn
                        </a>
                    </div>

                    {/* Özet kısmı - CV'de bu kısım olmadığı için genel bir özet bıraktım */}
                    <p className="mt-6 text-zinc-300 leading-relaxed text-base">
                        Yazılım Mühendisliği alanında deneyimli, çok yönlü ve yeni teknolojilere açık bir geliştiriciyim. Özellikle modern web teknolojileri (React) ve siber güvenlik staj deneyimlerimle projelerde değer yaratmayı hedefliyorum.
                    </p>
                </header>

                {/* --- İŞ DENEYİMİ --- */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-500/50 pb-1">
                        İŞ DENEYİMİ
                    </h2>

                    <div className="space-y-6">
                        <ExperienceItem
                            title="Web Geliştirici, SEO, Marketing (Trendyol/E-Ticaret)"
                            company="KAYISIR / MALATYA"
                            duration="2023 - Halen"
                            description="Web Geliştirme, SEO ve Pazarlama süreçlerini yürütme."
                        />

                        <ExperienceItem
                            title="Kısa Dönem Yazılım Mühendisi / Siber Güvenlik Stajyeri"
                            company="SWORDSEC / ANKARA"
                            duration="2025"
                            description="Sızma testleri, Nmap, Burpsuite, Metasploit gibi siber güvenlik araçlarının kullanımı."
                        />

                        <ExperienceItem
                            title="Kısa Dönem Stajyer"
                            company="TOYA BİLİŞİM / ANKARA"
                            duration="2025"
                            description="TOYA Pos Sistemleri, ERP Çözümleri ve Web Geliştirme projelerinde yer alma."
                        />
                    </div>
                </section>

                {/* --- DİĞER ÇALIŞMALAR VE ETKİNLİKLER --- */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-500/50 pb-1">
                        DİĞER ÇALIŞMALAR
                    </h2>
                    <div className="space-y-4 text-sm text-zinc-400">
                        <p><strong>GDSC OSTİMTECH:</strong> Yönetim Kurulu / Yazılım ve Teknoloji Koordinatörlüğü</p>
                        <p><strong>HackGDG25:</strong> Mentor ve Organizatör olarak görev alma</p>
                        <p><strong>Eğitmenlik:</strong> SEO Optimizasyonu Eğitmeni</p>
                        <p><strong>Kişisel Projeler:</strong> kisisel-portfolyo.aliakpoyraz.com / basic-portfolio.aliakpoyraz.com</p>
                    </div>
                </section>

                {/* --- EĞİTİM VE BECERİLER --- */}
                <section className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-500/50 pb-1">
                            EĞİTİM
                        </h2>
                        <EducationItem
                            institution="OSTİM TEKNİK ÜNİVERSİTESİ"
                            degree="YAZILIM MÜHENDİSLİĞİ LİSANS"
                            duration="2023-2027"
                            gpa="Gerektiğinde doldurulacak"
                        />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-500/50 pb-1">
                            TEMEL BECERİLER
                        </h2>
                        <SkillsList
                            skills={[
                                'HTML/CSS / React',
                                'C/C++/C# / Javascript',
                                'Python',
                                'Linux',
                                'Docker',
                                'Git/Github / Vercel',
                                'SEO',
                                'Takım çalışmasına uyumlu',
                                'Yeni bilgilere açık',
                                'Çok yönlülük',
                            ]}
                        />
                    </div>
                </section>

                {/* --- YAZDIRMA NOTU --- */}
                <footer className="mt-10 pt-4 border-t border-zinc-700 text-center text-sm text-zinc-500 print:hidden">
                    Bu belgeyi yazdırmak için (Ctrl+P) kullanabilirsiniz.
                </footer>
            </div>

            {/* Ana Sayfaya Dönüş Linki */}
            <div className="max-w-4xl mx-auto mt-6 text-center print:hidden">
                <Link href="/" className="text-indigo-400 hover:text-indigo-300 text-sm">
                    Ana Sayfaya Geri Dön
                </Link>
            </div>

        </main>
    );
}

// --- YARDIMCI BİLEŞENLER (Aynı kalacak) ---

function ExperienceItem({ title, company, duration, description }: { title: string, company: string, duration: string, description: string }) {
    return (
        <div>
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-white">{title} @ {company}</h3>
                <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">{duration}</span>
            </div>
            <p className="text-sm text-zinc-400 mt-1">{description}</p>
        </div>
    );
}

function EducationItem({ institution, degree, duration, gpa }: { institution: string, degree: string, duration: string, gpa: string }) {
    return (
        <div className="mt-4">
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-white">{degree}</h3>
                <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">{duration}</span>
            </div>
            <p className="text-sm text-zinc-400 mt-0.5">{institution}</p>
            {gpa && <p className="text-sm text-zinc-500">Not Ortalaması: {gpa}</p>}
        </div>
    );
}

function SkillsList({ skills }: { skills: string[] }) {
    return (
        <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 text-sm bg-indigo-900/40 text-indigo-300 rounded-full border border-indigo-700/50">
                    {skill}
                </span>
            ))}
        </div>
    );
}