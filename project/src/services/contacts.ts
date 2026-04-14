import type { ContactRecord } from '../types/crm';
import { fetchLiveContacts } from '../api/liveDataAdapters';

export const contactsService = {
  async list(params?: Record<string, string | number>) {
    const rows = await fetchLiveContacts();
    const mapped = rows.map((row, index) => ({
      id: row.id || `contact-${index}`,
      name: row.name,
      email: row.email,
      phone: row.phone,
      companyName: row.company,
      status: row.status,
      createdAt: row.lastContact,
    })) as ContactRecord[];

    const limit = Number(params?.limit ?? 0);
    return Number.isFinite(limit) && limit > 0 ? mapped.slice(0, limit) : mapped;
  },
};
