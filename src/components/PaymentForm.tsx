import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button, Input } from './UI';
import { CreditCard, Lock, User } from 'lucide-react';
import { classNames, validateCard, delay } from '../utils/helpers';
import type { Provider } from '../data/mockData';

interface Props {
  provider: Provider;
  account: string;
  amount: number;
  onSuccess: (ref: string) => void;
  onCancel: () => void;
}

export function PaymentForm({ provider, account, amount, onSuccess, onCancel }: Props) {
  const { user, addTransaction, debitWallet, pushToast } = useApp();
  const [method, setMethod] = useState<'wallet' | 'card'>('wallet');
  const [card, setCard] = useState({ number: '', name: '', exp: '', cvc: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const formatCardNumber = (v: string) =>
    v.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (method === 'card') {
      if (!validateCard(card.number)) errs.number = 'Enter a valid card number.';
      if (card.name.trim().length < 2) errs.name = 'Enter the cardholder name.';
      if (!/^\d{2}\/\d{2}$/.test(card.exp)) errs.exp = 'Use MM/YY.';
      if (!/^\d{3,4}$/.test(card.cvc)) errs.cvc = '3 or 4 digits.';
    } else {
      if (!user || user.wallet < amount) errs.wallet = 'Insufficient wallet balance.';
    }
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    await delay(1600); // simulate gateway

    // Random failure ~10% to demo error handling
    const failed = Math.random() < 0.1;
    if (failed) {
      addTransaction({ user: user!.id, provider: provider.name, category: provider.category, account, amount, status: 'failed' });
      pushToast('error', 'Payment declined. Please try another method.');
      setLoading(false);
      return;
    }

    if (method === 'wallet') {
      const ok = debitWallet(amount);
      if (!ok) { setErrors({ wallet: 'Balance insufficient.' }); setLoading(false); return; }
    }
    const tx = addTransaction({ user: user!.id, provider: provider.name, category: provider.category, account, amount, status: 'success' });
    pushToast('success', `Payment successful! Ref: ${tx.reference}`);
    onSuccess(tx.reference);
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white shadow-lg">
        <p className="text-xs uppercase tracking-wide opacity-80">Paying</p>
        <p className="mt-1 text-lg font-bold">{provider.name}</p>
        <p className="mt-0.5 text-sm opacity-80">{provider.fieldLabel}: {account}</p>
        <p className="mt-3 text-2xl font-extrabold">₦{amount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={() => setMethod('wallet')}
          className={classNames('rounded-xl border px-4 py-3 text-left text-sm font-medium transition',
            method === 'wallet' ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                                : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800')}>
          <User className="mb-1 h-5 w-5" /> Wallet
          <span className="mt-1 block text-xs opacity-70">Balance: ₦{user?.wallet.toLocaleString('en-NG')}</span>
        </button>
        <button type="button" onClick={() => setMethod('card')}
          className={classNames('rounded-xl border px-4 py-3 text-left text-sm font-medium transition',
            method === 'card' ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800')}>
          <CreditCard className="mb-1 h-5 w-5" /> Card
          <span className="mt-1 block text-xs opacity-70">Visa / Mastercard</span>
        </button>
      </div>

      {method === 'card' && (
        <div className="space-y-3 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
          <Input
            label="Card number"
            placeholder="1234 5678 9012 3456"
            value={card.number}
            onChange={e => setCard({ ...card, number: formatCardNumber(e.target.value) })}
            error={errors.number}
          />
          <Input
            label="Cardholder name"
            placeholder="Alex Morgan"
            value={card.name}
            onChange={e => setCard({ ...card, name: e.target.value })}
            error={errors.name}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Expiry"
              placeholder="MM/YY"
              value={card.exp}
              onChange={e => setCard({ ...card, exp: e.target.value.replace(/[^\d/]/g, '').slice(0, 5) })}
              error={errors.exp}
            />
            <Input
              label="CVC"
              placeholder="123"
              value={card.cvc}
              onChange={e => setCard({ ...card, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })}
              error={errors.cvc}
            />
          </div>
          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            <Lock className="h-3.5 w-3.5" /> Secured with 256-bit TLS encryption
          </p>
        </div>
      )}

      {errors.wallet && <p className="text-sm text-rose-600">{errors.wallet}</p>}

      <div className="flex gap-3">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">Cancel</Button>
        <Button type="submit" className="flex-1" disabled={loading}>
          {loading ? 'Processing…' : `Pay ₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}`}
        </Button>
      </div>
    </form>
  );
}
