import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

/**
 * Home — root landing page (src/page/Home.jsx)
 * A beautiful landing page showcasing features, with theme toggle in navbar
 */
export function Home() {
  const { addToast } = useToast();
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  const handleNotify = () => {
    addToast('🎉 Welcome to Core AI!', 'success');
  };

  return (
    <div className="flex flex-col w-full">
      {/* ─── Hero Section ──────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24 pb-32 flex flex-col items-center text-center px-4">
        {/* Background Gradients */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative z-10 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            v1.0 is now live
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Build Faster with <br className="hidden sm:block" />
            <span className="text-gradient">Core AI</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            A premium full-stack web application starter built with React, Node.js, and MS SQL. Designed for speed, scalability, and stunning aesthetics.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/shop">
              <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg rounded-2xl">
                Explore the Shop
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8 py-6 text-lg rounded-2xl bg-background/50 backdrop-blur-sm"
              onClick={handleNotify}
            >
              Test Notifications
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ─── Features Grid ─────────────────────────────────── */}
      <section className="py-24 bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to launch a modern web application, packed into a single, cohesive architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Beautiful UI Components',
                desc: 'Hand-crafted components using Tailwind CSS and Framer Motion for buttery-smooth animations.',
                icon: '✨',
              },
              {
                title: 'Dark Mode Support',
                desc: 'Built-in theme management with seamless transition between light, dark, and system preferences.',
                icon: '🌙',
              },
              {
                title: 'Robust Backend',
                desc: 'Express.js REST API with MS SQL integration, structured for maintainability and scale.',
                icon: '🚀',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card border border-border p-8 rounded-3xl hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl mb-6 shadow-inner">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials Section ──────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Developers Say</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Don't just take our word for it. Here is what the community has to say about Core AI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Alex Rivera", role: "Frontend Engineer", text: "The component architecture is exactly what I was looking for. Clean, reusable, and perfectly styled with Tailwind." },
              { name: "Sarah Chen", role: "Full Stack Dev", text: "Having the MS SQL backend already wired up to a polished React frontend saved me weeks of setup time." },
              { name: "Jordan Smith", role: "UI/UX Designer", text: "The attention to detail in the micro-interactions and dark mode implementation is truly premium." }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-muted/50 border border-border flex flex-col gap-6"
              >
                <div className="flex text-amber-400 gap-1">
                  {[1,2,3,4,5].map(star => <span key={star}>★</span>)}
                </div>
                <p className="text-foreground flex-1 italic">"{testimonial.text}"</p>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA & Newsletter Section ──────────────────────── */}
      <section className="py-32 relative overflow-hidden flex items-center justify-center text-center px-4 border-t border-border">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl w-full"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground mb-10">
            Dive into the codebase and start building your next big idea today, or subscribe for updates.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 max-w-md mx-auto">
             <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-6 py-4 rounded-2xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
             />
             <Button size="lg" className="w-full sm:w-auto px-8 py-4 rounded-2xl h-auto" onClick={() => addToast('Subscribed successfully!', 'success')}>
                Subscribe
             </Button>
          </div>

          <div className="flex items-center justify-center gap-4 pt-8 border-t border-border/50">
            <Link to="/admin">
              <Button variant="outline" size="lg" className="px-10 py-6 text-lg rounded-2xl shadow-sm hover:shadow-md">
                View Admin Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
