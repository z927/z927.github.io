import { motion } from "framer-motion";

const skills = [
  { name: "JavaScript / TypeScript", level: 90 },
  { name: "React / Next.js", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "Python", level: 75 },
  { name: "HTML / CSS / Tailwind", level: 90 },
  { name: "Git / DevOps", level: 70 },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 bg-card/50 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-2">
            &gt; my_skills
          </p>
          <h2 className="text-4xl font-bold mb-12">
            Tech <span className="text-accent text-glow-purple">Stack</span>
          </h2>
        </motion.div>

        <div className="max-w-2xl space-y-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="flex justify-between mb-2">
                <span className="font-mono text-sm">{skill.name}</span>
                <span className="font-mono text-sm text-primary">{skill.level}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.08 + 0.3, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
