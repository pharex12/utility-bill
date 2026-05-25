import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { providers } from '../data/mockData';
import { Badge, Button, EmptyState, SearchBar, StatsCard } from '../components/UI';
import { currency, formatDate } from '../utils/helpers';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { Activity, CreditCard, Receipt, Users } from 'lucide-react';

export default function Admin() {
  const { users, transactions } = useApp();
  const [tab, setTab] = useState<'overview' | 'users' | 'transactions' | 'providers'>('overview');
  const [search, setSearch] = useState('');

  const totalRevenue = transactions.filter(t => t.status === 'success').reduce((a, b) => a + b.amount, 0);
  const successRate = Math.round((transactions.filter(t => t.status === 'success').length / transactions.length) * 100);

  const dailyData = useMemo(() => {
    const map: Record<string, number> = {};
    transactions.forEach(t => {
      const d = new Date(t.date).toISOString().slice(0, 10);
      map[d] = (map[d] || 0) + (t.status === 'success' ? t.amount : 0);
    });
    return Object.entries(map).slice(-10).map(([date, amount]) => ({ date: date.slice(5), amount: Math.round(amount) }));
  }, [transactions]);

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );
  const filteredTx = transactions.filter(t =>
    t.provider.toLowerCase().includes(search.toLowerCase()) ||
    t.reference.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 fade-in-up">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">Admin panel</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Platform-wide analytics and management.</p>
        </div>
        <div className="w-full sm:w-72"><SearchBar value={search} onChange={setSearch} placeholder="Search admin…" /></div>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800">
        {(['overview', 'users', 'transactions', 'providers'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-semibold capitalize transition ${
              tab === t ? 'border-b-2 border-brand-600 text-brand-700 dark:text-brand-400' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard title="Total Users" value={String(users.length)} hint="Active accounts" icon={<Users className="h-5 w-5" />} accent="brand" />
            <StatsCard title="Transactions" value={String(transactions.length)} hint="All time" icon={<Receipt className="h-5 w-5" />} accent="emerald" />
            <StatsCard title="Revenue" value={currency(totalRevenue)} hint="Successful payments" icon={<CreditCard className="h-5 w-5" />} accent="violet" />
            <StatsCard title="Success rate" value={`${successRate}%`} hint="Across all payments" icon={<Activity className="h-5 w-5" />} accent="amber" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Daily revenue</h3>
            <p className="text-xs text-slate-500">Last 10 days with activity</p>
            <div className="mt-4 h-72">
              <ResponsiveContainer>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} formatter={(v: any) => `₦${Number(v).toLocaleString('en-NG')}`} />
                  <Bar dataKey="amount" fill="#2560f5" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {tab === 'users' && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3">User</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Joined</th>
                <th className="px-5 py-3">Wallet</th>
                <th className="px-5 py-3">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map(u => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-lg text-white">{u.avatar}</div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{u.name}</p>
                        <p className="text-xs text-slate-500">{u.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{u.email}</td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{formatDate(u.joined)}</td>
                  <td className="px-5 py-3 font-semibold text-slate-900 dark:text-white">{currency(u.wallet)}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                      u.role === 'admin' ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                    }`}>{u.role}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && <EmptyState icon="👥" title="No users match your search." />}
        </div>
      )}

      {tab === 'transactions' && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3">Ref</th>
                <th className="px-5 py-3">User</th>
                <th className="px-5 py-3">Provider</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTx.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="px-5 py-3 font-mono text-xs text-slate-500">{t.reference}</td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{t.user}</td>
                  <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">{t.provider}</td>
                  <td className="px-5 py-3 font-semibold text-slate-900 dark:text-white">{currency(t.amount)}</td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{formatDate(t.date)}</td>
                  <td className="px-5 py-3"><Badge status={t.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTx.length === 0 && <EmptyState icon="🧾" title="No transactions found." />}
        </div>
      )}

      {tab === 'providers' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map(p => (
            <div key={p.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br text-2xl text-white ${p.color}`}>{p.logo}</div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{p.name}</p>
                  <p className="text-xs capitalize text-slate-500">{p.category}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-500">{p.fieldLabel}: <span className="font-mono">{p.fieldPlaceholder}</span></p>
              <div className="mt-4 flex gap-2">
                <Button variant="secondary" className="flex-1 !py-2 !text-xs">Edit</Button>
                <Button variant="ghost" className="!py-2 !text-xs !text-rose-600">Disable</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
