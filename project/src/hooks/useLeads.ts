import { useQuery } from '@tanstack/react-query';
import { leadsService } from '../services/leads';
import { queryKeys } from './queryKeys';

export function useLeads() {
  return useQuery({
    queryKey: queryKeys.leads,
    queryFn: () => leadsService.listPipeline({ page: 1, limit: 200 }),
    staleTime: 60_000,
    refetchInterval: 120_000,
  });
}
