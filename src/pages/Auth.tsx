import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button, Input } from '../components/UI';
import { CreditCard, Eye, EyeOff } from 'lucide-react';
import { validateEmail } from '../utils/helpers';

export function Login() {
  const { login, pushToast } = useApp();
  const nav = useNavigate();
  const loc = useLocation();
  const [email, setEmail] = useState('alex@payg.lcu');
  const [password, setPassword] = useState('demo1234');
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!validateEmail(email)) errs.email = 'Enter a valid email.';
    if (password.length < 6) errs.password = 'Password must be at least 6 characters.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const r = login(email, password);
    if (!r.ok) { setErrors({ email: r.message! }); return; }
    pushToast('success', 'Welcome back!');
    const to = (loc.state as any)?.from?.pathname || '/dashboard';
    nav(to, { replace: true });
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to manage your bills and payments.">
      <form onSubmit={submit} className="space-y-4">
        <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} error={errors.email} />
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Password</span>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-10 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <span className="mt-1 block text-xs font-medium text-rose-600">{errors.password}</span>}
        </label>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300" />
            Remember me
          </label>
          <a href="#" className="font-medium text-brand-600 hover:underline">Forgot password?</a>
        </div>
        <Button type="submit" className="w-full">Sign in</Button>
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Demo: <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-slate-800">alex@payg.lcu</code> / any password
        </p>
        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          No account? <Link to="/register" className="font-semibold text-brand-600 hover:underline">Create one</Link>
        </p>
      </form>
    </AuthShell>
  );
}

export function Register() {
  const { register } = useApp();
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (name.length < 2) errs.name = 'Enter your full name.';
    if (!validateEmail(email)) errs.email = 'Enter a valid email.';
    if (password.length < 6) errs.password = 'Password must be at least 6 characters.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const r = register(name, email, password);
    if (!r.ok) { setErrors({ email: r.message! }); return; }
    nav('/dashboard', { replace: true });
  };

  return (
    <AuthShell title="Create your account" subtitle="Start paying bills in under a minute.">
      <form onSubmit={submit} className="space-y-4">
        <Input label="Full name" value={name} onChange={e => setName(e.target.value)} error={errors.name} />
        <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} error={errors.email} />
        <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} error={errors.password} />
        <p className="text-xs text-slate-500 dark:text-slate-400">By signing up you agree to our Terms and Privacy Policy.</p>
        <Button type="submit" className="w-full">Create account</Button>
        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account? <Link to="/login" className="font-semibold text-brand-600 hover:underline">Sign in</Link>
        </p>
      </form>
    </AuthShell>
  );
}

function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden">
      <div className="absolute inset-0 animated-gradient opacity-[0.07]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
        <div className="hidden md:block">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:border-brand-800 dark:bg-brand-900/30 dark:text-brand-300">
            <CreditCard className="h-3.5 w-3.5" /> Trusted across Nigeria
          </div>
          <h2 className="mt-6 font-display text-4xl font-extrabold text-slate-900 dark:text-white">The fastest way to stay on top of your bills.</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Join a community of smart payers who never miss a due date, track every receipt, and save hours every month.</p>
          <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {['Zero transaction fees', 'Instant payment receipts', 'Smart spend analytics'].map(x => (
              <li key={x} className="flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-100 text-xs text-emerald-700">✓</span>{x}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur sm:p-8 dark:border-slate-800 dark:bg-slate-900/80">
          <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">{title}</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
