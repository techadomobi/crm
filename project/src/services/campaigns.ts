import { repowireApi } from '../api/repowireApi';
import { asArray } from './utils';

export type CampaignScope = 'all' | 'publisher' | 'advertiser' | 'manager';

export type CampaignQuery = {
  partners_Id?: string;
  publisherId?: string;
  advertiserId?: string;
  advertiserManagerId?: string;
  page?: number;
  search?: string;
};

export const campaignScopeMeta: Record<CampaignScope, { label: string; endpoint: string }> = {
  all: { label: 'All campaigns', endpoint: '/offer/allOfferList' },
  publisher: { label: 'Publisher campaigns', endpoint: '/offer/publisherOfferList' },
  advertiser: { label: 'Advertiser campaigns', endpoint: '/offer/advertiserOfferList' },
  manager: { label: 'Manager campaigns', endpoint: '/offer/advertiserManagerOfferList' },
};

export const campaignsService = {
  async list(scope: CampaignScope, query: CampaignQuery = {}) {
    const callPrimary = async () => {
      if (scope === 'publisher') return repowireApi.publisherCampaignList(query);
      if (scope === 'advertiser') return repowireApi.advertiserCampaignList(query);
      if (scope === 'manager') return repowireApi.advertiserManagerCampaignList(query);
      return repowireApi.campaignList(query);
    };

    const fallbackCalls = [
      () => repowireApi.campaignList(query),
      () => repowireApi.offerList({ page: query.page, search: query.search, partners_Id: query.partners_Id }),
      () => repowireApi.publisherCampaignList(query),
      () => repowireApi.advertiserCampaignList(query),
    ];

    const normalize = (payload: unknown) => {
      const rows = asArray<Record<string, unknown>>(payload);
      return rows;
    };

    let lastError: unknown = null;
    const first = [callPrimary, ...fallbackCalls];

    for (const call of first) {
      try {
        const response = await call();
        const rows = normalize(response);
        if (rows.length > 0) return rows;
      } catch (error) {
        lastError = error;
      }
    }

    if (lastError instanceof Error) {
      throw lastError;
    }

    return [];
  },
};
