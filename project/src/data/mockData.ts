import { Contact, Deal, Activity } from '../types';

export const contacts: Contact[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@acmecorp.com', phone: '+1 555 0101', company: 'Acme Corp', status: 'active', value: 84000, lastContact: '2026-04-08', avatar: 'SJ', tags: ['enterprise', 'priority'] },
  { id: '2', name: 'Marcus Chen', email: 'marcus@techflow.io', phone: '+1 555 0102', company: 'TechFlow', status: 'prospect', value: 32000, lastContact: '2026-04-07', avatar: 'MC', tags: ['saas', 'new'] },
  { id: '3', name: 'Emily Torres', email: 'emily@globalreach.com', phone: '+1 555 0103', company: 'Global Reach', status: 'active', value: 156000, lastContact: '2026-04-06', avatar: 'ET', tags: ['enterprise', 'renewal'] },
  { id: '4', name: 'David Kim', email: 'david@nexusgroup.com', phone: '+1 555 0104', company: 'Nexus Group', status: 'active', value: 48500, lastContact: '2026-04-05', avatar: 'DK', tags: ['mid-market'] },
  { id: '5', name: 'Priya Patel', email: 'priya@infinitescale.ai', phone: '+1 555 0105', company: 'InfiniteScale', status: 'prospect', value: 72000, lastContact: '2026-04-04', avatar: 'PP', tags: ['ai', 'startup'] },
  { id: '6', name: 'Robert Marsh', email: 'robert@alphaventures.com', phone: '+1 555 0106', company: 'Alpha Ventures', status: 'inactive', value: 21000, lastContact: '2026-03-28', avatar: 'RM', tags: ['cold'] },
  { id: '7', name: 'Lisa Wong', email: 'lisa@streamlineops.com', phone: '+1 555 0107', company: 'StreamlineOps', status: 'active', value: 93500, lastContact: '2026-04-08', avatar: 'LW', tags: ['enterprise'] },
  { id: '8', name: 'James Okafor', email: 'james@brightpath.ng', phone: '+1 555 0108', company: 'BrightPath', status: 'prospect', value: 18000, lastContact: '2026-04-02', avatar: 'JO', tags: ['new', 'smb'] },
];

export const deals: Deal[] = [
  { id: '1', title: 'Enterprise License Q2', contact: 'Sarah Johnson', company: 'Acme Corp', value: 84000, stage: 'negotiation', probability: 75, closeDate: '2026-04-30', assignee: 'Alex R.', createdAt: '2026-03-01' },
  { id: '2', title: 'SaaS Platform Upgrade', contact: 'Marcus Chen', company: 'TechFlow', value: 32000, stage: 'proposal', probability: 50, closeDate: '2026-05-15', assignee: 'Jamie L.', createdAt: '2026-03-10' },
  { id: '3', title: 'Global Expansion Deal', contact: 'Emily Torres', company: 'Global Reach', value: 156000, stage: 'closed_won', probability: 100, closeDate: '2026-04-01', assignee: 'Alex R.', createdAt: '2026-02-15' },
  { id: '4', title: 'Data Analytics Suite', contact: 'David Kim', company: 'Nexus Group', value: 48500, stage: 'qualified', probability: 40, closeDate: '2026-05-30', assignee: 'Sam T.', createdAt: '2026-03-20' },
  { id: '5', title: 'AI Integration Package', contact: 'Priya Patel', company: 'InfiniteScale', value: 72000, stage: 'lead', probability: 20, closeDate: '2026-06-15', assignee: 'Jamie L.', createdAt: '2026-04-01' },
  { id: '6', title: 'Security Audit + License', contact: 'Robert Marsh', company: 'Alpha Ventures', value: 21000, stage: 'closed_lost', probability: 0, closeDate: '2026-03-31', assignee: 'Sam T.', createdAt: '2026-02-28' },
  { id: '7', title: 'Operations Automation', contact: 'Lisa Wong', company: 'StreamlineOps', value: 93500, stage: 'negotiation', probability: 80, closeDate: '2026-04-25', assignee: 'Alex R.', createdAt: '2026-03-05' },
  { id: '8', title: 'SMB Starter Bundle', contact: 'James Okafor', company: 'BrightPath', value: 18000, stage: 'lead', probability: 15, closeDate: '2026-06-30', assignee: 'Sam T.', createdAt: '2026-04-05' },
];

export const activities: Activity[] = [
  { id: '1', type: 'call', title: 'Discovery call with Acme Corp', contact: 'Sarah Johnson', company: 'Acme Corp', date: '2026-04-09T10:00:00', status: 'pending', assignee: 'Alex R.', notes: 'Discuss Q2 enterprise renewal options' },
  { id: '2', type: 'email', title: 'Proposal sent to TechFlow', contact: 'Marcus Chen', company: 'TechFlow', date: '2026-04-08T14:30:00', status: 'completed', assignee: 'Jamie L.' },
  { id: '3', type: 'meeting', title: 'Contract review - Global Reach', contact: 'Emily Torres', company: 'Global Reach', date: '2026-04-07T09:00:00', status: 'completed', assignee: 'Alex R.', notes: 'Final signature obtained' },
  { id: '4', type: 'task', title: 'Follow up on Nexus demo', contact: 'David Kim', company: 'Nexus Group', date: '2026-04-07T17:00:00', status: 'overdue', assignee: 'Sam T.' },
  { id: '5', type: 'note', title: 'Notes from InfiniteScale intro', contact: 'Priya Patel', company: 'InfiniteScale', date: '2026-04-06T11:00:00', status: 'completed', assignee: 'Jamie L.', notes: 'Strong interest in AI modules, budget confirmed' },
  { id: '6', type: 'call', title: 'Check-in with StreamlineOps', contact: 'Lisa Wong', company: 'StreamlineOps', date: '2026-04-09T15:00:00', status: 'pending', assignee: 'Alex R.' },
  { id: '7', type: 'email', title: 'Onboarding docs to BrightPath', contact: 'James Okafor', company: 'BrightPath', date: '2026-04-10T10:00:00', status: 'pending', assignee: 'Sam T.' },
  { id: '8', type: 'meeting', title: 'Quarterly review - Acme Corp', contact: 'Sarah Johnson', company: 'Acme Corp', date: '2026-04-11T13:00:00', status: 'pending', assignee: 'Alex R.' },
];

export const revenueData = [
  { month: 'Oct', value: 142000 },
  { month: 'Nov', value: 168000 },
  { month: 'Dec', value: 195000 },
  { month: 'Jan', value: 178000 },
  { month: 'Feb', value: 220000 },
  { month: 'Mar', value: 245000 },
  { month: 'Apr', value: 213000 },
];

export const pipelineStages = [
  { stage: 'Lead', count: 12, value: 284000, color: '#94A3B8' },
  { stage: 'Qualified', count: 8, value: 412000, color: '#60A5FA' },
  { stage: 'Proposal', count: 6, value: 318000, color: '#34D399' },
  { stage: 'Negotiation', count: 4, value: 445000, color: '#FBBF24' },
  { stage: 'Closed Won', count: 18, value: 1.24e6, color: '#10B981' },
];

export const teamPerformance = [
  { name: 'Alex R.', deals: 14, revenue: 428000, target: 500000 },
  { name: 'Jamie L.', deals: 11, revenue: 312000, target: 400000 },
  { name: 'Sam T.', deals: 9, revenue: 245000, target: 350000 },
  { name: 'Riley M.', deals: 7, revenue: 198000, target: 300000 },
];
