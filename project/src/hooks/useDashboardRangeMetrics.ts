import { useMemo } from 'react';
import type { ActivityRecord, DealRecord } from '../types/crm';

export type RangeKey = 'today' | 'yesterday' | 'lastWeek' | 'thisMonth' | 'lastMonth';

export type RangeMetrics = {
  clicks: number;
  conversions: number;
  impressions: number;
  events: number;
  revenue: number;
  payout: number;
  profit: number;
  pipeline: Array<{ stage: string; count: number }>;
  chart: Array<{ month: string; value: number }>;
};

const toNumber = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[^\d.-]/g, ''));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

const normalizeStage = (value: string): string => {
  const v = value.trim().toLowerCase().replace(/\s+/g, '_');
  if (!v) return 'other';
  if (v.includes('won') || v === 'approved') return 'closed_won';
  if (v.includes('lost') || v === 'declined' || v === 'cancelled') return 'closed_lost';
  if (v === 'pending' || v === 'hold') return 'pending';
  return v;
};

const toIsoDateKey = (raw: string | undefined): string => {
  if (!raw) return '';

  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10);

  const ddmmyyyy = /^(\d{2})[-/](\d{2})[-/](\d{4})$/.exec(raw.trim());
  if (ddmmyyyy) {
    const candidate = new Date(`${ddmmyyyy[3]}-${ddmmyyyy[2]}-${ddmmyyyy[1]}T00:00:00Z`);
    if (!Number.isNaN(candidate.getTime())) return candidate.toISOString().slice(0, 10);
  }

  return '';
};

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

const buildDateAxis = (startDate: string, endDate: string) => {
  const axis: string[] = [];
  const cursor = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);

  while (cursor <= end) {
    axis.push(cursor.toISOString().slice(0, 10));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return axis;
};

const formatChartLabel = (dayKey: string) => {
  const date = new Date(dayKey);
  if (Number.isNaN(date.getTime())) return dayKey;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const inDateRange = (dayKey: string, startDate: string, endDate: string) => {
  if (!dayKey) return false;
  return dayKey >= startDate && dayKey <= endDate;
};

const buildRangeMetrics = (
  startDate: string,
  endDate: string,
  liveDeals: DealRecord[],
  liveActivities: ActivityRecord[]
): RangeMetrics => {
  const dealsInRange = liveDeals.filter((deal) => inDateRange(toIsoDateKey(deal.createdAt), startDate, endDate));
  const activitiesInRange = liveActivities.filter((activity) => inDateRange(toIsoDateKey(activity.dueDate), startDate, endDate));

  const conversions = dealsInRange.filter((deal) => normalizeStage(deal.stage) === 'closed_won').length;
  const clicks = activitiesInRange.filter((activity) => (activity.type ?? '').toLowerCase() === 'call').length;
  const impressions = activitiesInRange.filter((activity) => (activity.type ?? '').toLowerCase() === 'email').length;
  const revenue = dealsInRange.reduce((sum, deal) => sum + toNumber(deal.value), 0);
  const payout = 0;
  const profit = revenue - payout;
  const events = activitiesInRange.length;

  const revenueByDay = new Map<string, number>();
  const stageCounts = new Map<string, number>();

  dealsInRange.forEach((deal) => {
    const day = toIsoDateKey(deal.createdAt);
    if (day) {
      revenueByDay.set(day, (revenueByDay.get(day) ?? 0) + toNumber(deal.value));
    }

    const stage = normalizeStage(deal.stage || 'other');
    stageCounts.set(stage, (stageCounts.get(stage) ?? 0) + 1);
  });

  const axis = buildDateAxis(startDate, endDate);
  const chart = axis.map((day) => ({
    month: formatChartLabel(day),
    value: revenueByDay.get(day) ?? 0,
  }));

  const pipeline = Array.from(stageCounts.entries())
    .map(([stage, count]) => ({ stage, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return {
    clicks,
    conversions,
    impressions,
    events,
    revenue,
    payout,
    profit,
    pipeline,
    chart,
  };
};

interface DashboardRangeInput {
  liveDeals?: DealRecord[];
  liveActivities?: ActivityRecord[];
}

export function useDashboardRangeMetrics(range: RangeKey, source?: DashboardRangeInput) {
  const rangeMetrics = useMemo(() => {
    const liveDeals = source?.liveDeals ?? [];
    const liveActivities = source?.liveActivities ?? [];
    if (liveDeals.length === 0 && liveActivities.length === 0) return null;

    const { startDate, endDate } = rangeDates(range);
    return buildRangeMetrics(startDate, endDate, liveDeals, liveActivities);
  }, [range, source?.liveActivities, source?.liveDeals]);

  return {
    rangeMetrics,
    rangeLoading: false,
    rangeError: null as string | null,
  };
}
