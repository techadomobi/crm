import type { DashboardOverview } from '../types/crm';
import { activitiesService } from './activities';
import { contactsService } from './contacts';
import { dealsService } from './deals';
import { leadsService } from './leads';

const monthKey = (date: Date) => `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;

export const dashboardService = {
  async overview(): Promise<DashboardOverview> {
    const [contactsResult, dealsResult, leadsResult, activitiesResult, activitiesDueTodayResult] = await Promise.allSettled([
      contactsService.list({ page: 1, limit: 25 }),
      dealsService.list({ page: 1, limit: 100 }),
      leadsService.listPipeline({ page: 1, limit: 100 }),
      activitiesService.list({ page: 1, limit: 100 }),
      activitiesService.dueToday({ page: 1, limit: 100 }),
    ]);

    const contacts = contactsResult.status === 'fulfilled' ? contactsResult.value : [];
    const deals = dealsResult.status === 'fulfilled' ? dealsResult.value : [];
    const leads = leadsResult.status === 'fulfilled' ? leadsResult.value : [];
    const activities = activitiesResult.status === 'fulfilled' ? activitiesResult.value : [];
    const activitiesDueToday = activitiesDueTodayResult.status === 'fulfilled' ? activitiesDueTodayResult.value : 0;

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

    const dealPipelineMap = new Map<string, number>();
    for (const deal of deals) {
      const stage = deal.stage || 'unknown';
      dealPipelineMap.set(stage, (dealPipelineMap.get(stage) || 0) + deal.value);
    }

    const upcomingTasks = activities
      .filter((activity) => /pending|open|todo/i.test(activity.status))
      .slice(0, 10);

    return {
      totalContacts: contacts.length,
      openDealsValue,
      leadsThisMonth,
      activitiesDueToday,
      recentContacts: contacts.slice(0, 8),
      dealPipeline: Array.from(dealPipelineMap.entries()).map(([stage, value]) => ({ stage, value })),
      upcomingTasks,
    };
  },
};
