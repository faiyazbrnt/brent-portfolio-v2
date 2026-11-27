import type {
  InquiryType,
  ProjectCategory,
  ProjectItem,
} from '../data/portfolioData';

export type ThemeMode = 'light' | 'dark';

export interface ContactFormValues {
  name: string;
  email: string;
  inquiryType: InquiryType;
  message: string;
}

export interface ContactValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormValues, string>>;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Filters projects by selected category, preserving source ordering.
 */
export function filterProjectsByCategory(
  projects: ProjectItem[],
  category: ProjectCategory
): ProjectItem[] {
  if (category === 'All') {
    return projects;
  }
  return projects.filter((project) => project.category === category);
}

/**
 * Computes deterministic counts for each project category tab.
 */
export function getProjectCategoryCounts(
  projects: ProjectItem[]
): Record<ProjectCategory, number> {
  const counts: Record<ProjectCategory, number> = {
    All: projects.length,
    'Full-Stack': 0,
    'AI Automation': 0,
    'QA & Testing': 0,
  };

  for (const project of projects) {
    counts[project.category] += 1;
  }

  return counts;
}

/**
 * Validates the contact form with clear, human-readable inline messages.
 */
export function validateContactForm(
  values: ContactFormValues
): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormValues, string>> = {};

  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const trimmedMessage = values.message.trim();

  if (trimmedName.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (trimmedMessage.length < 15) {
    errors.message =
      'Please share a short summary of your project or role (at least 15 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Resolves the initial theme preference cleanly from stored preference or system setting.
 */
export function resolveInitialTheme(
  storedTheme: string | null,
  prefersDark: boolean
): ThemeMode {
  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme;
  }
  return prefersDark ? 'dark' : 'light';
}

/**
 * Toggles light/dark mode deterministically.
 */
export function getNextTheme(current: ThemeMode): ThemeMode {
  return current === 'dark' ? 'light' : 'dark';
}
