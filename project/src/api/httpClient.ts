export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://cl.repowire.com';

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiRequestOptions {
  method?: RequestMethod;
  query?: Record<string, string | number | boolean | null | undefined>;
  body?: Record<string, unknown> | FormData;
  token?: string;
  asFormData?: boolean;
  headers?: Record<string, string>;
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
    formData.append(key, String(value));
  });
  return formData;
};

export async function apiRequest<T = unknown>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const {
    method = 'GET',
    query,
    body,
    token,
    asFormData = false,
    headers = {},
  } = options;

  const authToken = token ?? localStorage.getItem('repowire_token') ?? '';
  const url = `${API_BASE_URL}${path}${buildQueryString(query)}`;

  const requestHeaders: Record<string, string> = {
    ...headers,
  };

  const requestInit: RequestInit = {
    method,
    headers: requestHeaders,
  };

  if (authToken) {
    requestHeaders.Authorization = authToken.startsWith('Bearer ') ? authToken : `Bearer ${authToken}`;
  }

  if (body) {
    if (asFormData) {
      requestInit.body = body instanceof FormData ? body : toFormData(body);
    } else {
      requestHeaders['Content-Type'] = 'application/json';
      requestInit.body = JSON.stringify(body);
    }
  }

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
