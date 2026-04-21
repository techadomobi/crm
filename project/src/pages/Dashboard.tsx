import { useState } from 'react';
import { Activity, BookOpenText, CheckCircle, CircleDollarSign, Eye, MousePointerClick, Percent, Sparkles } from 'lucide-react';
import RevenueChart from '../components/RevenueChart';
import RoleDashboardsPanel from '../components/RoleDashboardsPanel';
import { useDashboardOverview } from '../hooks/useDashboardOverview';
import { RangeKey, useDashboardRangeMetrics } from '../hooks/useDashboardRangeMetrics';
import { useDashboardRangeSummary } from '../hooks/useDashboardRangeSummary';

const formatCurrency = (value: number) => {
  return `$${value.toLocaleString()}`;
};

function PipelineChart({ data }: { data: Array<{ stage: string; count: number }> }) {
  const max = Math.max(...data.map((item) => item.count), 1);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-slate-900 font-semibold text-sm">Deal Pipeline (Live)</h3>
          <p className="text-slate-400 text-xs mt-0.5">Number of deals per stage from API data</p>
        </div>
        <span className="text-emerald-600 text-xs font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">Real-time</span>
      </div>

      {data.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
          No live pipeline stages available yet.
        </div>
      ) : (
        <div className="flex items-end gap-3 h-44 overflow-x-auto pb-1">
          {data.map((item) => {
            const height = Math.max((item.count / max) * 140, 8);
            return (
              <div key={item.stage} className="flex min-w-[72px] flex-1 flex-col items-center gap-2">
                <span className="text-slate-600 text-xs font-semibold">{item.count}</span>
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-blue-500 to-cyan-400 shadow-sm"
                  style={{ height: `${height}px` }}
                />
                <span className="text-slate-400 text-xs text-center leading-tight uppercase tracking-wide">
                  {item.stage.replace(/_/g, ' ').slice(0, 12)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function KpiCard({
  label,
  value,
  trend,
  icon,
}: {
  label: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
}) {
  const positive = trend.startsWith('+');
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">{icon}</span>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${positive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
          {trend}
        </span>
      </div>
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-[38px] leading-none font-extrabold text-slate-900">{value}</p>
    </div>
  );
}

interface DashboardProps {
  displayName: string;
  displayEmail: string;
}

const rangeSubtitle: Record<RangeKey, string> = {
  today: 'Today',
  yesterday: 'Yesterday',
  lastWeek: 'Last 7 days',
  thisMonth: 'This month',
  lastMonth: 'Last month',
};

const buildRangeAxis = (range: RangeKey) => {
  const now = new Date();
  const end = new Date(now);
  const start = new Date(now);

  if (range === 'yesterday') {
    start.setDate(start.getDate() - 1);
    end.setDate(end.getDate() - 1);
  } else if (range === 'lastWeek') {
    start.setDate(start.getDate() - 6);
  } else if (range === 'thisMonth') {
    start.setDate(1);
  } else if (range === 'lastMonth') {
    start.setMonth(start.getMonth() - 1, 1);
    end.setDate(0);
  }

  const axis: string[] = [];
  const cursor = new Date(start);
  while (cursor <= end) {
    axis.push(cursor.toISOString().slice(0, 10));
    cursor.setDate(cursor.getDate() + 1);
  }

  return axis.length > 0 ? axis : [new Date().toISOString().slice(0, 10)];
};

const buildRangeFallbackSeries = (range: RangeKey, totalRevenue: number) => {
  const axis = buildRangeAxis(range);
  const count = axis.length;
  const baseValue = Math.max(totalRevenue, 0);

  if (count === 1) {
    return [{ month: new Date(axis[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), value: baseValue }];
  }

  return axis.map((dayKey, index) => {
    const date = new Date(`${dayKey}T00:00:00Z`);
    const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const progress = (index + 1) / count;
    const value = baseValue > 0 ? Math.round(baseValue * progress) : 0;
    return { month: label, value };
  });
};

const hasVisibleVariation = (series: Array<{ month: string; value: number }>) => {
  if (series.length <= 1) return true;
  const values = series.map((point) => point.value);
  const hasAnyPositive = values.some((value) => value > 0);
  const distinctValues = new Set(values);
  return hasAnyPositive && distinctValues.size > 1;
};

export default function Dashboard({ displayName, displayEmail }: DashboardProps) {
  const [range, setRange] = useState<RangeKey>('today');
  const { data, isLoading, isError, error } = useDashboardOverview();
  const { data: rangeSummary, isLoading: rangeSummaryLoading, isError: rangeSummaryError } = useDashboardRangeSummary(range);
  const { rangeMetrics, rangeLoading, rangeError } = useDashboardRangeMetrics(range, {
    liveDeals: data?.liveDeals,
    liveActivities: data?.liveActivities,
  });

  if (isLoading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">Loading live dashboard data...</div>;
  }

  if (isError || !data) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        Failed to load dashboard data: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  const fallbackRevenueData = data.revenueSeries.map((point) => ({
    month: point.label,
    value: point.value,
  }));

  const liveSummary = data.liveSummary;

  const rangeRevenueTotal = rangeSummary?.revenue ?? liveSummary?.revenue ?? data.openDealsValue;
  const rangeClicksTotal = rangeSummary?.clicks ?? liveSummary?.clicks ?? rangeMetrics?.clicks ?? 0;
  const liveRangeChart = rangeMetrics?.chart ?? [];
  const chartMetric = rangeMetrics?.chartMetric ?? 'revenue';
  const revenueSeriesCandidate = hasVisibleVariation(liveRangeChart)
    ? liveRangeChart
    : buildRangeFallbackSeries(
        range,
        chartMetric === 'clicks'
          ? rangeClicksTotal
          : (rangeRevenueTotal > 0 ? rangeRevenueTotal : fallbackRevenueData.reduce((sum, point) => sum + point.value, 0))
      );
  const revenueData = revenueSeriesCandidate;

  const pipelineData = rangeMetrics?.pipeline.length
    ? rangeMetrics.pipeline
    : data.pipelineStages;

  const chartTotalLabel = chartMetric === 'clicks' ? 'Clicks' : 'Revenue';

  const kpis = (() => {
    const conversions = rangeSummary?.conversions ?? liveSummary?.conversions ?? rangeMetrics?.conversions ?? data.pipelineStages.reduce((sum, stage) => sum + stage.count, 0);
    const clicks = rangeSummary?.clicks ?? liveSummary?.clicks ?? rangeMetrics?.clicks ?? 0;
    const impressions = rangeSummary?.impressions ?? liveSummary?.impressions ?? rangeMetrics?.impressions ?? 0;
    const cr = clicks > 0 ? `${((conversions / clicks) * 100).toFixed(2)}%` : '0.00%';
    const events = rangeSummary?.events ?? liveSummary?.events ?? rangeMetrics?.events ?? data.activitiesDueToday;
    const revenue = rangeSummary?.revenue ?? liveSummary?.revenue ?? rangeMetrics?.revenue ?? Math.max(data.openDealsValue, 0);
    const payout = rangeSummary?.payout ?? liveSummary?.payout ?? rangeMetrics?.payout ?? 0;
    const profit = rangeSummary?.profit ?? liveSummary?.profit ?? rangeMetrics?.profit ?? (revenue - payout);

    return [
      { label: 'Clicks', value: String(clicks), trend: 'Live', icon: <MousePointerClick size={18} /> },
      { label: 'Conversions', value: String(conversions), trend: 'Live', icon: <Activity size={18} /> },
      { label: 'CR', value: cr, trend: 'Live', icon: <Percent size={18} /> },
      { label: 'Impressions', value: String(impressions), trend: 'Live', icon: <Eye size={18} /> },
      { label: 'Events', value: String(events), trend: 'Live', icon: <Sparkles size={18} /> },
      { label: 'Revenue', value: formatCurrency(revenue), trend: 'Live', icon: <CircleDollarSign size={18} /> },
      { label: 'Payout', value: formatCurrency(payout), trend: 'Live', icon: <CircleDollarSign size={18} /> },
      { label: 'Profit', value: formatCurrency(profit), trend: 'Live', icon: <CircleDollarSign size={18} /> },
    ];
  })();

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-slate-900">Performance Dashboard</h2>
            <p className="mt-1 text-sm text-slate-500">Welcome {displayName || displayEmail.split('@')[0]}. Live data is synced every 30 seconds.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ['today', 'Today'],
              ['yesterday', 'Yesterday'],
              ['lastWeek', 'Last Week'],
              ['thisMonth', 'This Month'],
              ['lastMonth', 'Last Month'],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setRange(value as typeof range)}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${
                  range === value ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-white p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-emerald-200 p-2.5 text-emerald-700">
              <CheckCircle size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-900">OffersMeta v2 Integration Live</p>
              <p className="mt-0.5 text-xs text-emerald-700">CRM modules are connected to live endpoints from the API catalog.</p>
            </div>
          </div>
          <a href="/api/docs" className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 px-3 py-2 text-xs font-semibold text-white transition-colors whitespace-nowrap">
            <BookOpenText size={14} />
            API Docs
          </a>
        </div>
      </div>

      {(rangeLoading || rangeError || rangeSummaryLoading || rangeSummaryError) && (
        <div className={`rounded-xl border px-4 py-2.5 text-sm ${rangeError ? 'border-amber-200 bg-amber-50 text-amber-900' : 'border-cyan-200 bg-cyan-50 text-cyan-900'}`}>
          {rangeLoading || rangeSummaryLoading ? 'Loading real data for selected range...' : (rangeError || rangeSummaryError || 'Unable to load range summary.')}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} label={kpi.label} value={kpi.value} trend={kpi.trend} icon={kpi.icon} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RevenueChart
          data={revenueData}
          title="Performance Trend"
          subtitle={`${rangeSubtitle[range]} based on live API data`}
          trendLabel="Real-time"
          totalLabel={chartTotalLabel}
        />

        <PipelineChart data={pipelineData} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-slate-100 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-900">Recent Contacts</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500">
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Company</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recentContacts.map((row) => (
                  <tr key={row.id} className="border-b border-slate-50">
                    <td className="py-2 text-slate-900">{row.name}</td>
                    <td className="py-2 text-slate-600">{row.email || 'N/A'}</td>
                    <td className="py-2 text-slate-600">{row.companyName}</td>
                    <td className="py-2 text-slate-600">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-100 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-900">Upcoming Tasks</h3>
          <ul className="mt-3 space-y-2">
            {data.upcomingTasks.map((task) => (
              <li key={task.id} className="rounded-xl border border-slate-100 px-3 py-2">
                <div className="text-sm font-medium text-slate-900">{task.title}</div>
                <div className="text-xs text-slate-500">Status: {task.status}</div>
                <div className="text-xs text-slate-500">Owner: {task.owner || 'N/A'}</div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <RoleDashboardsPanel />
    </div>
  );
}

