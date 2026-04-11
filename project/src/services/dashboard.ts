import type { DashboardOverview } from '../types/crm';
import { fetchLiveActivities, fetchLiveContacts, fetchLiveDeals } from '../api/liveDataAdapters';
import { leadsService } from './leads';

const monthKey = (date: Date) => `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
const toDateKey = (date: Date) => date.toISOString().slice(0, 10);
const dayKey = (date: Date) => date.toISOString().slice(0, 10);
const toIsoDay = (value: string | undefined) => {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10);
};

export const dashboardService = {
  async overview(): Promise<DashboardOverview> {
    const [contactsResult, dealsResult, leadsResult, activitiesResult] = await Promise.allSettled([
      fetchLiveContacts(),
      fetchLiveDeals(),
      leadsService.listPipeline({ page: 1, limit: 100 }),
      fetchLiveActivities(),
    ]);

    const contacts = contactsResult.status === 'fulfilled' ? contactsResult.value : [];
    const deals = dealsResult.status === 'fulfilled' ? dealsResult.value : [];
    const leads = leadsResult.status === 'fulfilled' ? leadsResult.value : [];
    const activities = activitiesResult.status === 'fulfilled' ? activitiesResult.value : [];

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

    const perDayRevenue = new Map<string, number>();
    deals.forEach((deal) => {
      if (!deal.createdAt) return;
      const key = toDateKey(new Date(deal.createdAt));
      perDayRevenue.set(key, (perDayRevenue.get(key) ?? 0) + deal.value);
    });

    const revenueSeries = Array.from({ length: 7 }).map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      const key = toDateKey(date);
      return {
        label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: perDayRevenue.get(key) ?? 0,
      };
    });

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

    return {
      totalContacts: contacts.length,
      openDealsValue,
      leadsThisMonth,
      activitiesDueToday,
      recentContacts,
      dealPipeline: Array.from(dealPipelineMap.entries()).map(([stage, value]) => ({ stage, value })),
      pipelineStages: Array.from(pipelineStageCounts.entries()).map(([stage, count]) => ({ stage, count })),
      revenueSeries,
      upcomingTasks,
    };
  },
};
