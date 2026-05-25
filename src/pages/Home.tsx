import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Zap } from 'lucide-react';
import { Button, StatsCard } from '../components/UI';
import { features, providers, testimonials } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { currency } from '../utils/helpers';

export default function Home() {
  const { user } = useApp();

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-[0.08]" />
        <div className="absolute inset-x-0 -top-40 mx-auto h-96 w-[80rem] rounded-full bg-brand-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="fade-in-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:border-brand-800 dark:bg-brand-900/30 dark:text-brand-300">
                <Zap className="h-3.5 w-3.5" /> New — Auto-pay & bill reminders
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
                Pay every utility bill in <span className="bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">under 30 seconds.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-slate-600 dark:text-slate-300">
                Electricity, water, gas, internet, TV — one secure wallet for all your monthly bills. Track every payment with receipts and smart analytics.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={user ? '/payment' : '/register'}>
                  <Button className="px-6 py-3 text-base">
                    Start paying for free <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="secondary" className="px-6 py-3 text-base">Explore services</Button>
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> No hidden fees</span>
                <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-brand-500" /> Bank-grade security</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Local Oyo State providers</span>
              </div>
            </div>

            {/* Hero card mock */}
            <div className="relative fade-in-up">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-400/30 to-brand-700/30 blur-2xl" />
              <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase text-slate-500">Wallet balance</p>
                    <p className="mt-1 font-display text-3xl font-extrabold text-slate-900 dark:text-white">{currency(user?.wallet ?? 485620)}</p>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg">
                    <Zap className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  {providers.slice(0, 4).map(p => (
                    <div key={p.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
                      <div className="flex items-center gap-3">
                        <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br text-lg text-white ${p.color}`}>
                          {p.logo}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{p.name}</p>
                          <p className="text-xs text-slate-500 capitalize">{p.category} · {p.region}</p>
                        </div>
                      </div>
                      <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-brand-600 shadow-sm dark:bg-slate-900 dark:text-brand-400">Pay</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-800 p-4 text-white">
                  <p className="text-xs uppercase tracking-wide opacity-80">Last payment</p>
                  <p className="mt-1 text-lg font-bold">IBEDC · ₦25,500</p>
                  <p className="text-xs opacity-70">Mar 14, 2026 · Success</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard title="Bills Paid" value="420K+" hint="This year" icon={<CheckCircle2 className="h-5 w-5" />} accent="emerald" />
          <StatsCard title="Happy Users" value="28K+" hint="Across Nigeria" icon={<Zap className="h-5 w-5" />} accent="brand" />
          <StatsCard title="Providers" value="8+" hint="Oyo State & beyond" icon={<Shield className="h-5 w-5" />} accent="violet" />
          <StatsCard title="Uptime" value="99.99%" hint="Enterprise SLA" icon={<CheckCircle2 className="h-5 w-5" />} accent="amber" />
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">Everything you need. Nothing you don't.</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">A carefully crafted set of features to make bill payment effortless.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map(f => (
            <div key={f.title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-2xl shadow-md">{f.icon}</div>
              <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-20 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">Pay a bill in 3 steps</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { n: '01', t: 'Pick a provider', d: 'Choose from verified Oyo State electricity, water, gas and internet providers.' },
              { n: '02', t: 'Enter details', d: 'Add your meter or customer ID, the amount, and verify in seconds.' },
              { n: '03', t: 'Pay securely', d: 'Use wallet or card. Get an instant receipt and transaction record.' },
            ].map(s => (
              <div key={s.n} className="relative rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
                <span className="font-display text-5xl font-extrabold text-brand-100 dark:text-brand-900/40">{s.n}</span>
                <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">{s.t}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">Loved by thousands</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map(t => (
            <div key={t.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-100 text-xl dark:bg-brand-900/30">{t.avatar}</div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">"{t.text}"</p>
              <div className="mt-3 text-amber-500">{'★★★★★'}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-indigo-700 p-10 text-white shadow-2xl sm:p-14">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Ready to stop worrying about due dates?</h2>
            <p className="mt-3 text-lg text-white/80">Join 180,000+ users paying bills smarter with PayG.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={user ? '/dashboard' : '/register'}>
                <Button className="bg-white !text-brand-700 hover:bg-slate-100">
                  Create free account <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary" className="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20">Talk to sales</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
