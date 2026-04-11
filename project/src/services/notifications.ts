import { apiClient } from '../lib/apiClient';
import type { ApiEnvelope } from '../types/api';
import { asArray, unwrap } from './utils';

export const notificationsService = {
  async list(params?: Record<string, string | number>) {
    const response = await apiClient.get<ApiEnvelope<unknown>>('/notifications', { params });
    return asArray<Record<string, unknown>>(unwrap(response.data));
  },
};
