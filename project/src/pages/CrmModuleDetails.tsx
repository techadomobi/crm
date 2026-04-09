import { Bell, CheckCircle2, Clock3, FolderKanban, Gauge, Layers3, ListChecks, Sparkles, UsersRound } from 'lucide-react';
import { NavPage } from '../types';

interface CrmModuleDetailsProps {
  activePage: NavPage;
}

type ModuleDetails = {
  label: string;
  summary: string;
  kpis: { title: string; value: string; trend: string }[];
  checklist: string[];
  alerts: string[];
};

const moduleMap: Partial<Record<NavPage, ModuleDetails>> = {
  campaigns: {
    label: 'Campaigns',
    summary: 'Control lifecycle, budget pacing, and traffic quality from one panel.',
    kpis: [
      { title: 'Active Campaigns', value: '42', trend: '+6 this week' },
      { title: 'Budget Utilization', value: '73%', trend: 'On target' },
      { title: 'Creative Approval', value: '91%', trend: '+3% QoQ' },
    ],
    checklist: ['Review campaign wizard templates', 'Validate coupon code inventory', 'Audit featured campaigns performance'],
    alerts: ['2 campaigns nearing daily cap', '1 targeting rule conflict detected'],
  },
  campaignWizard: {
    label: 'Campaign Wizard',
    summary: 'Build launch-ready campaigns with prefilled objectives and guardrails.',
    kpis: [
      { title: 'Draft Templates', value: '15', trend: 'Updated today' },
      { title: 'Avg Setup Time', value: '9m', trend: '-18% vs last month' },
      { title: 'Completion Rate', value: '88%', trend: '+4% MoM' },
    ],
    checklist: ['Set conversion event map', 'Apply geo and channel restrictions', 'Attach QA checklist'],
    alerts: ['3 drafts missing postback endpoint'],
  },
  publishers: {
    label: 'Publishers',
    summary: 'Manage partner quality, payouts, and pixel setup at scale.',
    kpis: [
      { title: 'Live Publishers', value: '128', trend: '+9 this month' },
      { title: 'Pixel Health', value: '97%', trend: 'Stable' },
      { title: 'Top Partner Share', value: '32%', trend: '-2% risk reduced' },
    ],
    checklist: ['Run anti-fraud scoring', 'Approve pending partner requests', 'Check postback latency by region'],
    alerts: ['5 publishers require tax document refresh'],
  },
  advertisers: {
    label: 'Advertisers',
    summary: 'Track advertiser SLAs, postbacks, and budget compliance in one stream.',
    kpis: [
      { title: 'Active Advertisers', value: '64', trend: '+5 this quarter' },
      { title: 'Postback Success', value: '98.6%', trend: '+0.8%' },
      { title: 'SLA Compliance', value: '94%', trend: '+3%' },
    ],
    checklist: ['Reconcile postbacks hits received', 'Review advertiser settings matrix', 'Update account-level caps'],
    alerts: ['1 advertiser with delayed callback window'],
  },
  invoices: {
    label: 'Invoices',
    summary: 'Monitor finance operations for advertisers and publishers in real time.',
    kpis: [
      { title: 'Open Invoices', value: '19', trend: '-4 this week' },
      { title: 'Collection Rate', value: '92%', trend: '+6% QoQ' },
      { title: 'Avg DSO', value: '21d', trend: '-3d improvement' },
    ],
    checklist: ['Verify dashboard ledger sync', 'Review disputed invoices', 'Publish monthly billing statement'],
    alerts: ['2 invoices require manual approval'],
  },
  automation: {
    label: 'Automation',
    summary: 'Run integration tools, anti-fraud logic, and workflow automations safely.',
    kpis: [
      { title: 'Active Automations', value: '36', trend: '+7 new flows' },
      { title: 'Error-free Runs', value: '99.2%', trend: 'Healthy' },
      { title: 'Time Saved', value: '184h', trend: '+22h this month' },
    ],
    checklist: ['Review integration triggers', 'Validate e-commerce rules', 'Test data import fallback'],
    alerts: ['1 workflow queue lag on mobile-tracking task'],
  },
  notifications: {
    label: 'Notification Center',
    summary: 'Unified alerting for ops, campaign risk, and billing activity.',
    kpis: [
      { title: 'Unread Alerts', value: '14', trend: '-5 today' },
      { title: 'Critical Alerts', value: '2', trend: 'Needs action' },
      { title: 'Avg Resolution', value: '38m', trend: '-11m' },
    ],
    checklist: ['Tune severity rules', 'Assign unresolved incidents', 'Archive resolved alerts'],
    alerts: ['Critical: postback delay for region APAC'],
  },
  support: {
    label: 'Support',
    summary: 'Track support health, response SLAs, and issue categories.',
    kpis: [
      { title: 'Open Tickets', value: '23', trend: '-8 from yesterday' },
      { title: 'First Response', value: '11m', trend: '-4m faster' },
      { title: 'CSAT', value: '4.7/5', trend: '+0.2' },
    ],
    checklist: ['Prioritize VIP clients', 'Sync issue tags with automation', 'Publish weekly support digest'],
    alerts: ['3 tickets waiting for engineering input'],
  },
};

const defaultData: ModuleDetails = {
  label: 'CRM Module',
  summary: 'Overview and operational visibility for the selected module.',
  kpis: [
    { title: 'Items', value: '0', trend: 'No data' },
    { title: 'Health', value: '--', trend: 'Pending' },
    { title: 'Status', value: '--', trend: 'Pending' },
  ],
  checklist: ['Configure module settings', 'Assign ownership', 'Review data feed'],
  alerts: ['No active alerts'],
};

export default function CrmModuleDetails({ activePage }: CrmModuleDetailsProps) {
  const data = moduleMap[activePage] ?? defaultData;
  const runbookItems = [
    { action: 'Data sync validation complete', owner: 'Ops Bot', time: '8m ago', status: 'Completed' },
    { action: 'Threshold alerts recalibrated', owner: 'Alex R.', time: '42m ago', status: 'Completed' },
    { action: 'Channel quality review queued', owner: 'Jamie L.', time: '1h ago', status: 'In progress' },
    { action: 'Daily snapshot archived', owner: 'Automation', time: '2h ago', status: 'Completed' },
  ];

  const ownership = [
    { lane: 'Operations', owner: 'Alex R.', sla: '99.2%', queue: 6 },
    { lane: 'Finance', owner: 'Maya T.', sla: '97.8%', queue: 4 },
    { lane: 'Partnerships', owner: 'Jamie L.', sla: '96.9%', queue: 8 },
    { lane: 'Engineering', owner: 'Sam T.', sla: '99.6%', queue: 3 },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      <section className="rounded-2xl border border-sky-100 bg-gradient-to-r from-cyan-50 to-sky-50 p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-white p-2.5 text-cyan-700 shadow-sm">
            <Layers3 size={18} />
          </div>
          <div>
            <p className="font-display text-xl font-bold text-slate-900">{data.label} Overview</p>
            <p className="mt-1 text-sm text-slate-600">{data.summary}</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {data.kpis.map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.title}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{item.value}</p>
            <p className="mt-1 text-xs text-cyan-700">{item.trend}</p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-2xl border border-slate-100 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <ListChecks size={16} className="text-cyan-700" />
            <h3 className="text-sm font-semibold text-slate-800">Operational Checklist</h3>
          </div>
          <ul className="space-y-3">
            {data.checklist.map((item) => (
              <li key={item} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                <CheckCircle2 size={16} className="text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="space-y-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-5">
            <div className="mb-3 flex items-center gap-2">
              <Bell size={16} className="text-cyan-700" />
              <h3 className="text-sm font-semibold text-slate-800">Alerts</h3>
            </div>
            <ul className="space-y-2">
              {data.alerts.map((item) => (
                <li key={item} className="rounded-xl border border-cyan-100 bg-cyan-50 px-3 py-2 text-sm text-cyan-900">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5">
            <div className="mb-3 flex items-center gap-2">
              <Gauge size={16} className="text-cyan-700" />
              <h3 className="text-sm font-semibold text-slate-800">Live Status</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-slate-700"><UsersRound size={14} className="text-cyan-700" /> Team Owners: 4 online</p>
              <p className="flex items-center gap-2 text-slate-700"><FolderKanban size={14} className="text-cyan-700" /> Active tasks: 12 in progress</p>
              <p className="flex items-center gap-2 text-slate-700"><Clock3 size={14} className="text-cyan-700" /> Last sync: 2 minutes ago</p>
              <p className="flex items-center gap-2 text-slate-700"><Sparkles size={14} className="text-cyan-700" /> Automation confidence: High</p>
            </div>
          </div>
        </article>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_1fr]">
        <article className="rounded-2xl border border-slate-100 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <Clock3 size={16} className="text-cyan-700" />
            <h3 className="text-sm font-semibold text-slate-800">Runbook Timeline</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {runbookItems.map((item) => (
              <div key={item.action} className="py-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-800">{item.action}</p>
                  <p className="text-xs text-slate-400">{item.owner} · {item.time}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  item.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-100 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <UsersRound size={16} className="text-cyan-700" />
            <h3 className="text-sm font-semibold text-slate-800">Ownership Matrix</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 text-left">
                  <th className="py-2 text-xs uppercase tracking-wider text-slate-500">Lane</th>
                  <th className="py-2 text-xs uppercase tracking-wider text-slate-500">Owner</th>
                  <th className="py-2 text-xs uppercase tracking-wider text-slate-500 text-right">SLA</th>
                  <th className="py-2 text-xs uppercase tracking-wider text-slate-500 text-right">Queue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {ownership.map((row) => (
                  <tr key={row.lane}>
                    <td className="py-2.5 text-sm font-medium text-slate-800">{row.lane}</td>
                    <td className="py-2.5 text-sm text-slate-600">{row.owner}</td>
                    <td className="py-2.5 text-sm text-right text-slate-700">{row.sla}</td>
                    <td className="py-2.5 text-sm text-right text-slate-700">{row.queue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </div>
  );
}
