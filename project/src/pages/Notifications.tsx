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
    <div className="space-y-4 animate-fade-in">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Notifications / Webhooks</h2>
        <p className="mt-1 text-sm text-slate-500">Live postback and conversion events fetched from the API.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((row) => (
                <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-4 text-slate-600 capitalize">{row.type}</td>
                  <td className="px-5 py-4 font-semibold text-slate-900">{row.title}</td>
                  <td className="px-5 py-4 text-slate-600">{row.status}</td>
                  <td className="px-5 py-4 text-slate-600">{row.createdAt}</td>
                </tr>
              ))}
              {!data?.length && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-sm text-slate-500">
                    No notifications returned by the live API.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
