import { useQuery } from '@tanstack/react-query';
import { settingsService } from '../services/settings';
import { queryKeys } from './queryKeys';

export function useSettings() {
  return useQuery({
    queryKey: queryKeys.settings,
    queryFn: () => settingsService.plans(),
    staleTime: 120_000,
  });
}
