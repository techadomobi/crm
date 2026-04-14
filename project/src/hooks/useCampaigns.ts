import { useQuery } from '@tanstack/react-query';
import { campaignsService, type CampaignQuery, type CampaignScope } from '../services/campaigns';
import { queryKeys } from './queryKeys';

export function useCampaigns(scope: CampaignScope, query: CampaignQuery) {
  return useQuery({
    queryKey: [...queryKeys.campaigns, scope, query] as const,
    queryFn: () => campaignsService.list(scope, query),
    staleTime: 60_000,
  });
}
