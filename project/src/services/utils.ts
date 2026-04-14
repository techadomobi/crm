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

  if (!value || typeof value !== 'object') {
    return [];
  }

  const obj = value as Record<string, unknown>;

  // Handle common API envelope keys first, and recurse if the value is nested.
  const keys = ['data', 'result', 'rows', 'items', 'list', 'records', 'docs', 'payload'];
  for (const key of keys) {
    const row = obj[key];
    if (Array.isArray(row)) {
      return row as T[];
    }
    if (row && typeof row === 'object') {
      const nested = asArray<T>(row);
      if (nested.length > 0) {
        return nested;
      }
    }
  }

  // Some endpoints wrap arrays in a single top-level key with arbitrary naming.
  const entries = Object.values(obj);
  if (entries.length === 1 && entries[0] && typeof entries[0] === 'object') {
    return asArray<T>(entries[0]);
  }

  return [];
};
