import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const ScrollReveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Pricing = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isYearly, setIsYearly] = useState(false);

  const effectiveTheme = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      className="relative min-h-screen text-foreground py-20 px-6 md:px-12 overflow-hidden flex flex-col items-center"
      style={{ backgroundColor: effectiveTheme === 'dark' ? '#050505' : '#ffffff' }}
    >
      {/* Subtle Atmospheric glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] pointer-events-none z-0"
        style={{
          background: effectiveTheme === 'dark'
            ? 'radial-gradient(circle at top, rgba(120, 50, 255, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle at top, rgba(120, 50, 255, 0.08) 0%, transparent 70%)'
        }}
      />
      
      <div className="w-full max-w-5xl relative z-10">
        <button onClick={() => navigate(-1)} className="mb-16 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
      </div>

      <section className="relative w-full max-w-4xl mx-auto z-10 flex flex-col items-center">
        <div className="text-center mb-10 w-full">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Pricing that scales with you</h2>
            <p className="text-muted-foreground text-lg md:text-xl">Start for free, upgrade when you need more power.</p>
          </ScrollReveal>
        </div>

        {/* Billing Toggle */}
        <ScrollReveal delay={0.1} className="mb-14">
          <div className="flex items-center gap-3 bg-muted/40 p-1 rounded-full border border-border/50">
            <button 
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all active:scale-95 ${!isYearly ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 active:scale-95 ${isYearly ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              Yearly <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Save 20%</span>
            </button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* Free Tier */}
          <ScrollReveal delay={0.2}>
            <div className="h-full p-8 rounded-3xl bg-card/40 backdrop-blur-md border border-border/50 hover:border-border transition-colors flex flex-col relative overflow-hidden">
              <h3 className="text-xl font-medium mb-2 text-foreground/80">Free</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-semibold">$0</span>
                <span className="text-muted-foreground text-sm">/mo</span>
              </div>
              <p className="text-muted-foreground text-sm mb-8">For individuals exploring AI and building side projects.</p>
              
              <button className="w-full py-2.5 rounded-xl text-sm font-medium transition-all bg-muted text-foreground hover:bg-muted/80 mb-8">
                Current Plan
              </button>

              <div className="flex-1">
                <p className="text-sm font-medium mb-4 text-foreground/90">Everything you need to start:</p>
                <ul className="space-y-3.5">
                  {["100 messages per day", "Standard response speed", "Basic models access", "Community support"].map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-foreground/60 mt-0.5 shrink-0" strokeWidth={2} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Pro Tier */}
          <ScrollReveal delay={0.3}>
            <div className="h-full p-8 rounded-3xl bg-gradient-to-b from-card to-background border border-primary/30 shadow-[0_0_40px_rgba(120,50,255,0.08)] relative overflow-hidden flex flex-col group">
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-medium text-foreground flex items-center gap-2">
                  Pro <Sparkles className="w-4 h-4 text-primary" />
                </h3>
              </div>
              
              <div className="flex items-end gap-3 mb-1">
                <div className="flex items-baseline gap-1">
                  {isYearly && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xl font-medium text-muted-foreground line-through"
                    >
                      $20
                    </motion.span>
                  )}
                  <span className="text-4xl font-semibold">{isYearly ? '$16' : '$20'}</span>
                  <span className="text-muted-foreground text-sm">/mo</span>
                </div>
                {isYearly && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-1 bg-primary/15 text-primary text-xs font-semibold px-2.5 py-1 rounded-full border border-primary/20"
                  >
                    2 months free
                  </motion.span>
                )}
              </div>
              {isYearly ? (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-muted-foreground text-xs mb-4"
                >
                  Billed as <span className="text-foreground font-medium">$192/year</span>
                </motion.p>
              ) : (
                <p className="text-muted-foreground text-xs mb-4">Billed monthly, cancel anytime</p>
              )}
              <p className="text-muted-foreground text-sm mb-8">For professionals scaling AI usage and needing max performance.</p>
              
              <button className="w-full py-2.5 rounded-xl text-sm font-medium transition-all bg-foreground text-background hover:opacity-90 shadow-sm mb-8">
                Upgrade to Pro
              </button>

              <div className="flex-1">
                <p className="text-sm font-medium mb-4 text-foreground/90">Everything in Hobby, plus:</p>
                <ul className="space-y-3.5">
                  {["Unlimited messaging", "Fastest response times", "Access to Pro models (GPT-4, Claude 3)", "Priority email support", "API access"].map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" strokeWidth={2.5} />
                      <span className="text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  );
};

export default Pricing;
