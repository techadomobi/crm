import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, PlayCircle, SearchCode } from 'lucide-react';
import { type RequestMethod } from '../api/httpClient';
import { flattenSwaggerOperations, type SwaggerOperation } from '../lib/offersmetaSwagger';
import { loadSwaggerSpec } from '../services/swaggerSpecService';
import { runQuickGetCheck } from '../services/apiOperationService';

type QuickStatus =
  | { kind: 'idle' }
  | { kind: 'running' }
  | { kind: 'ok'; detail: string }
  | { kind: 'error'; detail: string };

type EndpointStatusMap = Record<string, QuickStatus>;

const methodBadge: Record<RequestMethod, string> = {
  GET: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  POST: 'bg-sky-50 text-sky-700 border-sky-200',
  PUT: 'bg-amber-50 text-amber-700 border-amber-200',
  PATCH: 'bg-violet-50 text-violet-700 border-violet-200',
  DELETE: 'bg-rose-50 text-rose-700 border-rose-200',
};

const opKey = (op: SwaggerOperation) => `${op.method}:${op.path}`;


interface ApiCatalogWorkspaceProps {
  onSelectEndpoint: (path: string) => void;
}

export default function ApiCatalogWorkspace({ onSelectEndpoint }: ApiCatalogWorkspaceProps) {
  const [ops, setOps] = useState<SwaggerOperation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string>('ALL');
  const [query, setQuery] = useState('');
  const [statusMap, setStatusMap] = useState<EndpointStatusMap>({});

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const { spec } = await loadSwaggerSpec();
        setOps(flattenSwaggerOperations(spec));
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unable to load API catalog');
        setOps([]);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const tags = useMemo(() => {
    const values = new Set<string>();
    for (const op of ops) {
      const tag = op.tags[0] ?? 'untagged';
      values.add(tag);
    }
    return Array.from(values).sort((a, b) => a.localeCompare(b));
  }, [ops]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return ops.filter((op) => {
      const tag = op.tags[0] ?? 'untagged';
      if (activeTag !== 'ALL' && tag !== activeTag) return false;
      if (!needle) return true;
      const haystack = `${op.method} ${op.path} ${tag} ${op.summary ?? ''}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [activeTag, ops, query]);

  const runQuickCheck = async (op: SwaggerOperation) => {
    const key = opKey(op);
    if (op.method !== 'GET') {
      setStatusMap((prev) => ({
        ...prev,
        [key]: { kind: 'error', detail: 'Quick check supports GET only. Use API Studio to execute write endpoints.' },
      }));
      return;
    }

    setStatusMap((prev) => ({ ...prev, [key]: { kind: 'running' } }));

    try {
      const statusCode = await runQuickGetCheck(op);

      setStatusMap((prev) => ({
        ...prev,
        [key]: { kind: 'ok', detail: `HTTP ${statusCode}` },
      }));
    } catch (e) {
      const detail = e instanceof Error ? e.message : 'Request failed';
      setStatusMap((prev) => ({
        ...prev,
        [key]: { kind: 'error', detail },
      }));
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-slate-100 px-4 py-3">
        <h2 className="text-sm font-bold text-slate-900">API Catalog Workspace</h2>
        <p className="mt-1 text-xs text-slate-500">Dedicated UI for APIs by tag. Open any endpoint directly in API Studio or run quick read checks.</p>
      </div>

      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[260px_1fr] min-h-[380px]">
        <aside className="border-r border-slate-100 p-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs font-semibold text-slate-600">
            Tags ({tags.length})
          </div>
          <div className="mt-2 space-y-1 max-h-[300px] overflow-y-auto">
            <button
              type="button"
              onClick={() => setActiveTag('ALL')}
              className={`w-full rounded-lg px-2 py-1.5 text-left text-xs font-semibold ${activeTag === 'ALL' ? 'bg-cyan-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
            >
              ALL ({ops.length})
            </button>
            {tags.map((tag) => {
              const count = ops.filter((op) => (op.tags[0] ?? 'untagged') === tag).length;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  className={`w-full rounded-lg px-2 py-1.5 text-left text-xs font-semibold ${activeTag === tag ? 'bg-cyan-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                >
                  <span className="truncate">{tag}</span>
                  <span className="float-right opacity-80">{count}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="p-3">
          <div className="mb-3 flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
            <SearchCode size={14} className="text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search endpoint, method, tag..."
              className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none"
            />
          </div>

          {loading && <p className="text-sm text-slate-500">Loading API catalog...</p>}
          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 inline-flex items-center gap-2">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {filtered.map((op) => {
                const key = opKey(op);
                const status = statusMap[key] ?? { kind: 'idle' };
                return (
                  <article key={key} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full border px-2 py-0.5 text-[11px] font-bold ${methodBadge[op.method]}`}>{op.method}</span>
                      <p className="font-mono text-xs text-slate-800 break-all">{op.path}</p>
                    </div>
                    {op.summary && <p className="mt-1 text-xs text-slate-600">{op.summary}</p>}

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectEndpoint(op.path)}
                        className="rounded-lg border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700 hover:bg-cyan-100"
                      >
                        Open in Studio
                      </button>
                      <button
                        type="button"
                        onClick={() => void runQuickCheck(op)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        <PlayCircle size={12} />
                        Quick check
                      </button>

                      {status.kind === 'running' && <span className="text-xs text-cyan-700">Checking...</span>}
                      {status.kind === 'ok' && (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-700">
                          <CheckCircle2 size={12} />
                          {status.detail}
                        </span>
                      )}
                      {status.kind === 'error' && <span className="text-xs text-rose-700">{status.detail}</span>}
                    </div>
                  </article>
                );
              })}

              {filtered.length === 0 && <p className="text-sm text-slate-500">No endpoints match the current filters.</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
