import { useCallback, useEffect, useMemo, useState } from 'react';
import { NavPage } from '../types';
import { getModuleChecks, runModuleFunctionalityChecks, type ModuleCheckResult } from '../services/moduleFunctionalityService';

export function useModuleFunctionality(activePage: NavPage) {
  const [results, setResults] = useState<ModuleCheckResult[]>([]);
  const [loading, setLoading] = useState(false);

  const supported = getModuleChecks(activePage).length > 0;

  const runChecks = useCallback(async () => {
    if (!supported) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const rows = await runModuleFunctionalityChecks(activePage);
      setResults(rows);
    } finally {
      setLoading(false);
    }
  }, [activePage, supported]);

  useEffect(() => {
    void runChecks();
  }, [runChecks]);

  useEffect(() => {
    const onSession = () => {
      void runChecks();
    };

    window.addEventListener('repowire-session-updated', onSession as EventListener);
    return () => window.removeEventListener('repowire-session-updated', onSession as EventListener);
  }, [runChecks]);

  const summary = useMemo(() => {
    const pass = results.filter((row) => row.status === 'pass').length;
    const warn = results.filter((row) => row.status === 'warn').length;
    const fail = results.filter((row) => row.status === 'fail').length;
    return { total: results.length, pass, warn, fail };
  }, [results]);

  return { supported, results, loading, runChecks, summary };
}
