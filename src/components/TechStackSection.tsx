import { motion, useReducedMotion } from 'framer-motion';
import { TECH_STACK_PILLARS, type TechPillar } from '../data/portfolioData';

function PillarCard({
  pillar,
  index,
}: {
  pillar: TechPillar;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const isDatabasePillar = Boolean(pillar.databaseGroups);

  return (
    <motion.article
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.45,
        delay: prefersReducedMotion ? 0 : index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] p-6 sm:p-7 ${
        isDatabasePillar ? 'lg:col-span-2' : ''
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-5 border-b border-zinc-100 dark:border-zinc-800/80">
        <div>
          <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 tabular-nums">
            {pillar.index}. {pillar.subtitle}
          </p>
          <h3 className="mt-1.5 text-lg sm:text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            {pillar.title}
          </h3>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-3xl">
        {pillar.summary}
      </p>

      {isDatabasePillar && pillar.databaseGroups ? (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 md:divide-x md:divide-zinc-200 dark:md:divide-zinc-800">
          {pillar.databaseGroups.map((group, groupIdx) => (
            <div
              key={group.kind}
              className={
                groupIdx === 0 ? 'md:pr-7 space-y-4' : 'md:pl-7 space-y-4'
              }
            >
              <div>
                <h4 className="text-sm font-semibold text-zinc-950 dark:text-zinc-100 flex items-center justify-between">
                  <span>{group.kind}</span>
                  <span className="font-mono text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                    {groupIdx === 0 ? 'ACID & Integrity' : 'Speed & Flexibility'}
                  </span>
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {group.rationale}
                </p>
              </div>

              <dl className="divide-y divide-zinc-100 dark:divide-zinc-800/75 border-t border-zinc-100 dark:border-zinc-800/75">
                {group.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-3 items-baseline"
                  >
                    <dt className="sm:col-span-4 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      {tool.name}
                    </dt>
                    <dd className="sm:col-span-8 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {tool.role}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      ) : (
        <dl className="mt-5 divide-y divide-zinc-100 dark:divide-zinc-800/75 border-t border-zinc-100 dark:border-zinc-800/75">
          {pillar.tools?.map((tool) => (
            <div
              key={tool.name}
              className="py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-3 items-baseline"
            >
              <dt className="sm:col-span-4 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                {tool.name}
              </dt>
              <dd className="sm:col-span-8 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                {tool.role}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </motion.article>
  );
}

export function TechStackSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="py-20 sm:py-24 px-4 sm:px-6 border-t border-zinc-200 dark:border-zinc-800/90"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.45 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400">
            01. Technical Architecture
          </p>
          <h2
            id="stack-heading"
            className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
          >
            Five pillars engineered to work together
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Rather than treating UI, databases, automated testing, and AI workflows as separate silos, I architect them as one coherent delivery system.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {TECH_STACK_PILLARS.map((pillar, idx) => (
            <PillarCard key={pillar.id} pillar={pillar} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
