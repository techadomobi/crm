import { apiClient } from '../lib/apiClient';
import type { ApiEnvelope } from '../types/api';
import { asArray, unwrap } from './utils';

export const settingsService = {
  async plans(params?: Record<string, string | number>) {
    const response = await apiClient.get<ApiEnvelope<unknown>>('/settings/plans', { params });
    return asArray<Record<string, unknown>>(unwrap(response.data));
  },

  async countries(params?: Record<string, string | number>) {
    const response = await apiClient.get<ApiEnvelope<unknown>>('/settings/countries', { params });
    return asArray<Record<string, unknown>>(unwrap(response.data));
  },
};
