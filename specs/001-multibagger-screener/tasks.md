# Tasks: Multibagger Screener & Analysis Platform

**Input**: Design documents from `specs/001-multibagger-screener/`

**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Tests are REQUIRED per constitution principle III (TDD). Tests are written FIRST and must FAIL before implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, design system, and tooling configuration

- [x] T001 Initialize Next.js 14 project with TypeScript, Tailwind CSS v3, ESLint, App Router, and `src/` directory at repository root
- [x] T002 Install dependencies: `@tanstack/react-query`, `zustand`, `lightweight-charts`, `lucide-react`, `@radix-ui/react-select`, `@radix-ui/react-tooltip`, `@radix-ui/react-tabs`, `framer-motion`, `date-fns`, `prisma`, `@prisma/client`
- [x] T003 [P] Install dev dependencies: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@vitejs/plugin-react`, `jsdom` and configure `vitest.config.ts`
- [x] T004 [P] Configure Tailwind CSS v3 with custom design tokens (colors, fonts) in `tailwind.config.ts` matching plan.md design system
- [x] T005 [P] Create `src/app/globals.css` with Tailwind directives, CSS custom properties for design tokens, and base dark theme styles
- [x] T006 [P] Configure `src/app/layout.tsx` with Inter font (via `next/font/google`), dark theme `<html>` class, metadata, and TanStack Query provider
- [x] T007 [P] Create type definitions in `src/lib/types/asset.ts`, `src/lib/types/screener.ts`, `src/lib/types/chart.ts`
- [x] T008 [P] Create constants in `src/lib/constants/sectors.ts` (11 GICS sectors), `src/lib/constants/countries.ts` (ADR countries), `src/lib/constants/exchanges.ts` (NYSE, NASDAQ)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T009 Create Prisma schema in `prisma/schema.prisma` with Asset, AssetMetrics, PriceHistory models and AssetType enum per plan.md
- [x] T010 Configure Supabase PostgreSQL connection in `.env.local` and create Prisma client singleton in `src/lib/db/prisma.ts`
- [x] T011 Run `npx prisma generate` and `npx prisma db push` to sync schema with Supabase
- [x] T012 [P] Create FMP API client in `src/lib/api/fmp.ts` with: base URL config, API key from env, typed fetch wrappers for each endpoint (stock-screener, historical-price-full, profile, key-metrics, income-statement, analyst-estimates, stock_news, etf/list), rate limit handling, and error wrapping
- [x] T013 [P] Create utility functions in `src/lib/utils/calculations.ts`: `calculateMultiplication(currentPrice, earliestPrice)`, `calculateCAGR(startValue, endValue, years)`, `getMultiplierBadgeColor(multiplier)`
- [x] T014 [P] Create formatting utilities in `src/lib/utils/formatters.ts`: `formatCurrency(value)`, `formatLargeNumber(value)` (1.2B, 450M), `formatPercentage(value)`, `formatDate(date)`, `formatMultiplier(value)` (x5, x10.3)
- [x] T015 [P] Create base UI components: `src/components/ui/Button.tsx`, `src/components/ui/Card.tsx`, `src/components/ui/Badge.tsx`, `src/components/ui/Select.tsx`, `src/components/ui/Skeleton.tsx`, `src/components/ui/Tooltip.tsx`
- [x] T016 [P] Create layout components: `src/components/layout/Navbar.tsx` (logo, search, nav links), `src/components/layout/Footer.tsx` (disclaimer, links)

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 — Screener Multibagger (Priority: P1) 🎯 MVP

**Goal**: Users can filter and discover multibagger assets by type, sector, exchange, country, and multiplier

**Independent Test**: Navigate to screener, apply filters (type=Stock, sector=Tech, exchange=NASDAQ, multiplier=x10), verify NVDA/AAPL appear with correct multiplication

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T017 [P] [US1] Unit tests for calculation utilities in `src/__tests__/unit/calculations.test.ts`: test `calculateMultiplication` with normal, zero, negative, and split-adjusted values; test `calculateCAGR`; test `getMultiplierBadgeColor` thresholds
- [x] T018 [P] [US1] Unit tests for formatting utilities in `src/__tests__/unit/formatters.test.ts`: test all formatters with edge cases (0, negative, very large numbers, null/undefined)
- [x] T019 [P] [US1] Unit tests for FMP client in `src/__tests__/unit/fmp-client.test.ts`: mock fetch, test each endpoint wrapper returns typed data, test error handling on 429/500/timeout
- [x] T020 [P] [US1] Integration test for screener API in `src/__tests__/integration/screener-api.test.ts`: test GET `/api/screener` with various filter combinations, test pagination, test sorting, test cache behavior (mock FMP + mock Prisma)

### Implementation for User Story 1

- [x] T021 [US1] Create Zustand store in `src/lib/stores/screener-store.ts` with filter state: type, sector, exchange, country, minMultiplier, page, sortBy, sortOrder — and actions to update each
- [x] T022 [US1] Implement API route `src/app/api/screener/route.ts`: parse query params (type, sector, exchange, country, minMultiplier, page, limit, sortBy, sortOrder), check DB cache, call FMP stock-screener if cache miss, calculate multiplications from historical data, filter by minMultiplier, store in DB, return paginated results with cache metadata
- [x] T023 [US1] Implement API route `src/app/api/sectors/route.ts`: return GICS sectors list from constants
- [x] T024 [P] [US1] Create `src/components/screener/AssetTypeFilter.tsx`: tabs for All/Stocks/ETFs/Crypto using Radix Tabs, syncs with Zustand store
- [x] T025 [P] [US1] Create `src/components/screener/MultiplierSelector.tsx`: pill buttons for x5/x10/x20/x50/x100, active state styling, syncs with store
- [x] T026 [P] [US1] Create `src/components/screener/SectorFilter.tsx`: dropdown with 11 GICS sectors + "All", uses Radix Select, syncs with store
- [x] T027 [P] [US1] Create `src/components/screener/ExchangeFilter.tsx`: toggle for NYSE/NASDAQ/All, syncs with store
- [x] T028 [P] [US1] Create `src/components/screener/CountryFilter.tsx`: dropdown with ADR countries + "All (USA)", uses Radix Select, syncs with store
- [x] T029 [US1] Create `src/components/screener/FilterPanel.tsx`: sidebar container composing AssetTypeFilter, MultiplierSelector, SectorFilter, ExchangeFilter, CountryFilter with collapsible sections and Framer Motion animations
- [x] T030 [US1] Create `src/components/screener/ResultsTable.tsx`: sortable columns (symbol, name, sector, exchange, multiplication, price, marketCap), clickable rows → navigate to `/asset/[symbol]`, pagination controls, loading skeletons, empty state, uses TanStack Query to fetch from `/api/screener`
- [x] T031 [US1] Create screener page `src/app/screener/page.tsx`: server component shell with title, description, and layout grid (sidebar + results area). Create `src/app/screener/loading.tsx` with skeleton UI
- [x] T032 [US1] Create landing page `src/app/page.tsx`: hero section, feature highlights, and CTA to `/screener` or render screener directly as home page

**Checkpoint**: At this point, User Story 1 should be fully functional — users can filter and browse multibagger assets

---

## Phase 4: User Story 2 — Price Chart & Revaluation (Priority: P2)

**Goal**: Users can view interactive price chart with multiplication overlay and click to recalculate from any date

**Independent Test**: Navigate to `/asset/NVDA`, verify chart renders with historical prices, verify "x283" badge appears, click on chart at 2020 and verify recalculated multiplication displays

### Tests for User Story 2 ⚠️

- [x] T033 [P] [US2] Unit tests for profile and chart logic in `src/__tests__/unit/chart-logic.test.ts`: test data transformation from FMP format to lightweight-charts format
- [x] T034 [P] [US2] Integration test for asset detail API in `src/__tests__/integration/asset-api.test.ts`: mock FMP profile, metrics, and historical endpoints, assert combined payload and derived cagr/multiplication

### Implementation for User Story 2

- [x] T035 [US2] Implement API route `src/app/api/asset/[symbol]/route.ts`: fetch profile, key metrics, and historical price from FMP, combine into single payload
- [x] T036 [US2] Create `src/components/asset/PriceChart.tsx`: interactive chart using `lightweight-charts` mapping historical data
- [x] T037 [US2] Create `src/components/asset/AssetHeader.tsx`: title, symbol, current price, multiplier badge, exchange, country
- [x] T038 [US2] Create `src/components/asset/KeyMetrics.tsx`: grid displaying P/E, PEG, CAGR, ROIC, Market Cap with tooltips explaining each
- [x] T039 [US2] Create `src/components/asset/CompanyProfile.tsx`: description, CEO, sector, industry, website
- [x] T040 [US2] Create detail page `src/app/asset/[symbol]/page.tsx`: compose Header, Chart, Metrics, Profile. Handle loading states.
- [x] T041 [US2] Create asset detail page `src/app/asset/[symbol]/page.tsx`: server component that fetches asset profile, renders AssetHeader, chart section, fundamentals, and company profile. Create `src/app/asset/[symbol]/loading.tsx` with skeleton UI

**Checkpoint**: At this point, Users can navigate from screener → asset detail and interact with the price chart

---

## Phase 5: User Story 3 — Fundamental Indicators (Priority: P3)

**Goal**: Users can see financial health indicators to evaluate if a multibagger still has growth potential

**Independent Test**: Navigate to `/asset/NVDA`, verify fundamentals card shows EPS, PE, PEG, CAGR, Revenue, ROIC with correct values matching public sources

### Tests for User Story 3 ⚠️

- [ ] T042 [P] [US3] Unit tests for metrics formatting in `src/__tests__/unit/formatters.test.ts`: add tests for formatting EPS percentages, ROIC, PEG ratios, large revenue numbers
- [ ] T043 [P] [US3] Component test for FundamentalsCard in `src/__tests__/components/FundamentalsCard.test.tsx`: test renders all indicators, test color coding for positive/negative values, test "N/A" display when data missing

### Implementation for User Story 3

- [ ] T044 [US3] Extend API route `src/app/api/asset/[symbol]/route.ts` to include fundamental metrics: fetch from FMP `/v3/key-metrics`, `/v3/income-statement`, `/v3/analyst-estimates`, merge into AssetMetrics model, cache with 24h TTL
- [ ] T045 [US3] Create `src/components/asset/FundamentalsCard.tsx`: grid layout showing EPS Next Year, EPS Next 5Y, PE Forward, PEG, CAGR Revenue (5Y past + future), Revenue, Market Cap, ROIC, ROE, Debt/Equity. Each metric with label, value, and color indicator (green for good, red for concerning, amber for neutral). "N/A" fallback for missing data

**Checkpoint**: Asset detail page now shows complete financial analysis alongside the price chart

---

## Phase 6: User Story 4 — Asset News (Priority: P4)

**Goal**: Users can read recent news about a selected asset for context

**Independent Test**: Navigate to `/asset/TSLA`, verify news panel shows recent articles with titles, sources, and dates

### Tests for User Story 4 ⚠️

- [ ] T046 [P] [US4] Integration test for news API in `src/__tests__/integration/asset-api.test.ts`: add test for GET `/api/asset/[symbol]/news` returns news array, test empty news returns informative response

### Implementation for User Story 4

- [ ] T047 [US4] Implement API route `src/app/api/asset/[symbol]/news/route.ts`: fetch from FMP `/v3/stock_news?tickers={symbol}&limit=20`, return array with title, text snippet, source, publishedDate, url, image
- [ ] T048 [US4] Create `src/components/asset/NewsPanel.tsx`: scrollable list of news cards, each showing title, source, date, thumbnail (if available), external link. Empty state "No hay noticias recientes" with icon
- [ ] T049 [US4] Integrate NewsPanel into `src/app/asset/[symbol]/page.tsx`: add news section below fundamentals in the page layout

**Checkpoint**: All user stories are now independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T050 [P] Add Framer Motion page transitions to screener and asset detail pages
- [ ] T051 [P] Add hover micro-animations to ResultsTable rows, filter pills, and cards
- [ ] T052 [P] Add responsive breakpoints: ensure screener sidebar collapses to drawer on mobile, chart resizes, fundamentals stack vertically
- [ ] T053 SEO: add metadata to screener page (title, description, Open Graph), add dynamic metadata to asset detail page using `generateMetadata`
- [ ] T054 [P] Error boundaries: create `src/app/error.tsx` and `src/app/asset/[symbol]/error.tsx` with user-friendly error states and retry buttons
- [ ] T055 [P] Add rate limiting to API routes using a simple in-memory counter to avoid exceeding 250 req/day FMP limit
- [ ] T056 Create `prisma/seed.ts` with initial sector, country, and exchange data; add `prisma db seed` script to `package.json`
- [ ] T057 Create `.env.example` documenting all required environment variables
- [ ] T058 Run full test suite, fix any failures, ensure 100% pass rate
- [ ] T059 Deploy to Vercel, configure environment variables, verify production build

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational phase
- **User Story 2 (Phase 4)**: Depends on Foundational phase (can start after Phase 2, does not need US1 to be complete, but US1 provides navigation context)
- **User Story 3 (Phase 5)**: Depends on US2 (extends the asset detail page created in US2)
- **User Story 4 (Phase 6)**: Depends on US2 (extends the asset detail page)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Types/models before services
- API routes before UI components
- Server components before client components
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Within US1: filter components (T024-T028) can be built in parallel
- Within US2: AssetHeader and TimeRangeSelector can be built in parallel with PriceChart
- US3 and US4 can be built in parallel (both extend asset detail page in non-conflicting sections)

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test screener independently, verify filters work, verify data accuracy
5. Deploy to Vercel as MVP

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add User Story 1 → Test → Deploy (MVP: screener works!)
3. Add User Story 2 → Test → Deploy (chart + revaluation)
4. Add User Story 3 → Test → Deploy (fundamentals)
5. Add User Story 4 → Test → Deploy (news)
6. Polish → Test → Final deploy

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
