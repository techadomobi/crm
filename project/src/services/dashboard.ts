import type { DashboardOverview } from '../types/crm';
import { apiRequest } from '../api/httpClient';
import { fetchLiveActivities, fetchLiveContacts, fetchLiveDeals } from '../api/liveDataAdapters';
import { leadsService } from './leads';
import type { RangeKey } from '../hooks/useDashboardRangeMetrics';

const monthKey = (date: Date) => `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
const toDateKey = (date: Date) => date.toISOString().slice(0, 10);
const dayKey = (date: Date) => date.toISOString().slice(0, 10);
const toIsoDay = (value: string | undefined) => {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10);
};

const toNumber = (value: unknown): number => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[^\d.-]/g, ''));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

type NumberCandidate = { path: string; value: number };

const collectNumberCandidates = (value: unknown, path = '', depth = 0): NumberCandidate[] => {
  if (depth > 5 || value === null || value === undefined) return [];

  const direct = toNumber(value);
  if (direct > 0) {
    const normalizedPath = path.toLowerCase();
    if (!normalizedPath.includes('status') && !normalizedPath.includes('code') && !normalizedPath.includes('message')) {
      return [{ path, value: direct }];
    }
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectNumberCandidates(item, `${path}[${index}]`, depth + 1));
  }

  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return Object.entries(record).flatMap(([key, nested]) => {
      const nextPath = path ? `${path}.${key}` : key;
      return collectNumberCandidates(nested, nextPath, depth + 1);
    });
  }

  return [];
};

const extractMetric = (value: unknown, preferredKeys: string[] = []): number => {
  const candidates = collectNumberCandidates(value);
  if (candidates.length === 0) return 0;

  const preferred = candidates.filter((candidate) => preferredKeys.some((key) => candidate.path.toLowerCase().includes(key.toLowerCase())));
  const preferredPositive = preferred.filter((candidate) => candidate.value > 0);
  if (preferredPositive.length > 0) {
    return preferredPositive.sort((a, b) => b.value - a.value)[0].value;
  }

  const positive = candidates.filter((candidate) => candidate.value > 0);
  if (positive.length > 0) {
    return positive.sort((a, b) => b.value - a.value)[0].value;
  }

  return candidates[0].value;
};

const readPartnersId = () =>
  (localStorage.getItem('repowire_partners_id')
    ?? localStorage.getItem('repowire_partners_Id')
    ?? localStorage.getItem('partners_Id')
    ?? '').trim();

const readAuthToken = () =>
  (localStorage.getItem('repowire_token')
    ?? localStorage.getItem('access_token')
    ?? localStorage.getItem('token')
    ?? '').trim();

const isRejected = <T>(result: PromiseSettledResult<T>): result is PromiseRejectedResult =>
  result.status === 'rejected';

const allRejected = (results: PromiseSettledResult<unknown>[]) => results.every(isRejected);

const buildMetricQueryVariants = (base: Record<string, string>) => {
  const partnersId = readPartnersId();
  const variants: Array<Record<string, string>> = [base];

  if (partnersId) {
    variants.push({ ...base, partners_Id: partnersId });
    variants.push({ ...base, partnersId });
    variants.push({ ...base, partnerId: partnersId });
  }

  const unique = new Map<string, Record<string, string>>();
  variants.forEach((query) => unique.set(JSON.stringify(query), query));
  return [...unique.values()];
};

const requestMetricWithFallback = async (
  endpoints: readonly string[],
  preferredKeys: string[],
  queryBase?: Record<string, string>
) => {
  const variants = buildMetricQueryVariants(queryBase ?? {});
  let lastError: unknown = null;

  for (const endpoint of endpoints) {
    for (const query of variants) {
      try {
        const response = await apiRequest(endpoint, {
          method: 'GET',
          query: Object.keys(query).length > 0 ? query : undefined,
        });
        const metric = extractMetric(response, preferredKeys);
        return metric;
      } catch (error) {
        lastError = error;
      }
    }
  }

  if (lastError) {
    throw lastError;
  }

  return 0;
};

const METRIC_ENDPOINTS = {
  clicks: ['/tracking/totalClick', '/manager/totalClick', '/manager/advertiserTotalClick'],
  conversions: ['/conversion/totalConversion', '/manager/totalConversion', '/manager/advertiserTotalConversion'],
  events: ['/conversion/totalEvent', '/manager/totalEvent', '/manager/advertiserTotalEvent', '/advertiser/advertiserTotalEvent', '/publicher/PublisherTotalEvent'],
  impressions: ['/impression/totalImpression', '/advertiser/advertiserTotalImpression', '/publicher/PublisherTotalImpression'],
  payout: ['/conversion/totalPayout', '/manager/totalPayout', '/manager/advertiserTotalPayout'],
  revenue: ['/conversion/totalRevenue', '/manager/totalRevenue', '/manager/advertiserTotalRevenue'],
  profit: ['/conversion/totalProfit', '/manager/totalProfit'],
} as const;

const rangeDates = (range: RangeKey) => {
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);

  if (range === 'yesterday') {
    start.setDate(start.getDate() - 1);
    end.setDate(end.getDate() - 1);
  } else if (range === 'lastWeek') {
    start.setDate(start.getDate() - 6);
  } else if (range === 'thisMonth') {
    start.setDate(1);
  } else if (range === 'lastMonth') {
    start.setMonth(start.getMonth() - 1, 1);
    end.setDate(0);
  }

  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
};

const buildRevenueSeries = (deals: Array<{ value: number; createdAt: string }>) => {
  const last7Days = Array.from({ length: 7 }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    return {
      key: toDateKey(date),
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  });

  const perDayRevenue = new Map<string, number>();
  deals.forEach((deal) => {
    if (!deal.createdAt) return;
    const key = toDateKey(new Date(deal.createdAt));
    perDayRevenue.set(key, (perDayRevenue.get(key) ?? 0) + deal.value);
  });

  const daySeries = last7Days.map((day) => ({
    label: day.label,
    value: perDayRevenue.get(day.key) ?? 0,
  }));

  const distinctDayValues = new Set(daySeries.map((point) => point.value));
  const hasVisibleDailyVariation = daySeries.some((point) => point.value > 0) && distinctDayValues.size > 1;
  if (hasVisibleDailyVariation) {
    return daySeries;
  }

  const recentDealValues = deals
    .filter((deal) => deal.value > 0)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .map((deal) => deal.value)
    .slice(-7);

  if (recentDealValues.length === 0) {
    return daySeries;
  }

  return last7Days.map((day, index) => {
    const sourceIndex = Math.min(
      Math.floor((index / Math.max(last7Days.length - 1, 1)) * (recentDealValues.length - 1)),
      recentDealValues.length - 1
    );

    return {
      label: day.label,
      value: recentDealValues[sourceIndex] ?? 0,
    };
  });
};

export const dashboardService = {
  async rangeSummary(range: RangeKey) {
    const token = readAuthToken();
    if (!token) {
      throw new Error('Live dashboard requires a saved bearer token. Add it in Settings and refresh.');
    }

    const { startDate, endDate } = rangeDates(range);
    const rangeQuery = { startDate, endDate };

    const [conversionResult, payoutResult, revenueResult, profitResult, clicksResult, eventsResult, impressionsResult] = await Promise.allSettled([
      requestMetricWithFallback(METRIC_ENDPOINTS.conversions, ['conversion'], rangeQuery),
      requestMetricWithFallback(METRIC_ENDPOINTS.payout, ['payout'], rangeQuery),
      requestMetricWithFallback(METRIC_ENDPOINTS.revenue, ['revenue'], rangeQuery),
      requestMetricWithFallback(METRIC_ENDPOINTS.profit, ['profit'], rangeQuery),
      requestMetricWithFallback(METRIC_ENDPOINTS.clicks, ['click'], rangeQuery),
      requestMetricWithFallback(METRIC_ENDPOINTS.events, ['event'], rangeQuery),
      requestMetricWithFallback(METRIC_ENDPOINTS.impressions, ['impression'], rangeQuery),
    ]);

    if (allRejected([conversionResult, payoutResult, revenueResult, profitResult, clicksResult, eventsResult, impressionsResult])) {
      throw new Error('Unable to load live range metrics. Verify token, partners_Id, and API connectivity.');
    }

    return {
      clicks: clicksResult.status === 'fulfilled' ? clicksResult.value : 0,
      conversions: conversionResult.status === 'fulfilled' ? conversionResult.value : 0,
      impressions: impressionsResult.status === 'fulfilled' ? impressionsResult.value : 0,
      events: eventsResult.status === 'fulfilled' ? eventsResult.value : 0,
      revenue: revenueResult.status === 'fulfilled' ? revenueResult.value : 0,
      payout: payoutResult.status === 'fulfilled' ? payoutResult.value : 0,
      profit: profitResult.status === 'fulfilled' ? profitResult.value : 0,
    };
  },

  async overview(): Promise<DashboardOverview> {
    const token = readAuthToken();
    if (!token) {
      throw new Error('Live dashboard requires a saved bearer token. Add it in Settings and refresh.');
    }

    const [contactsResult, dealsResult, leadsResult, activitiesResult, conversionsResult, payoutResult, revenueResult, profitResult, clicksResult, eventsResult, impressionsResult] = await Promise.allSettled([
      fetchLiveContacts(),
      fetchLiveDeals(),
      leadsService.listPipeline({ page: 1, limit: 100 }),
      fetchLiveActivities(),
      requestMetricWithFallback(METRIC_ENDPOINTS.conversions, ['conversion']),
      requestMetricWithFallback(METRIC_ENDPOINTS.payout, ['payout']),
      requestMetricWithFallback(METRIC_ENDPOINTS.revenue, ['revenue']),
      requestMetricWithFallback(METRIC_ENDPOINTS.profit, ['profit']),
      requestMetricWithFallback(METRIC_ENDPOINTS.clicks, ['click']),
      requestMetricWithFallback(METRIC_ENDPOINTS.events, ['event']),
      requestMetricWithFallback(METRIC_ENDPOINTS.impressions, ['impression']),
    ]);

    const primaryListResults: PromiseSettledResult<unknown>[] = [contactsResult, dealsResult, leadsResult, activitiesResult];
    const summaryMetricResults: PromiseSettledResult<unknown>[] = [conversionsResult, payoutResult, revenueResult, profitResult, clicksResult, eventsResult, impressionsResult];

    if (allRejected(primaryListResults) && allRejected(summaryMetricResults)) {
      throw new Error('Unable to load live dashboard data. Verify token, partners_Id, and API connectivity.');
    }

    const contacts = contactsResult.status === 'fulfilled' ? contactsResult.value : [];
    const deals = dealsResult.status === 'fulfilled' ? dealsResult.value : [];
    const leads = leadsResult.status === 'fulfilled' ? leadsResult.value : [];
    const activities = activitiesResult.status === 'fulfilled' ? activitiesResult.value : [];
    const liveClicks = clicksResult.status === 'fulfilled' ? clicksResult.value : 0;
    const liveEvents = eventsResult.status === 'fulfilled' ? eventsResult.value : 0;
    const liveImpressions = impressionsResult.status === 'fulfilled' ? impressionsResult.value : 0;
    const liveConversions = conversionsResult.status === 'fulfilled' ? conversionsResult.value : 0;
    const liveRevenue = revenueResult.status === 'fulfilled' ? revenueResult.value : 0;
    const livePayout = payoutResult.status === 'fulfilled' ? payoutResult.value : 0;
    const liveProfit = profitResult.status === 'fulfilled' ? profitResult.value : 0;

    const currentMonth = monthKey(new Date());
    const leadsThisMonth = leads.filter((lead) => {
      if (!lead.createdAt) {
        return false;
      }
      return monthKey(new Date(lead.createdAt)) === currentMonth;
    }).length;

    const openDealsValue = deals
      .filter((deal) => !/won|lost|closed/i.test(deal.stage))
      .reduce((sum, deal) => sum + deal.value, 0);

    const revenueSeries = buildRevenueSeries(deals);

    const dealPipelineMap = new Map<string, number>();
    const pipelineStageCounts = new Map<string, number>();
    for (const deal of deals) {
      const stage = deal.stage || 'unknown';
      dealPipelineMap.set(stage, (dealPipelineMap.get(stage) || 0) + deal.value);
      pipelineStageCounts.set(stage, (pipelineStageCounts.get(stage) || 0) + 1);
    }

    const activitiesDueToday = activities.filter((activity) => {
      if (!activity.date) return false;
      return dayKey(new Date(activity.date)) === dayKey(new Date()) || /pending|overdue/i.test(activity.status);
    }).length;

    const recentContacts = contacts.slice(0, 8).map((contact) => ({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      companyName: contact.company,
      status: contact.status,
      createdAt: toIsoDay(contact.lastContact) || undefined,
    }));

    const upcomingTasks = activities
      .filter((activity) => /pending|open|todo/i.test(activity.status))
      .slice(0, 10)
      .map((activity) => ({
        id: activity.id,
        type: activity.type,
        title: activity.title,
        dueDate: activity.date,
        status: activity.status,
        owner: activity.assignee,
      }));

    const liveDeals = deals.map((deal) => ({
      id: deal.id,
      title: deal.title,
      value: deal.value,
      stage: deal.stage,
      closeDate: deal.closeDate,
      owner: deal.assignee,
      createdAt: deal.createdAt,
    }));

    const liveActivities = activities.map((activity) => ({
      id: activity.id,
      type: activity.type,
      title: activity.title,
      dueDate: activity.date,
      status: activity.status,
      owner: activity.assignee,
    }));

    return {
      totalContacts: contacts.length,
      openDealsValue,
      leadsThisMonth,
      activitiesDueToday,
      liveDeals,
      liveActivities,
      recentContacts,
      dealPipeline: Array.from(dealPipelineMap.entries()).map(([stage, value]) => ({ stage, value })),
      pipelineStages: Array.from(pipelineStageCounts.entries()).map(([stage, count]) => ({ stage, count })),
      revenueSeries,
      upcomingTasks,
      liveSummary: {
        clicks: liveClicks,
        conversions: liveConversions,
        impressions: liveImpressions,
        events: liveEvents,
        revenue: liveRevenue,
        payout: livePayout,
        profit: liveProfit,
      },
    };
  },
};
