import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, Image as ImageIcon, Video, BookOpen,
  NotebookPen, Settings, Sparkles, X, Zap, PanelLeftClose, SquarePen, Pin
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo2.png';

const recentChats = [
  'CoreAi',
  'Glass Orange Slicing Video Generation',
  'Building a Chrome Extension',
  'App Review Generation',
  'Remove Google Account From Browser',
  'App Review Generation for Daily Chaian',
  'यह तो बेहतरीन बात है भाई',
  'Ward No. 17 Contact List',
  'Extracting Phone Numbers from PDF',
  'Give me Best and professional resume...',
];

const NavItem = ({ icon: Icon, label, path, badge, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors w-full ${isActive
        ? 'bg-primary/15 text-primary'
        : 'text-muted-foreground hover:bg-sidebar-hover hover:text-foreground'
        }`}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="text-[10px] font-bold bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full leading-none">
          {badge}
        </span>
      )}
    </Link>
  );
};

const SidebarContent = ({ onClose, onToggleDesktop }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileName, setProfileName] = useState('CORE AI USER');
  const [profileEmail, setProfileEmail] = useState('Free Plan');
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const loadUserData = () => {
      const storedUserStr = localStorage.getItem('user');
      if (storedUserStr) {
        try {
          const userObj = JSON.parse(storedUserStr);
          if (userObj.firstName && userObj.lastName) {
            setProfileName(`${userObj.firstName} ${userObj.lastName}`.toUpperCase());
          } else if (userObj.username) {
            setProfileName(userObj.username.toUpperCase());
          }

          if (userObj.email) {
            setProfileEmail(userObj.email);
          } else if (userObj.email_id) {
            setProfileEmail(userObj.email_id);
          }

          if (userObj.profilePicture) {
            setProfilePicture(userObj.profilePicture);
          } else {
            setProfilePicture(null);
          }
        } catch (err) {}
      }
    };

    loadUserData();
    window.addEventListener('profilePictureUpdated', loadUserData);
    return () => window.removeEventListener('profilePictureUpdated', loadUserData);
  }, []);

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-border">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 flex-shrink-0">
        <div 
          onClick={() => {
            navigate('/dashboard');
            onClose?.();
          }}
          className="flex items-center gap-2 cursor-pointer hover:bg-sidebar-hover px-2 py-1.5 rounded-xl transition-colors -ml-2"
        >
          <img 
            src="/logo.png" 
            alt="Core AI Logo" 
            className="h-6 w-auto object-contain dark:brightness-0 dark:invert transition-all" 
          />
          <span className="text-[17px] font-semibold text-foreground tracking-wide">CORE AI</span>
        </div>
        <div className="flex items-center gap-1">
          {onClose ? (
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-sidebar-hover text-muted-foreground hover:text-foreground transition-colors lg:hidden"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          ) : (
            <button
              onClick={onToggleDesktop}
              className="p-2 rounded-full hover:bg-sidebar-hover text-muted-foreground hover:text-foreground transition-colors"
            >
              <PanelLeftClose className="w-5 h-5" strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>

      {/* New Chat item */}
      <div className="px-3 pb-3 pt-2 flex-shrink-0">
        <button
          onClick={() => { navigate('/dashboard'); onClose?.(); }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium transition-colors bg-sidebar-hover hover:bg-sidebar-hover/80 text-foreground w-fit"
        >
          <SquarePen className="w-4 h-4" strokeWidth={1.5} />
          <span>New chat</span>
        </button>
      </div>

      {/* Search */}
      <div className="px-3 pb-2 flex-shrink-0">
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-full hover:bg-sidebar-hover text-muted-foreground hover:text-foreground transition-colors text-sm">
          <Search className="w-4 h-4" strokeWidth={1.5} />
          <span>Search chats</span>
        </button>
      </div>

      <div className="h-px bg-border mx-3 my-1 flex-shrink-0" />

      {/* Main Nav */}
      <nav className="px-3 py-2 space-y-0.5 flex-shrink-0">
        <NavItem icon={ImageIcon} label="Images" path="/dashboard/images" badge="New" onClick={onClose} />
        <NavItem icon={Video} label="Videos" path="/dashboard/videos" onClick={onClose} />
        <NavItem icon={BookOpen} label="Library" path="/dashboard/library" onClick={onClose} />
      </nav>

      <div className="h-px bg-border mx-3 my-1 flex-shrink-0" />

      {/* Notebooks */}
      <div className="px-3 py-2 flex-shrink-0">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
          Notebooks
        </p>
        <button
          onClick={() => { navigate('/dashboard/notebooks'); onClose?.(); }}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm text-muted-foreground hover:bg-sidebar-hover hover:text-foreground transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New notebook</span>
        </button>
        <NavItem icon={NotebookPen} label="My Notebooks" path="/dashboard/notebooks" onClick={onClose} />
      </div>

      <div className="h-px bg-border mx-3 my-1 flex-shrink-0" />

      {/* Recents */}
      <div className="px-3 py-2 flex-1 overflow-y-auto min-h-0">
        <p className="text-[11px] font-medium text-muted-foreground mb-2 px-3">
          Recents
        </p>
        <div className="space-y-0.5">
          {recentChats.map((title, i) => (
            <div key={i} className="group relative">
              <motion.button
                whileHover={{ x: 2 }}
                className="w-full text-left px-3 py-2 rounded-xl text-[13px] text-foreground hover:bg-sidebar-hover transition-colors truncate pr-8"
              >
                {title}
              </motion.button>
              {i === 0 && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Pin className="w-3.5 h-3.5 text-foreground rotate-45" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade Banner */}
      <div className="px-3 py-2 flex-shrink-0">
        <button
          onClick={() => navigate('/pricing')}
          className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-medium border border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 text-primary transition-all"
        >
          <Zap className="w-4 h-4" />
          Unlimited Access
        </button>
      </div>

      {/* User Profile */}
      <div className="px-3 py-3 flex-shrink-0">
        <button
          onClick={() => { navigate('/dashboard/profile'); onClose?.(); }}
          className="flex items-center gap-3 w-full px-2 py-2 rounded-2xl hover:bg-sidebar-hover transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 p-[2px] shadow-sm flex-shrink-0">
            {profilePicture ? (
              <img 
                src={profilePicture} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover border-2 border-transparent bg-card"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-card border-2 border-transparent flex items-center justify-center">
                <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-blue-500">
                  {profileName.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col text-left overflow-hidden">
            <p className="text-[13px] font-medium text-foreground truncate uppercase">{profileName}</p>
            <span className="text-[10px] text-muted-foreground font-medium tracking-wide mt-0.5 truncate">{profileEmail}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export const AiSidebar = ({ mobileOpen, onClose, desktopOpen, onToggleDesktop }) => {
  return (
    <>
      {/* Desktop Sidebar — visible on lg+ when desktopOpen is true */}
      <AnimatePresence initial={false}>
        {desktopOpen && (
          <motion.div
            id="ai-desktop-sidebar"
            initial={{ width: 0 }}
            animate={{ width: 256 }}
            exit={{ width: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:flex h-full flex-shrink-0 overflow-hidden"
          >
            <motion.div
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-64 h-full flex-shrink-0"
            >
              <SidebarContent onClose={null} onToggleDesktop={onToggleDesktop} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar — overlay drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: -280, opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{
                duration: 0.38,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="fixed left-0 top-0 bottom-0 w-64 z-50 lg:hidden"
            >
              <SidebarContent onClose={onClose} onToggleDesktop={null} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
