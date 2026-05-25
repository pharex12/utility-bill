import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { DashboardLayout, PublicLayout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';

import Home from './pages/Home';
import { Login, Register } from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Payment from './pages/Payment';
import Transactions from './pages/Transactions';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Admin from './pages/Admin';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Search from './pages/Search';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/search" element={<PublicLayout><Search /></PublicLayout>} />
          <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
          <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
          <Route path="/404" element={<PublicLayout><NotFound /></PublicLayout>} />

          {/* Protected dashboard */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><DashboardLayout><Payment /></DashboardLayout></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><DashboardLayout><Transactions /></DashboardLayout></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><DashboardLayout><Profile /></DashboardLayout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><DashboardLayout><Settings /></DashboardLayout></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute adminOnly><DashboardLayout><Admin /></DashboardLayout></ProtectedRoute>} />

          {/* Fallbacks */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
