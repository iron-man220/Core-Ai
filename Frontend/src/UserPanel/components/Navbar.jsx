import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../../components/ThemeToggle';
import logoImg from '../../assets/logo2.png';

export const UserNavbar = () => {
  const location = useLocation();

  const navLinks = [
    { label: 'Chat', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 text-xl font-bold text-gradient">
            <img src={logoImg} alt="Logo" className="w-12 h-12 object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
            <span>Core AI</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium transition-colors hover:text-primary hidden sm:block">
              Sign In
            </Link>
            <Link to="/signup" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">
              Sign Up
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};
