import type { LeadRecord } from '../types/crm';
import { fetchLiveDeals } from '../api/liveDataAdapters';

export const leadsService = {
  async listPipeline(params?: Record<string, string | number>) {
    const deals = await fetchLiveDeals();
    const rows = deals
      .filter((deal) => !['closed_won', 'closed_lost'].includes(deal.stage))
      .map((deal, index) => ({
        id: deal.id || `lead-${index}`,
        status: deal.stage || 'open',
        source: deal.title || deal.company || '',
        createdAt: deal.createdAt,
      })) as LeadRecord[];

    const limit = Number(params?.limit ?? 0);
    return Number.isFinite(limit) && limit > 0 ? rows.slice(0, limit) : rows;
  },
};
