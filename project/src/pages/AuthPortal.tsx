import { useState } from 'react';
import { ArrowRight, LockKeyhole, Mail, UserRound, Sparkles, ShieldCheck, BarChart3, Eye, EyeOff, AlertCircle } from 'lucide-react';

type AuthMode = 'login' | 'register';
type AccountType = 'admin' | 'advertiser' | 'publisher';

interface AuthPortalProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onAuthenticate: (payload: { mode: AuthMode; accountType: AccountType; partnersId: string; email: string; password: string; name?: string }) => Promise<void>;
  authError?: string | null;
  isSubmitting?: boolean;
}

export default function AuthPortal({ mode, onModeChange, onAuthenticate, authError = null, isSubmitting = false }: AuthPortalProps) {
  const [accountType, setAccountType] = useState<AccountType>('admin');
  const [partnersId, setPartnersId] = useState(localStorage.getItem('repowire_partners_id') ?? '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const submitLabel = mode === 'login' ? 'Enter CRM Workspace' : 'Create CRM Workspace';
  
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: '', color: '' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    
    if (score === 0) return { score: 0, label: 'Very weak', color: 'text-rose-600' };
    if (score === 1) return { score: 1, label: 'Weak', color: 'text-orange-600' };
    if (score === 2) return { score: 2, label: 'Fair', color: 'text-amber-600' };
    if (score === 3) return { score: 3, label: 'Good', color: 'text-yellow-600' };
    return { score: 4, label: 'Strong', color: 'text-emerald-600' };
  };

  const accountTypeDescriptions: Record<AccountType, string> = {
    admin: 'Full system access (includes SubAdmin accounts)',
    advertiser: 'Campaign creation, offer management, tracking',
    publisher: 'Traffic sourcing, conversion tracking, payouts',
  };

  const passwordStrength = getPasswordStrength(password);

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
                const errors: Record<string, string> = {};
                
                if (!email.trim()) errors.email = 'Email is required';
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email format';
                
                if (!password) errors.password = 'Password is required';
                else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
                
                if (mode === 'register' && !name.trim()) errors.name = 'Full name is required';

                if (Object.keys(errors).length > 0) {
                  setValidationErrors(errors);
                  return;
                }
                
                setValidationErrors({});
                await onAuthenticate({
                  mode,
                  accountType,
                  partnersId: partnersId.trim(),
                  email: email.trim(),
                  password,
                  name: name.trim() || undefined,
                });
              }}
              className="space-y-5"
            >
              <div>
                <label className="mb-2 block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-700">Account Type</span>
                  <p className="mt-0.5 text-xs text-slate-500">{accountTypeDescriptions[accountType]}</p>
                </label>
                <select
                  value={accountType}
                  onChange={(event) => setAccountType(event.target.value as AccountType)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                >
                  <option value="admin">👑 Admin - Full System Access (SubAdmin/Admin)</option>
                  <option value="advertiser">📢 Advertiser - Campaign Management</option>
                  <option value="publisher">📊 Publisher - Traffic & Payouts</option>
                </select>
              </div>

              <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                <p className="text-xs font-semibold text-blue-900">🔑 Account Type Mapping</p>
                <ul className="mt-2 text-xs text-blue-700 space-y-1 ml-4 list-disc">
                  <li><strong>SubAdmin credentials?</strong> → Select <strong>Admin</strong></li>
                  <li><strong>Admin credentials?</strong> → Select <strong>Admin</strong></li>
                  <li><strong>Advertiser credentials?</strong> → Select <strong>Advertiser</strong></li>
                  <li><strong>Publisher credentials?</strong> → Select <strong>Publisher</strong></li>
                </ul>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold text-slate-700">💡 Demo Credentials (Testing)</p>
                <p className="mt-2 text-xs text-slate-600 space-y-1">
                  <span className="block">Email: <code className="font-mono text-cyan-700">test@example.com</code></span>
                  <span className="block">Password: <code className="font-mono text-cyan-700">Test@123</code></span>
                </p>
              </div>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-700">
                  Partner ID <span className="text-slate-400 font-normal">(optional)</span>
                </span>
                <p className="mb-2 text-xs text-slate-500">
                  Only needed for SubAdmin single login or partner-scoped endpoints. Standard login uses email and password.
                </p>
                <div className="relative">
                  <UserRound size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={partnersId}
                    onChange={(event) => setPartnersId(event.target.value)}
                    placeholder="Enter Partner ID if your account uses one"
                    className={`w-full rounded-xl border px-10 py-2.5 text-sm outline-none transition-all focus:ring-2 ${
                      validationErrors.partnersId
                        ? 'border-rose-300 bg-rose-50 text-slate-700 focus:border-rose-500 focus:ring-rose-500/20'
                        : 'border-slate-200 bg-white text-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20'
                    }`}
                  />
                </div>
                {validationErrors.partnersId && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-rose-600">
                    <AlertCircle size={14} /> {validationErrors.partnersId}
                  </p>
                )}
              </label>

              {mode === 'register' && (
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-700">Full Name</span>
                  <div className="relative">
                    <UserRound size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Enter your full name"
                      className={`w-full rounded-xl border px-10 py-2.5 text-sm outline-none transition-all focus:ring-2 ${
                        validationErrors.name
                          ? 'border-rose-300 bg-rose-50 text-slate-700 focus:border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-200 bg-white text-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20'
                      }`}
                    />
                  </div>
                  {validationErrors.name && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-rose-600">
                      <AlertCircle size={14} /> {validationErrors.name}
                    </p>
                  )}
                </label>
              )}

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-700">Work Email</span>
                <div className="relative">
                  <Mail size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@company.com"
                    className={`w-full rounded-xl border px-10 py-2.5 text-sm outline-none transition-all focus:ring-2 ${
                      validationErrors.email
                        ? 'border-rose-300 bg-rose-50 text-slate-700 focus:border-rose-500 focus:ring-rose-500/20'
                        : 'border-slate-200 bg-white text-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20'
                    }`}
                  />
                </div>
                {validationErrors.email && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-rose-600">
                    <AlertCircle size={14} /> {validationErrors.email}
                  </p>
                )}
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-700">
                  Password
                  {mode === 'register' && <span className="ml-1 text-rose-600">*</span>}
                </span>
                <div className="relative">
                  <LockKeyhole size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter secure password"
                    className={`w-full rounded-xl border px-10 py-2.5 pr-10 text-sm outline-none transition-all focus:ring-2 ${
                      validationErrors.password
                        ? 'border-rose-300 bg-rose-50 text-slate-700 focus:border-rose-500 focus:ring-rose-500/20'
                        : 'border-slate-200 bg-white text-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-rose-600">
                    <AlertCircle size={14} /> {validationErrors.password}
                  </p>
                )}
                {mode === 'register' && password && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1 flex-1">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full ${
                            i < passwordStrength.score
                              ? passwordStrength.color.replace('text', 'bg')
                              : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className={`text-xs font-semibold ${passwordStrength.color}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                )}
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-900/20 transition-all hover:translate-y-[-1px] hover:shadow-cyan-900/30 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    {submitLabel}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              {authError && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">
                  <p className="font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle size={14} />
                    Authentication Failed
                  </p>
                  <div className="text-rose-600 space-y-1 ml-6">
                    <p>{authError}</p>
                    {authError.includes('email') && <p className="text-xs">→ Verify email is correct and registered</p>}
                    {authError.includes('password') && <p className="text-xs">→ Password is case-sensitive</p>}
                    {authError.includes('already registered') && <p className="text-xs">→ Try logging in with this email instead</p>}
                    {authError.includes('domain') && <p className="text-xs">→ Check whether this account needs a Partner ID</p>}
                  </div>
                </div>
              )}

              <div className="rounded-lg border border-blue-100 bg-blue-50 p-3 text-xs text-blue-700">
                <p className="font-semibold mb-1">✨ Pro Tips:</p>
                <ul className="space-y-0.5 ml-4 list-disc">
                  <li>Choose your role carefully - it determines API access level</li>
                  <li>Use Partner ID only when your account or endpoint requires it</li>
                  <li>All CRM modules activate after successful login</li>
                  <li>Check API Docs page to test individual endpoints</li>
                </ul>
              </div>
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
