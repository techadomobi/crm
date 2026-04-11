import { useMemo, useState } from 'react';
import {
  BadgeDollarSign,
  Bell,
  BookOpenText,
  Cpu,
  Boxes,
  ChevronRight,
  Gauge,
  Handshake,
  LineChart,
  Megaphone,
  Receipt,
  Settings,
  Sparkles,
  UserSquare2,
  Users,
  Wrench,
} from 'lucide-react';
import { NavPage } from '../types';

interface SidebarProps {
  activePage: NavPage;
  onNavigate: (page: NavPage) => void;
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  displayName: string;
  displayRole: string;
}

type SidebarNode = {
  id: NavPage;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  children?: SidebarNode[];
};

const navItems: SidebarNode[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <Gauge size={18} /> },
  {
    id: 'campaigns',
    label: 'Campaigns',
    icon: <Megaphone size={18} />,
    children: [
      { id: 'manageCampaigns', label: 'Manage Campaigns', icon: <ChevronRight size={14} /> },
      { id: 'createCampaign', label: 'Create Campaign', icon: <ChevronRight size={14} /> },
      { id: 'campaignWizard', label: 'Campaign Wizard', icon: <ChevronRight size={14} /> },
      { id: 'campaignAccess', label: 'Campaign Access', icon: <ChevronRight size={14} /> },
      { id: 'trafficChannels', label: 'Allowed Traffic Channels', icon: <ChevronRight size={14} /> },
      { id: 'creatives', label: 'Creatives', icon: <ChevronRight size={14} /> },
      { id: 'couponCodes', label: 'Coupon Codes', icon: <ChevronRight size={14} /> },
      { id: 'featuredCampaigns', label: 'Featured Campaigns', icon: <ChevronRight size={14} /> },
      { id: 'bulkTargeting', label: 'Bulk Targeting', icon: <ChevronRight size={14} /> },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: <LineChart size={18} />,
    children: [
      { id: 'campaignsReport', label: 'Campaigns Report', icon: <ChevronRight size={14} /> },
      { id: 'publishersReport', label: 'Publishers Report', icon: <ChevronRight size={14} /> },
      { id: 'advertisersReport', label: 'Advertisers Report', icon: <ChevronRight size={14} /> },
      { id: 'dailyReport', label: 'Daily Report', icon: <ChevronRight size={14} /> },
      { id: 'goalsReport', label: 'Goals Report', icon: <ChevronRight size={14} /> },
      { id: 'cohortReport', label: 'Cohort Report', icon: <ChevronRight size={14} /> },
      {
        id: 'additionalReports',
        label: 'Additional Reports',
        icon: <ChevronRight size={14} />,
        children: [
          { id: 'capReport', label: 'CAP Report', icon: <ChevronRight size={14} /> },
          { id: 'samplingReport', label: 'Sampling Report', icon: <ChevronRight size={14} /> },
          { id: 'comparisonReport', label: 'Comparison Report', icon: <ChevronRight size={14} /> },
          { id: 'clickReport', label: 'Click Report', icon: <ChevronRight size={14} /> },
          { id: 'conversionReport', label: 'Conversion Report', icon: <ChevronRight size={14} /> },
          { id: 'impressionReport', label: 'Impression Report', icon: <ChevronRight size={14} /> },
          { id: 'postbackLogs', label: 'Postback Sent Logs', icon: <ChevronRight size={14} /> },
          { id: 'recentExports', label: 'Recent Exports', icon: <ChevronRight size={14} /> },
        ],
      },
    ],
  },
  {
    id: 'publishers',
    label: 'Publishers',
    icon: <Users size={18} />,
    children: [
      { id: 'publishersManage', label: 'Manage', icon: <ChevronRight size={14} /> },
      { id: 'publishersPostbackPixels', label: 'Postback / Pixels', icon: <ChevronRight size={14} /> },
    ],
  },
  {
    id: 'advertisers',
    label: 'Advertisers',
    icon: <Handshake size={18} />,
    children: [
      { id: 'advertisersManage', label: 'Manage', icon: <ChevronRight size={14} /> },
      { id: 'advertisersPostbacksHitsReceived', label: 'Postbacks Hits Received', icon: <ChevronRight size={14} /> },
    ],
  },
  {
    id: 'invoices',
    label: 'Invoices',
    icon: <Receipt size={18} />,
    children: [
      { id: 'invoicesDashboard', label: 'Dashboard', icon: <ChevronRight size={14} /> },
      { id: 'invoicesPublishers', label: 'Publishers', icon: <ChevronRight size={14} /> },
      { id: 'invoicesAdvertisers', label: 'Advertisers', icon: <ChevronRight size={14} /> },
      { id: 'invoicesSettings', label: 'Settings', icon: <ChevronRight size={14} /> },
    ],
  },
  {
    id: 'automation',
    label: 'Automation',
    icon: <Boxes size={18} />,
    children: [
      {
        id: 'integration',
        label: 'Integration',
        icon: <ChevronRight size={14} />,
        children: [
          { id: 'network', label: 'Network', icon: <ChevronRight size={14} /> },
          { id: 'mobileAppTracking', label: 'Mobile App Tracking', icon: <ChevronRight size={14} /> },
          { id: 'tools', label: 'Tools', icon: <ChevronRight size={14} /> },
          { id: 'ecommerce', label: 'E-Commerce', icon: <ChevronRight size={14} /> },
          { id: 'workflowAutomation', label: 'Workflow Automation', icon: <ChevronRight size={14} /> },
          { id: 'antiFraudTools', label: 'Anti-Fraud Tools', icon: <ChevronRight size={14} /> },
          { id: 'dataImport', label: 'Data Import', icon: <ChevronRight size={14} /> },
          { id: 'fillerRules', label: 'Filler Rules', icon: <ChevronRight size={14} /> },
          { id: 'offerChecker', label: 'Offer Checker', icon: <ChevronRight size={14} /> },
          { id: 'linkTestTools', label: 'Link Test Tools', icon: <ChevronRight size={14} /> },
          { id: 'globalTargeting', label: 'Global Targeting', icon: <ChevronRight size={14} /> },
          { id: 'smartLink', label: 'Smart Link', icon: <ChevronRight size={14} /> },
        ],
      },
    ],
  },
  { id: 'notifications', label: 'Notification', icon: <Bell size={18} />, badge: 4 },
  { id: 'apiDocs', label: 'API Docs', icon: <BookOpenText size={18} /> },
  { id: 'apiStudio', label: 'API Studio', icon: <Cpu size={18} /> },
  { id: 'support', label: 'Support', icon: <UserSquare2 size={18} /> },
  { id: 'contacts', label: 'Contacts', icon: <Users size={18} /> },
  { id: 'deals', label: 'Deals', icon: <BadgeDollarSign size={18} /> },
  { id: 'activities', label: 'Activities', icon: <Wrench size={18} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
];

export default function Sidebar({ activePage, onNavigate, collapsed, onToggle, mobileOpen, onCloseMobile, displayName, displayRole }: SidebarProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    campaigns: true,
    reports: false,
    publishers: false,
    advertisers: false,
    invoices: false,
    automation: false,
    integration: false,
    additionalReports: false,
  });

  const isItemActive = (item: SidebarNode): boolean => {
    if (item.id === activePage) return true;
    if (!item.children) return false;
    return item.children.some((child) => isItemActive(child));
  };

  const activeTopParent = useMemo(() => {
    const topMatch = navItems.find((item) => isItemActive(item));
    return topMatch?.id;
  }, [activePage]);

  const toggleExpanded = (id: string) => {
    setExpanded((current) => ({ ...current, [id]: !current[id] }));
  };

  const renderNode = (item: SidebarNode, depth: number) => {
    const hasChildren = Boolean(item.children?.length);
    const active = isItemActive(item);
    const opened = Boolean(expanded[item.id]);

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            }
            onNavigate(item.id);
            if (window.innerWidth < 1024) {
              onCloseMobile();
            }
          }}
          className={`w-full flex items-center gap-3 rounded-xl transition-all duration-200 group ${
            depth === 0
              ? `px-3 py-2.5 ${active ? 'bg-cyan-700 text-white' : 'text-cyan-100 hover:bg-cyan-700/50'}`
              : `py-1.5 ${depth === 1 ? 'pl-11 pr-3' : 'pl-16 pr-3'} ${
                  active ? 'text-white font-semibold' : 'text-cyan-200 hover:text-white'
                }`
          }`}
        >
          {depth === 0 && <span className={`flex-shrink-0 ${active ? 'text-white' : 'text-cyan-100'}`}>{item.icon}</span>}
          <span className={`text-left ${depth === 0 ? 'text-sm font-semibold flex-1' : 'text-[15px]'}`}>{item.label}</span>
          {item.badge && depth === 0 && (
            <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${active ? 'bg-white/20 text-white' : 'bg-cyan-300/20 text-cyan-100'}`}>
              {item.badge}
            </span>
          )}
          {hasChildren && !collapsed && (
            <ChevronRight size={14} className={`transition-transform ${opened ? 'rotate-90' : ''}`} />
          )}
        </button>

        {!collapsed && hasChildren && opened && (
          <div className="space-y-1 py-1">{item.children?.map((child) => renderNode(child, depth + 1))}</div>
        )}
      </div>
    );
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close sidebar"
        onClick={onCloseMobile}
        className={`fixed inset-0 z-30 bg-slate-900/40 transition-opacity duration-200 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
      <aside
        className={`fixed left-0 top-0 h-full z-40 flex flex-col transform transition-all duration-300 ease-in-out ${
          collapsed ? 'lg:w-16' : 'lg:w-60'
        } w-72 max-w-[86vw] ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ background: 'linear-gradient(180deg, #1A8EC1 0%, #1288BC 100%)' }}
      >
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-900/20">
          <Sparkles size={16} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-white font-display font-bold text-sm leading-tight">NexusCRM</p>
            <p className="text-cyan-100 text-xs">Performance Suite</p>
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="px-4 py-3 mx-3 mt-4 rounded-xl bg-white/10 border border-white/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-200 to-white flex items-center justify-center text-cyan-700 text-xs font-bold">
              {(displayName.trim()[0] || 'U').toUpperCase()}
            </div>
            <div>
              <p className="text-white text-xs font-medium">{displayName || localStorage.getItem('repowire_user_email')?.split('@')[0] || 'Account'}</p>
              <p className="text-cyan-100 text-xs">{displayRole}</p>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-2 mt-4 space-y-1">
        {!collapsed && <p className="text-cyan-100/80 text-xs font-semibold uppercase tracking-widest px-3 mb-2">CRM Menu</p>}
        {collapsed
          ? navItems.slice(0, 9).map((item) => {
              const active = item.id === activeTopParent;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full relative flex items-center justify-center py-2.5 rounded-xl transition-all ${
                    active ? 'bg-cyan-700 text-white' : 'text-cyan-100 hover:bg-cyan-700/50'
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.badge && (
                    <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-white text-cyan-700 text-[9px] flex items-center justify-center font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })
          : navItems.map((item) => renderNode(item, 0))}
      </nav>

      <div className="px-2 pb-4 space-y-2">
        {!collapsed && (
          <div className="mx-1 p-3 rounded-xl bg-white/10 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Bell size={14} className="text-cyan-100" />
              <p className="text-white text-xs font-semibold">3 tasks due today</p>
            </div>
            <p className="text-cyan-100 text-xs">2 calls, 1 invoice validation pending</p>
          </div>
        )}
        <button
          onClick={onToggle}
          className="hidden lg:flex w-full items-center justify-center gap-2 py-2.5 rounded-xl text-cyan-100/90 hover:text-white hover:bg-white/10 transition-all duration-200 text-xs"
        >
          <ChevronRight size={14} className={`transition-transform duration-300 ${collapsed ? '' : 'rotate-180'}`} />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
      </aside>
    </>
  );
}
