export default function Background() {
    return (
        <div
            className="fixed inset-0 -z-10 pointer-events-none transition-colors duration-300"
            style={{
                backgroundColor: 'var(--bg)',
                backgroundImage: `
                    radial-gradient(circle at 1px 1px, var(--border) 0.6px, transparent 0.6px),
                    radial-gradient(circle at center, transparent 0%, var(--bg) 100%)
                `,
                backgroundSize: '18px 18px, 100% 100%',
            }}
        />
    );
}
