import { useTranslations } from "next-intl";

export type Project = {
    slug: string;
    title: string;
    description: string;
    status: string;
    statusColor: string;
    demoLink?: string;
    githubRepo: string;
    tags: string[];
};

export const activeProjects: Project[] = [
    {
        slug: "kisisel-portfolyo",
        title: "Kişisel Portfolyo",
        description: "Şu an incelediğiniz bu site; Next.js 16 ve Tailwind v4 ile geliştirildi. Vercel + GitHub altyapısıyla, veritabanına ihtiyaç duymadan tamamen performans odaklı ve 'database-less' bir yapıda çalışmaktadır.",
        status: "Canlı",
        statusColor: "text-rose-500 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
        githubRepo: "aliakpoyraz/aliakpoyraz.com",
        demoLink: "https://aliakpoyraz.com",
        tags: ["Next.js", "Tailwind 4", "i18n"]
    },
    {
        slug: "ticimax-wolvox-erp-entegrasyonu",
        title: "Ticimax & Wolvox 8 Erp Entegrasyonu",
        description: "Ticimax tabanlı e-ticaret platformları ile Akınsoft Wolvox 8 ERP sistemi arasında çift yönlü veri aktarımı sağlayan bir Windows Servis uygulamasıdır. Bu servis; anlık stok takibi, sipariş yönetimi ve fiyat güncellemelerini tam senkronize şekilde yürüterek operasyonel verimliliği artırır.",
        status: "Canlı",
        statusColor: "text-rose-500 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
        githubRepo: "aliakpoyraz/",
        tags: [".NET"]
    },
    {
        slug: "borsa-app",
        title: "BorsaApp",
        description: "Swift kullanılarak geliştirilen, borsa ve finans takibi üzerine odaklanmış Binance ve Yahoo API entegrasyonuyla birlikte anlık olarak kripto ve bist verilerini takip edebileceğiniz, favorilere ekleyerek widget üzerinden veya varlıklarınızı ekleyerek anlık olarak portföyünüzü takip edebileceğiniz bir mobil uygulama.",
        status: "Geliştirildi",
        statusColor: "text-rose-500 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
        githubRepo: "aliakpoyraz/borsaApp",
        tags: ["Swift", "Supabase"]
    },
    {
        slug: "DevCleaner",
        title: "DevCleaner",
        description: "Geliştiriciler için CleanMyMac uygulaması alternatifi. Kullanılmayan xcode cacheleri, docker image, node_modules dosyaları gibi daha önceden geliştirdiğiniz ancak cachelerinin bilgisayarınızda tutulmaya devam ettiği dosyaları birkaç tıklamayla silmenize yarayan MacOS uygulaması.",
        status: "Geliştirildi",
        statusColor: "text-rose-500 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
        githubRepo: "aliakpoyraz/DevCleaner",
        demoLink: "https://github.com/aliakpoyraz/DevCleaner/releases/tag/v1.0.0",
        tags: ["Swift"]
    },
    {
        slug: "e-ticaret-platformu",
        title: "E-Ticaret Platformu",
        description: "Modern web teknolojileri kullanılarak geliştirilmiş, bir e-ticaret sitesi için ihtiyaç olan bütün senaryoları (ürün listeleme, sepet, ödeme, üyelik, sipariş takibi, iletişim, mail onay, sipariş mail bildirimleri vb.) barındıran bir e-ticaret platformu.",
        status: "Canlı",
        statusColor: "text-rose-500 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
        demoLink: "https://e-ticaret.aliakpoyraz.com",
        githubRepo: "aliakpoyraz/mini-e-ticaret",
        tags: ["Next.js", "Supabase", "Resend"]
    }
];

export function getProjectBySlug(slug: string): Project | undefined {
    return activeProjects.find((project) => project.slug === slug);
}

export function useActiveProjects() {
    const t = useTranslations("Projects");
    const tData = useTranslations("ProjectData");


    return activeProjects.map(project => ({
        ...project,
        title: tData(`${project.slug}.title` as any) || project.title,
        description: tData(`${project.slug}.desc` as any) || project.description,
        status: project.status === "Canlı" ? t("status_canli") : t("status_gelistirildi")
    }));
}
