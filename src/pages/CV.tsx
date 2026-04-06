import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const useTerminalType = (lines: string[], speed = 30, lineDelay = 400) => {
  const [output, setOutput] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentLine >= lines.length) {
      setDone(true);
      return;
    }

    if (currentChar === 0 && currentLine > 0) {
      const timeout = setTimeout(() => {
        setOutput((prev) => [...prev, ""]);
        setCurrentChar(1);
      }, lineDelay);
      return () => clearTimeout(timeout);
    }

    const line = lines[currentLine];
    if (currentChar <= line.length) {
      const timeout = setTimeout(() => {
        setOutput((prev) => {
          const next = [...prev];
          next[currentLine] = line.slice(0, currentChar);
          return next;
        });
        setCurrentChar((c) => c + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
    }
  }, [currentLine, currentChar, lines, speed, lineDelay]);

  return { output, done };
};

const cvData = {
  header: [
    "$ cat cv.txt",
    "╔══════════════════════════════════════╗",
    "║           CURRICULUM VITAE           ║",
    "║              zasi.dev                ║",
    "╚══════════════════════════════════════╝",
  ],
  sections: [
    {
      command: "$ cat --section=info",
      lines: [
        "┌─ PERSONAL INFO ─────────────────────┐",
        "│ Name:     zasi                       │",
        "│ Role:     Software Developer         │",
        "│ Email:    contact@zasi.dev           │",
        "│ GitHub:   github.com/z927            │",
        "│ Location: Italy                      │",
        "└─────────────────────────────────────┘",
      ],
    },
    {
      command: "$ cat --section=skills",
      lines: [
        "┌─ SKILLS ────────────────────────────┐",
        "│                                     │",
        "│ Languages:                          │",
        "│   ▸ TypeScript  ████████████░░ 85%  │",
        "│   ▸ JavaScript  ███████████░░░ 80%  │",
        "│   ▸ Python      █████████░░░░░ 65%  │",
        "│   ▸ C#          ████████░░░░░░ 60%  │",
        "│                                     │",
        "│ Frameworks:                         │",
        "│   ▸ React / Next.js                 │",
        "│   ▸ Node.js / Express               │",
        "│   ▸ .NET                             │",
        "│                                     │",
        "│ Tools:                              │",
        "│   ▸ Git, Docker, Linux              │",
        "│   ▸ PostgreSQL, MongoDB             │",
        "│   ▸ VS Code, Neovim                 │",
        "└─────────────────────────────────────┘",
      ],
    },
    {
      command: "$ cat --section=experience",
      lines: [
        "┌─ EXPERIENCE ────────────────────────┐",
        "│                                     │",
        "│ [2024 - Present]                    │",
        "│ Freelance Software Developer        │",
        "│ > Full-stack web applications       │",
        "│ > Open source contributions         │",
        "│                                     │",
        "│ [2023 - 2024]                       │",
        "│ Junior Developer                    │",
        "│ > Built internal tools & dashboards │",
        "│ > REST API development              │",
        "│                                     │",
        "└─────────────────────────────────────┘",
      ],
    },
    {
      command: "$ cat --section=education",
      lines: [
        "┌─ EDUCATION ─────────────────────────┐",
        "│                                     │",
        "│ Computer Science                    │",
        "│ Self-taught + Online Courses        │",
        "│ > freeCodeCamp, Udemy, YouTube      │",
        "│ > Continuous learning mindset       │",
        "│                                     │",
        "└─────────────────────────────────────┘",
      ],
    },
  ],
};

const TerminalSection = ({
  command,
  lines,
  delay,
}: {
  command: string;
  lines: string[];
  delay: number;
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <p className="text-primary text-glow-green animate-flash-glow mb-1">
        {command}
      </p>
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
          className="text-foreground/90 whitespace-pre leading-relaxed"
        >
          {line}
        </motion.p>
      ))}
    </motion.div>
  );
};

const CV = () => {
  const { output: headerOutput, done: headerDone } = useTerminalType(
    cvData.header,
    20,
    200
  );

  const [showCursor, setShowCursor] = useState(true);
  useEffect(() => {
    const blink = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <div className="min-h-screen bg-background bg-grid">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Back button */}
        <Link
          to="/"
          className="btn-alive inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors font-mono text-sm mb-8"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          cd ~/home
        </Link>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto rounded-xl border border-border overflow-hidden shadow-[0_0_40px_hsl(145_100%_55%/0.08)]"
        >
          {/* Terminal header */}
          <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-[hsl(45,100%,50%)]" />
            <div className="w-3 h-3 rounded-full bg-primary/80" />
            <span className="ml-3 text-xs text-muted-foreground font-mono">
              zasi@dev:~/cv — bash
            </span>
          </div>

          {/* Terminal body */}
          <div className="bg-background/95 p-6 font-mono text-sm md:text-base overflow-x-auto">
            {/* Header typing */}
            {headerOutput.map((line, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-primary text-glow-green"
                    : "text-foreground/90"
                }
              >
                {line}
              </p>
            ))}
            {!headerDone && (
              <span className="text-primary">
                {showCursor ? "█" : "\u00A0"}
              </span>
            )}

            {headerDone && (
              <>
                <div className="mt-6" />
                {cvData.sections.map((section, i) => (
                  <TerminalSection
                    key={i}
                    command={section.command}
                    lines={section.lines}
                    delay={i * 1200}
                  />
                ))}

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: cvData.sections.length * 1.2 + 0.5 }}
                  className="mt-8 pt-4 border-t border-border"
                >
                  <p className="text-muted-foreground animate-flicker">
                    $ echo "Thanks for reading!"
                  </p>
                  <p className="text-primary text-glow-green mt-1">
                    Thanks for reading!
                  </p>
                  <p className="text-muted-foreground mt-4">
                    ${" "}
                    <span className="text-primary">
                      {showCursor ? "█" : "\u00A0"}
                    </span>
                  </p>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CV;
