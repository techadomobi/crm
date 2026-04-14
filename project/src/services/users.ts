import { apiRequest } from '../api/httpClient';
import { asArray } from './utils';

export const usersService = {
  async list(params?: Record<string, string | number>) {
    const [managers, partners] = await Promise.allSettled([
      apiRequest('/manager/managerList', { method: 'GET', query: params }),
      apiRequest('/admin/partnersList', { method: 'GET', query: params }),
    ]);

    const managerRows = managers.status === 'fulfilled' ? asArray<Record<string, unknown>>(managers.value) : [];
    const partnerRows = partners.status === 'fulfilled' ? asArray<Record<string, unknown>>(partners.value) : [];

    if (managerRows.length === 0 && partnerRows.length === 0) {
      const managersError = managers.status === 'rejected' ? managers.reason : null;
      const partnersError = partners.status === 'rejected' ? partners.reason : null;
      const reason = managersError ?? partnersError;
      if (reason instanceof Error) throw reason;
      throw new Error('No user data returned by manager/partner API endpoints.');
    }

    return [
      ...managerRows.map((row) => ({ ...row, _source: 'manager' })),
      ...partnerRows.map((row) => ({ ...row, _source: 'partner' })),
    ];
  },

  async permissions(params?: Record<string, string | number>) {
    const response = await apiRequest('/subAdmin/viewuserData', { method: 'GET', query: params });
    return response;
  },
};
