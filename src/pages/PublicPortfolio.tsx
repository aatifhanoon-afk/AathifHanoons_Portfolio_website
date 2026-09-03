import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingContactDock from '@/components/FloatingContactDock';
import { usePortfolio } from '@/context/PortfolioContext';

export default function PublicPortfolio() {
  const { state } = usePortfolio();
  const sv = state.sectionVisibility;

  return (
    <div className="relative min-h-screen bg-obsidian-950 text-obsidian-50 overflow-x-hidden">
      {state.showNavbar && <Navbar />}
      <main>
        <Hero />
        {sv.about && <About />}
        {sv.services && <Services />}
        {sv.projects && <Projects />}
        {sv.skills && <Skills />}
        {sv.experience && <ExperienceTimeline />}
        {sv.contact && <Contact />}
      </main>
      <Footer />
      <FloatingContactDock />
    </div>
  );
}
