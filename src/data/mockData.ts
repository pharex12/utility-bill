export type BillCategory = 'electricity' | 'water' | 'gas' | 'internet' | 'tv';

export interface Provider {
  id: string;
  name: string;
  category: BillCategory;
  logo: string;
  color: string;
  fieldLabel: string;
  fieldPlaceholder: string;
  region: string;
}

export interface Transaction {
  id: string;
  user: string;
  provider: string;
  category: BillCategory;
  account: string;
  amount: number;
  status: 'success' | 'pending' | 'failed';
  date: string; // ISO
  reference: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  wallet: number;
  joined: string;
  role: 'user' | 'admin';
}

export const providers: Provider[] = [
  { id: 'p1', name: 'IBEDC',                          category: 'electricity', logo: '⚡', color: 'from-amber-400 to-orange-500',   fieldLabel: 'Meter Number',  fieldPlaceholder: 'e.g. 45101234567', region: 'Ibadan, Oyo State' },
  { id: 'p2', name: 'IBEDC Prepaid Services',         category: 'electricity', logo: '💡', color: 'from-yellow-400 to-amber-500',   fieldLabel: 'Meter Number',  fieldPlaceholder: 'e.g. 01456789012', region: 'Oyo State' },
  { id: 'p3', name: 'Oyo State Water Corporation',    category: 'water',       logo: '💧', color: 'from-sky-400 to-blue-600',       fieldLabel: 'Customer ID',   fieldPlaceholder: 'e.g. OYSWC-IB-44821', region: 'Ibadan, Oyo State' },
  { id: 'p4', name: 'Ibadan Water Board',             category: 'water',       logo: '🌊', color: 'from-cyan-400 to-blue-500',      fieldLabel: 'Customer ID',   fieldPlaceholder: 'e.g. IWB-204571', region: 'Ibadan, Oyo State' },
  { id: 'p5', name: 'NIPCO Gas',                      category: 'gas',         logo: '🔥', color: 'from-red-400 to-rose-600',       fieldLabel: 'Account ID',    fieldPlaceholder: 'e.g. NIP-IB-8834', region: 'Ibadan, Oyo State' },
  { id: 'p6', name: 'FibreOne Broadband',             category: 'internet',    logo: '📡', color: 'from-violet-500 to-indigo-600',  fieldLabel: 'Subscriber ID', fieldPlaceholder: 'e.g. FB-IB-20495', region: 'Ibadan, Oyo State' },
  { id: 'p7', name: 'GOtv Nigeria',                   category: 'tv',          logo: '📺', color: 'from-emerald-400 to-teal-600',   fieldLabel: 'IUC Number',    fieldPlaceholder: 'e.g. 7045612389', region: 'Nationwide' },
  { id: 'p8', name: 'Spectranet 4G',                  category: 'internet',    logo: '📶', color: 'from-orange-500 to-red-500',     fieldLabel: 'Subscriber ID', fieldPlaceholder: 'e.g. SPN-IB-11245', region: 'Ibadan, Oyo State' },
];

export const seedTransactions: Transaction[] = [
  { id: 't1', user: 'U-1001', provider: 'IBEDC',                       category: 'electricity', account: '45101234567', amount: 25500,  status: 'success', date: '2026-03-14T09:22:10Z', reference: 'PAY-29384A' },
  { id: 't2', user: 'U-1001', provider: 'Oyo State Water Corporation', category: 'water',       account: 'OYSWC-IB-44821', amount: 8400,  status: 'success', date: '2026-03-10T14:05:44Z', reference: 'PAY-29355B' },
  { id: 't3', user: 'U-1001', provider: 'FibreOne Broadband',          category: 'internet',    account: 'FB-IB-20495',   amount: 18500, status: 'success', date: '2026-03-02T11:30:00Z', reference: 'PAY-29201C' },
  { id: 't4', user: 'U-1001', provider: 'NIPCO Gas',                   category: 'gas',         account: 'NIP-IB-8834',   amount: 15750, status: 'failed',  date: '2026-02-25T18:12:22Z', reference: 'PAY-29112D' },
  { id: 't5', user: 'U-1001', provider: 'IBEDC Prepaid Services',      category: 'electricity', account: '01456789012',   amount: 12200, status: 'success', date: '2026-02-18T08:45:00Z', reference: 'PAY-28997E' },
  { id: 't6', user: 'U-1001', provider: 'GOtv Nigeria',                category: 'tv',          account: '7045612389',    amount: 6500,  status: 'pending', date: '2026-02-10T20:00:00Z', reference: 'PAY-28800F' },
];

export const seedUsers: AppUser[] = [
  { id: 'U-1001', name: 'Alex Morgan',  email: 'alex@payg.lcu',   phone: '+234 803 555 0142', avatar: '👤', wallet: 485620, joined: '2024-11-02', role: 'user' },
  { id: 'U-1002', name: 'Priya Shah',   email: 'priya@payg.lcu',  phone: '+234 805 555 0188', avatar: '👩', wallet: 320000, joined: '2025-01-15', role: 'user' },
  { id: 'U-1003', name: 'Marcus Chen',  email: 'marcus@payg.lcu', phone: '+234 806 555 0199', avatar: '🧑', wallet: 145000, joined: '2025-02-04', role: 'user' },
  { id: 'U-1004', name: 'Sofia Alvarez',email: 'sofia@payg.lcu',  phone: '+234 809 555 0211', avatar: '👱‍♀️', wallet: 1250000, joined: '2024-08-20', role: 'admin' },
  { id: 'U-1005', name: 'Noah Bennett', email: 'noah@payg.lcu',   phone: '+234 812 555 0225', avatar: '🧔', wallet: 42500,  joined: '2025-05-11', role: 'user' },
];

export const monthlySpend = [
  { month: 'Oct', amount: 65000 },
  { month: 'Nov', amount: 78000 },
  { month: 'Dec', amount: 72000 },
  { month: 'Jan', amount: 95000 },
  { month: 'Feb', amount: 115000 },
  { month: 'Mar', amount: 108000 },
];

export const categoryBreakdown = [
  { name: 'Electricity', value: 48, color: '#f59e0b' },
  { name: 'Water',       value: 18, color: '#0ea5e9' },
  { name: 'Internet',    value: 20, color: '#8b5cf6' },
  { name: 'Gas',         value: 9,  color: '#ef4444' },
  { name: 'TV',          value: 5,  color: '#10b981' },
];

export const testimonials = [
  { name: 'Bukola Adeyemi', role: 'Boutique Owner, Bodija',   text: 'PayG saved me from NEPA disconnections. I top up my IBEDC meter every month without stress.', avatar: '🙋‍♀️' },
  { name: 'Tunde Olatunji', role: 'Lecturer, University of Ibadan', text: 'The transaction history and receipts are perfect for my records. No wahala at all.', avatar: '🧑‍🏫' },
  { name: 'Chioma Nwosu',   role: 'Software Engineer, Ring Road', text: 'Clean UI, fast payments. Exactly the kind of app we need for Ibadan.', avatar: '👩‍💻' },
];

export const features = [
  { icon: '🔒', title: 'Bank-Grade Security', text: '256-bit encryption and tokenized payments keep your data safe at every step.' },
  { icon: '⚡', title: 'Instant Payments',   text: 'Bills settle in under 5 seconds. No more disconnections or late fees.' },
  { icon: '📊', title: 'Smart Analytics',    text: 'Track spending trends across utilities with clear, visual insights.' },
  { icon: '🔔', title: 'Bill Reminders',     text: 'Get gentle reminders before due dates so you never miss a payment.' },
  { icon: '💳', title: 'Multiple Methods',   text: 'Pay with card, wallet, bank transfer or USSD — whatever suits you.' },
  { icon: '🌍', title: 'Local Providers',    text: 'IBEDC, OYSWC, NIPCO, FibreOne, GOtv and more — all in one place.' },
];
