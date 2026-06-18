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
    info: "bg-info-soft border-info-soft text-info border-l-4",
    warning: "bg-warning-soft border-warning-soft text-warning border-l-4",
    success: "bg-success-soft border-success-soft text-success border-l-4",
    danger: "bg-danger-soft border-danger-soft text-danger border-l-4",
};

export default function Callout({ type = 'info', title, children }: CalloutProps) {
    const Icon = icons[type];
    const style = styles[type];

    return (
        <div className={`my-6 flex gap-3 rounded-xl border bg-surface/80 backdrop-blur-xl p-4 shadow-lg ${style}`}>
            <Icon className="mt-1 h-5 w-5 shrink-0" />
            <div className="flex-1">
                {title && <h5 className="mb-1 font-bold">{title}</h5>}
                <div className="text-sm opacity-90 [&>p]:m-0">{children}</div>
            </div>
        </div>
    );
}
