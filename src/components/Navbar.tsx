import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';
import { NAV_ITEMS, PROFILE_CONFIG } from '../data/portfolioData';
import type { ThemeMode } from '../utils/portfolioLogic';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
}

export function Navbar({
  theme,
  onToggleTheme,
  activeSection,
  onSelectSection,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onSelectSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-4 inset-x-0 z-40 px-4 sm:px-6 pointer-events-none">
      <div
        className={`pointer-events-auto mx-auto max-w-5xl rounded-full border transition-all duration-200 ${
          scrolled
            ? 'bg-white/88 dark:bg-[#111113]/88 backdrop-blur-md border-zinc-200/90 dark:border-zinc-800/90 shadow-[0_8px_30px_-14px_rgba(9,9,11,0.14)] dark:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.7)]'
            : 'bg-white/75 dark:bg-[#111113]/75 backdrop-blur-md border-zinc-200/75 dark:border-zinc-800/75'
        }`}
      >
        <div className="flex items-center justify-between gap-4 sm:gap-8 px-4 sm:px-5 h-13">
          {/* Zone 1: Single-line brand mark */}
          <a
            href="#hero"
            onClick={() => handleNavClick('hero')}
            className="text-sm sm:text-[15px] font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            {PROFILE_CONFIG.name}
          </a>

          {/* Zone 2: Desktop floating spring-pill navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-1"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-zinc-950 dark:text-zinc-50'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0.05 }
                          : { type: 'spring', stiffness: 420, damping: 32 }
                      }
                      className="absolute inset-0 rounded-full bg-zinc-100 dark:bg-zinc-800/90 -z-10"
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Theme toggle + Resume CTA + Mobile trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <motion.button
              type="button"
              onClick={onToggleTheme}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
              aria-label={
                theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
              }
              title={
                theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
              }
              className="relative inline-flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.span
                    key="sun"
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 0, rotate: -45, scale: 0.75 }
                    }
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, rotate: 45, scale: 0.75 }
                    }
                    transition={{ duration: 0.16 }}
                    className="flex items-center justify-center"
                  >
                    <Sun className="w-4 h-4" aria-hidden="true" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 0, rotate: 45, scale: 0.75 }
                    }
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, rotate: -45, scale: 0.75 }
                    }
                    transition={{ duration: 0.16 }}
                    className="flex items-center justify-center"
                  >
                    <Moon className="w-4 h-4" aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <a
              href={PROFILE_CONFIG.resumeUrl}
              download={PROFILE_CONFIG.resumeFileName}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full bg-zinc-950 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Resume</span>
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={
                mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Menu className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile floating drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-nav-drawer"
            aria-label="Mobile navigation"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -10, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, scale: 0.98 }
            }
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto md:hidden mx-auto max-w-5xl mt-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#111113]/95 backdrop-blur-md p-3 shadow-lg"
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => handleNavClick(item.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`flex items-center justify-between px-3.5 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                      isActive
                        ? 'bg-zinc-100 dark:bg-zinc-800/90 text-zinc-950 dark:text-zinc-50'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-zinc-100'
                    }`}
                  >
                    <span>{item.label}</span>
                  </a>
                );
              })}

              <div className="pt-2 mt-1 border-t border-zinc-200 dark:border-zinc-800">
                <a
                  href={PROFILE_CONFIG.resumeUrl}
                  download={PROFILE_CONFIG.resumeFileName}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium rounded-xl bg-zinc-950 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950"
                >
                  <span>Download Resume</span>
                  <Download className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
