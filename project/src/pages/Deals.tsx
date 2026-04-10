import { useCallback, useEffect, useState } from 'react';
import { Plus, TrendingUp, DollarSign, Target, Award, MoreHorizontal, Calendar } from 'lucide-react';
import { Deal } from '../types';
import { fetchLiveDeals, hasAuthToken } from '../api/liveDataAdapters';

type Stage = Deal['stage'];

const stageConfig: { id: Stage; label: string; color: string; bg: string; border: string; dot: string }[] = [
  { id: 'lead', label: 'Lead', color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200', dot: 'bg-slate-400' },
  { id: 'qualified', label: 'Qualified', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500' },
  { id: 'proposal', label: 'Proposal', color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-200', dot: 'bg-cyan-500' },
  { id: 'negotiation', label: 'Negotiation', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-500' },
  { id: 'closed_won', label: 'Closed Won', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  { id: 'closed_lost', label: 'Closed Lost', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-400' },
];

function DealCard({ deal, onAction }: { deal: Deal; onAction: (message: string) => void }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 p-3.5 cursor-pointer hover:shadow-md hover:border-blue-200 transition-all duration-200 group`}>
      <div className="flex items-start justify-between mb-2">
        <p className="text-slate-900 text-sm font-semibold leading-tight group-hover:text-blue-600 transition-colors line-clamp-2 flex-1">{deal.title}</p>
        <button
          onClick={(event) => {
            event.stopPropagation();
            onAction(`Quick actions opened for ${deal.title}.`);
          }}
          className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition-all ml-1 flex-shrink-0"
        >
          <MoreHorizontal size={13} />
        </button>
      </div>
      <p className="text-slate-400 text-xs mb-3">{deal.company}</p>
      <div className="flex items-center justify-between">
        <span className="text-slate-900 font-bold text-sm">${(deal.value / 1000).toFixed(0)}k</span>
        <div className="flex items-center gap-1">
          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-blue-500" style={{ width: `${deal.probability}%` }} />
          </div>
          <span className="text-slate-400 text-xs">{deal.probability}%</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-slate-100">
        <div className="flex items-center gap-1 text-slate-400 text-xs">
          <Calendar size={10} />
          <span>{deal.closeDate.slice(5)}</span>
        </div>
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
          {deal.assignee[0]}
        </div>
      </div>
    </div>
  );
}

export default function Deals() {
  const [dealItems, setDealItems] = useState<Deal[]>([]);
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadDeals = useCallback(async () => {
    if (!hasAuthToken()) {
      setDealItems([]);
      setLoadError('Save a valid bearer token and login to load live deals.');
      return;
    }

    setLoading(true);
    setLoadError(null);
    try {
      const rows = await fetchLiveDeals();
      setDealItems(rows);
    } catch {
      setLoadError('Failed to load live deal data from Repowire API.');
      setDealItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDeals();
  }, [loadDeals]);

  const totalOpen = dealItems.filter(d => !['closed_won', 'closed_lost'].includes(d.stage)).reduce((s, d) => s + d.value, 0);
  const totalWon = dealItems.filter(d => d.stage === 'closed_won').reduce((s, d) => s + d.value, 0);
  const avgDeal = dealItems.length ? Math.round(dealItems.reduce((s, d) => s + d.value, 0) / dealItems.length) : 0;
  const closedDealsCount = dealItems.filter(d => ['closed_won', 'closed_lost'].includes(d.stage)).length;
  const winRate = closedDealsCount ? Math.round((dealItems.filter(d => d.stage === 'closed_won').length / closedDealsCount) * 100) : 0;
  const weightedPipeline = dealItems
    .filter((deal) => !['closed_won', 'closed_lost'].includes(deal.stage))
    .reduce((sum, deal) => sum + (deal.value * deal.probability) / 100, 0);
  const stageRows = stageConfig.map((stage) => {
    const rows = dealItems.filter((deal) => deal.stage === stage.id);
    const stageValue = rows.reduce((sum, deal) => sum + deal.value, 0);
    const avgProbability = rows.length ? Math.round(rows.reduce((sum, deal) => sum + deal.probability, 0) / rows.length) : 0;
    return { ...stage, count: rows.length, stageValue, avgProbability };
  });

  return (
    <div className="space-y-5 animate-fade-in">
      {notice && (
        <div className="rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-2.5 text-sm text-cyan-900 flex items-center justify-between">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="text-xs font-semibold text-cyan-700 hover:text-cyan-900">Dismiss</button>
        </div>
      )}

      {loadError && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-900">
          {loadError}
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Open Pipeline', value: `$${(totalOpen / 1000).toFixed(0)}k`, icon: <TrendingUp size={18} />, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Closed Won', value: `$${(totalWon / 1000).toFixed(0)}k`, icon: <DollarSign size={18} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Avg Deal Size', value: `$${(avgDeal / 1000).toFixed(0)}k`, icon: <Target size={18} />, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Win Rate', value: `${winRate}%`, icon: <Award size={18} />, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 hover:shadow-md transition-all flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center flex-shrink-0`}>{s.icon}</div>
            <div>
              <p className="text-slate-900 font-bold text-xl leading-tight">{s.value}</p>
              <p className="text-slate-500 text-xs">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1">
          {(['kanban', 'list'] as const).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                view === v ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            void loadDeals();
            setNotice('Refreshing live deals...');
          }}
          disabled={loading}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-2 rounded-xl transition-all active:scale-95 shadow-sm disabled:opacity-60"
        >
          <Plus size={14} /> {loading ? 'Refreshing...' : 'Refresh Live'}
        </button>
      </div>

      {view === 'kanban' ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 pb-4">
          {stageConfig.map(stage => {
            const stageDeals = dealItems.filter(d => d.stage === stage.id);
            const stageTotal = stageDeals.reduce((s, d) => s + d.value, 0);
            return (
              <div key={stage.id} className="flex flex-col">
                <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl ${stage.bg} border ${stage.border} mb-3`}>
                  <span className={`w-2 h-2 rounded-full ${stage.dot}`}></span>
                  <span className={`text-xs font-semibold ${stage.color} flex-1`}>{stage.label}</span>
                  <span className="text-xs text-slate-400 bg-white/70 px-1.5 py-0.5 rounded-full">{stageDeals.length}</span>
                </div>
                <div className="space-y-2">
                  {stageDeals.length === 0 && (
                    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs text-slate-500">
                      No live deals in this stage.
                    </div>
                  )}
                  {stageDeals.map(deal => <DealCard key={deal.id} deal={deal} onAction={setNotice} />)}
                </div>
                {stageTotal > 0 && (
                  <div className="mt-2 px-3 py-2 bg-white/60 rounded-xl border border-dashed border-slate-200">
                    <p className="text-slate-500 text-xs text-center">${(stageTotal / 1000).toFixed(0)}k total</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Deal</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Stage</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Value</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Probability</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Close Date</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Assignee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {dealItems.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-sm text-slate-500">
                    {loading ? 'Loading live deals...' : 'No live deals available.'}
                  </td>
                </tr>
              )}
              {dealItems.map(deal => {
                const stage = stageConfig.find(s => s.id === deal.stage)!;
                return (
                  <tr key={deal.id} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                    <td className="px-5 py-3.5">
                      <p className="text-slate-900 text-sm font-medium group-hover:text-blue-600 transition-colors">{deal.title}</p>
                      <p className="text-slate-400 text-xs">{deal.company}</p>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${stage.bg} ${stage.color} border ${stage.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${stage.dot}`}></span>
                        {stage.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right font-semibold text-slate-900 text-sm">${deal.value.toLocaleString()}</td>
                    <td className="px-5 py-3.5 text-right hidden lg:table-cell">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-blue-500" style={{ width: `${deal.probability}%` }} />
                        </div>
                        <span className="text-slate-500 text-xs">{deal.probability}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right text-slate-400 text-sm hidden lg:table-cell">{deal.closeDate}</td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">{deal.assignee[0]}</div>
                        <span className="text-slate-600 text-xs">{deal.assignee}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-5">
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-slate-900 font-semibold text-sm">Stage Conversion Matrix</h3>
            <p className="text-slate-400 text-xs">Stage volume, value concentration, and probability quality</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stage</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Deals</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Value</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Probability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {stageRows.map((stage) => (
                  <tr key={stage.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${stage.bg} ${stage.color} border ${stage.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${stage.dot}`}></span>
                        {stage.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right text-sm text-slate-700">{stage.count}</td>
                    <td className="px-5 py-3.5 text-right text-sm font-semibold text-slate-900">${(stage.stageValue / 1000).toFixed(0)}k</td>
                    <td className="px-5 py-3.5 text-right text-sm text-slate-700">{stage.avgProbability}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg transition-all">
            <h3 className="text-slate-900 font-semibold text-sm">Forecast Summary</h3>
            <div className="mt-3 space-y-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Weighted Pipeline</p>
                <p className="text-lg font-bold text-slate-900 mt-1">${(weightedPipeline / 1000).toFixed(0)}k</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Avg Deal Probability</p>
                <p className="text-lg font-bold text-slate-900 mt-1">
                  {Math.round(dealItems.reduce((sum, deal) => sum + deal.probability, 0) / dealItems.length)}%
                </p>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                <p className="text-xs text-emerald-700">Momentum</p>
                <p className="text-sm font-semibold text-emerald-800 mt-1">Healthy close velocity in negotiation and proposal stages.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg transition-all">
            <h3 className="text-slate-900 font-semibold text-sm">Actions This Week</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="rounded-lg bg-slate-50 px-3 py-2">Review close plan for top 3 negotiation deals</li>
              <li className="rounded-lg bg-slate-50 px-3 py-2">Run pricing alignment check on proposal stage</li>
              <li className="rounded-lg bg-slate-50 px-3 py-2">Re-engage dormant leads older than 30 days</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
