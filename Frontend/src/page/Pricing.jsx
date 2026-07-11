import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ScrollReveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Pricing = () => {
  const navigate = useNavigate();
  return (
    <motion.div 
      initial={{ opacity: 0, filter: 'blur(20px)' }} 
      animate={{ opacity: 1, filter: 'blur(0px)' }} 
      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative min-h-screen bg-background text-foreground py-20 px-6 md:px-12 overflow-hidden"
    >
<<<<<<< HEAD
=======
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 pointer-events-none" />
>>>>>>> 715814d4b475b37fb9e9e7efd451d8e255bd22cb
      <button onClick={() => navigate(-1)} className="relative z-10 mb-12 flex items-center gap-2 hover:text-primary transition-colors font-medium">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>
      <section className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Transparent Pricing.</h2>
            <p className="text-muted-foreground text-lg">Choose the perfect plan for your needs. No hidden fees.</p>
          </ScrollReveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {[
            { name: "Starter", price: "Free", desc: "Perfect for individuals.", features: ["Up to 1,000 queries/mo", "Basic Support", "Standard Speed"] },
            { name: "Pro", price: "$49/mo", desc: "For professionals and small teams.", popular: true, features: ["Unlimited queries", "Priority Support", "Lightning Speed", "Advanced Analytics"] },
            { name: "Enterprise", price: "Custom", desc: "For large scale organizations.", features: ["Dedicated Infrastructure", "24/7 Phone Support", "Custom Integrations", "SLA Guarantee"] }
          ].map((plan, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className={plan.popular ? "md:-mt-8 md:mb-8 z-10" : "z-0"}>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className={`p-8 rounded-3xl relative overflow-hidden transition-all duration-300 ${plan.popular ? 'bg-gradient-to-b from-card to-card/50 border border-cyan-500 shadow-[0_0_30px_rgba(34,211,238,0.2)]' : 'bg-card/50 border border-border/50 hover:border-border'}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
                )}
                {plan.popular && (
                  <span className="absolute top-4 right-4 bg-cyan-500/20 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Popular</span>
                )}
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <div className="text-4xl font-black mb-2">{plan.price}</div>
                <p className="text-muted-foreground text-sm mb-6 pb-6 border-b border-border/50">{plan.desc}</p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.popular ? 'bg-foreground text-background hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-muted text-foreground hover:bg-muted/80'}`}
                >
                  {plan.popular ? 'Get Started' : 'Learn More'}
                </motion.button>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Pricing;
