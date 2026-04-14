import { apiRequest } from '../api/httpClient';
import { asArray } from './utils';

export type AnalyticsTab = 'conversion' | 'click' | 'errorLogs' | 'eventLogs' | 'pixelLogs' | 'sentLogs';
export type PerformanceTab = 'generalReport' | 'affiliatesReport' | 'eventReport';

export interface ConsoleQuery {
  partners_Id?: string;
  startDate: string;
  endDate: string;
  page?: number;
  limit?: number;
  search?: string;
  searchBy?: string;
}

const toErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  if (!error || typeof error !== 'object') return 'Unknown API error';
  const obj = error as Record<string, unknown>;
  return String(obj.message ?? obj.error ?? obj.responseMessage ?? 'Unknown API error');
};

const looksLikeErrorPayload = (payload: unknown) => {
  if (!payload || typeof payload !== 'object') return false;
  const obj = payload as Record<string, unknown>;
  const code = Number(obj.responseCode ?? obj.statusCode ?? obj.status ?? 0);
  const message = String(obj.message ?? obj.error ?? obj.msg ?? obj.responseMessage ?? '').toLowerCase();
  return code >= 400 || message.includes('internal server error') || message.includes('failed') || message.includes('unauthorized');
};

const normalizeRows = (payload: unknown) => {
  if (looksLikeErrorPayload(payload)) return [] as Record<string, unknown>[];
  return asArray<Record<string, unknown>>(payload);
};

const endpointPriority: Record<AnalyticsTab | PerformanceTab, string[]> = {
  conversion: ['/conversion/ConversionList', '/report/advertiserPerformanceReport', '/report/offerReport'],
  click: ['/tracking/trackingList', '/report/publisherReport', '/report/offerReport'],
  errorLogs: ['/errorLogs/errorLogList', '/sentLogs/sentLogList', '/conversion/postbackLogs'],
  eventLogs: ['/eventLogs/eventLogList', '/tracking/trackingList', '/conversion/ConversionList'],
  pixelLogs: ['/pixelLogs/pixelLogList', '/conversion/postbackLogs', '/sentLogs/sentLogList'],
  sentLogs: ['/sentLogs/sentLogList', '/conversion/postbackLogs', '/conversion/ConversionList'],
  generalReport: ['/report/offerReport', '/report/publisherReport', '/report/advertiserReport'],
  affiliatesReport: ['/report/AffilitesPerformanceReport', '/report/publishersReport', '/report/publisherReport'],
  eventReport: ['/conversion/ConversionList', '/tracking/trackingList', '/report/offerReport'],
};

const buildQuery = (query: ConsoleQuery) => ({
  partners_Id: query.partners_Id,
  startDate: query.startDate,
  endDate: query.endDate,
  page: query.page ?? 1,
  limit: query.limit ?? 100,
  search: query.search?.trim() || undefined,
  searchBy: query.searchBy?.trim() || undefined,
});

const readPartnersId = () =>
  (localStorage.getItem('repowire_partners_id')
    ?? localStorage.getItem('repowire_partners_Id')
    ?? localStorage.getItem('partners_Id')
    ?? '').trim();

const buildEndpointQuery = (endpoint: string, query: ConsoleQuery) => {
  const partners_Id = query.partners_Id ?? (readPartnersId() || undefined);
  const base = buildQuery({ ...query, partners_Id });

  if (endpoint === '/report/AffilitesPerformanceReport') {
    return {
      partners_Id: base.partners_Id,
      page: base.page,
      startDate: base.startDate,
      endDate: base.endDate,
      search: base.search,
    };
  }

  if (endpoint === '/report/publishersReport') {
    return {
      partners_Id: base.partners_Id,
      publisherId: query.searchBy?.trim() || undefined,
      page: base.page,
      startDate: base.startDate,
      endDate: base.endDate,
      search: base.search,
    };
  }

  if (endpoint === '/report/publisherReport') {
    return {
      partners_Id: base.partners_Id,
      page: base.page,
      startDate: base.startDate,
      endDate: base.endDate,
      search: base.search,
    };
  }

  if (endpoint === '/report/advertiserPerformanceReport') {
    return {
      partners_Id: base.partners_Id,
      advertiser_id: query.searchBy?.trim() || undefined,
      page: base.page,
      startDate: base.startDate,
      endDate: base.endDate,
      search: base.search,
    };
  }

  return base;
};

const loadFromEndpoints = async (endpoints: string[], query: ConsoleQuery) => {
  let lastError: unknown = null;

  for (const endpoint of endpoints) {
    try {
      const requestQuery = buildEndpointQuery(endpoint, query);
      const payload = await apiRequest(endpoint, {
        method: 'GET',
        query: requestQuery,
      });
      const rows = normalizeRows(payload);
      if (rows.length > 0) {
        return { rows, endpoint };
      }
    } catch (error) {
      lastError = error;
    }
  }

  if (lastError) {
    throw new Error(toErrorMessage(lastError));
  }

  throw new Error('No rows returned by live API endpoints for selected filters.');
};

export const reportingConsoleService = {
  analytics: (tab: AnalyticsTab, query: ConsoleQuery) => loadFromEndpoints(endpointPriority[tab], query),
  performance: (tab: PerformanceTab, query: ConsoleQuery) => loadFromEndpoints(endpointPriority[tab], query),
};

export const toCsv = (rows: Record<string, unknown>[]) => {
  if (!rows.length) return '';
  const columns = Object.keys(rows[0]);
  const header = columns.join(',');
  const body = rows
    .map((row) => columns.map((col) => {
      const value = String(row[col] ?? '');
      const escaped = value.replace(/"/g, '""');
      return `"${escaped}"`;
    }).join(','))
    .join('\n');

  return `${header}\n${body}`;
};
