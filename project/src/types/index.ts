export type NavPage =
  | 'dashboard'
  | 'campaigns'
  | 'manageCampaigns'
  | 'createCampaign'
  | 'campaignWizard'
  | 'campaignAccess'
  | 'trafficChannels'
  | 'creatives'
  | 'couponCodes'
  | 'featuredCampaigns'
  | 'bulkTargeting'
  | 'reports'
  | 'campaignsReport'
  | 'publishersReport'
  | 'advertisersReport'
  | 'dailyReport'
  | 'goalsReport'
  | 'cohortReport'
  | 'additionalReports'
  | 'capReport'
  | 'samplingReport'
  | 'comparisonReport'
  | 'clickReport'
  | 'conversionReport'
  | 'impressionReport'
  | 'postbackLogs'
  | 'recentExports'
  | 'contacts'
  | 'deals'
  | 'activities'
  | 'publishers'
  | 'publishersManage'
  | 'publishersPostbackPixels'
  | 'advertisers'
  | 'advertisersManage'
  | 'advertisersPostbacksHitsReceived'
  | 'invoices'
  | 'invoicesDashboard'
  | 'invoicesPublishers'
  | 'invoicesAdvertisers'
  | 'invoicesSettings'
  | 'automation'
  | 'integration'
  | 'network'
  | 'mobileAppTracking'
  | 'tools'
  | 'ecommerce'
  | 'workflowAutomation'
  | 'antiFraudTools'
  | 'dataImport'
  | 'fillerRules'
  | 'offerChecker'
  | 'linkTestTools'
  | 'globalTargeting'
  | 'smartLink'
  | 'notifications'
  | 'support'
  | 'profile'
  | 'apiDocs'
  | 'apiStudio'
  | 'apiHealth'
  | 'settings';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive' | 'prospect';
  value: number;
  lastContact: string;
  avatar: string;
  tags: string[];
}

export interface Deal {
  id: string;
  title: string;
  contact: string;
  company: string;
  value: number;
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  probability: number;
  closeDate: string;
  assignee: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'task';
  title: string;
  contact: string;
  company: string;
  date: string;
  status: 'completed' | 'pending' | 'overdue';
  assignee: string;
  notes?: string;
}

export interface StatsData {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  color: string;
}
