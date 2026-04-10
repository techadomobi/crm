import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchLiveReportSnapshot, hasAuthToken, LiveReportSnapshot } from '../api/liveDataAdapters';

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
          <span className="text-slate-400 text-xs">{d.label}</span>
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
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: segment.color }}></span>
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

export default function Reports() {
  const [snapshot, setSnapshot] = useState<LiveReportSnapshot>(EMPTY_SNAPSHOT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSnapshot = useCallback(async () => {
    if (!hasAuthToken()) {
      setSnapshot(EMPTY_SNAPSHOT);
      setError('Save a valid bearer token and login to load live reports.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchLiveReportSnapshot();
      setSnapshot(data);
    } catch {
      setSnapshot(EMPTY_SNAPSHOT);
      setError('Failed to load live report snapshot from Repowire API.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSnapshot();
  }, [loadSnapshot]);

  const summary = useMemo(
    () => [
      {
        label: 'Deals Won',
        value: snapshot.totals.won,
        sub: 'live offers status',
        color: 'text-emerald-600',
        border: 'border-emerald-100',
      },
      {
        label: 'Deals Lost',
        value: snapshot.totals.lost,
        sub: 'live offers status',
        color: 'text-red-500',
        border: 'border-red-100',
      },
      {
        label: 'Open Deals',
        value: snapshot.totals.open,
        sub: 'active live pipeline',
        color: 'text-blue-600',
        border: 'border-blue-100',
      },
      {
        label: 'Total Revenue',
        value: `$${snapshot.totals.totalRevenue.toLocaleString()}`,
        sub: 'live /conversion/totalRevenue',
        color: 'text-amber-600',
        border: 'border-amber-100',
      },
    ],
    [snapshot]
  );

  return (
    <div className="space-y-5 animate-fade-in">
      {error && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-900">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={() => void loadSnapshot()}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? 'Refreshing...' : 'Refresh Live Reports'}
        </button>
      </div>

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
          {snapshot.revenueSeries.length > 0 ? (
            <BarChart data={snapshot.revenueSeries} />
          ) : (
            <p className="text-sm text-slate-500">No live revenue series available yet.</p>
          )}
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-lg transition-all">
          <h3 className="text-slate-900 font-semibold text-sm mb-1">Pipeline by Stage</h3>
          <p className="text-slate-400 text-xs mb-5">Live offer status distribution</p>
          <DonutChart segments={snapshot.pipeline} />
        </div>
      </div>

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
                  <td colSpan={3} className="px-5 py-8 text-center text-sm text-slate-500">
                    {loading ? 'Loading live leaderboard...' : 'No live top rows returned yet.'}
                  </td>
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
    </div>
  );
}
