# Implementation Plan: Multibagger Screener & Analysis Platform

**Branch**: `001-multibagger-screener` | **Date**: 2026-05-15 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-multibagger-screener/spec.md`

## Summary

Build a multibagger stock screener and analysis platform that identifies financial assets (stocks, ETFs, crypto) which have multiplied their price 5x-100x+ and are still actively traded. The platform provides filtered search, interactive price charts with dynamic revaluation calculation, fundamental financial indicators, and a news feed. Built with Next.js App Router (server-first), Tailwind CSS v3, and Financial Modeling Prep API with aggressive PostgreSQL caching.

## Technical Context

**Language/Version**: TypeScript 5.4+ (strict mode)

**Primary Dependencies**: Next.js 14 (App Router), React 18, Tailwind CSS 3.4, TanStack Query 5, Zustand 4, Lightweight Charts 4 (TradingView), Lucide React, Radix UI primitives, Framer Motion

**Storage**: PostgreSQL via Supabase (free tier) with Prisma ORM

**Testing**: Vitest + React Testing Library

**Target Platform**: Web (desktop-first, responsive)

**Project Type**: Web application (full-stack Next.js)

**Performance Goals**: Initial page load < 3s, screener filter response < 2s, chart interaction < 1s

**Constraints**: FMP API free tier (250 req/day), Supabase free tier (500MB DB, 50K monthly active users), Vercel free tier

**Scale/Scope**: ~4 pages, ~25 components, ~8 API routes, ~15 DB tables/models

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Server-First | ✅ Pass | All data fetching in API routes/server components. `'use client'` only for PriceChart, FilterPanel, TimeRangeSelector |
| II. Feature-Based | ✅ Pass | Organized by `screener/`, `asset/`, `ui/` feature directories |
| III. TDD | ✅ Pass | Tests defined per user story in tasks.md, Vitest configured |
| IV. Premium Design | ✅ Pass | Dark theme with fintech-grade tokens, Inter font, Framer Motion animations |
| V. API Resilience | ✅ Pass | Cache-first strategy with TTLs, staleness indicators, graceful degradation |
| VI. Incremental Delivery | ✅ Pass | 4 user stories, each independently deployable |
| VII. Simplicity | ✅ Pass | Minimal dependencies, no premature abstractions |

## Project Structure

### Documentation (this feature)

```text
specs/001-multibagger-screener/
├── spec.md              # Feature specification
├── plan.md              # This file
├── tasks.md             # Task breakdown
└── checklists/
    └── requirements.md  # Quality validation checklist
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx                    # Root layout: dark theme, Inter font, providers
│   ├── page.tsx                      # Home → redirects to /screener
│   ├── globals.css                   # Tailwind base + design tokens
│   │
│   ├── screener/
│   │   ├── page.tsx                  # Server component: screener page shell
│   │   └── loading.tsx               # Suspense fallback
│   │
│   ├── asset/
│   │   └── [symbol]/
│   │       ├── page.tsx              # Server component: asset detail shell
│   │       └── loading.tsx           # Suspense fallback
│   │
│   └── api/
│       ├── screener/
│       │   └── route.ts              # GET: search multibaggers with filters
│       ├── asset/
│       │   └── [symbol]/
│       │       ├── route.ts          # GET: asset profile + metrics
│       │       ├── history/
│       │       │   └── route.ts      # GET: price history
│       │       └── news/
│       │           └── route.ts      # GET: asset news
│       └── sectors/
│           └── route.ts              # GET: GICS sectors list
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                # Top navigation bar
│   │   └── Footer.tsx                # Site footer
│   │
│   ├── screener/
│   │   ├── FilterPanel.tsx           # Client: sidebar with all filters
│   │   ├── MultiplierSelector.tsx    # Client: x5/x10/x20/x50/x100 pills
│   │   ├── AssetTypeFilter.tsx       # Client: Stocks/ETFs/Crypto tabs
│   │   ├── SectorFilter.tsx          # Client: GICS sector dropdown
│   │   ├── CountryFilter.tsx         # Client: ADR country dropdown
│   │   ├── ExchangeFilter.tsx        # Client: NYSE/NASDAQ toggle
│   │   └── ResultsTable.tsx          # Client: sortable, paginated results
│   │
│   ├── asset/
│   │   ├── PriceChart.tsx            # Client: Lightweight Charts wrapper
│   │   ├── MultiplierBadge.tsx       # Multiplication badge overlay
│   │   ├── TimeRangeSelector.tsx     # Client: 1M/3M/6M/1Y/5Y/MAX buttons
│   │   ├── FundamentalsCard.tsx      # Financial indicators grid
│   │   ├── NewsPanel.tsx             # News feed list
│   │   └── AssetHeader.tsx           # Name, symbol, price, sector
│   │
│   └── ui/
│       ├── Badge.tsx
│       ├── Card.tsx
│       ├── Select.tsx
│       ├── Button.tsx
│       ├── Skeleton.tsx
│       └── Tooltip.tsx
│
├── lib/
│   ├── api/
│   │   └── fmp.ts                    # Financial Modeling Prep API client
│   ├── db/
│   │   └── prisma.ts                 # Prisma client singleton
│   ├── utils/
│   │   ├── calculations.ts           # Multiplication, CAGR formulas
│   │   └── formatters.ts             # Number, currency, date formatting
│   ├── constants/
│   │   ├── sectors.ts                # 11 GICS sectors
│   │   ├── countries.ts              # ADR countries list
│   │   └── exchanges.ts              # NYSE, NASDAQ
│   ├── stores/
│   │   └── screener-store.ts         # Zustand: filter state
│   └── types/
│       ├── asset.ts                  # Asset, AssetMetrics types
│       ├── screener.ts               # Filter, query, response types
│       └── chart.ts                  # Chart data types
│
├── prisma/
│   ├── schema.prisma                 # Database schema
│   └── seed.ts                       # Seed data
│
└── __tests__/
    ├── unit/
    │   ├── calculations.test.ts      # Multiplication, CAGR tests
    │   ├── formatters.test.ts        # Formatting tests
    │   └── fmp-client.test.ts        # API client tests (mocked)
    ├── integration/
    │   ├── screener-api.test.ts      # Screener route tests
    │   └── asset-api.test.ts         # Asset route tests
    └── components/
        ├── FilterPanel.test.tsx      # Filter interactions
        ├── ResultsTable.test.tsx     # Table sorting, pagination
        └── PriceChart.test.tsx       # Chart rendering
```

**Structure Decision**: Single Next.js project (full-stack) organized by feature. Server components handle data fetching shells; client components handle interactivity. `lib/` contains shared utilities, API clients, and state stores.

## Data Architecture

### External API: Financial Modeling Prep (FMP)

| Endpoint | Purpose | Cache TTL |
|----------|---------|-----------|
| `GET /v3/stock-screener` | Filter stocks by sector, market cap, exchange, country | 24h |
| `GET /v3/historical-price-full/{symbol}` | OHLCV price history (split-adjusted) | 1h (today) / permanent (past) |
| `GET /v3/profile/{symbol}` | Company profile: sector, IPO date, description | 7d |
| `GET /v3/key-metrics/{symbol}` | ROIC, PE, PEG, debt ratios | 24h |
| `GET /v3/income-statement/{symbol}` | Revenue, EPS historical | 24h |
| `GET /v3/analyst-estimates/{symbol}` | EPS forward, growth estimates | 24h |
| `GET /v3/stock_news` | News articles by symbol | No cache (always fresh) |
| `GET /v3/etf/list` | ETF listing | 7d |

### Multibagger Calculation Logic

```
multiplication = currentPrice / earliestAvailablePrice

Where:
  - currentPrice = latest close from profile or real-time quote
  - earliestAvailablePrice = oldest adjusted close from historical data
    (or IPO price from profile when available)

Filtering:
  - Include only if: multiplication >= selectedMultiplier (5, 10, 20, 50, 100)
  - Include only if: asset is actively traded (isActivelyTrading = true)
```

### Cache Strategy

```
Request Flow:
  1. Client → API Route
  2. API Route → Check DB cache (is TTL valid?)
  3a. Cache HIT → Return data + { cached: true, cachedAt: timestamp }
  3b. Cache MISS → Call FMP API → Store in DB → Return fresh data
  4. If FMP API fails → Return stale cache + { stale: true, lastUpdated: timestamp }
  5. If no cache exists AND API fails → Return error with retry suggestion
```

### Database Schema (Prisma)

```prisma
model Asset {
  id              String      @id @default(cuid())
  symbol          String      @unique
  name            String
  type            AssetType
  exchange        String
  sector          String?
  industry        String?
  country         String?
  ipoDate         DateTime?
  marketCap       Float?
  currentPrice    Float?
  earliestPrice   Float?
  multiplication  Float?
  isActive        Boolean     @default(true)
  updatedAt       DateTime    @updatedAt
  createdAt       DateTime    @default(now())
  metrics         AssetMetrics?
  priceHistory    PriceHistory[]
}

model AssetMetrics {
  id              String   @id @default(cuid())
  assetId         String   @unique
  asset           Asset    @relation(fields: [assetId], references: [id])
  epsCurrentYear  Float?
  epsNextYear     Float?
  epsNext5Year    Float?
  peForward       Float?
  peg             Float?
  cagrRevenue5Y   Float?
  cagrRevenueFwd  Float?
  revenue         Float?
  roic            Float?
  roe             Float?
  debtToEquity    Float?
  updatedAt       DateTime @updatedAt
}

model PriceHistory {
  id        String   @id @default(cuid())
  assetId   String
  asset     Asset    @relation(fields: [assetId], references: [id])
  date      DateTime
  open      Float
  high      Float
  low       Float
  close     Float
  adjClose  Float
  volume    BigInt
  @@unique([assetId, date])
  @@index([assetId, date])
}

enum AssetType {
  STOCK
  ETF
  CRYPTO
}
```

### Design System Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0a0a0a` | Page background |
| `--bg-card` | `#141414` | Cards, sidebar |
| `--bg-hover` | `#1e1e1e` | Hover states, inputs |
| `--border` | `#2a2a2a` | Subtle borders |
| `--text-primary` | `#f5f5f5` | Main text |
| `--text-secondary` | `#a0a0a0` | Muted text |
| `--accent-green` | `#22c55e` | Positive values, multibagger badges |
| `--accent-emerald` | `#10b981` | CTAs, active states |
| `--accent-red` | `#ef4444` | Negative values |
| `--accent-amber` | `#f59e0b` | Warnings, neutral |
| `--accent-blue` | `#3b82f6` | Links, info |
| Font | Inter (via next/font) | All text |

## Complexity Tracking

No constitution violations identified. The architecture uses standard Next.js patterns with a single data source (FMP API) and a single database (Supabase PostgreSQL).
