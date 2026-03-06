# Client Theme System — BluRing Web Agency
## How to play with design styles per client

---

## THE CORE IDEA

One codebase. One component library. Infinite looks.

Every client gets ONE file that defines their entire visual identity:

```
clients/[slug]/theme.ts
```

The components read from the theme. You change the theme, the whole site transforms.
You never touch component logic to change a client's look.

---

## THE THEME FILE

```typescript
// clients/kyoto/theme.ts

export const theme = {

  // ── IDENTITY ──────────────────────────────────────
  client: 'kyoto',
  businessName: 'Kyoto Asian Grille',
  phone: '910-555-0101',
  address: 'Wilmington, NC',

  // ── STYLE PRESET ──────────────────────────────────
  // Pick ONE. This loads the right CSS module + font combo.
  // Options: 'modern' | 'bold' | 'editorial' | 'playful' | 'luxury' | 'minimal'
  preset: 'editorial',

  // ── COLORS ────────────────────────────────────────
  colors: {
    primary:    '#1a1a2e',   // Deep navy
    accent:     '#e94560',   // Red
    gold:       '#f5a623',   // Warm gold
    background: '#0f0f1a',   // Dark bg
    surface:    '#1e1e32',   // Cards
    text:       '#f0f0f0',   // Body text
    textMuted:  '#888899',   // Secondary text
  },

  // ── TYPOGRAPHY ────────────────────────────────────
  fonts: {
    heading: 'Noto Serif JP',   // Google Fonts name
    body:    'DM Sans',
    accent:  'monospace',
  },

  // ── HERO ──────────────────────────────────────────
  hero: {
    layout: 'centered',    // 'left' | 'centered' | 'split' | 'fullscreen'
    bgType: 'gradient',    // 'gradient' | 'image' | 'video' | 'pattern'
    bgValue: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)',
    overlayText: 'KYOTO',  // Large ghost text behind headline
    badge: 'Wilmington NC',
    headline: { en: 'Where flavor meets', em: 'tradition.' },
    sub: {
      en: 'Authentic Asian cuisine in the heart of Wilmington.',
      es: 'Cocina asiática auténtica en el corazón de Wilmington.',
    },
  },

  // ── CHATBOT ───────────────────────────────────────
  chatbot: {
    avatarEmoji: '🍜',
    systemPrompt: `You are the assistant for Kyoto Asian Grille in Wilmington NC.
    Hours: Mon–Sat 11am–10pm, Sun 12pm–9pm.
    Specialties: sushi, ramen, hibachi, bento boxes.
    Always be warm and suggest the chef's special. End with a reservation CTA.`,
  },

  // ── SECTION ORDER ─────────────────────────────────
  // Drag to reorder — components render in this sequence
  sections: ['hero', 'specials', 'menu', 'how', 'about', 'booking', 'footer'],

}

export type Theme = typeof theme
```

---

## THE 6 STYLE PRESETS

Each preset is a different CSS Module + font pairing.
Same HTML structure, completely different vibe.

```
styles/presets/
├── modern.module.css      ← SMT Services (warm neutrals, Cormorant + DM Sans)
├── bold.module.css        ← Pop Car Auto (black/yellow, Impact energy)
├── editorial.module.css   ← Kyoto, Seabird (dark, serif, magazine)
├── playful.module.css     ← Kid-friendly, cartoon, bright colors
├── luxury.module.css      ← Salt & Charm (champagne, thin serif, lots of space)
└── minimal.module.css     ← Cell Phone Paradise (clean, tech, monospace)
```

### MODERN — Warm, clean, Wix-like
```css
/* Inspired by the SMT redesign */
--primary: #3d2b1f;
--accent: #c9a96e;
--bg: #faf8f5;
--font-heading: 'Cormorant Garamond', serif;   /* elegant editorial */
--font-body: 'DM Sans', sans-serif;
--radius: 4px;
--shadow: 0 2px 12px rgba(0,0,0,0.08);
```
**Best for:** Cleaning, home services, wellness, cafes

---

### BOLD — High contrast, punchy, kinetic
```css
--primary: #f5c518;      /* IMDb yellow */
--accent: #ff2d20;
--bg: #0a0a0a;
--font-heading: 'Bebas Neue', sans-serif;   /* condensed, loud */
--font-body: 'Inter', sans-serif;
--radius: 0px;           /* sharp corners everywhere */
--shadow: 4px 4px 0 var(--primary);  /* offset shadow = cartoon pop */
```
**Best for:** Auto, sports, barbershops, nightlife, gyms

---

### EDITORIAL — Dark, moody, magazine
```css
--primary: #f0e6d3;      /* cream text on dark */
--accent: #e94560;
--bg: #0f0f1a;
--font-heading: 'Playfair Display', serif;   /* literary, prestigious */
--font-body: 'Lato', sans-serif;
--radius: 2px;
--shadow: 0 8px 32px rgba(0,0,0,0.4);
```
**Best for:** Restaurants, bars, spas, boutiques, fine dining

---

### PLAYFUL — Cartoon, friendly, fun
```css
--primary: #6c63ff;      /* purple */
--accent: #ff6b6b;       /* coral */
--bg: #fff9f0;           /* warm white */
--font-heading: 'Fredoka One', cursive;   /* rounded, friendly */
--font-body: 'Nunito', sans-serif;        /* soft, round */
--radius: 20px;          /* pill shapes everywhere */
--shadow: 3px 3px 0 #333;  /* chunky cartoon shadow */
```
**Best for:** Kids services, pet care, ice cream, food trucks, tutoring

---

### LUXURY — Refined, aspirational, quiet
```css
--primary: #1a1a1a;
--accent: #b8a98a;       /* champagne gold */
--bg: #f8f6f2;           /* ivory */
--font-heading: 'Bodoni Moda', serif;   /* fashion magazine */
--font-body: 'Raleway', sans-serif;    /* light, airy */
--radius: 1px;
--shadow: none;          /* luxury doesn't need shadows */
/* Lots of whitespace. Very little text. */
```
**Best for:** Bridal, real estate, law, high-end retail, med spa

---

### MINIMAL — Clean, tech, precise
```css
--primary: #111;
--accent: #0070f3;       /* Vercel blue */
--bg: #ffffff;
--font-heading: 'Space Grotesk', sans-serif;  /* modern tech */
--font-body: 'IBM Plex Sans', sans-serif;
--radius: 6px;
--shadow: 0 1px 3px rgba(0,0,0,0.1);
```
**Best for:** Tech repair, phone stores, software, finance, legal

---

## HOW CLAUDE CODE READS THE THEME

```typescript
// components/Hero.tsx — works for ALL clients
import { useTheme } from '@/lib/useTheme'

export default function Hero() {
  const { hero, colors, fonts, chatbot } = useTheme()

  return (
    <section
      className={styles[`hero_${hero.layout}`]}   // picks the layout variant
      style={{
        background: hero.bgValue,
        fontFamily: fonts.heading,
      }}
    >
      <span className={styles.badge}>{hero.badge}</span>
      <h1>
        {hero.headline.en} <em style={{ color: colors.accent }}>{hero.headline.em}</em>
      </h1>
    </section>
  )
}
```

---

## WORKFLOW — New Client in 30 Minutes

```
1. cp clients/_template clients/newclient     # copy template
2. Edit clients/newclient/theme.ts            # change colors, preset, copy
3. Add business info to chatbot.systemPrompt  # Claude learns the business
4. Add to venue_status table in Supabase      # real-time status ready
5. Deploy to Vercel                           # live
```

That's it. The Tier 1 features (bilingual, chatbot, dashboard, specials banner,
PoweredByBTV) are already wired. You're just painting the walls.

---

## CLIENT STYLE MAP (Current)

| Client | Preset | Primary Color | Vibe |
|--------|--------|---------------|------|
| SMT Services | `modern` | Brown/Gold | Warm, professional, Wix-like |
| 1504 Resto-Bar | `editorial` | Dark/Crimson | Moody restaurant |
| Kyoto | `editorial` | Navy/Red | Japanese, dark, dramatic |
| Pop Car Auto | `bold` | Black/Yellow | High energy, loud |
| Salt & Charm | `luxury` | Ivory/Champagne | Refined, quiet |
| Seabird | `editorial` | Ocean/Slate | Coastal, cool |
| Zora's Seafood | `modern` | Navy/Seafoam | Fresh, coastal |
| Cell Phone Paradise | `minimal` | White/Blue | Clean, tech |
| Queens | `bold` | Black/Gold | Confident, strong |

---

## TELL CLAUDE CODE WHAT TO BUILD

When you start a new client session, just say:

> "New client: [Name]. Preset: bold. Primary: #f5c518 on black.
>  Heading font: Bebas Neue. It's an auto dealership.
>  Phone: 910-xxx-xxxx. Add to the monorepo as clients/popcar."

Claude Code reads CLAUDE.md, knows the Tier 1 feature set,
reads the theme, builds the whole site to spec.

You never explain the stack again.

---

## ADDING A NEW PRESET

If a client needs something that doesn't fit the 6 presets:

1. `cp styles/presets/modern.module.css styles/presets/coastal.module.css`
2. Edit the CSS variables only
3. Add `'coastal'` to the preset union type in `theme.ts`
4. Document it in this file

The component code never changes. Only the CSS.

---

*This file lives at: `clients/_template/STYLE-SYSTEM.md`*
*Reference it in CLAUDE.md so every session knows it exists.*