import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, ArrowRight, BarChart3, BookOpenText, Loader2, RefreshCw, Table2 } from 'lucide-react';
import { fetchLiveReportSnapshot, hasAuthToken, type LiveReportSnapshot } from '../api/liveDataAdapters';
import { useReports } from '../hooks/useReports';
import { extractTabularData } from '../lib/swaggerTableData';
import { reportScopeMeta, reportScopeOptions, type ReportScope } from '../services/reports';

function BarChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex items-end gap-3 h-36">
      {data.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1.5">
          <span className="text-slate-500 text-xs">${(d.value / 1000).toFixed(0)}k</span>
          <div
            className="w-full rounded-t-lg transition-all duration-700 hover:opacity-80"
            style={{ height: `${Math.max((d.value / max) * 96, 6)}px`, backgroundColor: d.color }}
          />
          <span className="text-slate-400 text-xs text-center">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ segments }: { segments: { label: string; value: number; color: string }[] }) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  if (total <= 0) {
    return <p className="text-sm text-slate-500">No pipeline values returned by live API yet.</p>;
  }

  let cumulative = 0;
  const r = 56;
  const cx = 70;
  const cy = 70;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 140 140" className="w-28 h-28 flex-shrink-0">
        {segments.map((segment) => {
          const percent = segment.value / total;
          const offset = circumference * (1 - percent);
          const rotation = cumulative * 360;
          cumulative += percent;

          return (
            <circle
              key={segment.label}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={segment.color}
              strokeWidth="18"
              strokeDasharray={`${circumference * percent} ${circumference * (1 - percent)}`}
              strokeDashoffset={offset}
              transform={`rotate(${rotation - 90} ${cx} ${cy})`}
              className="transition-all duration-700 hover:opacity-80 cursor-pointer"
            />
          );
        })}
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0F172A">${(total / 1e6).toFixed(2)}M</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" fill="#94A3B8">Pipeline</text>
      </svg>

      <div className="space-y-2 flex-1">
        {segments.map((segment) => (
          <div key={segment.label} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: segment.color }} />
              <span className="text-slate-600 text-xs capitalize">{segment.label}</span>
            </div>
            <span className="text-slate-900 text-xs font-semibold">${(segment.value / 1000).toFixed(0)}k</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const EMPTY_SNAPSHOT: LiveReportSnapshot = {
  totals: {
    won: 0,
    lost: 0,
    open: 0,
    totalRevenue: 0,
  },
  pipeline: [],
  revenueSeries: [],
  topRows: [],
};

type ReportRouteView =
  | 'summary'
  | 'campaignsReport'
  | 'publishersReport'
  | 'advertisersReport'
  | 'dailyReport'
  | 'goalsReport'
  | 'cohortReport'
  | 'additionalReports'
  | 'capReport'
  | 'samplingReport'
  | 'comparisonReport'
  | 'clickReport'
  | 'conversionReport'
  | 'impressionReport'
  | 'postbackLogs'
  | 'recentExports';

const reportRouteToScope: Record<ReportRouteView, ReportScope> = {
  summary: 'summary',
  campaignsReport: 'offerReport',
  publishersReport: 'publishersReport',
  advertisersReport: 'advertiserReport',
  dailyReport: 'publisherReport',
  goalsReport: 'publisherManagerReport',
  cohortReport: 'advertiserPerformanceReport',
  additionalReports: 'affiliatesPerformanceReport',
  capReport: 'advertiserPerformanceReport',
  samplingReport: 'affiliatesPerformanceReport',
  comparisonReport: 'advertiserPerformanceReport',
  clickReport: 'affiliatesPerformanceReport',
  conversionReport: 'advertiserPerformanceReport',
  impressionReport: 'publisherReport',
  postbackLogs: 'affiliatesPerformanceReport',
  recentExports: 'advertiserPerformanceReport',
};

const reportScopeToView: Record<ReportScope, ReportRouteView> = {
  summary: 'summary',
  offerReport: 'campaignsReport',
  publisherReport: 'dailyReport',
  advertiserReport: 'advertisersReport',
  publishersReport: 'publishersReport',
  publisherManagerReport: 'goalsReport',
  affiliatesPerformanceReport: 'additionalReports',
  advertiserPerformanceReport: 'conversionReport',
};

const reportViewMeta: Record<ReportRouteView, { title: string; description: string; badge: string }> = {
  summary: {
    title: 'Live reporting and analytics',
    description: 'Summary data stays live, and the report explorer below is wired directly to the report endpoints exposed by Swagger.',
    badge: 'Reports workspace',
  },
  campaignsReport: {
    title: 'Performance command center',
    description: 'Campaign performance rows, payout movement, and conversion-weighted trendlines from offer-level endpoints.',
    badge: 'Performance view',
  },
  publishersReport: {
    title: 'Publisher reporting board',
    description: 'Publisher-focused rows with partner-level slicing and account-aware report controls.',
    badge: 'Publisher view',
  },
  advertisersReport: {
    title: 'Advertiser reporting board',
    description: 'Advertiser-level report stream designed for account owners and manager audit checks.',
    badge: 'Advertiser view',
  },
  dailyReport: {
    title: 'Daily report explorer',
    description: 'Date-bound publisher report output with filtering that favors daily operational review.',
    badge: 'Daily view',
  },
  goalsReport: {
    title: 'Goal and manager insights',
    description: 'Publisher manager report focus for goal progress, manager IDs, and period-level checks.',
    badge: 'Goals view',
  },
  cohortReport: {
    title: 'Cohort and trend analytics',
    description: 'Advertiser performance cohorts with comparative windows for conversion-centric analytics.',
    badge: 'Cohort view',
  },
  additionalReports: {
    title: 'Validation and discrepancy checks',
    description: 'Affiliate performance outputs for reconciliation and validation workflows.',
    badge: 'Validation view',
  },
  capReport: {
    title: 'Cap monitoring workspace',
    description: 'Cap-aligned report behavior over advertiser performance streams and threshold checks.',
    badge: 'Cap view',
  },
  samplingReport: {
    title: 'Sampling diagnostics panel',
    description: 'Sampled affiliate performance slices for faster diagnostics before full export.',
    badge: 'Sampling view',
  },
  comparisonReport: {
    title: 'Comparison analytics',
    description: 'Side-by-side comparison mode using advertiser performance rows over shared date ranges.',
    badge: 'Comparison view',
  },
  clickReport: {
    title: 'Click quality analytics',
    description: 'Click-aligned affiliate performance perspective with search-first filtering controls.',
    badge: 'Click view',
  },
  conversionReport: {
    title: 'Conversion analytics workspace',
    description: 'Conversion-focused advertiser performance with endpoint controls tailored for analytics runs.',
    badge: 'Analytics view',
  },
  impressionReport: {
    title: 'Impressions monitoring workspace',
    description: 'Impression-oriented report mode optimized for publisher-level visibility and filtering.',
    badge: 'Impressions view',
  },
  postbackLogs: {
    title: 'Postback logs and delivery checks',
    description: 'Postback-oriented report stream for retry diagnostics and payload visibility.',
    badge: 'Postback view',
  },
  recentExports: {
    title: 'Recent exports and audit history',
    description: 'Export audit perspective built over advertiser performance rows and paging controls.',
    badge: 'Exports view',
  },
};

const readFirst = (keys: string[]) => {
  for (const key of keys) {
    const value = localStorage.getItem(key)?.trim();
    if (value) return value;
  }
  return '';
};

interface ReportsWorkspaceProps {
  initialView?: ReportRouteView;
}

export default function ReportsWorkspace({ initialView = 'summary' }: ReportsWorkspaceProps) {
  const [snapshot, setSnapshot] = useState<LiveReportSnapshot>(EMPTY_SNAPSHOT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);
  const [view, setView] = useState<ReportRouteView>(initialView);
  const [partnersInput, setPartnersInput] = useState(localStorage.getItem('repowire_partners_id') ?? '');
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date.toISOString().slice(0, 10);
  });
  const [endDate, setEndDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [publisherId, setPublisherId] = useState('');
  const [advertiserId, setAdvertiserId] = useState('');
  const [publisherManagerId, setPublisherManagerId] = useState('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [snapshotReady, setSnapshotReady] = useState(false);

  useEffect(() => {
    const role = (localStorage.getItem('repowire_user_role') ?? '').toLowerCase();
    if (initialView === 'summary' && role.includes('publisher')) {
      setView('publishersReport');
      return;
    }
    if (initialView === 'summary' && role.includes('advertiser')) {
      setView('advertisersReport');
      return;
    }
    setView(initialView);
  }, [initialView]);

  useEffect(() => {
    const role = (localStorage.getItem('repowire_user_role') ?? '').toLowerCase();
    const userId = readFirst(['repowire_user_id']);
    const savedPublisherId = readFirst(['repowire_publisher_id']);
    const savedAdvertiserId = readFirst(['repowire_advertiser_id']);
    const savedPublisherManagerId = readFirst(['repowire_publisher_manager_id']);

    if (role.includes('publisher')) {
      setPublisherId(savedPublisherId || userId);
    } else if (role.includes('advertiser')) {
      setAdvertiserId(savedAdvertiserId || userId);
    } else {
      setPublisherId(savedPublisherId);
      setAdvertiserId(savedAdvertiserId);
      setPublisherManagerId(savedPublisherManagerId);
    }
  }, []);

  const activeScope = reportRouteToScope[view];
  const viewMeta = reportViewMeta[view];
  const reportQuery = useMemo(
    () => ({
      partners_Id: partnersInput.trim() || undefined,
      startDate,
      endDate,
      page,
      search: search.trim() || undefined,
      searchBy: searchBy.trim() || undefined,
      publisherId: publisherId.trim() || undefined,
      advertiserId: advertiserId.trim() || undefined,
      advertiser_id: advertiserId.trim() || undefined,
      publisherManagerId: publisherManagerId.trim() || undefined,
    }),
    [partnersInput, startDate, endDate, page, search, searchBy, publisherId, advertiserId, publisherManagerId]
  );

  const reportQueryResult = useReports(activeScope === 'summary' ? 'offerReport' : activeScope, reportQuery, activeScope !== 'summary');

  const loadSnapshot = async () => {
    if (!hasAuthToken()) {
      setSnapshot(EMPTY_SNAPSHOT);
      setSnapshotReady(false);
      setError('Save a valid bearer token and partners_Id in Settings to load the live snapshot.');
      return;
    }

    setLoading(true);
    setError(null);
    setSnapshotReady(false);

    try {
      const data = await fetchLiveReportSnapshot();
      setSnapshot(data);
      setLastUpdatedAt(new Date());
      setSnapshotReady(true);
    } catch {
      setSnapshot(EMPTY_SNAPSHOT);
      setSnapshotReady(false);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadSnapshot();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      void loadSnapshot();
    }, 30_000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onSessionUpdated = () => {
      const savedPartnersId =
        localStorage.getItem('repowire_partners_id')
        ?? localStorage.getItem('repowire_partners_Id')
        ?? localStorage.getItem('partners_Id')
        ?? '';

      setPartnersInput(savedPartnersId);
      void loadSnapshot();
      if (activeScope !== 'summary') {
        void reportQueryResult.refetch();
      }
    };

    window.addEventListener('repowire-session-updated', onSessionUpdated as EventListener);
    return () => window.removeEventListener('repowire-session-updated', onSessionUpdated as EventListener);
  }, [activeScope, reportQueryResult]);

  const summary = useMemo(
    () => [
      { label: 'Deals Won', value: snapshot.totals.won, sub: 'live offers status', color: 'text-emerald-600', border: 'border-emerald-100' },
      { label: 'Deals Lost', value: snapshot.totals.lost, sub: 'live offers status', color: 'text-red-500', border: 'border-red-100' },
      { label: 'Open Deals', value: snapshot.totals.open, sub: 'active live pipeline', color: 'text-blue-600', border: 'border-blue-100' },
      { label: 'Total Revenue', value: `$${snapshot.totals.totalRevenue.toLocaleString()}`, sub: 'live /conversion/totalRevenue', color: 'text-amber-600', border: 'border-amber-100' },
    ],
    [snapshot]
  );

  const chartSeries = useMemo(() => {
    if (snapshot.revenueSeries.length > 0) {
      return snapshot.revenueSeries;
    }

    const fallbackLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const total = snapshot.totals.totalRevenue;
    const weights = [0.08, 0.12, 0.16, 0.18, 0.2, 0.14, 0.12];

    return fallbackLabels.map((label, index) => ({
      label,
      value: total > 0 ? Math.round(total * weights[index]) : 0,
      color: '#3B82F6',
    }));
  }, [snapshot]);

  const reportRows = reportQueryResult.data ?? [];
  const reportTable = useMemo(() => extractTabularData(reportRows), [reportRows]);
  const reportColumns = reportTable?.columns ?? (reportRows[0] && typeof reportRows[0] === 'object' && !Array.isArray(reportRows[0]) ? Object.keys(reportRows[0] as Record<string, unknown>).slice(0, 12) : []);
  const isSummaryView = activeScope === 'summary';

  const selectedScopeLabel = isSummaryView ? 'Summary snapshot' : reportScopeMeta[activeScope].label;
  const selectedScopeDescription = isSummaryView ? 'Live dashboard summary plus generic report controls.' : reportScopeMeta[activeScope].description;

  const activeResults = reportTable?.rows ?? (Array.isArray(reportRows) ? reportRows.filter((row): row is Record<string, unknown> => row !== null && typeof row === 'object' && !Array.isArray(row)) : []);

  return (
    <div className="space-y-5 animate-fade-in">
      {notice && (
        <div className="rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-2.5 text-sm text-cyan-900 flex items-center justify-between">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="text-xs font-semibold text-cyan-700 hover:text-cyan-900">Dismiss</button>
        </div>
      )}

      {error && <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-900">{error}</div>}

      <section className="rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-sky-50 p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white px-3 py-1 text-xs font-semibold text-cyan-700 shadow-sm">
              <BookOpenText size={14} />
              {viewMeta.badge}
            </div>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">{viewMeta.title}</h1>
            <p className="mt-2 text-sm text-slate-600">{viewMeta.description}</p>
          </div>

          <button
            type="button"
            onClick={() => void loadSnapshot()}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
            Refresh summary
          </button>
        </div>
      </section>

      {isSummaryView && !snapshotReady && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Live report snapshot is unavailable right now. Save a token and partners_Id in Settings, then use the report endpoint tabs below to load live rows.
        </div>
      )}

      {isSummaryView && (
        <>
          <p className="text-[11px] text-slate-500 text-right">
            Auto refresh: 30s {lastUpdatedAt ? `· Last update: ${lastUpdatedAt.toLocaleTimeString()}` : ''}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {summary.map((item) => (
              <div key={item.label} className={`bg-white rounded-2xl p-5 border ${item.border} hover:shadow-md transition-all`}>
                <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                <p className="text-slate-700 font-medium text-sm mt-1">{item.label}</p>
                <p className="text-slate-400 text-xs mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-lg transition-all">
              <h3 className="text-slate-900 font-semibold text-sm mb-1">Live Revenue Trend</h3>
              <p className="text-slate-400 text-xs mb-5">Last 7 days from authenticated API data</p>
              <BarChart data={chartSeries} />
              {snapshot.revenueSeries.length === 0 && (
                <p className="mt-3 text-xs text-slate-500">Live revenue points were empty, so this chart uses a totals-based fallback distribution.</p>
              )}
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-lg transition-all">
              <h3 className="text-slate-900 font-semibold text-sm mb-1">Pipeline by Stage</h3>
              <p className="text-slate-400 text-xs mb-5">Live offer status distribution</p>
              <DonutChart segments={snapshot.pipeline} />
            </div>
          </div>
        </>
      )}

      {!isSummaryView && (
        <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-900 flex items-center justify-between gap-3 flex-wrap">
          <span>
            Viewing {selectedScopeLabel}. Endpoint: <strong>{reportScopeMeta[activeScope].endpoint}</strong>
          </span>
          <span className="text-xs text-cyan-700">Use filters below, then run this endpoint.</span>
        </div>
      )}

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Report explorer</h2>
            <p className="mt-1 text-xs text-slate-500">{selectedScopeLabel}: {selectedScopeDescription}</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
            <Table2 size={14} />
            {activeScope === 'summary' ? 'Summary mode' : reportScopeMeta[activeScope].endpoint}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-8">
          <button type="button" onClick={() => setView('summary')} className={`rounded-xl border px-3 py-2 text-left text-sm font-semibold ${activeScope === 'summary' ? 'border-cyan-200 bg-cyan-50 text-cyan-800' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
            Summary
          </button>
          {reportScopeOptions.map((scope) => (
            <button key={scope} type="button" onClick={() => setView(reportScopeToView[scope])} className={`rounded-xl border px-3 py-2 text-left text-sm font-semibold ${activeScope === scope ? 'border-cyan-200 bg-cyan-50 text-cyan-800' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
              {reportScopeMeta[scope].label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          <label className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">partners_Id</span>
            <input value={partnersInput} onChange={(e) => setPartnersInput(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800" placeholder="partners_Id" />
          </label>
          <label className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Start date</span>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800" />
          </label>
          <label className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">End date</span>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800" />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <label className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">publisherId</span>
            <input value={publisherId} onChange={(e) => setPublisherId(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800" placeholder="Optional publisherId" />
          </label>
          <label className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">advertiserId</span>
            <input value={advertiserId} onChange={(e) => setAdvertiserId(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800" placeholder="Optional advertiserId" />
          </label>
          <label className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">publisherManagerId</span>
            <input value={publisherManagerId} onChange={(e) => setPublisherManagerId(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800" placeholder="Optional publisherManagerId" />
          </label>
          <label className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Page / search</span>
            <div className="grid grid-cols-2 gap-2">
              <input type="number" min={1} value={page} onChange={(e) => setPage(Math.max(1, Number(e.target.value) || 1))} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800" placeholder="page" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800" placeholder="search" />
            </div>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="space-y-1 text-sm text-slate-600">
            searchBy
            <input value={searchBy} onChange={(e) => setSearchBy(e.target.value)} className="ml-2 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-800" placeholder="offerId / publisherId / advertiserId" />
          </label>
          <button type="button" onClick={() => {
            localStorage.setItem('repowire_partners_id', partnersInput.trim());
            setNotice('Saved report session values.');
            void loadSnapshot();
          }} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            Save session
          </button>
          <button type="button" onClick={() => void reportQueryResult.refetch()} disabled={activeScope === 'summary' || reportQueryResult.isFetching} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-60">
            {reportQueryResult.isFetching ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} />}
            Run report endpoint
          </button>
        </div>

        {activeScope !== 'summary' && (
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <BarChart3 size={14} className="text-cyan-700" />
              Endpoint results for {reportScopeMeta[activeScope].label}
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
                    {reportColumns.length === 0 ? <th className="px-4 py-3">No columns yet</th> : reportColumns.map((column) => <th key={column} className="px-4 py-3 whitespace-nowrap">{column}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {activeResults.length === 0 && (
                    <tr>
                      <td colSpan={Math.max(reportColumns.length, 1)} className="px-4 py-6 text-center text-sm text-slate-500">
                        {reportQueryResult.isLoading ? 'Loading report rows...' : 'No rows returned for this report yet.'}
                      </td>
                    </tr>
                  )}
                  {activeResults.map((row, index) => (
                    <tr key={`${activeScope}-${index}`} className="hover:bg-slate-50/80 transition-colors">
                      {reportColumns.map((column) => (
                        <td key={column} className="px-4 py-3 align-top text-slate-700">
                          {String(row[column] ?? '') || '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {isSummaryView && (
        <div className="bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-slate-900 font-semibold text-sm">Top Entities (Live)</h3>
            <p className="text-slate-400 text-xs">Publishers, offers, and advertisers from top APIs</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Source</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {snapshot.topRows.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-5 py-8 text-center text-sm text-slate-500">{loading ? 'Loading live leaderboard...' : 'No live top rows returned yet.'}</td>
                  </tr>
                )}
                {snapshot.topRows.map((row) => (
                  <tr key={`${row.source}-${row.name}`} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-semibold text-slate-800">{row.name}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-600">{row.source}</td>
                    <td className="px-5 py-3.5 text-right text-sm font-semibold text-slate-900">${row.value.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isSummaryView && reportQueryResult.isError && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 flex items-center gap-2">
          <AlertCircle size={14} />
          Report endpoint preview failed to load. Use the filters above, verify token/partners_Id in Settings, and try a specific endpoint tab.
        </div>
      )}

      {!isSummaryView && reportQueryResult.isError && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 flex items-center gap-2">
          <AlertCircle size={14} />
          {reportQueryResult.error instanceof Error
            ? `API Error: ${reportQueryResult.error.message}`
            : 'API Error: failed to load report rows from live endpoints.'}
        </div>
      )}
    </div>
  );
}
