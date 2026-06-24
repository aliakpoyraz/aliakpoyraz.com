import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    emoji: '🔥',
    title: 'Streaks & Heatmaps',
    desc: 'Never break the chain. Watch your consistency grow with heatmaps and stats that keep you fired up.',
  },
  {
    emoji: '🔔',
    title: 'Smart Reminders',
    desc: 'Custom notifications for every habit — morning, noon, or night. Gentle nudges, better days.',
  },
  {
    emoji: '📱',
    title: 'Home Screen Widgets',
    desc: 'Stay on track without opening the app. Small, medium, and lock screen widgets always in view.',
  },
  {
    emoji: '🗓️',
    title: 'Flexible Schedules',
    desc: 'Daily, weekdays, weekends, or fully custom. You set the pace — not the other way around.',
  },
  {
    emoji: '🔒',
    title: 'Your Data Stays Yours',
    desc: 'No accounts. No cloud sync. No tracking. Everything lives on your device.',
  },
  {
    emoji: '⭐',
    title: 'Premium',
    desc: 'Unlimited habits, heatmap analytics, streak freeze, widget themes, and CSV export.',
  },
];

export default function KeepUpLanding() {
  return (
    <main style={{ fontFamily: 'inherit' }}>
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
        <Image
          src="/img/keepup/icon.png"
          alt="Keep Up app icon"
          width={96}
          height={96}
          className="rounded-[22px] mb-8 shadow-lg"
        />

        <h1 className="text-5xl font-extrabold tracking-tight mb-4" style={{ color: '#FFFFFF' }}>
          Keep{' '}
          <span style={{ color: '#FF6B35' }}>Up</span>
        </h1>

        <p className="text-xl max-w-sm mb-2" style={{ color: '#8E8E93' }}>
          Build habits that stick.
        </p>
        <p className="text-base max-w-xs mb-10" style={{ color: '#636366' }}>
          Track, streak, repeat. Your daily companion for a better you.
        </p>

        <a
          href="https://apps.apple.com/app/keep-up"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold text-base transition-opacity hover:opacity-85"
          style={{ background: '#FF6B35', color: '#FFFFFF' }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          Download on the App Store
        </a>

        <p className="text-xs mt-4" style={{ color: '#48484A' }}>
          Free · iOS 17+ · iPhone &amp; iPad
        </p>
      </section>

      {/* Features */}
      <section className="px-6 pb-20">
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-5"
              style={{ background: '#1C1C1E' }}
            >
              <div className="text-2xl mb-3">{f.emoji}</div>
              <h3 className="font-semibold mb-1" style={{ color: '#FFFFFF' }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#8E8E93' }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy callout */}
      <section className="px-6 pb-20">
        <div
          className="max-w-2xl mx-auto rounded-2xl p-6 text-center"
          style={{ background: '#1C1C1E', border: '1px solid #2C2C2E' }}
        >
          <p className="text-2xl mb-3">🔐</p>
          <h2 className="font-semibold text-lg mb-2" style={{ color: '#FFFFFF' }}>
            No accounts. No tracking.
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#8E8E93' }}>
            Everything stays on your device. We never see your habit data — because we&apos;re not
            looking.
          </p>
          <Link
            href="/privacy"
            className="text-sm font-medium transition-opacity hover:opacity-75"
            style={{ color: '#FF6B35' }}
          >
            Read our Privacy Policy →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-8 text-center text-sm border-t"
        style={{ color: '#48484A', borderColor: '#2C2C2E' }}
      >
        <div className="flex justify-center gap-6 mb-3">
          <Link href="/privacy" className="hover:opacity-75 transition-opacity" style={{ color: '#636366' }}>
            Privacy Policy
          </Link>
          <Link href="/support" className="hover:opacity-75 transition-opacity" style={{ color: '#636366' }}>
            Support
          </Link>
          <a
            href="https://aliakpoyraz.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 transition-opacity"
            style={{ color: '#636366' }}
          >
            aliakpoyraz.com
          </a>
        </div>
        <p>© {new Date().getFullYear()} Ali Akpoyraz</p>
      </footer>
    </main>
  );
}
