import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

const clientId = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID?.trim();
const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET?.trim();
const secret = process.env.KEYSTATIC_SECRET?.trim();

const handler = makeRouteHandler({
  config,
  clientId,
  clientSecret,
  secret,
});

export const GET = async (req: Request, ...args: any[]) => {
  console.error('--- Keystatic GET Request ---');
  const url = new URL(req.url);
  console.error('URL Path:', url.pathname + url.search);
  console.error('Keys check:', {
    clientId: !!clientId,
    clientSecret: !!clientSecret,
    secret: !!secret,
    clientIdLength: clientId?.length,
    clientSecretLength: clientSecret?.length,
    secretLength: secret?.length,
    clientIdPrefix: clientId?.slice(0, 4)
  });
  
  try {
    // @ts-ignore
    const res = await handler.GET(req, ...args);
    console.error('GET Response Status:', res.status);
    return res;
  } catch (err) {
    console.error('GET Error:', err);
    throw err;
  }
};

export const POST = async (req: Request, ...args: any[]) => {
  console.error('--- Keystatic POST Request ---');
  console.error('URL Path:', new URL(req.url).pathname);
  try {
    // @ts-ignore
    const res = await handler.POST(req, ...args);
    console.error('POST Response Status:', res.status);
    return res;
  } catch (err) {
    console.error('POST Error:', err);
    throw err;
  }
};

export const dynamic = "force-dynamic";
