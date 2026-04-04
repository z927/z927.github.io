import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto"
        >
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-2 animate-flicker">
            &gt; get_in_touch
          </p>
          <h2 className="text-4xl font-bold mb-4">
            Let's <span className="text-accent text-glow-purple">Connect</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>

          <a
            href="mailto:contact@zasi.dev"
            className="btn-alive inline-flex items-center gap-2 px-8 py-4 rounded-md bg-primary text-primary-foreground font-semibold text-lg hover:shadow-[var(--glow-green)] transition-shadow"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Say Hello
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
