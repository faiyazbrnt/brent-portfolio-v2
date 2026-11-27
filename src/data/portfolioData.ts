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
  category: Exclude<ProjectCategory, 'All'>;
  year: string;
  clientOrScope: string;
  summary: string;
  outcomeMetric: string;
  image: string;
  imageAlt: string;
  problemStatement: string;
  architectureAndDb: string;
  qaCoverage: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
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

// EDIT HERE: Replace these 4 structured case studies with your own real projects.
export const PROJECTS: ProjectItem[] = [
  {
    id: 'pulseledger-saas',
    title: 'PulseLedger — Multi-Tenant SaaS Billing & Analytics Platform',
    category: 'Full-Stack',
    year: '2026',
    clientOrScope: 'B2B SaaS Architecture',
    summary:
      'End-to-end subscription, usage metering, and revenue reporting platform built for fast-growing software teams with strict tenant isolation.',
    outcomeMetric: '99.98% billing accuracy · 180ms p95 dashboard load',
    image: '/src/assets/images/project_saas_platform_1795763698879.jpg',
    imageAlt:
      'PulseLedger SaaS billing and analytics dashboard rendered on a laptop',
    problemStatement:
      'Growing B2B teams struggled with mismatched Stripe webhook states, slow invoice reconciliation across seats, and regressions whenever pricing tiers changed.',
    architectureAndDb:
      'Built a Next.js App Router frontend backed by a modular NestJS API. PostgreSQL serves as the ACID-compliant source of truth with row-level tenant boundaries and idempotent ledger tables, while Redis caches aggregated MRR snapshots and coordinates retryable webhook queues.',
    qaCoverage:
      'Protected by 140+ Jest unit specs on proration math, Postman/Newman webhook contract suites, and Playwright E2E flows verifying checkout, plan upgrades, and role permissions on every pull request.',
    techStack: ['Next.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'Playwright'],
    // EDIT HERE: Replace with live demo & GitHub repository URLs
    liveUrl: 'https://example.com/pulseledger-demo',
    githubUrl: 'https://github.com/example/pulseledger-saas',
  },
  {
    id: 'relayflow-ai-engine',
    title: 'RelayFlow — Autonomous AI Workflow & Document Triage Engine',
    category: 'AI Automation',
    year: '2026',
    clientOrScope: 'Client Automation System',
    summary:
      'RAG-powered ingestion and agent routing pipeline that classifies inbound client briefs, extracts structured fields, and syncs directly to CRM and Slack.',
    outcomeMetric: '38 hrs/wk manual triage saved · 96.4% precision',
    image: '/src/assets/images/project_ai_automation_1795763697998.jpg',
    imageAlt:
      'RelayFlow node-based AI automation workflow pipeline displayed on a studio monitor',
    problemStatement:
      'Operations teams spent hours manually reading PDFs, emails, and support forms to populate CRM records, leading to slow response times and inconsistent data entry.',
    architectureAndDb:
      'Engineered an async Python + FastAPI orchestration service combining LangChain structured-output chains with n8n webhook triggers. MongoDB stores flexible document traces, versioned prompt runs, and human-in-the-loop audit logs without rigid schema migrations.',
    qaCoverage:
      'Includes an automated LLM golden-dataset evaluation suite checking JSON schema validity, hallucination thresholds, and latency budgets before any prompt or model update deploys.',
    techStack: ['Python', 'FastAPI', 'LangChain', 'n8n', 'MongoDB', 'LLM APIs'],
    // EDIT HERE: Replace with live demo & GitHub repository URLs
    liveUrl: 'https://example.com/relayflow-demo',
    githubUrl: 'https://github.com/example/relayflow-ai-engine',
  },
  {
    id: 'sentinel-qa-framework',
    title: 'SentinelQA — Cross-Browser E2E & API Regression Framework',
    category: 'QA & Testing',
    year: '2025',
    clientOrScope: 'QA Engineering & CI/CD',
    summary:
      'Reusable test automation architecture unifying Playwright browser suites, Cypress component checks, Jest logic specs, and Postman API contracts in GitHub Actions.',
    outcomeMetric: '82% drop in escaped production bugs · 4.8 min sharded CI runs',
    image: '/src/assets/images/project_qa_framework_1795763701446.jpg',
    imageAlt:
      'SentinelQA automated testing dashboard showing pass timelines and API assertions',
    problemStatement:
      'Weekly releases required 6+ hours of brittle manual smoke testing, yet subtle checkout and auth regressions still slipped into production after dependency updates.',
    architectureAndDb:
      'Designed a Page Object Model test harness with deterministic database seed fixtures, parallel CI sharding across 4 runners, automated trace/video uploads on failure, and strict JSON schema contract tests.',
    qaCoverage:
      'Covers 100% of critical revenue journeys across Chromium, WebKit, and mobile viewports, plus automated smoke checks against staging immediately prior to production promotion.',
    techStack: ['Playwright', 'Cypress', 'Jest', 'Postman', 'TypeScript', 'GitHub Actions'],
    // EDIT HERE: Replace with live demo & GitHub repository URLs
    liveUrl: 'https://example.com/sentinel-qa-report',
    githubUrl: 'https://github.com/example/sentinel-qa-framework',
  },
  {
    id: 'meridian-commerce-ops',
    title: 'MeridianOps — High-Throughput E-Commerce & Fulfillment API',
    category: 'Full-Stack',
    year: '2025',
    clientOrScope: 'Commerce Infrastructure',
    summary:
      'Inventory reservation, order routing, and automated supplier sync API engineered to absorb flash-sale traffic spikes without overselling stock.',
    outcomeMetric: '2,400 req/sec peak sustained · Zero oversold inventory events',
    image: '/src/assets/images/project_ecommerce_ops_1795763699162.jpg',
    imageAlt:
      'MeridianOps high-throughput commerce ledger and real-time API latency curve',
    problemStatement:
      'Flash-sale traffic overwhelmed legacy monolithic endpoints, causing inventory race conditions, stalled checkout webhooks, and manual warehouse reconciliation.',
    architectureAndDb:
      'Built a lean Node.js + Express API using MySQL row-level locking for inventory ledger integrity, Redis atomic counters for sub-10ms cart reservation locks, and Make scenarios to automate supplier notifications and exception alerts.',
    qaCoverage:
      'Verified with Jest concurrency simulations, Postman automated regression collections across 48 endpoints, and synthetic load profiles prior to peak retail events.',
    techStack: ['Node.js', 'Express', 'MySQL', 'Redis', 'Make', 'Postman'],
    // EDIT HERE: Replace with live demo & GitHub repository URLs
    liveUrl: 'https://example.com/meridian-ops-demo',
    githubUrl: 'https://github.com/example/meridian-commerce-ops',
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
