import { useState } from 'react';
import { User, Bell, Shield, CreditCard, Users, Globe, Mail, Phone, ChevronRight } from 'lucide-react';

const sections = [
  {
    title: 'Profile',
    icon: <User size={16} />,
    fields: [
      { label: 'Full Name', value: 'Alex Rivera', type: 'text' },
      { label: 'Email Address', value: 'alex@nexuscrm.io', type: 'email' },
      { label: 'Phone', value: '+1 555 0100', type: 'tel' },
      { label: 'Role', value: 'Sales Manager', type: 'text' },
    ],
  },
];

const quickSettings = [
  { icon: <Bell size={16} />, label: 'Notifications', sub: 'Email and push preferences', color: 'bg-amber-50 text-amber-600' },
  { icon: <Shield size={16} />, label: 'Security', sub: 'Password, 2FA, sessions', color: 'bg-emerald-50 text-emerald-600' },
  { icon: <Users size={16} />, label: 'Team Members', sub: '4 active members', color: 'bg-blue-50 text-blue-600' },
  { icon: <CreditCard size={16} />, label: 'Billing', sub: 'Pro plan · $79/mo', color: 'bg-rose-50 text-rose-600' },
  { icon: <Globe size={16} />, label: 'Integrations', sub: 'Connect your tools', color: 'bg-cyan-50 text-cyan-600' },
];

const integrations = [
  { name: 'Slack', status: true, desc: 'Activity notifications' },
  { name: 'Gmail', status: true, desc: 'Email sync & tracking' },
  { name: 'Zoom', status: false, desc: 'Video meetings' },
  { name: 'HubSpot', status: false, desc: 'Contact sync' },
];

export default function Settings() {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <div className="space-y-5 animate-fade-in max-w-4xl">
      {notice && (
        <div className="rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-2.5 text-sm text-cyan-900 flex items-center justify-between">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="text-xs font-semibold text-cyan-700 hover:text-cyan-900">Dismiss</button>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-slate-900 font-semibold text-sm flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><User size={14} /></div>
            Profile Settings
          </h3>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/20">A</div>
            <div>
              <h4 className="text-slate-900 font-semibold">Alex Rivera</h4>
              <p className="text-slate-400 text-sm">Sales Manager · NexusCRM Pro</p>
              <button onClick={() => setNotice('Profile photo change flow opened.')} className="mt-2 text-blue-600 text-xs font-medium hover:text-blue-700 transition-colors">Change photo</button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sections[0].fields.map((f, i) => (
              <div key={i}>
                <label className="text-slate-500 text-xs font-medium block mb-1.5">{f.label}</label>
                <input
                  type={f.type}
                  defaultValue={f.value}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                />
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-end">
            <button onClick={() => setNotice('Profile settings saved successfully.')} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-xl transition-all active:scale-95 shadow-sm">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {quickSettings.map((s, i) => (
          <button key={i} onClick={() => setNotice(`${s.label} settings opened.`)} className="bg-white rounded-2xl p-4 border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all text-left group flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}>
              {s.icon}
            </div>
            <div className="flex-1">
              <p className="text-slate-900 text-sm font-semibold group-hover:text-blue-600 transition-colors">{s.label}</p>
              <p className="text-slate-400 text-xs">{s.sub}</p>
            </div>
            <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-400 transition-colors" />
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-slate-900 font-semibold text-sm flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center"><Globe size={14} /></div>
            Integrations
          </h3>
          <p className="text-slate-400 text-xs mt-0.5">Connect your favorite tools</p>
        </div>
        <div className="divide-y divide-slate-50">
          {integrations.map((int, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm">
                {int.name[0]}
              </div>
              <div className="flex-1">
                <p className="text-slate-900 text-sm font-medium">{int.name}</p>
                <p className="text-slate-400 text-xs">{int.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={int.status} className="sr-only peer" />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 shadow-sm"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-slate-900 font-semibold text-sm flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center"><Bell size={14} /></div>
            Notifications
          </h3>
        </div>
        <div className="divide-y divide-slate-50">
          {[
            { label: 'New deal assigned', sub: 'Get notified when a deal is assigned to you', email: true, push: true },
            { label: 'Activity reminders', sub: 'Reminders for scheduled calls and meetings', email: true, push: false },
            { label: 'Deal stage changes', sub: 'When deals move through the pipeline', email: false, push: true },
            { label: 'Team performance', sub: 'Weekly summary of team metrics', email: true, push: false },
          ].map((n, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex-1">
                <p className="text-slate-900 text-sm font-medium">{n.label}</p>
                <p className="text-slate-400 text-xs">{n.sub}</p>
              </div>
              <div className="flex items-center gap-4 hidden sm:flex">
                <div className="flex items-center gap-1.5">
                  <Mail size={11} className="text-slate-400" />
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={n.email} className="sr-only peer" />
                    <div className="w-8 h-4 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600 shadow-sm"></div>
                  </label>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone size={11} className="text-slate-400" />
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={n.push} className="sr-only peer" />
                    <div className="w-8 h-4 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600 shadow-sm"></div>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-5">
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-slate-900 font-semibold text-sm flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><Shield size={14} /></div>
              Security & Access Log
            </h3>
            <p className="text-slate-400 text-xs mt-0.5">Recent sign-ins and permission-sensitive events</p>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { event: 'New login from Chrome on Windows', when: '2h ago', severity: 'Low' },
              { event: 'API token rotated for workflow automation', when: 'Yesterday', severity: 'Info' },
              { event: 'Failed login attempts exceeded threshold', when: '3 days ago', severity: 'Medium' },
              { event: 'Role updated for Jamie L.', when: '5 days ago', severity: 'Info' },
            ].map((item) => (
              <div key={item.event} className="px-5 py-3.5 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-800">{item.event}</p>
                  <span className={`text-[11px] font-semibold rounded-full px-2 py-0.5 ${
                    item.severity === 'Medium' ? 'bg-amber-50 text-amber-700' : item.severity === 'Low' ? 'bg-slate-100 text-slate-600' : 'bg-blue-50 text-blue-700'
                  }`}>
                    {item.severity}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{item.when}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-slate-900 font-semibold text-sm flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center"><Globe size={14} /></div>
              API Keys & Webhooks
            </h3>
            <p className="text-slate-400 text-xs mt-0.5">Manage integration credentials and callback endpoints</p>
          </div>
          <div className="p-5 space-y-3">
            {[
              { key: 'Public Key', value: 'pk_live_x2f8...k9a1', state: 'Active' },
              { key: 'Secret Key', value: 'sk_live_h7c1...p4m2', state: 'Restricted' },
              { key: 'Postback Webhook', value: 'https://api.nexuscrm.io/postback', state: 'Verified' },
            ].map((row) => (
              <div key={row.key} className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
                <p className="text-xs text-slate-500">{row.key}</p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">{row.value}</p>
                <p className="text-xs text-cyan-700 mt-1">{row.state}</p>
              </div>
            ))}
            <div className="flex items-center gap-2 pt-1">
              <button onClick={() => setNotice('API keys rotated and old keys scheduled for revoke.')} className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors">Rotate Keys</button>
              <button onClick={() => setNotice('Webhook creation form opened.')} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Add Webhook</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
