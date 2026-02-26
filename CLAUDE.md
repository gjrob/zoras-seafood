# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo overview

BTV client demo sites. All clients share one Supabase project, separated by `client_slug`.

```
/                         ← repo root
├── clients/
│   └── kyoto/            ← standalone Next.js app (first client)
├── shared/
│   ├── lib/events.ts     ← canonical event emitter (source of truth)
│   └── types/client.ts   ← shared TypeScript interfaces
├── supabase/migrations/  ← shared DB migrations
├── scripts/new-client.sh ← bootstrap next client
└── README.md
```

## Commands

All commands must be run from inside a client directory:

```bash
cd clients/kyoto
npm run dev      # http://localhost:3000
npm run build
npm run lint
npm run start
```

To scaffold a new client:
```bash
bash scripts/new-client.sh zoras "Zora's Seafood" "#0a1628" "#00b4d8" "Marina"
```

No test suite is configured.

## Kyoto client architecture (`clients/kyoto/`)

```
app/
  layout.tsx              # Root layout — mounts ChatBot globally
  page.tsx                # Entire single-page site (nav, hero, about, menu, reviews, info, footer)
  globals.css             # All styling — one CSS file, no CSS modules or Tailwind
  components/
    ChatBot.tsx           # Floating chat bubble + streaming chat panel
    ReservationModal.tsx  # Full-screen reservation form modal
  api/
    chat/route.ts         # Edge function — streams Claude claude-sonnet-4-20250514 responses
    reservations/route.ts # Inserts reservation rows into Supabase
lib/
  events.ts               # Local copy of shared/lib/events.ts (see note below)
public/
  ref/                    # Food reference images (chicken, dessert, friedrice, soup, suschi)
```

### Key design decisions

**All styles live in `globals.css`.** No CSS modules, Tailwind, or inline styled-components. The cherry blossom palette is defined as CSS custom properties in `:root` — prefer editing those vars over touching individual selectors.

**`page.tsx` is a single large client component** (`'use client'`). All menu data (`MENU_ITEMS`, `MENU_CATEGORIES`, `REVIEWS`), petal config, and image-mapping logic live in that file above the component. The component owns three pieces of state: `scrolled`, `activeCat`, and `showReservation`.

**`ChatBot.tsx` is mounted in `layout.tsx`** so it persists across any future route additions without touching `page.tsx`.

**The chat API route runs on the Edge runtime** (`export const runtime = 'edge'`) and streams raw text chunks — not SSE or JSON. The client reads with `ReadableStream` / `getReader()`.

**The reservations API** uses the Supabase **service-role** key (bypasses RLS) and inserts into a `reservations` table with a `client_slug: 'kyoto'` column (multi-tenant schema).

## Shared layer

**`shared/lib/events.ts`** is the canonical event emitter — write all analytics/tracking events through `emit()` or `emitServer()`. It inserts into `canonical_events` in Supabase. The comment `// KAFKA SWAP POINT` marks where to change the transport later.

**`clients/kyoto/lib/events.ts`** is a local copy. Next.js App Router cannot import from outside the project root, so each client carries its own copy. The file header reads `// SOURCE: shared/lib/events.ts — update both if changing`.

**`shared/types/client.ts`** defines `ClientConfig`, `MenuItem`, and `Reservation` interfaces — use these when adding new DB queries or API routes.

## Environment variables (per client)

| Variable | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Powers the chatbot (`/api/chat`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only; used in `/api/reservations` |
| `NEXT_PUBLIC_CLIENT_SLUG` | `kyoto` — stored on every reservation and event row |

## Color palette (CSS custom properties)

| Token | Value | Role |
|---|---|---|
| `--bg-primary` | `#0d0a0e` | Page background |
| `--bg-secondary` | `#1a1118` | Section backgrounds |
| `--bg-card` | `#211520` | Cards, chat panel |
| `--blossom-pink` | `#e8a0b0` | Labels, borders, secondary text accents |
| `--blossom-deep` | `#c8607a` | CTAs, buttons, user chat bubbles |
| `--gold` | `#d4a843` | Category headers, stats, dividers |
| `--text-primary` | `#f5ede8` | Body text |
| `--text-secondary` | `#b8929a` | Muted text, nav links |
| `--border` | `rgba(232,160,176,0.15)` | Card and input borders |

Legacy variable names (`--vermilion`, `--indigo`, etc.) are aliased to the new palette in `:root` so old selectors still resolve correctly.

## Petal animation

10 absolutely-positioned `.petal` divs rendered inside `.hero` from `PETAL_CONFIG` in `page.tsx`. The `petalFall` keyframe and `.petal` base styles are in `globals.css`. Each petal receives `left`, `animationDuration`, and `animationDelay` as inline styles.

## Food images on menu cards

`getCategoryImage(cat, name)` in `page.tsx` maps categories/keywords → `/public/ref/*.png`. Returns `null` for categories with no matching image. The image renders as a 56×42px thumbnail in `.menu-item-right` alongside the price.
