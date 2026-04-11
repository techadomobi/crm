import { useQuery } from '@tanstack/react-query';
import { dealsService } from '../services/deals';
import { queryKeys } from './queryKeys';

export function useDeals() {
  return useQuery({
    queryKey: queryKeys.deals,
    queryFn: () => dealsService.list({ page: 1, limit: 200 }),
    staleTime: 60_000,
    refetchInterval: 120_000,
  });
}
