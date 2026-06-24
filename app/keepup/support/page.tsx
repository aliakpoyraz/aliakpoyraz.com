import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help with the Keep Up habit tracking app.',
};

const faqs = [
  {
    q: 'How do I add a new habit?',
    a: 'Tap the + button on the Today tab. Enter a name, pick an icon and color, choose your schedule (daily, weekdays, weekends, or custom days), and optionally set a reminder time.',
  },
  {
    q: 'How are streaks calculated?',
    a: 'A streak counts consecutive days you complete a habit. If you miss a day your habit was scheduled for, the streak resets. Days the habit is not scheduled (e.g. weekends for a weekday habit) are skipped and do not break the streak.',
  },
  {
    q: 'What is streak freeze?',
    a: 'Streak freeze is a Premium feature. If you forget to complete a habit, you can freeze your streak the next day so it is not lost. You get 2 freezes per month.',
  },
  {
    q: 'How do I edit or delete a habit?',
    a: 'On the Today screen, long-press a habit to access Edit and Delete options. You can also swipe left on a habit row.',
  },
  {
    q: 'Why are my notifications not showing?',
    a: 'Go to iPhone Settings → Notifications → Keep Up and make sure notifications are allowed. Also check that your device is not in Focus / Do Not Disturb mode during your reminder time.',
  },
  {
    q: 'How do I add the widget to my Home Screen?',
    a: 'Long-press an empty area on your Home Screen → tap the + button in the top-left → search for "Keep Up" → choose the widget size and tap Add Widget.',
  },
  {
    q: 'Can I change which habit the widget shows?',
    a: 'Yes — that is a Premium feature. After upgrading, long-press the widget and tap Edit Widget to choose which habit to display.',
  },
  {
    q: 'Is my data backed up?',
    a: "Your habits are stored locally on your device via CoreData. If you have iCloud Device Backup enabled in Settings → [your name] → iCloud → iCloud Backup, your Keep Up data is included in that backup automatically.",
  },
  {
    q: 'How do I restore my data after reinstalling?',
    a: 'Restore your iPhone from a recent iCloud or iTunes backup. Keep Up data will be restored as part of the full device restore.',
  },
  {
    q: 'How do I restore my Premium purchase?',
    a: 'Go to Settings inside the app and tap Restore Purchase. Your purchase is tied to your Apple ID — it will be restored at no charge.',
  },
  {
    q: 'Does Keep Up work on iPad?',
    a: 'Yes. Keep Up runs natively on iPhone and iPad on iOS/iPadOS 17 and later.',
  },
];

export default function Support() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <Link
        href="/"
        className="text-sm mb-8 inline-block transition-opacity hover:opacity-75"
        style={{ color: '#FF6B35' }}
      >
        ← Keep Up
      </Link>

      <h1 className="text-3xl font-extrabold mb-2" style={{ color: '#FFFFFF' }}>
        Support
      </h1>
      <p className="text-sm mb-12" style={{ color: '#636366' }}>
        Questions, feedback, or bug reports — we&apos;re here to help.
      </p>

      {/* Contact card */}
      <div
        className="rounded-2xl p-6 mb-14"
        style={{ background: '#1C1C1E', border: '1px solid #2C2C2E' }}
      >
        <h2 className="font-semibold mb-1" style={{ color: '#FFFFFF' }}>
          Contact
        </h2>
        <p className="text-sm mb-4" style={{ color: '#8E8E93' }}>
          Send us a message and we&apos;ll get back to you as soon as possible.
        </p>
        <a
          href="mailto:aliakpoyraz@gmail.com?subject=Keep Up Support"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-85"
          style={{ background: '#FF6B35', color: '#FFFFFF' }}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
          aliakpoyraz@gmail.com
        </a>
      </div>

      {/* FAQ */}
      <h2 className="text-xl font-semibold mb-6" style={{ color: '#FFFFFF' }}>
        Frequently Asked Questions
      </h2>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.q}
            className="group rounded-2xl overflow-hidden"
            style={{ background: '#1C1C1E', border: '1px solid #2C2C2E' }}
          >
            <summary
              className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium select-none"
              style={{ color: '#FFFFFF' }}
            >
              {faq.q}
              <span
                className="ml-4 shrink-0 text-xs transition-transform group-open:rotate-180"
                style={{ color: '#636366' }}
                aria-hidden="true"
              >
                ▼
              </span>
            </summary>
            <p className="px-5 pb-4 text-sm leading-relaxed" style={{ color: '#8E8E93' }}>
              {faq.a}
            </p>
          </details>
        ))}
      </div>

      <div className="mt-16 pt-8 text-center border-t" style={{ borderColor: '#2C2C2E' }}>
        <Link
          href="/privacy"
          className="text-sm transition-opacity hover:opacity-75"
          style={{ color: '#636366' }}
        >
          Privacy Policy →
        </Link>
      </div>
    </main>
  );
}
