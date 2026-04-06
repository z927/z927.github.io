import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TunnelBackground from "@/components/TunnelBackground";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div id="home" className="min-h-screen relative">
      <TunnelBackground />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
