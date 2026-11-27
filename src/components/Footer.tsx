import { ArrowUp } from 'lucide-react';
import { PROFILE_CONFIG } from '../data/portfolioData';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800/90 py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span>
            © {new Date().getFullYear()} {PROFILE_CONFIG.name}
          </span>
          <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">
            ·
          </span>
          <span>Built with React, TypeScript, Tailwind CSS &amp; Framer Motion</span>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
