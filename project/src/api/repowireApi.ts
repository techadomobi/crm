import { apiRequest } from './httpClient';

export type AdminLoginPayload = {
  email: string;
  password: string;
} & Record<string, unknown>;

export type ListQuery = {
  page?: number;
  limit?: number;
  search?: string;
} & Record<string, string | number | boolean | null | undefined>;

export interface ConversionSummary {
  totalConversion: unknown;
  totalPayout: unknown;
  totalRevenue: unknown;
  totalProfit: unknown;
}

export interface ConversionListQuery extends ListQuery {
  startDate?: string;
  endDate?: string;
  searchBy?: 'offerid' | 'publisherId' | 'advertiserId' | 'clickId';
}

export const repowireApi = {
  adminLogin: (payload: AdminLoginPayload) =>
    apiRequest('/admin/login', {
      method: 'POST',
      body: payload,
      asFormData: true,
    }),

  publisherList: (query?: ListQuery) =>
    apiRequest('/publicher/publisherList', {
      method: 'GET',
      query,
    }),

  advertiserList: (query?: ListQuery) =>
    apiRequest('/advertiser/advertiserList', {
      method: 'GET',
      query,
    }),

  conversionSummary: async (): Promise<ConversionSummary> => {
    const [totalConversion, totalPayout, totalRevenue, totalProfit] = await Promise.all([
      apiRequest('/conversion/totalConversion', { method: 'GET' }),
      apiRequest('/conversion/totalPayout', { method: 'GET' }),
      apiRequest('/conversion/totalRevenue', { method: 'GET' }),
      apiRequest('/conversion/totalProfit', { method: 'GET' }),
    ]);

    return {
      totalConversion,
      totalPayout,
      totalRevenue,
      totalProfit,
    };
  },

  conversionPostbackLogs: (query?: { page?: number; limit?: number; fromDate?: string; toDate?: string }) =>
    apiRequest('/conversion/postbackLogs', {
      method: 'GET',
      query,
    }),

  conversionList: (query?: ConversionListQuery) =>
    apiRequest('/conversion/ConversionList', {
      method: 'GET',
      query,
    }),

  conversionAccordingToDate: (query: { startDate: string }) =>
    apiRequest('/conversion/getConversionAccordingToDate', {
      method: 'GET',
      query,
    }),
};
