import { useEffect, useMemo, useState } from 'react';
import { DollarSign, Users, TrendingUp, Target, Phone, Mail, Calendar, CheckCircle, Clock, AlertCircle, ShieldAlert, Flag, Layers, ArrowUpRight } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import RevenueChart from '../components/RevenueChart';
import { deals, activities, pipelineStages, teamPerformance } from '../data/mockData';
import { repowireApi } from '../api/repowireApi';
import { ApiError } from '../api/httpClient';

const stageColors: Record<string, string> = {
  lead: 'bg-slate-200 text-slate-600',
  qualified: 'bg-blue-100 text-blue-700',
  proposal: 'bg-cyan-100 text-cyan-700',
  negotiation: 'bg-amber-100 text-amber-700',
  closed_won: 'bg-emerald-100 text-emerald-700',
  closed_lost: 'bg-red-100 text-red-600',
};

const stageLabel: Record<string, string> = {
  lead: 'Lead',
  qualified: 'Qualified',
  proposal: 'Proposal',
  negotiation: 'Negotiation',
  closed_won: 'Won',
  closed_lost: 'Lost',
};

const activityIcon: Record<string, React.ReactNode> = {
  call: <Phone size={13} />,
  email: <Mail size={13} />,
  meeting: <Calendar size={13} />,
  task: <CheckCircle size={13} />,
  note: <CheckCircle size={13} />,
};

const statusIcon: Record<string, React.ReactNode> = {
  completed: <CheckCircle size={13} className="text-emerald-500" />,
  pending: <Clock size={13} className="text-amber-500" />,
  overdue: <AlertCircle size={13} className="text-red-500" />,
};

const toNumber = (input: unknown): number | null => {
  if (typeof input === 'number' && Number.isFinite(input)) return input;
  if (typeof input === 'string') {
    const parsed = Number(input.replace(/[^\d.-]/g, ''));
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const findNumberDeep = (input: unknown): number | null => {
  const direct = toNumber(input);
  if (direct !== null) return direct;

  if (Array.isArray(input)) {
    for (const item of input) {
      const found = findNumberDeep(item);
      if (found !== null) return found;
    }
    return null;
  }

  if (input && typeof input === 'object') {
    for (const value of Object.values(input as Record<string, unknown>)) {
      const found = findNumberDeep(value);
      if (found !== null) return found;
    }
  }

  return null;
};

const findCountDeep = (input: unknown): number | null => {
  if (Array.isArray(input)) return input.length;

  if (input && typeof input === 'object') {
    const obj = input as Record<string, unknown>;
    const preferredKeys = ['count', 'total', 'totalCount', 'totalRecords', 'records'];

    for (const key of preferredKeys) {
      const value = obj[key];
      const n = toNumber(value);
      if (n !== null) return n;
      if (Array.isArray(value)) return value.length;
    }

    for (const value of Object.values(obj)) {
      const deep = findCountDeep(value);
      if (deep !== null) return deep;
    }
  }

  return null;
};

const formatCurrency = (value: number) => {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}k`;
  return `$${Math.round(value).toLocaleString()}`;
};

const formatPercentChange = (current: number, baseline: number) => {
  if (baseline === 0) return 0;
  const pct = ((current - baseline) / baseline) * 100;
  return Number.isFinite(pct) ? Number(pct.toFixed(1)) : 0;
};

const pad = (value: number) => String(value).padStart(2, '0');

const toDateKey = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const parsePossibleNumber = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[^\d.-]/g, ''));
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const extractNumericValue = (record: Record<string, unknown>) => {
  const preferredKeys = ['revenue', 'amount', 'value', 'payout', 'profit', 'totalRevenue'];
  for (const key of preferredKeys) {
    const parsed = parsePossibleNumber(record[key]);
    if (parsed !== null) return parsed;
  }
  for (const value of Object.values(record)) {
    const parsed = parsePossibleNumber(value);
    if (parsed !== null) return parsed;
  }
  return null;
};

const extractDateValue = (record: Record<string, unknown>) => {
  const preferredKeys = ['date', 'createdAt', 'updatedAt', 'conversionDate', 'eventDate', 'created_at'];
  for (const key of preferredKeys) {
    const raw = record[key];
    if (typeof raw === 'string' || raw instanceof Date) {
      const date = new Date(raw);
      if (!Number.isNaN(date.getTime())) return date;
    }
  }
  return null;
};

const buildFallbackRevenueSeries = () => ([
  { month: 'Oct', value: 142000 },
  { month: 'Nov', value: 168000 },
  { month: 'Dec', value: 195000 },
  { month: 'Jan', value: 178000 },
  { month: 'Feb', value: 220000 },
  { month: 'Mar', value: 245000 },
  { month: 'Apr', value: 213000 },
]);

const stageColorMap: Record<string, string> = {
  lead: '#94A3B8',
  qualified: '#60A5FA',
  proposal: '#34D399',
  negotiation: '#FBBF24',
  closed_won: '#10B981',
  closed_lost: '#F87171',
};

const derivePipelineFromRecords = (records: unknown[]) => {
  const buckets: Record<string, { count: number; value: number }> = {};

  for (const item of records) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) continue;
    const record = item as Record<string, unknown>;
    const stageName = String(record.stage ?? record.status ?? record.conversionStatus ?? record.state ?? 'other').toLowerCase().replace(/\s+/g, '_');
    const value = extractNumericValue(record) ?? 0;
    const bucket = buckets[stageName] ?? { count: 0, value: 0 };
    bucket.count += 1;
    bucket.value += value;
    buckets[stageName] = bucket;
  }

  return Object.entries(buckets).map(([stage, data]) => ({
    stage,
    count: data.count,
    value: data.value,
    color: stageColorMap[stage] ?? '#38BDF8',
  }));
};

export default function Dashboard() {
  const [showAllDeals, setShowAllDeals] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [kpiValues, setKpiValues] = useState({
    revenue: 1_360_000,
    conversions: 0,
    publishers: 0,
    advertisers: 0,
    source: 'mock' as 'mock' | 'live',
  });
  const [chartPoints, setChartPoints] = useState(buildFallbackRevenueSeries());
  const [livePipelineRows, setLivePipelineRows] = useState(pipelineStages);

  const recentDeals = showAllDeals ? deals : deals.slice(0, 5);
  const recentActivities = showAllActivities ? activities : activities.slice(0, 5);
  const pipelineTotal = pipelineStages.reduce((sum, stage) => sum + stage.value, 0);
  const weightedForecast = deals
    .filter((deal) => !['closed_won', 'closed_lost'].includes(deal.stage))
    .reduce((sum, deal) => sum + (deal.value * deal.probability) / 100, 0);
  const overdueActivities = activities.filter((activity) => activity.status === 'overdue').length;
  const completionRate = Math.round((activities.filter((activity) => activity.status === 'completed').length / activities.length) * 100);
  const fallbackPublishers = 128;
  const fallbackAdvertisers = 64;
  const fallbackConversions = 512;
  const upcomingMilestones = [
    { title: 'Acme renewal signature', owner: 'Alex R.', due: 'Apr 15', impact: '$84k ARR' },
    { title: 'TechFlow procurement review', owner: 'Jamie L.', due: 'Apr 18', impact: '$32k expansion' },
    { title: 'InfiniteScale AI demo', owner: 'Sam T.', due: 'Apr 21', impact: '$72k opportunity' },
  ];
  const riskHighlights = [
    { label: 'Overdue activities', value: `${overdueActivities}`, tone: 'text-red-600 bg-red-50 border-red-200' },
    { label: 'Single partner exposure', value: '32%', tone: 'text-amber-600 bg-amber-50 border-amber-200' },
    { label: 'Forecast confidence', value: 'High', tone: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  ];

  const loadLiveKpis = async () => {
    const token = localStorage.getItem('repowire_token')?.trim();

    if (!token) {
      setKpiValues((current) => ({
        ...current,
        revenue: 1_360_000,
        conversions: fallbackConversions,
        publishers: fallbackPublishers,
        advertisers: fallbackAdvertisers,
        source: 'mock',
      }));
      setLiveError(null);
      setChartPoints(buildFallbackRevenueSeries());
      setLivePipelineRows(pipelineStages);
      return;
    }

    setLiveError(null);

    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 6);
      const dateRange = { startDate: toDateKey(startDate), endDate: toDateKey(endDate) };

      const [summary, publishers, advertisers] = await Promise.all([
        repowireApi.conversionSummary(),
        repowireApi.publisherList({ page: 1, limit: 1 }),
        repowireApi.advertiserList({ page: 1, limit: 1 }),
      ]);

      let conversionList: unknown = [];
      let dateBasedConversions: unknown = [];

      try {
        [conversionList, dateBasedConversions] = await Promise.all([
          repowireApi.conversionList({ page: 1, ...dateRange }),
          repowireApi.conversionAccordingToDate({ startDate: dateRange.startDate }),
        ]);
      } catch {
        conversionList = [];
        dateBasedConversions = [];
      }

      const revenue = findNumberDeep(summary.totalRevenue) ?? 1_360_000;
      const conversions = findNumberDeep(summary.totalConversion) ?? fallbackConversions;
      const publishersCount = findCountDeep(publishers) ?? fallbackPublishers;
      const advertisersCount = findCountDeep(advertisers) ?? fallbackAdvertisers;

      const pipelineRecords = Array.isArray(conversionList)
        ? conversionList
        : Array.isArray((conversionList as Record<string, unknown>)?.data)
          ? ((conversionList as Record<string, unknown>).data as unknown[])
          : Array.isArray((conversionList as Record<string, unknown>)?.result)
            ? ((conversionList as Record<string, unknown>).result as unknown[])
            : [];

      const livePipeline = derivePipelineFromRecords(pipelineRecords);

      const timelineRecords = Array.isArray(dateBasedConversions)
        ? dateBasedConversions
        : Array.isArray((dateBasedConversions as Record<string, unknown>)?.data)
          ? ((dateBasedConversions as Record<string, unknown>).data as unknown[])
          : Array.isArray((dateBasedConversions as Record<string, unknown>)?.result)
            ? ((dateBasedConversions as Record<string, unknown>).result as unknown[])
            : pipelineRecords;

      const groupedByDate = new Map<string, number>();
      const allRecords = Array.isArray(timelineRecords) ? timelineRecords : [];

      for (const item of allRecords) {
        if (!item || typeof item !== 'object' || Array.isArray(item)) continue;
        const record = item as Record<string, unknown>;
        const date = extractDateValue(record);
        const value = extractNumericValue(record);
        if (!date || value === null) continue;
        const key = toDateKey(date);
        groupedByDate.set(key, (groupedByDate.get(key) ?? 0) + value);
      }

      const fallbackSeries = buildFallbackRevenueSeries();
      const liveSeries = Array.from({ length: 7 }).map((_, index) => {
        const day = new Date();
        day.setDate(day.getDate() - (6 - index));
        const key = toDateKey(day);
        const label = day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return {
          month: label,
          value: groupedByDate.get(key) ?? fallbackSeries[index].value,
        };
      });

      setChartPoints(liveSeries);
      setLivePipelineRows(livePipeline.length > 0 ? livePipeline : pipelineStages);

      setKpiValues({
        revenue,
        conversions,
        publishers: publishersCount,
        advertisers: advertisersCount,
        source: 'live',
      });
    } catch (error) {
      if (error instanceof ApiError && error.status !== 401 && error.status !== 403) {
        setLiveError(`Backend request failed (${error.status}). Try refreshing after saving a token in Settings.`);
      } else {
        setLiveError('Live dashboard data is unavailable right now. Showing mock KPI values.');
      }

      setKpiValues({
        revenue: 1_360_000,
        conversions: fallbackConversions,
        publishers: fallbackPublishers,
        advertisers: fallbackAdvertisers,
        source: 'mock',
      });
      setChartPoints(buildFallbackRevenueSeries());
      setLivePipelineRows(pipelineStages);
    } finally {
      // No loading indicator is shown in the UI.
    }
  };

  useEffect(() => {
    if (localStorage.getItem('repowire_token')?.trim()) {
      loadLiveKpis();
    } else {
      setLiveError(null);
    }
  }, []);

  const kpiCards = useMemo(
    () => [
      {
        label: 'Total Revenue',
        value: formatCurrency(kpiValues.revenue),
        change: formatPercentChange(kpiValues.revenue, 1_360_000),
        changeLabel: kpiValues.source === 'live' ? 'live from /conversion/totalRevenue' : 'mock fallback',
        icon: <DollarSign size={20} />,
        color: 'blue' as const,
      },
      {
        label: 'Publishers',
        value: String(kpiValues.publishers),
        change: formatPercentChange(kpiValues.publishers, fallbackPublishers),
        changeLabel: kpiValues.source === 'live' ? 'live from /publicher/publisherList' : 'mock fallback',
        icon: <Users size={20} />,
        color: 'green' as const,
      },
      {
        label: 'Advertisers',
        value: String(kpiValues.advertisers),
        change: formatPercentChange(kpiValues.advertisers, fallbackAdvertisers),
        changeLabel: kpiValues.source === 'live' ? 'live from /advertiser/advertiserList' : 'mock fallback',
        icon: <TrendingUp size={20} />,
        color: 'amber' as const,
      },
      {
        label: 'Total Conversions',
        value: kpiValues.conversions.toLocaleString(),
        change: formatPercentChange(kpiValues.conversions, fallbackConversions),
        changeLabel: kpiValues.source === 'live' ? 'live from /conversion/totalConversion' : 'mock fallback',
        icon: <Target size={20} />,
        color: 'rose' as const,
      },
    ],
    [kpiValues]
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {liveError && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-900">
          {liveError}
        </div>
      )}

      {notice && (
        <div className="rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-2.5 text-sm text-cyan-900 flex items-center justify-between">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="text-xs font-semibold text-cyan-700 hover:text-cyan-900">Dismiss</button>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, index) => (
          <StatsCard
            key={card.label}
            label={card.label}
            value={card.value}
            change={card.change}
            changeLabel={card.changeLabel}
            icon={card.icon}
            color={card.color}
            delay={index * 80}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <RevenueChart
            data={chartPoints}
            title={kpiValues.source === 'live' ? 'Live Revenue Overview' : 'Revenue Overview'}
            subtitle={kpiValues.source === 'live' ? 'Live conversion data from backend' : 'Oct 2025 – Apr 2026'}
            trendLabel={kpiValues.source === 'live' ? 'Live backend data' : '+12.4% MoM'}
            totalLabel={kpiValues.source === 'live' ? 'Total from live conversion data' : 'Total this period'}
          />
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-lg transition-all duration-300">
          <div className="flex items-start justify-between gap-3 mb-1">
            <div>
              <h3 className="text-slate-900 font-semibold text-sm">Pipeline Funnel</h3>
              <p className="text-slate-400 text-xs">{kpiValues.source === 'live' ? 'Live conversion stage distribution' : 'Current stage distribution'}</p>
            </div>
            <button
              onClick={() => loadLiveKpis()}
              className="rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Sync
            </button>
          </div>
          <div className="space-y-3">
            {livePipelineRows.map((stage) => {
              const pct = (stage.value / Math.max(...livePipelineRows.map((row) => row.value))) * 100;
              return (
                <div key={stage.stage}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-600 text-xs font-medium capitalize">{stage.stage.replace(/_/g, ' ')}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-xs">{stage.count}</span>
                      <span className="text-slate-900 text-xs font-semibold">${(stage.value / 1000).toFixed(0)}k</span>
                    </div>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${pct}%`, backgroundColor: stage.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 text-xs">Total Pipeline Value</span>
              <span className="text-slate-900 font-bold text-sm">${(livePipelineRows.reduce((sum, row) => sum + row.value, 0) / 1_000_000).toFixed(2)}M</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div>
              <h3 className="text-slate-900 font-semibold text-sm">Recent Deals</h3>
              <p className="text-slate-400 text-xs">Latest pipeline activity</p>
            </div>
            <button
              onClick={() => {
                setShowAllDeals((current) => !current);
                setNotice(showAllDeals ? 'Showing top 5 deals.' : 'Showing all recent deals.');
              }}
              className="text-blue-600 text-xs font-medium hover:text-blue-700 transition-colors"
            >
              {showAllDeals ? 'Show less' : 'View all'}
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {recentDeals.map((deal) => (
              <div key={deal.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-600 text-xs font-bold flex-shrink-0">
                  {deal.contact.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-800 text-sm font-medium truncate">{deal.title}</p>
                  <p className="text-slate-400 text-xs">{deal.company}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-slate-900 text-sm font-semibold">${(deal.value / 1000).toFixed(0)}k</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${stageColors[deal.stage]}`}>
                    {stageLabel[deal.stage]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div>
              <h3 className="text-slate-900 font-semibold text-sm">Recent Activities</h3>
              <p className="text-slate-400 text-xs">Calls, emails, meetings</p>
            </div>
            <button
              onClick={() => {
                setShowAllActivities((current) => !current);
                setNotice(showAllActivities ? 'Showing top 5 activities.' : 'Showing all activities.');
              }}
              className="text-blue-600 text-xs font-medium hover:text-blue-700 transition-colors"
            >
              {showAllActivities ? 'Show less' : 'View all'}
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors cursor-pointer">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'call' ? 'bg-blue-50 text-blue-600' :
                  activity.type === 'email' ? 'bg-cyan-50 text-cyan-600' :
                  activity.type === 'meeting' ? 'bg-emerald-50 text-emerald-600' :
                  'bg-amber-50 text-amber-600'
                }`}>
                  {activityIcon[activity.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-800 text-sm font-medium truncate">{activity.title}</p>
                  <p className="text-slate-400 text-xs">{activity.contact} · {activity.assignee}</p>
                </div>
                <div className="flex-shrink-0">
                  {statusIcon[activity.status]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-slate-900 font-semibold text-sm">Team Performance</h3>
            <p className="text-slate-400 text-xs">Revenue vs. target this quarter</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rep</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Deals</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Revenue</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Target</th>
                <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {teamPerformance.map((rep, idx) => {
                const pct = Math.min((rep.revenue / rep.target) * 100, 100);
                return (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                          {rep.name[0]}
                        </div>
                        <span className="text-slate-800 text-sm font-medium">{rep.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">{rep.deals}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right text-slate-900 text-sm font-semibold">${(rep.revenue / 1000).toFixed(0)}k</td>
                    <td className="px-5 py-3.5 text-right text-slate-400 text-sm">${(rep.target / 1000).toFixed(0)}k</td>
                    <td className="px-5 py-3.5 w-40">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${pct >= 75 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-400'}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-slate-500 text-xs w-8 text-right">{Math.round(pct)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-5">
        <div className="bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div>
              <h3 className="text-slate-900 font-semibold text-sm">Forecast & Pipeline Intelligence</h3>
              <p className="text-slate-400 text-xs">Weighted projections, risk posture, and stage velocity</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 px-5 py-4 bg-slate-50/80 border-b border-slate-100">
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <p className="text-xs text-slate-500">Weighted Forecast</p>
              <p className="text-lg font-bold text-slate-900 mt-1">${(weightedForecast / 1000).toFixed(0)}k</p>
              <p className="text-xs text-emerald-600 mt-1">+9% vs prior cycle</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <p className="text-xs text-slate-500">Pipeline Coverage</p>
              <p className="text-lg font-bold text-slate-900 mt-1">${(pipelineTotal / 1e6).toFixed(2)}M</p>
              <p className="text-xs text-blue-600 mt-1">3.1x quarterly target</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <p className="text-xs text-slate-500">Activity Completion</p>
              <p className="text-lg font-bold text-slate-900 mt-1">{completionRate}%</p>
              <p className="text-xs text-cyan-600 mt-1">Operational rhythm healthy</p>
            </div>
          </div>
          <div className="divide-y divide-slate-50">
            {pipelineStages.map((stage) => (
              <div key={stage.stage} className="px-5 py-3.5 flex items-center gap-3 hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                  <Layers size={14} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">{stage.stage}</p>
                  <p className="text-xs text-slate-400">{stage.count} deals in stage</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">${(stage.value / 1000).toFixed(0)}k</p>
                  <p className="text-xs text-slate-400">{Math.round((stage.value / pipelineTotal) * 100)}% of pipeline</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert size={16} className="text-rose-600" />
              <h3 className="text-slate-900 font-semibold text-sm">Risk Radar</h3>
            </div>
            <div className="space-y-2.5">
              {riskHighlights.map((risk) => (
                <div key={risk.label} className={`rounded-xl border px-3 py-2.5 flex items-center justify-between ${risk.tone}`}>
                  <span className="text-xs font-semibold">{risk.label}</span>
                  <span className="text-sm font-bold">{risk.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <Flag size={16} className="text-blue-600" />
              <h3 className="text-slate-900 font-semibold text-sm">Upcoming Milestones</h3>
            </div>
            <div className="space-y-3">
              {upcomingMilestones.map((milestone) => (
                <div key={milestone.title} className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
                  <p className="text-sm font-semibold text-slate-800">{milestone.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Owner: {milestone.owner} · Due: {milestone.due}</p>
                  <p className="text-xs text-blue-600 mt-1 inline-flex items-center gap-1">
                    <ArrowUpRight size={12} />
                    {milestone.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
