import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Deals from './pages/Deals';
import Activities from './pages/Activities';
import Reports from './pages/Reports';
import ApiDocs from './pages/ApiDocs';
import Settings from './pages/Settings';
import CrmModuleDetails from './pages/CrmModuleDetails';
import AuthPortal from './pages/AuthPortal';
import { NavPage } from './types';
import { AdminLoginPayload, repowireApi, SignupPayload } from './api/repowireApi';
import { ApiError } from './api/httpClient';

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

export default function App() {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const isPublicApiDocsRoute = normalizedPath === '/api/docs';
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('repowire_token')?.trim()));
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [activePage, setActivePage] = useState<NavPage>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleNavigate = (page: NavPage) => {
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
        onAuthenticate={async ({ mode, email, password, name }) => {
          const loginAttempts: Array<(payload: AdminLoginPayload) => Promise<unknown>> = [
            repowireApi.adminLogin,
            repowireApi.subAdminLogin,
            repowireApi.publicherLogin,
          ];

          const splitName = (rawName?: string) => {
            const parts = (rawName ?? '').trim().split(/\s+/).filter(Boolean);
            const firstName = parts[0] ?? 'User';
            const lastName = parts.slice(1).join(' ') || 'Account';
            return { firstName, lastName };
          };

          const tryLoginAny = async (payload: AdminLoginPayload) => {
            let lastError: unknown = null;

            for (const login of loginAttempts) {
              try {
                const response = await login(payload);
                const token = extractToken(response);
                const source = login === repowireApi.adminLogin
                  ? '/admin/login'
                  : login === repowireApi.subAdminLogin
                    ? '/subAdmin/login'
                    : '/publicher/login';
                if (token) {
                  return { token, response, source };
                }

                // Some backends authenticate without returning token in this endpoint.
                return { token: null as string | null, response, source };
              } catch (error) {
                lastError = error;
              }
            }

            throw lastError ?? new Error('Authentication failed.');
          };

          const tryRegisterAny = async () => {
            const { firstName, lastName } = splitName(name);
            const signupPayload: SignupPayload = {
              partners_Id: '1',
              email,
              password,
              confirm_password: password,
              firstName,
              lastName,
              name: `${firstName} ${lastName}`,
              companyName: 'Repowire User',
              mobileNumber: '0000000000',
              address: 'N/A',
            };

            const registerAttempts: Array<() => Promise<unknown>> = [
              () => repowireApi.subAdminSignup(signupPayload),
              () => repowireApi.publicherSignup(signupPayload),
            ];

            let lastError: unknown = null;
            for (const register of registerAttempts) {
              try {
                return await register();
              } catch (error) {
                lastError = error;
              }
            }

            throw lastError ?? new Error('Registration failed.');
          };

          setAuthError(null);
          setIsAuthenticating(true);

          try {
            if (mode === 'register') {
              try {
                await tryRegisterAny();
              } catch {
                // If user already exists, continue and try login with provided credentials.
              }
            }

            const { token, source, response } = await tryLoginAny({ email, password });
            const partnersId = extractPartnersId(response);

            if (token) {
              localStorage.setItem('repowire_token', token);
              localStorage.setItem('repowire_auth_source', source);
              localStorage.setItem('repowire_last_auth_mode', mode);
            } else {
              localStorage.removeItem('repowire_token');
              localStorage.setItem('repowire_auth_source', source);
              localStorage.setItem('repowire_last_auth_mode', mode);
            }

            if (partnersId) {
              localStorage.setItem('repowire_partners_id', partnersId);
            }

            setIsAuthenticated(true);
            setActivePage('dashboard');

            if (!token) {
              setAuthError('Logged in, but token is not returned by this account. Save token in Settings for full API access.');
            }
          } catch (error) {
            if (error instanceof ApiError) {
              setAuthError(`${mode === 'register' ? 'Registration' : 'Login'} failed (${error.status}). Check credentials and required fields.`);
            } else if (error instanceof Error) {
              setAuthError(error.message);
            } else {
              setAuthError(`Unable to ${mode === 'register' ? 'register' : 'authenticate'} with Repowire right now.`);
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
          setIsAuthenticated(false);
          setAuthMode('login');
          setAuthError(null);
        }}
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
