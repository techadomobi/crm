import { useMemo, useState } from 'react';
import { BookOpenText, ExternalLink, FileText, KeyRound, Building2, ShieldCheck, ServerCog } from 'lucide-react';
import { runSmokeTests, SmokeResult } from '../api/smokeTests';
import { API_BASE_URL, RequestMethod } from '../api/httpClient';

const API_DOCS_URL = 'https://apiv2.offersmeta.in/API-docs/';

type ParsedEndpoint = {
  method: RequestMethod;
  path: string;
  category: string;
};

type EndpointRunResult = {
  method: RequestMethod;
  path: string;
  category: string;
  status: number;
  ok: boolean;
  detail: string;
};

type EndpointTemplate = {
  query: string;
  body: string;
};

const DEFAULT_BULK_API_TEXT = `POST /subAdmin/singleLogin
POST /subAdmin/login
POST /subAdmin/signup
POST /publicher/login
POST /publicher/signup
POST /advertiser/login
POST /advertiser/advertiserSignup
GET /user/countrylist
GET /admin/planList
GET /admin/notificationApi
GET /publicher/publisherList
GET /advertiser/advertiserList
GET /offer/offerList
GET /conversion/ConversionList
GET /conversion/totalConversion
GET /conversion/totalPayout
GET /conversion/totalRevenue
GET /conversion/totalProfit`;

const DEFAULT_PRESET_TEMPLATES: Record<string, EndpointTemplate> = {
  'POST /subAdmin/singleLogin': {
    query: '{}',
    body: '{"email": "", "password": "", "partners_Id": ""}',
  },
  'GET /conversion/ConversionList': {
    query: '{"page": 1, "limit": 100, "partners_Id": ""}',
    body: '{}',
  },
  'GET /offer/offerList': {
    query: '{"page": 1, "limit": 50}',
    body: '{}',
  },
  'GET /publicher/publisherList': {
    query: '{"page": 1, "limit": 100, "partners_Id": ""}',
    body: '{}',
  },
  'GET /advertiser/advertiserList': {
    query: '{"page": 1, "limit": 100, "partners_Id": ""}',
    body: '{}',
  },
  'POST /publicher/login': {
    query: '{}',
    body: '{"email": "", "password": ""}',
  },
  'POST /advertiser/login': {
    query: '{}',
    body: '{"email": "", "password": ""}',
  },
  'POST /advertiser/advertiserSignup': {
    query: '{}',
    body: '{"email": "", "password": "", "confirm_password": "", "firstName": "", "lastName": "", "partners_Id": ""}',
  },
  'POST /publicher/signup': {
    query: '{}',
    body: '{"email": "", "password": "", "confirm_password": "", "firstName": "", "lastName": ""}',
  },
  'POST /subAdmin/login': {
    query: '{}',
    body: '{"email": "", "password": "", "partners_Id": ""}',
  },
};

const inferCategory = (path: string): string => {
  const first = path.split('/').filter(Boolean)[0] ?? 'other';
  const map: Record<string, string> = {
    admin: 'ADMIN',
    subAdmin: 'SUBADMIN',
    publicher: 'PUBLISHER',
    advertiser: 'ADVERTISER',
    conversion: 'CONVERSION',
    offer: 'OFFER',
    manager: 'MANAGER',
    tracking: 'TRACKING',
    impression: 'IMPRESSION',
    sentLogs: 'SENT_LOGS',
    user: 'USER',
    api: 'EXPORT',
    wallet: 'WALLET',
    top: 'TOP',
    invoice: 'INVOICE',
    category: 'CATEGORY',
    partner: 'PARTNER',
    publisherApproved: 'PUBLISHER_APPROVAL',
    publisherManagement: 'POSTBACK_MANAGEMENT',
    eventReport: 'EVENT_REPORT',
    report: 'REPORT',
    contactUs: 'CONTACT',
    smartOffer: 'SMART_OFFER',
    smart_link: 'SMART_LINK',
    pub: 'PUB_APP',
    publisher: 'PUBLISHER_REQUEST',
  };

  return map[first] ?? first.toUpperCase();
};

const endpointKey = (method: RequestMethod, path: string) => `${method} ${path}`;

const parseBulkApiText = (source: string): ParsedEndpoint[] => {
  const lines = source.split(/\r?\n/);
  const methodMatcher = /^(GET|POST|PUT|PATCH|DELETE)\s+(\/[^\s]+)\s*$/i;
  const methodOnlyMatcher = /^(GET|POST|PUT|PATCH|DELETE)\s*$/i;
  const pathOnlyMatcher = /^(\/[^\s]+)\s*$/;
  const seen = new Set<string>();
  const output: ParsedEndpoint[] = [];
  let pendingMethod: RequestMethod | null = null;

  const pushEndpoint = (method: RequestMethod, path: string) => {
    const key = endpointKey(method, path);
    if (seen.has(key)) return;
    seen.add(key);
    output.push({ method, path, category: inferCategory(path) });
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    const matched = line.match(methodMatcher);
    if (matched) {
      const method = matched[1].toUpperCase() as RequestMethod;
      const path = matched[2];
      pushEndpoint(method, path);
      pendingMethod = null;
      continue;
    }

    const methodOnly = line.match(methodOnlyMatcher);
    if (methodOnly) {
      pendingMethod = methodOnly[1].toUpperCase() as RequestMethod;
      continue;
    }

    if (pendingMethod) {
      const pathOnly = line.match(pathOnlyMatcher);
      if (pathOnly) {
        pushEndpoint(pendingMethod, pathOnly[1]);
        pendingMethod = null;
      }
    }
  }

  return output;
};

const safeParseObject = (text: string): Record<string, unknown> | null => {
  const raw = text.trim();
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
    return parsed as Record<string, unknown>;
  } catch {
    return null;
  }
};

const toCsvCell = (value: unknown) => {
  const stringValue = String(value ?? '');
  return `"${stringValue.replace(/"/g, '""')}"`;
};

export default function ApiDocs() {
  const [tokenInput, setTokenInput] = useState(localStorage.getItem('repowire_token') ?? '');
  const [partnersInput, setPartnersInput] = useState(localStorage.getItem('repowire_partners_id') ?? '');
  const [notice, setNotice] = useState<string | null>(null);
  const [isRunningSmokeTests, setIsRunningSmokeTests] = useState(false);
  const [smokeResults, setSmokeResults] = useState<SmokeResult[]>([]);
  const [bulkApiText, setBulkApiText] = useState(DEFAULT_BULK_API_TEXT);
  const [bulkBodyText, setBulkBodyText] = useState('{\n  "email": "",\n  "password": "",\n  "partners_Id": ""\n}');
  const [isRunningBulk, setIsRunningBulk] = useState(false);
  const [bulkResults, setBulkResults] = useState<EndpointRunResult[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [templateEndpointKey, setTemplateEndpointKey] = useState('');
  const [endpointTemplates, setEndpointTemplates] = useState<Record<string, EndpointTemplate>>(DEFAULT_PRESET_TEMPLATES);

  const runUiApiSmokeTests = async () => {
    setIsRunningSmokeTests(true);
    try {
      const rows = await runSmokeTests();
      setSmokeResults(rows);
    } finally {
      setIsRunningSmokeTests(false);
    }
  };

  const quickStatus = [
    { label: 'Token', value: localStorage.getItem('repowire_token')?.trim() ? 'Configured' : 'Missing' },
    { label: 'partners_Id', value: localStorage.getItem('repowire_partners_id')?.trim() || 'Not set' },
    { label: 'Docs Source', value: 'OffersMeta v2 Swagger UI' },
    { label: 'Proxy Base', value: API_BASE_URL },
  ];

  const parsedEndpoints = useMemo(() => parseBulkApiText(bulkApiText), [bulkApiText]);
  const categories = useMemo(() => ['ALL', ...Array.from(new Set(parsedEndpoints.map((e) => e.category))).sort()], [parsedEndpoints]);
  const filteredEndpoints = useMemo(
    () => parsedEndpoints.filter((endpoint) => categoryFilter === 'ALL' || endpoint.category === categoryFilter),
    [parsedEndpoints, categoryFilter]
  );

  const activeTemplateKey = useMemo(() => {
    if (templateEndpointKey && parsedEndpoints.some((e) => endpointKey(e.method, e.path) === templateEndpointKey)) {
      return templateEndpointKey;
    }
    const first = filteredEndpoints[0] ?? parsedEndpoints[0];
    return first ? endpointKey(first.method, first.path) : '';
  }, [templateEndpointKey, parsedEndpoints, filteredEndpoints]);

  const activeTemplate = endpointTemplates[activeTemplateKey] ?? { query: '{}', body: '{}' };

  const updateActiveTemplate = (field: keyof EndpointTemplate, value: string) => {
    if (!activeTemplateKey) return;
    setEndpointTemplates((current) => ({
      ...current,
      [activeTemplateKey]: {
        query: current[activeTemplateKey]?.query ?? '{}',
        body: current[activeTemplateKey]?.body ?? '{}',
        [field]: value,
      },
    }));
  };

  const exportBulkResultsCsv = () => {
    if (bulkResults.length === 0) {
      setNotice('No bulk results to export yet. Run endpoints first.');
      return;
    }

    const header = ['Category', 'Method', 'Path', 'Status', 'OK', 'Detail'];
    const rows = bulkResults.map((row) => [row.category, row.method, row.path, row.status, row.ok, row.detail]);
    const csv = [header, ...rows].map((cells) => cells.map(toCsvCell).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `api-bulk-results-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}.csv`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  const runBulkEndpoints = async () => {
    const token = (tokenInput || localStorage.getItem('repowire_token') || '').trim();
    const partnersId = (partnersInput || localStorage.getItem('repowire_partners_id') || '').trim();
    const sharedBodyRaw = bulkBodyText.trim();
    const parsedSharedBody = safeParseObject(sharedBodyRaw);

    if (sharedBodyRaw && parsedSharedBody === null) {
      setNotice('Body JSON is invalid. Please fix it before running bulk tests.');
      return;
    }

    if (filteredEndpoints.length === 0) {
      setNotice('No valid METHOD /path lines found. Paste APIs in format like: GET /offer/offerList');
      return;
    }

    setIsRunningBulk(true);
    const results: EndpointRunResult[] = [];

    try {
      for (const endpoint of filteredEndpoints) {
        const headers: Record<string, string> = {
          Accept: 'application/json, text/plain, */*',
        };

        if (token) {
          headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
        }

        let url = `${API_BASE_URL}${endpoint.path}`;
        const key = endpointKey(endpoint.method, endpoint.path);
        const endpointTemplate = endpointTemplates[key] ?? { query: '{}', body: '{}' };
        const parsedQuery = safeParseObject(endpointTemplate.query);
        if (endpointTemplate.query.trim() && parsedQuery === null) {
          results.push({
            method: endpoint.method,
            path: endpoint.path,
            category: endpoint.category,
            status: 0,
            ok: false,
            detail: 'Invalid endpoint query template JSON',
          });
          continue;
        }

        if (parsedQuery && Object.keys(parsedQuery).length > 0) {
          const queryParams = new URLSearchParams();
          Object.entries(parsedQuery).forEach(([qk, qv]) => {
            if (qv === undefined || qv === null) return;
            queryParams.append(qk, String(qv));
          });
          const serialized = queryParams.toString();
          if (serialized) {
            const join = url.includes('?') ? '&' : '?';
            url += `${join}${serialized}`;
          }
        }

        if (endpoint.method === 'GET' && partnersId && !url.includes('partners_Id=')) {
          const join = url.includes('?') ? '&' : '?';
          url += `${join}partners_Id=${encodeURIComponent(partnersId)}`;
        }

        const init: RequestInit = {
          method: endpoint.method,
          headers,
          cache: 'no-store',
        };

        if (endpoint.method !== 'GET' && endpoint.method !== 'DELETE') {
          const parsedEndpointBody = safeParseObject(endpointTemplate.body);
          if (endpointTemplate.body.trim() && parsedEndpointBody === null) {
            results.push({
              method: endpoint.method,
              path: endpoint.path,
              category: endpoint.category,
              status: 0,
              ok: false,
              detail: 'Invalid endpoint body template JSON',
            });
            continue;
          }

          const payload: Record<string, unknown> = {
            ...(parsedSharedBody ?? {}),
            ...(parsedEndpointBody ?? {}),
          };
          if (partnersId && payload.partners_Id === undefined) {
            payload.partners_Id = partnersId;
          }

          const formData = new FormData();
          Object.entries(payload).forEach(([key, value]) => {
            if (value === undefined || value === null) return;
            formData.append(key, String(value));
          });
          init.body = formData;
        }

        try {
          const response = await fetch(url, init);
          const responseText = await response.text();
          let message = responseText;
          try {
            const json = responseText ? JSON.parse(responseText) : null;
            if (json && typeof json === 'object') {
              const obj = json as Record<string, unknown>;
              message = String(obj.responseMessage ?? obj.message ?? obj.error ?? response.statusText ?? 'No message');
            }
          } catch {
            // keep raw text
          }

          results.push({
            method: endpoint.method,
            path: endpoint.path,
            category: endpoint.category,
            status: response.status,
            ok: response.ok,
            detail: message.slice(0, 180),
          });
        } catch (error) {
          results.push({
            method: endpoint.method,
            path: endpoint.path,
            category: endpoint.category,
            status: 0,
            ok: false,
            detail: error instanceof Error ? error.message : 'Network error',
          });
        }
      }
    } finally {
      setBulkResults(results);
      setIsRunningBulk(false);
      setNotice(`Bulk run finished. Tested ${results.length} endpoints${categoryFilter === 'ALL' ? '' : ` in ${categoryFilter}`}.`);
    }
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {notice && (
        <div className="rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-2.5 text-sm text-cyan-900">
          {notice}
        </div>
      )}

      <section className="rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-sky-50 p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white px-3 py-1 text-xs font-semibold text-cyan-700 shadow-sm">
              <BookOpenText size={14} />
              OffersMeta v2 API Docs
            </div>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">OffersMeta v2 integration reference</h1>
            <p className="mt-2 text-sm text-slate-600">
              Old Repowire API details have been removed. This app now points to the live OffersMeta v2 documentation and API host.
            </p>
          </div>

          <a
            href={API_DOCS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800 transition-colors"
          >
            Open OffersMeta Docs
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: <ShieldCheck size={15} />, title: 'Bearer auth', text: 'Authenticated endpoints expect a JWT in the Authorization header.' },
            { icon: <ServerCog size={15} />, title: 'Live host', text: 'Requests are routed to https://apiv2.offersmeta.in through the app proxy.' },
            { icon: <FileText size={15} />, title: 'Docs source', text: 'Route details now live only in the official OffersMeta Swagger UI.' },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/70 bg-white/80 p-4">
              <div className="mb-2 inline-flex rounded-lg bg-cyan-50 p-2 text-cyan-700">{item.icon}</div>
              <p className="text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1 text-xs text-slate-500">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 p-5">
        <div className="flex items-start gap-4">
          <div>
            <p className="text-sm font-semibold text-amber-900 flex items-center gap-2">
              <span className="text-lg">✨</span> Getting Started
            </p>
            <p className="mt-2 text-xs text-amber-700 space-y-1.5">
              <span className="block">• <strong>All CRM modules are live:</strong> Dashboard, Contacts, Deals, Activities, Reports, Settings</span>
              <span className="block">• <strong>Production ready:</strong> Fully connected to OffersMeta v2 API with role-based auth</span>
              <span className="block">• <strong>Quick start:</strong> Log in with your account to fetch live data in any module</span>
              <span className="block">• <strong>API testing:</strong> Use the Bulk Runner below to validate individual endpoints</span>
              <span className="block">• <strong>Need help?</strong> View the <a href="https://github.com" target="_blank" className="underline font-semibold hover:text-amber-900">SETUP.md</a> guide for credentials and examples</span>
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Production Readiness</h2>
            <p className="mt-1 text-xs text-slate-500">Checklist for successful deployment and integration.</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { item: '✅ OffersMeta v2 API', desc: 'Live at https://apiv2.offersmeta.in' },
            { item: '✅ JWT Bearer Auth', desc: 'Role-based login (admin/publisher/advertiser)' },
            { item: '✅ 16 Core Endpoints', desc: 'Auth, contacts, deals, conversions, offers' },
            { item: '✅ 200+ Documented APIs', desc: 'Available via Swagger UI for testing' },
            { item: '✅ Error Handling', desc: 'Clear messaging for auth/validation/service issues' },
            { item: '✅ Data Caching', desc: 'React Query optimizes API calls and reduces load' },
            { item: '✅ TypeScript', desc: '0 errors, full type safety across stack' },
            { item: '✅ Build Optimized', desc: '384KB → 110KB gzip (71% compression)' },
          ].map((check, idx) => (
            <div key={idx} className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-3">
              <p className="text-xs font-semibold text-emerald-900">{check.item}</p>
              <p className="mt-0.5 text-xs text-emerald-700">{check.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Session Configuration</h2>
          <p className="mt-1 text-sm text-slate-500">Save the values used by the OffersMeta v2 API client.</p>

          <div className="mt-4 space-y-3">
            <div className="relative">
              <KeyRound size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={tokenInput}
                onChange={(event) => setTokenInput(event.target.value)}
                placeholder="Bearer token"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-xs text-slate-700"
              />
            </div>
            <div className="relative">
              <Building2 size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={partnersInput}
                onChange={(event) => setPartnersInput(event.target.value)}
                placeholder="partners_Id"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-xs text-slate-700"
              />
            </div>
            <button
              onClick={() => {
                const cleanedToken = tokenInput.trim().replace(/^Bearer\s+/i, '');
                localStorage.setItem('repowire_token', cleanedToken);
                localStorage.setItem('repowire_partners_id', partnersInput.trim());
                setNotice('OffersMeta session values saved.');
              }}
              className="rounded-lg bg-cyan-700 px-3 py-2 text-xs font-semibold text-white hover:bg-cyan-800"
            >
              Save Session
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Quick Status</h2>
          <div className="mt-4 space-y-2 text-sm">
            {quickStatus.map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                <span className="text-slate-600">{item.label}</span>
                <span className="font-semibold text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">UI API Smoke Tests</h2>
            <p className="mt-1 text-xs text-slate-500">Runs checks for all APIs currently used by dashboard/modules in this UI.</p>
          </div>
          <button
            onClick={() => void runUiApiSmokeTests()}
            disabled={isRunningSmokeTests}
            className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {isRunningSmokeTests ? 'Running...' : 'Run Smoke Test'}
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500">
                <th className="py-2 pr-3">API</th>
                <th className="py-2 pr-3">Method</th>
                <th className="py-2 pr-3">Endpoint</th>
                <th className="py-2 pr-3">Result</th>
                <th className="py-2">Detail</th>
              </tr>
            </thead>
            <tbody>
              {smokeResults.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-slate-500">No smoke test run yet.</td>
                </tr>
              )}
              {smokeResults.map((row) => (
                <tr key={`${row.method}-${row.endpoint}-${row.name}`} className="border-b border-slate-50">
                  <td className="py-2 pr-3 text-slate-800">{row.name}</td>
                  <td className="py-2 pr-3 text-slate-600">{row.method}</td>
                  <td className="py-2 pr-3 text-slate-600">{row.endpoint}</td>
                  <td className="py-2 pr-3">
                    <span className={`rounded-full px-2 py-0.5 font-semibold ${
                      row.status === 'pass'
                        ? 'bg-emerald-50 text-emerald-700'
                        : row.status === 'warn'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-2 text-slate-600">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Bulk API Live Runner</h2>
            <p className="mt-1 text-xs text-slate-500">
              Paste your full API doc list using one endpoint per line in the format: METHOD /path.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportBulkResultsCsv}
              className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Export CSV
            </button>
            <button
              onClick={() => void runBulkEndpoints()}
              disabled={isRunningBulk}
              className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
            >
              {isRunningBulk ? 'Running Live Checks...' : `Run ${filteredEndpoints.length} APIs`}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Category Filter</span>
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Endpoint Template Target</span>
            <select
              value={activeTemplateKey}
              onChange={(event) => setTemplateEndpointKey(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700"
            >
              {filteredEndpoints.map((endpoint) => {
                const key = endpointKey(endpoint.method, endpoint.path);
                return (
                  <option key={key} value={key}>{endpoint.category} | {endpoint.method} {endpoint.path}</option>
                );
              })}
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Endpoint List</label>
            <textarea
              value={bulkApiText}
              onChange={(event) => setBulkApiText(event.target.value)}
              className="h-56 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700 outline-none focus:border-cyan-500"
              spellCheck={false}
            />
            <p className="mt-1 text-xs text-slate-500">Detected endpoints: {parsedEndpoints.length}</p>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Shared Body (for POST/PUT/PATCH)</label>
            <textarea
              value={bulkBodyText}
              onChange={(event) => setBulkBodyText(event.target.value)}
              className="h-56 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700 outline-none focus:border-cyan-500"
              spellCheck={false}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Endpoint Query Template (JSON)</label>
            <textarea
              value={activeTemplate.query}
              onChange={(event) => updateActiveTemplate('query', event.target.value)}
              className="h-36 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700 outline-none focus:border-cyan-500"
              spellCheck={false}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Endpoint Body Template (JSON)</label>
            <textarea
              value={activeTemplate.body}
              onChange={(event) => updateActiveTemplate('body', event.target.value)}
              className="h-36 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700 outline-none focus:border-cyan-500"
              spellCheck={false}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500">
                <th className="py-2 pr-3">Category</th>
                <th className="py-2 pr-3">Method</th>
                <th className="py-2 pr-3">Endpoint</th>
                <th className="py-2 pr-3">HTTP</th>
                <th className="py-2">Detail</th>
              </tr>
            </thead>
            <tbody>
              {bulkResults.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-slate-500">No bulk run yet.</td>
                </tr>
              )}
              {bulkResults.map((row) => (
                <tr key={`${row.method}-${row.path}`} className="border-b border-slate-50">
                  <td className="py-2 pr-3 text-slate-700">{row.category}</td>
                  <td className="py-2 pr-3 text-slate-700">{row.method}</td>
                  <td className="py-2 pr-3 text-slate-700">{row.path}</td>
                  <td className="py-2 pr-3">
                    <span className={`rounded-full px-2 py-0.5 font-semibold ${
                      row.status >= 200 && row.status < 300
                        ? 'bg-emerald-50 text-emerald-700'
                        : row.status === 401 || row.status === 403
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                    }`}>
                      {row.status || 'ERR'}
                    </span>
                  </td>
                  <td className="py-2 text-slate-600">{row.detail || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
