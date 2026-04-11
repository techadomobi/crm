import { apiRequest, ApiError } from './httpClient';

export type SmokeStatus = 'pass' | 'fail' | 'warn';

export interface SmokeResult {
  name: string;
  endpoint: string;
  method: 'GET' | 'POST';
  status: SmokeStatus;
  detail: string;
}

type TestCase = {
  name: string;
  endpoint: string;
  method: 'GET' | 'POST';
  skipAuth?: boolean;
  query?: Record<string, string | number | boolean | null | undefined>;
  body?: Record<string, unknown>;
};

const buildTests = (): TestCase[] => {
  const partnersId = localStorage.getItem('repowire_partners_id')?.trim() || undefined;

  return [
    { name: 'Admin Login Endpoint', endpoint: '/admin/login', method: 'POST', skipAuth: true, body: { email: 'smoke@example.com', password: 'wrongpass' } },
    { name: 'SubAdmin Login Endpoint', endpoint: '/subAdmin/login', method: 'POST', skipAuth: true, body: { email: 'smoke@example.com', password: 'wrongpass' } },
    { name: 'Advertiser Login Endpoint', endpoint: '/advertiser/login', method: 'POST', skipAuth: true, body: { email: 'smoke@example.com', password: 'wrongpass' } },
    { name: 'Publisher Login Endpoint', endpoint: '/publicher/login', method: 'POST', skipAuth: true, body: { email: 'smoke@example.com', password: 'wrongpass' } },
    { name: 'Publisher List', endpoint: '/publicher/publisherList', method: 'GET', query: { page: 1, limit: 5, partners_Id: partnersId } },
    { name: 'Advertiser List', endpoint: '/advertiser/advertiserList', method: 'GET', query: { page: 1, limit: 5, partners_Id: partnersId } },
    { name: 'Offer List', endpoint: '/offer/offerList', method: 'GET', query: { page: 1, limit: 5 } },
    { name: 'Conversion List', endpoint: '/conversion/ConversionList', method: 'GET', query: { page: 1, limit: 5, partners_Id: partnersId } },
    { name: 'Sent Logs', endpoint: '/sentLogs/sentLogList', method: 'GET', query: { page: 1, limit: 5, partners_Id: partnersId } },
    { name: 'Top Publisher', endpoint: '/top/topPublisher', method: 'GET', query: { partners_Id: partnersId } },
    { name: 'Top Offer', endpoint: '/top/topOffer', method: 'GET', query: { partners_Id: partnersId } },
    { name: 'Top Advertiser', endpoint: '/top/topAdvertiser', method: 'GET', query: { partners_Id: partnersId } },
    { name: 'Total Revenue', endpoint: '/conversion/totalRevenue', method: 'GET', query: { partners_Id: partnersId } },
    { name: 'Country List', endpoint: '/user/countrylist', method: 'GET' },
    { name: 'Notification API', endpoint: '/admin/notificationApi', method: 'GET' },
    { name: 'Plan List', endpoint: '/admin/planList', method: 'GET' },
  ];
};

const getStatusFromHttp = (status: number): SmokeStatus => {
  if (status >= 200 && status < 300) return 'pass';
  if (status === 401 || status === 403) return 'warn';
  return 'fail';
};

export async function runSmokeTests(): Promise<SmokeResult[]> {
  const tests = buildTests();
  const results = await Promise.all(
    tests.map(async (test): Promise<SmokeResult> => {
      try {
        await apiRequest(test.endpoint, {
          method: test.method,
          query: test.query,
          body: test.body,
          asFormData: test.method === 'POST',
          skipAuth: test.skipAuth,
        });

        return {
          name: test.name,
          endpoint: test.endpoint,
          method: test.method,
          status: 'pass',
          detail: 'HTTP 2xx',
        };
      } catch (error) {
        if (error instanceof ApiError) {
          return {
            name: test.name,
            endpoint: test.endpoint,
            method: test.method,
            status: getStatusFromHttp(error.status),
            detail: `HTTP ${error.status}`,
          };
        }

        return {
          name: test.name,
          endpoint: test.endpoint,
          method: test.method,
          status: 'fail',
          detail: 'Network/Error',
        };
      }
    })
  );

  return results;
}
