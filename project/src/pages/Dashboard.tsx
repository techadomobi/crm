import { DollarSign, Users, Target, CalendarClock, CheckCircle, BookOpenText } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import RevenueChart from '../components/RevenueChart';
import { useDashboardOverview } from '../hooks/useDashboardOverview';

const formatCurrency = (value: number) => {
  return `$${value.toLocaleString()}`;
};

export default function Dashboard() {
  const { data, isLoading, isError, error } = useDashboardOverview();

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

  const chartData = data.dealPipeline.length > 0
    ? data.dealPipeline.map((row) => ({ month: row.stage, value: row.value }))
    : [];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-emerald-200 p-2.5 text-emerald-700">
              <CheckCircle size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-900">OffersMeta v2 Integration Live</p>
              <p className="mt-0.5 text-xs text-emerald-700">All CRM modules connected to production API. Full feature set available.</p>
            </div>
          </div>
          <a href="/api/docs" className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 px-3 py-2 text-xs font-semibold text-white transition-colors whitespace-nowrap">
            <BookOpenText size={14} />
            API Docs
          </a>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Total Contacts" value={String(data.totalContacts)} change={0} changeLabel="Live from CRM API" icon={<Users size={18} />} color="blue" />
        <StatsCard label="Open Deals Value" value={formatCurrency(data.openDealsValue)} change={0} changeLabel="Live from CRM API" icon={<DollarSign size={18} />} color="green" />
        <StatsCard label="Leads This Month" value={String(data.leadsThisMonth)} change={0} changeLabel="Live from CRM API" icon={<Target size={18} />} color="amber" />
        <StatsCard label="Activities Due Today" value={String(data.activitiesDueToday)} change={0} changeLabel="Live from CRM API" icon={<CalendarClock size={18} />} color="rose" />
      </div>

      <RevenueChart
        data={chartData.map((point) => ({ month: point.month.slice(0, 3), value: point.value }))}
        title="Deal Pipeline (Live)"
        subtitle="Aggregated by stage"
        trendLabel="Real-time"
        totalLabel="Open + closed value"
      />

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
    </div>
  );
}
