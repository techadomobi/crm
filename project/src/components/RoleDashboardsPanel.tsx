import { useEffect, useState } from 'react';
import { BarChart3, Loader2, ShieldCheck, Users, Megaphone, ArrowRight } from 'lucide-react';
import { repowireApi } from '../api/repowireApi';
import { asArray } from '../services/utils';
import { NavPage } from '../types';

type RoleKind = 'admin' | 'publisher' | 'advertiser';

type Kpi = { label: string; value: string; endpoint: string };

type QuickLink = { label: string; page: NavPage };

const roleLabel: Record<RoleKind, string> = {
  admin: 'Admin dashboard',
  publisher: 'Publisher dashboard',
  advertiser: 'Advertiser dashboard',
};

const normalizeRole = (value: string | null): RoleKind => {
  const role = (value ?? '').toLowerCase();
  if (role.includes('publisher')) return 'publisher';
  if (role.includes('advertiser')) return 'advertiser';
  return 'admin';
};

const toCount = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[^\d.-]/g, ''));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

const readId = (keys: string[]) => {
  for (const key of keys) {
    const value = localStorage.getItem(key)?.trim();
    if (value) return value;
  }
  return '';
};

const readPartnersId = () =>
  (localStorage.getItem('repowire_partners_id')
    ?? localStorage.getItem('repowire_partners_Id')
    ?? localStorage.getItem('partners_Id')
    ?? '')
    .trim();

const roleQuickLinks: Record<RoleKind, QuickLink[]> = {
  admin: [
    { label: 'Open Publishers', page: 'publishersManage' },
    { label: 'Open Advertisers', page: 'advertisersManage' },
    { label: 'Open Campaigns', page: 'manageCampaigns' },
    { label: 'Open API Studio', page: 'apiStudio' },
  ],
  publisher: [
    { label: 'Publisher Campaigns', page: 'campaigns' },
    { label: 'Publishers Report', page: 'publishersReport' },
    { label: 'Postback/Pixels', page: 'publishersPostbackPixels' },
    { label: 'Open API Studio', page: 'apiStudio' },
  ],
  advertiser: [
    { label: 'Advertiser Campaigns', page: 'campaigns' },
    { label: 'Advertiser Report', page: 'advertisersReport' },
    { label: 'Postbacks Received', page: 'advertisersPostbacksHitsReceived' },
    { label: 'Open API Studio', page: 'apiStudio' },
  ],
};

export default function RoleDashboardsPanel() {
  const [selectedRole, setSelectedRole] = useState<RoleKind>(() => normalizeRole(localStorage.getItem('repowire_user_role')));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [kpis, setKpis] = useState<Kpi[]>([]);

  const [partnersId, setPartnersId] = useState(() => readPartnersId());
  const quickLinks = roleQuickLinks[selectedRole];

  const navigateToPage = (page: NavPage) => {
    window.dispatchEvent(new CustomEvent('repowire:navigate', { detail: { page } }));
  };

  useEffect(() => {
    const role = normalizeRole(localStorage.getItem('repowire_user_role'));
    setSelectedRole(role);
  }, []);

  useEffect(() => {
    const onSessionUpdated = () => {
      setPartnersId(readPartnersId());
    };

    window.addEventListener('repowire-session-updated', onSessionUpdated as EventListener);
    return () => window.removeEventListener('repowire-session-updated', onSessionUpdated as EventListener);
  }, []);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);

      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      const start = startDate.toISOString().slice(0, 10);
      const end = endDate.toISOString().slice(0, 10);

      try {
        const nextKpis: Kpi[] = [];
        const pushIfAvailable = (label: string, value: unknown, endpoint: string) => {
          if (value === undefined || value === null) return;
          nextKpis.push({ label, value: String(value), endpoint });
        };

        if (selectedRole === 'admin') {
          const [publishers, advertisers, campaigns, conversion, report] = await Promise.allSettled([
            repowireApi.publisherList({ page: 1, limit: 100, partners_Id: partnersId || undefined }),
            repowireApi.advertiserList({ page: 1, limit: 100, partners_Id: partnersId || undefined }),
            repowireApi.campaignList({ partners_Id: partnersId || undefined }),
            repowireApi.conversionSummary(),
            repowireApi.offerReport({ partners_Id: partnersId || undefined, startDate: start, endDate: end }),
          ]);

          if (publishers.status === 'fulfilled') pushIfAvailable('Publishers', asArray(publishers.value).length, '/publicher/publisherList');
          if (advertisers.status === 'fulfilled') pushIfAvailable('Advertisers', asArray(advertisers.value).length, '/advertiser/advertiserList');
          if (campaigns.status === 'fulfilled') pushIfAvailable('Campaigns', asArray(campaigns.value).length, '/offer/allOfferList');
          if (conversion.status === 'fulfilled') {
            const revenueSource = conversion.value as unknown as Record<string, unknown>;
            pushIfAvailable('Total Revenue', `$${toCount(revenueSource?.totalRevenue ?? conversion.value).toLocaleString()}`, '/conversion/totalRevenue');
          }
          if (report.status === 'fulfilled') pushIfAvailable('Report Rows', asArray(report.value).length, '/report/offerReport');
        } else if (selectedRole === 'publisher') {
          const publisherId = readId(['repowire_publisher_id', 'repowire_user_id']);
          const [campaigns, publisherReport, publishersReport, conversionList] = await Promise.allSettled([
            repowireApi.publisherCampaignList({ partners_Id: partnersId || undefined, publisherId: publisherId || undefined, page: 1 }),
            repowireApi.publisherReport({ partners_Id: partnersId || undefined, startDate: start, endDate: end }),
            repowireApi.publishersReport({ partners_Id: partnersId || undefined, publisherId: publisherId || undefined, startDate: start, endDate: end }),
            repowireApi.conversionList({ page: 1, limit: 100, partners_Id: partnersId || undefined }),
          ]);

          if (campaigns.status === 'fulfilled') pushIfAvailable('My Campaigns', asArray(campaigns.value).length, '/offer/publisherOfferList');
          if (publisherReport.status === 'fulfilled') pushIfAvailable('Publisher Report', asArray(publisherReport.value).length, '/report/publisherReport');
          if (publishersReport.status === 'fulfilled') pushIfAvailable('Detailed Rows', asArray(publishersReport.value).length, '/report/publishersReport');
          if (conversionList.status === 'fulfilled') pushIfAvailable('Conversions', asArray(conversionList.value).length, '/conversion/ConversionList');
        } else {
          const advertiserId = readId(['repowire_advertiser_id', 'repowire_user_id']);
          const [campaigns, advertiserReport, advertiserPerformance, conversionList] = await Promise.allSettled([
            repowireApi.advertiserCampaignList({ partners_Id: partnersId || undefined, advertiserId: advertiserId || undefined, page: 1 }),
            repowireApi.advertiserReport({ partners_Id: partnersId || undefined, startDate: start, endDate: end }),
            repowireApi.advertiserPerformanceReport({ partners_Id: partnersId || undefined, advertiserId: advertiserId || undefined, advertiser_id: advertiserId || undefined, startDate: start, endDate: end }),
            repowireApi.conversionList({ page: 1, limit: 100, partners_Id: partnersId || undefined }),
          ]);

          if (campaigns.status === 'fulfilled') pushIfAvailable('My Campaigns', asArray(campaigns.value).length, '/offer/advertiserOfferList');
          if (advertiserReport.status === 'fulfilled') pushIfAvailable('Advertiser Report', asArray(advertiserReport.value).length, '/report/advertiserReport');
          if (advertiserPerformance.status === 'fulfilled') pushIfAvailable('Performance Rows', asArray(advertiserPerformance.value).length, '/report/advertiserPerformanceReport');
          if (conversionList.status === 'fulfilled') pushIfAvailable('Conversions', asArray(conversionList.value).length, '/conversion/ConversionList');
        }

        setKpis(nextKpis);
        if (nextKpis.length === 0) {
          setError('Could not load role dashboard KPIs from live API. Check token and role-specific IDs.');
        }
      } catch {
        setError('Could not load role dashboard KPIs from live API. Check token and role-specific IDs.');
        setKpis([]);
      } finally {
        setLoading(false);
      }
    };

    void run();
  }, [selectedRole, partnersId]);

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Role API dashboards</h3>
          <p className="mt-1 text-xs text-slate-500">Live KPI slices for Admin, Publisher, and Advertiser users.</p>
        </div>
        <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1">
          {(['admin', 'publisher', 'advertiser'] as const).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setSelectedRole(role)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${selectedRole === role ? 'bg-white text-cyan-800 shadow-sm' : 'text-slate-600'}`}
            >
              {roleLabel[role]}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">{error}</p>}

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-600 flex items-center gap-2">
          <Loader2 size={16} className="animate-spin" />
          Loading {roleLabel[selectedRole]}...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((item) => (
            <article key={`${selectedRole}-${item.label}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{item.label}</p>
              <p className="mt-1 text-xl font-bold text-slate-900">{item.value}</p>
              <p className="mt-1 text-[11px] font-mono text-cyan-700 break-all">{item.endpoint}</p>
            </article>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 flex items-center gap-2">
          <ShieldCheck size={13} className="text-cyan-700" />
          Role context: {roleLabel[selectedRole]}
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 flex items-center gap-2">
          <Users size={13} className="text-cyan-700" />
          partners_Id: {partnersId || 'not set'}
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 flex items-center gap-2">
          <BarChart3 size={13} className="text-cyan-700" />
          Live endpoint-backed KPIs
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Role quick navigation</p>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {quickLinks.map((item) => (
            <button
              key={`${selectedRole}-${item.page}`}
              type="button"
              onClick={() => navigateToPage(item.page)}
              className="inline-flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-cyan-300 hover:text-cyan-800"
            >
              {item.label}
              <ArrowRight size={12} />
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-cyan-100 bg-cyan-50 px-3 py-2 text-xs text-cyan-900 flex items-center gap-2">
        <Megaphone size={13} className="text-cyan-700" />
        Use the module workbench pages to execute and validate every API for this role.
      </div>
    </section>
  );
}
