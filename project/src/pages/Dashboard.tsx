import { useState } from 'react';
import { DollarSign, Users, TrendingUp, Target, Phone, Mail, Calendar, CheckCircle, Clock, AlertCircle, ShieldAlert, Flag, Layers, ArrowUpRight } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import RevenueChart from '../components/RevenueChart';
import { deals, activities, pipelineStages, teamPerformance } from '../data/mockData';

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

export default function Dashboard() {
  const [showAllDeals, setShowAllDeals] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const recentDeals = showAllDeals ? deals : deals.slice(0, 5);
  const recentActivities = showAllActivities ? activities : activities.slice(0, 5);
  const maxPipelineValue = Math.max(...pipelineStages.map(s => s.value));
  const pipelineTotal = pipelineStages.reduce((sum, stage) => sum + stage.value, 0);
  const weightedForecast = deals
    .filter((deal) => !['closed_won', 'closed_lost'].includes(deal.stage))
    .reduce((sum, deal) => sum + (deal.value * deal.probability) / 100, 0);
  const overdueActivities = activities.filter((activity) => activity.status === 'overdue').length;
  const completionRate = Math.round((activities.filter((activity) => activity.status === 'completed').length / activities.length) * 100);
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

  return (
    <div className="space-y-6 animate-fade-in">
      {notice && (
        <div className="rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-2.5 text-sm text-cyan-900 flex items-center justify-between">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="text-xs font-semibold text-cyan-700 hover:text-cyan-900">Dismiss</button>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Total Revenue" value="$1.36M" change={12.4} changeLabel="vs last quarter" icon={<DollarSign size={20} />} color="blue" delay={0} />
        <StatsCard label="Active Contacts" value="248" change={8.1} changeLabel="24 new this month" icon={<Users size={20} />} color="green" delay={80} />
        <StatsCard label="Open Deals" value="34" change={-3.2} changeLabel="vs last month" icon={<TrendingUp size={20} />} color="amber" delay={160} />
        <StatsCard label="Win Rate" value="67.4%" change={5.8} changeLabel="pipeline performance" icon={<Target size={20} />} color="rose" delay={240} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-lg transition-all duration-300">
          <h3 className="text-slate-900 font-semibold text-sm mb-1">Pipeline Funnel</h3>
          <p className="text-slate-400 text-xs mb-5">Current stage distribution</p>
          <div className="space-y-3">
            {pipelineStages.map((stage) => {
              const pct = (stage.value / maxPipelineValue) * 100;
              return (
                <div key={stage.stage}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-600 text-xs font-medium">{stage.stage}</span>
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
              <span className="text-slate-900 font-bold text-sm">$2.70M</span>
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
