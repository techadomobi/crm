import { apiExecute, type ApiExecuteResult, type ApiRequestOptions } from '../api/httpClient';
import { applyPathParams, type SwaggerOperation } from '../lib/offersmetaSwagger';

export async function executeApiOperation(path: string, options: ApiRequestOptions): Promise<ApiExecuteResult> {
  return apiExecute(path, options);
}

const buildResolvedPath = (op: SwaggerOperation) => {
  const pathParams: Record<string, string> = {};
  for (const p of op.parameters) {
    if (p.in !== 'path') continue;
    pathParams[p.name] = '1';
  }
  return applyPathParams(op.path, pathParams);
};

const buildSampleQuery = (op: SwaggerOperation): Record<string, string | number | boolean | null | undefined> => {
  const query: Record<string, string | number | boolean | null | undefined> = {};
  const partners = localStorage.getItem('repowire_partners_id')?.trim() ?? '';

  for (const p of op.parameters) {
    if (p.in !== 'query') continue;
    const n = p.name.toLowerCase();

    if (n === 'partners_id' || n === 'partnersid') {
      if (partners) query[p.name] = partners;
      continue;
    }

    if (!p.required && n !== 'page' && n !== 'limit') continue;

    if (p.type === 'boolean') query[p.name] = false;
    else if (p.type === 'integer' || p.type === 'number') query[p.name] = n === 'limit' ? 5 : 1;
    else if (n.includes('startdate')) query[p.name] = '2026-01-01';
    else if (n.includes('enddate')) query[p.name] = '2026-01-31';
    else query[p.name] = '1';
  }

  return query;
};

export async function runQuickGetCheck(op: SwaggerOperation): Promise<number> {
  if (op.method !== 'GET') {
    throw new Error('Quick check supports GET only. Use API Studio for write endpoints.');
  }

  const path = buildResolvedPath(op);
  const result = await executeApiOperation(path, {
    method: 'GET',
    query: buildSampleQuery(op),
  });

  return result.status;
}
