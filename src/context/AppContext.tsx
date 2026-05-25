import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { seedTransactions, seedUsers, type AppUser, type Transaction } from '../data/mockData';

export type Toast = { id: string; kind: 'success' | 'error' | 'info'; message: string };

interface AppState {
  user: AppUser | null;
  users: AppUser[];
  transactions: Transaction[];
  theme: 'light' | 'dark';
  toasts: Toast[];
  login: (email: string, password: string) => { ok: boolean; message?: string };
  register: (name: string, email: string, password: string) => { ok: boolean; message?: string };
  logout: () => void;
  addTransaction: (t: Omit<Transaction, 'id' | 'reference' | 'date'>) => Transaction;
  updateProfile: (patch: Partial<AppUser>) => void;
  toggleTheme: () => void;
  pushToast: (kind: Toast['kind'], message: string) => void;
  removeToast: (id: string) => void;
  debitWallet: (amount: number) => boolean;
}

const AppContext = createContext<AppState | null>(null);

const LS = {
  USER: 'payg.user',
  USERS: 'payg.users',
  TX: 'payg.transactions',
  THEME: 'payg.theme',
  REMEMBER: 'payg.remember',
};

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<AppUser[]>(() => loadJSON(LS.USERS, seedUsers));
  const [transactions, setTransactions] = useState<Transaction[]>(() => loadJSON(LS.TX, seedTransactions));
  const [user, setUser] = useState<AppUser | null>(() => loadJSON<AppUser | null>(LS.USER, null));
  const [theme, setTheme] = useState<'light' | 'dark'>(() => loadJSON<'light' | 'dark'>(LS.THEME, 'light'));
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    localStorage.setItem(LS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(LS.TX, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    if (user) localStorage.setItem(LS.USER, JSON.stringify(user));
    else localStorage.removeItem(LS.USER);
  }, [user]);

  useEffect(() => {
    localStorage.setItem(LS.THEME, JSON.stringify(theme));
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  // Keep current user in sync when users list updates (profile edits)
  useEffect(() => {
    if (!user) return;
    const fresh = users.find(u => u.id === user.id);
    if (fresh && fresh !== user) setUser(fresh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  const pushToast: AppState['pushToast'] = (kind, message) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, kind, message }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3600);
  };

  const login: AppState['login'] = (email, password) => {
    if (!email || !password) return { ok: false, message: 'Email and password are required.' };
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found) return { ok: false, message: 'No account found with that email.' };
    // Demo: any non-empty password accepted
    localStorage.setItem(LS.REMEMBER, '1');
    setUser(found);
    return { ok: true };
  };

  const register: AppState['register'] = (name, email, password) => {
    if (!name || !email || !password) return { ok: false, message: 'All fields are required.' };
    if (password.length < 6) return { ok: false, message: 'Password must be at least 6 characters.' };
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, message: 'An account with this email already exists.' };
    }
    const newUser: AppUser = {
      id: 'U-' + Math.floor(1000 + Math.random() * 9000),
      name, email,
      phone: '+234 ' + (803 + Math.floor(Math.random() * 10)) + ' 555 ' + String(Math.floor(1000 + Math.random() * 9000)),
      avatar: '🙂',
      wallet: 25000,
      joined: new Date().toISOString().slice(0, 10),
      role: 'user',
    };
    setUsers(u => [...u, newUser]);
    setUser(newUser);
    pushToast('success', 'Welcome to PayG! We added ₦25,000 to your wallet.');
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LS.REMEMBER);
    pushToast('info', 'You have been signed out.');
  };

  const addTransaction: AppState['addTransaction'] = (t) => {
    const tx: Transaction = {
      ...t,
      id: 'tx_' + Math.random().toString(36).slice(2),
      date: new Date().toISOString(),
      reference: 'PAY-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    };
    setTransactions(prev => [tx, ...prev]);
    return tx;
  };

  const debitWallet: AppState['debitWallet'] = (amount) => {
    if (!user) return false;
    if (user.wallet < amount) return false;
    setUsers(us => us.map(u => u.id === user.id ? { ...u, wallet: u.wallet - amount } : u));
    return true;
  };

  const updateProfile: AppState['updateProfile'] = (patch) => {
    if (!user) return;
    setUsers(us => us.map(u => u.id === user.id ? { ...u, ...patch } : u));
  };

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  const removeToast = (id: string) => setToasts(t => t.filter(x => x.id !== id));

  const value = useMemo<AppState>(() => ({
    user, users, transactions, theme, toasts,
    login, register, logout, addTransaction, updateProfile,
    toggleTheme, pushToast, removeToast, debitWallet,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [user, users, transactions, theme, toasts]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
