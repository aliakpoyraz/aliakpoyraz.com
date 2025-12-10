import { Github, Linkedin, Mail, Instagram } from 'lucide-react';

const GITHUB_USERNAME = "aliakpoyraz";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    // Sosyal medya ve Dış Linkler
    const socialLinks = [
        { href: "https://instagram.com/aliakpoyraz", icon: Instagram, label: "Instagram", target: "_blank" },
        { href: "https://linkedin.com/in/aliakpoyraz", icon: Linkedin, label: "LinkedIn", target: "_blank" },
        { href: `https://github.com/${GITHUB_USERNAME}`, icon: Github, label: "GitHub", target: "_blank" },
        { href: "mailto:aliakpoyraz@gmail.com", icon: Mail, label: "E-posta", target: "_self" },
    ];

    return (
        <footer className="mt-20 pt-10 pb-8 border-t border-zinc-800 bg-zinc-950/50">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center pb-6 mb-6">
                    <div className="flex space-x-6">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target={social.target}
                                rel="noopener noreferrer nofollow"
                                title={social.label}
                                className="text-zinc-400 hover:text-indigo-400 transition-colors"
                            >
                                <social.icon size={24} />
                            </a>
                        ))}
                    </div>
                </div>
                <hr className="border-zinc-800 mb-6" />
                <div className="text-center text-sm text-zinc-600">
                    <p>
                        &copy; {currentYear} Ali Akpoyraz. Tüm hakları saklıdır.
                    </p>
                </div>
            </div>
        </footer>
    );
}