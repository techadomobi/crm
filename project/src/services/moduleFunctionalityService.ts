import { ApiError, apiRequest, type RequestMethod } from '../api/httpClient';
import { NavPage } from '../types';

export type ModuleCheckStatus = 'pass' | 'warn' | 'fail';

export interface ModuleCheckResult {
  key: string;
  title: string;
  status: ModuleCheckStatus;
  detail: string;
}

type ModuleCheck = {
  key: string;
  title: string;
  path: string;
  method: RequestMethod;
  query?: Record<string, string | number | boolean | null | undefined>;
};

const today = () => new Date().toISOString().slice(0, 10);
const weekAgo = () => {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  return d.toISOString().slice(0, 10);
};

const partnersId = () =>
  (localStorage.getItem('repowire_partners_id')
    ?? localStorage.getItem('repowire_partners_Id')
    ?? localStorage.getItem('partners_Id')
    ?? '')
    .trim();

const checksByPage: Partial<Record<NavPage, ModuleCheck[]>> = {
  publishersManage: [
    { key: 'mgr-overview', title: 'Manager Directory Access', path: '/manager/managerCommonList', method: 'GET' },
    { key: 'mgr-top', title: 'Top Manager Metrics', path: '/top/topManager', method: 'GET', query: { partners_Id: partnersId() || undefined } },
    {
      key: 'mgr-report',
      title: 'Manager Performance Report',
      path: '/report/publisherManagerReport',
      method: 'GET',
      query: { partners_Id: partnersId() || undefined, startDate: weekAgo(), endDate: today() },
    },
  ],
  advertisers: [
    { key: 'adv-list', title: 'Advertiser Directory', path: '/advertiser/advertiserList', method: 'GET', query: { page: 1, limit: 5, partners_Id: partnersId() || undefined } },
    {
      key: 'adv-report',
      title: 'Advertiser Revenue Report',
      path: '/report/advertiserReport',
      method: 'GET',
      query: { partners_Id: partnersId() || undefined, startDate: weekAgo(), endDate: today() },
    },
    { key: 'adv-top', title: 'Top Advertiser Signals', path: '/top/topAdvertiser', method: 'GET', query: { partners_Id: partnersId() || undefined } },
  ],
  integration: [
    { key: 'int-external', title: 'External Offer Sync', path: '/offer/getExternalOfferLst', method: 'GET' },
    { key: 'int-testing', title: 'Tracking Test Harness', path: '/subAdmin/trackingTesting', method: 'GET' },
    { key: 'int-export', title: 'Export Queue Access', path: '/api/getExportStatus', method: 'GET' },
  ],
};

const mapStatus = (status: number): ModuleCheckStatus => {
  if (status >= 200 && status < 300) return 'pass';
  if (status === 400 || status === 401 || status === 403 || status === 404 || status === 409 || status === 422) return 'warn';
  return 'fail';
};

export const getModuleChecks = (page: NavPage): ModuleCheck[] => checksByPage[page] ?? [];

export async function runModuleFunctionalityChecks(page: NavPage): Promise<ModuleCheckResult[]> {
  const checks = getModuleChecks(page);

  const results = await Promise.all(
    checks.map(async (check): Promise<ModuleCheckResult> => {
      try {
        await apiRequest(check.path, {
          method: check.method,
          query: check.query,
        });
        return {
          key: check.key,
          title: check.title,
          status: 'pass',
          detail: 'Operational',
        };
      } catch (error) {
        if (error instanceof ApiError) {
          return {
            key: check.key,
            title: check.title,
            status: mapStatus(error.status),
            detail: `HTTP ${error.status}`,
          };
        }

        return {
          key: check.key,
          title: check.title,
          status: 'fail',
          detail: 'Network error',
        };
      }
    })
  );

  return results;
}
