import { useMemo, useState } from 'react';
import { Search, Bell, Plus, ChevronDown, Menu, CheckCircle } from 'lucide-react';
import { NavPage } from '../types';

interface HeaderProps {
  activePage: NavPage;
  sidebarCollapsed: boolean;
  onToggleMobileSidebar: () => void;
  onSignOut: () => void;
  displayName: string;
}

const pageTitles: Partial<Record<NavPage, { title: string; subtitle: string }>> = {
  dashboard: { title: 'Dashboard', subtitle: 'Welcome back, Alex. Here\'s what\'s happening.' },
  campaigns: { title: 'Campaigns', subtitle: 'Create and optimize campaigns with better targeting control' },
  publishers: { title: 'Publishers', subtitle: 'Manage publisher quality, access, and postback tracking' },
  advertisers: { title: 'Advertisers', subtitle: 'Monitor advertiser integrations, SLAs, and postbacks' },
  invoices: { title: 'Invoices', subtitle: 'Track billing operations for publishers and advertisers' },
  automation: { title: 'Automation', subtitle: 'Control integrations, workflows, and anti-fraud rules' },
  notifications: { title: 'Notifications', subtitle: 'Review system alerts and incident feed' },
  support: { title: 'Support', subtitle: 'Support requests, SLAs, and response performance' },
  contacts: { title: 'Contacts', subtitle: 'Manage and track your customer relationships' },
  deals: { title: 'Deals Pipeline', subtitle: 'Track deals across all stages' },
  activities: { title: 'Activities', subtitle: 'Calls, emails, meetings, and tasks' },
  reports: { title: 'Reports & Analytics', subtitle: 'Insights into your sales performance' },
  apiDocs: { title: 'API Docs', subtitle: 'Swagger-backed endpoint reference and usage examples' },
  settings: { title: 'Settings', subtitle: 'Manage your account and preferences' },
};

const formatTitle = (page: NavPage) => page.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase());

export default function Header({ activePage, sidebarCollapsed, onToggleMobileSidebar, onSignOut, displayName }: HeaderProps) {
  const [searchValue, setSearchValue] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const notifications = useMemo(
    () => [
      { id: '1', title: 'Campaign CAP reached', time: '3m ago' },
      { id: '2', title: 'Postback retry queue elevated', time: '12m ago' },
      { id: '3', title: 'Invoice approval pending', time: '27m ago' },
    ],
    []
  );

  const titleData = pageTitles[activePage] ?? {
    title: formatTitle(activePage),
    subtitle: 'Operational details, health metrics, and recent activity for this module.',
  };

  const { title, subtitle } = titleData;
  const avatarLetter = (displayName.trim()[0] || 'U').toUpperCase();
  const welcomeSubtitle = activePage === 'dashboard' ? `Welcome back, ${displayName}. Here's what's happening.` : subtitle;

  return (
    <header
      className={`fixed top-0 right-0 z-20 border-b border-white/70 bg-white/85 backdrop-blur-md transition-all duration-300 left-0 ${
        sidebarCollapsed ? 'lg:left-16' : 'lg:left-60'
      }`}
    >
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5">
        <div className="min-w-0 flex items-center gap-2.5">
          <button
            type="button"
            aria-label="Open sidebar"
            onClick={onToggleMobileSidebar}
            className="lg:hidden rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50"
          >
            <Menu size={18} />
          </button>

          <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-slate-900 font-bold text-lg leading-tight">{title}</h1>
            {activePage === 'apiDocs' && (
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 whitespace-nowrap">
                <CheckCircle size={12} />
                Live
              </div>
            )}
          </div>
          <p className="text-slate-500 text-xs mt-0.5 hidden sm:block truncate">{welcomeSubtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden md:block">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search contacts, deals..."
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all w-64"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications((current) => !current);
                setShowQuickActions(false);
              }}
              className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Notifications</p>
                <div className="space-y-2">
                  {notifications.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setShowNotifications(false)}
                      className="w-full rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-left hover:bg-slate-100 transition-colors"
                    >
                      <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative hidden sm:block">
            <button
              onClick={() => {
                setShowQuickActions((current) => !current);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-blue-500/20 active:scale-95"
            >
              <Plus size={15} />
              <span>New</span>
              <ChevronDown size={13} className="opacity-70" />
            </button>
            {showQuickActions && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                {['Create campaign', 'Add contact', 'Log activity', 'Generate report'].map((label) => (
                  <button
                    key={label}
                    onClick={() => setShowQuickActions(false)}
                    className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-bold shadow-sm">
              {avatarLetter}
            </div>
            <div className="hidden sm:block">
              <p className="text-slate-800 text-xs font-semibold leading-tight group-hover:text-blue-600 transition-colors">{displayName}</p>
              <p className="text-slate-400 text-xs">Sales Manager</p>
            </div>
            <button
              onClick={onSignOut}
              className="ml-1 sm:ml-2 rounded-lg border border-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
