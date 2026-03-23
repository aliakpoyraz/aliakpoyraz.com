"use client";

import { useEffect, useState, useRef } from "react";

export default function Background() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[-1] h-full w-full bg-[#030303] overflow-hidden">
            
            {/* 1. Animasyonlu Şekiller */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[140px] animate-blob"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[140px] animate-blob" style={{ animationDelay: '5s' }}></div>
            <div className="absolute top-[30%] left-[20%] w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '10s' }}></div>

            {/* 2. Noktalı Izgara */}
            <div 
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                }}
            ></div>

            {/* 3. Fare Takip Maskesi */}
            <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,100,255,0.03), transparent 80%)`,
                }}
            ></div>
            <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.05), transparent 80%)`,
                }}
            ></div>

            {/* 4. Tarama Çizgisi Efekti */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.01)_50%,transparent)] bg-[length:100%_4px] animate-scan opacity-20 pointer-events-none"></div>

            {/* 5. Renk Dokusu (Grain) */}
            <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

            {/* 6. Vinyet Efekti */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_150%)] pointer-events-none"></div>

            <style jsx global>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(50px, -70px) scale(1.2); }
                    66% { transform: translate(-40px, 40px) scale(1); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                @keyframes scan {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(100%); }
                }
                .animate-blob {
                    animation: blob 25s infinite alternate ease-in-out;
                }
                .animate-scan {
                    animation: scan 10s linear infinite;
                }
            `}</style>
        </div>
    );
}