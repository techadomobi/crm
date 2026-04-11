export const API_BASE_URL = import.meta.env.VITE_PROXY_BASE_URL ?? import.meta.env.VITE_API_BASE_URL ?? '/api/proxy';

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

  const authToken = token ?? localStorage.getItem('repowire_token') ?? '';
  const url = `${API_BASE_URL}${path}${buildQueryString(query)}`;

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
    requestHeaders.Authorization = authToken.startsWith('Bearer ') ? authToken : `Bearer ${authToken}`;
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

  return { url, requestInit };
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
  const { url, requestInit } = buildApiFetchInit(path, options);
  const response = await fetch(url, requestInit);
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
  const { url, requestInit } = buildApiFetchInit(path, options);
  const response = await fetch(url, requestInit);
  const text = await response.text();
  let data: unknown = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}`, response.status, data);
  }

  return data as T;
}
