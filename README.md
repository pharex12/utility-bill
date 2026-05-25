# PayG — Utility Bill Payment Platform

> © 2026 PayG LCU. We don finish. Built because we can't fail.

A production-grade, fully-responsive utility bill payment web application built with **React 18 + TypeScript + Vite + Tailwind CSS**.

PayG lets users pay electricity, water, gas, internet and TV bills from a single modern dashboard with wallet support, card payments, transaction history, receipts, analytics and a dedicated admin panel.

---

## 🚀 Features

### Authentication
- Login / Registration with validation
- "Remember me" via `localStorage`
- Logout & protected routes
- Redirects back to intended page after login

### Dashboard
- Wallet balance, total spent, monthly totals
- Recent transactions feed
- Quick-pay shortcuts
- Area chart (monthly spending) + Pie chart (category breakdown)

### Bill Payments
- 8 realistic providers across 5 categories
- 3-step flow: pick provider → enter details → pay
- Payment gateway simulation (wallet + card)
- Card number formatting, CVC, expiry validation
- Simulated API delay + occasional failure handling
- Success modal with reference number

### Transactions
- Full history with search + status + category filters
- Status badges (success / pending / failed)
- Receipt modal + downloadable `.txt` receipts
- Empty states

### Profile & Settings
- Edit personal info + avatar picker
- Change password UI
- Theme toggle (light/dark)
- Notification & 2FA toggles
- Currency preferences
- Danger zone (account deletion)

### Admin Panel
- Platform analytics (users, transactions, revenue, success rate)
- Daily revenue bar chart
- Manage users, transactions and providers
- Protected route (admin role only — log in as `sofia@payg.lcu`)

### Pages
- Home (hero, stats, features, how-it-works, testimonials, CTA)
- Services · About · Contact (with validated form)
- Global Search (`Ctrl/Cmd + K`)
- Custom 404 page

### UI / UX
- Sticky navbar + mobile drawer
- Sidebar dashboard navigation
- Footer
- Toasts, modals, loaders, skeletons
- Dark/light mode (persisted)
- Fully responsive (mobile → desktop)
- Smooth fade/slide animations
- Inter + Plus Jakarta Sans typography

---

## 🧰 Tech Stack

| Layer        | Tech |
|--------------|------|
| Framework    | React 18 + TypeScript |
| Build        | Vite |
| Styling      | Tailwind CSS v4 |
| Routing      | React Router DOM v7 |
| State        | React Context API + `useState`/`useEffect` |
| Persistence  | `localStorage` |
| Charts       | Recharts |
| Icons        | Lucide React |
| Forms        | Native with custom validation |

---

## 📁 Folder Structure

```
src/
├── components/        # Navbar, Footer, Sidebar, UI.tsx, PaymentForm, TransactionTable, ProtectedRoute
├── pages/             # Home, Auth, Dashboard, Payment, Transactions, Profile, Settings, Admin, Services, About, Contact, Search, NotFound
├── context/           # AppContext (auth, users, transactions, theme, toasts)
├── data/              # mockData.ts (providers, transactions, users, chart data)
├── utils/             # helpers (currency, dates, validators)
├── App.tsx            # Router configuration
├── main.tsx           # Entry point
└── index.css          # Tailwind + theme + animations
```

---

## 🏁 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## 🔑 Demo Accounts

| Email                | Password   | Role  |
|----------------------|------------|-------|
| `alex@payg.lcu`    | any        | User  |
| `sofia@payg.lcu`   | any        | Admin |

---

## 🧪 Testing the Flow

1. Visit `/` → click **Get started**
2. Sign in as `alex@payg.lcu` (any password)
3. Land on Dashboard → click **Pay a bill**
4. Pick a provider → enter account + amount → pay via Wallet or Card
5. Check Transactions page for the new record and download a receipt
6. Visit `/admin` while signed in as `sofia@payg.lcu` for analytics

---

## 📦 Build

```bash
npm run build
```

Outputs a single `dist/index.html` (inlined bundle) ready to deploy anywhere.

---

Built with ♥ for modern fintech experiences.
