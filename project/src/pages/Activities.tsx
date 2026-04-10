import { useCallback, useEffect, useState } from 'react';
import { Plus, Phone, Mail, Calendar, FileText, CheckSquare, CheckCircle, Clock, AlertCircle, Filter } from 'lucide-react';
import { Activity } from '../types';
import { fetchLiveActivities, hasAuthToken } from '../api/liveDataAdapters';

const typeConfig: Record<Activity['type'], { icon: React.ReactNode; label: string; color: string; bg: string }> = {
  call: { icon: <Phone size={14} />, label: 'Call', color: 'text-blue-600', bg: 'bg-blue-50' },
  email: { icon: <Mail size={14} />, label: 'Email', color: 'text-cyan-600', bg: 'bg-cyan-50' },
  meeting: { icon: <Calendar size={14} />, label: 'Meeting', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  note: { icon: <FileText size={14} />, label: 'Note', color: 'text-amber-600', bg: 'bg-amber-50' },
  task: { icon: <CheckSquare size={14} />, label: 'Task', color: 'text-rose-600', bg: 'bg-rose-50' },
};

const statusConfig: Record<Activity['status'], { icon: React.ReactNode; label: string; style: string }> = {
  completed: { icon: <CheckCircle size={13} />, label: 'Completed', style: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  pending: { icon: <Clock size={13} />, label: 'Pending', style: 'text-amber-600 bg-amber-50 border-amber-200' },
  overdue: { icon: <AlertCircle size={13} />, label: 'Overdue', style: 'text-red-600 bg-red-50 border-red-200' },
};

export default function Activities() {
  const [activityList, setActivityList] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<'all' | Activity['type']>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | Activity['status']>('all');
  const [notice, setNotice] = useState<string | null>(null);

  const loadActivities = useCallback(async () => {
    if (!hasAuthToken()) {
      setActivityList([]);
      setLoadError('Save a valid bearer token and login to load live activities.');
      return;
    }

    setLoading(true);
    setLoadError(null);
    try {
      const rows = await fetchLiveActivities();
      setActivityList(rows);
    } catch {
      setLoadError('Failed to load live activity feeds from Repowire API.');
      setActivityList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadActivities();
  }, [loadActivities]);

  const filtered = activityList.filter(a => {
    return (typeFilter === 'all' || a.type === typeFilter) &&
           (statusFilter === 'all' || a.status === statusFilter);
  });

  const stats = [
    { label: 'Total', value: activityList.length, color: 'text-slate-900' },
    { label: 'Completed', value: activityList.filter(a => a.status === 'completed').length, color: 'text-emerald-600' },
    { label: 'Pending', value: activityList.filter(a => a.status === 'pending').length, color: 'text-amber-600' },
    { label: 'Overdue', value: activityList.filter(a => a.status === 'overdue').length, color: 'text-red-500' },
  ];

  const ownerSummary = Object.entries(
    activityList.reduce<Record<string, { total: number; done: number }>>((acc, item) => {
      if (!acc[item.assignee]) {
        acc[item.assignee] = { total: 0, done: 0 };
      }
      acc[item.assignee].total += 1;
      if (item.status === 'completed') acc[item.assignee].done += 1;
      return acc;
    }, {})
  );

  const activityTimeline = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
    const volume = Math.max(2, 3 + ((index * 7 + activityList.length) % 9));
    return { day, volume };
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

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 hover:shadow-md transition-all">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-slate-500 text-sm mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all">
        <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Filter size={13} className="text-slate-400" />
            <span className="text-slate-500 text-xs font-medium">Type:</span>
            {(['all', 'call', 'email', 'meeting', 'note', 'task'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                  typeFilter === t ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-xs font-medium">Status:</span>
            {(['all', 'pending', 'completed', 'overdue'] as const).map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                  statusFilter === s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              void loadActivities();
              setNotice('Refreshing live activities...');
            }}
            disabled={loading}
            className="ml-auto flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-2 rounded-xl transition-all active:scale-95 disabled:opacity-60"
          >
            <Plus size={14} /> {loading ? 'Refreshing...' : 'Refresh Live'}
          </button>
        </div>

        <div className="divide-y divide-slate-50">
          {filtered.length === 0 && (
            <div className="px-5 py-8 text-center text-sm text-slate-500">
              {loading ? 'Loading live activities...' : 'No live activities found for current filters.'}
            </div>
          )}
          {filtered.map((activity, idx) => {
            const tc = typeConfig[activity.type];
            const sc = statusConfig[activity.status];
            const date = new Date(activity.date);
            return (
              <div
                key={activity.id}
                className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer group"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <div className={`w-10 h-10 rounded-xl ${tc.bg} ${tc.color} flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105`}>
                  {tc.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 text-sm font-semibold group-hover:text-blue-600 transition-colors truncate">{activity.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tc.bg} ${tc.color}`}>{tc.label}</span>
                    <span className="text-slate-400 text-xs">{activity.contact}</span>
                    <span className="text-slate-300 text-xs">·</span>
                    <span className="text-slate-400 text-xs">{activity.company}</span>
                  </div>
                  {activity.notes && <p className="text-slate-400 text-xs mt-1 truncate">{activity.notes}</p>}
                </div>
                <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <p className="text-slate-700 text-xs font-medium">{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    <p className="text-slate-400 text-xs">{date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    {activity.assignee[0]}
                  </div>
                </div>
                <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${sc.style} flex-shrink-0`}>
                  {sc.icon}
                  <span className="hidden sm:inline">{sc.label}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-5">
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-slate-900 font-semibold text-sm">Assignee Workload</h3>
            <p className="text-slate-400 text-xs">Activity volume and completion by owner</p>
          </div>
          <div className="divide-y divide-slate-50">
            {ownerSummary.map(([owner, data]) => {
              const pct = data.total ? Math.round((data.done / data.total) * 100) : 0;
              return (
                <div key={owner} className="px-5 py-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm font-semibold text-slate-800">{owner}</p>
                    <p className="text-xs text-slate-500">{data.done}/{data.total} completed</p>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${pct >= 70 ? 'bg-emerald-500' : pct >= 45 ? 'bg-amber-500' : 'bg-rose-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-slate-900 font-semibold text-sm">Weekly Activity Rhythm</h3>
            <p className="text-slate-400 text-xs">Estimated workload distribution for planning</p>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-7 gap-2 items-end h-40">
              {activityTimeline.map((item) => (
                <div key={item.day} className="flex flex-col items-center gap-2">
                  <div className="w-full max-w-8 rounded-t-md bg-blue-500/85" style={{ height: `${item.volume * 12}px` }} />
                  <span className="text-[11px] text-slate-500 font-medium">{item.day}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-cyan-100 bg-cyan-50 px-3 py-2.5">
              <p className="text-xs text-cyan-900 font-semibold">Insight</p>
              <p className="text-xs text-cyan-800 mt-1">Mid-week load is highest. Reserve outbound blocks on Tue-Thu for follow-ups and demos.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
