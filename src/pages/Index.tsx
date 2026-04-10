import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TunnelBackground from "@/components/TunnelBackground";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const GradientDivider = ({ variant = "green" }: { variant?: "green" | "purple" | "mixed" }) => {
  const gradients = {
    green: "from-transparent via-primary/20 to-transparent",
    purple: "from-transparent via-accent/20 to-transparent",
    mixed: "from-primary/10 via-accent/15 to-primary/10",
  };
  return <div className={`h-px w-full bg-gradient-to-r ${gradients[variant]}`} />;
};

const Index = () => {
  return (
    <div id="home" className="min-h-screen relative">
      <TunnelBackground />
      {/* Global gradient overlays */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-accent/5 to-transparent" />
        <div className="absolute top-1/3 -left-32 w-96 h-[60vh] bg-gradient-to-r from-primary/5 to-transparent blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-[60vh] bg-gradient-to-l from-accent/5 to-transparent blur-3xl" />
      </div>
      <Navbar />
      <HeroSection />
      <GradientDivider variant="green" />
      <AboutSection />
      <GradientDivider variant="purple" />
      <SkillsSection />
      <GradientDivider variant="mixed" />
      <PortfolioSection />
      <GradientDivider variant="green" />
      <ContactSection />
      <GradientDivider variant="purple" />
      <Footer />
    </div>
  );
};

export default Index;
