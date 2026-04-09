import { revenueData, pipelineStages, teamPerformance, deals } from '../data/mockData';

function BarChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="flex items-end gap-3 h-36">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
          <span className="text-slate-500 text-xs">${(d.value / 1000).toFixed(0)}k</span>
          <div
            className="w-full rounded-t-lg transition-all duration-700 hover:opacity-80"
            style={{ height: `${(d.value / max) * 96}px`, backgroundColor: d.color }}
          />
          <span className="text-slate-400 text-xs">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ segments }: { segments: { label: string; value: number; color: string }[] }) {
  const total = segments.reduce((s, d) => s + d.value, 0);
  let cumulative = 0;
  const r = 56;
  const cx = 70;
  const cy = 70;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 140 140" className="w-28 h-28 flex-shrink-0">
        {segments.map((seg, i) => {
          const pct = seg.value / total;
          const offset = circumference * (1 - pct);
          const rotation = cumulative * 360;
          cumulative += pct;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth="18"
              strokeDasharray={`${circumference * pct} ${circumference * (1 - pct)}`}
              strokeDashoffset={offset}
              transform={`rotate(${rotation - 90} ${cx} ${cy})`}
              className="transition-all duration-700 hover:opacity-80 cursor-pointer"
            />
          );
        })}
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0F172A">${(total / 1e6).toFixed(2)}M</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" fill="#94A3B8">Total</text>
      </svg>
      <div className="space-y-2 flex-1">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }}></span>
              <span className="text-slate-600 text-xs">{seg.label}</span>
            </div>
            <span className="text-slate-900 text-xs font-semibold">${(seg.value / 1000).toFixed(0)}k</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Reports() {
  const revenueBarData = revenueData.map(d => ({
    label: d.month,
    value: d.value,
    color: '#3B82F6',
  }));

  const stageDonutData = pipelineStages.map(s => ({
    label: s.stage,
    value: s.value,
    color: s.color,
  }));

  const wonDeals = deals.filter(d => d.stage === 'closed_won');
  const lostDeals = deals.filter(d => d.stage === 'closed_lost');
  const openDeals = deals.filter(d => !['closed_won', 'closed_lost'].includes(d.stage));
  const reportCatalog = [
    { name: 'Campaign Profitability', cadence: 'Daily', owner: 'Growth Ops', status: 'Healthy' },
    { name: 'Publisher Quality Score', cadence: 'Weekly', owner: 'Partner Team', status: 'Review' },
    { name: 'Advertiser SLA Trend', cadence: 'Daily', owner: 'Account Team', status: 'Healthy' },
    { name: 'Postback Delivery Audit', cadence: 'Hourly', owner: 'Engineering', status: 'Alert' },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Deals Won', value: wonDeals.length, sub: `$${(wonDeals.reduce((s,d) => s+d.value, 0)/1000).toFixed(0)}k revenue`, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
          { label: 'Deals Lost', value: lostDeals.length, sub: `$${(lostDeals.reduce((s,d) => s+d.value, 0)/1000).toFixed(0)}k lost`, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100' },
          { label: 'In Progress', value: openDeals.length, sub: `$${(openDeals.reduce((s,d) => s+d.value, 0)/1000).toFixed(0)}k pipeline`, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
        ].map((s, i) => (
          <div key={i} className={`bg-white rounded-2xl p-5 border ${s.border} hover:shadow-md transition-all`}>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-slate-700 font-medium text-sm mt-1">{s.label}</p>
            <p className="text-slate-400 text-xs mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-lg transition-all">
          <h3 className="text-slate-900 font-semibold text-sm mb-1">Monthly Revenue</h3>
          <p className="text-slate-400 text-xs mb-5">6-month trend</p>
          <BarChart data={revenueBarData} />
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-lg transition-all">
          <h3 className="text-slate-900 font-semibold text-sm mb-1">Pipeline by Stage</h3>
          <p className="text-slate-400 text-xs mb-5">Value distribution</p>
          <DonutChart segments={stageDonutData} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-slate-900 font-semibold text-sm">Team Leaderboard</h3>
          <p className="text-slate-400 text-xs">Q2 2026 performance ranking</p>
        </div>
        <div className="divide-y divide-slate-50">
          {teamPerformance.sort((a, b) => b.revenue - a.revenue).map((rep, idx) => {
            const pct = Math.min((rep.revenue / rep.target) * 100, 100);
            const rankColors = ['text-amber-500', 'text-slate-400', 'text-amber-700', 'text-slate-400'];
            const rankBg = ['bg-amber-50', 'bg-slate-50', 'bg-amber-50/50', 'bg-slate-50'];
            return (
              <div key={idx} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                <div className={`w-8 h-8 rounded-xl ${rankBg[idx]} flex items-center justify-center`}>
                  <span className={`text-sm font-bold ${rankColors[idx]}`}>#{idx + 1}</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                  {rep.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-slate-900 text-sm font-semibold">{rep.name}</p>
                    <p className="text-slate-900 text-sm font-bold">${(rep.revenue / 1000).toFixed(0)}k</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${pct >= 75 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-400'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-slate-400 text-xs w-16 text-right">{Math.round(pct)}% of ${(rep.target / 1000).toFixed(0)}k</span>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-slate-900 font-semibold text-sm">{rep.deals}</p>
                  <p className="text-slate-400 text-xs">deals</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-5">
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-slate-900 font-semibold text-sm">Report Catalog Health</h3>
            <p className="text-slate-400 text-xs">Operational status of high-priority reporting pipelines</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Report</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cadence</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Owner</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {reportCatalog.map((report) => (
                  <tr key={report.name} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-semibold text-slate-800">{report.name}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-600">{report.cadence}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-600">{report.owner}</td>
                    <td className="px-5 py-3.5 text-right">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          report.status === 'Healthy'
                            ? 'bg-emerald-50 text-emerald-700'
                            : report.status === 'Review'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg transition-all">
            <h3 className="text-slate-900 font-semibold text-sm">Anomaly Feed</h3>
            <div className="mt-3 space-y-2">
              {[
                'Click-to-conversion rate dropped 11% in APAC mobile channel',
                'Postback retries increased for one advertiser endpoint',
                'Sampling report variance above threshold for 2 campaigns',
              ].map((item) => (
                <p key={item} className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-700">{item}</p>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg transition-all">
            <h3 className="text-slate-900 font-semibold text-sm">Actions Recommended</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="rounded-lg bg-slate-50 px-3 py-2">Run cohort deep-dive for campaigns with declining retention.</li>
              <li className="rounded-lg bg-slate-50 px-3 py-2">Enable alert escalation for postback failures over 3% threshold.</li>
              <li className="rounded-lg bg-slate-50 px-3 py-2">Schedule weekly review with partner team for quality anomalies.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
