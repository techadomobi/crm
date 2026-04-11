import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { ApiErrorResponse } from '../types/api';
import { AppApiError } from '../types/api';
import { useAppStore } from '../store/appStore';

const baseURL = import.meta.env.VITE_PROXY_BASE_URL ?? import.meta.env.VITE_API_BASE_URL ?? '/api/proxy';

export const apiClient = axios.create({
  baseURL,
  timeout: 30_000,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAppStore.getState().authToken || localStorage.getItem('repowire_token') || '';
  if (token) {
    config.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
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
