import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard';
import { queryKeys } from './queryKeys';
import type { RangeKey } from './useDashboardRangeMetrics';

export function useDashboardRangeSummary(range: RangeKey) {
  return useQuery({
    queryKey: queryKeys.dashboardRangeSummary(range),
    queryFn: () => dashboardService.rangeSummary(range),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchInterval: 30_000,
  });
}