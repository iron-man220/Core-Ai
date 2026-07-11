import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
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

const Security = () => {
  const navigate = useNavigate();
  return (
    <motion.div 
      initial={{ opacity: 0, filter: 'blur(20px)' }} 
      animate={{ opacity: 1, filter: 'blur(0px)' }} 
      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative min-h-screen bg-background text-foreground py-20 px-6 md:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 pointer-events-none" />
      <button onClick={() => navigate(-1)} className="relative z-10 mb-12 flex items-center gap-2 hover:text-primary transition-colors font-medium">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>
      <section className="relative max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="flex-1 relative">
          <ScrollReveal className="relative w-full aspect-square flex items-center justify-center">
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Shield className="w-40 h-40 text-violet-500 drop-shadow-[0_0_30px_rgba(139,92,246,0.6)]" />
            </motion.div>
            {/* Animated rings */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1.5, opacity: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute w-40 h-40 border border-violet-500/50 rounded-full"
            />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 2, opacity: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              className="absolute w-40 h-40 border border-violet-500/30 rounded-full"
            />
          </ScrollReveal>
        </div>
        <div className="flex-1">
          <ScrollReveal delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Fort Knox Security.</h2>
            <p className="text-muted-foreground text-lg mb-6">Your data is encrypted at rest and in transit. We employ military-grade security protocols to ensure complete privacy and compliance.</p>
            <ul className="space-y-4">
              {['AES-256 Encryption', 'SOC2 Type II Certified', 'Zero-Knowledge Architecture', '24/7 Threat Monitoring'].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-violet-400" />
                  </div>
                  <span className="font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  );
};

export default Security;
