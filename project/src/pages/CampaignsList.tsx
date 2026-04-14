import { useEffect, useMemo, useState } from 'react';
import { Loader2, Megaphone, RefreshCw, Search } from 'lucide-react';
import { useCampaigns } from '../hooks/useCampaigns';
import { campaignScopeMeta, type CampaignScope } from '../services/campaigns';

const scopeOrder: CampaignScope[] = ['all', 'publisher', 'advertiser', 'manager'];

const asRecord = (row: unknown): Record<string, unknown> =>
  row !== null && typeof row === 'object' && !Array.isArray(row) ? (row as Record<string, unknown>) : {};

const tablePreferredColumns = ['title', 'offerName', 'offerId', '_id', 'status', 'payout', 'revenue', 'currency', 'category', 'traffic'];

const readFirst = (keys: string[]) => {
  for (const key of keys) {
    const value = localStorage.getItem(key)?.trim();
    if (value) return value;
  }
  return '';
};

const resolveRole = () => (localStorage.getItem('repowire_user_role') ?? '').toLowerCase();

export default function CampaignsList() {
  const [scope, setScope] = useState<CampaignScope>('all');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [partnersInput, setPartnersInput] = useState(localStorage.getItem('repowire_partners_id') ?? '');
  const [publisherId, setPublisherId] = useState('');
  const [advertiserId, setAdvertiserId] = useState('');
  const [advertiserManagerId, setAdvertiserManagerId] = useState('');
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  const query = useMemo(
    () => ({
      partners_Id: partnersInput.trim() || undefined,
      publisherId: publisherId.trim() || undefined,
      advertiserId: advertiserId.trim() || undefined,
      advertiserManagerId: advertiserManagerId.trim() || undefined,
      page,
      search: search.trim() || undefined,
    }),
    [partnersInput, publisherId, advertiserId, advertiserManagerId, page, search]
  );

  const { data: rows = [], isLoading, isFetching, refetch, error } = useCampaigns(scope, query);

  useEffect(() => {
    const saved = localStorage.getItem('repowire_partners_id') ?? '';
    setPartnersInput(saved);

    const role = resolveRole();
    const userId = readFirst(['repowire_user_id']);
    const savedPublisherId = readFirst(['repowire_publisher_id']);
    const savedAdvertiserId = readFirst(['repowire_advertiser_id']);

    if (role.includes('publisher')) {
      setScope('publisher');
      setPublisherId(savedPublisherId || userId);
    } else if (role.includes('advertiser')) {
      setScope('advertiser');
      setAdvertiserId(savedAdvertiserId || userId);
    } else {
      setPublisherId(savedPublisherId);
      setAdvertiserId(savedAdvertiserId);
    }
  }, []);

  useEffect(() => {
    const onSessionUpdated = () => {
      const savedPartnersId =
        localStorage.getItem('repowire_partners_id')
        ?? localStorage.getItem('repowire_partners_Id')
        ?? localStorage.getItem('partners_Id')
        ?? '';

      setPartnersInput(savedPartnersId);
      void refetch();
    };

    window.addEventListener('repowire-session-updated', onSessionUpdated as EventListener);
    return () => window.removeEventListener('repowire-session-updated', onSessionUpdated as EventListener);
  }, [refetch]);

  const columns = useMemo(() => {
    const first = asRecord(rows[0]);
    const keys = tablePreferredColumns.filter((key) => key in first);
    const extras = Object.keys(first).filter((key) => !tablePreferredColumns.includes(key) && !key.startsWith('__'));
    return [...keys, ...extras].slice(0, 12);
  }, [rows]);

  const summary = useMemo(() => {
    const first = rows[0] ? asRecord(rows[0]) : {};
    return [
      { label: 'Visible rows', value: rows.length.toString() },
      { label: 'Scope', value: campaignScopeMeta[scope].label },
      { label: 'Endpoint', value: campaignScopeMeta[scope].endpoint },
      { label: 'Sample title', value: String(first.title ?? first.offerName ?? '—') },
    ];
  }, [rows, scope]);

  return (
    <div className="space-y-5 animate-fade-in">
      <section className="rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-sky-50 p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white px-3 py-1 text-xs font-semibold text-cyan-700 shadow-sm">
              <Megaphone size={14} />
              Campaign list API
            </div>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">Live campaign catalog</h1>
            <p className="mt-2 text-sm text-slate-600">
              This view is wired to the live campaign endpoints from Swagger, including the all-campaign list and the role-specific campaign lists.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void refetch()}
            disabled={isFetching}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800 disabled:opacity-60"
          >
            {isFetching ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
            Refresh
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</p>
            <p className="mt-1 break-words text-sm font-semibold text-slate-900">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {scopeOrder.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setScope(item)}
              className={`rounded-xl border px-3 py-2 text-left text-sm font-semibold transition-colors ${
                scope === item ? 'border-cyan-200 bg-cyan-50 text-cyan-800' : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="block text-[11px] uppercase tracking-wider opacity-70">{item}</span>
              <span className="block mt-0.5">{campaignScopeMeta[item].label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <label className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">partners_Id</span>
            <input
              value={partnersInput}
              onChange={(event) => setPartnersInput(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800"
              placeholder="partners_Id"
            />
          </label>
          <label className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Search</span>
            <div className="relative">
              <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-9 py-2 text-sm text-slate-800"
                placeholder="Search campaigns"
              />
            </div>
          </label>
        </div>

        {(scope === 'publisher' || scope === 'all') && (
          <label className="space-y-1 block">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">publisherId</span>
            <input
              value={publisherId}
              onChange={(event) => setPublisherId(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
              placeholder="Optional publisherId"
            />
          </label>
        )}

        {(scope === 'advertiser' || scope === 'all') && (
          <label className="space-y-1 block">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">advertiserId</span>
            <input
              value={advertiserId}
              onChange={(event) => setAdvertiserId(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
              placeholder="Optional advertiserId"
            />
          </label>
        )}

        {scope === 'manager' && (
          <label className="space-y-1 block">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">advertiserManagerId</span>
            <input
              value={advertiserManagerId}
              onChange={(event) => setAdvertiserManagerId(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
              placeholder="Optional advertiserManagerId"
            />
          </label>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm text-slate-600">
            Page{' '}
            <input
              type="number"
              min={1}
              value={page}
              onChange={(event) => setPage(Math.max(1, Number(event.target.value) || 1))}
              className="ml-1 w-20 rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
            />
          </label>
          <button
            type="button"
            onClick={() => {
              localStorage.setItem('repowire_partners_id', partnersInput.trim());
              setLastSavedAt(new Date().toLocaleTimeString());
            }}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Save session
          </button>
          {lastSavedAt && <span className="text-xs text-slate-500">Saved at {lastSavedAt}</span>}
        </div>
      </section>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          Failed to load campaigns.
        </div>
      )}

      <section className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Campaign rows</h2>
            <p className="mt-1 text-xs text-slate-500">Endpoint: {campaignScopeMeta[scope].endpoint}</p>
          </div>
          <div className="text-xs text-slate-500">
            {isLoading ? 'Loading…' : `${rows.length} rows`}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
                {columns.length === 0 ? <th className="px-5 py-3">No columns</th> : columns.map((column) => <th key={column} className="px-5 py-3 whitespace-nowrap">{column}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {rows.length === 0 && !isLoading && (
                <tr>
                  <td className="px-5 py-8 text-center text-sm text-slate-500" colSpan={Math.max(columns.length, 1)}>
                    No campaign rows returned yet.
                  </td>
                </tr>
              )}
              {rows.map((row, index) => {
                const data = asRecord(row);
                return (
                  <tr key={`${scope}-${index}`} className="hover:bg-slate-50/80 transition-colors">
                    {columns.map((column) => (
                      <td key={column} className="px-5 py-3 align-top text-slate-700">
                        {String(data[column] ?? '') || '—'}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {isLoading && (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
          Loading live campaign data...
        </div>
      )}
    </div>
  );
}
