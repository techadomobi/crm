import { useQuery } from '@tanstack/react-query';
import { reportsService } from '../services/reports';
import { queryKeys } from './queryKeys';

export function useReports() {
  return useQuery({
    queryKey: queryKeys.reports,
    queryFn: () => reportsService.revenue(),
    staleTime: 60_000,
  });
}
