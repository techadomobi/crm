import { useQuery } from '@tanstack/react-query';
import { notificationsService } from '../services/notifications';
import { queryKeys } from './queryKeys';

export function useNotifications() {
  return useQuery({
    queryKey: queryKeys.notifications,
    queryFn: () => notificationsService.list({ page: 1, limit: 100 }),
    staleTime: 60_000,
  });
}
