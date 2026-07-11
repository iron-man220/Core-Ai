import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ─── Context Providers ────────────────────────────────────
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

// ─── Shared Components ────────────────────────────────────
import { Toaster } from './components/Toaster';

// ─── Root Pages (src/page) ────────────────────────────────
import { Home } from './page/LendingPage';
import Landing from './Dashboard/pages/Home';
import { ImagesPage } from './Dashboard/pages/ImagesPage';
import { VideosPage } from './Dashboard/pages/VideosPage';
import { LibraryPage } from './Dashboard/pages/LibraryPage';
import { NotebooksPage } from './Dashboard/pages/NotebooksPage';
import { SettingsPage } from './Dashboard/pages/SettingsPage';
import { AiLayout } from './Dashboard/components/AiLayout';
import Features from './page/Features';
import Performance from './page/Performance';
import Security from './page/Security';
import Pricing from './page/Pricing';

// ─── Auth Pages ───────────────────────────────────────────
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';

// ─── UserPanel Pages ──────────────────────────────────────
import { UserLayout } from './components/UserLayout';
import { Shop } from './page/Shop';
import { About } from './page/About';
import { Contact } from './page/Contact';

// ─── AdminPanel Pages ─────────────────────────────────────
import { AdminLayout } from './Dashboard/components/AdminLayout';
import { Dashboard }  from './Dashboard/pages/Dashboard';
import { Products }   from './Dashboard/pages/Products';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="awd-ui-theme">
      <ToastProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Routes>
              {/* ── Standalone Pages ── */}
              <Route path="/features" element={<Features />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/security" element={<Security />} />
              <Route path="/pricing" element={<Pricing />} />

              {/* ── AI Dashboard (Gemini-style) ── */}
              <Route path="/dashboard" element={<AiLayout />}>
                <Route index element={<Landing />} />
                <Route path="images" element={<ImagesPage />} />
                <Route path="videos" element={<VideosPage />} />
                <Route path="library" element={<LibraryPage />} />
                <Route path="notebooks" element={<NotebooksPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              {/* ── User Panel (with Header & Footer) ─── */}
              <Route element={<UserLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/features" element={<Features />} />
                <Route path="/performance" element={<Performance />} />
                <Route path="/security" element={<Security />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
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
