import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PixelReveal from "./PixelReveal";

const skills = [
  { name: "JavaScript / TypeScript", level: 90 },
  { name: "React / Next.js", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "Python", level: 75 },
  { name: "HTML / CSS / Tailwind", level: 90 },
  { name: "Git / DevOps", level: 70 },
];

const SkillBar = ({ skill, index }: { skill: typeof skills[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref}>
      <div className="flex justify-between mb-2">
        <span className="font-mono text-sm">{skill.name}</span>
        <span className="font-mono text-sm text-primary animate-flash-glow">{skill.level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 0.8, delay: index * 0.08 + 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 bg-card/50 relative">
      <div className="container mx-auto px-6 relative z-10">
        <PixelReveal>
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-2 animate-flicker">
            &gt; my_skills
          </p>
          <h2 className="text-4xl font-bold mb-12">
            Tech <span className="text-accent text-glow-purple">Stack</span>
          </h2>
        </PixelReveal>

        <PixelReveal delay={0.2} cols={24} rows={12}>
          <div className="max-w-2xl space-y-6">
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </PixelReveal>
      </div>
    </section>
  );
};

export default SkillsSection;
