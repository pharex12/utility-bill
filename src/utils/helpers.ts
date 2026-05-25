export const currency = (n: number) =>
  '₦' + n.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const formatDateTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit'
  });
};

export const makeRef = () =>
  'PAY-' + Math.random().toString(36).substring(2, 8).toUpperCase();

export const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

export const validateEmail = (v: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export const validateCard = (v: string) =>
  v.replace(/\s/g, '').length >= 13 && v.replace(/\s/g, '').length <= 19 && /^\d+$/.test(v.replace(/\s/g, ''));

export const classNames = (...xs: (string | false | null | undefined)[]) =>
  xs.filter(Boolean).join(' ');
