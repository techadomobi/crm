import { AlertTriangle, CheckCircle2, Loader2, RefreshCw, ShieldAlert } from 'lucide-react';
import { NavPage } from '../types';
import { useModuleFunctionality } from '../hooks/useModuleFunctionality';

interface ModuleFunctionalityPanelProps {
  activePage: NavPage;
}

const badgeClass = {
  pass: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  warn: 'border-amber-200 bg-amber-50 text-amber-700',
  fail: 'border-rose-200 bg-rose-50 text-rose-700',
} as const;

const navigateTo = (page: NavPage) => {
  window.dispatchEvent(new CustomEvent('repowire:navigate', { detail: { page } }));
};

export default function ModuleFunctionalityPanel({ activePage }: ModuleFunctionalityPanelProps) {
  const { supported, results, loading, runChecks, summary } = useModuleFunctionality(activePage);

  if (!supported) {
    return (
      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900">Module functionality</h3>
        <p className="mt-2 text-sm text-slate-600">This module uses centralized API Studio controls. Use API Studio for execution and API Health for diagnostics.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={() => navigateTo('apiStudio')} className="rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700 hover:bg-cyan-100">
            Open API Studio
          </button>
          <button type="button" onClick={() => navigateTo('apiHealth')} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100">
            Open API Health
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Functional operations</h3>
          <p className="mt-1 text-xs text-slate-500">Live operational checks for this module. Endpoint routes are abstracted behind service handlers.</p>
        </div>
        <button
          type="button"
          onClick={() => void runChecks()}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-cyan-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-cyan-800 disabled:opacity-60"
        >
          {loading ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
          Refresh checks
        </button>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Total</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{summary.total}</p>
        </article>
        <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">Pass</p>
          <p className="mt-1 text-xl font-bold text-emerald-700">{summary.pass}</p>
        </article>
        <article className="rounded-xl border border-amber-200 bg-amber-50 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-700">Warn</p>
          <p className="mt-1 text-xl font-bold text-amber-700">{summary.warn}</p>
        </article>
        <article className="rounded-xl border border-rose-200 bg-rose-50 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-rose-700">Fail</p>
          <p className="mt-1 text-xl font-bold text-rose-700">{summary.fail}</p>
        </article>
      </div>

      <div className="mt-4 space-y-2">
        {results.map((row) => (
          <div key={row.key} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
            <div>
              <p className="text-sm font-medium text-slate-900">{row.title}</p>
              <p className="text-xs text-slate-500">{row.detail}</p>
            </div>
            <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase ${badgeClass[row.status]}`}>
              {row.status}
            </span>
          </div>
        ))}
      </div>

      {summary.fail > 0 && (
        <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800">
          <AlertTriangle size={13} />
          Some operational checks failed. Open API Health for full cross-catalog diagnostics.
        </div>
      )}

      {summary.fail === 0 && summary.total > 0 && (
        <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
          <CheckCircle2 size={13} />
          Module operations are healthy with current session context.
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <ShieldAlert size={12} />
        Auth-limited responses may surface as warnings depending on role scope.
      </div>
    </section>
  );
}
