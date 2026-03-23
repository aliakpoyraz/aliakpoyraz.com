import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import Divider from './Divider';

const GITHUB_USERNAME = "aliakpoyraz";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { href: "https://instagram.com/aliakpoyraz", icon: Instagram, label: "Instagram", target: "_blank", hoverClass: "hover:text-[#E1306C] hover:border-[#E1306C]/30 hover:bg-[#E1306C]/10" },
        { href: "https://linkedin.com/in/aliakpoyraz", icon: Linkedin, label: "LinkedIn", target: "_blank", hoverClass: "hover:text-[#0A66C2] hover:border-[#0A66C2]/30 hover:bg-[#0A66C2]/10" },
        { href: `https://github.com/${GITHUB_USERNAME}`, icon: Github, label: "GitHub", target: "_blank", hoverClass: "hover:text-white hover:border-white/30 hover:bg-white/10" },
        { href: "mailto:aliakpoyraz@gmail.com", icon: Mail, label: "E-posta", target: "_self", hoverClass: "hover:text-indigo-400 hover:border-indigo-400/30 hover:bg-indigo-400/10" },
    ];

    return (
        <footer id="footer" className="relative z-10 mt-20 pt-10 pb-20 sm:pb-12 border-t border-white/10 bg-zinc-950/80 backdrop-blur-xl">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center pb-6 mb-6">
                    <div className="flex space-x-4">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target={social.target}
                                rel="noopener noreferrer nofollow"
                                title={social.label}
                                className={`flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 shadow-md backdrop-blur-sm transition-all duration-300 group ${social.hoverClass}`}
                            >
                                <social.icon size={20} className="group-hover:scale-110 transition-transform duration-300" />
                            </a>
                        ))}
                    </div>
                </div>
                
                <Divider />
                
                <div className="text-center text-sm text-zinc-600 mt-6 flex flex-col items-center gap-2">
                    <p>
                        &copy; {currentYear} Ali Akpoyraz. Tüm hakları saklıdır.
                    </p>
                </div>
            </div>
        </footer>
    );
}