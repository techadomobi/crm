import { useQuery } from '@tanstack/react-query';
import { activitiesService } from '../services/activities';
import { queryKeys } from './queryKeys';

export function useActivities() {
  return useQuery({
    queryKey: queryKeys.activities,
    queryFn: () => activitiesService.list({ page: 1, limit: 200 }),
    staleTime: 60_000,
    refetchInterval: 60_000,
  });
}
