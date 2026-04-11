import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard';
import { queryKeys } from './queryKeys';

export function useDashboardOverview() {
  return useQuery({
    queryKey: queryKeys.dashboardOverview,
    queryFn: () => dashboardService.overview(),
    staleTime: 30_000,
    refetchInterval: 30_000,
  });
}
