import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, Download, ShieldCheck } from 'lucide-react';
import { PROFILE_CONFIG, PROFILE_IMAGE } from '../data/portfolioData';

export function HeroSection() {
  const [imageError, setImageError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const enterTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left column: Editorial headline, audience-balanced pitch & actions */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enterTransition}
            className="lg:col-span-7 flex flex-col justify-between gap-8"
          >
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-[13px] font-medium text-emerald-700 dark:text-emerald-400">
                <span>{PROFILE_CONFIG.availability}</span>
                <span
                  aria-hidden="true"
                  className="text-zinc-300 dark:text-zinc-700"
                >
                  /
                </span>
                <span className="text-zinc-500 dark:text-zinc-400">
                  {PROFILE_CONFIG.location}
                </span>
              </div>

              <h1
                id="hero-heading"
                className="text-[clamp(2.15rem,4.1vw,3.35rem)] font-semibold tracking-tight leading-[1.08] text-zinc-950 dark:text-zinc-50"
              >
                {PROFILE_CONFIG.headline}
              </h1>

              <p className="text-base sm:text-[17px] leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-xl">
                {PROFILE_CONFIG.subheadline}
              </p>

              {/* Primary + secondary actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <motion.a
                  href="#projects"
                  whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Explore Projects</span>
                  <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] text-zinc-900 dark:text-zinc-100 text-sm font-medium hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Let&apos;s Talk</span>
                </motion.a>

                <a
                  href={PROFILE_CONFIG.resumeUrl}
                  download={PROFILE_CONFIG.resumeFileName}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>

            {/* Quiet discipline trust strip */}
            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800/90">
              <ul className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400">
                {PROFILE_CONFIG.trustDisciplines.map((item, idx) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2.5 whitespace-nowrap"
                  >
                    <span>{item}</span>
                    {idx < PROFILE_CONFIG.trustDisciplines.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="text-zinc-300 dark:text-zinc-700"
                      >
                        ·
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right column: Minimalist portrait frame with subtle elevation & fallback */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 18, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              ...enterTransition,
              delay: prefersReducedMotion ? 0 : 0.08,
            }}
            className="lg:col-span-5"
          >
            <div className="group relative w-full h-full min-h-[380px] sm:min-h-[430px] lg:min-h-0 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-[#111113] shadow-[0_14px_38px_-18px_rgba(9,9,11,0.16)] dark:shadow-[0_18px_42px_-18px_rgba(0,0,0,0.75)]">
              {!imageError ? (
                <motion.img
                  src={PROFILE_IMAGE}
                  alt={PROFILE_CONFIG.portraitAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full aspect-[4/5] lg:aspect-auto object-cover object-top"
                />
              ) : (
                <div className="w-full h-full min-h-[380px] flex flex-col items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-950 p-8 text-center">
                  <span className="font-mono text-3xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-200">
                    {PROFILE_CONFIG.monogram}
                  </span>
                  <span className="mt-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {PROFILE_CONFIG.name}
                  </span>
                  <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                    {PROFILE_CONFIG.role}
                  </span>
                </div>
              )}

              {/* Subtle bottom gradient scrim + floating production-tested caption */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/55 via-black/20 to-transparent"
              />
              <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/90 bg-white/92 dark:bg-[#09090B]/90 backdrop-blur-md px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-zinc-950 dark:text-zinc-50 flex items-center gap-1.5">
                      <ShieldCheck
                        className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{PROFILE_CONFIG.portraitBadgeLabel}</span>
                    </p>
                    <p className="mt-0.5 text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
                      {PROFILE_CONFIG.portraitBadgeDetail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-width proof strip below the 2-column split */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={enterTransition}
          className="mt-14 pt-8 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {PROFILE_CONFIG.heroProofStats.map((stat) => (
            <div key={stat.label} className="space-y-1.5">
              <p className="font-mono text-2xl font-semibold tracking-tight tabular-nums text-zinc-950 dark:text-zinc-50">
                {stat.value}
              </p>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-200">
                {stat.label}
              </p>
              <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                {stat.context}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
