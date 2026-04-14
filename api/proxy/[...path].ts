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

const resolveProxyPathname = (req: VercelRequest) => {
  const fromQuery = toPathname(req.query.path);
  if (fromQuery !== '/') return fromQuery;

  const rawUrl = String(req.url ?? '');
  const withoutQuery = rawUrl.split('?')[0] ?? '';
  const normalized = withoutQuery.startsWith('/api/proxy')
    ? withoutQuery.slice('/api/proxy'.length)
    : withoutQuery;

  if (!normalized || normalized === '/') return '/';
  return normalized.startsWith('/') ? normalized : `/${normalized}`;
};

const buildUpstreamBody = (req: VercelRequest): BodyInit | undefined => {
  if (['GET', 'HEAD'].includes(req.method ?? 'GET')) return undefined;

  const contentType = String(req.headers['content-type'] ?? '').toLowerCase();
  const body = (req as unknown as { body?: unknown }).body;
  if (body === null || body === undefined) return undefined;

  if (typeof body === 'string' || body instanceof Uint8Array || body instanceof ArrayBuffer) {
    return body as BodyInit;
  }

  if (contentType.includes('application/x-www-form-urlencoded') && typeof body === 'object') {
    const params = new URLSearchParams();
    Object.entries(body as Record<string, unknown>).forEach(([key, value]) => {
      if (value === null || value === undefined) return;
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item === null || item === undefined) return;
          params.append(key, String(item));
        });
        return;
      }
      params.append(key, String(value));
    });
    return params.toString();
  }

  if (contentType.includes('application/json') && typeof body === 'object') {
    return JSON.stringify(body);
  }

  if (typeof body === 'object') {
    return JSON.stringify(body);
  }

  return String(body);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  withCors(res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const upstreamUrl = new URL(`${UPSTREAM_BASE_URL}${resolveProxyPathname(req)}`);

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
    body: buildUpstreamBody(req),
  });

  res.status(upstreamResponse.status);

  upstreamResponse.headers.forEach((value, key) => {
    if (HOP_BY_HOP_HEADERS.has(key.toLowerCase())) return;
    res.setHeader(key, value);
  });

  const buffer = Buffer.from(await upstreamResponse.arrayBuffer());
  res.send(buffer);
}
