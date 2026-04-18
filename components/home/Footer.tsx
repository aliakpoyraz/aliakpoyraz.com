import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import { useTranslations } from "next-intl";

const GITHUB_USERNAME = "aliakpoyraz";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const t = useTranslations("Footer");

    const socialLinks = [
        { href: "https://instagram.com/aliakpoyraz", icon: Instagram, label: "Instagram", target: "_blank" },
        { href: "https://linkedin.com/in/aliakpoyraz", icon: Linkedin, label: "LinkedIn", target: "_blank" },
        { href: `https://github.com/${GITHUB_USERNAME}`, icon: Github, label: "GitHub", target: "_blank" },
        { href: "mailto:aliakpoyraz@gmail.com", icon: Mail, label: "E-posta", target: "_self" },
    ];

    return (
        <footer id="footer" className="relative z-10 mt-20 pt-10 pb-20 sm:pb-12 border-t border-border-main transition-colors">
            <div className="max-w-2xl mx-auto px-4">

                <div className="flex flex-col items-center gap-6">
                    {/* Sosyal ikonlar */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target={social.target}
                                rel="noopener noreferrer nofollow"
                                title={social.label}
                                className="flex items-center justify-center w-9 h-9 rounded-xl bg-surface border border-border-main text-muted hover:text-rose-400 hover:border-rose-500/30 hover:bg-accent-10 transition-all duration-300"
                            >
                                <social.icon size={16} />
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p className="text-[10px] md:text-xs text-muted/60 tracking-wide uppercase">
                        © {currentYear} Ali Akpoyraz
                    </p>
                </div>

            </div>
        </footer>
    );
}