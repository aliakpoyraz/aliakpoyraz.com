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

// statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/20" TURUNCU RENK KODU
export const activeProjects: Project[] = [
    {
        slug: "borsa-app",
        title: "BorsaApp",
        description: "Swift kullanılarak geliştirilen, borsa ve finans takibi üzerine odaklanmış Binance ve Yahoo API entegrasyonuyla birlikte anlık olarak kripto ve bist verilerini takip edebileceğiniz, favorilere ekleyerek widget üzerinden veya varlıklarınızı ekleyerek anlık olarak portföyünüzü takip edebileceğiniz bir mobil uygulama.",
        status: "Geliştirildi",
        statusColor: "text-green-400 bg-green-500/10 border-green-500/20",
        githubRepo: "aliakpoyraz/borsaApp",
        tags: ["Swift", "Supabase"]
    },
    {
        slug: "DevCleaner",
        title: "DevCleaner",
        description: "Geliştiriciler için CleanMyMac uygulaması alternatifi. Kullanılmayan xcode cacheleri, docker image, node_modules dosyaları gibi daha önceden geliştirdiğiniz ancak cachelerinin bilgisayarınızda tutulmaya devam ettiği dosyaları birkaç tıklamayla silmenize yarayan MacOS uygulaması.",
        status: "Geliştirildi",
        statusColor: "text-green-400 bg-green-500/10 border-green-500/20",
        githubRepo: "aliakpoyraz/DevCleaner",
        demoLink: "https://github.com/aliakpoyraz/DevCleaner/releases/tag/v1.0.0",
        tags: ["Swift"]
    },
    {
        slug: "e-ticaret-platformu",
        title: "E-Ticaret Platformu",
        description: "Modern web teknolojileri kullanılarak geliştirilmiş, bir e-ticaret sitesi için ihtiyaç olan bütün senaryoları (ürün listeleme, sepet, ödeme, üyelik, sipariş takibi, iletişim, mail onay, sipariş mail bildirimleri vb.) barındıran bir e-ticaret platformu.",
        status: "Canlı",
        statusColor: "text-green-400 bg-green-500/10 border-green-500/20",
        demoLink: "https://e-ticaret.aliakpoyraz.com",
        githubRepo: "aliakpoyraz/mini-e-ticaret",
        tags: ["Next.js", "Supabase", "Resend"]
    },
    {
        slug: "kisisel-portfolyo",
        title: "Kişisel Portfolyo",
        description: "Özelleştirilebilir modern ve dinamik kişisel portfolyo sitesi.",
        status: "Canlı",
        statusColor: "text-green-400 bg-green-500/10 border-green-500/20",
        demoLink: "https://kisisel-portfolyo.aliakpoyraz.com",
        githubRepo: "aliakpoyraz/kisisel-portfolyo",
        tags: ["React", "Portfolyo"]
    },
    {
        slug: "basic-portfolio",
        title: "Basic Portfolyo",
        description: "Daha minimal sade ve yüksek performanslı bir portfolyo site alternatifi.",
        status: "Canlı",
        statusColor: "text-green-400 bg-green-500/10 border-green-500/20",
        demoLink: "https://basic-portfolio.aliakpoyraz.com",
        githubRepo: "aliakpoyraz/basic-portfolio",
        tags: ["HTML/CSS", "Minimal"]
    }
];

export function getProjectBySlug(slug: string): Project | undefined {
    return activeProjects.find((project) => project.slug === slug);
}
