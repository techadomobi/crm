import { apiClient } from '../lib/apiClient';
import type { ApiEnvelope } from '../types/api';
import { unwrap } from './utils';

export const reportsService = {
  async revenue(params?: Record<string, string | number>) {
    const response = await apiClient.get<ApiEnvelope<unknown>>('/reports/revenue', { params });
    return unwrap(response.data);
  },
};
