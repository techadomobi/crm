import { apiClient } from '../lib/apiClient';
import type { ApiEnvelope } from '../types/api';
import type { ActivityRecord } from '../types/crm';
import { asArray, unwrap } from './utils';

export const activitiesService = {
  async list(params?: Record<string, string | number>) {
    const response = await apiClient.get<ApiEnvelope<unknown>>('/activities', { params });
    const rows = asArray<Record<string, unknown>>(unwrap(response.data));
    return rows.map((row, index) => ({
      id: String(row._id || row.id || row.conversionId || `activity-${index}`),
      type: String(row.type || row.activityType || 'task'),
      title: String(row.title || row.offerName || `Activity ${index + 1}`),
      dueDate: typeof row.date === 'string' ? row.date : undefined,
      status: String(row.status || row.conversionStatus || 'pending'),
      owner: String(row.managerName || 'System'),
    })) as ActivityRecord[];
  },

  async dueToday(params?: Record<string, string | number>) {
    const response = await apiClient.get<ApiEnvelope<unknown>>('/activities/today', { params });
    return asArray<Record<string, unknown>>(unwrap(response.data)).length;
  },
};
