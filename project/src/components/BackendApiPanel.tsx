import { useMemo, useState } from 'react';
import { Database, KeyRound, Loader2, PlayCircle } from 'lucide-react';
import { repowireApi } from '../api/repowireApi';
import { ApiError } from '../api/httpClient';

type Action = 'publishers' | 'advertisers' | 'conversionSummary' | 'postbackLogs' | 'offerList' | 'createOffer';

export default function BackendApiPanel() {
  const [tokenInput, setTokenInput] = useState(localStorage.getItem('repowire_token') ?? '');
  const [loadingAction, setLoadingAction] = useState<Action | null>(null);
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [offerDraft, setOfferDraft] = useState({
    partners_Id: '1',
    advertiserId: '1',
    advertiserManagerId: '',
    title: 'API Test Offer',
    description: 'Offer created from Backend API Workspace',
    eventType: 'CPI',
    eventName: 'install',
    revenue: '1.5',
    payout: '1.0',
    currency: 'USD',
    previewUrl: 'https://example.com/preview',
    trackingUrl: 'https://example.com/track',
    impressionUrl: 'https://example.com/imp',
    category: 'General',
    traffic: 'Mobile',
    osAllowed: 'ALL',
    privacyLavel: 'PUBLIC',
    conversionTracking: 'postback',
    conversionTrackingDomain: 'example.com',
    trackMultipleConversion: 'false',
    redirectMode: 'DEFAULT',
  });
  const [offerImage, setOfferImage] = useState<File | null>(null);
  const [offerListQuery, setOfferListQuery] = useState({ page: '1', search: '' });

  const actionList = useMemo(
    () => [
      { id: 'publishers' as const, label: 'Fetch Publishers (/publicher/publisherList)' },
      { id: 'advertisers' as const, label: 'Fetch Advertisers (/advertiser/advertiserList)' },
      { id: 'conversionSummary' as const, label: 'Fetch Conversion Summary (/conversion/*)' },
      { id: 'postbackLogs' as const, label: 'Fetch Postback Logs (/conversion/postbackLogs)' },
      { id: 'offerList' as const, label: 'Fetch Offer List (/offer/offerList)' },
      { id: 'createOffer' as const, label: 'Create Offer (/offer/createOffr)' },
    ],
    []
  );

  const runAction = async (action: Action) => {
    const savedToken = localStorage.getItem('repowire_token')?.trim();
    if (!savedToken) {
      setError('Save a bearer token first, then run API actions.');
      return;
    }

    setError(null);
    setLoadingAction(action);

    try {
      let response: unknown;
      if (action === 'publishers') response = await repowireApi.publisherList({ page: 1, limit: 10 });
      else if (action === 'advertisers') response = await repowireApi.advertiserList({ page: 1, limit: 10 });
      else if (action === 'conversionSummary') response = await repowireApi.conversionSummary();
      else if (action === 'postbackLogs') response = await repowireApi.conversionPostbackLogs({ page: 1, limit: 10 });
      else if (action === 'offerList') {
        const page = Number(offerListQuery.page);
        response = await repowireApi.offerList({
          page: Number.isFinite(page) && page > 0 ? page : 1,
          search: offerListQuery.search,
        });
      }
      else {
        const now = new Date();
        const nextMonth = new Date(now);
        nextMonth.setDate(now.getDate() + 30);
        const format = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

        if (!offerDraft.partners_Id || !offerDraft.advertiserId || !offerDraft.title) {
          throw new Error('partners_Id, advertiserId, and title are required for create offer.');
        }

        response = await repowireApi.createOffer({
          partners_Id: offerDraft.partners_Id,
          title: offerDraft.title,
          advertiserManagerId: offerDraft.advertiserManagerId || undefined,
          advertiserId: offerDraft.advertiserId,
          privacyLavel: offerDraft.privacyLavel,
          description: offerDraft.description,
          category: offerDraft.category,
          traffic: offerDraft.traffic,
          incentive: 'true',
          eventType: offerDraft.eventType,
          eventName: offerDraft.eventName,
          revenue: offerDraft.revenue,
          payout: offerDraft.payout,
          currency: offerDraft.currency,
          osAllowed: offerDraft.osAllowed,
          previewUrl: offerDraft.previewUrl,
          trackingUrl: offerDraft.trackingUrl,
          impressionUrl: offerDraft.impressionUrl,
          image: offerImage ?? undefined,
          startDate: format(now),
          endDate: format(nextMonth),
          redirectMode: offerDraft.redirectMode,
          conversionTracking: offerDraft.conversionTracking,
          conversionTrackingDomain: offerDraft.conversionTrackingDomain,
          trackMultipleConversion: offerDraft.trackMultipleConversion,
        });
      }

      setResult(response);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(`API error (${err.status}): ${JSON.stringify(err.data)}`);
      } else {
        setError('Unexpected error while calling backend API.');
      }
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-5 hover:shadow-lg transition-all">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center">
          <Database size={15} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Backend API Workspace</h3>
          <p className="text-xs text-slate-500">Live integration with Repowire endpoints from Swagger docs.</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 mb-4">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block mb-1.5">Bearer Token</label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <KeyRound size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={tokenInput}
              onChange={(event) => setTokenInput(event.target.value)}
              placeholder="Paste JWT token"
              className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
            />
          </div>
          <button
            onClick={() => {
              const cleaned = tokenInput
                .trim()
                .replace(/^['\"]+|['\"]+$/g, '')
                .replace(/^Bearer\s+/i, '');
              localStorage.setItem('repowire_token', cleaned);
              setTokenInput(cleaned);
              setError(null);
            }}
            className="rounded-xl bg-cyan-700 px-3 py-2 text-xs font-semibold text-white hover:bg-cyan-800 transition-colors"
          >
            Save
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {actionList.map((action) => (
          <button
            key={action.id}
            onClick={() => runAction(action.id)}
            disabled={Boolean(loadingAction)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 disabled:opacity-60"
          >
            {loadingAction === action.id ? <Loader2 size={14} className="animate-spin" /> : <PlayCircle size={14} className="text-cyan-700" />}
            {action.label}
          </button>
        ))}
      </div>

      <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-2">Offer List Filters</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input value={offerListQuery.page} onChange={(e) => setOfferListQuery((p) => ({ ...p, page: e.target.value }))} placeholder="page" className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700" />
          <input value={offerListQuery.search} onChange={(e) => setOfferListQuery((p) => ({ ...p, search: e.target.value }))} placeholder="search" className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700" />
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-2">Create Offer Payload</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input value={offerDraft.partners_Id} onChange={(e) => setOfferDraft((p) => ({ ...p, partners_Id: e.target.value }))} placeholder="partners_Id" className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700" />
          <input value={offerDraft.advertiserId} onChange={(e) => setOfferDraft((p) => ({ ...p, advertiserId: e.target.value }))} placeholder="advertiserId" className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700" />
          <input value={offerDraft.advertiserManagerId} onChange={(e) => setOfferDraft((p) => ({ ...p, advertiserManagerId: e.target.value }))} placeholder="advertiserManagerId (optional)" className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700" />
          <input value={offerDraft.title} onChange={(e) => setOfferDraft((p) => ({ ...p, title: e.target.value }))} placeholder="title" className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700" />
          <input value={offerDraft.eventType} onChange={(e) => setOfferDraft((p) => ({ ...p, eventType: e.target.value }))} placeholder="eventType" className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700" />
          <input value={offerDraft.eventName} onChange={(e) => setOfferDraft((p) => ({ ...p, eventName: e.target.value }))} placeholder="eventName" className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700" />
          <input value={offerDraft.revenue} onChange={(e) => setOfferDraft((p) => ({ ...p, revenue: e.target.value }))} placeholder="revenue" className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700" />
          <input value={offerDraft.payout} onChange={(e) => setOfferDraft((p) => ({ ...p, payout: e.target.value }))} placeholder="payout" className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700" />
          <input value={offerDraft.currency} onChange={(e) => setOfferDraft((p) => ({ ...p, currency: e.target.value }))} placeholder="currency" className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700" />
          <input value={offerDraft.category} onChange={(e) => setOfferDraft((p) => ({ ...p, category: e.target.value }))} placeholder="category" className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700" />
          <input value={offerDraft.traffic} onChange={(e) => setOfferDraft((p) => ({ ...p, traffic: e.target.value }))} placeholder="traffic" className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700" />
          <input value={offerDraft.osAllowed} onChange={(e) => setOfferDraft((p) => ({ ...p, osAllowed: e.target.value }))} placeholder="osAllowed" className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700" />
          <input value={offerDraft.privacyLavel} onChange={(e) => setOfferDraft((p) => ({ ...p, privacyLavel: e.target.value }))} placeholder="privacyLavel" className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700" />
          <input value={offerDraft.redirectMode} onChange={(e) => setOfferDraft((p) => ({ ...p, redirectMode: e.target.value }))} placeholder="redirectMode" className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700" />
          <input value={offerDraft.conversionTracking} onChange={(e) => setOfferDraft((p) => ({ ...p, conversionTracking: e.target.value }))} placeholder="conversionTracking" className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700" />
          <input value={offerDraft.conversionTrackingDomain} onChange={(e) => setOfferDraft((p) => ({ ...p, conversionTrackingDomain: e.target.value }))} placeholder="conversionTrackingDomain" className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700" />
          <input value={offerDraft.trackMultipleConversion} onChange={(e) => setOfferDraft((p) => ({ ...p, trackMultipleConversion: e.target.value }))} placeholder="trackMultipleConversion" className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700" />
          <input value={offerDraft.previewUrl} onChange={(e) => setOfferDraft((p) => ({ ...p, previewUrl: e.target.value }))} placeholder="previewUrl" className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700" />
          <input value={offerDraft.trackingUrl} onChange={(e) => setOfferDraft((p) => ({ ...p, trackingUrl: e.target.value }))} placeholder="trackingUrl" className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700" />
          <input value={offerDraft.impressionUrl} onChange={(e) => setOfferDraft((p) => ({ ...p, impressionUrl: e.target.value }))} placeholder="impressionUrl" className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700" />
        </div>
        <div className="mt-2">
          <label className="mb-1 block text-[11px] uppercase tracking-wide text-slate-500">Offer Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setOfferImage(e.target.files?.[0] ?? null)}
            className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700"
          />
        </div>
        <textarea value={offerDraft.description} onChange={(e) => setOfferDraft((p) => ({ ...p, description: e.target.value }))} placeholder="description" className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700" rows={2} />
      </div>

      {error && <p className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">{error}</p>}

      <div className="mt-3 rounded-xl border border-slate-200 bg-slate-950 p-3">
        <p className="text-[11px] uppercase tracking-wide text-slate-400 mb-2">Response Preview</p>
        <pre className="max-h-64 overflow-auto text-[11px] leading-relaxed text-cyan-100">{JSON.stringify(result, null, 2) || 'No response yet. Run an API action above.'}</pre>
      </div>
    </section>
  );
}
