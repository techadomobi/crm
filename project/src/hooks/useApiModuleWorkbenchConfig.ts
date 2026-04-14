import { useMemo } from 'react';
import { NavPage } from '../types';

type ModuleUi = {
  title: string;
  subtitle: string;
  search: string;
  capabilities: string[];
};

const moduleMap: Partial<Record<NavPage, ModuleUi>> = {
  campaigns: {
    title: 'Campaign API Workbench',
    subtitle: 'Offer lifecycle operations, catalog browsing, and campaign analytics.',
    search: '/offer/',
    capabilities: ['Campaign list and discovery', 'Offer lifecycle management', 'Campaign detail and reporting'],
  },
  advertisers: {
    title: 'Advertisers Workspace',
    subtitle: 'Advertiser profiles, manager links, and performance controls.',
    search: '/advertiser/',
    capabilities: ['Advertiser directory operations', 'Advertiser report visibility', 'Advertiser health and top performance checks'],
  },
  publishersManage: {
    title: 'Managers Workspace',
    subtitle: 'Manager-focused operational tools and role-scoped reporting.',
    search: '/manager/',
    capabilities: ['Manager assignment and visibility', 'Manager-level conversion and click reporting', 'Manager export and monitoring flows'],
  },
  integration: {
    title: 'Integrations Workspace',
    subtitle: 'Connectivity, external ingestion, and tracking validation tooling.',
    search: '/offer/getExternalOfferLst',
    capabilities: ['External offer ingestion', 'Tracking validation workflows', 'Integration diagnostics and connectivity checks'],
  },
};

const fallbackUi: ModuleUi = {
  title: 'API Module Workbench',
  subtitle: 'Live API controls for the selected module.',
  search: '',
  capabilities: ['Catalog browsing', 'Role-scoped endpoint access', 'Live API execution via API Studio'],
};

export function useApiModuleWorkbenchConfig(activePage: NavPage) {
  return useMemo(() => moduleMap[activePage] ?? fallbackUi, [activePage]);
}
