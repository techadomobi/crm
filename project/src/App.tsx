import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Deals from './pages/Deals';
import Activities from './pages/Activities';
import Reports from './pages/Reports.tsx';
import ApiDocs from './pages/ApiDocs';
import Settings from './pages/Settings';
import CrmModuleDetails from './pages/CrmModuleDetails';
import AuthPortal from './pages/AuthPortal';
import { NavPage } from './types';
import { AdminLoginPayload, repowireApi, SignupPayload } from './api/repowireApi';
import { ApiError } from './api/httpClient';

const SESSION_KEY = 'repowire_session_active';
const USER_NAME_KEY = 'repowire_user_name';

const routeToPage: Record<string, NavPage> = {
  '/': 'dashboard',
  '/dashboard': 'dashboard',
  '/contacts': 'contacts',
  '/deals': 'deals',
  '/activities': 'activities',
  '/reports': 'reports',
  '/settings': 'settings',
  '/api/docs': 'apiDocs',
};

const pageToRoute: Partial<Record<NavPage, string>> = {
  dashboard: '/dashboard',
  contacts: '/contacts',
  deals: '/deals',
  activities: '/activities',
  reports: '/reports',
  settings: '/settings',
  apiDocs: '/api/docs',
};

const normalizeRoute = (pathname: string) => pathname.replace(/\/+$/, '') || '/';
const getPageFromPath = (pathname: string): NavPage => routeToPage[normalizeRoute(pathname)] ?? 'dashboard';

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
    const value = input.trim();
    return value || null;
  }

  if (typeof input !== 'object') return null;

  const object = input as Record<string, unknown>;
  const directKeys = ['name', 'fullName', 'full_name', 'displayName', 'display_name', 'username'];
  for (const key of directKeys) {
    const value = object[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }

  const firstName = object.firstName;
  const lastName = object.lastName;
  if (typeof firstName === 'string' && firstName.trim()) {
    return `${firstName.trim()}${typeof lastName === 'string' && lastName.trim() ? ` ${lastName.trim()}` : ''}`.trim();
  }

  for (const value of Object.values(object)) {
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

export default function App() {
  const normalizedPath = normalizeRoute(window.location.pathname);
  const isPublicApiDocsRoute = normalizedPath === '/api/docs';
  const [isAuthenticated, setIsAuthenticated] = useState(hasPersistedSession());
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [displayName, setDisplayName] = useState(localStorage.getItem(USER_NAME_KEY) || 'Alex Rivera');
  const [activePage, setActivePage] = useState<NavPage>(getPageFromPath(window.location.pathname));
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const onPopState = () => {
      setActivePage(getPageFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleNavigate = (page: NavPage) => {
    const nextRoute = pageToRoute[page];
    if (nextRoute && normalizeRoute(window.location.pathname) !== nextRoute) {
      window.history.pushState({}, '', nextRoute);
    }
    setActivePage(page);
    setMobileSidebarOpen(false);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'contacts': return <Contacts />;
      case 'deals': return <Deals />;
      case 'activities': return <Activities />;
      case 'reports': return <Reports />;
      case 'apiDocs': return <ApiDocs />;
      case 'settings': return <Settings />;
      default: return <CrmModuleDetails activePage={activePage} />;
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

    return (
      <AuthPortal
        mode={authMode}
        onModeChange={setAuthMode}
        authError={authError}
        isSubmitting={isAuthenticating}
        onAuthenticate={async ({ mode, accountType, partnersId, email, password, name }) => {
          const loginAttempts: Array<{ source: string; call: (payload: AdminLoginPayload) => Promise<unknown>; payload: AdminLoginPayload }> =
            accountType === 'admin'
              ? [
                  ...(partnersId.trim()
                    ? [{ source: '/subAdmin/singleLogin', call: repowireApi.singleLogin, payload: { partners_Id: partnersId.trim(), email: email.trim(), password } }]
                    : []),
                  { source: '/subAdmin/login', call: repowireApi.subAdminLogin, payload: { email: email.trim(), password } },
                  { source: '/admin/login', call: repowireApi.adminLogin, payload: { email: email.trim(), password } },
                ]
              : accountType === 'advertiser'
                ? [{ source: '/advertiser/login', call: repowireApi.advertiserLogin, payload: { email: email.trim(), password } }]
                : [{ source: '/publicher/login', call: repowireApi.publicherLogin, payload: { email: email.trim(), password } }];

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

                  const registerDisplayName = extractDisplayName(registerResult) ?? `${firstName} ${lastName}`.trim();
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

            if (extractedPartnersId) {
              localStorage.setItem('repowire_partners_id', extractedPartnersId);
            }

            const loginDisplayName = extractDisplayName(response) || extractDisplayName(name) || localStorage.getItem(USER_NAME_KEY) || email.trim().split('@')[0] || 'User';
            localStorage.setItem(USER_NAME_KEY, loginDisplayName);
            setDisplayName(loginDisplayName);

            setIsAuthenticated(true);
            handleNavigate('dashboard');

            if (!token) {
              setAuthError('Logged in, but token is not returned by this account. Save token in Settings for full API access.');
            }
          } catch (error) {
            if (error instanceof ApiError) {
              if (error.status === 401 || error.status === 403) {
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
      />
      <Header
        activePage={activePage}
        sidebarCollapsed={sidebarCollapsed}
        onToggleMobileSidebar={() => setMobileSidebarOpen((current) => !current)}
        onSignOut={() => {
          localStorage.removeItem('repowire_token');
          localStorage.removeItem('repowire_partners_id');
          localStorage.removeItem('repowire_auth_source');
          localStorage.removeItem('repowire_last_auth_mode');
          localStorage.removeItem(USER_NAME_KEY);
          localStorage.removeItem(SESSION_KEY);
          window.history.pushState({}, '', '/');
          setIsAuthenticated(false);
          setAuthMode('login');
          setAuthError(null);
          setDisplayName('Alex Rivera');
        }}
        displayName={displayName}
      />
      <main
        className={`transition-all duration-300 pt-24 lg:pt-20 min-h-screen pl-0 ${
          sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-60'
        }`}
      >
        <div className="p-4 sm:p-6 max-w-[1600px]">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
