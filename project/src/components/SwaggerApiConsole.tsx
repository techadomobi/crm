import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  AlertCircle,
  Braces,
  ChevronRight,
  ClipboardCopy,
  FileDown,
  FolderOpen,
  LayoutGrid,
  Layers,
  Loader2,
  Play,
  RefreshCw,
  Search,
  Table2,
  Terminal,
} from 'lucide-react';
import { API_BASE_URL, ApiError, apiExecute, type RequestMethod } from '../api/httpClient';
import {
  applyPathParams,
  defaultSkipAuthForPath,
  flattenSwaggerOperations,
  type OffersmetaSwaggerSpec,
  type SwaggerOperation,
  type SwaggerParameter,
} from '../lib/offersmetaSwagger';
import { extractTabularData } from '../lib/swaggerTableData';
import {
  catalogRoleLabel,
  filterOperationsForRole,
  normalizeCatalogRole,
  type CatalogRole,
} from '../lib/apiRoleFilter';

const SWAGGER_URL = `${API_BASE_URL.replace(/\/+$/, '')}/swagger.json`;

const paramKey = (op: SwaggerOperation, p: SwaggerParameter) => `${op.method}:${op.path}:${p.name}:${p.in}`;

const buildInitialValues = (op: SwaggerOperation | null, injectPartnersId: string): Record<string, string> => {
  if (!op) return {};
  const next: Record<string, string> = {};
  for (const p of op.parameters) {
    if (p.in === 'body') continue;
    const key = paramKey(op, p);
    if (p.name === 'partners_Id' && injectPartnersId) {
      next[key] = injectPartnersId;
      continue;
    }
    const t = (p.type ?? '').toLowerCase();
    if (t === 'boolean' && p.required) next[key] = 'false';
    else next[key] = '';
  }
  return next;
};

const methodBadgeClass: Record<RequestMethod, string> = {
  GET: 'bg-emerald-500/15 text-emerald-800 border-emerald-200',
  POST: 'bg-sky-500/15 text-sky-900 border-sky-200',
  PUT: 'bg-amber-500/15 text-amber-900 border-amber-200',
  PATCH: 'bg-violet-500/15 text-violet-900 border-violet-200',
  DELETE: 'bg-rose-500/15 text-rose-900 border-rose-200',
};

type ParamWidget = 'checkbox' | 'date' | 'number' | 'email' | 'password' | 'textarea' | 'text';

const inferParamWidget = (p: SwaggerParameter): ParamWidget => {
  const n = p.name.toLowerCase();
  const t = (p.type ?? 'string').toLowerCase();
  if (t === 'boolean') return 'checkbox';
  if (t === 'integer' || t === 'number' || n === 'page' || n === 'limit') return 'number';
  if (n.includes('startdate') || n.includes('enddate') || n === 'startdate' || n === 'enddate' || n === 'dob') return 'date';
  if (n.includes('email')) return 'email';
  if (n.includes('password')) return 'password';
  if (n.includes('note') || n.includes('address') || n === 'description' || n.includes('message')) return 'textarea';
  return 'text';
};

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-mono text-slate-800 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20';

const buildCurlPreview = (
  path: string,
  method: RequestMethod,
  query: Record<string, string | number | boolean>,
  skipAuth: boolean,
  init: { body?: BodyInit; headers: Record<string, string> }
) => {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const qs = new URLSearchParams();
  Object.entries(query).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    qs.append(k, String(v));
  });
  const q = qs.toString();
  const url = `${origin}${API_BASE_URL}${path}${q ? `?${q}` : ''}`;
  const parts = [`curl -sS -X ${method}`, `'${url.replace(/'/g, `'\\''`)}'`];
  if (!skipAuth) {
    const t = typeof localStorage !== 'undefined' ? localStorage.getItem('repowire_token')?.trim() : '';
    if (t) {
      const auth = t.startsWith('Bearer ') ? t : `Bearer ${t}`;
      parts.push(`-H 'Authorization: ${auth.replace(/'/g, `'\\''`)}'`);
    }
  }
  Object.entries(init.headers).forEach(([k, v]) => {
    if (k.toLowerCase() === 'authorization') return;
    parts.push(`-H '${k}: ${String(v).replace(/'/g, `'\\''`)}'`);
  });
  if (init.body instanceof FormData) {
    parts.push(`--form '…' # use multipart copy from browser DevTools for full form fields`);
  } else if (typeof init.body === 'string') {
    parts.push(`--data-raw '${init.body.slice(0, 200).replace(/'/g, `'\\''`)}${init.body.length > 200 ? '…' : ''}'`);
  }
  return parts.join(' \\\n  ');
};

export interface SwaggerApiConsoleProps {
  embedded?: boolean;
}

type SpecMeta = { title: string; version: string; host: string; basePath: string };

export default function SwaggerApiConsole({ embedded = true }: SwaggerApiConsoleProps) {
  const [loadState, setLoadState] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [specMeta, setSpecMeta] = useState<SpecMeta | null>(null);
  const [operations, setOperations] = useState<SwaggerOperation[]>([]);
  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState<'ALL' | RequestMethod>('ALL');
  const [activeTag, setActiveTag] = useState<string>('ALL');
  const [expandedTags, setExpandedTags] = useState<Record<string, boolean>>({});
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [jsonBodyByKey, setJsonBodyByKey] = useState<Record<string, string>>({});
  const [sendBearer, setSendBearer] = useState(true);
  const [autoPartnersId, setAutoPartnersId] = useState(true);
  const [executing, setExecuting] = useState(false);
  const [responseTab, setResponseTab] = useState<'json' | 'raw' | 'file'>('json');
  const [jsonSubTab, setJsonSubTab] = useState<'code' | 'table'>('code');
  const [parsedResponseBody, setParsedResponseBody] = useState<unknown>(null);
  const [responseJson, setResponseJson] = useState<string>('');
  const [responseRaw, setResponseRaw] = useState<string>('');
  const [responseBlob, setResponseBlob] = useState<{ blob: Blob; contentType: string; name?: string } | null>(null);
  const [lastStatus, setLastStatus] = useState<number | null>(null);
  const [execError, setExecError] = useState<string | null>(null);
  const [curlHint, setCurlHint] = useState<string>('');

  const [catalogRole, setCatalogRole] = useState<CatalogRole>(() =>
    normalizeCatalogRole(typeof localStorage !== 'undefined' ? localStorage.getItem('repowire_user_role') : null)
  );
  const [fullCatalog, setFullCatalog] = useState(() => {
    const r = normalizeCatalogRole(typeof localStorage !== 'undefined' ? localStorage.getItem('repowire_user_role') : null);
    return !(r === 'publisher' || r === 'advertiser');
  });

  const fullCatalogRef = useRef(fullCatalog);
  fullCatalogRef.current = fullCatalog;

  useEffect(() => {
    const syncRole = () => {
      setCatalogRole(normalizeCatalogRole(localStorage.getItem('repowire_user_role')));
    };
    window.addEventListener('storage', syncRole);
    window.addEventListener('focus', syncRole);
    return () => {
      window.removeEventListener('storage', syncRole);
      window.removeEventListener('focus', syncRole);
    };
  }, []);

  const prevCatalogRole = useRef(catalogRole);
  useEffect(() => {
    if (prevCatalogRole.current === catalogRole) return;
    prevCatalogRole.current = catalogRole;
    if (catalogRole === 'publisher' || catalogRole === 'advertiser') setFullCatalog(false);
    else setFullCatalog(true);
  }, [catalogRole]);

  const readPartnersFromStorage = () =>
    typeof localStorage !== 'undefined' ? localStorage.getItem('repowire_partners_id')?.trim() ?? '' : '';

  const loadSpec = useCallback(async () => {
    setLoadState('loading');
    setLoadError(null);
    try {
      const res = await fetch(SWAGGER_URL, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} loading swagger.json`);
      }
      const spec = (await res.json()) as OffersmetaSwaggerSpec;
      if (!spec.paths || typeof spec.paths !== 'object') {
        throw new Error('Invalid swagger: missing paths');
      }
      const ops = flattenSwaggerOperations(spec);
      setOperations(ops);
      setSpecMeta({
        title: spec.info?.title ?? 'Tracking',
        version: spec.info?.version ?? '—',
        host: spec.host ?? 'apiv2.offersmeta.in',
        basePath: spec.basePath ?? '/',
      });
      setLoadState('ok');
      if (ops.length > 0) {
        const role = normalizeCatalogRole(localStorage.getItem('repowire_user_role'));
        const visible = filterOperationsForRole(ops, role, fullCatalogRef.current);
        const first = visible[0] ?? ops[0];
        setSelectedKey(`${first.method}:${first.path}`);
        setParamValues(buildInitialValues(first, readPartnersFromStorage()));
        setSendBearer(!defaultSkipAuthForPath(first.path));
      }
      const tagKeys = new Set<string>();
      ops.forEach((o) => (o.tags.length ? o.tags : ['untagged']).forEach((t) => tagKeys.add(t)));
      const expand: Record<string, boolean> = { ALL: true };
      tagKeys.forEach((t) => {
        expand[t] = true;
      });
      setExpandedTags(expand);
    } catch (e) {
      setLoadState('error');
      setLoadError(e instanceof Error ? e.message : 'Failed to load swagger.json');
    }
  }, []);

  useEffect(() => {
    void loadSpec();
  }, [loadSpec]);

  const visibleOps = useMemo(
    () => filterOperationsForRole(operations, catalogRole, fullCatalog),
    [operations, catalogRole, fullCatalog]
  );

  const methodCounts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const op of visibleOps) {
      m[op.method] = (m[op.method] ?? 0) + 1;
    }
    return m;
  }, [visibleOps]);

  const tagIndex = useMemo(() => {
    const map = new Map<string, SwaggerOperation[]>();
    for (const op of visibleOps) {
      const tags = op.tags.length > 0 ? op.tags : ['untagged'];
      for (const tag of tags) {
        if (!map.has(tag)) map.set(tag, []);
        map.get(tag)!.push(op);
      }
    }
    return map;
  }, [visibleOps]);

  const sortedTags = useMemo(() => Array.from(tagIndex.keys()).sort((a, b) => a.localeCompare(b)), [tagIndex]);

  const filteredOps = useMemo(() => {
    const q = search.trim().toLowerCase();
    return visibleOps.filter((op) => {
      if (activeTag !== 'ALL' && !op.tags.includes(activeTag)) return false;
      if (methodFilter !== 'ALL' && op.method !== methodFilter) return false;
      if (!q) return true;
      const blob = `${op.method} ${op.path} ${op.tags.join(' ')} ${op.summary ?? ''} ${op.description ?? ''}`.toLowerCase();
      return blob.includes(q);
    });
  }, [visibleOps, search, activeTag, methodFilter]);

  useEffect(() => {
    if (loadState !== 'ok' || visibleOps.length === 0) return;
    const exists = visibleOps.some((o) => `${o.method}:${o.path}` === selectedKey);
    if (!exists) {
      const f = visibleOps[0];
      setSelectedKey(`${f.method}:${f.path}`);
    }
  }, [loadState, visibleOps, selectedKey]);

  const selectedOp = useMemo(() => {
    if (!selectedKey) return null;
    const sep = selectedKey.indexOf(':');
    if (sep < 0) return null;
    const method = selectedKey.slice(0, sep) as RequestMethod;
    const path = selectedKey.slice(sep + 1);
    return operations.find((o) => o.method === method && o.path === path) ?? null;
  }, [operations, selectedKey]);

  const opKey = selectedOp ? `${selectedOp.method}:${selectedOp.path}` : '';

  const tableFromResponse = useMemo(() => {
    if (!parsedResponseBody) return null;
    return extractTabularData(parsedResponseBody);
  }, [parsedResponseBody]);

  const hasBodyParam = Boolean(selectedOp?.parameters.some((p) => p.in === 'body'));

  useEffect(() => {
    if (!selectedOp) return;
    const key = `${selectedOp.method}:${selectedOp.path}`;
    setParamValues((prev) => {
      const partners = autoPartnersId ? readPartnersFromStorage() : '';
      const fresh = buildInitialValues(selectedOp, partners);
      const merged = { ...fresh };
      for (const k of Object.keys(fresh)) {
        if (prev[k] !== undefined && prev[k] !== '') merged[k] = prev[k];
      }
      return merged;
    });
    setSendBearer(!defaultSkipAuthForPath(selectedOp.path));
    setExecError(null);
    setResponseJson('');
    setResponseRaw('');
    setResponseBlob(null);
    setParsedResponseBody(null);
    setLastStatus(null);
    setJsonSubTab('code');
    setJsonBodyByKey((prev) => {
      if (prev[key] !== undefined) return prev;
      return { ...prev, [key]: '{\n  \n}' };
    });
  }, [selectedOp, autoPartnersId]);

  const paramsBySection = useMemo(() => {
    if (!selectedOp) {
      return { path: [] as SwaggerParameter[], query: [], formData: [], header: [] } as Record<string, SwaggerParameter[]>;
    }
    const path: SwaggerParameter[] = [];
    const query: SwaggerParameter[] = [];
    const formData: SwaggerParameter[] = [];
    const header: SwaggerParameter[] = [];
    for (const p of selectedOp.parameters) {
      if (p.in === 'body') continue;
      if (p.in === 'path') path.push(p);
      else if (p.in === 'query') query.push(p);
      else if (p.in === 'formData') formData.push(p);
      else if (p.in === 'header') header.push(p);
    }
    return { path, query, formData, header };
  }, [selectedOp]);

  const renderSmartField = (p: SwaggerParameter) => {
    if (!selectedOp) return null;
    const id = paramKey(selectedOp, p);
    const val = paramValues[id] ?? '';
    const w = inferParamWidget(p);
    const label = (
      <span className="text-[11px] font-semibold text-slate-700">
        {p.name}
        {p.required ? <span className="text-rose-600"> *</span> : null}
        <span className="text-slate-400 font-normal text-[10px]"> {p.type ?? 'string'}</span>
      </span>
    );

    const onChange = (next: string) => setParamValues((prev) => ({ ...prev, [id]: next }));

    if (w === 'checkbox') {
      return (
        <label key={id} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
          <input
            type="checkbox"
            className="mt-0.5 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
            checked={val === 'true'}
            onChange={(e) => onChange(e.target.checked ? 'true' : '')}
          />
          <span>
            {label}
            {p.description && <span className="block text-[10px] text-slate-500 font-normal mt-0.5">{p.description}</span>}
          </span>
        </label>
      );
    }

    if (w === 'textarea') {
      return (
        <label key={id} className="block space-y-1">
          {label}
          {p.description && <span className="block text-[10px] text-slate-500">{p.description}</span>}
          <textarea value={val} onChange={(e) => onChange(e.target.value)} rows={3} className={`${inputClass} resize-y min-h-[72px]`} />
        </label>
      );
    }

    const typeAttr = w === 'date' ? 'date' : w === 'number' ? 'number' : w === 'email' ? 'email' : w === 'password' ? 'password' : 'text';

    return (
      <label key={id} className="block space-y-1">
        {label}
        {p.description && <span className="block text-[10px] text-slate-500">{p.description}</span>}
        <input type={typeAttr} value={val} onChange={(e) => onChange(e.target.value)} className={inputClass} autoComplete="off" />
      </label>
    );
  };

  const renderParamSection = (title: string, list: SwaggerParameter[], icon?: ReactNode) => {
    if (!selectedOp || list.length === 0) return null;
    const grid = list.length >= 5 ? 'grid gap-3 sm:grid-cols-2' : 'space-y-3';
    return (
      <div className="rounded-xl border border-slate-200/90 bg-gradient-to-b from-slate-50/90 to-white p-3 shadow-sm">
        <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          {icon}
          {title}
          <span className="ml-auto rounded-full bg-slate-200/80 px-2 py-0.5 text-[9px] font-bold text-slate-600">{list.length}</span>
        </p>
        <div className={grid}>{list.map((p) => renderSmartField(p))}</div>
      </div>
    );
  };

  const runOperation = async () => {
    if (!selectedOp) return;
    setExecError(null);
    setResponseJson('');
    setResponseRaw('');
    setResponseBlob(null);
    setParsedResponseBody(null);
    setCurlHint('');
    setExecuting(true);
    setResponseTab('json');
    setJsonSubTab('code');

    const pathParams: Record<string, string> = {};
    const query: Record<string, string | number | boolean> = {};
    const form: Record<string, unknown> = {};
    const headers: Record<string, string> = {};

    try {
      for (const p of selectedOp.parameters) {
        if (p.in === 'body') continue;
        const key = paramKey(selectedOp, p);
        let raw = paramValues[key] ?? '';
        const partnersLive = readPartnersFromStorage();

        if (p.name === 'partners_Id' && !raw && autoPartnersId && partnersLive) {
          raw = partnersLive;
        }

        if (p.required && (p.type ?? '').toLowerCase() === 'boolean') {
          if (raw !== 'true' && raw !== 'false') {
            throw new Error(`Required boolean: ${p.name} — toggle on or off`);
          }
        } else if (p.required && (!raw || !String(raw).trim())) {
          throw new Error(`Required: ${p.name} (${p.in})`);
        }
        if (!raw && !p.required) continue;

        const value = String(raw).trim();
        if (p.in === 'path') pathParams[p.name] = value;
        else if (p.in === 'query') {
          const t = (p.type ?? '').toLowerCase();
          if (t === 'boolean') query[p.name] = value === 'true';
          else {
            const num = Number(value);
            const asNumber = inferParamWidget(p) === 'number' && Number.isFinite(num) && value !== '';
            query[p.name] = asNumber ? num : value;
          }
        } else if (p.in === 'formData') {
          const t = (p.type ?? '').toLowerCase();
          form[p.name] = t === 'boolean' ? value === 'true' : value;
        } else if (p.in === 'header') headers[p.name] = value;
      }

      const resolvedPath = applyPathParams(selectedOp.path, pathParams);
      const hasFormData = selectedOp.parameters.some((p) => p.in === 'formData');
      const skipAuth = !sendBearer;

      let jsonBody: Record<string, unknown> | undefined;
      if (hasBodyParam && !hasFormData) {
        const rawJson = jsonBodyByKey[opKey] ?? '{}';
        try {
          const parsed = JSON.parse(rawJson) as unknown;
          if (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)) {
            jsonBody = parsed as Record<string, unknown>;
          } else {
            throw new Error('JSON body must be an object at the root');
          }
        } catch {
          throw new Error('Invalid JSON body');
        }
      }

      const execOpts =
        selectedOp.method === 'GET' || selectedOp.method === 'DELETE'
          ? { method: selectedOp.method, query, skipAuth, headers }
          : hasFormData
            ? {
                method: selectedOp.method,
                query: Object.keys(query).length ? query : undefined,
                body: form,
                asFormData: true,
                skipAuth,
                headers,
              }
            : jsonBody !== undefined
              ? {
                  method: selectedOp.method,
                  query: Object.keys(query).length ? query : undefined,
                  body: jsonBody,
                  skipAuth,
                  headers,
                }
              : Object.keys(form).length > 0
                ? {
                    method: selectedOp.method,
                    query: Object.keys(query).length ? query : undefined,
                    body: form,
                    asUrlEncoded: true,
                    skipAuth,
                    headers,
                  }
                : {
                    method: selectedOp.method,
                    query: Object.keys(query).length ? query : undefined,
                    skipAuth,
                    headers,
                  };

      setCurlHint(
        buildCurlPreview(resolvedPath, selectedOp.method, query as Record<string, string | number | boolean>, skipAuth, {
          headers: { Accept: 'application/json, text/plain, */*', ...headers },
          body: undefined,
        })
      );

      const result = await apiExecute(resolvedPath, execOpts);
      setLastStatus(result.status);

      if (result.kind === 'json') {
        setResponseTab('json');
        setParsedResponseBody(result.body);
        setResponseJson(JSON.stringify(result.body, null, 2));
      } else if (result.kind === 'text') {
        setResponseTab('raw');
        setResponseRaw(result.text);
      } else {
        setResponseTab('file');
        setResponseBlob({
          blob: result.blob,
          contentType: result.contentType,
          name: result.filename,
        });
      }
    } catch (e) {
      if (e instanceof ApiError) {
        setExecError(`HTTP ${e.status}: ${typeof e.data === 'string' ? e.data : JSON.stringify(e.data)}`);
        setResponseTab('json');
        setParsedResponseBody(e.data);
        setResponseJson(JSON.stringify(e.data, null, 2));
        setLastStatus(e.status);
      } else if (e instanceof Error) {
        setExecError(e.message);
      } else {
        setExecError('Request failed');
      }
    } finally {
      setExecuting(false);
    }
  };

  const downloadBlob = () => {
    if (!responseBlob) return;
    const url = URL.createObjectURL(responseBlob.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = responseBlob.name || 'download.bin';
    a.click();
    URL.revokeObjectURL(url);
  };

  const shellClass = embedded
    ? 'rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden'
    : 'rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden min-h-[calc(100vh-7rem)] flex flex-col';

  const Skeleton = () => (
    <div className="animate-pulse space-y-3 p-2">
      <div className="h-10 rounded-lg bg-slate-200" />
      <div className="h-24 rounded-lg bg-slate-100" />
      <div className="h-24 rounded-lg bg-slate-100" />
    </div>
  );

  return (
    <section className={shellClass}>
      <div className="border-b border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
            <Layers size={22} />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-tight">API Studio</h2>
              {specMeta && (
                <span className="rounded-md border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-cyan-100/90">
                  {specMeta.title} {specMeta.version}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              OAS 2.0 · Base{' '}
              <span className="font-mono text-cyan-200/90">{specMeta ? `https://${specMeta.host}${specMeta.basePath}` : 'apiv2.offersmeta.in/'}</span>
              — GET, POST, PUT, DELETE, PATCH from live <code className="text-slate-300">swagger.json</code>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {loadState === 'ok' && (
            <div className="hidden sm:flex flex-wrap gap-1">
              {(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const).map((m) => {
                const c = methodCounts[m] ?? 0;
                if (c === 0) return null;
                return (
                  <span
                    key={m}
                    className={`rounded border px-1.5 py-0.5 text-[9px] font-bold ${methodBadgeClass[m as RequestMethod] ?? ''}`}
                  >
                    {m} {c}
                  </span>
                );
              })}
            </div>
          )}
          {loadState === 'ok' && (
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-cyan-200">
              {visibleOps.length === operations.length
                ? `${operations.length} ops`
                : `${visibleOps.length}/${operations.length}`}
            </span>
          )}
          <button
            type="button"
            onClick={() => void loadSpec()}
            disabled={loadState === 'loading'}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-white/15 disabled:opacity-50"
          >
            {loadState === 'loading' ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
            Sync spec
          </button>
          <a
            href="https://apiv2.offersmeta.in/API-docs/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-lg bg-cyan-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-cyan-500"
          >
            Authorize (docs)
          </a>
        </div>
      </div>

      <div className={embedded ? 'p-4' : 'p-4 flex-1 flex flex-col min-h-0'}>
        {loadState === 'ok' && (
          <div className="mb-4 flex flex-col gap-2 rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Role filter</span>
              <span className="mx-1.5 text-slate-300">·</span>
              <span className="text-slate-700">{catalogRoleLabel[catalogRole]}</span>
              <span className="mx-1.5 text-slate-300">·</span>
              <span className="font-mono text-[11px] text-cyan-800">
                {visibleOps.length}/{operations.length}
              </span>
              <span className="text-slate-500"> endpoints in sidebar</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {(catalogRole === 'publisher' || catalogRole === 'advertiser') && (
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-700 shadow-sm hover:border-cyan-300">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                    checked={fullCatalog}
                    onChange={(e) => setFullCatalog(e.target.checked)}
                  />
                  Show full Tracking catalog
                </label>
              )}
              {catalogRole === 'admin' && (
                <span className="text-[11px] font-medium text-slate-500">Full catalog (admin / manager)</span>
              )}
              {catalogRole === 'unknown' && (
                <span className="text-[11px] text-amber-800">Role not set — showing entire spec. Log in as Publisher or Advertiser to auto-filter.</span>
              )}
            </div>
          </div>
        )}

        {loadState === 'error' && (
          <div className="mb-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Could not load swagger.json</p>
              <p className="mt-0.5">{loadError}</p>
              <p className="mt-1 font-mono text-[10px] text-rose-700">{SWAGGER_URL}</p>
            </div>
          </div>
        )}

        <div
          className={`flex flex-col gap-4 min-h-0 ${embedded ? 'min-h-[520px]' : 'flex-1'} lg:flex-row lg:items-stretch lg:gap-3`}
        >
          {/* Tags */}
          <aside className="flex flex-col rounded-xl border border-slate-200 bg-slate-50/90 min-h-[200px] max-h-[480px] lg:w-56 lg:max-h-none lg:shrink-0">
            <div className="p-2 border-b border-slate-200/80 flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide">
                <FolderOpen size={14} />
                Swagger tags
              </span>
              <button
                type="button"
                className="text-[10px] font-semibold text-cyan-700 hover:underline"
                onClick={() => {
                  const next: Record<string, boolean> = { ALL: true };
                  sortedTags.forEach((t) => {
                    next[t] = true;
                  });
                  setExpandedTags(next);
                }}
              >
                Expand all
              </button>
            </div>
            <div className="p-2 overflow-y-auto flex-1 space-y-0.5">
              {loadState === 'loading' && <Skeleton />}
              {loadState === 'ok' && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTag('ALL');
                      setExpandedTags((e) => ({ ...e, ALL: true }));
                    }}
                    className={`w-full flex items-center justify-between rounded-lg px-2 py-2.5 text-left text-xs font-semibold transition-colors ${
                      activeTag === 'ALL' ? 'bg-cyan-700 text-white shadow' : 'text-slate-700 hover:bg-white'
                    }`}
                  >
                    <span>All endpoints</span>
                    <span className="opacity-80">{visibleOps.length}</span>
                  </button>
                  {sortedTags.map((tag) => {
                    const count = tagIndex.get(tag)?.length ?? 0;
                    const open = expandedTags[tag] ?? false;
                    return (
                      <div key={tag} className="rounded-lg border border-slate-100/80 bg-white/40">
                        <button
                          type="button"
                          onClick={() => {
                            setExpandedTags((e) => ({ ...e, [tag]: !open }));
                            setActiveTag(tag);
                          }}
                          className={`w-full flex items-center gap-1 rounded-lg px-2 py-2 text-left text-[11px] font-semibold transition-colors ${
                            activeTag === tag ? 'bg-cyan-600 text-white' : 'text-slate-700 hover:bg-white'
                          }`}
                        >
                          <ChevronRight size={12} className={`shrink-0 transition-transform ${open ? 'rotate-90' : ''}`} />
                          <span className="truncate flex-1 leading-snug">{tag}</span>
                          <span className="text-[10px] opacity-80">{count}</span>
                        </button>
                        {open && (
                          <div className="px-1 pb-1 space-y-0.5 max-h-36 overflow-y-auto">
                            {(tagIndex.get(tag) ?? []).slice(0, 10).map((op) => {
                              const k = `${op.method}:${op.path}`;
                              return (
                                <button
                                  key={k}
                                  type="button"
                                  onClick={() => setSelectedKey(k)}
                                  className={`w-full text-left rounded-md px-1.5 py-1 font-mono text-[9px] leading-tight truncate ${
                                    k === selectedKey ? 'bg-cyan-100 text-cyan-900 font-semibold' : 'text-slate-600 hover:bg-slate-100'
                                  }`}
                                >
                                  <span className="font-extrabold text-cyan-800">{op.method}</span> {op.path}
                                </button>
                              );
                            })}
                            {(tagIndex.get(tag) ?? []).length > 10 && (
                              <p className="text-[9px] text-slate-400 px-1.5 py-1">Scroll center list for full group</p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </aside>

          {/* Ops + workspace */}
          <div className="flex flex-col flex-1 min-w-0 gap-4 lg:flex-row lg:min-h-[560px]">
            <div className="flex flex-col rounded-xl border border-slate-200 bg-white min-h-[240px] max-h-[420px] lg:w-[min(100%,380px)] lg:max-h-none shrink-0">
              <div className="p-2 border-b border-slate-100 space-y-2 shrink-0">
                <div className="relative">
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search paths, tags…"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-2 py-2 text-xs"
                  />
                </div>
                <select
                  value={methodFilter}
                  onChange={(e) => setMethodFilter(e.target.value as 'ALL' | RequestMethod)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-[11px] font-semibold text-slate-700"
                >
                  <option value="ALL">All methods</option>
                  {(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const).map((m) => (
                    <option key={m} value={m}>
                      {m} {methodCounts[m] != null ? `(${methodCounts[m]})` : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div className="overflow-y-auto flex-1 p-2 space-y-1.5 min-h-0">
                {loadState === 'loading' && <Skeleton />}
                {filteredOps.map((op) => {
                  const key = `${op.method}:${op.path}`;
                  const active = key === selectedKey;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedKey(key)}
                      className={`w-full text-left rounded-xl border px-3 py-2.5 transition-all ${
                        active
                          ? 'border-cyan-400 bg-gradient-to-br from-cyan-50 to-white shadow-md ring-1 ring-cyan-200/60'
                          : 'border-slate-100 bg-slate-50/40 hover:border-slate-200 hover:bg-white hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span
                          className={`shrink-0 rounded-md px-2 py-0.5 text-[9px] font-extrabold border mt-0.5 ${
                            methodBadgeClass[op.method] ?? 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {op.method}
                        </span>
                        <span className="font-mono text-[11px] text-slate-800 break-all leading-snug">{op.path}</span>
                      </div>
                      <p className="mt-1 pl-1 text-[10px] text-slate-500 line-clamp-2">{op.summary || op.description || op.tags.join(' · ')}</p>
                    </button>
                  );
                })}
                {loadState === 'ok' && filteredOps.length === 0 && (
                  <p className="text-xs text-slate-500 p-4 text-center">No operations match filters.</p>
                )}
              </div>
            </div>

            <div className="flex flex-col flex-1 min-w-0 min-h-[480px] rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
              {!selectedOp ? (
                <p className="p-8 text-sm text-slate-500 text-center">Select an endpoint from the catalog.</p>
              ) : (
                <>
                  <div className="p-3 border-b border-slate-100 bg-slate-50/80 space-y-2 shrink-0">
                    <nav className="text-[10px] text-slate-500 truncate">
                      <span className="font-semibold text-slate-600">{selectedOp.tags[0] ?? 'Module'}</span>
                      <span className="mx-1">/</span>
                      <span className="font-mono text-slate-700">{selectedOp.path}</span>
                    </nav>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-lg px-2.5 py-1 text-[10px] font-extrabold border ${methodBadgeClass[selectedOp.method]}`}>
                        {selectedOp.method}
                      </span>
                      <code className="text-xs font-mono text-slate-900 break-all font-semibold">{selectedOp.path}</code>
                      {lastStatus !== null && (
                        <span
                          className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            lastStatus >= 200 && lastStatus < 300 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          HTTP {lastStatus}
                        </span>
                      )}
                    </div>
                    {(selectedOp.summary || selectedOp.description) && (
                      <p className="text-[11px] text-slate-600 leading-relaxed border-l-2 border-cyan-400 pl-2">
                        {selectedOp.summary || selectedOp.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-4 pt-1">
                      <label className="inline-flex items-center gap-2 text-[11px] text-slate-700 cursor-pointer select-none">
                        <input type="checkbox" checked={sendBearer} onChange={(e) => setSendBearer(e.target.checked)} className="rounded border-slate-300" />
                        Bearer token
                      </label>
                      <label className="inline-flex items-center gap-2 text-[11px] text-slate-700 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={autoPartnersId}
                          onChange={(e) => setAutoPartnersId(e.target.checked)}
                          className="rounded border-slate-300"
                        />
                        Auto-fill partners_Id
                      </label>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0 bg-white">
                    {renderParamSection('Path parameters', paramsBySection.path, <LayoutGrid size={12} />)}
                    {renderParamSection('Query string', paramsBySection.query, <Search size={12} />)}
                    {renderParamSection('Form data (multipart)', paramsBySection.formData, <Braces size={12} />)}
                    {renderParamSection('Headers', paramsBySection.header, <Terminal size={12} />)}

                    {hasBodyParam && (
                      <div className="rounded-xl border border-slate-200 bg-slate-950 p-3 space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1">
                          <Braces size={12} /> JSON body
                        </p>
                        <textarea
                          value={jsonBodyByKey[opKey] ?? '{\n  \n}'}
                          onChange={(e) => setJsonBodyByKey((prev) => ({ ...prev, [opKey]: e.target.value }))}
                          spellCheck={false}
                          rows={9}
                          className="w-full rounded-lg border border-slate-700 bg-slate-900 p-2.5 font-mono text-[11px] text-cyan-100 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
                        />
                      </div>
                    )}

                    {!paramsBySection.path.length &&
                      !paramsBySection.query.length &&
                      !paramsBySection.formData.length &&
                      !paramsBySection.header.length &&
                      !hasBodyParam && (
                        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-6 text-center text-xs text-slate-500">
                          No parameters in this spec entry. Use <strong className="text-slate-700">Execute</strong> to call the endpoint as-is (typical
                          for simple GETs).
                        </div>
                      )}
                  </div>

                  <div className="p-3 border-t border-slate-200 space-y-2 shrink-0 bg-gradient-to-r from-slate-50 to-white">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => void runOperation()}
                        disabled={executing}
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700 disabled:opacity-50"
                      >
                        {executing ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
                        Run {selectedOp.method}
                      </button>
                      {curlHint && (
                        <button
                          type="button"
                          onClick={() => void navigator.clipboard.writeText(curlHint)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-[11px] font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          <ClipboardCopy size={14} />
                          Copy cURL
                        </button>
                      )}
                    </div>
                    {execError && (
                      <p className="text-xs text-rose-800 rounded-xl bg-rose-50 border border-rose-100 px-3 py-2">{execError}</p>
                    )}
                  </div>

                  <div className="border-t-2 border-slate-200 bg-slate-950 flex flex-col min-h-[220px] shrink-0">
                    <div className="flex flex-wrap items-center border-b border-slate-800 bg-slate-900/50 px-1">
                      {(
                        [
                          ['json', 'JSON', Braces],
                          ['raw', 'Raw', Terminal],
                          ['file', 'File', FileDown],
                        ] as const
                      ).map(([id, label, Icon]) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setResponseTab(id)}
                          className={`flex items-center gap-1.5 px-3 py-2.5 text-[10px] font-bold uppercase tracking-wide ${
                            responseTab === id ? 'text-cyan-300 border-b-2 border-cyan-400 -mb-px bg-slate-950' : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          <Icon size={12} />
                          {label}
                        </button>
                      ))}
                      {responseTab === 'json' && tableFromResponse && (
                        <div className="ml-auto flex rounded-lg border border-slate-700 overflow-hidden mr-1 my-1">
                          <button
                            type="button"
                            onClick={() => setJsonSubTab('code')}
                            className={`px-2 py-1 text-[10px] font-bold ${jsonSubTab === 'code' ? 'bg-cyan-700 text-white' : 'text-slate-400'}`}
                          >
                            Code
                          </button>
                          <button
                            type="button"
                            onClick={() => setJsonSubTab('table')}
                            className={`flex items-center gap-1 px-2 py-1 text-[10px] font-bold ${
                              jsonSubTab === 'table' ? 'bg-cyan-700 text-white' : 'text-slate-400'
                            }`}
                          >
                            <Table2 size={10} />
                            Data
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="p-3 overflow-auto flex-1 min-h-[180px] max-h-[min(50vh,420px)]">
                      {responseTab === 'json' && jsonSubTab === 'code' && (
                        <pre className="text-[11px] leading-relaxed text-cyan-100 whitespace-pre-wrap font-mono">{responseJson || '—'}</pre>
                      )}
                      {responseTab === 'json' && jsonSubTab === 'table' && tableFromResponse && (
                        <div className="overflow-x-auto rounded-lg border border-slate-700">
                          <table className="w-full text-left text-[10px] text-slate-200">
                            <thead>
                              <tr className="border-b border-slate-700 bg-slate-900">
                                {tableFromResponse.columns.map((col) => (
                                  <th key={col} className="px-2 py-2 font-bold text-cyan-200 whitespace-nowrap">
                                    {col}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {tableFromResponse.rows.map((row, ri) => (
                                <tr key={ri} className="border-b border-slate-800/80 hover:bg-slate-900/80">
                                  {tableFromResponse.columns.map((col) => (
                                    <td key={col} className="px-2 py-1.5 font-mono text-slate-300 max-w-[200px] truncate" title={String(row[col] ?? '')}>
                                      {formatCell(row[col])}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <p className="text-[10px] text-slate-500 px-2 py-1 bg-slate-900/80">
                            Showing {tableFromResponse.rows.length} rows · switch to Code for full JSON
                          </p>
                        </div>
                      )}
                      {responseTab === 'raw' && (
                        <pre className="text-[11px] leading-relaxed text-slate-200 whitespace-pre-wrap font-mono">{responseRaw || '—'}</pre>
                      )}
                      {responseTab === 'file' && (
                        <div className="text-xs text-slate-300 space-y-3">
                          {responseBlob ? (
                            <>
                              <p>
                                <span className="text-slate-500">Content-Type:</span> {responseBlob.contentType}
                              </p>
                              <p>
                                <span className="text-slate-500">Size:</span> {(responseBlob.blob.size / 1024).toFixed(1)} KB
                              </p>
                              <button
                                type="button"
                                onClick={downloadBlob}
                                className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2.5 font-bold text-white hover:bg-cyan-500"
                              >
                                <FileDown size={16} />
                                Download
                              </button>
                            </>
                          ) : (
                            <p className="text-slate-500">Excel / export responses open here (GET download endpoints).</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function formatCell(v: unknown): string {
  if (v === null || v === undefined) return '';
  if (typeof v === 'object') return JSON.stringify(v);
  return String(v);
}
