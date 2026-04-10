import { useState } from 'react';
import { ArrowRight, LockKeyhole, Mail, UserRound, Sparkles, ShieldCheck, BarChart3 } from 'lucide-react';

type AuthMode = 'login' | 'register';

interface AuthPortalProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onAuthenticate: (payload: { mode: AuthMode; email: string; password: string; name?: string }) => Promise<void>;
  authError?: string | null;
  isSubmitting?: boolean;
}

export default function AuthPortal({ mode, onModeChange, onAuthenticate, authError = null, isSubmitting = false }: AuthPortalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const submitLabel = mode === 'login' ? 'Enter CRM Workspace' : 'Create CRM Workspace';

  return (
    <div className="relative min-h-screen overflow-hidden bg-auth-grid px-4 py-8 sm:px-8">
      <div className="pointer-events-none absolute -left-24 -top-20 h-64 w-64 rounded-full bg-cyan-200/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-sky-300/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-teal-200/30 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-3xl border border-cyan-900/10 bg-white/85 shadow-2xl shadow-cyan-900/10 backdrop-blur-xl lg:grid-cols-[1.15fr_1fr]">
        <section className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-cyan-700 via-sky-700 to-cyan-900 p-8 text-white sm:p-10">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 18% 22%, rgba(255,255,255,0.38) 0, transparent 48%), radial-gradient(circle at 82% 10%, rgba(165,243,252,0.3) 0, transparent 42%)' }} />

          <div className="relative space-y-5 animate-fade-in">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide">
              <Sparkles size={14} />
              CRM Intelligence Suite
            </p>

            <div>
              <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
                Build your pipeline command center.
              </h1>
              <p className="mt-3 max-w-md text-sm text-cyan-100 sm:text-base">
                Track campaigns, publishers, advertisers, automations, and invoices with one high-performance CRM workspace.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: <BarChart3 size={16} />, title: 'Live Analytics', text: 'Revenue and cohort reporting in real time' },
                { icon: <ShieldCheck size={16} />, title: 'Secure Access', text: 'Role-aware permissions and audit trails' },
                { icon: <Sparkles size={16} />, title: 'Automation', text: 'Smart workflows for scale and speed' },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
                  <div className="mb-2 inline-flex rounded-lg bg-white/15 p-2">{item.icon}</div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-xs text-cyan-100">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="relative mt-8 text-xs text-cyan-100">Trusted by high-growth teams in affiliate, ecommerce, and mobile acquisition.</p>
        </section>

        <section className="p-7 sm:p-10">
          <div className="mx-auto max-w-md animate-scale-in">
            <div className="mb-7 rounded-2xl border border-cyan-100 bg-cyan-50/70 p-1.5">
              <div className="grid grid-cols-2 gap-1">
                {(['login', 'register'] as const).map((item) => (
                  <button
                    key={item}
                    onClick={() => onModeChange(item)}
                    className={`rounded-xl px-3 py-2 text-sm font-semibold capitalize transition-all ${
                      mode === item
                        ? 'bg-white text-cyan-900 shadow-sm'
                        : 'text-cyan-700 hover:bg-white/60'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <h2 className="font-display text-2xl font-bold text-slate-900">
                {mode === 'login' ? 'Welcome back' : 'Create your account'}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {mode === 'login'
                  ? 'Sign in to continue managing your CRM operations.'
                  : 'Get started in under a minute and launch your CRM workspace.'}
              </p>
            </div>

            <form
              onSubmit={async (event) => {
                event.preventDefault();
                await onAuthenticate({
                  mode,
                  email: email.trim(),
                  password,
                  name: name.trim() || undefined,
                });
              }}
              className="space-y-4"
            >
              {mode === 'register' && (
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Full Name</span>
                  <div className="relative">
                    <UserRound size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                      placeholder="Alex Rivera"
                      className="w-full rounded-xl border border-slate-200 bg-white px-10 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15"
                    />
                  </div>
                </label>
              )}

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Work Email</span>
                <div className="relative">
                  <Mail size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-slate-200 bg-white px-10 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Password</span>
                <div className="relative">
                  <LockKeyhole size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    minLength={6}
                    placeholder="Enter secure password"
                    className="w-full rounded-xl border border-slate-200 bg-white px-10 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15"
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-900/20 transition-all hover:translate-y-[-1px] hover:shadow-cyan-900/30"
              >
                {isSubmitting ? 'Authenticating...' : submitLabel}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>

              {authError && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                  {authError}
                </div>
              )}
            </form>

            <p className="mt-4 text-center text-xs text-slate-500">
              {mode === 'login' ? 'Need an account?' : 'Already have an account?'}
              <button
                type="button"
                onClick={() => onModeChange(mode === 'login' ? 'register' : 'login')}
                className="ml-1 font-semibold text-cyan-700 hover:text-cyan-800"
              >
                {mode === 'login' ? 'Register now' : 'Sign in'}
              </button>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
