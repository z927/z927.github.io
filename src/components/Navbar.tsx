import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <a href="#home" className="font-mono font-bold text-primary text-lg text-glow-green">
          zasi.dev
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/cv"
            className="text-sm text-primary font-mono font-semibold hover:text-glow-green transition-colors animate-flash-glow"
          >
            CV
          </Link>
          <Link
            to="/professional"
            className="text-sm font-mono px-3 py-1.5 border border-accent/50 text-accent rounded hover:bg-accent/10 transition-all"
          >
            ✨ Elegant
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-foreground p-2 md:hidden"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
                >
                  {l.label}
                </a>
              ))}
              <Link
                to="/cv"
                onClick={() => setOpen(false)}
                className="text-sm text-primary font-mono font-semibold hover:text-glow-green transition-colors"
              >
                CV
              </Link>
              <Link
                to="/professional"
                onClick={() => setOpen(false)}
                className="text-sm font-mono text-accent font-semibold hover:text-glow-purple transition-colors"
              >
                ✨ Elegant
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
