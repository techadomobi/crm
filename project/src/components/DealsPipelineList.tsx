import type { DealRecord } from '../types/crm';

interface Props {
  rows: DealRecord[];
}

export default function DealsPipelineList({ rows }: Props) {
  return (
    <ul className="space-y-2 rounded-2xl border border-slate-100 bg-white p-4">
      {rows.map((deal) => (
        <li key={deal.id} className="rounded-xl border border-slate-100 px-3 py-2">
          <div className="text-sm font-semibold text-slate-900">{deal.title}</div>
          <div className="text-xs text-slate-500">Stage: {deal.stage}</div>
          <div className="text-xs text-slate-500">Value: ${deal.value.toLocaleString()}</div>
        </li>
      ))}
    </ul>
  );
}
