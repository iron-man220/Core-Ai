import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Shield, Brain, Code, Layers, Globe, ArrowLeft } from 'lucide-react';
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

const Features = () => {
  const navigate = useNavigate();
  const features = [
    { icon: <Zap className="w-6 h-6" />, title: 'Lightning Fast', desc: 'Sub-second inference powered by next-gen architecture.' },
    { icon: <Shield className="w-6 h-6" />, title: 'Enterprise Secure', desc: 'End-to-end encryption. Your privacy, guaranteed.' },
    { icon: <Brain className="w-6 h-6" />, title: 'Deep Reasoning', desc: 'Multi-step logical analysis for complex problems.' },
    { icon: <Code className="w-6 h-6" />, title: 'Code Generation', desc: 'Write, debug, and optimize code flawlessly.' },
    { icon: <Layers className="w-6 h-6" />, title: 'Multi-Modal', desc: 'Process text, images, documents, and data seamlessly.' },
    { icon: <Globe className="w-6 h-6" />, title: '100+ Languages', desc: 'Communicate naturally in any language.' },
  ];

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
        <ScrollReveal className="mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Uncompromising power.</h2>
          <p className="text-muted-foreground text-lg">Everything you need, beautifully integrated.</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div 
                whileHover={{ scale: 1.05, y: -10 }} 
                className="p-8 rounded-3xl bg-card border border-border/50 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
              >
                <div className="text-blue-500 mb-6 bg-blue-500/10 w-12 h-12 flex items-center justify-center rounded-2xl">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Features;
