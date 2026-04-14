import { useState } from 'react';
import { Search, Plus, MoreVertical } from 'lucide-react';
import { useAffiliates } from '../hooks/useAffiliates';

type AffiliateType = 'publishers' | 'advertisers';

export default function Affiliates() {
  const [type, setType] = useState<AffiliateType>('publishers');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(50);

  const { data, isLoading, isError, error } = useAffiliates({
    type,
    page,
    limit: itemsPerPage,
    search,
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const typeLabel = type === 'publishers' ? 'Publishers' : 'Advertisers';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">{typeLabel}</h1>
            <p className="mt-1 text-sm text-slate-500">Manage your {typeLabel.toLowerCase()} and view their details, status, and activity.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors">
            <Plus size={18} />
            Add {typeLabel === 'Publishers' ? 'Publisher' : 'Advertiser'}
          </button>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={() => {
                setType('publishers');
                setPage(1);
              }}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                type === 'publishers'
                  ? 'bg-blue-600 text-white'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              Publishers
            </button>
            <button
              onClick={() => {
                setType('advertisers');
                setPage(1);
              }}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                type === 'advertisers'
                  ? 'bg-blue-600 text-white'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              Advertisers
            </button>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder={`Search ${typeLabel.toLowerCase()}...`}
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
        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <div className="inline-flex items-center justify-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="h-2 w-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="h-2 w-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <p className="mt-3 text-sm text-slate-500">Loading {typeLabel.toLowerCase()}...</p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm font-semibold text-red-900">Failed to load {typeLabel.toLowerCase()}</p>
          <p className="mt-1 text-sm text-red-700">{error?.message ?? 'Unknown error occurred'}</p>
        </div>
      )}

      {/* Data Table */}
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
                        <p className="text-sm font-semibold text-slate-900">No {typeLabel.toLowerCase()} found</p>
                        <p className="text-xs text-slate-500 mt-1">Try adjusting your search criteria or add a new {type === 'publishers' ? 'publisher' : 'advertiser'}.</p>
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
