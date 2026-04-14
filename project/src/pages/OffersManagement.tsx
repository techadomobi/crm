import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  Eye,
  LayoutList,
  Loader2,
  Megaphone,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { repowireApi } from '../api/repowireApi';
import { ApiError } from '../api/httpClient';
import { asArray } from '../services/utils';

type Tab = 'list' | 'create';

export interface OffersManagementProps {
  initialTab?: Tab;
}

type CreateFormState = {
  title: string;
  advertiserId: string;
  advertiserManagerId: string;
  privacyLavel: string;
  description: string;
  category: string;
  traffic: string;
  incentive: string;
  eventType: string;
  eventName: string;
  eventValue: string;
  saleAmount: string;
  currency: string;
  revenue: string;
  payout: string;
  country_code: string;
  geoCountry: string;
  osAllowed: string;
  previewUrl: string;
  trackingUrl: string;
  impressionUrl: string;
  fallbackUrl: string;
  packageName: string;
  startDate: string;
  endDate: string;
  offerKpi: string;
  isBlock: string;
  event_bit: string;
  redirectMode: string;
  conversionTracking: string;
  conversionTrackingDomain: string;
  trackMultipleConversion: string;
};

const emptyCreateForm = (): CreateFormState => ({
  title: '',
  advertiserId: '',
  advertiserManagerId: '',
  privacyLavel: 'public',
  description: '',
  category: '',
  traffic: '',
  incentive: '',
  eventType: 'CPI',
  eventName: 'install',
  eventValue: '',
  saleAmount: '',
  currency: 'USD',
  revenue: '',
  payout: '',
  country_code: 'US',
  geoCountry: '',
  osAllowed: 'all',
  previewUrl: '',
  trackingUrl: '',
  impressionUrl: '',
  fallbackUrl: '',
  packageName: '',
  startDate: '',
  endDate: '',
  offerKpi: '',
  isBlock: '',
  event_bit: '',
  redirectMode: '',
  conversionTracking: '',
  conversionTrackingDomain: '',
  trackMultipleConversion: '',
});

const asRecord = (row: unknown): Record<string, unknown> =>
  row !== null && typeof row === 'object' && !Array.isArray(row) ? (row as Record<string, unknown>) : {};

const offerIdFromRow = (row: Record<string, unknown>) =>
  String(row.offerId ?? row.offer_id ?? row._id ?? row.id ?? '').trim();

const fieldClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20';

const labelClass = 'block text-xs font-semibold text-slate-600 mb-1';

const getStoredPartnersId = () => {
  if (typeof window === 'undefined') return '';
  return (
    localStorage.getItem('repowire_partners_id')
    ?? localStorage.getItem('repowire_partners_Id')
    ?? localStorage.getItem('partners_Id')
    ?? ''
  ).trim();
};

export default function OffersManagement({ initialTab = 'list' }: OffersManagementProps) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const [rows, setRows] = useState<unknown[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailData, setDetailData] = useState<unknown>(null);
  const [activeOfferId, setActiveOfferId] = useState<string>('');

  const [createForm, setCreateForm] = useState<CreateFormState>(() => emptyCreateForm());
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  const loadList = useCallback(async () => {
    const partnersId = getStoredPartnersId();
    setListLoading(true);
    setListError(null);
    try {
      const query = {
        page,
        limit: 25,
        search: search.trim() || undefined,
        partners_Id: partnersId || undefined,
      };

      const allOffersResponse = await repowireApi.campaignList(query);
      const allOffersRows = asArray<unknown>(allOffersResponse);
      if (allOffersRows.length > 0) {
        setRows(allOffersRows);
        return;
      }

      const offerListResponse = await repowireApi.offerList(query);
      const offerListRows = asArray<unknown>(offerListResponse);
      setRows(offerListRows);
    } catch (e) {
      if (e instanceof ApiError) {
        setListError(`Could not load offers (${e.status}). Save token & partners_Id in Settings if required.`);
      } else {
        setListError('Could not load offers.');
      }
      setRows([]);
    } finally {
      setListLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    void loadList();
  }, [loadList]);

  useEffect(() => {
    const handleSessionUpdate = () => {
      void loadList();
    };

    window.addEventListener('repowire-session-updated', handleSessionUpdate as EventListener);
    return () => {
      window.removeEventListener('repowire-session-updated', handleSessionUpdate as EventListener);
    };
  }, [loadList]);

  const tableColumns = useMemo(() => {
    const first = rows[0];
    const o = asRecord(first);
    const preferred = ['title', 'offerName', 'offerId', '_id', 'status', 'payout', 'revenue', 'currency', 'category', 'traffic'];
    const keys = preferred.filter((k) => k in o);
    const extras = Object.keys(o).filter((k) => !preferred.includes(k) && !k.startsWith('__'));
    return [...keys, ...extras].slice(0, 10);
  }, [rows]);

  const openDetail = async (offerId: string) => {
    if (!offerId) return;
    const partnersId = getStoredPartnersId();
    setActiveOfferId(offerId);
    setDetailOpen(true);
    setDetailLoading(true);
    setDetailData(null);
    try {
      const data = await repowireApi.viewOffer({
        offerId,
        partners_Id: partnersId || undefined,
      });
      setDetailData(data);
    } catch (e) {
      setDetailData({ error: e instanceof ApiError ? e.data : String(e) });
    } finally {
      setDetailLoading(false);
    }
  };

  const handleDelete = async (offerId: string) => {
    if (!offerId || !window.confirm(`Delete offer ${offerId}? This calls PUT /offer/deleteOffer.`)) return;
    const partnersId = getStoredPartnersId();
    try {
      await repowireApi.deleteOffer({ offerId, partners_Id: partnersId || undefined });
      setNotice('Offer marked deleted. Refreshing list…');
      void loadList();
    } catch (e) {
      setNotice(e instanceof ApiError ? `Delete failed: ${e.status}` : 'Delete failed.');
    }
  };

  const submitCreate = async () => {
    const partnersId = getStoredPartnersId();
    setSubmitting(true);
    setNotice(null);
    try {
      const body: Record<string, unknown> = { ...createForm };
      if (partnersId) body.partners_Id = partnersId;
      if (imageFile) body.image = imageFile;

      Object.keys(body).forEach((k) => {
        const v = body[k];
        if (v === '' || v === undefined) delete body[k];
      });

      await repowireApi.createOffer(body);
      setNotice('Offer created successfully.');
      setCreateForm(emptyCreateForm());
      setImageFile(null);
      setTab('list');
      void loadList();
    } catch (e) {
      setNotice(e instanceof ApiError ? `Create failed (${e.status})` : 'Create failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (key: keyof CreateFormState, value: string) => {
    setCreateForm((f) => ({ ...f, [key]: value }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-800">
            <Megaphone size={14} />
            Offers · OffersMeta <code className="text-[10px]">/offer/*</code>
          </div>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">Campaign offers</h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Dedicated UI for <strong>offer list</strong> and <strong>create offer</strong> (multipart form aligned with Tracking API). Other offer routes
            remain in <strong>API Studio</strong>.
          </p>
        </div>
        <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
          <button
            type="button"
            onClick={() => setTab('list')}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              tab === 'list' ? 'bg-white text-cyan-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutList size={16} />
            Offer list
          </button>
          <button
            type="button"
            onClick={() => setTab('create')}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              tab === 'create' ? 'bg-white text-cyan-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Plus size={16} />
            Create offer
          </button>
        </div>
      </div>

      {notice && (
        <div className="rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm text-cyan-900">{notice}</div>
      )}

      {tab === 'list' && (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && void loadList()}
                placeholder="Search offers…"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-500">
                Page{' '}
                <input
                  type="number"
                  min={1}
                  value={page}
                  onChange={(e) => setPage(Math.max(1, Number(e.target.value) || 1))}
                  className="ml-1 w-16 rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                />
              </label>
              <button
                type="button"
                onClick={() => void loadList()}
                disabled={listLoading}
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800 disabled:opacity-50"
              >
                {listLoading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                Refresh
              </button>
            </div>
          </div>

          {listError && <p className="px-4 py-3 text-sm text-rose-700 bg-rose-50">{listError}</p>}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-xs font-bold uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">Actions</th>
                  {tableColumns.map((col) => (
                    <th key={col} className="px-4 py-3 whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && !listLoading && (
                  <tr>
                    <td colSpan={Math.max(tableColumns.length + 1, 2)} className="px-4 py-10 text-center text-slate-500">
                      No rows returned. Check <code className="text-xs">partners_Id</code> and bearer token.
                    </td>
                  </tr>
                )}
                {rows.map((row, idx) => {
                  const o = asRecord(row);
                  const oid = offerIdFromRow(o);
                  return (
                    <tr key={oid || String(idx)} className="border-b border-slate-50 hover:bg-slate-50/80">
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => void openDetail(oid)}
                            className="rounded-lg p-2 text-cyan-700 hover:bg-cyan-50"
                            title="View"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleDelete(oid)}
                            className="rounded-lg p-2 text-rose-600 hover:bg-rose-50 disabled:opacity-40"
                            disabled={!oid}
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                      {tableColumns.map((col) => (
                        <td key={col} className="px-4 py-2.5 text-slate-700 max-w-[200px] truncate font-mono text-xs" title={String(o[col] ?? '')}>
                          {formatCell(o[col])}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'create' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-8">
          <div className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50/80 p-3 text-xs text-amber-900">
            <Sparkles size={16} className="shrink-0 mt-0.5" />
            <p>
              Fields mirror <strong>POST /offer/createOffer</strong> (Tracking). Required fields must be filled; optional fields can be left blank.
              <code className="block mt-1 text-[10px] text-amber-800">privacyLavel</code> is spelled as in the API.
            </p>
          </div>

          <section className="grid gap-4 sm:grid-cols-2">
            <h2 className="sm:col-span-2 text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span className="h-px flex-1 bg-slate-200" />
              Core
              <span className="h-px flex-1 bg-slate-200" />
            </h2>
            <div className="sm:col-span-2">
              <label className={labelClass}>Creative image (optional)</label>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} className="text-sm" />
            </div>
            <div>
              <label className={labelClass}>Title *</label>
              <input className={fieldClass} value={createForm.title} onChange={(e) => updateField('title', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Advertiser ID *</label>
              <input className={fieldClass} value={createForm.advertiserId} onChange={(e) => updateField('advertiserId', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Advertiser manager ID</label>
              <input className={fieldClass} value={createForm.advertiserManagerId} onChange={(e) => updateField('advertiserManagerId', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Privacy level *</label>
              <input className={fieldClass} value={createForm.privacyLavel} onChange={(e) => updateField('privacyLavel', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Description *</label>
              <textarea className={`${fieldClass} min-h-[88px]`} value={createForm.description} onChange={(e) => updateField('description', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Category *</label>
              <input className={fieldClass} value={createForm.category} onChange={(e) => updateField('category', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Traffic *</label>
              <input className={fieldClass} value={createForm.traffic} onChange={(e) => updateField('traffic', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Incentive *</label>
              <input className={fieldClass} value={createForm.incentive} onChange={(e) => updateField('incentive', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Event type *</label>
              <input className={fieldClass} value={createForm.eventType} onChange={(e) => updateField('eventType', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Event name *</label>
              <input className={fieldClass} value={createForm.eventName} onChange={(e) => updateField('eventName', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Event value</label>
              <input className={fieldClass} value={createForm.eventValue} onChange={(e) => updateField('eventValue', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Sale amount</label>
              <input className={fieldClass} value={createForm.saleAmount} onChange={(e) => updateField('saleAmount', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Currency *</label>
              <input className={fieldClass} value={createForm.currency} onChange={(e) => updateField('currency', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Revenue *</label>
              <input className={fieldClass} value={createForm.revenue} onChange={(e) => updateField('revenue', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Payout *</label>
              <input className={fieldClass} value={createForm.payout} onChange={(e) => updateField('payout', e.target.value)} />
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            <h2 className="sm:col-span-2 text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span className="h-px flex-1 bg-slate-200" />
              Targeting & URLs
              <span className="h-px flex-1 bg-slate-200" />
            </h2>
            <div>
              <label className={labelClass}>Country code *</label>
              <input className={fieldClass} value={createForm.country_code} onChange={(e) => updateField('country_code', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Geo country</label>
              <input className={fieldClass} value={createForm.geoCountry} onChange={(e) => updateField('geoCountry', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>OS allowed *</label>
              <input className={fieldClass} value={createForm.osAllowed} onChange={(e) => updateField('osAllowed', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Preview URL *</label>
              <input className={fieldClass} value={createForm.previewUrl} onChange={(e) => updateField('previewUrl', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Tracking URL *</label>
              <input className={fieldClass} value={createForm.trackingUrl} onChange={(e) => updateField('trackingUrl', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Impression URL *</label>
              <input className={fieldClass} value={createForm.impressionUrl} onChange={(e) => updateField('impressionUrl', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Fallback URL</label>
              <input className={fieldClass} value={createForm.fallbackUrl} onChange={(e) => updateField('fallbackUrl', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Package name</label>
              <input className={fieldClass} value={createForm.packageName} onChange={(e) => updateField('packageName', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Start / end date</label>
              <div className="flex gap-2">
                <input type="date" className={fieldClass} value={createForm.startDate} onChange={(e) => updateField('startDate', e.target.value)} />
                <input type="date" className={fieldClass} value={createForm.endDate} onChange={(e) => updateField('endDate', e.target.value)} />
              </div>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            <h2 className="sm:col-span-2 text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span className="h-px flex-1 bg-slate-200" />
              Advanced
              <span className="h-px flex-1 bg-slate-200" />
            </h2>
            <div>
              <label className={labelClass}>Offer KPI</label>
              <input className={fieldClass} value={createForm.offerKpi} onChange={(e) => updateField('offerKpi', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>isBlock</label>
              <input className={fieldClass} value={createForm.isBlock} onChange={(e) => updateField('isBlock', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>event_bit</label>
              <input className={fieldClass} value={createForm.event_bit} onChange={(e) => updateField('event_bit', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>redirectMode</label>
              <input className={fieldClass} value={createForm.redirectMode} onChange={(e) => updateField('redirectMode', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>conversionTracking</label>
              <input className={fieldClass} value={createForm.conversionTracking} onChange={(e) => updateField('conversionTracking', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>conversionTrackingDomain</label>
              <input
                className={fieldClass}
                value={createForm.conversionTrackingDomain}
                onChange={(e) => updateField('conversionTrackingDomain', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>trackMultipleConversion</label>
              <input
                className={fieldClass}
                value={createForm.trackMultipleConversion}
                onChange={(e) => updateField('trackMultipleConversion', e.target.value)}
              />
            </div>
          </section>

          <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => void submitCreate()}
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-emerald-700 disabled:opacity-50"
            >
              {submitting ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
              Submit createOffer
            </button>
            <button type="button" onClick={() => setCreateForm(emptyCreateForm())} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Reset form
            </button>
            <button type="button" onClick={() => setTab('list')} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-800 hover:underline">
              <ChevronLeft size={16} />
              Back to list
            </button>
          </div>
        </div>
      )}

      {detailOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-slate-900/50 p-4" role="dialog" aria-modal="true">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <h2 className="text-sm font-bold text-slate-900">Offer {activeOfferId}</h2>
              <button type="button" className="rounded-lg px-2 py-1 text-sm text-slate-500 hover:bg-slate-100" onClick={() => setDetailOpen(false)}>
                Close
              </button>
            </div>
            <div className="overflow-auto p-4 flex-1">
              {detailLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="animate-spin text-cyan-600" size={32} />
                </div>
              ) : (
                <pre className="text-xs font-mono text-slate-700 whitespace-pre-wrap break-words">{JSON.stringify(detailData, null, 2)}</pre>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function formatCell(v: unknown): string {
  if (v === null || v === undefined) return '—';
  if (typeof v === 'object') return JSON.stringify(v).slice(0, 80);
  return String(v);
}
