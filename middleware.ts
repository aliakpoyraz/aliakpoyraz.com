import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') || '';

  if (hostname.startsWith('keepup.')) {
    const url = req.nextUrl.clone();
    const pathname = url.pathname === '/' ? '' : url.pathname;
    url.pathname = `/keepup${pathname}`;
    return NextResponse.rewrite(url);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/', '/(tr|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
