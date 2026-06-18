export default function Background() {
    return (
        <div
            className="fixed inset-0 -z-10 pointer-events-none bg-bg"
            style={{
                backgroundImage: 'radial-gradient(circle at center, transparent 0%, var(--bg) 100%)',
            }}
        />
    );
}
