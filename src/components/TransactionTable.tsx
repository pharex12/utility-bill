import { useState } from 'react';
import type { Transaction } from '../data/mockData';
import { Badge, Button, EmptyState, SearchBar } from './UI';
import { currency, formatDate } from '../utils/helpers';
import { Download, Receipt } from 'lucide-react';

interface Props {
  transactions: Transaction[];
  onView: (tx: Transaction) => void;
}

export function TransactionTable({ transactions, onView }: Props) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | 'success' | 'pending' | 'failed'>('all');
  const [category, setCategory] = useState<string>('all');

  const filtered = transactions.filter(t => {
    const s = search.toLowerCase();
    const matchSearch = !s ||
      t.provider.toLowerCase().includes(s) ||
      t.reference.toLowerCase().includes(s) ||
      t.account.toLowerCase().includes(s);
    const matchStatus = status === 'all' || t.status === status;
    const matchCategory = category === 'all' || t.category === category;
    return matchSearch && matchStatus && matchCategory;
  });

  const downloadReceipt = (tx: Transaction) => {
    const content = [
      'PayG — Payment Receipt',
      '=========================',
      `Reference:   ${tx.reference}`,
      `Date:        ${formatDate(tx.date)}`,
      `Provider:    ${tx.provider}`,
      `Category:    ${tx.category}`,
      `Account:     ${tx.account}`,
      `Amount:      ${currency(tx.amount)}`,
      `Status:      ${tx.status}`,
      '',
      'Thank you for using PayG.',
    ].join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${tx.reference}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by provider, ref, account…" />
        </div>
        <div className="flex flex-wrap gap-2">
          <select value={status} onChange={e => setStatus(e.target.value as any)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            <option value="all">All statuses</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <select value={category} onChange={e => setCategory(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            <option value="all">All categories</option>
            <option value="electricity">Electricity</option>
            <option value="water">Water</option>
            <option value="gas">Gas</option>
            <option value="internet">Internet</option>
            <option value="tv">TV</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="📭"
          title="No transactions found"
          text="Try a different search or pay your first bill to get started."
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="hidden md:block">
            <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-900/50">
                <tr className="text-left text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <th className="px-5 py-3 font-semibold">Provider</th>
                  <th className="px-5 py-3 font-semibold">Account</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Reference</th>
                  <th className="px-5 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map(tx => (
                  <tr key={tx.id} className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-5 py-4 font-medium text-slate-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-sm dark:bg-brand-900/30">
                          {tx.category === 'electricity' ? '⚡' : tx.category === 'water' ? '💧' : tx.category === 'gas' ? '🔥' : tx.category === 'internet' ? '📡' : '📺'}
                        </span>
                        <span className="capitalize">{tx.provider}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{tx.account}</td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{formatDate(tx.date)}</td>
                    <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">{currency(tx.amount)}</td>
                    <td className="px-5 py-4"><Badge status={tx.status} /></td>
                    <td className="px-5 py-4 font-mono text-xs text-slate-500">{tx.reference}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => onView(tx)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-slate-800" aria-label="View">
                          <Receipt className="h-4 w-4" />
                        </button>
                        <button onClick={() => downloadReceipt(tx)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-slate-800" aria-label="Download">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800 md:hidden">
            {filtered.map(tx => (
              <div key={tx.id} className="space-y-2 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{tx.provider}</p>
                    <p className="text-xs text-slate-500">{tx.account} · {formatDate(tx.date)}</p>
                  </div>
                  <Badge status={tx.status} />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{currency(tx.amount)}</p>
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => onView(tx)} className="!py-1.5 !text-xs"><Receipt className="h-3.5 w-3.5" /> View</Button>
                    <Button variant="secondary" onClick={() => downloadReceipt(tx)} className="!py-1.5 !text-xs"><Download className="h-3.5 w-3.5" /> Receipt</Button>
                  </div>
                </div>
                <p className="font-mono text-xs text-slate-400">{tx.reference}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
