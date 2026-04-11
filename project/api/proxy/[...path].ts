import type { VercelRequest, VercelResponse } from '@vercel/node';

const UPSTREAM_BASE_URL = 'https://apiv2.offersmeta.in';
const HOP_BY_HOP_HEADERS = new Set([
  'connection',
  'content-length',
  'host',
  'transfer-encoding',
]);

const withCors = (res: VercelResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, Accept');
};

const toPathname = (input: string | string[] | undefined) => {
  if (!input) return '/';
  if (Array.isArray(input)) return `/${input.join('/')}`;
  return `/${input}`;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  withCors(res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const upstreamUrl = new URL(`${UPSTREAM_BASE_URL}${toPathname(req.query.path)}`);

  Object.entries(req.query).forEach(([key, value]) => {
    if (key === 'path') return;

    if (Array.isArray(value)) {
      value.forEach((item) => upstreamUrl.searchParams.append(key, item));
      return;
    }

    if (typeof value === 'string') {
      upstreamUrl.searchParams.append(key, value);
    }
  });

  const requestHeaders = new Headers();
  Object.entries(req.headers).forEach(([key, value]) => {
    if (!value) return;
    if (HOP_BY_HOP_HEADERS.has(key.toLowerCase())) return;
    if (Array.isArray(value)) {
      requestHeaders.set(key, value.join(', '));
      return;
    }
    requestHeaders.set(key, value);
  });

  const upstreamResponse = await fetch(upstreamUrl, {
    method: req.method,
    headers: requestHeaders,
    body: ['GET', 'HEAD'].includes(req.method ?? 'GET') ? undefined : (req as unknown as { body?: BodyInit }).body,
    duplex: 'half',
  });

  res.status(upstreamResponse.status);

  upstreamResponse.headers.forEach((value, key) => {
    if (HOP_BY_HOP_HEADERS.has(key.toLowerCase())) return;
    res.setHeader(key, value);
  });

  const buffer = Buffer.from(await upstreamResponse.arrayBuffer());
  res.send(buffer);
}
