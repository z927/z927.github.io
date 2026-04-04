import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const useTypewriter = (text: string, speed = 80, delay = 800) => {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(blink);
  }, []);

  return { displayed, cursor: showCursor ? "|" : "\u00A0" };
};

const HeroSection = () => {
  const { displayed, cursor } = useTypewriter("zasi.dev", 100, 600);

  return (
    <section className="relative min-h-screen flex items-center bg-grid overflow-hidden pt-16">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="font-pixel text-primary text-xs tracking-widest uppercase mb-4 animate-flicker">
            &gt; hello_world
          </p>
          <h1 className="font-pixel text-3xl md:text-5xl font-bold leading-tight">
            Hi, I'm{" "}
            <span className="text-primary text-glow-green">
              {displayed}
              <span className="text-primary/80 font-light">{cursor}</span>
            </span>
          </h1>
          <h2 className="font-pixel text-sm md:text-lg text-accent text-glow-purple mt-3 animate-flash-glow">
            Software Developer
          </h2>
          <p className="text-muted-foreground mt-6 max-w-lg text-lg leading-relaxed">
            Passionate about the art of coding and the science of problem-solving.
            I thrive on turning complex ideas into elegant, functional software solutions.
          </p>

          <div className="flex gap-4 mt-8">
            <a
              href="mailto:contact@zasi.dev"
              className="btn-alive inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:shadow-[var(--glow-green)] transition-shadow"
            >
              Hire Me
            </a>
            <a
              href="#contact"
              className="btn-alive inline-flex items-center gap-2 px-6 py-3 rounded-md border border-accent text-accent font-semibold hover:bg-accent/10 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4 mt-10">
            <a
              href="https://github.com/z927"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://buymeacoffee.com/zasi"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-alive inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.062 2.014.13l.04.005c.272.029.544.065.813.108.391.063.782.132 1.167.22.262.061.524.14.773.243.29.12.512.347.493.682-.006.117-.025.234-.05.35-.07.33-.143.66-.218.987a93.84 93.84 0 01-.107.457l-.002.003c-.067.282-.133.562-.2.844-.064.271-.130.538-.2.806l-.003.014c-.067.27-.137.539-.207.808-.057.22-.111.443-.166.664l-.005.022c-.059.229-.12.461-.183.69-.055.198-.111.395-.167.593-.047.168-.096.338-.147.508-.037.125-.076.25-.115.375l-.002.006c-.059.186-.12.37-.182.556-.041.119-.082.238-.123.358-.037.107-.074.213-.111.32l-.003.01c-.043.122-.087.244-.131.366-.04.111-.08.222-.12.332l-.082.22c-.023.06-.042.12-.065.179-.026.068-.05.138-.077.207-.035.091-.07.183-.106.273l-.007.016c-.033.083-.065.164-.097.245-.02.05-.04.1-.058.148-.014.035-.028.072-.04.106-.02.05-.037.102-.056.152-.024.065-.048.13-.07.197l-.001.003c-.013.035-.024.071-.036.107l-.037.106c-.007.018-.012.038-.02.055l-.012.034c-.008.023-.017.047-.024.068-.008.022-.014.044-.022.066l-.004.012c-.006.019-.012.038-.018.056l-.016.048c-.005.016-.01.03-.015.044-.004.016-.009.03-.013.044l-.01.033c-.004.014-.008.028-.012.04-.004.012-.008.026-.012.038-.005.013-.008.026-.012.04-.003.01-.005.02-.008.028l-.001.003c-.002.008-.004.016-.006.022l-.002.008c-.002.006-.003.01-.004.014-.002.008-.005.014-.006.02l-.001.006c-.002.006-.003.012-.004.016l-.001.003c-.001.004-.002.008-.003.01v.003l-.001.003v.002l-.001.003v.002h-.001v.003h-.001v.001H7.836v.001h-.001l.001.003c.001.003.001.006.002.009l.001.002v.003l.002.003v.002l.002.005.003.005v.002c.001.003.003.006.004.009l.002.003c.002.004.004.008.006.011l.002.004c.002.003.003.006.005.008l.003.006.005.008.003.005.005.008.004.005.005.008.004.006.005.007.005.006.005.007.005.006.006.007.005.006.006.006.005.006.006.006.006.005.006.006.006.005.006.005.007.005.006.005.007.005.007.004.007.005.007.004.007.004.007.004.008.004.007.004.008.003.008.004.008.003.008.003.008.003.009.003.008.003.009.002.008.003.01.002.008.002.01.002.009.002.01.002.01.001.01.002.01.001.01.001.01.001.01.001.011.001.011.001.011 0 .01.001.012 0 .011 0 .011.001H8.8c.018 0 .035 0 .053-.001h.015l.01-.001H20.216z"/>
              </svg>
              ☕ Buy me a coffee
            </a>
          </div>
        </motion.div>

        {/* Right - Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/40 via-accent/40 to-primary/40 blur-lg" />
            <img
              src="https://z927.github.io/github-profile.png"
              alt="zasi.dev avatar"
              className="relative w-80 h-80 md:w-[420px] md:h-[420px] object-cover rounded-2xl border-2 border-border"
              loading="eager"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
