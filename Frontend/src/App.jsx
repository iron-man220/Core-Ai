import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ─── Context Providers ────────────────────────────────────
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

// ─── Shared Components ────────────────────────────────────
import { Toaster } from './components/Toaster';

// ─── Root Pages (src/page) ────────────────────────────────
import { Home } from './page/LendingPage';
import Landing from './AdminPanel/pages/Home';
import Features from './page/Features';
import Performance from './page/Performance';
import Security from './page/Security';
import Pricing from './page/Pricing';

// ─── Auth Pages ───────────────────────────────────────────
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';

// ─── UserPanel Pages ──────────────────────────────────────
import { UserLayout } from './UserPanel/components/UserLayout';
import { Shop } from './UserPanel/pages/Shop';
import { About } from './UserPanel/pages/About';
import { Contact } from './UserPanel/pages/Contact';

// ─── AdminPanel Pages ─────────────────────────────────────
import { AdminLayout } from './AdminPanel/components/AdminLayout';
import { Dashboard }  from './AdminPanel/pages/Dashboard';
import { Products }   from './AdminPanel/pages/Products';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="awd-ui-theme">
      <ToastProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Routes>
              {/* ── Standalone Pages ── */}
              <Route path="/dashboard" element={<Landing />} />
              <Route path="/features" element={<Features />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/security" element={<Security />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              {/* ── User Panel (with Header & Footer) ─── */}
              <Route element={<UserLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Route>

              {/* ── Admin Panel (with Sidebar & Header) ── */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<Products />} />
              </Route>
            </Routes>
          </div>
        </Router>

        {/* Global Toaster */}
        <Toaster />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
