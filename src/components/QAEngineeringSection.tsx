import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, ChevronRight, Terminal } from 'lucide-react';
import {
  CICD_PIPELINE_STEPS,
  QA_METRICS,
  QA_PYRAMID_LAYERS,
  type QAPyramidLayer,
} from '../data/portfolioData';

export function QAEngineeringSection() {
  const [activeLayerId, setActiveLayerId] =
    useState<QAPyramidLayer['id']>('e2e');
  const [activeStepId, setActiveStepId] = useState<string>(
    CICD_PIPELINE_STEPS[2].id
  );
  const prefersReducedMotion = useReducedMotion();

  const activeLayer =
    QA_PYRAMID_LAYERS.find((layer) => layer.id === activeLayerId) ??
    QA_PYRAMID_LAYERS[0];

  const activeStep =
    CICD_PIPELINE_STEPS.find((step) => step.id === activeStepId) ??
    CICD_PIPELINE_STEPS[0];

  const pyramidWidths: Record<QAPyramidLayer['id'], string> = {
    e2e: 'w-[78%] sm:w-[76%]',
    api: 'w-[89%] sm:w-[88%]',
    unit: 'w-full',
  };

  return (
    <section
      id="qa-engineering"
      aria-labelledby="qa-heading"
      className="py-20 sm:py-24 px-4 sm:px-6 border-t border-zinc-200 dark:border-zinc-800/90"
    >
      <div className="mx-auto max-w-5xl space-y-14">
        {/* Section intro */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.45 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400">
            03. Quality Assurance Engineering
          </p>
          <h2
            id="qa-heading"
            className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
          >
            Built to survive production
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Shipping quickly only compounds when releases do not break yesterday&apos;s features. Every application I deliver is protected by a layered testing pyramid and automated CI/CD gates.
          </p>
        </motion.div>

        {/* Interactive Testing Pyramid + Inspection Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: 3-tier clickable/hoverable pyramid */}
          <div className="lg:col-span-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                Interactive Testing Pyramid
              </h3>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Select or hover any tier to inspect tools and verification scope.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Testing pyramid layers"
              className="mt-8 mb-4 flex flex-col items-center gap-3"
            >
              {QA_PYRAMID_LAYERS.map((layer) => {
                const isSelected = layer.id === activeLayerId;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveLayerId(layer.id)}
                    onMouseEnter={() => setActiveLayerId(layer.id)}
                    className={`relative ${pyramidWidths[layer.id]} rounded-xl border px-4 py-3.5 text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600/60 dark:border-emerald-500/60 bg-emerald-50/70 dark:bg-emerald-500/10'
                        : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className={`text-sm font-semibold whitespace-nowrap ${
                          isSelected
                            ? 'text-zinc-950 dark:text-zinc-50'
                            : 'text-zinc-800 dark:text-zinc-200'
                        }`}
                      >
                        {layer.title}
                      </span>
                      <span className="font-mono text-[11px] tabular-nums text-zinc-500 dark:text-zinc-400 whitespace-nowrap shrink-0">
                        {layer.shareOfSuite}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-[11px] text-emerald-700 dark:text-emerald-400">
                      {layer.tools.join(' · ')}
                    </p>
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 text-center">
              Broad fast foundation · Targeted high-confidence browser checks
            </p>
          </div>

          {/* Right: Live detail panel */}
          <div className="lg:col-span-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] p-6 sm:p-7 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer.id}
                initial={
                  prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }
                }
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.18 }}
                className="space-y-6"
              >
                <div className="pb-5 border-b border-zinc-100 dark:border-zinc-800/80">
                  <p className="font-mono text-xs text-emerald-700 dark:text-emerald-400">
                    {activeLayer.tierLabel}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                      {activeLayer.title}
                    </h3>
                    <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {activeLayer.tools.join(' · ')}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {activeLayer.description}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    What gets verified at this layer
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {activeLayer.verifications.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-zinc-800 dark:text-zinc-200"
                      >
                        <Check
                          className="w-4 h-4 mt-0.5 text-emerald-600 dark:text-emerald-400 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2.5">
                  <div className="flex items-center gap-2 font-mono text-xs text-zinc-700 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 rounded-lg px-3.5 py-2.5 overflow-x-auto">
                    <Terminal
                      className="w-3.5 h-3.5 text-zinc-400 shrink-0"
                      aria-hidden="true"
                    />
                    <code className="whitespace-nowrap">
                      {activeLayer.sampleCommand}
                    </code>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Execution scope: <span className="text-zinc-700 dark:text-zinc-300">{activeLayer.executionTarget}</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CI/CD Quality Gate Flow */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] p-6 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-zinc-100 dark:border-zinc-800/80">
            <div>
              <h3 className="text-base sm:text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                CI/CD Quality Gate Pipeline
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Every commit must clear five automated stages before reaching production.
              </p>
            </div>
            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400 tabular-nums">
              5 automated gates
            </span>
          </div>

          {/* Horizontal pipeline steps */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {CICD_PIPELINE_STEPS.map((step, idx) => {
              const isSelected = step.id === activeStepId;
              return (
                <div key={step.id} className="relative flex items-center">
                  <button
                    type="button"
                    onClick={() => setActiveStepId(step.id)}
                    aria-pressed={isSelected}
                    className={`w-full h-full rounded-xl border p-4 text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600/60 dark:border-emerald-500/60 bg-emerald-50/60 dark:bg-emerald-500/10'
                        : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-medium text-emerald-700 dark:text-emerald-400 tabular-nums">
                        {step.stepNumber}
                      </span>
                      <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 tabular-nums">
                        {step.typicalDuration}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50 leading-snug">
                      {step.title}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                      {step.toolSummary}
                    </p>
                  </button>

                  {idx < CICD_PIPELINE_STEPS.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="hidden lg:flex items-center justify-center -mr-2.5 ml-0.5 z-10 text-zinc-300 dark:text-zinc-700"
                    >
                      <motion.span
                        animate={
                          prefersReducedMotion
                            ? undefined
                            : { opacity: [0.35, 1, 0.35] }
                        }
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          delay: idx * 0.35,
                          ease: 'easeInOut',
                        }}
                      >
                        <ChevronRight className="w-4 h-4 text-emerald-600/70 dark:text-emerald-400/70" />
                      </motion.span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Selected gate inspection bar */}
          <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
            <div className="flex items-baseline gap-2.5">
              <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100 whitespace-nowrap shrink-0">
                Gate {activeStep.stepNumber} · {activeStep.title}:
              </span>
              <span className="text-zinc-600 dark:text-zinc-400">
                {activeStep.gateCondition}
              </span>
            </div>
            <span className="font-mono text-xs text-emerald-700 dark:text-emerald-400 tabular-nums whitespace-nowrap shrink-0">
              Avg {activeStep.typicalDuration}
            </span>
          </div>
        </div>

        {/* Quality Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {QA_METRICS.map((metric, idx) => (
            <motion.div
              key={metric.id}
              initial={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.4,
                delay: prefersReducedMotion ? 0 : idx * 0.05,
              }}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] p-5 flex flex-col justify-between gap-3"
            >
              <p className="font-mono text-2xl sm:text-3xl font-semibold tracking-tight tabular-nums text-zinc-950 dark:text-zinc-50">
                {metric.value}
              </p>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {metric.label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {metric.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
