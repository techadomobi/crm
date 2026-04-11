import { useQuery } from '@tanstack/react-query';
import { usersService } from '../services/users';
import { queryKeys } from './queryKeys';

export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: () => usersService.list({ page: 1, limit: 100 }),
    staleTime: 120_000,
  });
}
