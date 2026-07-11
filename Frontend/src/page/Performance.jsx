import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, ArrowLeft } from 'lucide-react';
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

const Performance = () => {
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
      <section className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Blazing Fast Performance.</h2>
            <p className="text-muted-foreground text-lg mb-8">Engineered for speed, our platform delivers sub-millisecond latency. Watch the metrics soar.</p>
            <div className="space-y-6">
              {[
                { label: "API Response Time", value: "12ms", percent: 95 },
                { label: "Uptime", value: "99.99%", percent: 100 },
                { label: "Data Throughput", value: "10GB/s", percent: 85 }
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span>{stat.label}</span>
                    <span className="text-cyan-400">{stat.value}</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stat.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.2 * idx, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
        <div className="flex-1 relative">
          <ScrollReveal delay={0.3} className="relative w-full aspect-square flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-64 h-64 border-4 border-dashed border-cyan-500/50 rounded-full flex items-center justify-center"
            >
              <Zap className="w-24 h-24 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  );
};

export default Performance;
