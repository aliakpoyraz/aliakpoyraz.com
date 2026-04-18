import { Check, X } from 'lucide-react';

export default function ProsCons({ pros = [], cons = [] }: { pros?: string[], cons?: string[] }) {
    return (
        <div className="my-8 grid gap-4 md:grid-cols-2">
            {/* Artılar */}
            <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 shadow-sm">
                <h4 className="mb-4 flex items-center gap-2 font-bold text-green-600 dark:text-green-400">
                    <Check size={18} /> Artılar
                </h4>
                <ul className="space-y-2">
                    {pros.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Eksiler */}
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 shadow-sm">
                <h4 className="mb-4 flex items-center gap-2 font-bold text-red-600 dark:text-red-400">
                    <X size={18} /> Eksiler
                </h4>
                <ul className="space-y-2">
                    {cons.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}