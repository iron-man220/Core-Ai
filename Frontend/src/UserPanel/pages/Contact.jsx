import { motion } from 'framer-motion';
import { Button } from '../../components/Button';
import { useToast } from '../../context/ToastContext';

export const Contact = () => {
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast('Message sent successfully! We will get back to you soon.', 'success');
    e.target.reset();
  };

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
        <p className="text-xl text-muted-foreground">
          Have questions about Core AI? Want to contribute? Send us a message and we'll respond as soon as possible.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto bg-card border border-border p-8 md:p-12 rounded-3xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name</label>
              <input required type="text" id="firstName" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary" placeholder="John" />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name</label>
              <input required type="text" id="lastName" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Doe" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
            <input required type="email" id="email" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary" placeholder="john@example.com" />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
            <textarea required id="message" rows="5" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none" placeholder="How can we help you?"></textarea>
          </div>

          <Button type="submit" size="lg" className="w-full py-4 text-lg rounded-xl">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};
