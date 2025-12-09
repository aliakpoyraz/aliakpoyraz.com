import { Plus } from "lucide-react";

export default function Divider() {
    return (
        <div className="flex items-center justify-center w-full max-w-2xl mx-auto my-8 opacity-20">

            {/* Sol Çizgi (Sağa doğru koyulaşır) */}
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-500 to-zinc-500"></div>

            {/* Ortadaki Artı Sembolü */}
            <div className="mx-4 text-zinc-400">
                <Plus size={16} strokeWidth={1} />
            </div>

            {/* Sağ Çizgi (Sola doğru koyulaşır) */}
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-zinc-500 to-zinc-500"></div>

        </div>
    );
}