import { motion } from 'framer-motion';

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-gradient">Welcome</span> to Core AI
        </h1>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          A modern full-stack web application built with React and Node.js.
          Explore the user panel and admin panel.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <motion.a
            href="/shop"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg hover:opacity-90 transition-opacity"
          >
            Explore Shop
          </motion.a>
          <motion.a
            href="/about"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-muted text-foreground rounded-xl font-semibold hover:bg-accent transition-colors"
          >
            Learn More
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};
