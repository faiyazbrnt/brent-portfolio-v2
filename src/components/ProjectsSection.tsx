import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Globe,
  Layers,
  Lock,
  Pause,
  Play,
  X,
} from 'lucide-react';
import { PROJECTS, type ProjectItem } from '../data/portfolioData';

const AUTOPLAY_INTERVAL_MS = 4000;
const DRAG_START_THRESHOLD_PX = 8;
const DRAG_COMMIT_THRESHOLD_PX = 55;

function getDisplayHost(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

function OneOpsPlaceholder({ project }: { project: ProjectItem }) {
  const modules = project.placeholderModules ?? [
    'TASS System',
    'CRM',
    'BRF',
    'RFQ System',
  ];

  return (
    <div
      role="img"
      aria-label={project.imageAlt}
      className="relative w-full h-full flex flex-col items-center justify-center p-6 sm:p-10 text-center bg-zinc-100 dark:bg-[#141418] overflow-hidden"
    >
      {/* Subtle architectural grid lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.45] dark:opacity-[0.25]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(113,113,122,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(113,113,122,0.18) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-md">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium border border-zinc-300/80 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-300">
          <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <span>No Preview Image · Internal Suite</span>
        </span>

        <p className="mt-4 text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {project.title}
        </p>
        <p className="mt-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          Unified multi-module business operations platform
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {modules.map((mod) => (
            <span
              key={mod}
              className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 font-mono text-xs font-medium text-zinc-800 dark:text-zinc-200 shadow-xs"
            >
              {mod}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const total = PROJECTS.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [openBriefId, setOpenBriefId] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef({
    pointerId: -1,
    startX: 0,
    deltaX: 0,
    active: false,
    moved: false,
  });
  const suppressNextClickRef = useRef(false);

  // Listen to prefers-reduced-motion changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Close brief whenever active slide changes
  useEffect(() => {
    setOpenBriefId(null);
  }, [activeIndex]);

  const goToSlide = useCallback(
    (index: number, fromUser = true) => {
      const clamped = ((index % total) + total) % total;
      setActiveIndex(clamped);
      if (fromUser) {
        setUserInteracted(true);
      }
    },
    [total]
  );

  const goPrev = useCallback(() => {
    goToSlide(activeIndex - 1, true);
  }, [activeIndex, goToSlide]);

  const goNext = useCallback(() => {
    goToSlide(activeIndex + 1, true);
  }, [activeIndex, goToSlide]);

  // Autoplay every 4s — pauses on hover, focus, user interaction, open brief, or reduced motion
  const isAutoplayRunning =
    !prefersReducedMotion &&
    !isHovered &&
    !isFocused &&
    !userInteracted &&
    !isDragging &&
    openBriefId === null;

  useEffect(() => {
    if (!isAutoplayRunning) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [isAutoplayRunning, total]);

  // Pointer drag handlers (mouse + touch)
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    // Only primary mouse button or touch/pen
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    // Ignore pointer starts on explicit close/action controls inside open brief
    const target = event.target as HTMLElement | null;
    if (target?.closest('[data-no-drag="true"]')) return;

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      deltaX: 0,
      active: true,
      moved: false,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const state = dragStateRef.current;
    if (!state.active || state.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - state.startX;
    state.deltaX = deltaX;

    if (!state.moved && Math.abs(deltaX) > DRAG_START_THRESHOLD_PX) {
      state.moved = true;
      setIsDragging(true);
      setUserInteracted(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    if (state.moved && trackRef.current) {
      trackRef.current.style.setProperty('--drag-x', `${deltaX}px`);
    }
  };

  const finishPointerDrag = (event: PointerEvent<HTMLDivElement>) => {
    const state = dragStateRef.current;
    if (!state.active || state.pointerId !== event.pointerId) return;

    const wasMoved = state.moved;
    const finalDelta = state.deltaX;

    state.active = false;
    state.moved = false;
    state.deltaX = 0;

    if (trackRef.current) {
      trackRef.current.style.setProperty('--drag-x', '0px');
    }

    if (wasMoved) {
      setIsDragging(false);
      suppressNextClickRef.current = true;
      window.setTimeout(() => {
        suppressNextClickRef.current = false;
      }, 60);

      if (finalDelta <= -DRAG_COMMIT_THRESHOLD_PX && activeIndex < total - 1) {
        setActiveIndex((prev) => Math.min(total - 1, prev + 1));
      } else if (finalDelta >= DRAG_COMMIT_THRESHOLD_PX && activeIndex > 0) {
        setActiveIndex((prev) => Math.max(0, prev - 1));
      }
    }
  };

  const handleCarouselKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goNext();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goPrev();
    } else if (event.key === 'Escape' && openBriefId) {
      event.preventDefault();
      setOpenBriefId(null);
    }
  };

  const handleSlideTriggerClick = (project: ProjectItem, index: number) => {
    if (suppressNextClickRef.current) return;
    setUserInteracted(true);

    if (index !== activeIndex) {
      setActiveIndex(index);
      return;
    }

    setOpenBriefId((current) => (current === project.id ? null : project.id));
  };

  const activeProject = PROJECTS[activeIndex];

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-20 sm:py-24 border-t border-zinc-200 dark:border-zinc-800/90 overflow-x-clip"
    >
      {/* Section Header */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400">
              02. Selected Work
            </p>
            <h2
              id="projects-heading"
              className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
            >
              Project Showcase
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Click any project image to read a plain-English brief of what the
              system does, then click again to open the live Vercel app where
              available.
            </p>
          </div>

          {/* Slide counter + Prev / Next + Autoplay controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span
              aria-live="polite"
              className="font-mono text-xs tabular-nums text-zinc-500 dark:text-zinc-400 mr-2"
            >
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(total).padStart(2, '0')}
            </span>

            {!prefersReducedMotion && (
              <button
                type="button"
                onClick={() => setUserInteracted((prev) => !prev)}
                aria-label={
                  userInteracted ? 'Resume autoplay' : 'Pause autoplay'
                }
                title={userInteracted ? 'Resume autoplay' : 'Pause autoplay'}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer"
              >
                {userInteracted ? (
                  <Play className="w-3.5 h-3.5" aria-hidden="true" />
                ) : (
                  <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                )}
              </button>
            )}

            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous project"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next project"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Peek Carousel Region */}
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured projects showcase"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setIsFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsFocused(false);
          }
        }}
        onKeyDown={handleCarouselKeyDown}
        className="mt-8 mx-auto max-w-6xl"
      >
        {/* Padded viewport so active slide sits left-of-center & next slide peeks on the right */}
        <div
          className={`peek-carousel-viewport${isDragging ? ' is-dragging' : ''}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishPointerDrag}
          onPointerCancel={finishPointerDrag}
        >
          <div
            ref={trackRef}
            className="peek-carousel-track"
            style={{ '--n': activeIndex } as CSSProperties}
          >
            {PROJECTS.map((project, index) => {
              const isActive = index === activeIndex;
              const isBriefOpen = isActive && openBriefId === project.id;
              const hasVercelLink = Boolean(project.liveUrl);

              return (
                <article
                  key={project.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${total}`}
                  data-active={isActive ? 'true' : 'false'}
                  className="peek-carousel-slide"
                >
                  <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] overflow-hidden shadow-xs">
                    {/* Visual stage — clicking opens layman's brief */}
                    <div className="relative w-full aspect-[16/10] bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => handleSlideTriggerClick(project, index)}
                        aria-expanded={isBriefOpen}
                        aria-label={
                          isActive
                            ? `${project.title}. Click to read a short brief about this system.`
                            : `Show ${project.title}`
                        }
                        className="group relative block w-full h-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-emerald-600 dark:focus-visible:outline-emerald-400"
                      >
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.imageAlt}
                            draggable={false}
                            loading={index <= 1 ? 'eager' : 'lazy'}
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <OneOpsPlaceholder project={project} />
                        )}

                        {/* Subtle bottom scrim for legibility */}
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-zinc-950/80 via-zinc-950/35 to-transparent"
                        />

                        {/* Top-left deployment status badge */}
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2">
                          {hasVercelLink ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-zinc-950/80 text-emerald-300 backdrop-blur-xs border border-white/10">
                              <Globe className="w-3 h-3" aria-hidden="true" />
                              <span>Live on Vercel</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-zinc-950/80 text-zinc-200 backdrop-blur-xs border border-white/10">
                              <Lock className="w-3 h-3" aria-hidden="true" />
                              <span>Internal System</span>
                            </span>
                          )}
                        </div>

                        {/* Bottom slide title & interactive cue */}
                        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex items-end justify-between gap-4">
                          <div className="min-w-0">
                            <p className="font-mono text-[11px] text-zinc-300">
                              {String(index + 1).padStart(2, '0')} ·{' '}
                              {project.clientOrScope}
                            </p>
                            <h3 className="mt-0.5 text-base sm:text-xl font-semibold tracking-tight text-white truncate">
                              {project.title}
                            </h3>
                          </div>

                          {isActive && !isBriefOpen && (
                            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-zinc-950 text-xs font-medium shrink-0 shadow-xs transition-transform duration-200 group-hover:scale-[1.03]">
                              <span>Click for brief</span>
                            </span>
                          )}
                        </div>
                      </button>

                      {/* Layman's Brief Overlay — revealed on image click */}
                      <div
                        data-open={isBriefOpen ? 'true' : 'false'}
                        aria-hidden={!isBriefOpen}
                        className="peek-brief-overlay absolute inset-0 z-20 flex flex-col justify-between p-5 sm:p-8 bg-zinc-950/92 text-zinc-50 backdrop-blur-xs"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-mono text-[11px] font-medium text-emerald-400">
                              In plain terms · {project.subtitle}
                            </p>
                            <h3 className="mt-1 text-lg sm:text-2xl font-semibold tracking-tight text-white">
                              {project.title}
                            </h3>
                          </div>

                          <button
                            type="button"
                            data-no-drag="true"
                            tabIndex={isBriefOpen ? 0 : -1}
                            onClick={(event) => {
                              event.stopPropagation();
                              setOpenBriefId(null);
                            }}
                            aria-label="Close project brief"
                            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-white/10 text-zinc-200 hover:bg-white/20 hover:text-white transition-colors shrink-0 cursor-pointer"
                          >
                            <X className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>

                        {/* Clickable brief body — redirects to Vercel if available */}
                        {hasVercelLink && project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-no-drag="true"
                            tabIndex={isBriefOpen ? 0 : -1}
                            className="group/brief my-auto flex flex-col gap-5 rounded-xl p-3 -mx-3 transition-colors hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-emerald-400"
                          >
                            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-zinc-100 max-w-2xl">
                              {project.laymanBrief}
                            </p>

                            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/15">
                              <span className="font-mono text-xs text-zinc-400 truncate">
                                {getDisplayHost(project.liveUrl)}
                              </span>
                              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500 text-zinc-950 text-xs sm:text-sm font-semibold transition-colors group-hover/brief:bg-emerald-400">
                                <span>Visit Live App on Vercel</span>
                                <ArrowUpRight
                                  className="w-4 h-4"
                                  aria-hidden="true"
                                />
                              </span>
                            </div>
                          </a>
                        ) : (
                          <div className="my-auto flex flex-col gap-5">
                            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-zinc-100 max-w-2xl">
                              {project.laymanBrief}
                            </p>

                            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/15">
                              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400">
                                <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>
                                  Internal enterprise system · Not hosted on
                                  Vercel
                                </span>
                              </span>

                              <button
                                type="button"
                                data-no-drag="true"
                                tabIndex={isBriefOpen ? 0 : -1}
                                onClick={() => setOpenBriefId(null)}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white text-xs sm:text-sm font-medium hover:bg-white/20 transition-colors cursor-pointer"
                              >
                                <span>Back to preview</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Clean metadata strip below the visual */}
                    <div className="px-4 py-3.5 sm:px-6 sm:py-4 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200/80 dark:border-zinc-800/80">
                      <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 truncate">
                        {project.techStack.join(' · ')}
                      </p>
                      <span className="font-mono text-xs font-medium text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                        {hasVercelLink ? 'Vercel Link Available' : 'Private Deployment'}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots (24px buttons with aria-pressed, 6px -> 22px pill) */}
        <div className="mt-6 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-5xl mx-auto">
          <div
            role="group"
            aria-label="Project slides pagination"
            className="flex items-center gap-1"
          >
            {PROJECTS.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={project.id}
                  type="button"
                  aria-pressed={isActive}
                  aria-label={`Go to slide ${index + 1} of ${total}: ${project.title}`}
                  onClick={() => goToSlide(index, true)}
                  className="peek-carousel-dot"
                >
                  <span className="peek-carousel-dot-pill" aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Showing{' '}
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {activeProject.title}
            </span>{' '}
            — drag, use arrows, or click the image
          </p>
        </div>
      </div>
    </section>
  );
}
