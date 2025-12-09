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
    info: "bg-blue-950/30 border-blue-800/50 text-blue-200",
    warning: "bg-yellow-950/30 border-yellow-800/50 text-yellow-200",
    success: "bg-green-950/30 border-green-800/50 text-green-200",
    danger: "bg-red-950/30 border-red-800/50 text-red-200",
};

export default function Callout({ type = 'info', title, children }: CalloutProps) {
    const Icon = icons[type];
    const style = styles[type];

    return (
        <div className={`my-6 flex gap-3 rounded-lg border p-4 ${style}`}>
            <Icon className="mt-1 h-5 w-5 flex-shrink-0" />
            <div className="flex-1">
                {title && <h5 className="mb-1 font-bold">{title}</h5>}
                <div className="text-sm opacity-90 [&>p]:m-0">{children}</div>
            </div>
        </div>
    );
}