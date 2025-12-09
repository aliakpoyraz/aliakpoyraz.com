export default function Background() {
    return (
        <div className="fixed inset-0 z-[-1] h-full w-full bg-[#020202]">

            {/* 1. DOKU (Grain/Noise) */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

            {/* 2. STÜDYO IŞIĞI (God Ray) - Tepeden vuran ana ışık */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_70%)] blur-[100px] pointer-events-none"></div>

            {/* 3. VIGNETTE (Kenar Karartma) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020202_130%)] pointer-events-none"></div>

        </div>
    );
}