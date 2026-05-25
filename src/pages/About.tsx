import { Target, Heart, Users } from 'lucide-react';

export default function About() {
  const team = [
    { name: 'Sofia Alvarez', role: 'CEO & Co-founder', avatar: '👩‍💼' },
    { name: 'Raj Mehta',     role: 'CTO',              avatar: '👨‍💻' },
    { name: 'Emily Park',    role: 'Head of Product',  avatar: '👩‍🎨' },
    { name: 'Marcus Chen',   role: 'Head of Security', avatar: '🧑‍✈️' },
  ];
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">ABOUT PAYEASE</span>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-slate-900 sm:text-5xl dark:text-white">We're on a mission to kill late fees.</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          PayG started in 2022 when our founders missed three electricity bills in a row. Never again — for anyone.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          { icon: Target, t: 'Our Mission', d: 'Make utility payments so simple that no one ever misses a due date again.' },
          { icon: Heart,  t: 'Our Values',  d: 'Trust, transparency, and customer-first design in every product decision.' },
          { icon: Users,  t: 'Our People',  d: 'A local team of 60+ engineers, designers and support heroes based in Ibadan, Oyo State.' },
        ].map(c => (
          <div key={c.t} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <c.icon className="h-8 w-8 text-brand-600" />
            <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">{c.t}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{c.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <h2 className="text-center font-display text-3xl font-extrabold text-slate-900 dark:text-white">Meet the team</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map(m => (
            <div key={m.name} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-4xl text-white">{m.avatar}</div>
              <p className="mt-4 font-bold text-slate-900 dark:text-white">{m.name}</p>
              <p className="text-sm text-slate-500">{m.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 grid gap-10 rounded-3xl border border-slate-200 bg-white p-8 md:grid-cols-4 dark:border-slate-800 dark:bg-slate-900">
        {[
          ['28K+', 'Active users'],
          ['₦2.1T', 'Processed'],
          ['99.99%', 'Uptime'],
          ['4.9/5', 'App rating'],
        ].map(([v, l]) => (
          <div key={l} className="text-center">
            <p className="font-display text-3xl font-extrabold text-brand-600">{v}</p>
            <p className="mt-1 text-sm text-slate-500">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
