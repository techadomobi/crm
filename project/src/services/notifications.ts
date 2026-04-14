import { repowireApi } from '../api/repowireApi';
import { asArray } from './utils';

export const notificationsService = {
  async list(params?: Record<string, string | number>) {
    const limit = Number(params?.limit ?? 20);
    const page = Number(params?.page ?? 1);

    const [postbacks, conversions] = await Promise.allSettled([
      repowireApi.conversionPostbackLogs({ page, limit }),
      repowireApi.conversionList({ page, limit }),
    ]);

    const postbackRows = postbacks.status === 'fulfilled' ? asArray<Record<string, unknown>>(postbacks.value) : [];
    const conversionRows = conversions.status === 'fulfilled' ? asArray<Record<string, unknown>>(conversions.value) : [];

    if (postbackRows.length === 0 && conversionRows.length === 0) {
      const postbackError = postbacks.status === 'rejected' ? postbacks.reason : null;
      const conversionError = conversions.status === 'rejected' ? conversions.reason : null;
      const reason = postbackError ?? conversionError;
      if (reason instanceof Error) throw reason;
      throw new Error('No notification data returned by postback/conversion APIs.');
    }

    const merged = [
      ...postbackRows.map((row, index) => ({
        id: String(row._id || row.id || row.postbackId || `postback-${index}`),
        type: 'postback',
        title: String(row.message || row.status || 'Postback log update'),
        status: String(row.status || 'info'),
        createdAt: String(row.createdAt || row.date || new Date().toISOString()),
      })),
      ...conversionRows.map((row, index) => ({
        id: String(row._id || row.id || row.conversionId || `conversion-${index}`),
        type: 'conversion',
        title: String(row.offerName || row.conversionStatus || 'Conversion update'),
        status: String(row.conversionStatus || row.status || 'info'),
        createdAt: String(row.createdAt || row.date || new Date().toISOString()),
      })),
    ];

    return merged
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, Number.isFinite(limit) && limit > 0 ? limit : 20);
  },
};
