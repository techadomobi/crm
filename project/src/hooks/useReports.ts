import { useQuery } from '@tanstack/react-query';
import { reportsService } from '../services/reports';
import { queryKeys } from './queryKeys';

export function useReports(scope: Exclude<Parameters<typeof reportsService.list>[0], 'summary'>, query: Parameters<typeof reportsService.list>[1], enabled = true) {
  return useQuery({
    queryKey: [...queryKeys.reports, scope, query] as const,
    queryFn: () => reportsService.list(scope, query),
    enabled,
    staleTime: 60_000,
  });
}
