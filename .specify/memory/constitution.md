# HolyBagger Constitution

## Core Principles

### I. Server-First Architecture
Every component defaults to Server Components. The `'use client'` directive is used exclusively at the leaves of the component tree for interactive elements (charts, filters, event handlers). Data fetching and business logic reside entirely on the server via API Routes and Server Actions. Zero unnecessary JavaScript is shipped to the browser.

### II. Feature-Based Organization
The codebase is organized by domain feature (screener, asset, shared UI), not by file type. Each feature directory contains its own components, hooks, utilities, and types. Shared infrastructure lives in `lib/` and `components/ui/`. This ensures each feature is independently navigable, testable, and maintainable.

### III. Test-Driven Development (NON-NEGOTIABLE)
Every feature begins with failing tests that define the expected behavior. Red → Green → Refactor cycle is strictly enforced. Unit tests for utilities, integration tests for API routes, and component tests for UI behavior are mandatory before a task is marked complete.

### IV. Premium Visual Design
The UI must deliver a premium, dark-themed experience inspired by modern fintech applications. Generic, unstyled, or placeholder designs are unacceptable. Every component must use the established design token system (colors, spacing, typography) to ensure visual consistency and professional quality.

### V. API Resilience & Cache-First
All external API calls are wrapped in a cache layer with defined TTLs. The system must gracefully degrade when APIs are unavailable, returning cached data with staleness indicators rather than errors. Rate limits are respected via request queues and batch processing. No raw API call is made without passing through the centralized client.

### VI. Incremental Delivery
Each user story is independently deployable and testable. The system is built in vertical slices — from data layer to UI — so that value is delivered at every checkpoint. No big-bang integrations; each phase produces a functional, demonstrable product increment.

### VII. Simplicity & YAGNI
Start with the simplest implementation that solves the current requirement. Do not add abstractions, patterns, or dependencies "for the future." Code is added only when a user story demands it. Premature optimization is avoided; performance work is driven by measured bottlenecks.

## Technology Standards

- **Framework**: Next.js 14+ with App Router (Server Components default)
- **Styling**: Tailwind CSS v3 with a custom design token configuration
- **Language**: TypeScript in strict mode — no `any` types, no implicit returns
- **Linting**: ESLint + Prettier with consistent rules enforced pre-commit
- **Images**: All images use `next/image` for automatic optimization
- **Fonts**: All typography uses `next/font` for zero-layout-shift loading
- **Data Fetching**: Server-side by default; TanStack Query for client-side cache
- **State Management**: Zustand for global client state; URL search params for filter state
- **Testing**: Vitest for unit/integration tests; React Testing Library for component tests

## Development Workflow

1. **Specify** → Define what to build (spec.md) — no implementation details
2. **Clarify** → Resolve ambiguities with structured questions
3. **Plan** → Technical design, architecture, and data model
4. **Tasks** → Granular, ordered work items with clear file paths
5. **Implement** → Code with TDD, following the task list sequentially
6. **Validate** → Run tests, verify acceptance criteria, cross-check spec

Every pull request must:
- Reference the originating task ID (e.g., T001)
- Include passing tests for the changed code
- Not introduce `any` types or disable ESLint rules without documented justification
- Follow the established design token system for any UI changes

## Governance

This constitution supersedes all ad-hoc decisions. Any amendments require:
1. Written justification documenting why the change is needed
2. Impact analysis on existing code
3. Updated constitution version and date

All code reviews must verify compliance with these principles. Complexity must be justified against Principle VII (Simplicity & YAGNI).

**Version**: 1.0.0 | **Ratified**: 2026-05-15 | **Last Amended**: 2026-05-15
