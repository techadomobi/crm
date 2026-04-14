import { apiRequest } from '../api/httpClient';
import { asArray } from './utils';

export const settingsService = {
  async plans(params?: Record<string, string | number>) {
    const response = await apiRequest('/admin/planList', { method: 'GET', query: params });
    return asArray<Record<string, unknown>>(response);
  },

  async countries(params?: Record<string, string | number>) {
    const response = await apiRequest('/user/countrylist', { method: 'GET', query: params });
    return asArray<Record<string, unknown>>(response);
  },
};
