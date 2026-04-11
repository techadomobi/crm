import { apiClient } from '../lib/apiClient';
import type { ApiEnvelope } from '../types/api';
import type { DealRecord } from '../types/crm';
import { asArray, toNumber, unwrap } from './utils';

export const dealsService = {
  async list(params?: Record<string, string | number>) {
    const response = await apiClient.get<ApiEnvelope<unknown>>('/deals', { params });
    const rows = asArray<Record<string, unknown>>(unwrap(response.data));
    return rows.map((row, index) => ({
      id: String(row._id || row.id || row.offerId || `deal-${index}`),
      title: String(row.title || row.offerName || `Deal ${index + 1}`),
      value: toNumber(row.revenue || row.payout || row.amount),
      stage: String(row.status || row.offerStatus || 'open'),
      closeDate: typeof row.endDate === 'string' ? row.endDate : undefined,
      owner: String(row.managerName || ''),
      createdAt: typeof row.createdAt === 'string' ? row.createdAt : undefined,
    })) as DealRecord[];
  },
};
