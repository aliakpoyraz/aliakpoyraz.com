import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

// Debug logs for environment variables (only logs existence, not values)
if (!process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID) {
  console.warn('Missing NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID');
}
if (!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET) {
  console.warn('Missing KEYSTATIC_GITHUB_CLIENT_SECRET');
}
if (!process.env.KEYSTATIC_SECRET) {
  console.warn('Missing KEYSTATIC_SECRET');
}

export const { GET, POST } = makeRouteHandler({
  config,
  clientId: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID,
  clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
  secret: process.env.KEYSTATIC_SECRET,
});

export const dynamic = "force-dynamic";
