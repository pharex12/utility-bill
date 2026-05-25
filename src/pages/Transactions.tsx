import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TransactionTable } from '../components/TransactionTable';
import { Modal } from '../components/UI';
import type { Transaction } from '../data/mockData';
import { currency, formatDateTime } from '../utils/helpers';
import { Download } from 'lucide-react';

export default function Transactions() {
  const { user, transactions } = useApp();
  const [viewTx, setViewTx] = useState<Transaction | null>(null);
  if (!user) return null;
  const myTx = transactions.filter(t => t.user === user.id);

  const downloadReceipt = (tx: Transaction) => {
    const content = [
      'PayG — Payment Receipt',
      '=========================',
      `Reference: ${tx.reference}`,
      `Date:      ${formatDateTime(tx.date)}`,
      `Provider:  ${tx.provider}`,
      `Category:  ${tx.category}`,
      `Account:   ${tx.account}`,
      `Amount:    ${currency(tx.amount)}`,
      `Status:    ${tx.status}`,
      '',
      'Thank you for using PayG.',
    ].join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `receipt-${tx.reference}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 fade-in-up">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">Transactions</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">A complete history of all your bill payments.</p>
      </div>

      <TransactionTable transactions={myTx} onView={setViewTx} />

      <Modal open={!!viewTx} onClose={() => setViewTx(null)} title="Receipt">
        {viewTx && (
          <div>
            <div className="rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white">
              <p className="text-xs uppercase tracking-wide opacity-80">Receipt</p>
              <p className="mt-1 font-mono text-sm">{viewTx.reference}</p>
              <p className="mt-3 text-3xl font-extrabold">{currency(viewTx.amount)}</p>
              <p className="mt-1 text-sm opacity-80">{viewTx.provider}</p>
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              {[
                ['Account', viewTx.account],
                ['Category', viewTx.category],
                ['Date', formatDateTime(viewTx.date)],
                ['Status', viewTx.status],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-slate-100 py-2 last:border-0 dark:border-slate-800">
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="font-medium capitalize text-slate-900 dark:text-white">{String(v)}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex gap-3">
              <button onClick={() => downloadReceipt(viewTx)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                <Download className="h-4 w-4" /> Download
              </button>
              <button onClick={() => setViewTx(null)}
                className="flex-1 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-4 py-2.5 text-sm font-semibold text-white">
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
