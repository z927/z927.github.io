import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

const skills = [
  { name: "JavaScript / TypeScript", level: 90 },
  { name: "React / Next.js", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "Python", level: 75 },
  { name: "HTML / CSS / Tailwind", level: 90 },
  { name: "Git / DevOps", level: 70 },
];

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "20+", label: "Projects" },
  { value: "10+", label: "Technologies" },
  { value: "∞", label: "Curiosity" },
];

const NavbarPro = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d0d0d]/95 backdrop-blur-md shadow-lg shadow-amber-900/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">
        <a href="#home" className="text-xl tracking-[0.2em] uppercase font-light text-amber-100">
          zasi<span className="text-amber-400">.</span>dev
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs tracking-[0.15em] uppercase text-amber-100/60 hover:text-amber-400 transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/"
            className="text-xs tracking-[0.15em] uppercase px-4 py-2 border border-amber-400/30 text-amber-400 hover:bg-amber-400/10 transition-all duration-300 rounded-sm"
          >
            ⚡ Cyberpunk
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-amber-100 p-2" aria-label="Menu">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#0d0d0d]/98 backdrop-blur-lg border-t border-amber-400/10 px-6 py-6 flex flex-col gap-5"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm tracking-widest uppercase text-amber-100/60 hover:text-amber-400 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="text-sm tracking-widest uppercase text-amber-400"
          >
            ⚡ Cyberpunk
          </Link>
        </motion.div>
      )}
    </nav>
  );
};

const Professional = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/z927/repos?sort=updated&per_page=30")
      .then((res) => res.json())
      .then((data: GitHubRepo[]) => {
        setRepos(
          data
            .filter((r) => !r.name.startsWith("z927"))
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6)
        );
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      id="home"
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #111108 50%, #0d0d0d 100%)",
        color: "#e8e4dc",
        fontFamily: "'Inter', 'Helvetica Neue', system-ui, sans-serif",
      }}
    >
      <NavbarPro />

      {/* Hero */}
      <section className="min-h-screen flex items-center relative overflow-hidden pt-20">
        {/* Subtle gold grain overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 30% 40%, #d4a574 0%, transparent 50%), radial-gradient(circle at 70% 60%, #a08060 0%, transparent 50%)"
        }} />
        
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-amber-400/80 mb-6">
              Software Developer
            </p>
            <h1
              className="text-5xl md:text-7xl font-extralight leading-[1.1] mb-8"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Hi, I'm{" "}
              <span className="text-amber-400 italic">zasi</span>
              <span className="text-amber-400/40">.</span>
            </h1>
            <p className="text-lg text-amber-100/50 max-w-lg leading-relaxed font-light">
              Passionate about the art of coding and the science of problem-solving.
              I thrive on turning complex ideas into elegant, functional software solutions.
            </p>

            <div className="flex gap-5 mt-10">
              <a
                href="mailto:contact@zasi.dev"
                className="px-8 py-3.5 bg-amber-400 text-[#0a0a0a] text-sm tracking-widest uppercase font-medium hover:bg-amber-300 transition-colors duration-300"
              >
                Hire Me
              </a>
              <a
                href="#contact"
                className="px-8 py-3.5 border border-amber-400/30 text-amber-100/80 text-sm tracking-widest uppercase font-medium hover:border-amber-400 hover:text-amber-400 transition-all duration-300"
              >
                Contact
              </a>
            </div>

            <div className="flex items-center gap-4 mt-12">
              <a href="https://github.com/z927" target="_blank" rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-amber-100/10 flex items-center justify-center text-amber-100/40 hover:text-amber-400 hover:border-amber-400/40 transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-amber-100/10 flex items-center justify-center text-amber-100/40 hover:text-amber-400 hover:border-amber-400/40 transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://buymeacoffee.com/zasi" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-amber-400/20 text-amber-400/80 text-sm hover:bg-amber-400/10 transition-all duration-300">
                ☕ Buy me a coffee
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-amber-400/20 via-transparent to-amber-600/10" />
              <img
                src="https://z927.github.io/github-profile.png"
                alt="zasi.dev"
                className="relative w-80 h-80 md:w-[400px] md:h-[400px] object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
      </div>

      {/* About */}
      <section id="about" className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs tracking-[0.3em] uppercase text-amber-400/60 mb-3">About</p>
            <h2 className="text-4xl md:text-5xl font-extralight mb-16" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Who I <span className="italic text-amber-400">Am</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-5 text-amber-100/50 leading-relaxed font-light text-lg">
              <p>
                As a dedicated Software Engineer, I'm passionate about the art of coding
                and the science of problem-solving. With a strong foundation in computer
                science and a creative approach to development, I thrive on turning complex
                ideas into elegant, functional software solutions.
              </p>
              <p>
                I believe in writing clean, maintainable code that not only works but tells
                a story. Every project is an opportunity to push boundaries and deliver
                something meaningful.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-5">
              {stats.map((s) => (
                <div key={s.label} className="p-6 border border-amber-100/5 rounded-xl hover:border-amber-400/20 transition-colors duration-300 text-center">
                  <p className="text-3xl font-light text-amber-400">{s.value}</p>
                  <p className="text-xs tracking-widest uppercase text-amber-100/40 mt-2">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
      </div>

      {/* Skills */}
      <section id="skills" className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs tracking-[0.3em] uppercase text-amber-400/60 mb-3">Expertise</p>
            <h2 className="text-4xl md:text-5xl font-extralight mb-16" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Tech <span className="italic text-amber-400">Stack</span>
            </h2>
          </motion.div>

          <div className="max-w-2xl space-y-8">
            {skills.map((skill, i) => (
              <motion.div key={skill.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}>
                <div className="flex justify-between mb-3">
                  <span className="text-sm tracking-wide text-amber-100/70">{skill.name}</span>
                  <span className="text-sm text-amber-400/60">{skill.level}%</span>
                </div>
                <div className="h-[2px] bg-amber-100/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400/80 to-amber-600/60"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.08 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
      </div>

      {/* Portfolio */}
      <section id="portfolio" className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs tracking-[0.3em] uppercase text-amber-400/60 mb-3">Work</p>
            <h2 className="text-4xl md:text-5xl font-extralight mb-16" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Port<span className="italic text-amber-400">folio</span>
            </h2>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 rounded-xl bg-amber-100/5 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="group block p-6 border border-amber-100/5 rounded-xl hover:border-amber-400/20 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-sm text-amber-100/80 group-hover:text-amber-400 transition-colors duration-300">
                      {repo.name}
                    </h3>
                    <svg className="w-4 h-4 text-amber-100/20 group-hover:text-amber-400 transition-colors duration-300 shrink-0 mt-0.5"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                  <p className="text-sm text-amber-100/30 line-clamp-2 leading-relaxed">
                    {repo.description || "No description provided."}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-amber-100/25 mt-4">
                    {repo.language && <span>{repo.language}</span>}
                    {repo.stargazers_count > 0 && <span>★ {repo.stargazers_count}</span>}
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
      </div>

      {/* Contact */}
      <section id="contact" className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center max-w-xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-amber-400/60 mb-3">Connect</p>
            <h2 className="text-4xl md:text-5xl font-extralight mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Let's <span className="italic text-amber-400">Talk</span>
            </h2>
            <p className="text-amber-100/40 mb-10 font-light text-lg">
              Have a project in mind or just want to say hi? I'd love to hear from you.
            </p>
            <a
              href="mailto:contact@zasi.dev"
              className="inline-flex items-center gap-3 px-10 py-4 bg-amber-400 text-[#0a0a0a] text-sm tracking-widest uppercase font-medium hover:bg-amber-300 transition-colors duration-300"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Say Hello
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
      </div>
      <footer className="py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs tracking-widest text-amber-100/30">
            © {new Date().getFullYear()} <span className="text-amber-400/60">zasi.dev</span>
          </p>
          <p className="text-xs tracking-widest text-amber-100/20">
            Built with passion & code
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Professional;
