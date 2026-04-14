import { apiRequest } from '../api/httpClient';

export interface AffiliateRecord {
  id: string;
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: string;
  country: string;
  createdAt: string;
  manager: string;
}

const extractList = (response: unknown): unknown[] => {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  const obj = response as Record<string, unknown>;
  if (Array.isArray(obj.data)) return obj.data;
  if (Array.isArray(obj.result)) return obj.result;
  if (Array.isArray(obj.publishers)) return obj.publishers;
  if (Array.isArray(obj.records)) return obj.records;
  return [];
};

const toString = (val: unknown): string => {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  try {
    return String(val);
  } catch {
    return '';
  }
};

export const affiliatesService = {
  async listPublishers(params?: { page?: number; limit?: number; search?: string }): Promise<AffiliateRecord[]> {
    try {
      const page = params?.page ?? 1;
      const limit = params?.limit ?? 50;
      
      const response = await apiRequest('/publicher/publisherList', {
        method: 'GET',
        query: {
          page,
          limit,
          ...(params?.search && { search: params.search }),
        },
      });

      const list = extractList(response);
      return list.map((row: unknown, index: number) => {
        const item = row as Record<string, unknown>;
        return {
          id: toString(item.id || item.publisherId || index),
          company: toString(item.companyName || item.company || 'N/A'),
          contactPerson: toString(item.publisherName || item.contactPerson || 'N/A'),
          email: toString(item.email || ''),
          phone: toString(item.phone || ''),
          status: toString(item.status || 'ACTIVE'),
          country: toString(item.country || 'IN'),
          createdAt: toString(item.createdAt || item.created || ''),
          manager: toString(item.manager || item.managerName || 'demopub'),
        };
      });
    } catch (error) {
      console.error('Error fetching publishers:', error);
      return [];
    }
  },

  async listAdvertisers(params?: { page?: number; limit?: number; search?: string }): Promise<AffiliateRecord[]> {
    try {
      const page = params?.page ?? 1;
      const limit = params?.limit ?? 50;

      const response = await apiRequest('/advertiser/advertiserList', {
        method: 'GET',
        query: {
          page,
          limit,
          ...(params?.search && { search: params.search }),
        },
      });

      const list = extractList(response);
      return list.map((row: unknown, index: number) => {
        const item = row as Record<string, unknown>;
        return {
          id: toString(item.id || item.advertiserId || index),
          company: toString(item.companyName || item.company || 'N/A'),
          contactPerson: toString(item.advertiserName || item.contactPerson || 'N/A'),
          email: toString(item.email || ''),
          phone: toString(item.phone || ''),
          status: toString(item.status || 'ACTIVE'),
          country: toString(item.country || 'IN'),
          createdAt: toString(item.createdAt || item.created || ''),
          manager: toString(item.manager || item.managerName || 'demoadv'),
        };
      });
    } catch (error) {
      console.error('Error fetching advertisers:', error);
      return [];
    }
  },
};
