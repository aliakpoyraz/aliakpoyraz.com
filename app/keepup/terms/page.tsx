import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of Use for Keep Up — habit tracking app.',
};

const sections = [
  {
    title: 'Acceptance of Terms',
    body: 'By downloading or using Keep Up, you agree to these Terms of Use. If you do not agree, please do not use the app.',
  },
  {
    title: 'License',
    body: 'Keep Up grants you a personal, non-transferable, non-exclusive license to use the app on any Apple-branded device you own or control, subject to these terms and the App Store Terms of Service.',
  },
  {
    title: 'In-App Purchases & Subscriptions',
    list: [
      'Keep Up offers optional auto-renewable subscriptions (monthly, yearly) and a one-time lifetime purchase for access to premium features.',
      'Payment is charged to your Apple ID account at confirmation of purchase.',
      'Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current billing period.',
      'You can manage or cancel your subscription at any time in Settings → Apple ID → Subscriptions.',
      'No refunds are provided for the unused portion of a subscription period, except as required by applicable law.',
    ],
  },
  {
    title: 'User Responsibilities',
    list: [
      'You are responsible for maintaining the confidentiality of your device.',
      'You agree not to reverse-engineer, modify, or distribute the app.',
      'You agree not to use the app for any unlawful purpose.',
    ],
  },
  {
    title: 'Intellectual Property',
    body: 'All content, design, and code in Keep Up are the property of the developer. You may not copy, reproduce, or distribute any part of the app without prior written permission.',
  },
  {
    title: 'Disclaimer of Warranties',
    body: 'Keep Up is provided "as is" without warranties of any kind, express or implied. We do not warrant that the app will be uninterrupted, error-free, or free of viruses.',
  },
  {
    title: 'Limitation of Liability',
    body: 'To the fullest extent permitted by law, the developer is not liable for any indirect, incidental, special, or consequential damages arising from your use of the app.',
  },
  {
    title: 'Governing Law',
    body: 'These terms are governed by the laws of Turkey. Any disputes shall be resolved in the courts of Istanbul, Turkey.',
  },
  {
    title: 'Changes to These Terms',
    body: 'We may update these terms from time to time. Continued use of the app after changes are posted constitutes your acceptance of the revised terms.',
  },
  {
    title: 'Contact',
    body: null,
    contact: true,
  },
];

export default function TermsOfUse() {
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
        Terms of Use
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
                Questions about these terms?{' '}
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
