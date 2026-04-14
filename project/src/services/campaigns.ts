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
    const response =
      scope === 'publisher'
        ? await repowireApi.publisherCampaignList(query)
        : scope === 'advertiser'
          ? await repowireApi.advertiserCampaignList(query)
          : scope === 'manager'
            ? await repowireApi.advertiserManagerCampaignList(query)
            : await repowireApi.campaignList(query);

    return asArray<Record<string, unknown>>(response);
  },
};
