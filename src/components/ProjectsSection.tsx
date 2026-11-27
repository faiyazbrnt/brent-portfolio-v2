import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Layers } from 'lucide-react';
import {
  PROJECT_CATEGORIES,
  PROJECTS,
  type ProjectCategory,
  type ProjectItem,
} from '../data/portfolioData';
import {
  filterProjectsByCategory,
  getProjectCategoryCounts,
} from '../utils/portfolioLogic';
import { ProjectModal } from './ProjectModal';

function ProjectCard({
  project,
  onSelect,
}: {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}) {
  const [imageError, setImageError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] overflow-hidden transition-colors hover:border-zinc-300 dark:hover:border-zinc-700"
    >
      <button
        type="button"
        onClick={() => onSelect(project)}
        className="w-full h-full flex flex-col text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-600 dark:focus-visible:ring-emerald-400"
      >
        {/* 4:3 visual thumbnail */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200/80 dark:border-zinc-800/80">
          {!imageError ? (
            <img
              src={project.image}
              alt={project.imageAlt}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-950">
              <Layers className="w-6 h-6 text-zinc-400 mb-2" aria-hidden="true" />
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {project.title}
              </span>
            </div>
          )}
        </div>

        {/* Clean card content — unboxed metadata, sharp title, measurable outcome */}
        <div className="flex-1 flex flex-col justify-between p-6 gap-5">
          <div>
            <div className="flex items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-mono">
                {project.category} · {project.year}
              </span>
              <span className="inline-flex items-center gap-1 font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
                <span>Case study</span>
                <ArrowUpRight
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </div>

            <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 leading-snug">
              {project.title}
            </h3>

            <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {project.summary}
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2">
            <p className="font-mono text-xs font-medium text-emerald-700 dark:text-emerald-400 tabular-nums">
              {project.outcomeMetric}
            </p>
            <p className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
              {project.techStack.join(' · ')}
            </p>
          </div>
        </div>
      </button>
    </motion.article>
  );
}

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const prefersReducedMotion = useReducedMotion();

  const categoryCounts = useMemo(() => getProjectCategoryCounts(PROJECTS), []);
  const filteredProjects = useMemo(
    () => filterProjectsByCategory(PROJECTS, activeCategory),
    [activeCategory]
  );

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-20 sm:py-24 px-4 sm:px-6 border-t border-zinc-200 dark:border-zinc-800/90"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.45 }}
            className="max-w-xl"
          >
            <p className="text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400">
              02. Selected Work
            </p>
            <h2
              id="projects-heading"
              className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
            >
              Systems shipped with measurable outcomes
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Click any case study to inspect the architectural trade-offs, database selection, and automated QA coverage behind the build.
            </p>
          </motion.div>

          {/* Interactive segmented filter bar */}
          <div
            role="tablist"
            aria-label="Filter projects by discipline"
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-[#111113] self-start md:self-auto"
          >
            {PROJECT_CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'text-zinc-950 dark:text-zinc-50'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="projectFilterPill"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0.05 }
                          : { type: 'spring', stiffness: 450, damping: 34 }
                      }
                      className="absolute inset-0 rounded-lg bg-white dark:bg-zinc-800 shadow-xs -z-0"
                    />
                  )}
                  <span className="relative z-10 inline-flex items-center gap-1.5">
                    <span>{category}</span>
                    <span className="font-mono text-[11px] tabular-nums text-zinc-400 dark:text-zinc-500">
                      {categoryCounts[category]}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project cards grid */}
        <motion.div
          layout={!prefersReducedMotion}
          data-testid="projects-grid"
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
