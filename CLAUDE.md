# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run lint     # ESLint via next lint
npm run start    # Start production server
```

No test suite is configured.

## Architecture

Single-page Next.js 14 App Router site for **Kyoto Asian Grille** (Wilmington, NC).

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
public/
  ref/                    # Food reference images (chicken, dessert, friedrice, soup, suschi)
```

### Key design decisions

**All styles live in `globals.css`.** There are no CSS modules, Tailwind, or inline styled-components. The cherry blossom palette is defined as CSS custom properties in `:root` — prefer editing those vars over touching individual selectors.

**`page.tsx` is a single large client component** (`'use client'`). All menu data (`MENU_ITEMS`, `MENU_CATEGORIES`, `REVIEWS`), petal config, and image-mapping logic live in that file above the component. The component owns three pieces of state: `scrolled`, `activeCat`, and `showReservation`.

**`ChatBot.tsx` is mounted in `layout.tsx`** so it persists across any future route additions without touching `page.tsx`.

**The chat API route runs on the Edge runtime** (`export const runtime = 'edge'`) and streams raw text chunks — not SSE or JSON. The client reads with `ReadableStream` / `getReader()`.

**The reservations API** uses the Supabase **service-role** key (bypasses RLS) and inserts into a `reservations` table with a `client_slug: 'kyoto'` column (multi-tenant schema).

### Environment variables

| Variable | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Powers the Yuki chatbot (`/api/chat`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key (used client-side if needed) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only; used exclusively in `/api/reservations` |
| `NEXT_PUBLIC_CLIENT_SLUG` | `kyoto` — stored on each reservation row |

### Color palette (CSS custom properties)

The blossom theme is defined in `:root` in `globals.css`. Legacy variable names (`--vermilion`, `--indigo`, etc.) are aliased to the new palette so old selectors still work.

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

### Petal animation

10 absolutely-positioned `.petal` divs are rendered inside `.hero` from `PETAL_CONFIG` in `page.tsx`. The `petalFall` keyframe and `.petal` base styles live in `globals.css`. Each petal receives `left`, `animationDuration`, and `animationDelay` as inline styles.

### Food images on menu cards

`getCategoryImage(cat, name)` in `page.tsx` maps categories/keywords → `/public/ref/*.png`. Returns `null` for categories with no matching image (appetizers without "chicken"/"gai", curries, hibachi combos, bento). The image renders as a 56×42px thumbnail in `.menu-item-right` alongside the price.
