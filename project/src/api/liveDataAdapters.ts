import { apiRequest } from './httpClient';
import { Activity, Contact, Deal } from '../types';

type AnyRecord = Record<string, unknown>;

const LIST_KEYS = ['data', 'result', 'rows', 'items', 'list', 'records', 'docs'];

const asObject = (value: unknown): AnyRecord | null => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as AnyRecord;
};

const toNumber = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[^\d.-]/g, ''));
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const toString = (value: unknown): string => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return '';
};

const toDateKey = (value: unknown): string => {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === 'string') {
    const asDate = new Date(value);
    if (!Number.isNaN(asDate.getTime())) return asDate.toISOString().slice(0, 10);
  }

  return new Date().toISOString().slice(0, 10);
};

const extractList = (input: unknown): unknown[] => {
  if (Array.isArray(input)) return input;

  const obj = asObject(input);
  if (!obj) return [];

  for (const key of LIST_KEYS) {
    if (Array.isArray(obj[key])) return obj[key] as unknown[];
  }

  for (const value of Object.values(obj)) {
    if (Array.isArray(value)) return value;
    const nested = asObject(value);
    if (!nested) continue;
    for (const key of LIST_KEYS) {
      if (Array.isArray(nested[key])) return nested[key] as unknown[];
    }
  }

  return [];
};

const extractName = (row: AnyRecord): string => {
  const first = toString(row.firstName);
  const last = toString(row.lastName);
  const full = `${first} ${last}`.trim();
  if (full) return full;
  return toString(row.name) || toString(row.companyName) || 'Unknown';
};

const extractId = (row: AnyRecord, fallback: string): string => {
  return (
    toString(row._id)
    || toString(row.id)
    || toString(row.publisherId)
    || toString(row.publicherId)
    || toString(row.advertiserId)
    || fallback
  );
};

const statusFromAny = (value: unknown): Contact['status'] => {
  const normalized = toString(value).toLowerCase();
  if (['active', 'approved', '1', 'true'].includes(normalized)) return 'active';
  if (['inactive', 'blocked', '0', 'false'].includes(normalized)) return 'inactive';
  return 'prospect';
};

const stageFromAny = (value: unknown): Deal['stage'] => {
  const normalized = toString(value).toLowerCase();
  if (normalized.includes('won') || normalized.includes('approved')) return 'closed_won';
  if (normalized.includes('lost') || normalized.includes('cancel') || normalized.includes('declined') || normalized.includes('inactive')) return 'closed_lost';
  if (normalized.includes('negoti')) return 'negotiation';
  if (normalized.includes('proposal')) return 'proposal';
  if (normalized.includes('qual')) return 'qualified';
  return 'lead';
};

const probabilityFromStage = (stage: Deal['stage']): number => {
  if (stage === 'closed_won') return 100;
  if (stage === 'closed_lost') return 0;
  if (stage === 'negotiation') return 75;
  if (stage === 'proposal') return 55;
  if (stage === 'qualified') return 35;
  return 20;
};

const activityStatusFromAny = (value: unknown): Activity['status'] => {
  const normalized = toString(value).toLowerCase();
  if (normalized.includes('approved') || normalized.includes('success') || normalized.includes('completed')) return 'completed';
  if (normalized.includes('pending')) return 'pending';
  if (normalized.includes('declined') || normalized.includes('failed') || normalized.includes('cancel') || normalized.includes('invalid')) return 'overdue';
  return 'pending';
};

const parseRecentDate = (row: AnyRecord): string => {
  const possible = [row.updatedAt, row.createdAt, row.date, row.lastContact, row.startDate, row.endDate];
  for (const value of possible) {
    const parsed = new Date(toString(value));
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
  }
  return new Date().toISOString();
};

export const hasAuthToken = () => Boolean(localStorage.getItem('repowire_token')?.trim());

const getPartnersId = () => localStorage.getItem('repowire_partners_id')?.trim() || '';

const withPartnersId = (query: Record<string, string | number>) => {
  const partnersId = getPartnersId();
  if (!partnersId) return query;
  return { ...query, partners_Id: partnersId };
};

export async function fetchLiveContacts(): Promise<Contact[]> {
  const [publishersRaw, advertisersRaw] = await Promise.all([
    apiRequest('/publicher/publisherList', { method: 'GET', query: withPartnersId({ page: 1, limit: 200 }) }),
    apiRequest('/advertiser/advertiserList', { method: 'GET', query: withPartnersId({ page: 1, limit: 200 }) }),
  ]);

  const publishers = extractList(publishersRaw).map((item, index) => {
    const row = asObject(item) ?? {};
    return {
      id: extractId(row, `pub-${index}`),
      name: extractName(row),
      email: toString(row.email) || 'N/A',
      phone: toString(row.mobileNumber) || toString(row.number) || 'N/A',
      company: toString(row.companyName) || toString(row.company) || 'Publisher',
      status: statusFromAny(row.status),
      value: toNumber(row.totalPayout) ?? toNumber(row.payout) ?? 0,
      lastContact: toDateKey(parseRecentDate(row)),
      avatar: (extractName(row).match(/\b\w/g)?.slice(0, 2).join('') ?? 'PU').toUpperCase(),
      tags: ['publisher'],
    } as Contact;
  });

  const advertisers = extractList(advertisersRaw).map((item, index) => {
    const row = asObject(item) ?? {};
    return {
      id: extractId(row, `adv-${index}`),
      name: extractName(row),
      email: toString(row.email) || 'N/A',
      phone: toString(row.mobileNumber) || toString(row.number) || 'N/A',
      company: toString(row.companyName) || toString(row.company) || 'Advertiser',
      status: statusFromAny(row.status),
      value: toNumber(row.totalRevenue) ?? toNumber(row.revenue) ?? 0,
      lastContact: toDateKey(parseRecentDate(row)),
      avatar: (extractName(row).match(/\b\w/g)?.slice(0, 2).join('') ?? 'AD').toUpperCase(),
      tags: ['advertiser'],
    } as Contact;
  });

  return [...publishers, ...advertisers];
}

export async function fetchLiveDeals(): Promise<Deal[]> {
  const raw = await apiRequest('/offer/offerList', {
    method: 'GET',
    query: { page: 1, limit: 200 },
  });

  return extractList(raw).map((item, index) => {
    const row = asObject(item) ?? {};
    const stage = stageFromAny(row.status ?? row.offerStatus ?? row.state);
    const createdAt = parseRecentDate(row);
    const closeDate = toDateKey(row.endDate || row.expiryDate || createdAt);

    return {
      id: extractId(row, `offer-${index}`),
      title: toString(row.title) || toString(row.offerName) || `Offer ${index + 1}`,
      contact: toString(row.managerName) || toString(row.advertiserName) || 'Repowire User',
      company: toString(row.companyName) || toString(row.advertiserName) || 'Repowire',
      value: toNumber(row.revenue) ?? toNumber(row.payout) ?? toNumber(row.amount) ?? 0,
      stage,
      probability: probabilityFromStage(stage),
      closeDate,
      assignee: toString(row.managerName) || 'Unassigned',
      createdAt: toDateKey(createdAt),
    } as Deal;
  });
}

export async function fetchLiveActivities(): Promise<Activity[]> {
  const [conversionsRaw, trackingRaw, sentRaw] = await Promise.all([
    apiRequest('/conversion/ConversionList', { method: 'GET', query: withPartnersId({ page: 1, limit: 100 }) }),
    apiRequest('/tracking/trackingList', { method: 'GET', query: withPartnersId({ page: 1, limit: 100 }) }),
    apiRequest('/sentLogs/sentLogList', { method: 'GET', query: withPartnersId({ page: 1, limit: 100 }) }),
  ]);

  const conversions = extractList(conversionsRaw).map((item, index) => {
    const row = asObject(item) ?? {};
    return {
      id: extractId(row, `conv-${index}`),
      type: 'task' as const,
      title: `Conversion ${toString(row.conversionId) || toString(row.click_id) || index + 1}`,
      contact: toString(row.publisherName) || 'Publisher',
      company: toString(row.offerName) || 'Offer',
      date: parseRecentDate(row),
      status: activityStatusFromAny(row.conversionStatus ?? row.status),
      assignee: toString(row.managerName) || 'System',
      notes: toString(row.message) || toString(row.remark) || 'Live conversion activity',
    } as Activity;
  });

  const tracking = extractList(trackingRaw).map((item, index) => {
    const row = asObject(item) ?? {};
    return {
      id: extractId(row, `track-${index}`),
      type: 'call' as const,
      title: `Tracking click ${toString(row.click_id) || index + 1}`,
      contact: toString(row.publisherName) || 'Publisher',
      company: toString(row.offerName) || 'Offer',
      date: parseRecentDate(row),
      status: 'pending' as const,
      assignee: toString(row.managerName) || 'System',
      notes: 'Live tracking event',
    } as Activity;
  });

  const sent = extractList(sentRaw).map((item, index) => {
    const row = asObject(item) ?? {};
    return {
      id: extractId(row, `sent-${index}`),
      type: 'email' as const,
      title: `Postback sent ${toString(row.offerId) || index + 1}`,
      contact: toString(row.publisherName) || 'Publisher',
      company: toString(row.offerName) || 'Offer',
      date: parseRecentDate(row),
      status: activityStatusFromAny(row.status),
      assignee: 'System',
      notes: toString(row.message) || 'Live sent log',
    } as Activity;
  });

  return [...conversions, ...tracking, ...sent]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 250);
}

export type LiveReportSnapshot = {
  totals: {
    won: number;
    lost: number;
    open: number;
    totalRevenue: number;
  };
  pipeline: Array<{ label: string; value: number; color: string }>;
  revenueSeries: Array<{ label: string; value: number; color: string }>;
  topRows: Array<{ name: string; value: number; source: string }>;
};

const palette = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4', '#8B5CF6'];

export async function fetchLiveReportSnapshot(): Promise<LiveReportSnapshot> {
  const [offers, topPublisherRaw, topOfferRaw, topAdvertiserRaw, totalsRaw] = await Promise.all([
    fetchLiveDeals(),
    apiRequest('/top/topPublisher', { method: 'GET', query: withPartnersId({}) }),
    apiRequest('/top/topOffer', { method: 'GET', query: withPartnersId({}) }),
    apiRequest('/top/topAdvertiser', { method: 'GET', query: withPartnersId({}) }),
    apiRequest('/conversion/totalRevenue', { method: 'GET', query: withPartnersId({}) }),
  ]);

  const won = offers.filter((row) => row.stage === 'closed_won').length;
  const lost = offers.filter((row) => row.stage === 'closed_lost').length;
  const open = offers.filter((row) => row.stage !== 'closed_won' && row.stage !== 'closed_lost').length;

  const totalRevenue = toNumber(totalsRaw) ?? toNumber(asObject(totalsRaw)?.totalRevenue) ?? offers.reduce((sum, row) => sum + row.value, 0);

  const pipelineMap = new Map<string, number>();
  offers.forEach((offer) => {
    const label = offer.stage.replace('_', ' ');
    pipelineMap.set(label, (pipelineMap.get(label) ?? 0) + offer.value);
  });

  const pipeline = Array.from(pipelineMap.entries()).map(([label, value], index) => ({
    label,
    value,
    color: palette[index % palette.length],
  }));

  const perDay = new Map<string, number>();
  offers.forEach((offer) => {
    const day = toDateKey(offer.createdAt);
    perDay.set(day, (perDay.get(day) ?? 0) + offer.value);
  });

  const revenueSeries = Array.from({ length: 7 }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const dayKey = toDateKey(date);
    return {
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: perDay.get(dayKey) ?? 0,
      color: '#3B82F6',
    };
  });

  const topRowsRaw = [
    ...extractList(topPublisherRaw).map((item) => ({ item, source: 'Publisher' })),
    ...extractList(topOfferRaw).map((item) => ({ item, source: 'Offer' })),
    ...extractList(topAdvertiserRaw).map((item) => ({ item, source: 'Advertiser' })),
  ];

  const topRows = topRowsRaw
    .map(({ item, source }, index) => {
      const row = asObject(item) ?? {};
      return {
        name: extractName(row) || toString(row.title) || `${source} ${index + 1}`,
        value: toNumber(row.revenue) ?? toNumber(row.payout) ?? toNumber(row.value) ?? 0,
        source,
      };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  return {
    totals: { won, lost, open, totalRevenue },
    pipeline,
    revenueSeries,
    topRows,
  };
}
