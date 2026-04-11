import type { SwaggerOperation } from './offersmetaSwagger';

/** Roles aligned with NexusCRM login (localStorage repowire_user_role). */
export type CatalogRole = 'admin' | 'publisher' | 'advertiser' | 'unknown';

export const normalizeCatalogRole = (raw: string | null | undefined): CatalogRole => {
  const s = (raw ?? '').trim().toLowerCase();
  if (s.includes('admin') || s.includes('manager')) return 'admin';
  if (s.includes('publisher')) return 'publisher';
  if (s.includes('advertiser')) return 'advertiser';
  return 'unknown';
};

/**
 * Sub-admin / network operations on `/publicher/*` (not publisher self-service).
 * Matched case-insensitively on full path.
 */
const PUBLICHER_SUBADMIN_PATHS = new Set(
  [
    '/publicher/addpublicher',
    '/publicher/updatepublisher',
    '/publicher/publisherlist',
    '/publicher/publisherloginbyid',
    '/publicher/totalpublisherclick',
    '/publicher/totalpublisherconverion',
    '/publicher/totalpublisherpayout',
    '/publicher/publisherconversionlist',
    '/publicher/publisherclicklist',
    '/publicher/publisherimpressionlist',
    '/publicher/publisherconversionrate',
    '/publicher/publishertotalimpression',
    '/publicher/publishertotalevent',
    '/publicher/approveofferforpublisher',
    '/publicher/publishereventvaluereport',
    '/publicher/sendoffertopublisher',
    '/publicher/genreatepublisherkey',
    '/publicher/senndlogindetails',
    '/publicher/publisherserchdatabyofferid',
    '/publicher/publishersearchallconversiondata',
    '/publicher/downloaddatainexcelsheetbypublisher',
    '/publicher/downloaddatainexcelsheetbypublisherid',
    '/publicher/downloaddatainexcelsheetbyofferid',
    '/publicher/pubinactive',
    '/publicher/pubactive',
    '/publicher/publicherlist',
  ].map((p) => p.toLowerCase())
);

const pathNorm = (p: string) => p.trim().toLowerCase();

const startsWithAny = (path: string, prefixes: string[]) => prefixes.some((pre) => pathNorm(path).startsWith(pre.toLowerCase()));

/** Publisher-facing prefixes (self-serve + allowed reads). */
const PUBLISHER_PREFIX_ALLOW = [
  '/publicher/',
  '/publisher/',
  '/pub/',
  '/partner/offerwall',
  '/partner/offerwal',
  '/user/countrylist',
  '/offer/offerlist',
  '/offer/viewoffer',
  '/user/addcustompayout',
  '/user/getcustompayout',
  '/user/deletecustompayout',
  '/contactus/',
  '/category/',
  '/offer/publisherofferlist',
  '/offer/publisheroffer', // defensive
  '/tracking/',
  '/impression/imp',
  '/smart_link/',
  '/sentlogs/',
  '/conversion/postback',
  '/conversion/pixel',
  '/conversion/iframe',
  '/report/publisher',
  '/report/publishers',
  '/report/affilitesperformancereport',
  '/top/',
  '/smartoffer/',
  '/publishermanagement/', // publisher postbacks — own config
];

/** Advertiser-facing prefixes. */
const ADVERTISER_PREFIX_ALLOW = [
  '/advertiser/',
  '/wallet/',
  '/offer/offerlist',
  '/offer/viewoffer',
  '/user/countrylist',
  '/user/addcustompayout',
  '/user/getcustompayout',
  '/user/deletecustompayout',
  '/contactus/',
  '/offer/advertiser',
  '/offer/getexternalofferlst',
  '/report/advertiser',
  '/report/advmanage',
  '/eventreport/advertiser',
];

const ADMIN_PREFIX_DENY_FOR_NON_ADMIN = [
  '/admin/',
  '/subadmin/',
  '/manager/',
  '/invoice/',
  '/publisherapproved/',
  '/partner/setclicklimit',
  '/partner/updateclicklimit',
  '/partner/deleteclicklimit',
  '/partner/caplimit',
  '/partner/createvalidation',
  '/partner/updatevalidationreport',
  '/partner/getvalidation',
];

const isSubadminPublicherPath = (path: string) => PUBLICHER_SUBADMIN_PATHS.has(pathNorm(path));

const isPublisherCatalogPath = (path: string) => {
  const n = pathNorm(path);
  if (isSubadminPublicherPath(path)) return false;
  if (n.startsWith('/publicher/')) return true;
  return startsWithAny(path, PUBLISHER_PREFIX_ALLOW);
};

const isAdvertiserCatalogPath = (path: string) => startsWithAny(path, ADVERTISER_PREFIX_ALLOW);

const blockedForNonAdmin = (path: string) => startsWithAny(path, ADMIN_PREFIX_DENY_FOR_NON_ADMIN);

/**
 * When `fullCatalog` is true, returns all operations.
 * Otherwise filters by CRM role so the catalog matches typical API access.
 */
export const filterOperationsForRole = (
  operations: SwaggerOperation[],
  role: CatalogRole,
  fullCatalog: boolean
): SwaggerOperation[] => {
  if (fullCatalog || role === 'admin' || role === 'unknown') {
    return operations;
  }

  if (role === 'publisher') {
    return operations.filter((op) => {
      const p = pathNorm(op.path);
      if (blockedForNonAdmin(op.path)) return false;
      if (p.startsWith('/publicher/') && isSubadminPublicherPath(op.path)) return false;
      return isPublisherCatalogPath(op.path);
    });
  }

  if (role === 'advertiser') {
    return operations.filter((op) => {
      if (blockedForNonAdmin(op.path)) return false;
      return isAdvertiserCatalogPath(op.path);
    });
  }

  return operations;
};

export const catalogRoleLabel: Record<CatalogRole, string> = {
  admin: 'Admin / Sub-admin',
  publisher: 'Publisher',
  advertiser: 'Advertiser',
  unknown: 'Not set',
};
