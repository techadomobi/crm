const resolveApiBaseUrl = () => {
  const raw = String(import.meta.env.VITE_API_BASE_URL ?? import.meta.env.VITE_PROXY_BASE_URL ?? '/api/proxy').trim();
  if (!raw) return '/api/proxy';
  if (raw === '/api' || raw === '/api/') return '/api/proxy';
  return raw.replace(/\/+$/, '');
};

export const API_BASE_URL = resolveApiBaseUrl();
const DIRECT_API_BASE_URL = 'https://apiv2.offersmeta.in';

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiRequestOptions {
  method?: RequestMethod;
  query?: Record<string, string | number | boolean | null | undefined>;
  body?: Record<string, unknown> | FormData;
  token?: string;
  asFormData?: boolean;
  asUrlEncoded?: boolean;
  headers?: Record<string, string>;
  skipAuth?: boolean;
}

const normalizeToken = (raw: string | null | undefined) =>
  (raw ?? '').trim().replace(/^['"]+|['"]+$/g, '').replace(/^Bearer\s+/i, '');

const resolveStoredToken = () => {
  const direct = normalizeToken(localStorage.getItem('repowire_token'));
  if (direct) return direct;
  const fallback = normalizeToken(localStorage.getItem('access_token') ?? localStorage.getItem('token'));
  return fallback;
};

const resolveStoredPartnersId = () =>
  (localStorage.getItem('repowire_partners_id')
    ?? localStorage.getItem('repowire_partners_Id')
    ?? localStorage.getItem('partners_Id')
    ?? '')
    .trim();

const isProtectedOffersmetaPath = (path: string) =>
  /^\/(offer|publicher|advertiser|conversion|report|top|sentLogs|manager|publisherManagement)\//i.test(path);

const isAuthPath = (path: string) =>
  /\/(login|signup|singleLogin)$/i.test(path);

const withAutoPartnersId = (
  path: string,
  query: ApiRequestOptions['query'],
  method: RequestMethod,
  skipAuth: boolean
) => {
  if (skipAuth || method !== 'GET' || !isProtectedOffersmetaPath(path) || isAuthPath(path)) {
    return query;
  }

  const hasPartners = Boolean(
    query && (query.partners_Id ?? query.partnersId ?? query.partnerId ?? query.partner_id)
  );
  if (hasPartners) return query;

  const partnersId = resolveStoredPartnersId();
  if (!partnersId) return query;

  return {
    ...(query ?? {}),
    partners_Id: partnersId,
  };
};

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

const buildQueryString = (query?: ApiRequestOptions['query']) => {
  if (!query) return '';

  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    params.append(key, String(value));
  });

  const serialized = params.toString();
  return serialized ? `?${serialized}` : '';
};

const toFormData = (body: Record<string, unknown>) => {
  const formData = new FormData();
  Object.entries(body).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    if (value instanceof Blob) {
      formData.append(key, value);
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item === null || item === undefined) return;
        if (item instanceof Blob) {
          formData.append(key, item);
        } else {
          formData.append(key, String(item));
        }
      });
      return;
    }

    formData.append(key, String(value));
  });
  return formData;
};

const toUrlEncodedBody = (body: Record<string, unknown>) => {
  const params = new URLSearchParams();

  Object.entries(body).forEach(([key, value]) => {
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

  return params;
};

const buildApiFetchInit = (path: string, options: ApiRequestOptions = {}) => {
  const {
    method = 'GET',
    query,
    body,
    token,
    asFormData = false,
    asUrlEncoded = false,
    headers = {},
    skipAuth = false,
  } = options;

  const authToken = normalizeToken(token) || resolveStoredToken();
  const effectiveQuery = withAutoPartnersId(path, query, method, skipAuth);
  const queryString = buildQueryString(effectiveQuery);
  const url = `${API_BASE_URL}${path}${queryString}`;
  const directUrl = `${DIRECT_API_BASE_URL}${path}${queryString}`;

  const requestHeaders: Record<string, string> = {
    Accept: 'application/json, text/plain, */*',
    ...headers,
  };

  const requestInit: RequestInit = {
    method,
    headers: requestHeaders,
    cache: 'no-store',
  };

  if (!skipAuth && authToken) {
    requestHeaders.Authorization = `Bearer ${authToken}`;
  }

  if (body) {
    if (asFormData) {
      requestInit.body = body instanceof FormData ? body : toFormData(body);
    } else if (asUrlEncoded) {
      requestHeaders['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
      requestInit.body = body instanceof FormData ? new URLSearchParams(body as unknown as Record<string, string>) : toUrlEncodedBody(body).toString();
    } else {
      requestHeaders['Content-Type'] = 'application/json';
      requestInit.body = JSON.stringify(body);
    }
  }

  return { url, directUrl, requestInit, path };
};

const isNetworkFetchError = (error: unknown) =>
  error instanceof TypeError && /failed to fetch|networkerror|load failed/i.test(error.message);

const emitSessionInvalid = (status: number, path: string) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('repowire:session-invalid', {
    detail: { status, path },
  }));
};

const fetchWithFallback = async (path: string, url: string, directUrl: string, requestInit: RequestInit) => {
  try {
    const response = await fetch(url, requestInit);
    const method = String(requestInit.method ?? 'GET').toUpperCase();
    const isSafeRead = method === 'GET' || method === 'HEAD';

    if (isSafeRead && [404, 502, 503].includes(response.status)) {
      try {
        return await fetch(directUrl, requestInit);
      } catch {
        return response;
      }
    }

    return response;
  } catch (error) {
    const method = String(requestInit.method ?? 'GET').toUpperCase();
    const isSafeRead = method === 'GET' || method === 'HEAD';

    // Keep reads and auth resilient when local proxy route is unreachable.
    if ((isAuthPath(path) || isSafeRead) && isNetworkFetchError(error)) {
      return fetch(directUrl, requestInit);
    }
    throw error;
  }
};

export type ApiExecuteResult =
  | { kind: 'json'; status: number; ok: boolean; body: unknown }
  | { kind: 'text'; status: number; ok: boolean; text: string }
  | { kind: 'blob'; status: number; ok: boolean; blob: Blob; contentType: string; filename?: string };

const parseContentDispositionFilename = (header: string | null): string | undefined => {
  if (!header) return undefined;
  const m = /filename\*?=(?:UTF-8''|")?([^";\n]+)/i.exec(header);
  if (!m) return undefined;
  try {
    return decodeURIComponent(m[1].replace(/"/g, '').trim());
  } catch {
    return m[1].replace(/"/g, '').trim();
  }
};

const isLikelyBinaryResponse = (contentType: string) => {
  const ct = contentType.toLowerCase();
  return (
    ct.includes('application/vnd.openxmlformats') ||
    ct.includes('application/vnd.ms-excel') ||
    ct.includes('application/octet-stream') ||
    ct.includes('application/zip') ||
    ct.includes('application/pdf') ||
    ct.includes('image/') ||
    ct.includes('video/') ||
    ct.includes('audio/')
  );
};

/** Same transport as {@link apiRequest} but preserves binary bodies (exports) and returns structured result. */
export async function apiExecute(path: string, options: ApiRequestOptions = {}): Promise<ApiExecuteResult> {
  const { url, directUrl, requestInit } = buildApiFetchInit(path, options);
  let response: Response;
  try {
    response = await fetchWithFallback(path, url, directUrl, requestInit);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Network error';
    throw new ApiError(`Network request failed: ${message}`, 0, { path, url });
  }
  const contentType = response.headers.get('content-type') ?? '';

  const readErrorPayload = async (): Promise<unknown> => {
    if (isLikelyBinaryResponse(contentType)) {
      const buf = await response.arrayBuffer();
      return `[binary ${buf.byteLength} bytes]`;
    }
    const text = await response.text();
    try {
      return text ? JSON.parse(text) : null;
    } catch {
      return text;
    }
  };

  if (!response.ok) {
    const data = await readErrorPayload();
    if (![true].includes(Boolean((options.skipAuth ?? false))) && [401, 403].includes(response.status)) {
      emitSessionInvalid(response.status, path);
    }
    throw new ApiError(`Request failed with status ${response.status}`, response.status, data);
  }

  if (contentType.includes('application/json')) {
    const text = await response.text();
    let body: unknown = null;
    try {
      body = text ? JSON.parse(text) : null;
    } catch {
      body = text;
    }
    return { kind: 'json', status: response.status, ok: response.ok, body };
  }

  if (isLikelyBinaryResponse(contentType)) {
    const blob = await response.blob();
    const filename = parseContentDispositionFilename(response.headers.get('content-disposition'));
    return { kind: 'blob', status: response.status, ok: response.ok, blob, contentType, filename };
  }

  const text = await response.text();
  return { kind: 'text', status: response.status, ok: response.ok, text };
}

export async function apiRequest<T = unknown>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { url, directUrl, requestInit } = buildApiFetchInit(path, options);
  let response: Response;
  try {
    response = await fetchWithFallback(path, url, directUrl, requestInit);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Network error';
    throw new ApiError(`Network request failed: ${message}`, 0, { path, url });
  }
  const text = await response.text();
  let data: unknown = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    if (![true].includes(Boolean((options.skipAuth ?? false))) && [401, 403].includes(response.status)) {
      emitSessionInvalid(response.status, path);
    }
    throw new ApiError(`Request failed with status ${response.status}`, response.status, data);
  }

  return data as T;
}
