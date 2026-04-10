import PixelReveal from "./PixelReveal";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <PixelReveal>
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-2 animate-flicker">
            &gt; about_me
          </p>
          <h2 className="text-4xl font-bold mb-8">
            Who I <span className="text-accent text-glow-purple">Am</span>
          </h2>
        </PixelReveal>

        <div className="grid md:grid-cols-2 gap-12">
          <PixelReveal delay={0.15}>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
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
            </div>
          </PixelReveal>

          <PixelReveal delay={0.3} cols={16} rows={10}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "3+", label: "Years Experience" },
                { value: "20+", label: "Projects Completed" },
                { value: "10+", label: "Technologies" },
                { value: "∞", label: "Curiosity" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card border border-border rounded-lg p-5 text-center hover:border-primary/50 transition-colors"
                >
                  <p className="text-3xl font-bold text-primary text-glow-green animate-flash-glow">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </PixelReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
