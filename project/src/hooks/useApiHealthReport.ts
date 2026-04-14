import { useCallback, useEffect, useMemo, useState } from 'react';
import { runSmokeTestsReport, SmokeResult } from '../api/smokeTests';

export function useApiHealthReport() {
  const [results, setResults] = useState<SmokeResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [lastRunAt, setLastRunAt] = useState<Date | null>(null);
  const [hasSuccessfulRun, setHasSuccessfulRun] = useState(false);
  const [catalogTotal, setCatalogTotal] = useState(0);
  const [executedTotal, setExecutedTotal] = useState(0);
  const [includeMutations, setIncludeMutations] = useState(false);
  const [catalogSource, setCatalogSource] = useState<'swagger' | 'core' | 'core-fallback'>('core');
  const [catalogSourceUrl, setCatalogSourceUrl] = useState<string | null>(null);
  const [fallbackReason, setFallbackReason] = useState<string | null>(null);

  const runChecks = useCallback(async () => {
    setLoading(true);
    setNotice(null);
    try {
      const report = await runSmokeTestsReport({
        scope: 'all',
        includeMutations,
        onProgress: (progress) => {
          setResults(progress.results);
          setCatalogTotal(progress.catalogTotal);
          setExecutedTotal(progress.executedTotal);
        },
      });
      setResults(report.results);
      setCatalogTotal(report.catalogTotal);
      setExecutedTotal(report.executedTotal);
      setCatalogSource(report.source);
      setCatalogSourceUrl(report.sourceUrl ?? null);
      setFallbackReason(report.fallbackReason ?? null);
      setLastRunAt(new Date());
      setHasSuccessfulRun(true);

      const failed = report.results.filter((row) => row.status === 'fail').length;
      const warned = report.results.filter((row) => row.status === 'warn').length;
      const passed = report.results.filter((row) => row.status === 'pass').length;
      if (failed > 0) {
        if (failed === report.executedTotal && warned === 0 && passed === 0) {
          setNotice('All executed endpoints failed at transport/server level. Verify VITE_API_BASE_URL and deployed proxy/server health first.');
        } else {
          setNotice(`${failed} endpoints failed. Review details below.`);
        }
      } else if (report.source === 'core-fallback') {
        setNotice(`Full swagger catalog unavailable. ${report.fallbackReason ?? 'Unable to load live swagger source.'}`);
      }
    } catch {
      setNotice('Unable to run API health checks. Verify network and proxy settings.');
    } finally {
      setLoading(false);
    }
  }, [includeMutations]);

  useEffect(() => {
    void runChecks();
  }, [runChecks]);

  useEffect(() => {
    const onSessionUpdate = () => {
      void runChecks();
    };

    window.addEventListener('repowire-session-updated', onSessionUpdate as EventListener);
    return () => window.removeEventListener('repowire-session-updated', onSessionUpdate as EventListener);
  }, [runChecks]);

  const totals = useMemo(() => {
    const pass = results.filter((row) => row.status === 'pass').length;
    const warn = results.filter((row) => row.status === 'warn').length;
    const fail = results.filter((row) => row.status === 'fail').length;
    const skip = results.filter((row) => row.status === 'skip').length;

    return {
      total: catalogTotal || results.length,
      executed: executedTotal || (results.length - skip),
      pass,
      warn,
      fail,
      skip,
    };
  }, [catalogTotal, executedTotal, results]);

  return {
    results,
    loading,
    notice,
    setNotice,
    lastRunAt,
    hasSuccessfulRun,
    includeMutations,
    setIncludeMutations,
    runChecks,
    totals,
    catalogSource,
    catalogSourceUrl,
    fallbackReason,
  };
}
