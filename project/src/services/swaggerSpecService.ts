import { API_BASE_URL } from '../api/httpClient';
import type { OffersmetaSwaggerSpec } from '../lib/offersmetaSwagger';

type Attempt = {
  url: string;
  reason: string;
};

export class SwaggerSpecLoadError extends Error {
  attempts: Attempt[];

  constructor(message: string, attempts: Attempt[]) {
    super(message);
    this.name = 'SwaggerSpecLoadError';
    this.attempts = attempts;
  }
}

export type SwaggerSpecLoadResult = {
  spec: OffersmetaSwaggerSpec;
  sourceUrl: string;
  attempts: Attempt[];
};

const FALLBACK_SWAGGER_URL = 'https://apiv2.offersmeta.in/swagger.json';

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

const joinSwaggerPath = (base: string) => `${trimTrailingSlash(base)}/swagger.json`;

const getWindowOrigin = () => {
  if (typeof window === 'undefined') return '';
  return window.location.origin;
};

const buildCandidates = () => {
  const origin = getWindowOrigin();
  const configured = (import.meta.env.VITE_SWAGGER_URL ?? '').trim();

  const candidates = [
    configured,
    joinSwaggerPath(API_BASE_URL),
    origin ? `${origin}/api/proxy/swagger.json` : '',
    origin ? `${origin}/swagger.json` : '',
    FALLBACK_SWAGGER_URL,
  ].filter(Boolean);

  return Array.from(new Set(candidates));
};

const isValidSwaggerSpec = (value: unknown): value is OffersmetaSwaggerSpec => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const maybe = value as Record<string, unknown>;
  return !!maybe.paths && typeof maybe.paths === 'object' && !Array.isArray(maybe.paths);
};

export async function loadSwaggerSpec(): Promise<SwaggerSpecLoadResult> {
  const candidates = buildCandidates();
  const attempts: Attempt[] = [];

  for (const url of candidates) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) {
        attempts.push({ url, reason: `HTTP ${res.status}` });
        continue;
      }

      const parsed: unknown = await res.json();
      if (!isValidSwaggerSpec(parsed)) {
        attempts.push({ url, reason: 'Invalid swagger payload: missing paths' });
        continue;
      }

      return {
        spec: parsed,
        sourceUrl: url,
        attempts,
      };
    } catch (error) {
      attempts.push({
        url,
        reason: error instanceof Error ? error.message : 'Network error',
      });
    }
  }

  throw new SwaggerSpecLoadError('Failed to load swagger.json from all configured sources.', attempts);
}
