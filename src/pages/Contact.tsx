import { useState } from 'react';
import { Button, Input } from '../components/UI';
import { useApp } from '../context/AppContext';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  const { pushToast } = useApp();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.length < 2) errs.name = 'Name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email.';
    if (form.subject.length < 3) errs.subject = 'Subject is required.';
    if (form.message.length < 10) errs.message = 'Message must be at least 10 characters.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      pushToast('success', 'Thanks! We will get back to you within 24 hours.');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 900);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">CONTACT US</span>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-slate-900 sm:text-5xl dark:text-white">We'd love to hear from you</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">Our friendly team replies within 24 hours.</p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          {[
            { icon: Mail, t: 'Email us', d: 'support@payg.lcu' },
            { icon: Phone, t: 'Call us',  d: '+234 803 555 0100' },
            { icon: MapPin, t: 'Visit us', d: 'Plot 14, Ring Road\nIbadan, Oyo State 200272' },
          ].map(c => (
            <div key={c.t} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{c.t}</p>
                <p className="mt-1 whitespace-pre-line text-sm text-slate-600 dark:text-slate-400">{c.d}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2 dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} error={errors.name} />
            <Input label="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} error={errors.email} />
          </div>
          <Input label="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} error={errors.subject} />
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Message</span>
            <textarea
              rows={6}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            {errors.message && <span className="mt-1 block text-xs font-medium text-rose-600">{errors.message}</span>}
          </label>
          <Button type="submit" className="w-full" disabled={sending}>{sending ? 'Sending…' : 'Send message'}</Button>
        </form>
      </div>
    </div>
  );
}
