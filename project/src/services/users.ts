import { apiClient } from '../lib/apiClient';
import type { ApiEnvelope } from '../types/api';
import { asArray, unwrap } from './utils';

export const usersService = {
  async list(params?: Record<string, string | number>) {
    const response = await apiClient.get<ApiEnvelope<unknown>>('/users', { params });
    return asArray<Record<string, unknown>>(unwrap(response.data));
  },

  async permissions(params?: Record<string, string | number>) {
    const response = await apiClient.get<ApiEnvelope<unknown>>('/users/permissions', { params });
    return unwrap(response.data);
  },
};
