import { apiClient } from '../lib/apiClient';
import type { ApiEnvelope } from '../types/api';
import type { ContactRecord } from '../types/crm';
import { asArray, unwrap } from './utils';

export const contactsService = {
  async list(params?: Record<string, string | number>) {
    const response = await apiClient.get<ApiEnvelope<unknown>>('/contacts', { params });
    const rows = asArray<Record<string, unknown>>(unwrap(response.data));
    return rows.map((row, index) => ({
      id: String(row._id || row.id || row.publisherId || `contact-${index}`),
      name: String(row.firstName || row.name || row.companyName || 'Unknown'),
      email: String(row.email || ''),
      phone: String(row.mobileNumber || row.phone || ''),
      companyName: String(row.companyName || 'Unknown'),
      status: String(row.status || 'unknown'),
      createdAt: typeof row.createdAt === 'string' ? row.createdAt : undefined,
    })) as ContactRecord[];
  },
};
