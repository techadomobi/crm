import { useMemo } from 'react';
import { Activity, AlertTriangle, CheckCircle2, Loader2, RefreshCw, ShieldAlert } from 'lucide-react';
import { SmokeResult } from '../api/smokeTests';
import { useApiHealthReport } from '../hooks/useApiHealthReport';

const badgeClass: Record<SmokeResult['status'], string> = {
  pass: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  warn: 'border-amber-200 bg-amber-50 text-amber-700',
  fail: 'border-rose-200 bg-rose-50 text-rose-700',
  skip: 'border-slate-200 bg-slate-100 text-slate-700',
};

export default function ApiHealth() {
  const {
    results,
    loading,
    notice,
    setNotice,
    lastRunAt,
    includeMutations,
    setIncludeMutations,
    runChecks,
    totals,
    catalogSource,
    catalogSourceUrl,
    fallbackReason,
  } = useApiHealthReport();

  const moduleName = (row: SmokeResult) => row.endpoint.split('/')[1] || 'core';

  const visibleRows = useMemo(
    () => results.map((row) => ({ ...row, module: moduleName(row) })),
    [results]
  );

  return (
    <div className="space-y-5 animate-fade-in">
      {notice && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-900 flex items-center justify-between">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="text-xs font-semibold text-amber-700 hover:text-amber-900">Dismiss</button>
        </div>
      )}

      <section className="rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-sky-50 p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white px-3 py-1 text-xs font-semibold text-cyan-700 shadow-sm">
              <Activity size={14} />
              Live API diagnostics
            </div>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">OffersMeta API Health</h1>
            <p className="mt-2 text-sm text-slate-600">
              This runs smoke checks across all swagger-documented endpoints using the current session token and partners_Id. Validation/auth responses are marked as warnings, while transport and server failures are marked as failures.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void runChecks()}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800 disabled:opacity-60"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
            Run checks
          </button>
        </div>

        <label className="mt-3 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700">
          <input
            type="checkbox"
            className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
            checked={includeMutations}
            onChange={(event) => setIncludeMutations(event.target.checked)}
          />
          Include write endpoints (POST/PUT/PATCH/DELETE) in live checks
        </label>
      </section>

      <section className="grid grid-cols-2 gap-4 md:grid-cols-5 xl:grid-cols-6">
        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Catalog endpoints</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{totals.total.toLocaleString()}</p>
        </article>
        <article className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Executed</p>
          <p className="mt-1 text-2xl font-bold text-cyan-700">{totals.executed.toLocaleString()}</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-slate-100 p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-700">Skipped</p>
          <p className="mt-1 text-2xl font-bold text-slate-700">{totals.skip.toLocaleString()}</p>
        </article>
        <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Pass</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700">{totals.pass.toLocaleString()}</p>
        </article>
        <article className="rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Warn</p>
          <p className="mt-1 text-2xl font-bold text-amber-700">{totals.warn.toLocaleString()}</p>
        </article>
        <article className="rounded-2xl border border-rose-200 bg-rose-50 p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">Fail</p>
          <p className="mt-1 text-2xl font-bold text-rose-700">{totals.fail.toLocaleString()}</p>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Endpoint results</h2>
            <p className="mt-1 text-xs text-slate-500">
              {lastRunAt ? `Last run: ${lastRunAt.toLocaleTimeString()} • ${totals.executed} executed / ${totals.total} catalog endpoints` : 'No checks run yet'}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Catalog source: {catalogSource === 'swagger' ? 'Live Swagger' : catalogSource === 'core' ? 'Core checks' : 'Swagger unavailable'}
              {catalogSourceUrl ? ` • ${catalogSourceUrl}` : ''}
            </p>
            {catalogSource === 'core-fallback' && fallbackReason && (
              <p className="mt-1 text-xs text-rose-600">{fallbackReason}</p>
            )}
          </div>
          <div className="inline-flex items-center gap-1 text-xs text-slate-500">
            <ShieldAlert size={13} />
            Auth failures show as warnings for protected routes.
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Module</th>
                <th className="px-5 py-3">Method</th>
                <th className="px-5 py-3">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {results.length === 0 && !loading && (
                <tr>
                  <td className="px-5 py-8 text-center text-sm text-slate-500" colSpan={5}>
                    No results yet. Run checks to validate API health.
                  </td>
                </tr>
              )}
              {visibleRows.map((row) => (
                <tr key={`${row.method}-${row.endpoint}-${row.name}`} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3">
                    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold uppercase ${badgeClass[row.status]}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-800 font-medium">{row.name}</td>
                  <td className="px-5 py-3 text-slate-700 capitalize">{row.module}</td>
                  <td className="px-5 py-3 text-slate-700">{row.method}</td>
                  <td className="px-5 py-3 text-slate-700">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {loading && (
          <div className="border-t border-slate-100 px-5 py-3 text-sm text-slate-500 flex items-center gap-2">
            <Loader2 size={14} className="animate-spin" />
            Running API health checks...
          </div>
        )}
      </section>

      {totals.fail === 0 && results.length > 0 && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 flex items-center gap-2">
          <CheckCircle2 size={15} className="text-emerald-700" />
          No hard endpoint failures detected in this run.
        </div>
      )}

      {totals.fail > 0 && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900 flex items-center gap-2">
          <AlertTriangle size={15} className="text-rose-700" />
          Some endpoints failed. Check token scope, partners_Id, and role-specific identifiers.
        </div>
      )}
    </div>
  );
}
