export interface ContactRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  status: string;
  createdAt?: string;
}

export interface DealRecord {
  id: string;
  title: string;
  value: number;
  stage: string;
  closeDate?: string;
  owner?: string;
  createdAt?: string;
}

export interface LeadRecord {
  id: string;
  status: string;
  source?: string;
  createdAt?: string;
}

export interface ActivityRecord {
  id: string;
  type: string;
  title: string;
  dueDate?: string;
  status: string;
  owner?: string;
}

export interface DashboardOverview {
  totalContacts: number;
  openDealsValue: number;
  leadsThisMonth: number;
  activitiesDueToday: number;
  recentContacts: ContactRecord[];
  dealPipeline: Array<{ stage: string; value: number }>;
  pipelineStages: Array<{ stage: string; count: number }>;
  revenueSeries: Array<{ label: string; value: number }>;
  upcomingTasks: ActivityRecord[];
}
