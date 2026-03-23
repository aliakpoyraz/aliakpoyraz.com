import Link from 'next/link';
import { Mail, Phone, Github, Linkedin, Download, Calendar, MapPin, Briefcase, GraduationCap, Code2, Award } from 'lucide-react';

const CV_FILE_URL = '/uploads/aliakpoyraz-cv.pdf';

export const metadata = {
    title: 'Özgeçmiş (CV) | Ali Akpoyraz',
    description: 'Ali Akpoyraz\'ın iş deneyimi, eğitim ve teknik becerileri.',
};

export default function CVPage() {
    return (
        <main className="w-full mx-auto py-12 px-4 sm:pt-24 mb-24 animate-in fade-in duration-700">

            <div className="max-w-4xl mx-auto p-6 sm:p-12 border border-white/10 rounded-3xl bg-zinc-900/50 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                {/* Dekoratif Arka Plan Elemanı */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl group-hover:bg-indigo-600/20 transition-colors duration-700" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-colors duration-700" />

                <header className="relative mb-12 pb-8 border-b border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                        <div>
                            <h1 className="text-5xl font-black text-white tracking-tighter sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                                ALİ AKPOYRAZ
                            </h1>
                            <p className="text-xl text-indigo-400 mt-3 font-semibold tracking-wide uppercase">
                                YAZILIM MÜHENDİSİ
                            </p>
                        </div>

                        <a
                            href={CV_FILE_URL}
                            download="Ali-Akpoyraz-CV.pdf"
                            className="print:hidden flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-xl bg-white text-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] flex-shrink-0"
                            target="_blank"
                        >
                            <Download size={18} />
                            CV İndir
                        </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-zinc-400">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 group/item">
                                <div className="p-2 rounded-lg bg-white/5 group-hover/item:bg-white/10 transition-colors">
                                    <Mail size={16} className="text-indigo-400" />
                                </div>
                                <a href="mailto:aliakpoyraz@gmail.com" className="hover:text-white transition-colors">aliakpoyraz@gmail.com</a>
                            </div>
                            <div className="flex items-center gap-3 group/item">
                                <div className="p-2 rounded-lg bg-white/5 group-hover/item:bg-white/10 transition-colors">
                                    <Phone size={16} className="text-indigo-400" />
                                </div>
                                <span className="text-zinc-300">+90 534 657 4464</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 group/item text-zinc-400">
                                <div className="p-2 rounded-lg bg-white/5 group-hover/item:bg-white/10 transition-colors">
                                    <Github size={16} className="text-indigo-400" />
                                </div>
                                <a href="https://github.com/aliakpoyraz" target="_blank" className="hover:text-white transition-colors">github.com/aliakpoyraz</a>
                            </div>
                            <div className="flex items-center gap-3 group/item text-zinc-400">
                                <div className="p-2 rounded-lg bg-white/5 group-hover/item:bg-white/10 transition-colors">
                                    <Linkedin size={16} className="text-indigo-400" />
                                </div>
                                <a href="https://www.linkedin.com/in/aliakpoyraz" target="_blank" className="hover:text-white transition-colors">linkedin.com/in/aliakpoyraz</a>
                            </div>
                        </div>
                    </div>

                    <p className="mt-8 text-zinc-400 leading-relaxed text-lg max-w-3xl">
                        Yazılım Mühendisliği alanında deneyimli, çok yönlü ve yeni teknolojilere açık bir geliştiriciyim.
                        Özellikle <span className="text-white font-medium">modern web teknolojileri</span> ve <span className="text-white font-medium">siber güvenlik</span> disiplinlerini birleştirerek,
                        güvenli ve kullanıcı odaklı dijital çözümler üretmeye odaklanıyorum.
                    </p>
                </header>

                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                            <Briefcase size={22} className="text-indigo-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">İş Deneyimi</h2>
                    </div>

                    <div className="space-y-10 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-800">
                        <ExperienceItem
                            title="Test ve Kalite Yönetimi Stajyeri"
                            company="AktifTech (AktifBank A.Ş.)"
                            location="İstanbul"
                            duration="Ocak 2026"
                            description="Yazılım geliştirme yaşam döngüsü (SDLC) ve test yönetim süreçlerinin (STLC) derinlemesine incelenmesi. <br/><br/> • Fonksiyonel test senaryolarının hazırlanması, yürütülmesi ve hata raporlama süreçlerinin yönetimi.<br/> • Agile (Scrum) metodolojisi çerçevesinde ekip içi koordinasyon ve QA süreçlerine entegrasyon."
                        />
                        <ExperienceItem
                            title="Web Geliştirici & SEO Sorumlusu"
                            company="KAYISIR"
                            location="Malatya"
                            duration="2023 - Halen"
                            description="E-ticaret platformu (Trendyol vb.) yönetimi ve web geliştirme süreçleri.<br/> • SEO stratejilerinin belirlenmesi ve uygulanması, dijital pazarlama kampanyalarının optimizasyonu.<br/> • Kullanıcı deneyimini artırıcı web arayüz geliştirmeleri."
                        />
                        <ExperienceItem
                            title="Yazılım Mühendisi / Siber Güvenlik Stajyeri"
                            company="SWORDSEC"
                            location="Ankara"
                            duration="2025"
                            description="Sızma testleri ve güvenlik denetimi süreçlerinde aktif rol alma.<br/> • Nmap, Burp Suite ve Metasploit gibi endüstri standardı araçlarla güvenlik açıklarının tespiti.<br/> • Web uygulama güvenliği ve ağ güvenliği analizi."
                        />
                        <ExperienceItem
                            title="Stajyer Yazılım Geliştirici"
                            company="TOYA BİLİŞİM"
                            location="Ankara"
                            duration="2025"
                            description="ERP çözümleri ve POS sistemleri üzerine teknik çalışmalar.<br/> • Web tabanlı projelerin ön yüz geliştirmeleri ve sistem entegrasyon süreçlerine destek."
                        />
                    </div>
                </section>

                <div className="grid md:grid-cols-5 gap-12">
                    <div className="md:col-span-3">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                <GraduationCap size={22} className="text-blue-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">Eğitim</h2>
                        </div>

                        <div className="space-y-8">
                            <EducationItem
                                institution="OSTİM TEKNİK ÜNİVERSİTESİ"
                                degree="Yazılım Mühendisliği"
                                duration="2023 - 2027"
                                details="Lisans Eğitimi"
                            />
                        </div>

                        <div className="mt-12">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                    <Award size={22} className="text-emerald-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white tracking-tight">Sertifikalar & Etkinlikler</h2>
                            </div>
                            <ul className="space-y-4 text-sm text-zinc-400">
                                <li className="flex gap-3">
                                    <span className="text-zinc-600 font-bold">•</span>
                                    <span><strong className="text-zinc-200">GDSC OSTİMTECH:</strong> Yönetim Kurulu / Yazılım ve Teknoloji Koordinatörü</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-zinc-600 font-bold">•</span>
                                    <span><strong className="text-zinc-200">HackGDG25:</strong> Mentor ve Organizatör</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-zinc-600 font-bold">•</span>
                                    <span><strong className="text-zinc-200">Eğitmenlik:</strong> SEO Optimizasyonu Eğitmeni</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                <Code2 size={22} className="text-purple-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">Yetenekler</h2>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <SkillTag name="Next.js / React" color="indigo" />
                            <SkillTag name="TypeScript / JS" color="indigo" />
                            <SkillTag name="C / C++ / C#" color="blue" />
                            <SkillTag name="Python" color="blue" />
                            <SkillTag name="Docker" color="emerald" />
                            <SkillTag name="Linux / Bash" color="emerald" />
                            <SkillTag name="Siber Güvenlik" color="rose" />
                            <SkillTag name="Burp Suite / Nmap" color="rose" />
                            <SkillTag name="Git / GitHub" color="zinc" />
                            <SkillTag name="SEO / Marketing" color="amber" />
                            <SkillTag name="Agile / Scrum" color="purple" />
                        </div>
                    </div>
                </div>

                <footer className="mt-16 pt-8 border-t border-white/5 text-center text-xs text-zinc-600 print:hidden italic">
                    Bu özgeçmiş modern web teknolojileri ile hazırlanmıştır. Yazdırmak için (Ctrl+P) kullanabilirsiniz.
                </footer>
            </div>

            <div className="max-w-4xl mx-auto mt-8 text-center print:hidden">
                <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium group">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    Ana Sayfaya Geri Dön
                </Link>
            </div>

        </main>
    );
}

function ExperienceItem({ title, company, location, duration, description }: { title: string, company: string, location: string, duration: string, description: string }) {
    return (
        <div className="relative pl-10 group/exp">
            <div className="absolute left-0 top-1.5 w-[36px] h-[36px] bg-zinc-900 border-2 border-zinc-800 rounded-full flex items-center justify-center z-10 group-hover/exp:border-indigo-500 transition-colors duration-300">
                <div className="w-2 h-2 bg-zinc-700 rounded-full group-hover/exp:bg-indigo-500 transition-colors" />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                <div>
                    <h3 className="text-xl font-bold text-white group-hover/exp:text-indigo-400 transition-colors">{title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-zinc-400 font-medium">
                        <span className="text-zinc-300">{company}</span>
                        <span className="text-zinc-700">•</span>
                        <div className="flex items-center gap-1.5">
                            <MapPin size={12} />
                            {location}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    <Calendar size={12} />
                    {duration}
                </div>
            </div>
            <div
                className="text-sm text-zinc-400 leading-relaxed mt-3 prose prose-invert prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    );
}

function EducationItem({ institution, degree, duration, details }: { institution: string, degree: string, duration: string, details: string }) {
    return (
        <div className="group/edu">
            <div className="flex justify-between items-start gap-4">
                <div>
                    <h3 className="text-lg font-bold text-white group-hover/edu:text-blue-400 transition-colors">{institution}</h3>
                    <p className="text-indigo-400 font-semibold text-sm mt-1">{degree}</p>
                </div>
                <span className="text-[11px] font-black text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded-md uppercase tracking-tighter shrink-0">{duration}</span>
            </div>
            <p className="text-sm text-zinc-500 mt-2">{details}</p>
        </div>
    );
}

function SkillTag({ name, color }: { name: string, color: string }) {
    const colors: Record<string, string> = {
        indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
        blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        zinc: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    };

    return (
        <span className={`px-3 py-1.5 text-[13px] font-medium rounded-xl border ${colors[color] || colors.zinc} transition-all hover:scale-105 cursor-default`}>
            {name}
        </span>
    );
}