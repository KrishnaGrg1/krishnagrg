import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { ThemeProvider } from "@/components/ThemeProvider";
import ExperienceSection from "@/components/ExperienceSection";

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="overflow-hidden relative">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ExperienceSection />
          <ContactSection />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </ThemeProvider>
  );
};

export default Index;
