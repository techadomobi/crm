import { useState } from 'react';
import { Loader2, MoreVertical, RefreshCw, Search } from 'lucide-react';
import { useAffiliates } from '../hooks/useAffiliates';

export default function Affiliates() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(50);

  const { data, isLoading, isError, error, refetch } = useAffiliates({
    type: 'publishers',
    page,
    limit: itemsPerPage,
    search,
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
              <RefreshCw size={14} />
              Live publisher list
            </div>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">Publishers</h1>
            <p className="mt-1 text-sm text-slate-500">Live data loaded directly from the publisher API and rendered in this table.</p>
          </div>
          <button
            type="button"
            onClick={() => void refetch()}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search publishers by Name, ID, Email..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value={25}>25 / page</option>
            <option value={50}>50 / page</option>
            <option value={100}>100 / page</option>
          </select>
        </div>
      </section>

      {isLoading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <Loader2 size={18} className="mx-auto mb-2 animate-spin text-blue-600" />
          <p className="mt-3 text-sm text-slate-500">Loading publishers...</p>
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm font-semibold text-red-900">Failed to load publishers</p>
          <p className="mt-1 text-sm text-red-700">{error?.message ?? 'Unknown error occurred'}</p>
        </div>
      )}

      {!isLoading && !isError && (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-3 font-semibold text-slate-900 uppercase tracking-wider text-xs">ID</th>
                  <th className="px-6 py-3 font-semibold text-slate-900 uppercase tracking-wider text-xs">Company</th>
                  <th className="px-6 py-3 font-semibold text-slate-900 uppercase tracking-wider text-xs">Contact Info</th>
                  <th className="px-6 py-3 font-semibold text-slate-900 uppercase tracking-wider text-xs">Contact Person</th>
                  <th className="px-6 py-3 font-semibold text-slate-900 uppercase tracking-wider text-xs">Status</th>
                  <th className="px-6 py-3 font-semibold text-slate-900 uppercase tracking-wider text-xs">Country</th>
                  <th className="px-6 py-3 font-semibold text-slate-900 uppercase tracking-wider text-xs">Created</th>
                  <th className="px-6 py-3 font-semibold text-slate-900 uppercase tracking-wider text-xs">Manager</th>
                  <th className="px-6 py-3 font-semibold text-slate-900 uppercase tracking-wider text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data.map((affiliate) => (
                    <tr key={affiliate.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-slate-900 font-semibold">#{affiliate.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">
                            {affiliate.company.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-slate-900">{affiliate.company}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-0.5">
                          {affiliate.email && (
                            <div className="flex items-center gap-2 text-slate-600">
                              <span className="text-xs">📧</span>
                              <span>{affiliate.email}</span>
                            </div>
                          )}
                          {affiliate.phone && (
                            <div className="flex items-center gap-2 text-slate-600">
                              <span className="text-xs">📱</span>
                              <span>{affiliate.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-900">{affiliate.contactPerson}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                            affiliate.status === 'ACTIVE' || affiliate.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                          {affiliate.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{affiliate.country}</td>
                      <td className="px-6 py-4 text-slate-600 text-xs">
                        {affiliate.createdAt
                          ? new Date(affiliate.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                            })
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{affiliate.manager}</td>
                      <td className="px-6 py-4">
                        <button className="inline-flex items-center justify-center h-8 w-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                          <span className="text-xl">📋</span>
                        </div>
                        <p className="text-sm font-semibold text-slate-900">No publishers found</p>
                        <p className="text-xs text-slate-500 mt-1">Try adjusting your search criteria or refresh the live API data.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Pagination */}
      {!isLoading && !isError && data && data.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 flex items-center justify-between">
          <p className="text-xs font-medium text-slate-600">
            Showing <span className="font-semibold text-slate-900">{(page - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-semibold text-slate-900">{Math.min(page * itemsPerPage, data.length)}</span> of{' '}
            <span className="font-semibold text-slate-900">{data.length}</span> results
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={data.length < itemsPerPage}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              Next
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
