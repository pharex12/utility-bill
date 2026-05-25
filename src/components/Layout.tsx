import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Home, LayoutDashboard, Receipt, User, Settings, LogOut, Menu, X,
  Moon, Sun, CreditCard, Info, Phone, Briefcase, Search as SearchIcon, Shield,
} from 'lucide-react';
import { classNames } from '../utils/helpers';
import { Toasts } from './UI';

/* ---------- Navbar ---------- */
const publicLinks = [
  { to: '/',            label: 'Home',     icon: Home },
  { to: '/services',    label: 'Services', icon: Briefcase },
  { to: '/about',       label: 'About',    icon: Info },
  { to: '/contact',     label: 'Contact',  icon: Phone },
];

export function Navbar() {
  const { user, logout, theme, toggleTheme } = useApp();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={classNames(
      'sticky top-0 z-40 w-full transition-all',
      scrolled ? 'bg-white/90 shadow-sm backdrop-blur dark:bg-slate-950/80' : 'bg-white/70 backdrop-blur dark:bg-slate-950/60'
    )}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow">
            <CreditCard className="h-5 w-5" />
          </div>
          <span className="font-display text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Pay<span className="text-brand-600">G</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {publicLinks.map(l => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) =>
              classNames('rounded-lg px-3 py-2 text-sm font-medium transition',
                isActive ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                         : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              )
            }>{l.label}</NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link to="/search" className="hidden rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:inline-flex dark:text-slate-300 dark:hover:bg-slate-800" aria-label="Search">
            <SearchIcon className="h-5 w-5" />
          </Link>
          <button onClick={toggleTheme} aria-label="Toggle theme"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          {user ? (
            <div className="hidden items-center gap-2 md:flex">
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm text-white">{user.avatar}</span>
                {user.name.split(' ')[0]}
              </Link>
              <button onClick={logout} className="rounded-lg p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/30" aria-label="Log out">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link to="/login" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Sign in</Link>
              <Link to="/register" className="rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-110">Get started</Link>
            </div>
          )}

          <button className="md:hidden rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setOpen(o => !o)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-1 p-4">
            {publicLinks.map(l => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) =>
                classNames('flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium',
                  isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                )
              }><l.icon className="h-4 w-4" />{l.label}</NavLink>
            ))}
            <hr className="my-2 border-slate-200 dark:border-slate-800" />
            {user ? (
              <>
                <NavLink to="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"><LayoutDashboard className="h-4 w-4" />Dashboard</NavLink>
                <NavLink to="/profile" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"><User className="h-4 w-4" />Profile</NavLink>
                <button onClick={logout} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"><LogOut className="h-4 w-4" />Sign out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Sign in</Link>
                <Link to="/register" className="rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-4 py-2.5 text-center text-sm font-semibold text-white">Get started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white">
              <CreditCard className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-extrabold text-slate-900 dark:text-white">
              Pay<span className="text-brand-600">G</span>
            </span>
          </Link>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            The modern utility bill payment platform. Pay every bill, track every dollar.
          </p>

        </div>
        {[
          { title: 'Product', links: [['Services', '/services'], ['Pricing', '/services'], ['Providers', '/services'], ['Security', '/about']] },
          { title: 'Company', links: [['About', '/about'], ['Careers', '/about'], ['Press', '/about'], ['Contact', '/contact']] },
          { title: 'Resources', links: [['Help Center', '/contact'], ['Blog', '/about'], ['Status', '/about'], ['API', '/about']] },
        ].map(col => (
          <div key={col.title}>
            <h5 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">{col.title}</h5>
            <ul className="mt-4 space-y-2.5">
              {col.links.map(([l, to]) => (
                <li key={l}><Link to={to} className="text-sm text-slate-500 transition hover:text-brand-600 dark:text-slate-400">{l}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8 dark:text-slate-400">
          <p>© 2026 PayG LCU. We don finish. Built because we can't fail.</p>
          <p>Built with ♥ for modern fintech experiences.</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Sidebar (dashboard) ---------- */
const sideItems = [
  { to: '/dashboard',    label: 'Dashboard',  icon: LayoutDashboard },
  { to: '/payment',      label: 'Pay a Bill', icon: CreditCard },
  { to: '/transactions', label: 'Transactions', icon: Receipt },
  { to: '/profile',      label: 'Profile',    icon: User },
  { to: '/settings',     label: 'Settings',   icon: Settings },
];

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { user } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const isAdmin = user?.role === 'admin';
  const items = [...sideItems, ...(isAdmin ? [{ to: '/admin', label: 'Admin Panel', icon: Shield }] : [])];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Top bar inside dashboard */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:hidden dark:border-slate-800 dark:bg-slate-950/80">
        <button onClick={() => setMobileOpen(true)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
          <Menu className="h-5 w-5" />
        </button>
        <span className="font-display font-bold text-slate-900 dark:text-white">Dashboard</span>
        <div className="w-9" />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={classNames(
          'fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-200 bg-white p-5 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 dark:border-slate-800 dark:bg-slate-950',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}>
          <div className="mb-8 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow">
                <CreditCard className="h-5 w-5" />
              </div>
              <span className="font-display text-lg font-extrabold text-slate-900 dark:text-white">Pay<span className="text-brand-600">G</span></span>
            </Link>
            <button className="lg:hidden rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setMobileOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {items.map(i => (
              <NavLink key={i.to} to={i.to} className={({ isActive }) =>
                classNames('flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                  isActive ? 'bg-brand-50 text-brand-700 shadow-sm dark:bg-brand-900/30 dark:text-brand-300'
                           : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                )
              }>
                <i.icon className="h-5 w-5" />
                {i.label}
              </NavLink>
            ))}
          </nav>

          {user && (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-brand-50 to-white p-4 dark:border-slate-800 dark:from-brand-900/30 dark:to-slate-900">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-lg text-white">{user.avatar}</div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Overlay */}
        {mobileOpen && <div className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden" onClick={() => setMobileOpen(false)} />}

        {/* Main */}
        <main className="min-h-[calc(100vh-57px)] flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}

/* ---------- Public Layout ---------- */
export function PublicLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
      <Toasts />
      {/* Quick command-K shortcut to search */}
      <CommandK onOpen={() => navigate('/search')} />
    </div>
  );
}

/* ---------- Dashboard Layout ---------- */
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar>{children}</Sidebar>
      <Toasts />
    </>
  );
}

/* ---------- Cmd-K shortcut ---------- */
function CommandK({ onOpen }: { onOpen: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpen();
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onOpen]);
  return null;
}
