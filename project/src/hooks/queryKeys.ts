export const queryKeys = {
  contacts: ['contacts'] as const,
  leads: ['leads'] as const,
  deals: ['deals'] as const,
  campaigns: ['campaigns'] as const,
  activities: ['activities'] as const,
  companies: ['companies'] as const,
  reports: ['reports'] as const,
  users: ['users'] as const,
  notifications: ['notifications'] as const,
  settings: ['settings'] as const,
  dashboardOverview: ['dashboard-overview'] as const,
  dashboardRangeSummary: (range: string) => ['dashboard-range-summary', range] as const,
};
