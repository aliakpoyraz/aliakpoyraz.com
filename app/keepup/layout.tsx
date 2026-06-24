import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import '../globals.css';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://keepup.aliakpoyraz.com'),
  title: {
    default: 'Keep Up',
    template: '%s · Keep Up',
  },
  description: 'Track, streak, repeat. Your daily companion for a better you.',
  icons: { icon: '/img/keepup/icon.png' },
  themeColor: '#0D0D0F',
};

export default function KeepUpLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: 'dark' }}>
      <body
        className={`${spaceGrotesk.className} antialiased min-h-screen`}
        style={{ background: '#0D0D0F', color: '#FFFFFF' }}
      >
        {children}
      </body>
    </html>
  );
}
