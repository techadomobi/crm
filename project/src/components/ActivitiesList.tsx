import type { ActivityRecord } from '../types/crm';

interface Props {
  rows: ActivityRecord[];
}

export default function ActivitiesList({ rows }: Props) {
  return (
    <ul className="space-y-2 rounded-2xl border border-slate-100 bg-white p-4">
      {rows.map((activity) => (
        <li key={activity.id} className="rounded-xl border border-slate-100 px-3 py-2">
          <div className="text-sm font-semibold text-slate-900">{activity.title}</div>
          <div className="text-xs text-slate-500">Type: {activity.type}</div>
          <div className="text-xs text-slate-500">Status: {activity.status}</div>
        </li>
      ))}
    </ul>
  );
}
