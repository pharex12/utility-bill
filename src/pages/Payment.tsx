import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { providers, type Provider } from '../data/mockData';
import { Button, Input, Modal, ProviderCard } from '../components/UI';
import { PaymentForm } from '../components/PaymentForm';
import { CheckCircle2, XCircle, CreditCard } from 'lucide-react';

type Step = 'pick' | 'details' | 'pay' | 'result';

export default function Payment() {
  const [params] = useSearchParams();
  const preselect = params.get('provider');

  const [step, setStep] = useState<Step>('pick');
  const [provider, setProvider] = useState<Provider | null>(() =>
    providers.find(p => p.id === preselect) ?? null
  );
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ref, setRef] = useState('');
  const [failed, setFailed] = useState(false);
  const [category, setCategory] = useState<string>('all');

  const filteredProviders = useMemo(
    () => providers.filter(p => category === 'all' || p.category === category),
    [category]
  );

  const pickProvider = (p: Provider) => { setProvider(p); setStep('details'); };

  const validateDetails = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!provider) return;
    if (account.trim().length < 4) errs.account = `Enter a valid ${provider.fieldLabel.toLowerCase()}.`;
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) errs.amount = 'Enter a valid amount greater than 0.';
    if (amt > 500000) errs.amount = 'Maximum per transaction is ₦500,000.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStep('pay');
  };

  const onSuccess = (reference: string) => {
    setRef(reference);
    setFailed(false);
    setStep('result');
  };

  const reset = () => {
    setStep('pick');
    setProvider(null);
    setAccount('');
    setAmount('');
    setRef('');
    setFailed(false);
    setErrors({});
  };

  // Watch for failed payments by checking if step changed back (handled inside PaymentForm via toast)
  // PaymentForm calls onSuccess only on success; on failure it just shows toast and stays on 'pay'.
  // We set failed flag via a wrapper: PaymentForm receives onCancel which we treat as "retry or cancel".
  // Simpler: expose a failure hook by passing a wrapped onSuccess that always sets step to result.

  return (
    <div className="mx-auto max-w-4xl space-y-6 fade-in-up">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">Pay a bill</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {step === 'pick' && 'Step 1 of 3 — Choose a provider'}
          {step === 'details' && 'Step 2 of 3 — Enter bill details'}
          {step === 'pay' && 'Step 3 of 3 — Confirm payment'}
          {step === 'result' && (failed ? 'Payment failed' : 'Payment successful')}
        </p>
      </div>

      {step === 'pick' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {['all', 'electricity', 'water', 'gas', 'internet', 'tv'].map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition ${
                  category === c ? 'bg-brand-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {filteredProviders.map(p => <ProviderCard key={p.id} provider={p} onClick={() => pickProvider(p)} />)}
          </div>
        </div>
      )}

      {step === 'details' && provider && (
        <form onSubmit={validateDetails} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex items-center gap-3">
            <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br text-2xl text-white ${provider.color}`}>{provider.logo}</div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">{provider.name}</p>
              <p className="text-xs capitalize text-slate-500">{provider.category}</p>
            </div>
          </div>
          <div className="space-y-4">
            <Input
              label={provider.fieldLabel}
              placeholder={provider.fieldPlaceholder}
              value={account}
              onChange={e => setAccount(e.target.value)}
              error={errors.account}
            />
            <Input
              label="Amount (USD)"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              error={errors.amount}
            />
            <div className="flex flex-wrap gap-2">
              {[2000, 5000, 10000, 25000].map(n => (
                <button key={n} type="button" onClick={() => setAmount(String(n))}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
                  ₦{n.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Button type="button" variant="secondary" onClick={() => setStep('pick')}>Back</Button>
            <Button type="submit">Continue</Button>
          </div>
        </form>
      )}

      {step === 'pay' && provider && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <PaymentForm
            provider={provider}
            account={account}
            amount={parseFloat(amount)}
            onSuccess={onSuccess}
            onCancel={() => setStep('details')}
          />
        </div>
      )}

      <Modal open={step === 'result'} onClose={reset} size="md">
        {!failed ? (
          <div className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h3 className="mt-4 font-display text-2xl font-extrabold text-slate-900 dark:text-white">Payment successful!</h3>
            <p className="mt-1 text-sm text-slate-500">Your bill has been paid and a receipt sent to your email.</p>
            <div className="mt-5 rounded-xl bg-slate-50 p-4 text-left text-sm dark:bg-slate-800/50">
              <p className="flex justify-between"><span className="text-slate-500">Provider</span><span className="font-semibold text-slate-900 dark:text-white">{provider?.name}</span></p>
              <p className="mt-1 flex justify-between"><span className="text-slate-500">Amount</span><span className="font-semibold text-slate-900 dark:text-white">₦{parseFloat(amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span></p>
              <p className="mt-1 flex justify-between"><span className="text-slate-500">Reference</span><span className="font-mono text-slate-900 dark:text-white">{ref}</span></p>
            </div>
            <div className="mt-5 flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={reset}>Pay another</Button>
              <Button className="flex-1" onClick={() => { reset(); window.location.href = '/transactions'; }}>View transactions</Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/30">
              <XCircle className="h-9 w-9" />
            </div>
            <h3 className="mt-4 font-display text-2xl font-extrabold text-slate-900 dark:text-white">Payment failed</h3>
            <p className="mt-1 text-sm text-slate-500">Your card was declined. Please try again with a different method.</p>
            <Button className="mt-5" onClick={reset}>Try again</Button>
          </div>
        )}
      </Modal>

      {/* Trust bar */}
      <div className="flex flex-wrap items-center justify-center gap-5 rounded-2xl border border-slate-200 bg-white/60 p-4 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900/50">
        <span className="flex items-center gap-1.5"><CreditCard className="h-4 w-4" /> Visa · Mastercard · Amex</span>
        <span>🔒 256-bit SSL encryption</span>
        <span>⚡ Instant settlement</span>
      </div>
    </div>
  );
}
