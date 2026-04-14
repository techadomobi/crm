import { repowireApi } from '../api/repowireApi';
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
    const response =
      scope === 'offerReport'
        ? await repowireApi.offerReport(query)
        : scope === 'publisherReport'
          ? await repowireApi.publisherReport(query)
          : scope === 'advertiserReport'
            ? await repowireApi.advertiserReport(query)
            : scope === 'publishersReport'
              ? await repowireApi.publishersReport(query)
              : scope === 'publisherManagerReport'
                ? await repowireApi.publisherManagerReport(query)
                : scope === 'affiliatesPerformanceReport'
                  ? await repowireApi.affiliatesPerformanceReport(query)
                  : await repowireApi.advertiserPerformanceReport(query);

    return asArray<Record<string, unknown>>(response);
  },
};
