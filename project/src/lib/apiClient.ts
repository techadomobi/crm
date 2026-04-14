import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { ApiErrorResponse } from '../types/api';
import { AppApiError } from '../types/api';
import { useAppStore } from '../store/appStore';

const resolveApiBaseUrl = () => {
  const raw = String(import.meta.env.VITE_API_BASE_URL ?? import.meta.env.VITE_PROXY_BASE_URL ?? '/api/proxy').trim();
  if (!raw) return '/api/proxy';
  if (raw === '/api' || raw === '/api/') return '/api/proxy';
  return raw.replace(/\/+$/, '');
};

const baseURL = resolveApiBaseUrl();

export const apiClient = axios.create({
  baseURL,
  timeout: 30_000,
});

const normalizeToken = (raw: string | null | undefined) =>
  (raw ?? '').trim().replace(/^['"]+|['"]+$/g, '').replace(/^Bearer\s+/i, '');

const resolveStoredPartnersId = () =>
  (localStorage.getItem('repowire_partners_id')
    ?? localStorage.getItem('repowire_partners_Id')
    ?? localStorage.getItem('partners_Id')
    ?? '')
    .trim();

const needsPartnersId = (url?: string) => {
  if (!url) return false;
  return /^\/(offer|publicher|advertiser|conversion|report|top|sentLogs|manager|publisherManagement)\//i.test(url);
};

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token =
    normalizeToken(useAppStore.getState().authToken)
    || normalizeToken(localStorage.getItem('repowire_token'))
    || normalizeToken(localStorage.getItem('access_token') ?? localStorage.getItem('token'));

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const method = (config.method ?? 'get').toLowerCase();
  if (method === 'get' && needsPartnersId(config.url)) {
    const params = ((config.params ?? {}) as Record<string, unknown>);
    const hasPartners = Boolean(params.partners_Id ?? params.partnersId ?? params.partnerId ?? params.partner_id);

    if (!hasPartners) {
      const partnersId = resolveStoredPartnersId();
      if (partnersId) {
        config.params = {
          ...params,
          partners_Id: partnersId,
        };
      }
    }
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || error.message || 'API request failed';
    const details = error.response?.data?.error?.details;
    return Promise.reject(new AppApiError(message, status, details));
  }
);
