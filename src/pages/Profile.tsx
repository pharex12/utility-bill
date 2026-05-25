import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button, Input } from '../components/UI';
import { validateEmail } from '../utils/helpers';
import { Camera } from 'lucide-react';

export default function Profile() {
  const { user, updateProfile, pushToast } = useApp();
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });
  const [pwErrors, setPwErrors] = useState<Record<string, string>>({});

  if (!user) return null;

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (name.length < 2) errs.name = 'Enter your name.';
    if (!validateEmail(email)) errs.email = 'Enter a valid email.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    updateProfile({ name, email, phone });
    pushToast('success', 'Profile updated.');
  };

  const savePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (pw.current.length < 1) errs.current = 'Current password required.';
    if (pw.next.length < 6) errs.next = 'At least 6 characters.';
    if (pw.next !== pw.confirm) errs.confirm = 'Passwords do not match.';
    setPwErrors(errs);
    if (Object.keys(errs).length) return;
    setPw({ current: '', next: '', confirm: '' });
    pushToast('success', 'Password changed successfully.');
  };

  const avatarOptions = ['😀','🙂','😎','🤓','🧑‍💻','👨‍💼','👩‍💼','👩‍🎨','🧑‍🚀','🦸','🐼','🐱'];

  return (
    <div className="space-y-8 fade-in-up">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">Profile</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage your personal info and security settings.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Avatar card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-5xl text-white shadow-lg">
            {user.avatar}
          </div>
          <h3 className="mt-4 font-bold text-slate-900 dark:text-white">{user.name}</h3>
          <p className="text-sm text-slate-500">{user.email}</p>
          <p className="mt-1 text-xs text-slate-400">Member since {user.joined}</p>
          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase text-slate-500">Choose avatar</p>
            <div className="flex flex-wrap justify-center gap-2">
              {avatarOptions.map(a => (
                <button key={a} onClick={() => updateProfile({ avatar: a })}
                  className={`grid h-10 w-10 place-items-center rounded-full text-xl transition ${user.avatar === a ? 'bg-brand-100 ring-2 ring-brand-500 dark:bg-brand-900/40' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'}`}>
                  {a}
                </button>
              ))}
              <label className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border-2 border-dashed border-slate-300 text-slate-400 hover:text-brand-600">
                <Camera className="h-4 w-4" />
                <input type="file" className="hidden" onChange={() => pushToast('info', 'Upload simulated. Avatar picker used instead.')} />
              </label>
            </div>
          </div>
        </div>

        {/* Info form */}
        <form onSubmit={saveProfile} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Personal information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Full name" value={name} onChange={e => setName(e.target.value)} error={errors.name} />
            <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} error={errors.email} />
          </div>
          <Input label="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
          <Input label="User ID" value={user.id} disabled />
          <Button type="submit">Save changes</Button>
        </form>
      </div>

      {/* Password */}
      <form onSubmit={savePassword} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Change password</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Input label="Current password" type="password" value={pw.current} onChange={e => setPw({ ...pw, current: e.target.value })} error={pwErrors.current} />
          <Input label="New password" type="password" value={pw.next} onChange={e => setPw({ ...pw, next: e.target.value })} error={pwErrors.next} />
          <Input label="Confirm new password" type="password" value={pw.confirm} onChange={e => setPw({ ...pw, confirm: e.target.value })} error={pwErrors.confirm} />
        </div>
        <Button type="submit" className="mt-4">Update password</Button>
      </form>
    </div>
  );
}
