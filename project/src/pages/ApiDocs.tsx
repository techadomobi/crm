import { useMemo, useState } from 'react';
import { BookOpenText, Search, ShieldCheck, Code2, ExternalLink, FileText, PlayCircle, ServerCog, Layers3 } from 'lucide-react';

const API_DOCS_URL = 'https://cl.repowire.com/api-docs/';

type Endpoint = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  title: string;
  description: string;
  auth: boolean;
  category: string;
  params: string[];
  sample: string;
};

const endpoints: Endpoint[] = [
  {
    method: 'POST',
    path: '/admin/login',
    title: 'Admin Login',
    description: 'Authenticate admin users and receive a JWT bearer token.',
    auth: false,
    category: 'Auth',
    params: ['email', 'password'],
    sample: `curl -X POST https://cl.repowire.com/admin/login \\
  -F "email=admin@company.com" \\
  -F "password=secret"`,
  },
  {
    method: 'GET',
    path: '/publicher/publisherList',
    title: 'Publisher List',
    description: 'Fetch publisher records for dashboards, management, and reporting.',
    auth: true,
    category: 'Publishers',
    params: ['page', 'limit', 'search'],
    sample: `curl -H "Authorization: Bearer <token>" \\
  "https://cl.repowire.com/publicher/publisherList?page=1&limit=10"`,
  },
  {
    method: 'GET',
    path: '/advertiser/advertiserList',
    title: 'Advertiser List',
    description: 'Retrieve advertiser accounts and related operational data.',
    auth: true,
    category: 'Advertisers',
    params: ['page', 'limit', 'search'],
    sample: `curl -H "Authorization: Bearer <token>" \\
  "https://cl.repowire.com/advertiser/advertiserList?page=1&limit=10"`,
  },
  {
    method: 'GET',
    path: '/conversion/ConversionList',
    title: 'Conversion List',
    description: 'List conversion records with filters for dates, page, and search scope.',
    auth: true,
    category: 'Conversions',
    params: ['page', 'startDate', 'endDate', 'searchBy', 'search'],
    sample: `curl -H "Authorization: Bearer <token>" \\
  "https://cl.repowire.com/conversion/ConversionList?page=1&startDate=2026-04-01&endDate=2026-04-09&searchBy=publisherId&search=123"`,
  },
  {
    method: 'GET',
    path: '/conversion/getConversionAccordingToDate',
    title: 'Conversions by Date',
    description: 'Pull conversion activity using a starting date for trend and charting views.',
    auth: true,
    category: 'Conversions',
    params: ['startDate'],
    sample: `curl -H "Authorization: Bearer <token>" \\
  "https://cl.repowire.com/conversion/getConversionAccordingToDate?startDate=2026-04-01"`,
  },
  {
    method: 'GET',
    path: '/conversion/totalRevenue',
    title: 'Total Revenue',
    description: 'Get revenue totals with optional date range filtering.',
    auth: true,
    category: 'KPIs',
    params: ['startDate', 'endDate'],
    sample: `curl -H "Authorization: Bearer <token>" \\
  "https://cl.repowire.com/conversion/totalRevenue?startDate=2026-04-01&endDate=2026-04-09"`,
  },
  {
    method: 'GET',
    path: '/conversion/totalConversion',
    title: 'Total Conversion',
    description: 'Return conversion totals used by dashboard KPI cards.',
    auth: true,
    category: 'KPIs',
    params: [],
    sample: `curl -H "Authorization: Bearer <token>" \\
  "https://cl.repowire.com/conversion/totalConversion"`,
  },
  {
    method: 'GET',
    path: '/conversion/totalPayout',
    title: 'Total Payout',
    description: 'Get payout totals for finance and partner accounting views.',
    auth: true,
    category: 'KPIs',
    params: ['startDate', 'endDate'],
    sample: `curl -H "Authorization: Bearer <token>" \\
  "https://cl.repowire.com/conversion/totalPayout"`,
  },
  {
    method: 'GET',
    path: '/conversion/postbackLogs',
    title: 'Postback Logs',
    description: 'Inspect backend postback activity and delivery traces.',
    auth: true,
    category: 'Logs',
    params: ['page', 'limit', 'fromDate', 'toDate'],
    sample: `curl -H "Authorization: Bearer <token>" \\
  "https://cl.repowire.com/conversion/postbackLogs?page=1&limit=10"`,
  },
  {
    method: 'GET',
    path: '/impression/impressionList',
    title: 'Impression List',
    description: 'Track impression records for campaign and traffic analysis.',
    auth: true,
    category: 'Tracking',
    params: ['page', 'search'],
    sample: `curl -H "Authorization: Bearer <token>" \\
  "https://cl.repowire.com/impression/impressionList?page=1"`,
  },
];

const methodStyle: Record<Endpoint['method'], string> = {
  GET: 'bg-blue-50 text-blue-700 border-blue-100',
  POST: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  PUT: 'bg-amber-50 text-amber-700 border-amber-100',
  DELETE: 'bg-rose-50 text-rose-700 border-rose-100',
};

export default function ApiDocs() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = useMemo(() => ['All', ...new Set(endpoints.map((endpoint) => endpoint.category))], []);

  const filtered = endpoints.filter((endpoint) => {
    const matchesSearch = [endpoint.title, endpoint.path, endpoint.description, endpoint.category]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || endpoint.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-5 animate-fade-in">
      <section className="rounded-2xl border border-sky-100 bg-gradient-to-r from-cyan-50 to-sky-50 p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-cyan-700 shadow-sm">
              <BookOpenText size={14} />
              Repowire API Docs
            </div>
            <h1 className="mt-3 text-3xl font-display font-bold text-slate-900">In-app API documentation</h1>
            <p className="mt-2 text-sm text-slate-600">
              This page is a curated view of the real Swagger/OpenAPI endpoints behind the Repowire backend. Use it to understand request shapes, required auth, and the exact routes used by the dashboard.
            </p>
          </div>

          <a
            href={API_DOCS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800 transition-colors"
          >
            Open live Swagger
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: <ShieldCheck size={15} />, title: 'Bearer auth', text: 'Most routes require a JWT token in Authorization header.' },
            { icon: <Code2 size={15} />, title: 'Real endpoints', text: 'Paths below are pulled from the Swagger spec and the app client.' },
            { icon: <ServerCog size={15} />, title: 'Backend ready', text: 'Use these routes with the live API workspace in Settings.' },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/70 bg-white/80 p-4 backdrop-blur">
              <div className="mb-2 inline-flex rounded-lg bg-cyan-50 p-2 text-cyan-700">{item.icon}</div>
              <p className="text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1 text-xs text-slate-500">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Layers3 size={16} className="text-cyan-700" />
            <h2 className="text-sm font-semibold text-slate-900">How it works</h2>
          </div>
          <div className="space-y-3 text-sm text-slate-600">
            <p>1. Save your Bearer token in Settings.</p>
            <p>2. The app uses live endpoints through the backend API client.</p>
            <p>3. Dashboard KPIs, chart data, and backend workspaces can consume these routes.</p>
            <p>4. If no token is saved, the app falls back to safe mock data where needed.</p>
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Auth header example</p>
            <code className="block whitespace-pre-wrap rounded-lg bg-slate-950 p-3 text-[11px] leading-relaxed text-cyan-100">
{`Authorization: Bearer &lt;your_token&gt;`}
            </code>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Search size={16} className="text-cyan-700" />
            <h2 className="text-sm font-semibold text-slate-900">Find endpoints</h2>
          </div>
          <div className="relative mb-4">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search routes, categories, or descriptions"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2.5 text-sm text-slate-700 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activeCategory === category ? 'bg-cyan-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {filtered.map((endpoint) => (
          <article key={endpoint.path} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-lg transition-all">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-lg border px-2 py-0.5 text-[11px] font-bold ${methodStyle[endpoint.method]}`}>{endpoint.method}</span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{endpoint.category}</span>
                </div>
                <h3 className="mt-2 text-lg font-bold text-slate-900">{endpoint.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{endpoint.description}</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Route</p>
              <p className="mt-1 font-mono text-sm text-slate-800">{endpoint.path}</p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Auth</p>
                <p className="mt-1 text-sm font-medium text-slate-800">{endpoint.auth ? 'Bearer token required' : 'Public endpoint'}</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Parameters</p>
                <p className="mt-1 text-sm font-medium text-slate-800">{endpoint.params.length ? endpoint.params.join(', ') : 'None listed in spec'}</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-100 bg-slate-950 p-4">
              <div className="flex items-center justify-between gap-3 mb-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Sample request</p>
                <PlayCircle size={14} className="text-cyan-300" />
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap text-[11px] leading-relaxed text-cyan-100">{endpoint.sample}</pre>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={16} className="text-cyan-700" />
          <h2 className="text-sm font-semibold text-slate-900">API coverage snapshot</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-6">
          {[
            { label: 'Auth', value: 1 },
            { label: 'Publishers', value: 1 },
            { label: 'Advertisers', value: 1 },
            { label: 'Conversions', value: 3 },
            { label: 'KPIs', value: 3 },
            { label: 'Logs', value: 1 },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
              <p className="text-lg font-bold text-slate-900">{item.value}</p>
              <p className="text-xs text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
