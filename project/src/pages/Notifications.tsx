import { useNotifications } from '../hooks/useNotifications';

export default function Notifications() {
  const { data, isLoading, isError, error } = useNotifications();

  if (isLoading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500">Loading notifications...</div>;
  }

  if (isError) {
    return <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">{error instanceof Error ? error.message : 'Failed to load notifications'}</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Notifications / Webhooks</h2>
      <div className="rounded-2xl border border-slate-100 bg-white p-4 text-sm text-slate-700">
        Total notifications: {data?.length || 0}
      </div>
    </div>
  );
}
