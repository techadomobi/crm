import { fetchLiveContacts } from '../api/liveDataAdapters';

export const companiesService = {
  async list(params?: Record<string, string | number>) {
    const contacts = await fetchLiveContacts();
    const map = new Map<string, { total: number; active: number; value: number }>();

    contacts.forEach((contact) => {
      const companyName = (contact.company || 'Unknown').trim() || 'Unknown';
      const current = map.get(companyName) ?? { total: 0, active: 0, value: 0 };
      current.total += 1;
      if (contact.status === 'active') current.active += 1;
      current.value += contact.value || 0;
      map.set(companyName, current);
    });

    const rows = Array.from(map.entries()).map(([companyName, stats], index) => ({
      id: `company-${index + 1}`,
      companyName,
      totalContacts: stats.total,
      activeContacts: stats.active,
      totalValue: stats.value,
    }));

    const limit = Number(params?.limit ?? 0);
    return Number.isFinite(limit) && limit > 0 ? rows.slice(0, limit) : rows;
  },
};
