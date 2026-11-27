import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[], defaultSection: string) {
  const [activeSection, setActiveSection] = useState<string>(defaultSection);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const visibleRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleRatios.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleRatios.delete(entry.target.id);
          }
        }

        if (visibleRatios.size > 0) {
          let bestId = defaultSection;
          let bestRatio = -1;
          for (const id of sectionIds) {
            const ratio = visibleRatios.get(id);
            if (ratio !== undefined && ratio > bestRatio) {
              bestRatio = ratio;
              bestId = id;
            }
          }
          setActiveSection(bestId);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0, 0.15, 0.35, 0.6],
      }
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionIds, defaultSection]);

  return { activeSection, setActiveSection };
}
