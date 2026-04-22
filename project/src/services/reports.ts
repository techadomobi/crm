import { repowireApi } from '../api/repowireApi';
import type { ConversionListQuery } from '../api/repowireApi';
import { asArray } from './utils';

export type ReportScope =
  | 'summary'
  | 'offerReport'
  | 'publisherReport'
  | 'advertiserReport'
  | 'publishersReport'
  | 'publisherManagerReport'
  | 'affiliatesPerformanceReport'
  | 'advertiserPerformanceReport';

export type ReportQuery = {
  partners_Id?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  search?: string;
  searchBy?: string;
  publisherId?: string;
  advertiserId?: string;
  advertiser_id?: string;
  publisherManagerId?: string;
  limit?: number;
};

export const reportScopeMeta: Record<Exclude<ReportScope, 'summary'>, { label: string; endpoint: string; description: string }> = {
  offerReport: {
    label: 'Campaigns Report',
    endpoint: '/report/offerReport',
    description: 'Campaign-level report rows from the live API.',
  },
  publisherReport: {
    label: 'Publisher Report',
    endpoint: '/report/publisherReport',
    description: 'Publisher activity summary and rows.',
  },
  advertiserReport: {
    label: 'Advertiser Report',
    endpoint: '/report/advertiserReport',
    description: 'Advertiser activity summary and rows.',
  },
  publishersReport: {
    label: 'Publishers Report',
    endpoint: '/report/publishersReport',
    description: 'Publisher-specific report rows for a selected publisherId.',
  },
  publisherManagerReport: {
    label: 'Publisher Manager Report',
    endpoint: '/report/publisherManagerReport',
    description: 'Manager-level publisher report rows.',
  },
  affiliatesPerformanceReport: {
    label: 'Affiliates Performance',
    endpoint: '/report/AffilitesPerformanceReport',
    description: 'Paged affiliate performance report rows.',
  },
  advertiserPerformanceReport: {
    label: 'Advertiser Performance',
    endpoint: '/report/advertiserPerformanceReport',
    description: 'Advertiser performance report rows.',
  },
};

export const reportScopeOptions: Array<Exclude<ReportScope, 'summary'>> = [
  'offerReport',
  'publisherReport',
  'advertiserReport',
  'publishersReport',
  'publisherManagerReport',
  'affiliatesPerformanceReport',
  'advertiserPerformanceReport',
];

export const reportsService = {
  async list(scope: Exclude<ReportScope, 'summary'>, query: ReportQuery = {}) {
    const looksLikeErrorPayload = (payload: unknown) => {
      if (!payload || typeof payload !== 'object') return false;
      const obj = payload as Record<string, unknown>;
      const responseCode = typeof obj.responseCode === 'number' ? obj.responseCode : Number(obj.responseCode ?? 0);
      const statusCode = typeof obj.statusCode === 'number' ? obj.statusCode : Number(obj.statusCode ?? 0);
      const message = String(obj.message ?? obj.error ?? obj.msg ?? obj.responseMessage ?? '').toLowerCase();
      if (responseCode >= 400 || statusCode >= 400) return true;
      return (
        message.includes('internal server error')
        || message.includes('unauthorized')
        || message.includes('forbidden')
        || message.includes('invalid')
        || message.includes('failed')
      );
    };

    const parseRows = (payload: unknown) => {
      if (looksLikeErrorPayload(payload)) return [] as Record<string, unknown>[];
      return asArray<Record<string, unknown>>(payload);
    };

    const normalizedSearchBy = (() => {
      const raw = (query.searchBy ?? '').trim();
      if (!raw) return undefined;
      const lowered = raw.toLowerCase();
      if (lowered === 'offerid') return 'offerid';
      if (lowered === 'publisherid') return 'publisherId';
      if (lowered === 'advertiserid') return 'advertiserId';
      if (lowered === 'clickid') return 'clickId';
      return undefined;
    })();

    const conversionFallbackQuery: ConversionListQuery = {
      page: query.page ?? 1,
      limit: query.limit ?? 200,
      startDate: query.startDate,
      endDate: query.endDate,
      search: query.search,
      searchBy: normalizedSearchBy,
    };

    const primaryCall = async () => {
      if (scope === 'offerReport') return repowireApi.offerReport(query);
      if (scope === 'publisherReport') return repowireApi.publisherReport(query);
      if (scope === 'advertiserReport') return repowireApi.advertiserReport(query);
      if (scope === 'publishersReport') return repowireApi.publishersReport(query);
      if (scope === 'publisherManagerReport') return repowireApi.publisherManagerReport(query);
      if (scope === 'affiliatesPerformanceReport') return repowireApi.affiliatesPerformanceReport(query);
      return repowireApi.advertiserPerformanceReport(query);
    };

    const fallbackCalls: Array<() => Promise<unknown>> = [
      () => repowireApi.offerReport(query),
      () => repowireApi.publisherReport(query),
      () => repowireApi.advertiserReport(query),
      () => repowireApi.conversionList(conversionFallbackQuery),
      () => repowireApi.campaignList({
        page: query.page,
        search: query.search,
        partners_Id: query.partners_Id,
      }),
    ];

    const dedupe = new Set<string>();
    const calls = [primaryCall, ...fallbackCalls].filter((call) => {
      const key = call.toString();
      if (dedupe.has(key)) return false;
      dedupe.add(key);
      return true;
    });

    let lastError: unknown = null;
    for (const call of calls) {
      try {
        const response = await call();
        const rows = parseRows(response);
        if (rows.length > 0) {
          return rows;
        }
      } catch (error) {
        lastError = error;
      }
    }

    if (lastError instanceof Error) {
      throw lastError;
    }

    throw new Error('No report rows were returned by any live endpoint for this view.');
  },
};
