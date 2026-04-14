import { useMemo, useState } from 'react';
import { Loader2, RefreshCw, Search, Users } from 'lucide-react';
import { useAffiliates } from '../hooks/useAffiliates';

export default function Advertisers() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [statusFilter, setStatusFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');

  const { data, isLoading, isError, error, refetch } = useAffiliates({
    type: 'advertisers',
    page,
    limit,
    search,
  });

  const filteredRows = useMemo(
    () => data.filter((row) => {
      const haystack = [row.company, row.contactPerson, row.email, row.phone, row.country, row.manager].join(' ').toLowerCase();
      const matchesSearch = haystack.includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || row.status.toLowerCase() === statusFilter.toLowerCase();
      const matchesCountry = countryFilter === 'all' || row.country.toLowerCase() === countryFilter.toLowerCase();
      return matchesSearch && matchesStatus && matchesCountry;
    }),
    [data, search, statusFilter, countryFilter]
  );

  const countries = useMemo(() => {
    const unique = new Set<string>();
    data.forEach((row) => {
      if (row.country) unique.add(row.country);
    });
    return [...unique].sort((a, b) => a.localeCompare(b));
  }, [data]);

  const totalActive = filteredRows.filter((row) => row.status.toLowerCase().includes('active')).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
              <Users size={14} />
              Live advertiser list
            </div>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900">Advertisers</h1>
            <p className="mt-2 text-sm text-slate-500">Live data loaded from the advertiser API and shown in the table below.</p>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => void refetch()} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <RefreshCw size={16} />
              Refresh
            </button>
            <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-800">
              +
              Create Advertiser
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Rows visible</p>
          <p className="mt-1 text-3xl font-black text-slate-900">{filteredRows.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Active</p>
          <p className="mt-1 text-3xl font-black text-emerald-600">{totalActive}</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Page size</p>
          <p className="mt-1 text-3xl font-black text-slate-900">{limit}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-xl">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search advertisers..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-9 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
              <option value="all">All Statuses</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="PENDING">PENDING</option>
            </select>
            <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
              <option value="all">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <label className="text-sm text-slate-600">
              Page size{' '}
              <select
                value={limit}
                onChange={(event) => setLimit(Number(event.target.value))}
                className="ml-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </label>
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => setPage((current) => current + 1)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      {isLoading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          <Loader2 size={18} className="mx-auto mb-2 animate-spin text-cyan-600" />
          Loading advertiser data...
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          {error?.message ?? 'Failed to load advertiser data.'}
        </div>
      )}

      {!isLoading && !isError && (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Company</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Full Name</th>
                  <th className="px-6 py-3">Mobile</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Country</th>
                  <th className="px-6 py-3">Manager</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.length > 0 ? (
                  filteredRows.map((row) => (
                    <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-4 font-semibold text-cyan-700">#{row.id}</td>
                      <td className="px-6 py-4 font-semibold text-slate-900">{row.company}</td>
                      <td className="px-6 py-4 text-slate-600">{row.email || 'N/A'}</td>
                      <td className="px-6 py-4 text-slate-700">{row.contactPerson}</td>
                      <td className="px-6 py-4 text-slate-600">{row.phone || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{row.country}</td>
                      <td className="px-6 py-4 text-slate-600">{row.manager}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-10 text-center text-sm text-slate-500">
                      No advertisers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
