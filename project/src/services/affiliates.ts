import { apiRequest } from '../api/httpClient';

export interface AffiliateRecord {
  id: string;
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: string;
  country: string;
  createdAt: string;
  manager: string;
}

const extractList = (response: unknown): unknown[] => {
  if (!response) return [];
  if (Array.isArray(response)) return response;

  if (typeof response !== 'object') return [];
  const keys = ['data', 'result', 'rows', 'items', 'list', 'records', 'docs', 'publishers', 'advertisers', 'payload'];

  const queue: Array<{ node: unknown; depth: number }> = [{ node: response, depth: 0 }];
  const visited = new Set<unknown>();
  let firstEmptyArray: unknown[] | null = null;

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) continue;
    if (current.depth > 6) continue;
    if (visited.has(current.node)) continue;
    visited.add(current.node);

    if (Array.isArray(current.node)) {
      if (current.node.length > 0) return current.node;
      if (!firstEmptyArray) firstEmptyArray = current.node;
      continue;
    }

    if (!current.node || typeof current.node !== 'object') continue;
    const obj = current.node as Record<string, unknown>;

    for (const key of keys) {
      const candidate = obj[key];
      if (Array.isArray(candidate)) {
        if (candidate.length > 0) return candidate;
        if (!firstEmptyArray) firstEmptyArray = candidate;
      } else if (candidate && typeof candidate === 'object') {
        queue.push({ node: candidate, depth: current.depth + 1 });
      }
    }

    for (const value of Object.values(obj)) {
      if (Array.isArray(value)) {
        if (value.length > 0) return value;
        if (!firstEmptyArray) firstEmptyArray = value;
      } else if (value && typeof value === 'object') {
        queue.push({ node: value, depth: current.depth + 1 });
      }
    }
  }

  return firstEmptyArray ?? [];
};

const extractErrorMessage = (response: unknown): string | null => {
  if (!response || typeof response !== 'object') return null;
  const obj = response as Record<string, unknown>;
  const candidates = [obj.message, obj.error, obj.msg, obj.responseMessage, obj.detail, obj.reason];

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) {
      const text = candidate.trim();
      const lower = text.toLowerCase();
      if (
        lower.includes('invalid')
        || lower.includes('unauthorized')
        || lower.includes('forbidden')
        || lower.includes('required')
        || lower.includes('not found')
        || lower.includes('failed')
        || lower.includes('error')
      ) {
        return text;
      }
    }
  }

  return null;
};

const toString = (val: unknown): string => {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  try {
    return String(val);
  } catch {
    return '';
  }
};

const getPartnersId = () =>
  (localStorage.getItem('repowire_partners_id')
    ?? localStorage.getItem('repowire_partners_Id')
    ?? localStorage.getItem('partners_Id')
    ?? '1').trim();

const readFirstId = (keys: string[]) => {
  for (const key of keys) {
    const value = localStorage.getItem(key)?.trim();
    if (value) return value;
  }
  return '';
};

const requestListWithVariants = async (path: string, baseQuery: Record<string, string | number>) => {
  const page = Number(baseQuery.page ?? 1);
  const limit = Number(baseQuery.limit ?? 50);
  const search = typeof baseQuery.search === 'string' ? baseQuery.search.trim() : '';
  const partnersId = getPartnersId();

  const variants: Array<Record<string, string | number>> = [
    { ...(partnersId ? { partners_Id: partnersId } : {}), ...(search ? { search } : {}) },
    { ...(partnersId ? { partners_Id: partnersId } : {}), ...(search ? { q: search } : {}) },
    { ...(partnersId ? { partners_Id: partnersId } : {}), ...(search ? { keyword: search } : {}) },
    { ...(partnersId ? { partners_Id: partnersId } : {}), ...(search ? { query: search } : {}) },
    { page, limit, ...(partnersId ? { partners_Id: partnersId } : {}), ...(search ? { search } : {}) },
    { page, limit, ...(partnersId ? { partners_Id: partnersId } : {}), ...(search ? { q: search } : {}) },
    { page, limit, ...(partnersId ? { partners_Id: partnersId } : {}), ...(search ? { keyword: search } : {}) },
    { page, limit, ...(partnersId ? { partners_Id: partnersId } : {}), ...(search ? { query: search } : {}) },
    { page, limit, ...(search ? { search } : {}) },
    { page, limit, ...(search ? { q: search } : {}) },
    { page, limit, ...(search ? { keyword: search } : {}) },
    { page, limit, ...(search ? { query: search } : {}) },
  ];

  const seen = new Set<string>();
  let lastErrorMessage: string | null = null;

  for (const query of variants) {
    const key = JSON.stringify(query);
    if (seen.has(key)) continue;
    seen.add(key);

    const response = await apiRequest(path, {
      method: 'GET',
      query,
    });

    const list = extractList(response);
    if (list.length > 0) return list;

    const responseError = extractErrorMessage(response);
    if (responseError) {
      lastErrorMessage = responseError;
    }
  }

  if (lastErrorMessage) {
    throw new Error(lastErrorMessage);
  }

  return [];
};

const mapAffiliateRow = (row: unknown, index: number, role: 'publisher' | 'advertiser'): AffiliateRecord => {
  const item = row as Record<string, unknown>;
  const id = toString(item.id || item.publisherId || item.advertiserId || item._id || index);
  const company = toString(item.companyName || item.company || item.publisherName || item.advertiserName || 'N/A');
  const contactPerson = toString(item.publisherName || item.advertiserName || item.contactPerson || item.fullName || 'N/A');
  const email = toString(item.email || item.contactEmail || '');
  const phone = toString(item.phone || item.mobileNumber || item.number || '');
  const status = toString(item.status || item.accountStatus || 'ACTIVE');
  const country = toString(item.country || item.countryCode || item.location || 'IN');
  const createdAt = toString(item.createdAt || item.created || item.addedAt || item.date || '');
  const manager = toString(item.manager || item.managerName || item.assignedManager || (role === 'publisher' ? 'demopub' : 'demoadv'));

  return {
    id,
    company,
    contactPerson,
    email,
    phone,
    status,
    country,
    createdAt,
    manager,
  };
};

export const affiliatesService = {
  async listPublishers(params?: { page?: number; limit?: number; search?: string }): Promise<AffiliateRecord[]> {
    const list = await requestListWithVariants('/publicher/publisherList', {
      page: params?.page ?? 1,
      limit: params?.limit ?? 50,
      search: params?.search ?? '',
    });

    return list.map((row, index) => mapAffiliateRow(row, index, 'publisher'));
  },

  async listAdvertisers(params?: { page?: number; limit?: number; search?: string }): Promise<AffiliateRecord[]> {
    const baseQuery = {
      page: params?.page ?? 1,
      limit: params?.limit ?? 50,
      search: params?.search ?? '',
    };

    const list = await requestListWithVariants('/advertiser/advertiserList', baseQuery);
    if (list.length > 0) {
      return list.map((row, index) => mapAffiliateRow(row, index, 'advertiser'));
    }

    const managerIdCandidates = [
      readFirstId(['repowire_manager_id']),
      readFirstId(['repowire_user_id']),
      readFirstId(['repowire_advertiser_id']),
    ].filter(Boolean);

    for (const managerId of managerIdCandidates) {
      try {
        const managerList = await requestListWithVariants('/manager/advertiserAsignList', {
          ...baseQuery,
          managerId,
        });

        if (managerList.length > 0) {
          return managerList.map((row, index) => mapAffiliateRow(row, index, 'advertiser'));
        }
      } catch {
        // Keep trying remaining manager IDs.
      }
    }

    return list.map((row, index) => mapAffiliateRow(row, index, 'advertiser'));
  },
};
