import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

const handler = makeRouteHandler({
  config,
  clientId: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID,
  clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
  secret: process.env.KEYSTATIC_SECRET,
});

export const GET = (req: Request, ...args: any[]) => {
  console.error('--- Keystatic GET Request ---');
  console.error('URL:', req.url);
  console.error('Keys check:', {
    clientId: !!process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID,
    clientSecret: !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
    secret: !!process.env.KEYSTATIC_SECRET,
    clientIdPrefix: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID?.slice(0, 4)
  });
  // @ts-ignore
  return handler.GET(req, ...args);
};

export const POST = (req: Request, ...args: any[]) => {
  console.error('--- Keystatic POST Request ---');
  console.error('URL:', req.url);
  // @ts-ignore
  return handler.POST(req, ...args);
};

export const dynamic = "force-dynamic";
