import { useMemo, useState } from 'react';
import { Database, KeyRound, Loader2, PlayCircle } from 'lucide-react';
import { repowireApi } from '../api/repowireApi';
import { ApiError } from '../api/httpClient';

type Action = 'publishers' | 'advertisers' | 'conversionSummary' | 'postbackLogs';

export default function BackendApiPanel() {
  const [tokenInput, setTokenInput] = useState(localStorage.getItem('repowire_token') ?? '');
  const [loadingAction, setLoadingAction] = useState<Action | null>(null);
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  const actionList = useMemo(
    () => [
      { id: 'publishers' as const, label: 'Fetch Publishers (/publicher/publisherList)' },
      { id: 'advertisers' as const, label: 'Fetch Advertisers (/advertiser/advertiserList)' },
      { id: 'conversionSummary' as const, label: 'Fetch Conversion Summary (/conversion/*)' },
      { id: 'postbackLogs' as const, label: 'Fetch Postback Logs (/conversion/postbackLogs)' },
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
      else response = await repowireApi.conversionPostbackLogs({ page: 1, limit: 10 });

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

      {error && <p className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">{error}</p>}

      <div className="mt-3 rounded-xl border border-slate-200 bg-slate-950 p-3">
        <p className="text-[11px] uppercase tracking-wide text-slate-400 mb-2">Response Preview</p>
        <pre className="max-h-64 overflow-auto text-[11px] leading-relaxed text-cyan-100">{JSON.stringify(result, null, 2) || 'No response yet. Run an API action above.'}</pre>
      </div>
    </section>
  );
}
