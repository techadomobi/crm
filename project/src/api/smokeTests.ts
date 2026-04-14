import { apiRequest, ApiError, type RequestMethod } from './httpClient';
import { hasAuthToken } from './liveDataAdapters';
import { defaultSkipAuthForPath, flattenSwaggerOperations, type SwaggerOperation } from '../lib/offersmetaSwagger';
import { loadSwaggerSpec } from '../services/swaggerSpecService';

export type SmokeStatus = 'pass' | 'fail' | 'warn' | 'skip';

export interface SmokeResult {
  name: string;
  endpoint: string;
  method: RequestMethod;
  status: SmokeStatus;
  detail: string;
}

export interface SmokeReport {
  results: SmokeResult[];
  catalogTotal: number;
  executedTotal: number;
  skippedTotal: number;
  source: 'swagger' | 'core' | 'core-fallback';
  sourceUrl?: string;
  fallbackReason?: string;
}

type TestCase = {
  name: string;
  endpoint: string;
  method: RequestMethod;
  executable?: boolean;
  skipReason?: string;
  skipAuth?: boolean;
  asUrlEncoded?: boolean;
  asFormData?: boolean;
  query?: Record<string, string | number | boolean | null | undefined>;
  body?: Record<string, unknown>;
  expectedStatuses?: number[];
};

interface SmokeTestOptions {
  scope?: 'all' | 'core';
  includeMutations?: boolean;
  allowCoreFallback?: boolean;
  onProgress?: (progress: {
    results: SmokeResult[];
    catalogTotal: number;
    executedTotal: number;
    skippedTotal: number;
  }) => void;
}

const MAX_CONCURRENCY = 12;
const SAMPLE_START_DATE = '2026-01-01';
const SAMPLE_END_DATE = '2026-01-31';

const buildCoreTests = (): TestCase[] => {
  const partnersId = localStorage.getItem('repowire_partners_id')?.trim() || undefined;
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);
  const toIsoDate = (value: Date) => value.toISOString().slice(0, 10);

  return [
    {
      name: 'Admin Login Endpoint',
      endpoint: '/admin/login',
      method: 'POST',
      skipAuth: true,
      asUrlEncoded: true,
      expectedStatuses: [400, 401, 403],
      body: { email: 'smoke@example.com', password: 'wrongpass' },
    },
    {
      name: 'SubAdmin Login Endpoint',
      endpoint: '/subAdmin/login',
      method: 'POST',
      skipAuth: true,
      asUrlEncoded: true,
      expectedStatuses: [400, 401, 403],
      body: { email: 'smoke@example.com', password: 'wrongpass' },
    },
    {
      name: 'Advertiser Login Endpoint',
      endpoint: '/advertiser/login',
      method: 'POST',
      skipAuth: true,
      asUrlEncoded: true,
      expectedStatuses: [400, 401, 403],
      body: { email: 'smoke@example.com', password: 'wrongpass' },
    },
    {
      name: 'Publisher Login Endpoint',
      endpoint: '/publicher/login',
      method: 'POST',
      skipAuth: true,
      asUrlEncoded: true,
      expectedStatuses: [400, 401, 403],
      body: { email: 'smoke@example.com', password: 'wrongpass' },
    },
    { name: 'Publisher List', endpoint: '/publicher/publisherList', method: 'GET', query: { page: 1, limit: 5, partners_Id: partnersId } },
    { name: 'Advertiser List', endpoint: '/advertiser/advertiserList', method: 'GET', query: { page: 1, limit: 5, partners_Id: partnersId } },
    { name: 'Offer List', endpoint: '/offer/offerList', method: 'GET', query: { page: 1, limit: 5 } },
    { name: 'Campaign List', endpoint: '/offer/allOfferList', method: 'GET', query: { partners_Id: partnersId } },
    { name: 'Conversion List', endpoint: '/conversion/ConversionList', method: 'GET', query: { page: 1, limit: 5, partners_Id: partnersId } },
    { name: 'Sent Logs', endpoint: '/sentLogs/sentLogList', method: 'GET', query: { page: 1, limit: 5, partners_Id: partnersId } },
    { name: 'Top Publisher', endpoint: '/top/topPublisher', method: 'GET', query: { partners_Id: partnersId } },
    { name: 'Top Offer', endpoint: '/top/topOffer', method: 'GET', query: { partners_Id: partnersId } },
    { name: 'Top Advertiser', endpoint: '/top/topAdvertiser', method: 'GET', query: { partners_Id: partnersId } },
    { name: 'Total Revenue', endpoint: '/conversion/totalRevenue', method: 'GET', query: { partners_Id: partnersId } },
    { name: 'Offer Report', endpoint: '/report/offerReport', method: 'GET', query: { partners_Id: partnersId, startDate: toIsoDate(startDate), endDate: toIsoDate(endDate) } },
    { name: 'Publisher Report', endpoint: '/report/publisherReport', method: 'GET', query: { partners_Id: partnersId, startDate: toIsoDate(startDate), endDate: toIsoDate(endDate) } },
    { name: 'Advertiser Report', endpoint: '/report/advertiserReport', method: 'GET', query: { partners_Id: partnersId, startDate: toIsoDate(startDate), endDate: toIsoDate(endDate) } },
    { name: 'Country List', endpoint: '/user/countrylist', method: 'GET' },
    { name: 'Notification API', endpoint: '/admin/notificationApi', method: 'GET' },
    { name: 'Plan List', endpoint: '/admin/planList', method: 'GET' },
  ];
};

const getStatusFromHttp = (status: number): SmokeStatus => {
  if (status >= 200 && status < 300) return 'pass';
  if (status === 401 || status === 403) return 'warn';
  if (status === 400 || status === 404 || status === 409 || status === 422 || status === 429) return 'warn';
  if (status === 0 || status === 405 || status >= 500) return 'fail';
  if (status >= 400) return 'warn';
  return 'fail';
};

const sampleByName = (name: string): string => {
  const normalized = name.toLowerCase();
  if (normalized.includes('email')) return 'smoke@example.com';
  if (normalized.includes('password')) return 'wrongpass';
  if (normalized.includes('token')) return 'smoke-token';
  if (normalized.includes('otp')) return '000000';
  if (normalized.includes('partners_id') || normalized.includes('partnersid')) {
    return localStorage.getItem('repowire_partners_id')?.trim() || '1';
  }
  if (normalized.includes('startdate')) return SAMPLE_START_DATE;
  if (normalized.includes('enddate')) return SAMPLE_END_DATE;
  if (normalized.includes('page')) return '1';
  if (normalized.includes('limit')) return '5';
  if (normalized.includes('id')) return '1';
  return 'smoke';
};

const resolveEndpointPath = (path: string): string => path.replace(/\{[^/}]+\}/g, '1');

const buildQueryFromOperation = (op: SwaggerOperation): Record<string, string | number | boolean | null | undefined> => {
  const query: Record<string, string | number | boolean | null | undefined> = {};
  for (const parameter of op.parameters) {
    if (parameter.in !== 'query') continue;
    if (!parameter.required && parameter.name !== 'partners_Id' && parameter.name !== 'page' && parameter.name !== 'limit') {
      continue;
    }
    const value = sampleByName(parameter.name);
    if (parameter.type?.toLowerCase() === 'boolean') {
      query[parameter.name] = false;
      continue;
    }
    const numberValue = Number(value);
    if ((parameter.type?.toLowerCase() === 'number' || parameter.type?.toLowerCase() === 'integer') && Number.isFinite(numberValue)) {
      query[parameter.name] = numberValue;
      continue;
    }
    query[parameter.name] = value;
  }
  return query;
};

const buildBodyFromOperation = (op: SwaggerOperation): Record<string, unknown> | undefined => {
  if (op.method === 'GET' || op.method === 'DELETE') return undefined;

  const formDataParams = op.parameters.filter((parameter) => parameter.in === 'formData');
  if (formDataParams.length > 0) {
    const payload: Record<string, unknown> = {};
    for (const parameter of formDataParams) {
      if (!parameter.required && parameter.name !== 'partners_Id') continue;
      if (parameter.type?.toLowerCase() === 'boolean') {
        payload[parameter.name] = false;
      } else {
        payload[parameter.name] = sampleByName(parameter.name);
      }
    }
    return payload;
  }

  const hasBody = op.parameters.some((parameter) => parameter.in === 'body');
  if (!hasBody) return undefined;

  const payload: Record<string, unknown> = {};
  if (/\/(login|signup|singleLogin)$/i.test(op.path)) {
    payload.email = 'smoke@example.com';
    payload.password = 'wrongpass';
  }

  if (payload.partners_Id === undefined) {
    const partners = localStorage.getItem('repowire_partners_id')?.trim();
    if (partners) payload.partners_Id = partners;
  }

  return payload;
};

const testNameFromOperation = (op: SwaggerOperation): string => {
  if (op.summary && op.summary.trim()) return op.summary.trim();
  const tag = op.tags[0] ?? 'API';
  return `${tag} ${op.method} ${op.path}`;
};

const buildTestsFromSwagger = async (includeMutations: boolean): Promise<{ tests: TestCase[]; sourceUrl: string; catalogTotal: number }> => {
  const { spec, sourceUrl } = await loadSwaggerSpec();
  const operations = flattenSwaggerOperations(spec);
  const tests: TestCase[] = [];
  const authConfigured = hasAuthToken();

  for (const op of operations) {
    const isAuthEndpoint = /\/(login|signup|singleLogin)$/i.test(op.path);
    const isReadOnly = op.method === 'GET';
    const canExecute = includeMutations ? true : (isReadOnly || isAuthEndpoint);
    const protectedEndpoint = op.secured && !defaultSkipAuthForPath(op.path) && !isAuthEndpoint;

    if (!canExecute) {
      tests.push({
        name: testNameFromOperation(op),
        endpoint: resolveEndpointPath(op.path),
        method: op.method,
        executable: false,
        skipReason: 'Skipped write endpoint (enable "Include write endpoints" to execute).',
      });
      continue;
    }

    if (protectedEndpoint && !authConfigured) {
      tests.push({
        name: testNameFromOperation(op),
        endpoint: resolveEndpointPath(op.path),
        method: op.method,
        executable: false,
        skipReason: 'Skipped protected endpoint because no bearer token is configured.',
      });
      continue;
    }

    const body = buildBodyFromOperation(op);
    const hasFormData = op.parameters.some((parameter) => parameter.in === 'formData');

    tests.push({
      name: testNameFromOperation(op),
      endpoint: resolveEndpointPath(op.path),
      method: op.method,
      executable: true,
      skipAuth: defaultSkipAuthForPath(op.path),
      asUrlEncoded: isAuthEndpoint,
      asFormData: hasFormData,
      query: buildQueryFromOperation(op),
      body,
      expectedStatuses: isAuthEndpoint ? [400, 401, 403] : undefined,
    });
  }

  return {
    tests,
    sourceUrl,
    catalogTotal: operations.length,
  };
};

const runOneSmokeTest = async (test: TestCase): Promise<SmokeResult> => {
  if (test.executable === false) {
    return {
      name: test.name,
      endpoint: test.endpoint,
      method: test.method,
      status: 'skip',
      detail: test.skipReason ?? 'Skipped',
    };
  }

  try {
    await apiRequest(test.endpoint, {
      method: test.method,
      query: test.query,
      body: test.body,
      asFormData: Boolean(test.asFormData),
      asUrlEncoded: Boolean(test.asUrlEncoded),
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
      const errorMeta = (error.data && typeof error.data === 'object') ? (error.data as Record<string, unknown>) : null;
      const errorUrl = typeof errorMeta?.url === 'string' ? errorMeta.url : '';
      const errorPath = typeof errorMeta?.path === 'string' ? errorMeta.path : '';
      const detailSuffix = [errorPath ? `path=${errorPath}` : '', errorUrl ? `url=${errorUrl}` : ''].filter(Boolean).join(' ');

      if (test.expectedStatuses?.includes(error.status)) {
        return {
          name: test.name,
          endpoint: test.endpoint,
          method: test.method,
          status: 'pass',
          detail: `HTTP ${error.status} (expected)${detailSuffix ? ` ${detailSuffix}` : ''}`,
        };
      }

      const detail = error.status === 0
        ? `Network/Error: ${error.message}${detailSuffix ? ` ${detailSuffix}` : ''}`
        : `HTTP ${error.status}${detailSuffix ? ` ${detailSuffix}` : ''}`;

      return {
        name: test.name,
        endpoint: test.endpoint,
        method: test.method,
        status: getStatusFromHttp(error.status),
        detail,
      };
    }

    return {
      name: test.name,
      endpoint: test.endpoint,
      method: test.method,
      status: 'fail',
      detail: error instanceof Error ? `Network/Error: ${error.message}` : 'Network/Error',
    };
  }
};

const runTestsInBatches = async (
  tests: TestCase[],
  onProgress?: SmokeTestOptions['onProgress'],
  catalogTotal = 0
): Promise<SmokeResult[]> => {
  const results: SmokeResult[] = [];
  for (let index = 0; index < tests.length; index += MAX_CONCURRENCY) {
    const batch = tests.slice(index, index + MAX_CONCURRENCY);
    const batchResults = await Promise.all(batch.map((test) => runOneSmokeTest(test)));
    results.push(...batchResults);

    if (onProgress) {
      const skippedTotal = results.filter((row) => row.status === 'skip').length;
      onProgress({
        results: [...results],
        catalogTotal,
        executedTotal: results.length - skippedTotal,
        skippedTotal,
      });
    }
  }
  return results;
};

const dedupeTests = (tests: TestCase[]): TestCase[] => {
  const seen = new Set<string>();
  const unique: TestCase[] = [];
  for (const test of tests) {
    const key = `${test.method}:${test.endpoint}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(test);
  }
  return unique;
};

export async function runSmokeTests(options: SmokeTestOptions = {}): Promise<SmokeResult[]> {
  const report = await runSmokeTestsReport(options);
  return report.results;
}

export async function runSmokeTestsReport(options: SmokeTestOptions = {}): Promise<SmokeReport> {
  const scope = options.scope ?? 'all';
  const includeMutations = options.includeMutations ?? false;
  const allowCoreFallback = options.allowCoreFallback ?? false;
  const onProgress = options.onProgress;

  let tests: TestCase[];
  let source: SmokeReport['source'] = 'core';
  let sourceUrl: string | undefined;
  let fallbackReason: string | undefined;
  let catalogTotal = 0;

  if (scope === 'core') {
    tests = buildCoreTests();
    source = 'core';
    catalogTotal = tests.length;
  } else {
    try {
      const swagger = await buildTestsFromSwagger(includeMutations);
      tests = swagger.tests;
      source = 'swagger';
      sourceUrl = swagger.sourceUrl;
      catalogTotal = swagger.catalogTotal;
    } catch (error) {
      source = 'core-fallback';
      fallbackReason = error instanceof Error ? error.message : 'Unable to load swagger catalog';

      if (allowCoreFallback) {
        tests = buildCoreTests();
        catalogTotal = tests.length;
      } else {
        tests = [];
        catalogTotal = 0;
      }
    }
  }

  const dedupedTests = dedupeTests(tests);
  if (onProgress) {
    onProgress({
      results: [],
      catalogTotal,
      executedTotal: 0,
      skippedTotal: 0,
    });
  }

  const results = await runTestsInBatches(dedupedTests, onProgress, catalogTotal);
  const skippedTotal = results.filter((row) => row.status === 'skip').length;

  return {
    results,
    catalogTotal,
    executedTotal: results.length - skippedTotal,
    skippedTotal,
    source,
    sourceUrl,
    fallbackReason,
  };
}
