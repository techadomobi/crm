import type { RequestMethod } from '../api/httpClient';

export type SwaggerHttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export interface SwaggerParameter {
  name: string;
  in: 'query' | 'formData' | 'header' | 'path' | 'body';
  required?: boolean;
  type?: string;
  description?: string;
}

export interface SwaggerOperation {
  method: RequestMethod;
  path: string;
  tags: string[];
  parameters: SwaggerParameter[];
  secured: boolean;
  summary?: string;
  description?: string;
}

export interface OffersmetaSwaggerSpec {
  swagger?: string;
  info?: { title?: string; version?: string; description?: string };
  host?: string;
  basePath?: string;
  paths?: Record<string, Record<string, unknown>>;
  security?: Array<Record<string, unknown>>;
}

const HTTP_METHODS: SwaggerHttpMethod[] = ['get', 'post', 'put', 'delete', 'patch'];

const asRequestMethod = (m: SwaggerHttpMethod): RequestMethod => {
  const upper = m.toUpperCase();
  if (upper === 'PATCH') return 'PATCH';
  if (upper === 'DELETE') return 'DELETE';
  if (upper === 'PUT') return 'PUT';
  if (upper === 'POST') return 'POST';
  return 'GET';
};

const inferSecured = (
  operationSecurity: unknown,
  specSecurity: unknown
): boolean => {
  if (Array.isArray(operationSecurity)) {
    if (operationSecurity.length === 0) return false;
    return true;
  }
  return Array.isArray(specSecurity) && specSecurity.length > 0;
};

export const flattenSwaggerOperations = (spec: OffersmetaSwaggerSpec): SwaggerOperation[] => {
  const paths = spec.paths ?? {};
  const specSecurity = spec.security;
  const out: SwaggerOperation[] = [];

  for (const [pathKey, pathItem] of Object.entries(paths)) {
    for (const method of HTTP_METHODS) {
      const op = pathItem[method] as Record<string, unknown> | undefined;
      if (!op || typeof op !== 'object') continue;

      const parameters = (Array.isArray(op.parameters) ? op.parameters : []) as SwaggerParameter[];
      const secured = inferSecured(op.security, specSecurity);

      out.push({
        method: asRequestMethod(method),
        path: pathKey,
        tags: Array.isArray(op.tags) ? (op.tags as string[]) : ['untagged'],
        parameters,
        secured,
        summary: typeof op.summary === 'string' ? op.summary : undefined,
        description: typeof op.description === 'string' ? op.description : undefined,
      });
    }
  }

  out.sort((a, b) => {
    const tagA = a.tags[0] ?? '';
    const tagB = b.tags[0] ?? '';
    if (tagA !== tagB) return tagA.localeCompare(tagB);
    if (a.path !== b.path) return a.path.localeCompare(b.path);
    return a.method.localeCompare(b.method);
  });

  return out;
};

export const applyPathParams = (path: string, values: Record<string, string>): string => {
  let result = path;
  for (const [key, value] of Object.entries(values)) {
    if (!value) continue;
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), encodeURIComponent(value));
  }
  return result;
};

const AUTH_SKIP_PATHS = new Set([
  '/admin/login',
  '/admin/forgotPassword',
  '/admin/resendOtp',
  '/admin/resetPassword',
  '/subAdmin/login',
  '/subAdmin/signup',
  '/subAdmin/verifyOtp',
  '/subAdmin/resendOtp',
  '/subAdmin/forgotPassword',
  '/subAdmin/resetPassword',
  '/subAdmin/singleLogin',
  '/publicher/login',
  '/publicher/signup',
  '/publicher/verifyOtp',
  '/publicher/resendOtp',
  '/publicher/forgotPassword',
  '/publicher/resetPassword',
  '/advertiser/login',
  '/advertiser/advertiserSignup',
  '/manager/login',
  '/contactUs/contact',
]);

export const defaultSkipAuthForPath = (path: string): boolean => AUTH_SKIP_PATHS.has(path);
