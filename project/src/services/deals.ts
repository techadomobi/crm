import type { DealRecord } from '../types/crm';
import { fetchLiveDeals } from '../api/liveDataAdapters';

export const dealsService = {
  async list(params?: Record<string, string | number>) {
    const rows = await fetchLiveDeals();
    const mapped = rows.map((row, index) => ({
      id: row.id || `deal-${index}`,
      title: row.title,
      value: row.value,
      stage: row.stage,
      closeDate: row.closeDate,
      owner: row.assignee,
      createdAt: row.createdAt,
    })) as DealRecord[];

    const limit = Number(params?.limit ?? 0);
    return Number.isFinite(limit) && limit > 0 ? mapped.slice(0, limit) : mapped;
  },
};
