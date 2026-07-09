import { motion } from 'framer-motion';

export const About = () => {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Core AI</h1>
        <p className="text-xl text-muted-foreground">
          We are dedicated to providing the best starter template for your next full-stack React application. Built with modern tools for modern developers.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="aspect-video bg-muted rounded-3xl overflow-hidden relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay" />
             <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" alt="Team collaborating" className="w-full h-full object-cover" />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-lg text-muted-foreground">
            To eliminate the boilerplate and setup time associated with building robust, scalable web applications. We believe developers should focus on creating unique value, not wiring up basic routing and theme contexts.
          </p>
          <ul className="space-y-4">
            {[
              "Streamlined Developer Experience",
              "Premium UI/UX out of the box",
              "Scalable Architecture",
              "Fully typed data models"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-foreground">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};
