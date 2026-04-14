import { useEffect, useMemo, useState } from 'react';
import { Shield, User, Mail, Link2, KeyRound, Loader2, RefreshCw } from 'lucide-react';
import { repowireApi, type AuthAccountType } from '../api/repowireApi';

type ProfileEntry = { label: string; value: string };

const accountTypeFromRole = (role: string): AuthAccountType => {
  const normalized = role.trim().toLowerCase();
  if (normalized.includes('advertiser')) return 'advertiser';
  if (normalized.includes('publisher')) return 'publisher';
  return 'admin';
};

const stringifyValue = (value: unknown): string => {
  if (value === null || value === undefined) return 'N/A';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) return value.map(stringifyValue).join(', ');
  if (typeof value === 'object') return JSON.stringify(value, null, 2);
  return String(value);
};

const collectEntries = (input: unknown, depth = 0): ProfileEntry[] => {
  if (!input || typeof input !== 'object' || Array.isArray(input) || depth > 2) return [];

  const record = input as Record<string, unknown>;
  return Object.entries(record)
    .filter(([, value]) => value !== undefined && value !== null && typeof value !== 'function')
    .flatMap(([key, value]) => {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        const nested = collectEntries(value, depth + 1);
        if (nested.length > 0) {
          return nested.map((entry) => ({ label: `${key}.${entry.label}`, value: entry.value }));
        }
      }

      return [{ label: key, value: stringifyValue(value) }];
    })
    .slice(0, 24);
};

interface ProfileProps {
  displayName: string;
  displayEmail: string;
  displayRole: string;
}

export default function Profile({ displayName, displayEmail, displayRole }: ProfileProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<unknown>(null);

  const accountType = useMemo(() => accountTypeFromRole(displayRole), [displayRole]);
  const authSource = localStorage.getItem('repowire_auth_source') || undefined;
  const tokenPreview = localStorage.getItem('repowire_token')?.trim() || '';
  const partnersId = localStorage.getItem('repowire_partners_id')?.trim() || 'N/A';

  const loadProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const profile = await repowireApi.fetchAccountProfile(accountType, authSource);
      setProfileData(profile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load account profile.');
      setProfileData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProfile();
  }, [accountType, authSource]);

  const profileEntries = useMemo(() => collectEntries(profileData), [profileData]);

  return (
    <div className="space-y-6 animate-fade-in">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
              <User size={14} />
              Profile route
            </div>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900">Account profile</h1>
            <p className="mt-1 text-sm text-slate-500">Live account details for the authenticated session.</p>
          </div>
          <button
            type="button"
            onClick={() => void loadProfile()}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800 disabled:opacity-60"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
            Refresh profile
          </button>
        </div>
      </section>

      {error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Name', value: displayName || displayEmail.split('@')[0] || 'Account', icon: <User size={18} /> },
          { label: 'Email', value: displayEmail || 'N/A', icon: <Mail size={18} /> },
          { label: 'Role', value: displayRole || 'User', icon: <Shield size={18} /> },
          { label: 'Partners ID', value: partnersId, icon: <Link2 size={18} /> },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">{item.icon}</div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{item.label}</p>
            <p className="mt-2 break-words text-lg font-semibold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-1">
          <h2 className="text-sm font-semibold text-slate-900">Session details</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
              <KeyRound size={16} className="mt-0.5 text-slate-500" />
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Auth source</p>
                <p className="font-medium text-slate-800">{authSource || 'unknown'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
              <Mail size={16} className="mt-0.5 text-slate-500" />
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Token preview</p>
                <p className="break-all font-medium text-slate-800">{tokenPreview ? `${tokenPreview.slice(0, 12)}...${tokenPreview.slice(-8)}` : 'missing'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <h2 className="text-sm font-semibold text-slate-900">Live profile payload</h2>
          {loading ? (
            <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">Loading live profile data...</div>
          ) : profileEntries.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {profileEntries.map((entry) => (
                <div key={entry.label} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{entry.label}</p>
                  <p className="mt-1 whitespace-pre-wrap break-words text-sm font-medium text-slate-800">{entry.value}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">No profile payload returned yet.</div>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Raw JSON</h2>
        <pre className="mt-4 max-h-[420px] overflow-auto rounded-xl bg-slate-950 p-4 text-[11px] leading-relaxed text-cyan-100">
{JSON.stringify(profileData ?? { message: 'No profile data loaded yet.' }, null, 2)}
        </pre>
      </section>
    </div>
  );
}