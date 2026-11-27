import test from 'node:test';
import assert from 'node:assert/strict';
import { PROJECTS } from '../data/portfolioData';
import {
  filterProjectsByCategory,
  getNextTheme,
  getProjectCategoryCounts,
  resolveInitialTheme,
  validateContactForm,
} from './portfolioLogic';

test('filterProjectsByCategory returns all projects for All and filters specific categories', () => {
  assert.equal(filterProjectsByCategory(PROJECTS, 'All').length, 6);
  assert.equal(filterProjectsByCategory(PROJECTS, 'Full-Stack').length, 5);
  assert.equal(filterProjectsByCategory(PROJECTS, 'AI Automation').length, 1);
  assert.equal(filterProjectsByCategory(PROJECTS, 'QA & Testing').length, 0);

  const aiOnly = filterProjectsByCategory(PROJECTS, 'AI Automation');
  assert.equal(aiOnly[0]?.id, 'oneops-system');
});

test('getProjectCategoryCounts computes accurate totals across all categories', () => {
  const counts = getProjectCategoryCounts(PROJECTS);
  assert.deepEqual(counts, {
    All: 6,
    'Full-Stack': 5,
    'AI Automation': 1,
    'QA & Testing': 0,
  });
});

test('validateContactForm rejects empty or invalid inputs with field-level errors', () => {
  const emptyResult = validateContactForm({
    name: ' ',
    email: 'invalid-email',
    inquiryType: 'Freelance Project',
    message: 'Too short',
  });

  assert.equal(emptyResult.isValid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.message);
});

test('validateContactForm passes for well-formed recruiter or client inquiries', () => {
  const validResult = validateContactForm({
    name: 'Jordan Rivera',
    email: 'jordan@acme.io',
    inquiryType: 'AI Automation Consulting',
    message:
      'We are looking to automate our client onboarding workflow with FastAPI and n8n.',
  });

  assert.equal(validResult.isValid, true);
  assert.deepEqual(validResult.errors, {});
});

test('resolveInitialTheme and getNextTheme handle stored and system theme states', () => {
  assert.equal(resolveInitialTheme('dark', false), 'dark');
  assert.equal(resolveInitialTheme('light', true), 'light');
  assert.equal(resolveInitialTheme(null, true), 'dark');
  assert.equal(resolveInitialTheme(null, false), 'light');
  assert.equal(resolveInitialTheme('unexpected', true), 'dark');
  assert.equal(getNextTheme('light'), 'dark');
  assert.equal(getNextTheme('dark'), 'light');
});
