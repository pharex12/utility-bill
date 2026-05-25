import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/UI';
import { Bell, Moon, Shield, Trash2 } from 'lucide-react';

export default function Settings() {
  const { user, theme, toggleTheme, pushToast, logout } = useApp();
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [currency, setCurrency] = useState('NGN');

  if (!user) return null;

  const Toggle = ({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) => (
    <button onClick={() => onChange(!on)}
      className={`relative h-6 w-11 rounded-full transition ${on ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${on ? 'left-5' : 'left-0.5'}`} />
    </button>
  );

  return (
    <div className="space-y-6 fade-in-up">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">Settings</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Customize your PayG experience.</p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30"><Moon className="h-5 w-5" /></div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 dark:text-white">Appearance</h3>
            <p className="text-sm text-slate-500">Switch between light and dark themes.</p>
          </div>
          <Toggle on={theme === 'dark'} onChange={toggleTheme} />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3 mb-4">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-900/30"><Bell className="h-5 w-5" /></div>
          <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
        </div>
        <div className="space-y-4">
          {[
            ['Email notifications', emailNotif, setEmailNotif, 'Receive receipts and alerts via email'],
            ['Push notifications', pushNotif, setPushNotif, 'Bill reminders on your device'],
            ['SMS notifications', smsNotif, setSmsNotif, 'Text alerts for payments'],
          ].map(([label, on, setFn, desc]: any) => (
            <div key={label} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 dark:border-slate-800">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{label}</p>
                <p className="text-xs text-slate-500">{desc}</p>
              </div>
              <Toggle on={on} onChange={setFn} />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3 mb-4">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-900/30"><Shield className="h-5 w-5" /></div>
          <h3 className="font-bold text-slate-900 dark:text-white">Security</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Two-factor authentication</p>
              <p className="text-xs text-slate-500">Add an extra layer of security</p>
            </div>
            <Toggle on={twoFA} onChange={setTwoFA} />
          </div>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Display currency</span>
            <select value={currency} onChange={e => setCurrency(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              <option value="NGN">NGN — Nigerian Naira</option>
              <option value="USD">USD — US Dollar</option>
              <option value="GBP">GBP — British Pound</option>
              <option value="GHS">GHS — Ghanaian Cedi</option>
            </select>
          </label>
          <Button onClick={() => pushToast('success', 'Preferences saved.')}>Save preferences</Button>
        </div>
      </section>

      <section className="rounded-2xl border border-rose-200 bg-rose-50 p-6 dark:border-rose-900/50 dark:bg-rose-950/30">
        <div className="flex items-start gap-3">
          <Trash2 className="h-5 w-5 text-rose-600" />
          <div className="flex-1">
            <h3 className="font-bold text-rose-900 dark:text-rose-200">Danger zone</h3>
            <p className="text-sm text-rose-700 dark:text-rose-300">Permanently delete your account and all associated data.</p>
          </div>
          <Button variant="danger" onClick={() => { if (confirm('Delete your account?')) { logout(); } }}>Delete account</Button>
        </div>
      </section>
    </div>
  );
}
