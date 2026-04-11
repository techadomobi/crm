import { apiRequest } from './httpClient';

export type AuthAccountType = 'admin' | 'advertiser' | 'publisher';

export type AdminLoginPayload = {
  partners_Id?: string;
  email: string;
  password: string;
} & Record<string, unknown>;

export type SignupPayload = {
  partners_Id?: string;
  email: string;
  password: string;
  confirm_password?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  mobileNumber?: string;
  address?: string;
  name?: string;
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

export interface OfferListQuery extends ListQuery {
  page?: number;
  search?: string;
}

export type CreateOfferPayload = Record<string, unknown>;

const profileEndpointPriority: Record<AuthAccountType, string[]> = {
  admin: ['/subAdmin/viewData', '/admin/view'],
  advertiser: ['/advertiser/advertiserView'],
  publisher: ['/publicher/viewData'],
};

const getProfileEndpoints = (accountType: AuthAccountType, loginSource?: string) => {
  if (accountType !== 'admin' || !loginSource) {
    return profileEndpointPriority[accountType];
  }

  if (loginSource.includes('/admin/')) {
    return ['/admin/view', '/subAdmin/viewData'];
  }

  if (loginSource.includes('/subAdmin/')) {
    return ['/subAdmin/viewData', '/admin/view'];
  }

  return profileEndpointPriority.admin;
};

export const repowireApi = {
  adminLogin: (payload: AdminLoginPayload) =>
    apiRequest('/admin/login', {
      method: 'POST',
      body: payload,
      asUrlEncoded: true,
      skipAuth: true,
    }),

  subAdminLogin: (payload: AdminLoginPayload) =>
    apiRequest('/subAdmin/login', {
      method: 'POST',
      body: payload,
      asUrlEncoded: true,
      skipAuth: true,
    }),

  publicherLogin: (payload: AdminLoginPayload) =>
    apiRequest('/publicher/login', {
      method: 'POST',
      body: payload,
      asUrlEncoded: true,
      skipAuth: true,
    }),

  advertiserLogin: (payload: AdminLoginPayload) =>
    apiRequest('/advertiser/login', {
      method: 'POST',
      body: payload,
      asUrlEncoded: true,
      skipAuth: true,
    }),

  singleLogin: (payload: AdminLoginPayload) =>
    apiRequest('/subAdmin/singleLogin', {
      method: 'POST',
      body: payload,
      asUrlEncoded: true,
      skipAuth: true,
    }),

  subAdminSignup: (payload: SignupPayload) =>
    apiRequest('/subAdmin/signup', {
      method: 'POST',
      body: payload,
      asUrlEncoded: true,
      skipAuth: true,
    }),

  publicherSignup: (payload: SignupPayload) =>
    apiRequest('/publicher/signup', {
      method: 'POST',
      body: payload,
      asUrlEncoded: true,
      skipAuth: true,
    }),

  advertiserSignup: (payload: SignupPayload) =>
    apiRequest('/advertiser/advertiserSignup', {
      method: 'POST',
      body: payload,
      asUrlEncoded: true,
      skipAuth: true,
    }),

  fetchAccountProfile: async (accountType: AuthAccountType, loginSource?: string) => {
    const endpoints = getProfileEndpoints(accountType, loginSource);
    let lastError: unknown = null;

    for (const endpoint of endpoints) {
      try {
        return await apiRequest(endpoint, {
          method: 'GET',
        });
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError instanceof Error ? lastError : new Error('Unable to load account profile.');
  },

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

  offerList: (query?: OfferListQuery) =>
    apiRequest('/offer/offerList', {
      method: 'GET',
      query,
    }),
};
