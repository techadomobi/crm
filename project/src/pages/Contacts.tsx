import { useState } from 'react';
import { Search, Filter, Plus, Phone, Mail, MoreHorizontal, ChevronUp, ChevronDown } from 'lucide-react';
import { contacts } from '../data/mockData';

const statusStyles = {
  active: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  inactive: 'bg-slate-100 text-slate-500 border border-slate-200',
  prospect: 'bg-blue-50 text-blue-700 border border-blue-200',
};

export default function Contacts() {
  const [contactList, setContactList] = useState(contacts);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'prospect'>('all');
  const [sortField, setSortField] = useState<'name' | 'value' | 'lastContact'>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [notice, setNotice] = useState<string | null>(null);

  const pageSize = 6;

  const filtered = contactList
    .filter(c => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.company.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === 'all' || c.status === filter;
      return matchSearch && matchFilter;
    })
    .sort((a, b) => {
      let valA: string | number = a[sortField];
      let valB: string | number = b[sortField];
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const pagedContacts = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const totalValue = contactList.reduce((sum, contact) => sum + contact.value, 0);
  const segmentStats = [
    {
      segment: 'Enterprise',
      count: contactList.filter((contact) => contact.tags.includes('enterprise')).length,
      value: contactList.filter((contact) => contact.tags.includes('enterprise')).reduce((sum, contact) => sum + contact.value, 0),
    },
    {
      segment: 'SMB / Startup',
      count: contactList.filter((contact) => contact.tags.includes('smb') || contact.tags.includes('startup')).length,
      value: contactList.filter((contact) => contact.tags.includes('smb') || contact.tags.includes('startup')).reduce((sum, contact) => sum + contact.value, 0),
    },
    {
      segment: 'Renewal',
      count: contactList.filter((contact) => contact.tags.includes('renewal')).length,
      value: contactList.filter((contact) => contact.tags.includes('renewal')).reduce((sum, contact) => sum + contact.value, 0),
    },
  ];

  const highValueContacts = [...contactList]
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const SortIcon = ({ field }: { field: typeof sortField }) => (
    <span className="ml-1 inline-flex flex-col">
      <ChevronUp size={9} className={sortField === field && sortDir === 'asc' ? 'text-blue-500' : 'text-slate-300'} />
      <ChevronDown size={9} className={sortField === field && sortDir === 'desc' ? 'text-blue-500' : 'text-slate-300'} />
    </span>
  );

  return (
    <div className="space-y-5 animate-fade-in">
      {notice && (
        <div className="rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-2.5 text-sm text-cyan-900 flex items-center justify-between">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="text-xs font-semibold text-cyan-700 hover:text-cyan-900">Dismiss</button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Contacts', value: contactList.length, color: 'text-slate-900' },
          { label: 'Active', value: contactList.filter(c => c.status === 'active').length, color: 'text-emerald-600' },
          { label: 'Prospects', value: contactList.filter(c => c.status === 'prospect').length, color: 'text-blue-600' },
          { label: 'Inactive', value: contactList.filter(c => c.status === 'inactive').length, color: 'text-slate-400' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 hover:shadow-md transition-all">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-slate-500 text-sm mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all">
        <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-slate-100">
          <div className="relative flex-1 min-w-48">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search contacts..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            {(['all', 'active', 'prospect', 'inactive'] as const).map(f => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  filter === f ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              const now = new Date();
              const month = String(now.getMonth() + 1).padStart(2, '0');
              const day = String(now.getDate()).padStart(2, '0');
              setContactList((current) => [
                {
                  id: `new-${Date.now()}`,
                  name: 'New Prospect',
                  email: 'new.prospect@example.com',
                  phone: '+1 555 0199',
                  company: 'New Company',
                  status: 'prospect',
                  value: 15000,
                  lastContact: `${now.getFullYear()}-${month}-${day}`,
                  avatar: 'NP',
                  tags: ['new'],
                },
                ...current,
              ]);
              setNotice('Added a new contact to the top of the list.');
              setCurrentPage(1);
            }}
            className="ml-auto flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-2 rounded-xl transition-all active:scale-95 shadow-sm"
          >
            <Plus size={14} /> Add Contact
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <button onClick={() => toggleSort('name')} className="flex items-center hover:text-slate-700">
                    Contact <SortIcon field="name" />
                  </button>
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Tags</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <button onClick={() => toggleSort('value')} className="flex items-center ml-auto hover:text-slate-700">
                    Value <SortIcon field="value" />
                  </button>
                </th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                  <button onClick={() => toggleSort('lastContact')} className="flex items-center ml-auto hover:text-slate-700">
                    Last Contact <SortIcon field="lastContact" />
                  </button>
                </th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {pagedContacts.map((contact, idx) => (
                <tr
                  key={contact.id}
                  className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm">
                        {contact.avatar}
                      </div>
                      <div>
                        <p className="text-slate-900 text-sm font-semibold group-hover:text-blue-600 transition-colors">{contact.name}</p>
                        <p className="text-slate-400 text-xs">{contact.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-slate-700 text-sm font-medium">{contact.company}</p>
                    <p className="text-slate-400 text-xs">{contact.phone}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusStyles[contact.status]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        contact.status === 'active' ? 'bg-emerald-500' :
                        contact.status === 'prospect' ? 'bg-blue-500' : 'bg-slate-400'
                      }`}></span>
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="text-slate-900 font-semibold text-sm">${contact.value.toLocaleString()}</span>
                  </td>
                  <td className="px-5 py-3.5 text-right hidden lg:table-cell text-slate-400 text-sm">{contact.lastContact}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setNotice(`Calling ${contact.name}...`)} className="p-1.5 rounded-lg hover:bg-blue-100 text-slate-400 hover:text-blue-600 transition-colors">
                        <Phone size={13} />
                      </button>
                      <button onClick={() => setNotice(`Email draft opened for ${contact.name}.`)} className="p-1.5 rounded-lg hover:bg-blue-100 text-slate-400 hover:text-blue-600 transition-colors">
                        <Mail size={13} />
                      </button>
                      <button onClick={() => setNotice(`More actions for ${contact.name} coming soon.`)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreHorizontal size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100 bg-slate-50">
          <p className="text-slate-500 text-xs">
            {filtered.length === 0
              ? `Showing 0 of 0 filtered contacts (${contactList.length} total)`
              : `Showing ${(safePage - 1) * pageSize + 1} - ${Math.min(safePage * pageSize, filtered.length)} of ${filtered.length} filtered contacts (${contactList.length} total)`}
          </p>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${page === safePage ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-200'}`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-5">
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-slate-900 font-semibold text-sm">Segment Intelligence</h3>
            <p className="text-slate-400 text-xs">Value concentration and growth mix by account segment</p>
          </div>
          <div className="divide-y divide-slate-50">
            {segmentStats.map((segment) => (
              <div key={segment.segment} className="px-5 py-4 flex items-center gap-3 hover:bg-slate-50 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 font-bold text-sm flex items-center justify-center">
                  {segment.segment[0]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">{segment.segment}</p>
                  <p className="text-xs text-slate-400">{segment.count} contacts · {Math.round((segment.value / totalValue) * 100)}% of value pool</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">${segment.value.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-slate-900 font-semibold text-sm">High-Value Follow-Up Queue</h3>
            <p className="text-slate-400 text-xs">Priority contacts by account value and recency</p>
          </div>
          <div className="divide-y divide-slate-50">
            {highValueContacts.map((contact) => (
              <div key={contact.id} className="px-5 py-3.5 flex items-center gap-3 hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white text-xs font-bold flex items-center justify-center">
                  {contact.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{contact.name}</p>
                  <p className="text-xs text-slate-400 truncate">{contact.company} · Last contact {contact.lastContact}</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">${(contact.value / 1000).toFixed(0)}k</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
