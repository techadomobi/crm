import type { ApiEnvelope } from '../types/api';

export const unwrap = <T>(payload: ApiEnvelope<T>): T => payload.data;

export const toNumber = (value: unknown): number => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[^\d.-]/g, ''));
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }
  return 0;
};

export const asArray = <T>(value: unknown): T[] => {
  if (Array.isArray(value)) {
    return value as T[];
  }

  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    const keys = ['data', 'result', 'rows', 'items', 'list', 'records', 'docs'];
    for (const key of keys) {
      const row = obj[key];
      if (Array.isArray(row)) {
        return row as T[];
      }
    }
  }

  return [];
};
