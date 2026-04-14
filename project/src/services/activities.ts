import type { ActivityRecord } from '../types/crm';
import { fetchLiveActivities } from '../api/liveDataAdapters';

export const activitiesService = {
  async list(params?: Record<string, string | number>) {
    const rows = await fetchLiveActivities();
    const mapped = rows.map((row, index) => ({
      id: row.id || `activity-${index}`,
      type: row.type,
      title: row.title,
      dueDate: row.date,
      status: row.status,
      owner: row.assignee,
    })) as ActivityRecord[];

    const limit = Number(params?.limit ?? 0);
    return Number.isFinite(limit) && limit > 0 ? mapped.slice(0, limit) : mapped;
  },

  async dueToday(params?: Record<string, string | number>) {
    const rows = await this.list(params);
    const today = new Date().toISOString().slice(0, 10);
    return rows.filter((row) => (row.dueDate ?? '').slice(0, 10) === today).length;
  },
};
