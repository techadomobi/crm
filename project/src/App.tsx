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

export default function App() {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const isPublicApiDocsRoute = normalizedPath === '/api/docs';
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activePage, setActivePage] = useState<NavPage>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
        onAuthenticate={() => {
          setIsAuthenticated(true);
          setActivePage('dashboard');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-app-shell">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(c => !c)}
      />
      <Header
        activePage={activePage}
        sidebarCollapsed={sidebarCollapsed}
        onSignOut={() => {
          setIsAuthenticated(false);
          setAuthMode('login');
        }}
      />
      <main
        className={`transition-all duration-300 pt-20 min-h-screen ${
          sidebarCollapsed ? 'pl-16' : 'pl-60'
        }`}
      >
        <div className="p-6 max-w-[1600px]">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
