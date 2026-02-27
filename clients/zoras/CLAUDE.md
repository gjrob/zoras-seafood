# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

No test suite is configured. There is no `npm test` command.

## Environment

Requires `.env.local` with:
```
ANTHROPIC_API_KEY=sk-ant-...
```

## Architecture

**Next.js 16 App Router** site for Zora's Seafood Market & Kitchen (Wilmington, NC). Two language trees share the same component layer:

- English: `/`, `/about`, `/menu`, `/seafood-recipes`, `/spices-sauces`
- Spanish: `/es`, `/es/about`, `/es/menu`, `/es/seafood-recipes`, `/es/spices-sauces`

### Shared components

**`app/components/Nav.tsx`** — The single nav used by all 10 pages. Accepts two props:
- `lang: "en" | "es"` — which link set to render
- `activeKey: ActiveKey` — highlights the current page tab

It contains both `EN_LINKS` and `ES_LINKS` arrays and a `PAGE_MAP` that maps each `ActiveKey` to its EN and ES route. The language toggle writes `"zoras-lang"` to `localStorage` and calls `router.push()` to switch routes.

**`app/components/ChatBot.tsx`** — Floating 🐟 bubble fixed bottom-right. Streams responses from `/api/chat` using `fetch` + `ReadableStream`. The "Finn" persona is defined entirely in the API route's system prompt, not in this component.

**`app/api/chat/route.ts`** — POST endpoint that proxies to `claude-haiku-4-5-20251001` with streaming. The system prompt embeds the full menu (with exact prices), all 43 seafood species, store hours, address, reopening date, and bilingual personality rules. Update this file when menu items or prices change.

### Styling conventions

Pages use **two coexisting styling approaches** — do not mix them within a single page:
- `app/page.tsx` and `app/about/page.tsx` (+ their `/es` counterparts) use **Tailwind utility classes**
- `app/menu/page.tsx`, `app/seafood-recipes/page.tsx`, `app/spices-sauces/page.tsx` (+ `/es` counterparts) use **inline `style={{}}` objects**

`Nav.tsx` uses Tailwind. `ChatBot.tsx` uses inline styles.

Tailwind is v4 — configured via `@import "tailwindcss"` in `globals.css` with `@tailwindcss/postcss` in `postcss.config.mjs`. There is no `tailwind.config.js`.

### Color palette

| Token | Value | Usage |
|-------|-------|-------|
| Deep navy | `#071929` | Page background |
| Ocean blue | `#0d2b45` | Cards, nav background |
| Light blue | `#4ab8e8` | Borders, labels, accents |
| Off-white | `#eef6fb` | Light background sections |
| Gold | `#f5c518` | CTAs, prices, highlights |
| Orange | `#e8821a` | Secondary accent |

### Adding a new page

1. Create `app/<slug>/page.tsx` (English) and `app/es/<slug>/page.tsx` (Spanish)
2. Add a new `ActiveKey` value to the union in `Nav.tsx`
3. Add the route to `EN_LINKS`, `ES_LINKS`, and `PAGE_MAP` in `Nav.tsx`
4. Pass `<Nav lang="en" activeKey="<key>" />` (or `"es"`) at the top of each page — import path is `"../components/Nav"` for top-level pages and `"../../components/Nav"` for pages under `app/es/`

### Menu data

Menu items live as a `MENU_ITEMS` array directly in `app/menu/page.tsx` (and mirrored in Spanish in `app/es/menu/page.tsx`). The same prices must be kept in sync in the `SYSTEM_PROMPT` string in `app/api/chat/route.ts`. The seafood species list (`SEAFOOD`) lives in `app/about/page.tsx` and is also duplicated in the chatbot system prompt.
