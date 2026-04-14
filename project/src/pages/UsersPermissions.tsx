import { useUsers } from '../hooks/useUsers';

export default function UsersPermissions() {
  const { data, isLoading, isError, error } = useUsers();

  if (isLoading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500">Loading users...</div>;
  }

  if (isError) {
    return <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">{error instanceof Error ? error.message : 'Failed to load users'}</div>;
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Users & Permissions</h2>
        <p className="mt-1 text-sm text-slate-500">Live user rows from manager and partner endpoints.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3">Source</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">ID</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((row: any, index: number) => (
                <tr key={row.id ?? `${row._source ?? 'user'}-${index}`} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-4 text-slate-600 capitalize">{row._source ?? 'unknown'}</td>
                  <td className="px-5 py-4 font-semibold text-slate-900">{row.name ?? row.fullName ?? row.companyName ?? 'N/A'}</td>
                  <td className="px-5 py-4 text-slate-600">{row.email ?? 'N/A'}</td>
                  <td className="px-5 py-4 text-slate-600">{row.role ?? row.userRole ?? row.type ?? 'N/A'}</td>
                  <td className="px-5 py-4 text-slate-600">{row.id ?? row._id ?? 'N/A'}</td>
                </tr>
              ))}
              {!data?.length && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-sm text-slate-500">
                    No users returned by the live API.
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
