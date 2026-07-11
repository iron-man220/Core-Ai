import React from 'react';
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
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors w-full ${
        isActive
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

const SidebarContent = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-border">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 flex-shrink-0">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-sidebar-hover px-2 py-1.5 rounded-xl transition-colors -ml-2">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <span className="text-lg font-medium text-foreground">Gemini</span>
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
          onClick={() => { navigate('/dashboard/settings'); onClose?.(); }}
          className="flex items-center gap-3 w-full px-2 py-2 rounded-2xl hover:bg-sidebar-hover transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-[#009de0] flex items-center justify-center text-white font-medium text-[15px] flex-shrink-0">
            J
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-[13px] font-medium text-foreground truncate uppercase">BHUVA JEEL MAGANBHAI</p>
            <p className="text-[11px] text-muted-foreground">Pro</p>
          </div>
          <Settings className="w-4 h-4 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </div>
  );
};

export const AiSidebar = ({ mobileOpen, onClose }) => {
  return (
    <>
      {/* Desktop Sidebar — always visible on lg+ */}
      <div className="hidden lg:flex w-64 flex-shrink-0 h-full">
        <SidebarContent />
      </div>

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
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-64 z-50 lg:hidden"
            >
              <SidebarContent onClose={onClose} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
