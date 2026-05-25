import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatsCard, ProviderCard, Button, CardSkeleton, EmptyState } from '../components/UI';
import { providers, monthlySpend, categoryBreakdown, type Transaction } from '../data/mockData';
import { currency, formatDateTime } from '../utils/helpers';
import { useEffect, useState } from 'react';
import { ArrowUpRight, CreditCard, Receipt, Wallet, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

export default function Dashboard() {
  const { user, transactions } = useApp();
  const [loading, setLoading] = useState(true);
  const [viewTx, setViewTx] = useState<Transaction | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  if (!user) return null;

  const myTx = transactions.filter(t => t.user === user.id);
  const recent = myTx.slice(0, 5);
  const successful = myTx.filter(t => t.status === 'success');
  const totalSpent = successful.reduce((a, b) => a + b.amount, 0);
  const thisMonth = successful
    .filter(t => new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((a, b) => a + b.amount, 0);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2"><CardSkeleton /></div>
          <CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 fade-in-up">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
            Hi, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Here's what's happening with your bills today.</p>
        </div>
        <Link to="/payment"><Button><Zap className="h-4 w-4" /> Pay a bill</Button></Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Wallet Balance" value={currency(user.wallet)} hint="Available funds" icon={<Wallet className="h-5 w-5" />} accent="brand" />
        <StatsCard title="Total Spent" value={currency(totalSpent)} hint={`Across ${successful.length} bills`} icon={<CreditCard className="h-5 w-5" />} accent="emerald" />
        <StatsCard title="This Month" value={currency(thisMonth)} hint="So far" icon={<ArrowUpRight className="h-5 w-5" />} accent="violet" />
        <StatsCard title="Transactions" value={String(myTx.length)} hint="All time" icon={<Receipt className="h-5 w-5" />} accent="amber" />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Monthly spending</h3>
              <p className="text-xs text-slate-500">Last 6 months</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">+12.4%</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={monthlySpend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2560f5" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#2560f5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} formatter={(v: any) => `₦${Number(v).toLocaleString('en-NG')}`} />
                <Area type="monotone" dataKey="amount" stroke="#2560f5" strokeWidth={2.5} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">By category</h3>
          <p className="text-xs text-slate-500">Share of total spend</p>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={categoryBreakdown} innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {categoryBreakdown.map(c => <Cell key={c.name} fill={c.color} />)}
                </Pie>
                <Tooltip formatter={(v: any) => `${v}%`} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick actions + recent */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Quick pay</h3>
            <Link to="/payment" className="text-sm font-semibold text-brand-600 hover:underline">See all</Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {providers.slice(0, 4).map(p => (
              <Link key={p.id} to={`/payment?provider=${p.id}`}>
                <ProviderCard provider={p} onClick={() => {}} />
              </Link>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent transactions</h3>
            <Link to="/transactions" className="text-sm font-semibold text-brand-600 hover:underline">View all</Link>
          </div>
          {recent.length === 0 ? (
            <EmptyState icon="🧾" title="No transactions yet" text="Your payment history will appear here." action={<Link to="/payment"><Button>Pay your first bill</Button></Link>} />
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {recent.map(tx => (
                <div key={tx.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-lg dark:bg-brand-900/30">
                      {tx.category === 'electricity' ? '⚡' : tx.category === 'water' ? '💧' : tx.category === 'gas' ? '🔥' : tx.category === 'internet' ? '📡' : '📺'}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{tx.provider}</p>
                      <p className="text-xs text-slate-500">{formatDateTime(tx.date)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900 dark:text-white">{currency(tx.amount)}</p>
                    <span className={`text-xs font-semibold capitalize ${
                      tx.status === 'success' ? 'text-emerald-600' : tx.status === 'pending' ? 'text-amber-600' : 'text-rose-600'
                    }`}>{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Receipt modal */}
      {viewTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4" onClick={() => setViewTx(null)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Transaction details</h3>
            <dl className="mt-4 space-y-2 text-sm">
              {[
                ['Reference', viewTx.reference],
                ['Provider', viewTx.provider],
                ['Account', viewTx.account],
                ['Date', formatDateTime(viewTx.date)],
                ['Amount', currency(viewTx.amount)],
                ['Status', viewTx.status],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-slate-100 py-2 last:border-0 dark:border-slate-800">
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="font-medium text-slate-900 dark:text-white capitalize">{String(v)}</dd>
                </div>
              ))}
            </dl>
            <Button className="mt-5 w-full" onClick={() => setViewTx(null)}>Close</Button>
          </div>
        </div>
      )}

    </div>
  );
}
