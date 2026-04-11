import type { ContactRecord } from '../types/crm';

interface Props {
  rows: ContactRecord[];
}

export default function ContactsTable({ rows }: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white p-4">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500">
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Company</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-slate-50">
              <td className="py-2">{row.name}</td>
              <td className="py-2">{row.email || 'N/A'}</td>
              <td className="py-2">{row.companyName}</td>
              <td className="py-2">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
