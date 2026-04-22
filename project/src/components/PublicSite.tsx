import { useEffect, useMemo, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  Briefcase,
  CalendarDays,
  Globe2,
  Landmark,
  Laptop,
  Layers3,
  Mail,
  Megaphone,
  Menu,
  Microscope,
  MonitorSmartphone,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Video,
  Webhook,
} from 'lucide-react';

type PublicLink = {
  label: string;
  path: string;
  description: string;
  icon: LucideIcon;
};

type PublicGroup = {
  title: string;
  path: string;
  description: string;
  items: PublicLink[];
};

type PublicPageConfig = {
  route: string;
  eyebrow: string;
  title: string;
  description: string;
  accent: 'blue' | 'magenta';
  stats: Array<{ label: string; value: string }>;
  cards: Array<{ title: string; description: string; icon: LucideIcon }>;
  bullets: string[];
  ctaLabel: string;
  ctaPath: string;
};

const serviceGroups: PublicGroup[] = [
  {
    title: 'Digital Marketing',
    path: '/services/digital-marketing',
    description: 'Full-funnel acquisition and brand growth programs.',
    items: [
      {
        label: 'Search Engine Optimization',
        path: '/services/digital-marketing/search-engine-optimization',
        description: 'Technical SEO, content, and authority growth.',
        icon: Search,
      },
      {
        label: 'Search Engine Marketing',
        path: '/services/digital-marketing/search-engine-marketing',
        description: 'Intent-driven PPC and landing page testing.',
        icon: Target,
      },
      {
        label: 'Social Media Marketing',
        path: '/services/digital-marketing/social-media-marketing',
        description: 'Always-on social campaigns and creator funnels.',
        icon: Users,
      },
      {
        label: 'Web Development',
        path: '/services/digital-marketing/web-development',
        description: 'Conversion-ready sites and analytics wiring.',
        icon: Laptop,
      },
      {
        label: 'CTV Ads Agency',
        path: '/services/digital-marketing/ctv-ads-agency',
        description: 'Streaming inventory with brand-safe reach.',
        icon: Video,
      },
      {
        label: 'Affiliate Marketing',
        path: '/services/digital-marketing/affiliate-marketing',
        description: 'Publisher partnerships and scale programs.',
        icon: Briefcase,
      },
    ],
  },
  {
    title: 'Promotions',
    path: '/services/promotions',
    description: 'Performance promotions across mobile and paid media.',
    items: [
      {
        label: 'Mobile Marketing',
        path: '/services/promotions/mobile-marketing',
        description: 'App installs, re-engagement, and lifecycle growth.',
        icon: MonitorSmartphone,
      },
      {
        label: 'Influencer Marketing',
        path: '/services/promotions/influencer-marketing',
        description: 'Creator-led campaigns with measurable lift.',
        icon: Sparkles,
      },
      {
        label: 'Email Marketing',
        path: '/services/promotions/email-marketing',
        description: 'Lifecycle automation, nurture, and deliverability.',
        icon: Mail,
      },
      {
        label: 'Google Ads',
        path: '/services/promotions/google-ads',
        description: 'Search, display, and shopping campaigns.',
        icon: Target,
      },
      {
        label: 'Meta Ads',
        path: '/services/promotions/meta-ads',
        description: 'Facebook and Instagram acquisition systems.',
        icon: Megaphone,
      },
      {
        label: 'YouTube Ads & SEO',
        path: '/services/promotions/youtube-ads-seo',
        description: 'Video reach paired with discoverability.',
        icon: Video,
      },
    ],
  },
  {
    title: 'Solutions',
    path: '/services/solutions',
    description: 'Brand, retention, and market intelligence services.',
    items: [
      {
        label: 'Online Reputation Management',
        path: '/services/solutions/online-reputation-management',
        description: 'Review recovery and brand trust programs.',
        icon: ShieldCheck,
      },
      {
        label: 'Brand Strategy',
        path: '/services/solutions/brand-strategy',
        description: 'Positioning, messaging, and launch direction.',
        icon: Brain,
      },
      {
        label: 'Lead Generation Marketing',
        path: '/services/solutions/lead-generation-marketing',
        description: 'Demand capture pipelines built to convert.',
        icon: Rocket,
      },
      {
        label: 'Customer Retention',
        path: '/services/solutions/customer-retention',
        description: 'LTV growth, repeat purchases, and loyalty.',
        icon: BadgeCheck,
      },
      {
        label: 'Digital Transformation',
        path: '/services/solutions/digital-transformation',
        description: 'Systems, automation, and workflow redesign.',
        icon: Webhook,
      },
      {
        label: 'Market Research & Insights',
        path: '/services/solutions/market-research-insights',
        description: 'Audience, competitor, and opportunity analysis.',
        icon: Microscope,
      },
    ],
  },
];

const companyLinks: PublicLink[] = [
  {
    label: 'More Services',
    path: '/company/more-services',
    description: 'Explore the full delivery catalog.',
    icon: Layers3,
  },
  {
    label: 'Careers',
    path: '/company/careers',
    description: 'Open roles and team culture.',
    icon: Briefcase,
  },
  {
    label: 'About Us',
    path: '/company/about-us',
    description: 'Mission, team, and company story.',
    icon: Users,
  },
  {
    label: 'Events',
    path: '/company/events',
    description: 'Workshops, launch sessions, and webinars.',
    icon: CalendarDays,
  },
  {
    label: 'Documentation',
    path: '/company/documentation',
    description: 'Guides, references, and setup help.',
    icon: Landmark,
  },
  {
    label: 'Traffic',
    path: '/company/traffic',
    description: 'Traffic sources, optimization, and media ops.',
    icon: Globe2,
  },
];

const heroHighlights = [
  { label: 'AI-powered planning', value: '01' },
  { label: 'Blue + magenta palette', value: '02' },
  { label: 'Hover-driven navigation', value: '03' },
];

const serviceFocusCards = [
  {
    title: 'Search and social growth',
    description: 'Build campaigns that balance intent capture with brand scale.',
    icon: Target,
  },
  {
    title: 'Conversion-ready experiences',
    description: 'Pair landing pages, tracking, and optimization into one flow.',
    icon: Laptop,
  },
  {
    title: 'Retention and insight loops',
    description: 'Keep customers engaged with measurable lifecycle systems.',
    icon: Brain,
  },
];

const normalizePath = (pathname: string) => pathname.replace(/\/+$/, '') || '/';

const publicRoutes = new Map<string, PublicPageConfig>();

const buildCardSet = (subject: string, icon: LucideIcon, tone: string): Array<{ title: string; description: string; icon: LucideIcon }> => [
  {
    title: `${subject} launch`,
    description: 'Clear positioning, messaging, and launch-ready setup.',
    icon,
  },
  {
    title: 'Performance review',
    description: 'Track the channels, assets, and conversion signals that matter.',
    icon: tone === 'blue' ? Target : Sparkles,
  },
  {
    title: 'Growth iteration',
    description: 'Use insights to keep the system moving forward.',
    icon: tone === 'blue' ? Webhook : ShieldCheck,
  },
];

const registerPage = (config: PublicPageConfig) => {
  publicRoutes.set(config.route, config);
};

registerPage({
  route: '/',
  eyebrow: 'Powered by AI Intelligence',
  title: 'Advertising is Agency. So are we.',
  description:
    'A modern growth studio for brands that want performance media, content, and automation tied together in one focused experience.',
  accent: 'magenta',
  stats: heroHighlights,
  cards: serviceFocusCards,
  bullets: [
    'Strategy, production, and performance tracking in one system.',
    'Hover-driven service discovery with smooth public navigation.',
    'Built with the site’s blue and magenta identity from the current UI.',
  ],
  ctaLabel: 'Data for the AI Era',
  ctaPath: '/services',
});

registerPage({
  route: '/services',
  eyebrow: 'Services',
  title: 'Three service pillars, one growth engine.',
  description: 'Use the service menu to move from overview pages into focused delivery pages.',
  accent: 'blue',
  stats: [
    { label: 'Categories', value: '3' },
    { label: 'Service pages', value: '18' },
    { label: 'Hover menus', value: '2' },
  ],
  cards: serviceGroups.map((group) => ({
    title: group.title,
    description: group.description,
    icon: group.items[0].icon,
  })),
  bullets: ['Digital marketing, promotions, and solutions grouped in one menu.'],
  ctaLabel: 'Open Digital Marketing',
  ctaPath: '/services/digital-marketing',
});

registerPage({
  route: '/company',
  eyebrow: 'Company',
  title: 'Company pages with a clean hover-first menu.',
  description: 'These pages give the company dropdown a real destination instead of a dead menu.',
  accent: 'magenta',
  stats: [
    { label: 'Company pages', value: '6' },
    { label: 'Brand tone', value: 'Bold' },
    { label: 'Palette', value: 'Blue' },
  ],
  cards: companyLinks.slice(0, 3).map((item) => ({
    title: item.label,
    description: item.description,
    icon: item.icon,
  })),
  bullets: ['About, careers, events, documentation, and traffic pages are now route-backed.'],
  ctaLabel: 'View About Us',
  ctaPath: '/company/about-us',
});

serviceGroups.forEach((group) => {
  registerPage({
    route: group.path,
    eyebrow: 'Services',
    title: group.title,
    description: group.description,
    accent: group.title === 'Promotions' ? 'magenta' : 'blue',
    stats: [
      { label: 'Pages', value: String(group.items.length + 1) },
      { label: 'Category', value: group.title },
      { label: 'Focus', value: 'Growth' },
    ],
    cards: group.items.slice(0, 3).map((item) => ({
      title: item.label,
      description: item.description,
      icon: item.icon,
    })),
    bullets: [
      `Hover from the navbar into ${group.title.toLowerCase()} and choose a subpage.`,
      `Each page keeps the same blue and magenta identity.`,
      'The layout is intentionally simple so the menu stays the focus.',
    ],
    ctaLabel: `Open ${group.items[0].label}`,
    ctaPath: group.items[0].path,
  });

  group.items.forEach((item) => {
    registerPage({
      route: item.path,
      eyebrow: group.title,
      title: item.label,
      description: item.description,
      accent: group.title === 'Promotions' ? 'magenta' : 'blue',
      stats: [
        { label: 'Group', value: group.title },
        { label: 'Page', value: 'Live' },
        { label: 'Style', value: 'Gradient' },
      ],
      cards: buildCardSet(item.label, item.icon, group.title === 'Promotions' ? 'magenta' : 'blue'),
      bullets: [
        `${item.label} uses the same public shell as the homepage.`,
        item.description,
        'The page is wired from the navbar hover menu.',
      ],
      ctaLabel: 'Back to Services',
      ctaPath: '/services',
    });
  });
});

companyLinks.forEach((item) => {
  registerPage({
    route: item.path,
    eyebrow: 'Company',
    title: item.label,
    description: item.description,
    accent: 'magenta',
    stats: [
      { label: 'Section', value: 'Company' },
      { label: 'Route', value: 'Live' },
      { label: 'Palette', value: 'Blue' },
    ],
    cards: buildCardSet(item.label, item.icon, 'magenta'),
    bullets: [
      'This page is reachable from the company hover menu.',
      'Each entry keeps the same visual system as the homepage.',
      'Use these pages as real destinations for the menu items.',
    ],
    ctaLabel: 'Back to Company',
    ctaPath: '/company',
  });
});

const getRouteConfig = (pathname: string) => {
  const normalized = normalizePath(pathname);
  return publicRoutes.get(normalized) ?? publicRoutes.get('/')!;
};

function PublicMenuLink({ item, onNavigate }: { item: PublicLink; onNavigate: (path: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onNavigate(item.path)}
      className="flex w-full items-start gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors hover:bg-slate-50"
    >
      <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-fuchsia-50 text-blue-600 shadow-sm ring-1 ring-blue-100">
        <item.icon size={16} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-slate-900">{item.label}</span>
        <span className="mt-0.5 block text-xs leading-5 text-slate-500">{item.description}</span>
      </span>
    </button>
  );
}

function PublicNavbar({ currentPath, onNavigate, onLogin }: { currentPath: string; onNavigate: (path: string) => void; onLogin: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'services' | 'company' | null>(null);

  useEffect(() => {
    const closeMenus = () => {
      setActiveMenu(null);
      setMobileOpen(false);
    };

    window.addEventListener('resize', closeMenus);
    return () => window.removeEventListener('resize', closeMenus);
  }, []);

  const topLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services', menu: 'services' as const },
    { label: 'Company', path: '/company', menu: 'company' as const },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <button type="button" onClick={() => onNavigate('/')} className="flex items-center gap-3 text-left">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-sky-500 to-fuchsia-500 text-white shadow-lg shadow-blue-500/20">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-400">ClicksMeta</p>
            <p className="text-base font-black tracking-tight text-slate-950">Growth Agency</p>
          </div>
        </button>

        <nav className="hidden items-center gap-2 lg:flex">
          {topLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.menu && setActiveMenu(link.menu)}
              onMouseLeave={() => link.menu && setActiveMenu((current) => (current === link.menu ? null : current))}
            >
              <button
                type="button"
                onClick={() => onNavigate(link.path)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  normalizePath(currentPath) === link.path ? 'bg-slate-950 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>

              {link.menu === 'services' && activeMenu === 'services' && (
                <div className="absolute left-1/2 top-full mt-3 w-[930px] -translate-x-1/2 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
                  <div className="grid grid-cols-3 gap-4">
                    {serviceGroups.map((group) => (
                      <div key={group.title} className="rounded-3xl border border-slate-100 bg-slate-50/70 p-4">
                        <button type="button" onClick={() => onNavigate(group.path)} className="mb-4 text-left">
                          <p className="text-base font-bold text-slate-950">{group.title}</p>
                          <p className="mt-1 text-xs leading-5 text-slate-500">{group.description}</p>
                        </button>
                        <div className="space-y-1">
                          {group.items.map((item) => (
                            <PublicMenuLink key={item.path} item={item} onNavigate={onNavigate} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {link.menu === 'company' && activeMenu === 'company' && (
                <div className="absolute left-1/2 top-full mt-3 w-[320px] -translate-x-1/2 rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
                  {companyLinks.map((item) => (
                    <PublicMenuLink key={item.path} item={item} onNavigate={onNavigate} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onLogin}
            className="hidden rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100 sm:inline-flex"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
            aria-label="Open public navigation"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg lg:hidden sm:px-6">
          <div className="space-y-2">
            {topLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => {
                  onNavigate(link.path);
                  setMobileOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold ${
                  normalizePath(currentPath) === link.path ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-800'
                }`}
              >
                <span>{link.label}</span>
                <ArrowRight size={15} />
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                onLogin();
                setMobileOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-fuchsia-500 px-4 py-3 text-left text-sm font-semibold text-white"
            >
              <span>Login</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function PublicHero({ config, onNavigate }: { config: PublicPageConfig; onNavigate: (path: string) => void }) {
  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-14 sm:px-6 sm:pb-14 lg:px-8 lg:pb-20 lg:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(59,130,246,0.18),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(217,70,239,0.16),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.12),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,250,255,0.75))]" />

      <div className="home-hero-motion relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm">
            <Sparkles size={14} className="text-fuchsia-500" />
            {config.eyebrow}
          </div>

          <h1 className="mt-8 text-balance font-display text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-8xl">
            {config.title.includes('. ') ? (
              <>
                <span className="block">{config.title.split('. ')[0]}</span>
                <span className="mt-2 block text-transparent bg-gradient-to-r from-blue-700 via-sky-500 to-fuchsia-500 bg-clip-text">
                  {config.title.split('. ')[1]}
                </span>
              </>
            ) : (
              <span className="block text-4xl sm:text-5xl lg:text-7xl">{config.title}</span>
            )}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-slate-600 sm:text-xl">
            {config.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate(config.ctaPath)}
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-fuchsia-500 px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_35px_rgba(59,130,246,0.28)] transition-transform hover:-translate-y-0.5"
            >
              {config.ctaLabel}
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/company/about-us')}
              className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:bg-slate-50"
            >
              Start Advertising
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/services/promotions')}
              className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:bg-slate-50"
            >
              Start Monetizing
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {config.stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/80 bg-white/85 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm">
                <p className="text-3xl font-black text-slate-950">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PublicSectionPage({ config, onNavigate }: { config: PublicPageConfig; onNavigate: (path: string) => void }) {
  return (
    <main className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[32px] border border-white/80 bg-white/90 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-500">{config.eyebrow}</p>
              <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
                {config.title}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">{config.description}</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate(config.ctaPath)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(59,130,246,0.24)]"
            >
              {config.ctaLabel}
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {config.stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-slate-100 bg-slate-50/70 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{stat.label}</p>
                <p className="mt-3 text-2xl font-black text-slate-950">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {config.cards.map((card) => (
              <article key={card.title} className="rounded-[28px] border border-slate-100 bg-gradient-to-b from-white to-slate-50 p-5 shadow-sm">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-fuchsia-50 text-blue-600">
                  <card.icon size={18} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-950">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[28px] bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/10">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-200">What this page gives you</p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-200">
                {config.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-fuchsia-500 text-[11px] font-black text-white">
                      •
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`rounded-[28px] p-6 ${config.accent === 'blue' ? 'bg-blue-50' : 'bg-fuchsia-50'}`}>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">Navigation</p>
              <p className="mt-3 text-xl font-black tracking-tight text-slate-950">Keep exploring the public site.</p>
              <div className="mt-5 space-y-3">
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-left text-sm font-semibold text-slate-800 shadow-sm"
                >
                  Home
                  <ArrowRight size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/services')}
                  className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-left text-sm font-semibold text-slate-800 shadow-sm"
                >
                  Services
                  <ArrowRight size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/company')}
                  className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-left text-sm font-semibold text-slate-800 shadow-sm"
                >
                  Company
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function PublicSite({ onLogin }: { onLogin: () => void }) {
  const [pathname, setPathname] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => setPathname(normalizePath(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    const nextPath = normalizePath(path);
    if (normalizePath(window.location.pathname) !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }
    setPathname(nextPath);
  };

  const config = useMemo(() => getRouteConfig(pathname), [pathname]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.11),transparent_28%),linear-gradient(180deg,#f8fbff_0%,#ffffff_40%,#f7f5ff_100%)] text-slate-900">
      <PublicNavbar currentPath={pathname} onNavigate={navigate} onLogin={onLogin} />
      <PublicHero config={config} onNavigate={navigate} />

      {normalizePath(pathname) === '/' ? (
        <main className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <section className="grid gap-6 rounded-[32px] border border-white/80 bg-white/90 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] lg:grid-cols-3 lg:p-8">
              {serviceGroups.map((group) => (
                <article key={group.title} className="rounded-[28px] border border-slate-100 bg-gradient-to-b from-white to-slate-50 p-5 shadow-sm">
                  <button type="button" onClick={() => navigate(group.path)} className="text-left">
                    <p className="text-xl font-black text-slate-950">{group.title}</p>
                    <div className="mt-3 h-px w-full bg-gradient-to-r from-blue-300 via-fuchsia-300 to-transparent" />
                    <p className="mt-4 text-sm leading-6 text-slate-500">{group.description}</p>
                  </button>
                  <div className="mt-5 space-y-1">
                    {group.items.slice(0, 2).map((item) => (
                      <PublicMenuLink key={item.path} item={item} onNavigate={navigate} />
                    ))}
                  </div>
                </article>
              ))}
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[32px] border border-white/80 bg-white/90 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-500">Service preview</p>
                    <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">The same hover menu, now with real pages.</h2>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {serviceFocusCards.map((item) => (
                    <article key={item.title} className="rounded-3xl border border-slate-100 bg-slate-50/70 p-4">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-fuchsia-50 text-blue-600">
                        <item.icon size={18} />
                      </div>
                      <h3 className="mt-4 text-base font-bold text-slate-950">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-white/80 bg-slate-950 p-6 text-white shadow-[0_20px_70px_rgba(15,23,42,0.12)] sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-200">Company quick links</p>
                <div className="mt-6 space-y-3">
                  {companyLinks.slice(0, 4).map((item) => (
                    <button
                      key={item.path}
                      type="button"
                      onClick={() => navigate(item.path)}
                      className="flex w-full items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition-colors hover:bg-white/10"
                    >
                      <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-fuchsia-500 text-white">
                        <item.icon size={17} />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">{item.label}</span>
                        <span className="mt-1 block text-xs leading-5 text-slate-300">{item.description}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      ) : (
        <PublicSectionPage config={config} onNavigate={navigate} />
      )}
    </div>
  );
}