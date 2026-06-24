import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Keep Up — habit tracking app.',
};

const sections = [
  {
    title: 'Overview',
    body: 'Keep Up is a habit tracking app built with your privacy as the default. We do not have a server. We do not collect your data. This policy explains what happens — or more precisely, what does not happen — with your information.',
  },
  {
    title: 'Data Storage',
    body: 'All your habit data (habit names, schedules, completions, streaks) is stored exclusively on your device using Apple\'s CoreData framework. Nothing is transmitted to any external server.',
    list: [
      'Habit names and icons — stored locally',
      'Completion history and streaks — stored locally',
      'Notification preferences — stored locally',
      'App settings and theme — stored locally',
    ],
  },
  {
    title: 'Data We Do Not Collect',
    list: [
      'We have no user accounts — no name, email, or any identifier',
      'We do not use analytics SDKs or crash reporting services',
      'We do not share any data with third parties',
      'We do not have access to your habits or usage data',
    ],
  },
  {
    title: 'Notifications',
    body: "If you enable reminders, notifications are scheduled locally on your device using Apple's UserNotifications framework. Notification scheduling happens entirely on-device. No data leaves your phone.",
  },
  {
    title: 'In-App Purchases',
    body: "Keep Up offers optional premium upgrades processed through Apple's StoreKit. Payment is handled entirely by Apple. We only receive a confirmation from Apple that a purchase was made — no payment details or personal information.",
  },
  {
    title: "Children's Privacy",
    body: 'Keep Up does not collect any personal data from anyone. The app is suitable for all ages.',
  },
  {
    title: 'Changes to This Policy',
    body: 'If we make material changes to this policy, we will update the date below. Since we do not collect contact information, we cannot notify you directly — please check this page periodically.',
  },
  {
    title: 'Contact',
    body: null,
    contact: true,
  },
];

export default function PrivacyPolicy() {
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
        Privacy Policy
      </h1>
      <p className="text-sm mb-12" style={{ color: '#636366' }}>
        Last updated: June 2025
      </p>

      <div className="space-y-10">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#FFFFFF' }}>
              {s.title}
            </h2>
            {s.body && (
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#8E8E93' }}>
                {s.body}
              </p>
            )}
            {s.list && (
              <ul className="space-y-1 pl-1">
                {s.list.map((item) => (
                  <li key={item} className="flex gap-2 text-sm" style={{ color: '#8E8E93' }}>
                    <span style={{ color: '#FF6B35' }}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {s.contact && (
              <p className="text-sm leading-relaxed" style={{ color: '#8E8E93' }}>
                Questions about this policy?{' '}
                <a
                  href="mailto:aliakpoyraz@gmail.com"
                  className="transition-opacity hover:opacity-75"
                  style={{ color: '#FF6B35' }}
                >
                  aliakpoyraz@gmail.com
                </a>
              </p>
            )}
          </section>
        ))}
      </div>

      <div className="mt-16 pt-8 text-center border-t" style={{ borderColor: '#2C2C2E' }}>
        <Link
          href="/support"
          className="text-sm transition-opacity hover:opacity-75"
          style={{ color: '#636366' }}
        >
          Need help? Visit Support →
        </Link>
      </div>
    </main>
  );
}
