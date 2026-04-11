import { useQuery } from '@tanstack/react-query';
import { contactsService } from '../services/contacts';
import { queryKeys } from './queryKeys';

export function useContacts() {
  return useQuery({
    queryKey: queryKeys.contacts,
    queryFn: () => contactsService.list({ page: 1, limit: 200 }),
    staleTime: 60_000,
    refetchInterval: 120_000,
  });
}
