/** Pull a tabular slice from typical OffersMeta list payloads for the API Studio table view. */
export function extractTabularData(data: unknown): { columns: string[]; rows: Record<string, unknown>[] } | null {
  const asRows = (arr: unknown[]): Record<string, unknown>[] | null => {
    const objects = arr.filter((r): r is Record<string, unknown> => r !== null && typeof r === 'object' && !Array.isArray(r));
    if (objects.length === 0) return null;
    const columns = Object.keys(objects[0]);
    if (columns.length === 0) return null;
    const maxCols = 14;
    const maxRows = 150;
    const trimmedCols = columns.slice(0, maxCols);
    const rows = objects.slice(0, maxRows).map((row) => {
      const next: Record<string, unknown> = {};
      for (const c of trimmedCols) next[c] = row[c];
      return next;
    });
    return { columns: trimmedCols, rows };
  };

  if (Array.isArray(data)) return asRows(data);

  if (data && typeof data === 'object' && !Array.isArray(data)) {
    const o = data as Record<string, unknown>;
    for (const key of ['data', 'list', 'rows', 'records', 'items', 'result', 'docs']) {
      const v = o[key];
      if (Array.isArray(v)) {
        const t = asRows(v);
        if (t) return t;
      }
    }
  }

  return null;
}
