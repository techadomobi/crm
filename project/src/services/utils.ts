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

  const keys = ['data', 'result', 'rows', 'items', 'list', 'records', 'docs', 'payload'];
  const queue: Array<{ node: unknown; depth: number }> = [{ node: value, depth: 0 }];
  const visited = new Set<unknown>();
  let firstEmptyArray: T[] | null = null;

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) continue;
    if (current.depth > 6) continue;
    if (visited.has(current.node)) continue;
    visited.add(current.node);

    if (Array.isArray(current.node)) {
      if (current.node.length > 0) return current.node as T[];
      if (!firstEmptyArray) firstEmptyArray = current.node as T[];
      continue;
    }

    if (!current.node || typeof current.node !== 'object') continue;
    const obj = current.node as Record<string, unknown>;

    for (const key of keys) {
      const nested = obj[key];
      if (Array.isArray(nested)) {
        if (nested.length > 0) return nested as T[];
        if (!firstEmptyArray) firstEmptyArray = nested as T[];
      } else if (nested && typeof nested === 'object') {
        queue.push({ node: nested, depth: current.depth + 1 });
      }
    }

    for (const nested of Object.values(obj)) {
      if (Array.isArray(nested)) {
        if (nested.length > 0) return nested as T[];
        if (!firstEmptyArray) firstEmptyArray = nested as T[];
      } else if (nested && typeof nested === 'object') {
        queue.push({ node: nested, depth: current.depth + 1 });
      }
    }
  }

  return firstEmptyArray ?? [];
};
