import { apiClient } from '../lib/apiClient';
import type { ApiEnvelope } from '../types/api';
import type { LeadRecord } from '../types/crm';
import { asArray, unwrap } from './utils';

export const leadsService = {
  async listPipeline(params?: Record<string, string | number>) {
    const response = await apiClient.get<ApiEnvelope<unknown>>('/leads/pipeline', { params });
    const rows = asArray<Record<string, unknown>>(unwrap(response.data));
    return rows.map((row, index) => ({
      id: String(row._id || row.id || row.offerId || `lead-${index}`),
      status: String(row.status || row.stage || 'open'),
      source: String(row.source || row.offerName || ''),
      createdAt: typeof row.createdAt === 'string' ? row.createdAt : undefined,
    })) as LeadRecord[];
  },
};
