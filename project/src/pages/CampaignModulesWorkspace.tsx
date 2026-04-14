import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BookOpenText, Layers3, Sparkles } from 'lucide-react';
import { NavPage } from '../types';
import SwaggerApiConsole from '../components/SwaggerApiConsole';

interface CampaignModulesWorkspaceProps {
  activePage: NavPage;
}

type ModuleUi = {
  title: string;
  subtitle: string;
  search: string;
  bullets: string[];
};

const moduleMap: Partial<Record<NavPage, ModuleUi>> = {
  campaignWizard: {
    title: 'Campaign Wizard',
    subtitle: 'Build and configure offers from the core /offer/* endpoints.',
    search: '/offer/',
    bullets: ['/offer/createOffer', '/offer/updateOffer', '/offer/addLandingPage', '/offer/eventList'],
  },
  campaignAccess: {
    title: 'Campaign Access',
    subtitle: 'Publisher access, approvals, and offer assignment flows.',
    search: '/publisher/',
    bullets: ['/publisher/requestofferList', '/publisher/approoveOffer', '/publicher/approveOfferForPublisher'],
  },
  trafficChannels: {
    title: 'Allowed Traffic Channels',
    subtitle: 'Track clicks, impressions, and traffic validation endpoints.',
    search: '/tracking/',
    bullets: ['/tracking/trackingList', '/tracking/totalClick', '/impression/impressionList'],
  },
  creatives: {
    title: 'Creatives',
    subtitle: 'Creative assets, landing pages, and campaign metadata.',
    search: '/offer/addCreatives',
    bullets: ['/offer/addCreatives', '/offer/landingPageList', '/offer/updateLandingPage'],
  },
  couponCodes: {
    title: 'Coupon Codes',
    subtitle: 'Custom payout and coupon-like controls for offer targeting.',
    search: '/user/addCustomPayout',
    bullets: ['/user/addCustomPayout', '/user/getCustomPayout', '/user/deleteCustomPayout'],
  },
  featuredCampaigns: {
    title: 'Featured Campaigns',
    subtitle: 'Smart offers, smart links, and featured routing setup.',
    search: '/smartOffer/',
    bullets: ['/smartOffer/offerAdd', '/smartOffer/offer', '/smart_link/clicks'],
  },
  bulkTargeting: {
    title: 'Bulk Targeting',
    subtitle: 'Geo, cap, and targeting tools for large campaign batches.',
    search: '/admin/cutback',
    bullets: ['/admin/cutbackList', '/admin/publisherCutbackTool', '/offer/geoTargeting'],
  },
};

const fallbackUi: ModuleUi = {
  title: 'Campaign Modules',
  subtitle: 'Campaign-related admin pages with live API console access.',
  search: '/offer/',
  bullets: ['/offer/allOfferList', '/offer/offerList', '/offer/createOffer'],
};

export default function CampaignModulesWorkspace({ activePage }: CampaignModulesWorkspaceProps) {
  const config = useMemo(() => moduleMap[activePage] ?? fallbackUi, [activePage]);
  const [activeBullet, setActiveBullet] = useState(config.bullets[0] ?? '/offer/allOfferList');

  useEffect(() => {
    setActiveBullet(config.bullets[0] ?? '/offer/allOfferList');
  }, [config]);

  return (
    <div className="space-y-5 animate-fade-in">
      <section className="rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-sky-50 p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white px-3 py-1 text-xs font-semibold text-cyan-700 shadow-sm">
              <Layers3 size={14} />
              Campaign module
            </div>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">{config.title}</h1>
            <p className="mt-2 text-sm text-slate-600">{config.subtitle}</p>
          </div>
          <a
            href="/api/studio"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800"
          >
            <BookOpenText size={14} />
            Open API Studio
          </a>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <Sparkles size={14} className="text-cyan-700" />
          Quick actions
        </div>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {config.bullets.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveBullet(item)}
              className={`inline-flex items-center justify-between rounded-xl border px-3 py-2 text-left text-sm font-semibold ${
                activeBullet === item ? 'border-cyan-200 bg-cyan-50 text-cyan-800' : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="font-mono text-xs break-all">{item}</span>
              <ArrowRight size={12} />
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
          <BookOpenText size={14} className="text-cyan-700" />
          Selected endpoint preview
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 font-mono break-all">
          {activeBullet}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
          <BookOpenText size={14} className="text-cyan-700" />
          Live API console
        </div>
        <SwaggerApiConsole embedded initialSearch={config.search} />
      </section>
    </div>
  );
}
