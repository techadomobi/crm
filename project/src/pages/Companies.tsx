import { useCompanies } from '../hooks/useCompanies';

export default function Companies() {
  const { data, isLoading, isError, error } = useCompanies();

  if (isLoading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500">Loading companies...</div>;
  }

  if (isError) {
    return <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">{error instanceof Error ? error.message : 'Failed to load companies'}</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Companies / Accounts</h2>
      <div className="rounded-2xl border border-slate-100 bg-white p-4 text-sm text-slate-700">
        Total companies: {data?.length || 0}
      </div>
    </div>
  );
}
