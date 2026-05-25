import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { providers } from '../data/mockData';
import { EmptyState, SearchBar, Badge } from '../components/UI';
import { currency, formatDate } from '../utils/helpers';

export default function Search() {
  const { user, transactions } = useApp();
  const [q, setQ] = useState('');

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return { providers: [], transactions: [], users: [] as any[] };
    const matchedProviders = providers.filter(p =>
      p.name.toLowerCase().includes(s) || p.category.toLowerCase().includes(s)
    );
    const matchedTx = (user ? transactions.filter(t => t.user === user.id) : transactions).filter(t =>
      t.provider.toLowerCase().includes(s) ||
      t.reference.toLowerCase().includes(s) ||
      t.account.toLowerCase().includes(s)
    );
    return { providers: matchedProviders, transactions: matchedTx, users: [] as any[] };
  }, [q, user, transactions]);

  const hasResults = results.providers.length + results.transactions.length > 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">Search</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Find providers, past payments, and references instantly.</p>
      <div className="mt-5">
        <SearchBar value={q} onChange={setQ} placeholder="Search providers, reference codes, accounts…" />
      </div>

      {!q && (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
          <p className="text-5xl">🔍</p>
          <p className="mt-3 font-semibold text-slate-900 dark:text-white">Start typing to search</p>
          <p className="mt-1 text-sm text-slate-500">Try "electricity", "PAY-29", or a meter number.</p>
        </div>
      )}

      {q && !hasResults && (
        <div className="mt-8"><EmptyState icon="🔎" title="No results" text={`Nothing matches "${q}". Try a different query.`} /></div>
      )}

      {results.providers.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Providers</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {results.providers.map(p => (
              <Link key={p.id} to={`/payment?provider=${p.id}`}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br text-lg text-white ${p.color}`}>{p.logo}</div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{p.name}</p>
                  <p className="text-xs text-slate-500 capitalize">{p.category} · {p.region}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {results.transactions.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Transactions</h2>
          <div className="mt-3 divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
            {results.transactions.slice(0, 10).map(t => (
              <div key={t.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{t.provider}</p>
                  <p className="text-xs text-slate-500">{t.reference} · {formatDate(t.date)}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 dark:text-white">{currency(t.amount)}</p>
                  <Badge status={t.status} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
