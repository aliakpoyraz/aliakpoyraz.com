import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

type CalloutProps = {
    type?: 'info' | 'warning' | 'success' | 'danger';
    title?: string;
    children: React.ReactNode;
};

const icons = {
    info: Info,
    warning: AlertCircle,
    success: CheckCircle,
    danger: XCircle,
};

const styles = {
    info: "bg-blue-500/10 border-blue-500/20 text-blue-200 border-l-4",
    warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-200 border-l-4",
    success: "bg-green-500/10 border-green-500/20 text-green-200 border-l-4",
    danger: "bg-red-500/10 border-red-500/20 text-red-200 border-l-4",
};

export default function Callout({ type = 'info', title, children }: CalloutProps) {
    const Icon = icons[type];
    const style = styles[type];

    return (
        <div className={`my-6 flex gap-3 rounded-xl border bg-zinc-950/80 backdrop-blur-xl p-4 shadow-lg ${style}`}>
            <Icon className="mt-1 h-5 w-5 flex-shrink-0" />
            <div className="flex-1">
                {title && <h5 className="mb-1 font-bold">{title}</h5>}
                <div className="text-sm opacity-90 [&>p]:m-0">{children}</div>
            </div>
        </div>
    );
}