import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, Layers, ShieldCheck, X } from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [imageError, setImageError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setImageError(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 20);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/60 dark:bg-black/75 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Modal panel */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 18, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 12, scale: 0.98 }
            }
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.24,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] shadow-2xl"
          >
            {/* Sticky modal header */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 py-4 bg-white/95 dark:bg-[#111113]/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  {project.category} · {project.year} · {project.clientOrScope}
                </p>
                <h3
                  id="project-modal-title"
                  className="mt-1 text-lg sm:text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
                >
                  {project.title}
                </h3>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 space-y-7">
              {/* Visual header */}
              <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 aspect-[16/9]">
                {project.image && !imageError ? (
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-950">
                    <Layers className="w-6 h-6 text-zinc-400 mb-2" aria-hidden="true" />
                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {project.title}
                    </p>
                  </div>
                )}
              </div>

              {/* Outcome summary bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-zinc-200 dark:border-zinc-800">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Measured Outcome
                </span>
                <span className="font-mono text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-400 tabular-nums">
                  {project.outcomeMetric}
                </span>
              </div>

              {/* Deep-dive sections */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400">
                    Problem Statement
                  </h4>
                  <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {project.problemStatement}
                  </p>
                </div>

                <div className="pt-5 border-t border-zinc-100 dark:border-zinc-800/80">
                  <h4 className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400">
                    Architecture &amp; Database Choice
                  </h4>
                  <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {project.architectureAndDb}
                  </p>
                </div>

                <div className="pt-5 border-t border-zinc-100 dark:border-zinc-800/80">
                  <h4 className="text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>QA &amp; Testing Coverage</span>
                  </h4>
                  <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {project.qaCoverage}
                  </p>
                </div>
              </div>

              {/* Unboxed tech list & external actions */}
              <div className="pt-5 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Stack Used
                  </p>
                  <p className="mt-1 font-mono text-xs text-zinc-800 dark:text-zinc-200">
                    {project.techStack.join(' · ')}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors whitespace-nowrap shrink-0"
                    >
                      <Github className="w-4 h-4" aria-hidden="true" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-950 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950 text-xs sm:text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
