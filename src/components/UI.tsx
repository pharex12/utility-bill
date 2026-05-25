import { useEffect, type ReactNode } from 'react';
import { classNames } from '../utils/helpers';
import { X } from 'lucide-react';

/* ---------- Loader ---------- */
export function Loader({ label = 'Processing...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-brand-200" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-brand-600" />
      </div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}

/* ---------- Skeleton ---------- */
export function Skeleton({ className }: { className?: string }) {
  return <div className={classNames('skeleton', className)} />;
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-4 h-8 w-36" />
      <Skeleton className="mt-4 h-2 w-full" />
    </div>
  );
}

/* ---------- Modal ---------- */
export function Modal({ open, onClose, children, title, size = 'md' }: {
  open: boolean; onClose: () => void; children: ReactNode; title?: string; size?: 'sm' | 'md' | 'lg';
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);

  if (!open) return null;
  const width = size === 'sm' ? 'max-w-md' : size === 'lg' ? 'max-w-3xl' : 'max-w-xl';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm fade-in-up" onClick={onClose} />
      <div className={classNames(
        'relative w-full rounded-2xl bg-white p-6 shadow-2xl fade-in-up dark:bg-slate-900',
        width
      )}>
        {title && (
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
            <button onClick={onClose} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

/* ---------- Toasts ---------- */
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Toasts() {
  const { toasts, removeToast } = useApp();
  return (
    <div className="pointer-events-none fixed right-4 top-20 z-[60] flex w-full max-w-sm flex-col gap-2">
      {toasts.map(t => {
        const Icon = t.kind === 'success' ? CheckCircle2 : t.kind === 'error' ? AlertCircle : Info;
        const color =
          t.kind === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-800' :
          t.kind === 'error'   ? 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-200 dark:border-rose-800' :
                                 'bg-brand-50 text-brand-800 border-brand-200 dark:bg-brand-900/30 dark:text-brand-200 dark:border-brand-800';
        return (
          <div key={t.id} className={classNames(
            'pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg slide-in-right', color
          )}>
            <Icon className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="flex-1 text-sm font-medium">{t.message}</p>
            <button onClick={() => removeToast(t.id)} className="text-current opacity-60 hover:opacity-100">
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- SearchBar ---------- */
import { Search } from 'lucide-react';

export function SearchBar({ value, onChange, placeholder = 'Search...' }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-brand-900/40"
      />
    </div>
  );
}

/* ---------- StatsCard ---------- */
export function StatsCard({ title, value, hint, icon, accent = 'brand' }: {
  title: string; value: string; hint?: string; icon: ReactNode; accent?: 'brand' | 'emerald' | 'amber' | 'rose' | 'violet';
}) {
  const palette = {
    brand:   'from-brand-500 to-brand-700',
    emerald: 'from-emerald-500 to-teal-600',
    amber:   'from-amber-500 to-orange-600',
    rose:    'from-rose-500 to-pink-600',
    violet:  'from-violet-500 to-indigo-600',
  }[accent];
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
          {hint && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
        </div>
        <div className={classNames('grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-md', palette)}>
          {icon}
        </div>
      </div>
      <div className={classNames('absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-10 blur-2xl transition group-hover:opacity-20', palette)} />
    </div>
  );
}

/* ---------- BillCard / ProviderCard ---------- */
import type { Provider } from '../data/mockData';

export function ProviderCard({ provider, onClick }: { provider: Provider; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <div className={classNames('grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br text-2xl shadow-md', provider.color)}>
        <span>{provider.logo}</span>
      </div>
      <div>
        <p className="font-semibold text-slate-900 dark:text-white">{provider.name}</p>
        <p className="text-xs capitalize text-slate-500 dark:text-slate-400">{provider.category}</p>
      </div>
      <span className="mt-auto text-sm font-medium text-brand-600 opacity-0 transition group-hover:opacity-100 dark:text-brand-400">
        Pay now →
      </span>
    </button>
  );
}

/* ---------- Buttons ---------- */
export function Button({ children, variant = 'primary', className, ...rest }:
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger' }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition btn-focus disabled:cursor-not-allowed disabled:opacity-50';
  const styles = {
    primary:   'bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-sm hover:shadow-md hover:brightness-110',
    secondary: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800',
    ghost:     'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
    danger:    'bg-rose-600 text-white hover:bg-rose-700',
  }[variant];
  return <button className={classNames(base, styles, className)} {...rest}>{children}</button>;
}

/* ---------- Input ---------- */
export function Input({ label, error, className, ...rest }:
  React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>}
      <input
        {...rest}
        className={classNames(
          'w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm outline-none transition dark:bg-slate-900 dark:text-slate-100',
          error ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100' :
                  'border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:focus:ring-brand-900/40',
          className
        )}
      />
      {error && <span className="mt-1 block text-xs font-medium text-rose-600">{error}</span>}
    </label>
  );
}

/* ---------- Select ---------- */
export function Select({ label, error, className, children, ...rest }:
  React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>}
      <select
        {...rest}
        className={classNames(
          'w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm outline-none transition dark:bg-slate-900 dark:text-slate-100',
          error ? 'border-rose-400' : 'border-slate-200 focus:border-brand-500 dark:border-slate-700',
          className
        )}
      >{children}</select>
      {error && <span className="mt-1 block text-xs font-medium text-rose-600">{error}</span>}
    </label>
  );
}

/* ---------- Badge ---------- */
export function Badge({ status }: { status: 'success' | 'pending' | 'failed' }) {
  const map = {
    success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    failed:  'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
  };
  return (
    <span className={classNames('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize', map[status])}>
      <span className={classNames('h-1.5 w-1.5 rounded-full',
        status === 'success' ? 'bg-emerald-500' : status === 'pending' ? 'bg-amber-500' : 'bg-rose-500'
      )} />
      {status}
    </span>
  );
}

/* ---------- EmptyState ---------- */
export function EmptyState({ icon = '📭', title, text, action }: {
  icon?: string; title: string; text?: string; action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 p-10 text-center dark:border-slate-700 dark:bg-slate-900/50">
      <div className="mb-3 text-5xl">{icon}</div>
      <h4 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h4>
      {text && <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
