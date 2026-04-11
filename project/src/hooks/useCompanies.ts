import { useQuery } from '@tanstack/react-query';
import { companiesService } from '../services/companies';
import { queryKeys } from './queryKeys';

export function useCompanies() {
  return useQuery({
    queryKey: queryKeys.companies,
    queryFn: () => companiesService.list({ page: 1, limit: 100 }),
    staleTime: 120_000,
  });
}
