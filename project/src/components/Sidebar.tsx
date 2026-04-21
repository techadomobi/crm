import { useMemo } from 'react';
import {
  BarChart3,
  BarChart4,
  HeartPulse,
  Gauge,
  Compass,
  FolderKanban,
  Link2,
  Rocket,
  ShieldCheck,
  SignalHigh,
  Settings,
  UserCircle,
  UserRoundCog,
  Users,
  Workflow,
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
};

const navItems: SidebarNode[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <Gauge size={19} /> },
  { id: 'campaigns', label: 'Campaigns', icon: <Rocket size={19} /> },
  { id: 'manageCampaigns', label: 'Request Offers', icon: <FolderKanban size={19} /> },
  { id: 'affiliates', label: 'Affiliates', icon: <Users size={19} /> },
  { id: 'postbackLogs', label: 'Postback', icon: <Workflow size={19} /> },
  { id: 'advertisers', label: 'Advertisers', icon: <SignalHigh size={19} /> },
  { id: 'reports', label: 'Performance', icon: <BarChart4 size={19} /> },
  { id: 'conversionReport', label: 'Analytics', icon: <BarChart3 size={19} /> },
  { id: 'impressionReport', label: 'Impressions', icon: <Compass size={19} /> },
  { id: 'additionalReports', label: 'Validation', icon: <ShieldCheck size={19} /> },
  { id: 'publishersManage', label: 'Managers', icon: <UserRoundCog size={19} /> },
  { id: 'integration', label: 'Integrations', icon: <Link2 size={19} /> },
  { id: 'apiHealth', label: 'API Health', icon: <HeartPulse size={19} /> },
  { id: 'profile', label: 'Profile', icon: <UserCircle size={19} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
];

export default function Sidebar({ activePage, onNavigate, collapsed, onToggle, mobileOpen, onCloseMobile, displayName, displayRole }: SidebarProps) {
  const activeTopParent = useMemo(
    () => navItems.find((item) => item.id === activePage)?.id,
    [activePage]
  );

  return (
    <>
      <button
        type="button"
        aria-label="Close sidebar"
        onClick={onCloseMobile}
        className={`fixed inset-0 z-30 bg-slate-900/40 transition-opacity duration-150 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
      <aside
        className={`fixed left-0 top-0 h-full z-40 flex flex-col transform transition-[transform,width] duration-150 ease-out ${
          collapsed ? 'lg:w-16' : 'lg:w-60'
        } w-72 max-w-[86vw] ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ background: '#ffffff' }}
      >
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-slate-100 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-sm">
          <Rocket size={16} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-slate-900 font-display font-bold text-sm leading-tight">ClicksMeta CRM</p>
            <p className="text-slate-500 text-xs">Performance Suite</p>
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="px-4 py-3 mx-3 mt-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
              {(displayName.trim()[0] || 'U').toUpperCase()}
            </div>
            <div>
              <p className="text-slate-800 text-xs font-semibold">{displayName || localStorage.getItem('repowire_user_email')?.split('@')[0] || 'Account'}</p>
              <p className="text-slate-500 text-xs">{displayRole}</p>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-2 mt-4 space-y-1">
        {!collapsed && <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest px-3 mb-2">CRM Menu</p>}
        {collapsed
          ? navItems.map((item) => {
              const active = item.id === activeTopParent;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full relative flex items-center justify-center py-2.5 rounded-xl transition-colors ${
                    active ? 'bg-cyan-100 text-cyan-700' : 'text-slate-500 hover:bg-slate-100'
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
          : navItems.map((item) => {
              const active = item.id === activePage;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    if (window.innerWidth < 1024) onCloseMobile();
                  }}
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    active
                      ? 'bg-cyan-100 text-cyan-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className={active ? 'text-cyan-700' : 'text-slate-500'}>{item.icon}</span>
                  <span className="text-base font-semibold">{item.label}</span>
                </button>
              );
            })}
      </nav>

      <div className="px-2 pb-4 space-y-2">
        <button
          onClick={onToggle}
          className="hidden lg:flex w-full items-center justify-center gap-2 py-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors text-xs"
        >
          <Rocket size={14} className={`${collapsed ? '' : 'rotate-180'}`} />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
      </aside>
    </>
  );
}
