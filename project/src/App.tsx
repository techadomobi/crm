import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Deals from './pages/Deals';
import Activities from './pages/Activities';
import ReportsWorkspace from './pages/ReportsWorkspace';
import ApiDocs from './pages/ApiDocs';
import ApiStudio from './pages/ApiStudio';
import ApiHealth from './pages/ApiHealth.tsx';
import OffersManagement from './pages/OffersManagement';
import CampaignsList from './pages/CampaignsList';
import CampaignModulesWorkspace from './pages/CampaignModulesWorkspace';
import ApiModuleWorkbench from './pages/ApiModuleWorkbench';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import AuthPortal from './pages/AuthPortal';
import Affiliates from './pages/Affiliates';
import Advertisers from './pages/Advertisers';
import { NavPage } from './types';
import { AdminLoginPayload, AuthAccountType, repowireApi, SignupPayload } from './api/repowireApi';
import { ApiError } from './api/httpClient';

const SESSION_KEY = 'repowire_session_active';
const USER_NAME_KEY = 'repowire_user_name';
const USER_EMAIL_KEY = 'repowire_user_email';
const USER_ROLE_KEY = 'repowire_user_role';

const routeToPage: Record<string, NavPage> = {
  '/': 'dashboard',
  '/dashboard': 'dashboard',
  '/dashboard/campaigns': 'campaigns',
  '/dashboard/request-offers': 'manageCampaigns',
  '/dashboard/affiliates': 'affiliates',
  '/dashboard/affiliate': 'affiliates',
  '/dashboard/postback': 'postbackLogs',
  '/dashboard/advertiser': 'advertisers',
  '/dashboard/performance': 'reports',
  '/dashboard/analytics': 'conversionReport',
  '/dashboard/impressions': 'impressionReport',
  '/dashboard/validation': 'additionalReports',
  '/dashboard/manager': 'publishersManage',
  '/dashboard/integrations': 'integration',
  '/dashboard/settings': 'settings',
  '/profile': 'profile',
  '/contacts': 'contacts',
  '/deals': 'deals',
  '/activities': 'activities',
  '/reports': 'reports',
  '/settings': 'settings',
  '/api/docs': 'apiDocs',
  '/api/studio': 'apiStudio',
  '/api/health': 'apiHealth',
  '/campaigns': 'campaigns',
  '/campaigns/manage': 'manageCampaigns',
  '/campaigns/create': 'createCampaign',
  '/affiliates': 'affiliates',
  '/affiliate': 'affiliates',
  '/affiliates/publishers': 'publishers',
  '/reports/campaigns': 'campaignsReport',
  '/reports/publishers': 'publishersReport',
  '/reports/advertisers': 'advertisersReport',
  '/reports/daily': 'dailyReport',
  '/reports/goals': 'goalsReport',
  '/reports/cohort': 'cohortReport',
  '/reports/additional': 'additionalReports',
  '/reports/cap': 'capReport',
  '/reports/sampling': 'samplingReport',
  '/reports/comparison': 'comparisonReport',
  '/reports/click': 'clickReport',
  '/reports/conversion': 'conversionReport',
  '/reports/impression': 'impressionReport',
  '/reports/postback-logs': 'postbackLogs',
  '/reports/recent-exports': 'recentExports',
};

const pageToRoute: Partial<Record<NavPage, string>> = {
  dashboard: '/dashboard',
  campaigns: '/dashboard/campaigns',
  manageCampaigns: '/dashboard/request-offers',
  contacts: '/dashboard/affiliates',
  affiliates: '/dashboard/affiliate',
  publishers: '/affiliates/publishers',
  postbackLogs: '/dashboard/postback',
  advertisers: '/dashboard/advertiser',
  reports: '/dashboard/performance',
  conversionReport: '/dashboard/analytics',
  impressionReport: '/dashboard/impressions',
  additionalReports: '/dashboard/validation',
  publishersManage: '/dashboard/manager',
  integration: '/dashboard/integrations',
  settings: '/dashboard/settings',
  profile: '/profile',
  deals: '/deals',
  activities: '/activities',
  apiDocs: '/api/docs',
  apiStudio: '/api/studio',
  apiHealth: '/api/health',
  createCampaign: '/campaigns/create',
  publishersReport: '/reports/publishers',
  advertisersReport: '/reports/advertisers',
  dailyReport: '/reports/daily',
  goalsReport: '/reports/goals',
  cohortReport: '/reports/cohort',
  capReport: '/reports/cap',
  samplingReport: '/reports/sampling',
  comparisonReport: '/reports/comparison',
  clickReport: '/reports/click',
  recentExports: '/reports/recent-exports',
};

const normalizeRoute = (pathname: string) => pathname.replace(/\/+$/, '') || '/';
const allNavPages: NavPage[] = [
  'dashboard',
  'campaigns',
  'manageCampaigns',
  'createCampaign',
  'campaignWizard',
  'campaignAccess',
  'trafficChannels',
  'creatives',
  'couponCodes',
  'featuredCampaigns',
  'bulkTargeting',
  'reports',
  'campaignsReport',
  'publishersReport',
  'advertisersReport',
  'dailyReport',
  'goalsReport',
  'cohortReport',
  'additionalReports',
  'capReport',
  'samplingReport',
  'comparisonReport',
  'clickReport',
  'conversionReport',
  'impressionReport',
  'postbackLogs',
  'recentExports',
  'contacts',
  'affiliates',
  'publishers',
  'deals',
  'activities',
  'publishersManage',
  'publishersPostbackPixels',
  'advertisers',
  'advertisersManage',
  'advertisersPostbacksHitsReceived',
  'invoices',
  'invoicesDashboard',
  'invoicesPublishers',
  'invoicesAdvertisers',
  'invoicesSettings',
  'automation',
  'integration',
  'network',
  'mobileAppTracking',
  'tools',
  'ecommerce',
  'workflowAutomation',
  'antiFraudTools',
  'dataImport',
  'fillerRules',
  'offerChecker',
  'linkTestTools',
  'globalTargeting',
  'smartLink',
  'notifications',
  'support',
  'profile',
  'apiDocs',
  'apiStudio',
  'apiHealth',
  'settings',
];

const navPageSet = new Set<NavPage>(allNavPages);

const getPageFromPath = (pathname: string): NavPage => {
  const normalized = normalizeRoute(pathname);
  const direct = routeToPage[normalized];
  if (direct) return direct;

  if (normalized.startsWith('/app/')) {
    const pageToken = decodeURIComponent(normalized.slice('/app/'.length)).trim();
    if (navPageSet.has(pageToken as NavPage)) {
      return pageToken as NavPage;
    }
  }

  return 'dashboard';
};

const resolveAccountTypeFromRole = (role: string): AuthAccountType => {
  const normalizedRole = role.trim().toLowerCase();
  if (normalizedRole.includes('advertiser')) return 'advertiser';
  if (normalizedRole.includes('publisher')) return 'publisher';
  return 'admin';
};

const tryExtractJwt = (text: string): string | null => {
  const normalized = text.replace(/^Bearer\s+/i, '').trim();
  if (!normalized) return null;

  const directJwt = /^([A-Za-z0-9_-]+)\.([A-Za-z0-9_-]+)\.([A-Za-z0-9_-]+)$/;
  if (directJwt.test(normalized)) return normalized;

  const embedded = normalized.match(/([A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)/);
  return embedded?.[1] ?? null;
};

const extractToken = (input: unknown): string | null => {
  if (!input) return null;

  if (typeof input === 'string') {
    return tryExtractJwt(input);
  }

  if (typeof input !== 'object') return null;

  const object = input as Record<string, unknown>;
  const directKeys = ['token', 'accessToken', 'jwt', 'authToken', 'access_token', 'authorization', 'Authorization'];
  for (const key of directKeys) {
    const value = object[key];
    if (typeof value === 'string' && value.trim()) {
      const parsed = tryExtractJwt(value);
      if (parsed) return parsed;
    }
  }

  for (const value of Object.values(object)) {
    const nested = extractToken(value);
    if (nested) return nested;
  }

  return null;
};

const isLikelyErrorText = (value: string) => {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return true;
  return (
    normalized.includes('not found') ||
    normalized.includes('invalid') ||
    normalized.includes('unauthorized') ||
    normalized.includes('forbidden') ||
    normalized.includes('error') ||
    normalized.includes('failed') ||
    normalized.includes('admin data not found')
  );
};

const normalizeDisplayName = (value: string | null | undefined): string | null => {
  const text = (value ?? '').trim();
  if (!text || isLikelyErrorText(text)) return null;
  return text;
};

const extractPartnersId = (input: unknown): string | null => {
  if (!input || typeof input !== 'object') return null;

  const object = input as Record<string, unknown>;
  const directKeys = ['partners_Id', 'partnersId', 'partnerId', 'partner_id'];
  for (const key of directKeys) {
    const value = object[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  }

  for (const value of Object.values(object)) {
    const nested = extractPartnersId(value);
    if (nested) return nested;
  }

  return null;
};

const extractDisplayName = (input: unknown): string | null => {
  if (!input) return null;

  if (typeof input === 'string') {
    return normalizeDisplayName(input);
  }

  if (typeof input !== 'object') return null;

  const object = input as Record<string, unknown>;
  const directKeys = ['name', 'fullName', 'full_name', 'displayName', 'display_name', 'username'];
  for (const key of directKeys) {
    const value = object[key];
    if (typeof value === 'string') {
      const normalized = normalizeDisplayName(value);
      if (normalized) return normalized;
    }
  }

  const firstName = object.firstName;
  const lastName = object.lastName;
  if (typeof firstName === 'string' && firstName.trim()) {
    const combined = `${firstName.trim()}${typeof lastName === 'string' && lastName.trim() ? ` ${lastName.trim()}` : ''}`.trim();
    const normalized = normalizeDisplayName(combined);
    if (normalized) return normalized;
  }

  for (const [key, value] of Object.entries(object)) {
    if (['message', 'error', 'msg', 'responseMessage', 'status', 'statusText'].includes(key)) {
      continue;
    }
    const nested = extractDisplayName(value);
    if (nested) return nested;
  }

  return null;
};

const hasPersistedSession = () => {
  const explicitSession = localStorage.getItem(SESSION_KEY) === 'true';
  const tokenSession = Boolean(localStorage.getItem('repowire_token')?.trim());
  return explicitSession || tokenSession;
};

const readCachedDisplayName = () => {
  const cached = normalizeDisplayName(localStorage.getItem(USER_NAME_KEY));
  if (cached) return cached;

  const savedEmail = localStorage.getItem(USER_EMAIL_KEY)?.trim() || '';
  if (savedEmail.includes('@')) return savedEmail.split('@')[0];

  return '';
};

export default function App() {
  const normalizedPath = normalizeRoute(window.location.pathname);
  const isPublicApiDocsRoute = normalizedPath === '/api/docs';
  const [isAuthenticated, setIsAuthenticated] = useState(hasPersistedSession());
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [displayName, setDisplayName] = useState(readCachedDisplayName());
  const [displayEmail, setDisplayEmail] = useState(localStorage.getItem(USER_EMAIL_KEY) || '');
  const [displayRole, setDisplayRole] = useState(localStorage.getItem(USER_ROLE_KEY) || 'User');
  const [activePage, setActivePage] = useState<NavPage>(getPageFromPath(window.location.pathname));
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const clearPersistedSession = (message: string) => {
    localStorage.removeItem('repowire_token');
    localStorage.removeItem('repowire_partners_id');
    localStorage.removeItem('repowire_auth_source');
    localStorage.removeItem('repowire_last_auth_mode');
    localStorage.removeItem(USER_NAME_KEY);
    localStorage.removeItem(USER_EMAIL_KEY);
    localStorage.removeItem(USER_ROLE_KEY);
    localStorage.removeItem(SESSION_KEY);
    window.history.pushState({}, '', '/');
    setIsAuthenticated(false);
    setActivePage(getPageFromPath('/'));
    setAuthMode('login');
    setAuthError(message);
    setDisplayName('');
    setDisplayEmail('');
    setDisplayRole('User');
  };

  useEffect(() => {
    const onSessionInvalid = (event: Event) => {
      const customEvent = event as CustomEvent<{ status?: number; path?: string }>;
      const status = customEvent.detail?.status ?? 401;
      const path = customEvent.detail?.path ?? 'API request';
      clearPersistedSession(`Your session expired or is unauthorized (${status}) after calling ${path}. Please sign in again and save a valid token.`);
    };

    window.addEventListener('repowire:session-invalid', onSessionInvalid as EventListener);
    return () => window.removeEventListener('repowire:session-invalid', onSessionInvalid as EventListener);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    let cancelled = false;

    const syncProfileName = async () => {
      try {
        const accountType = resolveAccountTypeFromRole(localStorage.getItem(USER_ROLE_KEY) || displayRole);
        const profile = await repowireApi.fetchAccountProfile(accountType, localStorage.getItem('repowire_auth_source') || undefined);
        const profileName = extractDisplayName(profile);

        if (!cancelled && profileName) {
          localStorage.setItem(USER_NAME_KEY, profileName);
          setDisplayName(profileName);
        }
      } catch {
        // Keep the current session name if the profile endpoint is unavailable.
      }
    };

    void syncProfileName();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, displayRole]);

  useEffect(() => {
    const onPopState = () => {
      setActivePage(getPageFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const onNavigate = (event: Event) => {
      const customEvent = event as CustomEvent<{ page?: NavPage }>;
      const page = customEvent.detail?.page;
      if (!page) return;

      const nextRoute = pageToRoute[page] ?? `/app/${page}`;
      if (normalizeRoute(window.location.pathname) !== nextRoute) {
        window.history.pushState({}, '', nextRoute);
      }
      setActivePage(page);
      setMobileSidebarOpen(false);
    };

    window.addEventListener('repowire:navigate', onNavigate as EventListener);
    return () => window.removeEventListener('repowire:navigate', onNavigate as EventListener);
  }, []);

  const handleNavigate = (page: NavPage) => {
    const nextRoute = pageToRoute[page] ?? `/app/${page}`;
    if (nextRoute && normalizeRoute(window.location.pathname) !== nextRoute) {
      window.history.pushState({}, '', nextRoute);
    }
    setActivePage(page);
    setMobileSidebarOpen(false);
  };

  const dispatchQuickAction = (action: 'create-contact' | 'create-deal' | 'create-activity' | 'refresh-reports') => {
    window.dispatchEvent(new CustomEvent('repowire:quick-action', { detail: { action } }));
  };

  const handleQuickAction = (action: 'create-campaign' | 'add-contact' | 'log-activity' | 'generate-report') => {
    if (action === 'add-contact') {
      handleNavigate('contacts');
      window.setTimeout(() => dispatchQuickAction('create-contact'), 50);
      return;
    }

    if (action === 'create-campaign') {
      handleNavigate('createCampaign');
      return;
    }

    if (action === 'log-activity') {
      handleNavigate('activities');
      window.setTimeout(() => dispatchQuickAction('create-activity'), 50);
      return;
    }

    handleNavigate('reports');
    window.setTimeout(() => dispatchQuickAction('refresh-reports'), 50);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard displayName={displayName} displayEmail={displayEmail} />;
      case 'campaigns': return <CampaignsList />;
      case 'campaignWizard':
      case 'campaignAccess':
      case 'trafficChannels':
      case 'creatives':
      case 'couponCodes':
      case 'featuredCampaigns':
      case 'bulkTargeting':
        return <CampaignModulesWorkspace activePage={activePage} />;
      case 'contacts': return <Contacts />;
      case 'affiliates': return <Affiliates />;
      case 'publishers': return <Affiliates />;
      case 'advertisers': return <Advertisers />;
      case 'deals': return <Deals />;
      case 'activities': return <Activities />;
      case 'reports': return <ReportsWorkspace key="reports" initialView="summary" />;
      case 'campaignsReport': return <ReportsWorkspace key="campaignsReport" initialView="campaignsReport" />;
      case 'publishersReport': return <ReportsWorkspace key="publishersReport" initialView="publishersReport" />;
      case 'advertisersReport': return <ReportsWorkspace key="advertisersReport" initialView="advertisersReport" />;
      case 'dailyReport': return <ReportsWorkspace key="dailyReport" initialView="dailyReport" />;
      case 'goalsReport': return <ReportsWorkspace key="goalsReport" initialView="goalsReport" />;
      case 'cohortReport': return <ReportsWorkspace key="cohortReport" initialView="cohortReport" />;
      case 'additionalReports': return <ReportsWorkspace key="additionalReports" initialView="additionalReports" />;
      case 'capReport': return <ReportsWorkspace key="capReport" initialView="capReport" />;
      case 'samplingReport': return <ReportsWorkspace key="samplingReport" initialView="samplingReport" />;
      case 'comparisonReport': return <ReportsWorkspace key="comparisonReport" initialView="comparisonReport" />;
      case 'clickReport': return <ReportsWorkspace key="clickReport" initialView="clickReport" />;
      case 'conversionReport': return <ReportsWorkspace key="conversionReport" initialView="conversionReport" />;
      case 'impressionReport': return <ReportsWorkspace key="impressionReport" initialView="impressionReport" />;
      case 'postbackLogs': return <ReportsWorkspace key="postbackLogs" initialView="postbackLogs" />;
      case 'recentExports': return <ReportsWorkspace key="recentExports" initialView="recentExports" />;
      case 'apiDocs': return <ApiDocs />;
      case 'apiStudio': return <ApiStudio />;
      case 'apiHealth': return <ApiHealth />;
      case 'profile': return <Profile displayName={displayName} displayEmail={displayEmail} displayRole={displayRole} />;
      case 'manageCampaigns': return <OffersManagement initialTab="list" />;
      case 'createCampaign': return <OffersManagement initialTab="create" />;
      case 'settings': return <Settings displayName={displayName} displayEmail={displayEmail} displayRole={displayRole} />;
      default: return <ApiModuleWorkbench activePage={activePage} />;
    }
  };

  if (!isAuthenticated) {
    if (isPublicApiDocsRoute) {
      return (
        <div className="min-h-screen bg-app-shell">
          <main className="min-h-screen p-6">
            <div className="mx-auto max-w-[1600px] pt-2">
              <ApiDocs />
            </div>
          </main>
        </div>
      );
    }

    // Test with simple auth form - comment out to use full AuthPortal
    // return <SimpleAuthTest />;
    
    return (
      <AuthPortal
        mode={authMode}
        onModeChange={setAuthMode}
        authError={authError}
        isSubmitting={isAuthenticating}
        onAuthenticate={async ({ mode, accountType, partnersId, email, password, name }) => {
          const commonPayload = { email: email.trim(), password };
          const loginAttempts: Array<{ source: string; call: (payload: AdminLoginPayload) => Promise<unknown>; payload: AdminLoginPayload }> = [
            ...(accountType === 'admin' && partnersId.trim()
              ? [{ source: '/subAdmin/singleLogin', call: repowireApi.singleLogin, payload: { partners_Id: partnersId.trim(), ...commonPayload } }]
              : []),
            ...(accountType === 'admin'
              ? [
                  { source: '/subAdmin/login', call: repowireApi.subAdminLogin, payload: commonPayload },
                  { source: '/admin/login', call: repowireApi.adminLogin, payload: commonPayload },
                  { source: '/advertiser/login', call: repowireApi.advertiserLogin, payload: commonPayload },
                  { source: '/publicher/login', call: repowireApi.publicherLogin, payload: commonPayload },
                ]
              : accountType === 'advertiser'
                ? [
                    { source: '/advertiser/login', call: repowireApi.advertiserLogin, payload: commonPayload },
                    { source: '/admin/login', call: repowireApi.adminLogin, payload: commonPayload },
                    { source: '/subAdmin/login', call: repowireApi.subAdminLogin, payload: commonPayload },
                    { source: '/publicher/login', call: repowireApi.publicherLogin, payload: commonPayload },
                  ]
                : [
                    { source: '/publicher/login', call: repowireApi.publicherLogin, payload: commonPayload },
                    { source: '/admin/login', call: repowireApi.adminLogin, payload: commonPayload },
                    { source: '/subAdmin/login', call: repowireApi.subAdminLogin, payload: commonPayload },
                    { source: '/advertiser/login', call: repowireApi.advertiserLogin, payload: commonPayload },
                  ]),
          ];

          const splitName = (rawName?: string) => {
            const parts = (rawName ?? '').trim().split(/\s+/).filter(Boolean);
            const firstName = parts[0] ?? 'User';
            const lastName = parts.slice(1).join(' ') || 'Account';
            return { firstName, lastName };
          };

          const tryLoginAny = async () => {
            let lastError: unknown = null;
            const attemptedEndpoints: string[] = [];

            for (const login of loginAttempts) {
              try {
                attemptedEndpoints.push(login.source);

                console.log(`[Auth] Attempting ${login.source} with email=${login.payload.email}`, login.payload.partners_Id ? `partners_Id=${login.payload.partners_Id}` : '(no partners_Id)');

                const response = await login.call(login.payload);
                
                // Always try to extract a token first
                const token = extractToken(response);
                const source = login.source;

                // If we got a token, this is definitely a successful login
                if (token) {
                  console.log(`[Auth] ✓ Success at ${source}`);
                  return { token, response, source };
                }

                // Check if response explicitly indicates an error
                if (response && typeof response === 'object') {
                  const respObj = response as Record<string, unknown>;
                  const message = String(respObj.message ?? respObj.error ?? respObj.msg ?? respObj.responseMessage ?? '').toLowerCase();
                  const status = String(respObj.status ?? '').toLowerCase();
                  
                  // Check for error responseCode (e.g., 404, 401, 400, etc.)
                  const responseCode = respObj.responseCode;
                  const hasErrorCode = typeof responseCode === 'number' && responseCode >= 400;
                  
                  // Explicit error indicators
                  const isErrorResponse = hasErrorCode ||
                                        message.includes('invalid') || 
                                        message.includes('not found') || 
                                        message.includes('unauthorized') ||
                                        message.includes('forbidden') ||
                                        message.includes('incorrect') || 
                                        message.includes('wrong') ||
                                        message.includes('required') ||
                                        message.includes('doesnt exist') ||
                                        message.includes('does not exist') ||
                                        message.includes('user not found') ||
                                        status === 'failed' ||
                                        status === 'error' ||
                                        status === 'invalid' ||
                                        respObj.success === false || 
                                        respObj.success === 'false' ||
                                        respObj.success === 0;
                  
                  if (isErrorResponse) {
                    console.log(`[Auth] ✗ Failed at ${source}: ${message || 'Invalid credentials'}`);
                    lastError = new Error(message && message.length > 0 ? message : 'Invalid credentials');
                    continue;
                  }
                  
                  // If no error indicators, treat the response as a successful login even if it only returns a message.
                  console.log(`[Auth] ✓ Success at ${source}`);
                  return { token: extractToken(response), response, source };
                }
                
                // No response or invalid response format
                console.log(`[Auth] ✗ Failed at ${source}: No response`);
                lastError = new Error('No response from server');
              } catch (error) {
                const msg = error instanceof Error ? error.message : String(error);
                const lowered = msg.toLowerCase();
                if (lowered.includes('404') || lowered.includes('not found')) {
                  console.log(`[Auth] ✗ Not found at ${login.source}, trying next endpoint`);
                  lastError = error;
                  continue;
                }
                console.log(`[Auth] ✗ Error at ${login.source}: ${msg}`);
                lastError = error;
              }
            }

            // All attempts failed - throw the last error
            const finalError = lastError ?? new Error('Invalid credentials. Please check your email and password.');
            console.error(`[Auth] All ${attemptedEndpoints.length} endpoints failed (${attemptedEndpoints.join(' → ')}):`, finalError);
            throw finalError;
          };

          const tryRegisterAny = async () => {
            const { firstName, lastName } = splitName(name);
            const signupPayload: SignupPayload = {
              partners_Id: partnersId || undefined,
              email,
              password,
              confirm_password: password,
              firstName,
              lastName,
              name: `${firstName} ${lastName}`,
              companyName: 'OffersMeta User',
              mobileNumber: '0000000000',
              address: 'N/A',
            };

            const registerAttempts: Array<() => Promise<unknown>> =
              accountType === 'admin'
                ? [() => repowireApi.subAdminSignup(signupPayload)]
                : accountType === 'advertiser'
                  ? [() => repowireApi.advertiserSignup(signupPayload)]
                  : [() => repowireApi.publicherSignup(signupPayload)];

            let lastError: unknown = null;
            let lastSuccessResponse: unknown = null;
            
            for (const register of registerAttempts) {
              try {
                const response = await register();
                
                // Check if response indicates an error (even with HTTP 200)
                if (response && typeof response === 'object') {
                  const respObj = response as Record<string, unknown>;
                  const responseCode = respObj.responseCode;
                  const message = String(respObj.message ?? respObj.error ?? respObj.msg ?? respObj.responseMessage ?? '').toLowerCase();
                  
                  // Check for error responseCode (e.g., 400, 404, 409, etc.)
                  const hasErrorCode = typeof responseCode === 'number' && responseCode >= 400;
                  
                  // Check for common error messages
                  const isErrorResponse = hasErrorCode ||
                                        message.includes('already exists') ||
                                        message.includes('duplicate') ||
                                        message.includes('email already') ||
                                        message.includes('user exists') ||
                                        message.includes('invalid') ||
                                        message.includes('failed') ||
                                        message.includes('error');
                  
                  if (isErrorResponse) {
                    // If domain already exists, this email is registered but in different account type
                    if (message.includes('domain already exists')) {
                      throw new Error('This email is already registered in the system. Please try logging in, or use a different email address for this account type.');
                    }
                    // If user already exists in same account type, try login
                    if (message.includes('already exists') || message.includes('duplicate') || 
                        message.includes('email already') || message.includes('user exists')) {
                      return null;
                    }
                    // Other errors
                    lastError = new Error(message || 'Registration failed');
                    continue;
                  }
                }
                
                lastSuccessResponse = response;
                return response;
              } catch (error) {
                // Check if error is "user already exists" type
                if (error instanceof ApiError) {
                  const msg = String(error.data ?? error.message).toLowerCase();
                  if (msg.includes('already exists') || msg.includes('duplicate') || 
                      msg.includes('email already') || msg.includes('user exists')) {
                    // User already exists, this is okay - continue to login
                    return null;
                  }
                }
                lastError = error;
              }
            }

            // If we got a successful response, return it
            if (lastSuccessResponse !== null) {
              return lastSuccessResponse;
            }

            // If lastError is null, it means user already exists
            if (lastError === null) {
              return null;
            }

            throw lastError ?? new Error('Registration failed.');
          };

          setAuthError(null);
          setIsAuthenticating(true);

          try {
            if (mode === 'register') {
              const registerResult = await tryRegisterAny();
              const { firstName, lastName } = splitName(name);
              
              // If registration returned null, user already exists - try login
              if (registerResult === null) {
                // User already exists, continue to login
              } else {
                // Registration succeeded - try to login with the new credentials
                // But first, check if we got a token from registration
                const token = extractToken(registerResult);
                if (token) {
                  localStorage.setItem('repowire_token', token);
                  localStorage.setItem('repowire_auth_source', 'registration');
                  localStorage.setItem('repowire_last_auth_mode', 'register');
                  localStorage.setItem(SESSION_KEY, 'true');
                  localStorage.setItem(USER_EMAIL_KEY, email.trim());
                  localStorage.setItem(USER_ROLE_KEY, accountType === 'admin' ? 'Admin' : accountType === 'advertiser' ? 'Advertiser' : 'Publisher');

                  const profileResult = await repowireApi.fetchAccountProfile(accountType, 'registration').catch(() => null);
                  const registerDisplayName = extractDisplayName(profileResult) ?? extractDisplayName(registerResult) ?? `${firstName} ${lastName}`.trim();
                  if (registerDisplayName) {
                    localStorage.setItem(USER_NAME_KEY, registerDisplayName);
                    setDisplayName(registerDisplayName);
                  }
                  
                  const partnersId = extractPartnersId(registerResult);
                  if (partnersId) {
                    localStorage.setItem('repowire_partners_id', partnersId);
                  }
                  
                  setIsAuthenticated(true);
                  handleNavigate('dashboard');
                  setIsAuthenticating(false);
                  return;
                }
              }
            }

            const { token, source, response } = await tryLoginAny();
            const extractedPartnersId = extractPartnersId(response);

            if (token) {
              localStorage.setItem('repowire_token', token);
              localStorage.setItem('repowire_auth_source', source);
              localStorage.setItem('repowire_last_auth_mode', mode);
            } else {
              localStorage.removeItem('repowire_token');
              localStorage.setItem('repowire_auth_source', source);
              localStorage.setItem('repowire_last_auth_mode', mode);
            }
            localStorage.setItem(SESSION_KEY, 'true');
            localStorage.setItem(USER_EMAIL_KEY, email.trim());
            localStorage.setItem(USER_ROLE_KEY, accountType === 'admin' ? 'Admin' : accountType === 'advertiser' ? 'Advertiser' : 'Publisher');

            if (extractedPartnersId) {
              localStorage.setItem('repowire_partners_id', extractedPartnersId);
            }

            const profileResponse = token ? await repowireApi.fetchAccountProfile(accountType, source).catch(() => null) : null;
            const loginDisplayName =
              extractDisplayName(profileResponse) ||
              extractDisplayName(response) ||
              extractDisplayName(name) ||
              normalizeDisplayName(localStorage.getItem(USER_NAME_KEY)) ||
              email.trim().split('@')[0] ||
              'Account';
            localStorage.setItem(USER_NAME_KEY, loginDisplayName);
            setDisplayName(loginDisplayName);

            setIsAuthenticated(true);
            handleNavigate('dashboard');

            if (!token) {
              setAuthError('Logged in, but token is not returned by this account. Save token in Settings for full API access.');
            }
          } catch (error) {
            if (error instanceof ApiError) {
              if (error.status === 0) {
                setAuthError('Network error while contacting auth service. Check internet, then try again. If you are on local dev, run the app with npm run dev so /api/proxy is available.');
              } else if (error.status === 401 || error.status === 403) {
                setAuthError(`Authentication failed (${error.status}). Verify email and password are correct. If using SubAdmin, select "Admin" account type.`);
              } else if (error.status === 400 || error.status === 404 || error.status === 409) {
                setAuthError(`${mode === 'register' ? 'Registration' : 'Login'} failed (${error.status}). Check account type matches your credentials (SubAdmin→Admin, Publisher→Publisher, Advertiser→Advertiser).`);
              } else if (error.status >= 500) {
                setAuthError(`Auth service unavailable (${error.status}). Please try again in a few moments.`);
              } else {
                setAuthError(`${mode === 'register' ? 'Registration' : 'Login'} failed (HTTP ${error.status}). ${error.data && typeof error.data === 'object' ? Object.values(error.data).join('. ') : ''}`);
              }
            } else if (error instanceof Error) {
              setAuthError(`${mode === 'register' ? 'Registration' : 'Login'} failed: ${error.message}`);
            } else {
              setAuthError(`Unable to complete ${mode === 'register' ? 'registration' : 'login'} right now.`);
            }
          } finally {
            setIsAuthenticating(false);
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-app-shell">
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(c => !c)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        displayName={displayName}
        displayRole={displayRole}
      />
      <Header
        activePage={activePage}
        sidebarCollapsed={sidebarCollapsed}
        onToggleMobileSidebar={() => setMobileSidebarOpen((current) => !current)}
        onQuickAction={handleQuickAction}
        onSignOut={() => {
          localStorage.removeItem('repowire_token');
          localStorage.removeItem('repowire_partners_id');
          localStorage.removeItem('repowire_auth_source');
          localStorage.removeItem('repowire_last_auth_mode');
          localStorage.removeItem(USER_NAME_KEY);
          localStorage.removeItem(USER_EMAIL_KEY);
          localStorage.removeItem(USER_ROLE_KEY);
          localStorage.removeItem(SESSION_KEY);
          window.history.pushState({}, '', '/');
          setIsAuthenticated(false);
          setAuthMode('login');
          setAuthError(null);
          setDisplayName('');
          setDisplayEmail('');
          setDisplayRole('User');
        }}
        displayName={displayName}
        displayRole={displayRole}
      />
      <main
        className={`transition-all duration-300 pt-24 lg:pt-20 min-h-screen pl-0 ${
          sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-60'
        }`}
      >
        <div className="p-4 sm:p-6 max-w-[1600px]">
          {authError && isAuthenticated && (
            <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900 shadow-sm">
              <div className="font-semibold">Session issue</div>
              <div className="mt-1">{authError}</div>
            </div>
          )}
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
