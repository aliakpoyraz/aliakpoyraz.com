import React from 'react';

export default function PreBlock({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) {
    const child = React.Children.only(children) as React.ReactElement<{ className?: string }> | undefined;
    const className = child?.props?.className || '';
    const match = className.match(/language-(\w+)/);
    const lang = match ? match[1] : null;

    return (
        <div className="relative group/pre">
            {lang && (
                <span className="absolute top-2 right-3 z-10 text-[10px] font-mono font-semibold uppercase tracking-wider text-muted/40 group-hover/pre:text-rose-400/60 transition-colors pointer-events-none select-none">
                    {lang}
                </span>
            )}
            <pre {...props}>{children}</pre>
        </div>
    );
}
