import { useCallback, useEffect, useState } from 'react';
import { affiliatesService, type AffiliateRecord } from '../services/affiliates';

interface UseAffiliatesOptions {
  type?: 'publishers' | 'advertisers';
  page?: number;
  limit?: number;
  search?: string;
}

export function useAffiliates(options: UseAffiliatesOptions = {}) {
  const [data, setData] = useState<AffiliateRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const type = options.type ?? 'publishers';
      const page = options.page ?? 1;
      const limit = options.limit ?? 50;
      const search = options.search ?? '';

      let result: AffiliateRecord[];
      if (type === 'advertisers') {
        result = await affiliatesService.listAdvertisers({ page, limit, search });
      } else {
        result = await affiliatesService.listPublishers({ page, limit, search });
      }

      setData(result);
    } catch (err) {
      setIsError(true);
      setError(err instanceof Error ? err : new Error('Failed to fetch affiliates'));
    } finally {
      setIsLoading(false);
    }
  }, [options.type, options.page, options.limit, options.search]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return { data, isLoading, isError, error, refetch: fetchData };
}
