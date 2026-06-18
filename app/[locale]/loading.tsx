export default function Loading() {
    return (
        <div className="w-full max-w-2xl mx-auto mt-8 md:mt-16 px-4 mb-20 animate-pulse">
            {/* Skeleton başlık */}
            <div className="h-8 w-48 bg-surface rounded-lg mb-8" />
            <div className="h-10 w-3/4 bg-surface rounded-2xl mb-4" />
            <div className="h-4 w-full bg-surface rounded-xl mb-2" />
            <div className="h-4 w-2/3 bg-surface rounded-xl mb-10" />

            {/* Skeleton kartları */}
            <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="p-6 rounded-3xl border border-border-main">
                        <div className="h-6 w-3/4 bg-surface rounded-lg mb-3" />
                        <div className="h-4 w-full bg-surface rounded-xl mb-2" />
                        <div className="h-4 w-5/6 bg-surface rounded-xl" />
                    </div>
                ))}
            </div>
        </div>
    );
}
