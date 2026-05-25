import { Link } from 'react-router-dom';
import { Button } from '../components/UI';
import { features } from '../data/mockData';

export default function Services() {
  const services = [
    { icon: '⚡', title: 'Electricity', desc: 'Instant top-ups for prepaid meters and postpaid bills across all major grids.' },
    { icon: '💧', title: 'Water', desc: 'Pay your monthly water bill and never worry about disconnections.' },
    { icon: '🔥', title: 'Gas', desc: 'Natural gas and LPG cylinder bookings delivered to your doorstep.' },
    { icon: '📡', title: 'Internet', desc: 'Fiber, broadband, and mobile data top-ups from every major ISP.' },
    { icon: '📺', title: 'TV & Streaming', desc: 'Cable, DTH and OTT subscriptions renewed in seconds.' },
    { icon: '📱', title: 'Mobile Recharge', desc: 'Prepaid plans, postpaid bills and data packs from all carriers.' },
  ];
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">OUR SERVICES</span>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-slate-900 sm:text-5xl dark:text-white">One app. Every bill.</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">PayG supports all major utility categories with verified providers nationwide.</p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(s => (
          <div key={s.title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-3xl text-white shadow-md">{s.icon}</div>
            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{s.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{s.desc}</p>
            <Link to="/payment" className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:underline">Pay now →</Link>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <h2 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Why PayG?</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {features.slice(0, 3).map(f => (
            <div key={f.title} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="text-2xl">{f.icon}</div>
              <h4 className="mt-2 font-bold text-slate-900 dark:text-white">{f.title}</h4>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{f.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-white sm:p-12">
        <h2 className="font-display text-3xl font-extrabold">Not sure which service fits?</h2>
        <p className="mt-2 text-white/80">Our support team is available 24/7 to help you choose the right plan.</p>
        <div className="mt-5 flex gap-3">
          <Link to="/contact"><Button className="bg-white !text-brand-700">Contact us</Button></Link>
          <Link to="/register"><Button variant="secondary" className="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20">Get started</Button></Link>
        </div>
      </div>
    </div>
  );
}
