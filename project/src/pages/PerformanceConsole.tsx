import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, CalendarDays, Download, Loader2, RefreshCw, Search } from 'lucide-react';
import { extractTabularData } from '../lib/swaggerTableData';
import { PerformanceTab, reportingConsoleService, toCsv } from '../services/reportingConsole';

const tabs: Array<{ key: PerformanceTab; label: string }> = [
  { key: 'generalReport', label: 'General Report' },
  { key: 'affiliatesReport', label: 'Affiliates Report' },
  { key: 'eventReport', label: 'Event Report' },
];

const getPartnersId = () =>
  (localStorage.getItem('repowire_partners_id')
    ?? localStorage.getItem('repowire_partners_Id')
    ?? localStorage.getItem('partners_Id')
    ?? '')
    .trim();

export default function PerformanceConsole() {
  const [tab, setTab] = useState<PerformanceTab>('generalReport');
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [source, setSource] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await reportingConsoleService.performance(tab, {
        partners_Id: getPartnersId(),
        startDate,
        endDate,
        search,
        page: 1,
        limit: 200,
      });
      setRows(result.rows);
      setSource(result.endpoint);
      const table = extractTabularData(result.rows);
      const fallbackColumns = result.rows[0] ? Object.keys(result.rows[0]).slice(0, 14) : [];
      setColumns(table?.columns ?? fallbackColumns);
    } catch (err) {
      setRows([]);
      setColumns([]);
      setSource('');
      setError(err instanceof Error ? err.message : 'Failed to load performance rows.');
    } finally {
      setLoading(false);
    }
  };

  const exportCsv = () => {
    if (!rows.length) return;
    const csv = toCsv(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-${tab}-${startDate}-to-${endDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const visibleRows = useMemo(() => rows.slice(0, 300), [rows]);

  useEffect(() => {
    void run();
    // Automatically keep list in sync with active tab and date filters.
  }, [tab, startDate, endDate]);

  useEffect(() => {
    const onSessionUpdated = () => {
      void run();
    };

    window.addEventListener('repowire-session-updated', onSessionUpdated as EventListener);
    return () => window.removeEventListener('repowire-session-updated', onSessionUpdated as EventListener);
  }, [tab, startDate, endDate, search]);

  return (
    <div className="space-y-5 animate-fade-in">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-semibold ${
                tab === item.key ? 'border-cyan-200 bg-cyan-50 text-cyan-800' : 'border-slate-200 bg-white text-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Date from</span>
            <div className="relative">
              <CalendarDays size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm" />
            </div>
          </label>
          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Date to</span>
            <div className="relative">
              <CalendarDays size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm" />
            </div>
          </label>
          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Search</span>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name / offer / id ..." className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm" />
            </div>
          </label>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">{source ? `Live source: ${source}` : 'Run query to load live rows.'}</div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={exportCsv} disabled={!rows.length} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50">
              <Download size={14} />
              Export
            </button>
            <button type="button" onClick={() => void run()} disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800 disabled:opacity-60">
              {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
              Refresh Data
            </button>
          </div>
        </div>
      </section>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 flex items-center gap-2">
          <AlertCircle size={14} />
          API Error: {error}
        </div>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                {columns.length === 0 ? <th className="px-4 py-3">No columns</th> : columns.map((col) => <th key={col} className="px-4 py-3 whitespace-nowrap">{col}</th>)}
              </tr>
            </thead>
            <tbody>
              {!visibleRows.length && (
                <tr>
                  <td colSpan={Math.max(columns.length, 1)} className="px-4 py-8 text-center text-sm text-slate-500">
                    {loading ? 'Loading live performance rows...' : 'No performance rows found for selected date range and filters.'}
                  </td>
                </tr>
              )}
              {visibleRows.map((row, index) => (
                <tr key={`${tab}-${index}`} className="border-b border-slate-100 hover:bg-slate-50">
                  {columns.map((col) => (
                    <td key={col} className="px-4 py-3 text-slate-700">{String(row[col] ?? '—')}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
