"use client";

import { usePathname } from "next/navigation";
import SideNav from "@/components/home/SideNav";
import ScrollToTop from "@/components/home/ScrollToTop";
import Footer from "@/components/home/Footer";
import Background from "@/components/home/Background";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isKeystatic = pathname?.startsWith('/keystatic');

    if (isKeystatic) {
        return <main className="flex-1 min-h-screen relative">{children}</main>;
    }

    return (
        <>
            <Background />
            <SideNav />
            <ScrollToTop />
            <main className="relative z-10 flex-1 pt-6 md:pt-28 pb-24 xl:pb-0 min-h-screen px-4 md:px-0">
                {children}
            </main>
            <Footer />
        </>
    );
}
