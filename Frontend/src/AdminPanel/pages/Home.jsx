import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Search, Crosshair, Brain, Eye, Activity, FlaskConical,
  Settings, HelpCircle, LogOut, 
  Share, MoreVertical, Zap, Lightbulb,
  Sparkles, Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WebGLBackground from '../../components/WebGLBackground';
import logoImg from '../../assets/logo2.png';

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Declare outside component so it resets on refresh but persists during SPA navigation
let hasSeenSplashGlobal = false;

const Landing = () => {
  const navigate = useNavigate();
  
  // Only show splash screen on initial page load (refresh), not on internal navigation
  const [showSplash] = React.useState(() => {
    if (!hasSeenSplashGlobal) {
      hasSeenSplashGlobal = true;
      return true;
    }
    return false;
  });

  return (
    <>
      {/* ─── SIMPLE FADE REVEAL (Only on initial load) ─── */}
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, pointerEvents: 'none' }}
          transition={{ delay: 2.0, duration: 1.0, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
        >
           <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative flex items-center justify-center"
           >
             {/* Subtle glow behind logo */}
             <div className="absolute w-32 h-32 bg-cyan-500/20 blur-[40px] rounded-full" />
             <img 
                src={logoImg} 
                alt="Core AI Logo" 
                className="w-32 h-32 object-contain drop-shadow-[0_0_30px_rgba(0,229,255,0.8)] relative z-10" 
             />
           </motion.div>
        </motion.div>
      )}

      {/* Main App Container */}
      <motion.div
        initial={showSplash ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={showSplash ? { duration: 1.2, delay: 2.4, ease: [0.25, 0.46, 0.45, 0.94] } : { duration: 0.4, ease: "easeOut" }}
        className="flex h-screen w-full bg-[#0a0a0a] text-[#ededed] font-sans overflow-hidden"
      >
      {/* ─── 3D PARTICLE BACKGROUND ─── */}
      <WebGLBackground />

      {/* ─── SIDEBAR ─── */}
      <motion.aside
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-64 flex-shrink-0 flex flex-col bg-[#0f0f0f]/80 backdrop-blur-sm border-r border-white/5 h-full p-4 overflow-y-auto hidden md:flex relative z-10"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-6 px-2">
          <img src={logoImg} alt="Logo" className="w-12 h-12 object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
          <span className="text-lg font-bold tracking-wide">Core AI</span>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Quantum Search"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-white/30"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
            <kbd className="text-[10px] text-white/30 font-sans px-1 py-0.5 bg-white/10 rounded">⌘</kbd>
            <kbd className="text-[10px] text-white/30 font-sans px-1 py-0.5 bg-white/10 rounded">K</kbd>
          </div>
        </div>

        {/* Primary Nav */}
        <nav className="flex flex-col gap-1 mb-8">
          <NavItem icon={<Sparkles className="w-4 h-4" />} label="Feature" onClick={() => navigate('/features')} />
          <NavItem icon={<Activity className="w-4 h-4" />} label="Performance" onClick={() => navigate('/performance')} />
          <NavItem icon={<Shield className="w-4 h-4" />} label="Security" onClick={() => navigate('/security')} />
        </nav>

        {/* History Area */}
        <div className="mb-6 flex-1">
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 px-2">History</h3>
          <div className="flex flex-col gap-1">
            <HistoryItem label="Welcome to Your Smart Finan..." />
            <HistoryItem label="This Is Where Intelligence Me..." />
            <HistoryItem label="Past Conversations, Future Cl..." />
            <HistoryItem label="Every Financial Query Logged..." />
            <HistoryItem label="Your AI Memory for Money, St..." />
            <HistoryItem label="Think of It as Your Digital Fina..." />
            <HistoryItem label="The Pulse of Your Financial Cu..." />
            <HistoryItem label="Your Thought Process, Captur..." />
            <HistoryItem label="This is More Than Just Chat: H..." />
            <HistoryItem label="Every Line You Typed, Now a..." />
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-1 pt-4 border-t border-white/10">
          <NavItem icon={<HelpCircle className="w-4 h-4" />} label="Help Center" />
          <NavItem icon={<Settings className="w-4 h-4" />} label="Settings" />
          <NavItem icon={<LogOut className="w-4 h-4" />} label="Log out" onClick={() => navigate('/login')} />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/pricing')}
            className="mt-4 flex items-center gap-2 bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/30 hover:border-primary/60 rounded-xl px-4 py-2.5 text-sm font-medium transition-all"
          >
            <Zap className="w-4 h-4 text-primary" />
            Unlimited Access
          </motion.button>
        </div>
      </motion.aside>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 flex flex-col relative overflow-hidden">

        {/* Cyan glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />

        {/* Top Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center justify-between p-4 z-10 relative"
        >
          <div className="flex items-center">
            <button className="md:hidden p-2 text-white/50 hover:text-white transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Center Space */}
          <div className="flex-1" />

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.08 }}
              className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors text-white/70 hover:text-white border border-white/5"
            >
              <Share className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors text-white/70 hover:text-white border border-white/5"
            >
              <MoreVertical className="w-4 h-4" />
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-blue-600 ml-2 cursor-pointer overflow-hidden border border-white/10"
              onClick={() => navigate('/home')}
            >
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </motion.header>

        {/* Center Container */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-4xl mx-auto w-full z-10">

          {/* Title Area */}
          <FadeIn className="flex flex-col items-center text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                Core AI
              </span>
            </h1>
            <p className="text-white/50 text-sm md:text-base max-w-2xl leading-relaxed">
              Introducing Core AI — an advanced AI built to challenge assumptions, generate
              fearless ideas, and help you think beyond the obvious. Fast. Bold. Unfiltered.
            </p>
          </FadeIn>

          {/* Input Area */}
          <FadeIn delay={0.15} className="w-full">
            <motion.div
              whileFocus={{ scale: 1.01 }}
              className="w-full bg-[#111111]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-4 shadow-2xl focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all"
            >
              <textarea
                rows={4}
                placeholder="Ask Anything..."
                className="w-full bg-transparent resize-none focus:outline-none text-white/90 placeholder:text-white/30 text-base"
              />

              {/* Input Pills */}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors border border-white/5">
                  <Settings className="w-4 h-4" />
                </button>
                <Pill icon={<Lightbulb className="w-3.5 h-3.5 text-amber-400" />} label="Think Bigger" />
                <Pill icon={<Search className="w-3.5 h-3.5 text-primary" />} label="Deep Search" />
                <Pill icon={<Activity className="w-3.5 h-3.5 text-yellow-400" />} label="Brainstorm Mode" />
                <Pill icon={<Crosshair className="w-3.5 h-3.5 text-red-400" />} label="Quick Fire" />
                <Pill icon={<Sparkles className="w-3.5 h-3.5 text-purple-400" />} label="Insight Generator" />
              </div>
            </motion.div>
          </FadeIn>

        </div>
      </main>
    </motion.div>
    </>
  );
};

// ─── HELPER COMPONENTS ───

const NavItem = ({ icon, label, onClick }) => (
  <motion.button
    whileHover={{ x: 4 }}
    onClick={onClick}
    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-colors w-full text-left"
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </motion.button>
);

const HistoryItem = ({ label }) => (
  <motion.button
    whileHover={{ x: 3 }}
    className="text-left px-3 py-2 text-[13px] text-white/50 hover:text-white hover:bg-white/5 rounded-lg truncate transition-colors"
  >
    {label}
  </motion.button>
);

const Pill = ({ icon, label }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.96 }}
    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-xs font-medium text-white/70 hover:text-white"
  >
    {icon}
    {label}
  </motion.button>
);

export default Landing;