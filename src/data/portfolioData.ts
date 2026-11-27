/**
 * ============================================================================
 * PORTFOLIO SINGLE-SOURCE CONTENT CONFIGURATION
 * ============================================================================
 * Swap in your personal details, portrait image, projects, QA metrics, and
 * social links below. Every customizable field is marked with `// EDIT HERE`.
 */

// EDIT HERE: Replace with your own portrait photo path (e.g. '/portrait.jpg') or hosted URL.
export const PROFILE_IMAGE =
  '/src/assets/images/brent_portrait.jpg';

export type ProjectCategory =
  | 'All'
  | 'Full-Stack'
  | 'AI Automation'
  | 'QA & Testing';

export type InquiryType =
  | 'Freelance Project'
  | 'Full-Time Role'
  | 'AI Automation Consulting';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface ProfileConfig {
  name: string;
  monogram: string;
  role: string;
  location: string;
  availability: string;
  headline: string;
  subheadline: string;
  email: string;
  resumeUrl: string;
  resumeFileName: string;
  portraitAlt: string;
  portraitBadgeLabel: string;
  portraitBadgeDetail: string;
  trustDisciplines: string[];
  heroProofStats: Array<{
    value: string;
    label: string;
    context: string;
  }>;
}

export interface StackTool {
  name: string;
  role: string;
}

export interface DatabaseSubgroup {
  kind: 'Relational (SQL)' | 'NoSQL & In-Memory';
  rationale: string;
  tools: StackTool[];
}

export interface TechPillar {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  summary: string;
  tools?: StackTool[];
  databaseGroups?: DatabaseSubgroup[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'All'>;
  year: string;
  clientOrScope: string;
  summary: string;
  laymanBrief: string;
  outcomeMetric: string;
  image?: string;
  imageAlt: string;
  placeholderModules?: string[];
  problemStatement: string;
  architectureAndDb: string;
  qaCoverage: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface QAPyramidLayer {
  id: 'e2e' | 'api' | 'unit';
  tierLabel: string;
  title: string;
  tools: string[];
  executionTarget: string;
  shareOfSuite: string;
  description: string;
  verifications: string[];
  sampleCommand: string;
}

export interface PipelineStep {
  id: string;
  stepNumber: string;
  title: string;
  toolSummary: string;
  gateCondition: string;
  typicalDuration: string;
}

export interface QAMetric {
  id: string;
  value: string;
  label: string;
  detail: string;
}

export interface SocialLink {
  id: 'github' | 'linkedin' | 'upwork';
  label: string;
  handle: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'stack', label: 'Stack', href: '#stack' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'qa-engineering', label: 'QA Engineering', href: '#qa-engineering' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const PROFILE_CONFIG: ProfileConfig = {
  // EDIT HERE: Your full name & monogram
  name: 'Brent Go',
  monogram: 'BG',
  // EDIT HERE: Your headline title & location
  role: 'Full-Stack Engineer · QA Automation · AI Systems',
  location: 'San Francisco & Remote Worldwide',
  // EDIT HERE: Availability line (no flashing dots — clean editorial framing)
  availability: 'Available for Freelance & Full-Time Roles',
  headline:
    'Full-stack software engineered to ship cleanly and hold up in production.',
  subheadline:
    'I build resilient web platforms across SQL and NoSQL architectures, back every release with automated QA pipelines, and deploy practical AI workflows that eliminate manual operations.',
  // EDIT HERE: Your contact email & resume path
  email: 'brentliamemmanuelgo@gmail.com',
  resumeUrl: '/resume.pdf',
  resumeFileName: 'Brent-Liam-Go-Resume.pdf',
  portraitAlt:
    'Portrait of Brent Go, Full-Stack Developer specializing in QA Automation and AI Workflows',
  // EDIT HERE: Subtle badge caption over portrait frame
  portraitBadgeLabel: 'Production-Tested Code',
  portraitBadgeDetail: 'SQL + NoSQL · Automated QA · AI Workflows',
  trustDisciplines: [
    'Full-Stack Systems',
    'QA Automation',
    'SQL & NoSQL',
    'AI Workflows',
  ],
  // EDIT HERE: Replace with your real career/delivery metrics
  heroProofStats: [
    {
      value: '99.4%',
      label: 'Release stability',
      context: 'Across production deploys gated by automated E2E and API checks',
    },
    {
      value: '40+ hrs',
      label: 'Weekly ops automated',
      context: 'Saved for clients via LangChain, n8n, and custom FastAPI agents',
    },
    {
      value: 'SQL + NoSQL',
      label: 'Polyglot data design',
      context: 'PostgreSQL & MySQL transactions paired with MongoDB & Redis speed',
    },
    {
      value: '< 6 min',
      label: 'CI/CD quality gate',
      context: 'Type checks, unit tests, API contracts, and browser smoke runs',
    },
  ],
};

export const TECH_STACK_PILLARS: TechPillar[] = [
  {
    id: 'frontend',
    index: '01',
    title: 'Frontend Engineering',
    subtitle: 'Accessible, fast interfaces with strict type safety',
    summary:
      'Component architectures designed for predictable state, smooth micro-interactions, and crisp Core Web Vitals.',
    tools: [
      { name: 'React', role: 'Modular UI systems & custom hooks' },
      { name: 'Next.js', role: 'SSR, App Router, edge caching & SEO' },
      { name: 'TypeScript', role: 'End-to-end static contracts & strict schemas' },
      { name: 'Tailwind CSS', role: 'Design-system tokens & responsive layout craft' },
    ],
  },
  {
    id: 'backend',
    index: '02',
    title: 'Backend & APIs',
    subtitle: 'Fault-tolerant services in TypeScript and Python',
    summary:
      'Clean modular monoliths and event-driven APIs engineered for observability, idempotency, and horizontal scale.',
    tools: [
      { name: 'Node.js & Express', role: 'High-throughput REST APIs & webhook workers' },
      { name: 'NestJS', role: 'Enterprise DI modules, guards & OpenAPI specs' },
      { name: 'Python & FastAPI', role: 'Async microservices & AI orchestration backends' },
      { name: 'Django', role: 'Admin-ready platforms, ORM migrations & auth' },
    ],
  },
  {
    id: 'databases',
    index: '03',
    title: 'Databases & Data Layer',
    subtitle: 'Matching storage engines to consistency and latency needs',
    summary:
      'Deliberate polyglot persistence — strict relational integrity for ledgers and billing, flexible documents and in-memory caches for speed.',
    databaseGroups: [
      {
        kind: 'Relational (SQL)',
        rationale:
          'Chosen for ACID transactions, strict foreign-key integrity, and complex analytical joins.',
        tools: [
          {
            name: 'PostgreSQL',
            role: 'Primary transactional store, JSONB hybrid columns & indexing',
          },
          {
            name: 'MySQL',
            role: 'High-concurrency commerce catalogs & read-replica tuning',
          },
        ],
      },
      {
        kind: 'NoSQL & In-Memory',
        rationale:
          'Chosen for evolving semi-structured payloads, sub-millisecond reads, and reliable background queues.',
        tools: [
          {
            name: 'MongoDB',
            role: 'Flexible workflow logs, AI trace documents & aggregation pipelines',
          },
          {
            name: 'Redis',
            role: 'Distributed caching, rate limiting, sessions & BullMQ job queues',
          },
        ],
      },
    ],
  },
  {
    id: 'qa',
    index: '04',
    title: 'QA & Test Automation',
    subtitle: 'Automated quality gates built directly into delivery',
    summary:
      'Quality is engineered upfront rather than patched after launch — covering logic, API contracts, and real browser journeys.',
    tools: [
      { name: 'Playwright', role: 'Cross-browser E2E suites, trace artifacts & visual diffs' },
      { name: 'Cypress', role: 'Component testing & deterministic UI flow verification' },
      { name: 'Jest', role: 'Fast unit coverage for domain rules & service layers' },
      { name: 'Postman', role: 'Automated API contract assertions & Newman CI runs' },
    ],
  },
  {
    id: 'ai',
    index: '05',
    title: 'AI Automation & Agents',
    subtitle: 'Reliable LLM workflows connected to real business tools',
    summary:
      'Deterministic guardrails around generative models — turning unstructured inputs into validated actions across CRMs, docs, and APIs.',
    tools: [
      { name: 'n8n', role: 'Self-hosted multi-step automations & webhook orchestration' },
      { name: 'Make', role: 'Rapid client ops integrations across SaaS ecosystems' },
      { name: 'LangChain', role: 'Structured output chains, tool-calling & RAG retrieval' },
      { name: 'LLM APIs', role: 'Evaluation harnesses, fallback routing & prompt versioning' },
    ],
  },
];

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'All',
  'Full-Stack',
  'AI Automation',
  'QA & Testing',
];

// EDIT HERE: Real portfolio projects displayed in the peek carousel showcase.
export const PROJECTS: ProjectItem[] = [
  {
    id: 'bos-coffee-careers',
    title: "Bo's Coffee Careers",
    subtitle: 'Public Recruitment & Applicant Portal',
    category: 'Full-Stack',
    year: '2026',
    clientOrScope: "Bo's Coffee Philippines",
    summary:
      'Public hiring portal where job seekers explore open store and corporate roles nationwide and track their application status.',
    laymanBrief:
      "An online job portal for Bo's Coffee Philippines where applicants can browse open store and corporate roles across 100+ branches, submit applications online, and track where they are in the hiring process.",
    outcomeMetric: 'Live on Vercel · 100+ nationwide store roles',
    image: '/projects/bos-coffee-careers.png',
    imageAlt:
      "Bo's Coffee Careers web application landing page showing the brand overview and applicant sign-in gateway",
    problemStatement:
      'Job applicants across nationwide branches needed one accessible place to discover openings, sign in, and follow hiring updates without manual email back-and-forth.',
    architectureAndDb:
      'Built with a responsive web frontend, Google and email authentication, dark mode support, and instant demo applicant access for fast evaluation.',
    qaCoverage:
      'Verified across desktop and mobile viewports for auth flows, form validation, and dark/light theme parity.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Auth Gateway', 'Vercel'],
    liveUrl: 'https://bo-s-coffee-careers.vercel.app/',
  },
  {
    id: 'bos-coffee-hr-system',
    title: "Bo's Coffee HR System",
    subtitle: 'Centralized HR Management & Analytics',
    category: 'Full-Stack',
    year: '2026',
    clientOrScope: "Bo's Coffee Internal HR",
    summary:
      'Role-based human resources portal for managing branch teams, employee workflows, and workforce analytics.',
    laymanBrief:
      "A central workspace for Bo's Coffee HR teams to manage branch staff, track employee records, and view workforce analytics—with tailored access for each HR role.",
    outcomeMetric: 'Live on Vercel · Role-based HR workspaces',
    image: '/projects/bos-coffee-hr.png',
    imageAlt:
      "Bo's Coffee Centralized HR Management and Analytics portal login screen with Microsoft sign-in and demo role selector",
    problemStatement:
      'HR coordinators needed a unified portal to oversee multi-branch teams without juggling disconnected spreadsheets and manual status updates.',
    architectureAndDb:
      'Designed around role-scoped workspaces with Microsoft SSO support, interactive demo role switching, and centralized analytics views.',
    qaCoverage:
      'Tested role-based access boundaries, demo session switching, and responsive dashboard layouts.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'RBAC', 'Vercel'],
    liveUrl: 'https://bo-s-coffee-hr-system.vercel.app/',
  },
  {
    id: 'sales-reimbursement-system',
    title: 'Sales Reimbursement System',
    subtitle: 'Expense Submission & Approval Workflow',
    category: 'Full-Stack',
    year: '2026',
    clientOrScope: 'Microgenesis Internal Ops',
    summary:
      'Structured reimbursement workspace where sales teams file expenses, route approvals, and monitor payout progress.',
    laymanBrief:
      'An internal expense portal that lets sales employees submit receipts and reimbursement requests, route them for manager approval, and track payout status in one place.',
    outcomeMetric: 'Live on Vercel · End-to-end approval tracking',
    image: '/projects/sales-reimbursement.png',
    imageAlt:
      'Sales Reimbursement System sign-in screen for Microgenesis employees featuring Microsoft work account login and demo access',
    problemStatement:
      'Sales representatives previously relied on scattered forms and emails to claim field expenses, slowing down finance reviews and reimbursements.',
    architectureAndDb:
      'Built with Microsoft work account sign-in, structured approval state transitions, and role-based demo preview access.',
    qaCoverage:
      'Validated submission workflows, approval state transitions, and access-control guards.',
    techStack: ['React', 'TypeScript', 'Microsoft SSO', 'Approval Workflows', 'Vercel'],
    liveUrl: 'https://sales-reimbursment-system.vercel.app/',
  },
  {
    id: 'chronos-ledger',
    title: 'ChronosLedger',
    subtitle: 'Daily Time Record & Personal Budgeting',
    category: 'Full-Stack',
    year: '2026',
    clientOrScope: 'Productivity & Finance App',
    summary:
      'Daily time record (DTR) and personal budget tracker with live analytics and automated lunch break snapshotting.',
    laymanBrief:
      'A personal daily time record (DTR) and budgeting app that tracks work hours, logs lunch breaks automatically, and gives live analytics on both time and spending.',
    outcomeMetric: 'Live on Vercel · Automated DTR & live analytics',
    image: '/projects/chronos-ledger.png',
    imageAlt:
      'ChronosLedger sign-in interface with clean email authentication and light/dark theme switcher',
    problemStatement:
      'Keeping daily work logs and personal expenses synchronized across separate tools made it hard to see real-time hours and budget balance.',
    architectureAndDb:
      'Combines authenticated user accounts, automated lunch-break snapshotting, and real-time time/budget summaries in a fast web app.',
    qaCoverage:
      'Covered authentication flows, time-calculation edge cases, and light/dark UI states.',
    techStack: ['React', 'TypeScript', 'Analytics', 'DTR Engine', 'Vercel'],
    liveUrl: 'https://chronos-ledger-brnt.vercel.app/',
  },
  {
    id: 'chronos-time-payroll',
    title: 'Chronos Time Management & Payroll',
    subtitle: 'Enterprise Attendance & Payroll Platform',
    category: 'Full-Stack',
    year: '2025',
    clientOrScope: 'Internal Enterprise System',
    summary:
      'Company-wide attendance tracking and payroll computation platform integrated with Microsoft authentication.',
    laymanBrief:
      'An enterprise timekeeping and payroll system secured with Microsoft sign-in. It tracks employee attendance, calculates work hours and overtime, and streamlines payroll processing for the whole organization.',
    outcomeMetric: 'Internal deployment · Microsoft SSO & Payroll',
    image: '/projects/chronos-time-payroll.png',
    imageAlt:
      'Chronos Time Tracking System welcome screen with deep navy-blue gradient background and Sign in with Microsoft button',
    problemStatement:
      'Manual timesheet consolidation and payroll computation created recurring delays and reconciliation errors every cutoff period.',
    architectureAndDb:
      'Built on relational payroll and attendance tables with Microsoft OAuth sign-in, cutoff calculations, and auditable time logs.',
    qaCoverage:
      'Verified overtime rules, cutoff boundary math, and Microsoft SSO session handling.',
    techStack: ['Full-Stack', 'Microsoft SSO', 'SQL', 'Timekeeping', 'Payroll'],
  },
  {
    id: 'oneops-system',
    title: 'OneOps System',
    subtitle: 'TASS · CRM · BRF · RFQ Unified Suite',
    category: 'AI Automation',
    year: '2025',
    clientOrScope: 'Internal Operations Platform',
    summary:
      'Unified internal operations platform combining TASS, CRM, Business Request Forms (BRF), and Request for Quotation (RFQ) workflows.',
    laymanBrief:
      'An all-in-one internal operations suite bringing four business workflows together: TASS for service ticketing, CRM for customer management, BRF for business requests, and RFQ for vendor price quotes.',
    outcomeMetric: 'Internal deployment · 4 integrated business modules',
    imageAlt:
      'OneOps System visual placeholder highlighting its four integrated modules: TASS System, CRM, BRF, and RFQ System',
    placeholderModules: ['TASS System', 'CRM', 'BRF', 'RFQ System'],
    problemStatement:
      'Operations, sales, and procurement teams were switching between four separate tools to track tickets, clients, internal requests, and supplier quotes.',
    architectureAndDb:
      'Architected as a modular multi-workflow platform unifying TASS, CRM, BRF, and RFQ data models under one shared internal workspace.',
    qaCoverage:
      'End-to-end validation across cross-module handoffs, request approvals, and quotation tracking.',
    techStack: ['TASS', 'CRM', 'BRF', 'RFQ', 'Internal Suite'],
  },
];

export const QA_PYRAMID_LAYERS: QAPyramidLayer[] = [
  {
    id: 'e2e',
    tierLabel: 'Top Tier · Real Browser Journeys',
    title: 'End-to-End (E2E)',
    tools: ['Playwright', 'Cypress'],
    executionTarget: 'Critical user & revenue flows on every PR',
    shareOfSuite: '15% of suite',
    description:
      'Validates real browser rendering, authentication, checkout, and multi-step interactive flows across desktop and mobile viewports with trace capture on failure.',
    verifications: [
      'Auth login, session expiry, and role-based access paths',
      'Core client conversion flows, modals, and form submissions',
      'Cross-browser layout integrity and zero uncaught console errors',
    ],
    sampleCommand: 'npx playwright test --project=chromium --workers=4',
  },
  {
    id: 'api',
    tierLabel: 'Middle Tier · Service & Data Contracts',
    title: 'API & Integration',
    tools: ['Postman', 'Newman', 'Supertest'],
    executionTarget: 'Endpoint schemas, DB transactions & webhook handshakes',
    shareOfSuite: '30% of suite',
    description:
      'Verifies REST/JSON response contracts, HTTP status codes, database constraints (PostgreSQL/MySQL/MongoDB), and third-party automation webhooks in isolation.',
    verifications: [
      'Strict request/response payload schema & status code assertions',
      'Idempotency keys, rate limiting, and Redis cache invalidation',
      'Error handling for malformed inputs and upstream timeouts',
    ],
    sampleCommand: 'newman run collections/api-contracts.json --bail',
  },
  {
    id: 'unit',
    tierLabel: 'Foundation · Fast Deterministic Logic',
    title: 'Unit & Domain Logic',
    tools: ['Jest', 'TypeScript'],
    executionTarget: 'Pure business rules, pricing math & data parsers',
    shareOfSuite: '55% of suite',
    description:
      'Millisecond feedback loops covering state transitions, billing calculations, validation helpers, and AI payload normalizers before code ever reaches staging.',
    verifications: [
      'Edge-case boundary coverage for financial & scheduling logic',
      'Input sanitization, form validation, and parser resilience',
      'Fast local execution (< 3s) encouraging fearless refactoring',
    ],
    sampleCommand: 'npx jest --coverage --runInBand',
  },
];

export const CICD_PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 'push',
    stepNumber: '01',
    title: 'Code Push',
    toolSummary: 'Git PR & branch rules',
    gateCondition: 'Conventional commit, scoped diff, and clean merge base verified.',
    typicalDuration: '5s',
  },
  {
    id: 'static',
    stepNumber: '02',
    title: 'Static Types & Lint',
    toolSummary: 'TypeScript & ESLint',
    gateCondition: 'Zero strict-mode type errors, unused symbols, or accessibility lint violations.',
    typicalDuration: '28s',
  },
  {
    id: 'tests',
    stepNumber: '03',
    title: 'Automated Test Suite',
    toolSummary: 'Jest · Postman · Playwright',
    gateCondition: 'Unit, API contract, and sharded browser E2E suites pass 100%.',
    typicalDuration: '3m 40s',
  },
  {
    id: 'uat',
    stepNumber: '04',
    title: 'UAT & Regression Check',
    toolSummary: 'Preview env & smoke suite',
    gateCondition: 'Staging migration dry-run, visual diff review, and stakeholder sign-off.',
    typicalDuration: '1m 15s',
  },
  {
    id: 'release',
    stepNumber: '05',
    title: 'Production Release',
    toolSummary: 'Zero-downtime deploy',
    gateCondition: 'Health checks green, telemetry verified, instant rollback ready.',
    typicalDuration: '45s',
  },
];

// EDIT HERE: Customize these quality metrics with your verified project benchmarks.
export const QA_METRICS: QAMetric[] = [
  {
    id: 'e2e-coverage',
    value: '96%',
    label: 'Critical Flow E2E Coverage',
    detail: 'Editable benchmark · Auth, billing, and core user journeys automated in Playwright',
  },
  {
    id: 'api-contracts',
    value: '180+',
    label: 'Automated API Contract Checks',
    detail: 'Editable benchmark · Schema, auth, and error-path assertions run via Postman in CI',
  },
  {
    id: 'defect-prevention',
    value: '84%',
    label: 'Pre-Release Defect Prevention',
    detail: 'Editable benchmark · Regressions caught in pull requests before reaching staging',
  },
  {
    id: 'zero-regression',
    value: '32 / 32',
    label: 'Zero-Rollback Releases',
    detail: 'Editable benchmark · Consecutive production launches without emergency hotfixes',
  },
];

export const INQUIRY_TYPES: InquiryType[] = [
  'Freelance Project',
  'Full-Time Role',
  'AI Automation Consulting',
];

// EDIT HERE: Replace with your real social profile URLs and handles.
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    handle: 'github.com/faiyazbrnt',
    href: 'https://github.com/faiyazbrnt',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'linkedin.com/in/brent-liam-emmanuel-go',
    href: 'https://www.linkedin.com/in/brent-liam-emmanuel-go/',
  },
  {
    id: 'upwork',
    label: 'Upwork & Consulting',
    handle: 'Top-Rated Full-Stack & QA',
    href: 'https://www.upwork.com/freelancers/~019fffe659432e85fb',
  },
];

export const CONTACT_CONFIG = {
  // EDIT HERE: Tailor your recruiter & client pitch copy
  recruiterTitle: 'Hiring for a Full-Stack or QA-minded engineer?',
  recruiterBody:
    'I join product teams where architectural ownership, clean TypeScript/Python codebases, and automated testing culture directly accelerate release velocity.',
  clientTitle: 'Need a reliable app or AI workflow built?',
  clientBody:
    'From production SaaS MVPs to autonomous n8n and LangChain pipelines, I deliver scoped milestones backed by automated tests so launch day stays calm.',
};
