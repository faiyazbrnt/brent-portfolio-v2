import { useMemo } from 'react';
import { MotionConfig } from 'framer-motion';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { QAEngineeringSection } from './components/QAEngineeringSection';
import { TechStackSection } from './components/TechStackSection';
import { NAV_ITEMS } from './data/portfolioData';
import { useActiveSection } from './hooks/useActiveSection';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const observedSections = useMemo(
    () => ['hero', ...NAV_ITEMS.map((item) => item.id)],
    []
  );
  const { activeSection, setActiveSection } = useActiveSection(
    observedSections,
    'hero'
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#FAFAFA] text-[#09090B] dark:bg-[#09090B] dark:text-[#FAFAFA]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-zinc-950 focus:text-zinc-50 dark:focus:bg-zinc-50 dark:focus:text-zinc-950 text-xs font-medium"
        >
          Skip to main content
        </a>

        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />

        <main id="main-content">
          <HeroSection />
          <TechStackSection />
          <ProjectsSection />
          <QAEngineeringSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
