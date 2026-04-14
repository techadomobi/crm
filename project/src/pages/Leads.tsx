import { useLeads } from '../hooks/useLeads';

export default function Leads() {
  const { data, isLoading, isError, error } = useLeads();

  if (isLoading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500">Loading leads...</div>;
  }

  if (isError) {
    return <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">{error instanceof Error ? error.message : 'Failed to load leads'}</div>;
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Leads</h2>
        <p className="mt-1 text-sm text-slate-500">Live pipeline items fetched from the API.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Source</th>
                <th className="px-5 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((row) => (
                <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-4 font-semibold text-slate-900">{row.id}</td>
                  <td className="px-5 py-4 text-slate-600">{row.status}</td>
                  <td className="px-5 py-4 text-slate-600">{row.source || 'N/A'}</td>
                  <td className="px-5 py-4 text-slate-600">{row.createdAt || 'N/A'}</td>
                </tr>
              ))}
              {!data?.length && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-sm text-slate-500">
                    No leads returned by the live API.
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
