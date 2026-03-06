#!/usr/bin/env node
// scripts/fix-clients.mjs
// Run from repo root AFTER audit: node scripts/fix-clients.mjs
// Reads audit-report.json and injects missing Tier 1 components

import fs from 'fs'
import path from 'path'

const report = JSON.parse(fs.readFileSync('./scripts/audit-report.json', 'utf8'))
const CLIENTS_DIR = './clients'

function readFile(p) { try { return fs.readFileSync(p, 'utf8') } catch { return null } }
function writeFile(p, content) {
  fs.mkdirSync(path.dirname(p), { recursive: true })
  fs.writeFileSync(p, content, 'utf8')
  console.log(`  ✏  wrote: ${p}`)
}
function appendToFile(p, addition) {
  const existing = readFile(p) || ''
  if (existing.includes(addition.trim().slice(0, 40))) return // already there
  fs.writeFileSync(p, existing + '\n' + addition, 'utf8')
  console.log(`  ➕ appended to: ${p}`)
}

// ─────────────────────────────────────────────────────────
// TEMPLATES
// ─────────────────────────────────────────────────────────

function poweredByBTVComponent() {
  return `// components/PoweredByBTV.tsx
// CLAUDE.md: Required on every client — mount in layout.tsx
// Renders: Powered by BlueTubeTV · Wilmington's Live Commerce Network
export default function PoweredByBTV() {
  return (
    <div
      style={{
        background: '#0a0a0a',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        flexWrap: 'wrap' as const,
        fontSize: '12px',
      }}
    >
      <span style={{ color: 'rgba(255,255,255,0.3)' }}>Powered by</span>
      <a
        href="https://bluetubetv.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: '#c9a96e',
          textDecoration: 'none',
          fontWeight: 600,
          letterSpacing: '0.04em',
        }}
      >
        BlueTubeTV
      </a>
      <span style={{ color: 'rgba(255,255,255,0.2)' }}>
        · Wilmington's Live Commerce Network
      </span>
    </div>
  )
}
`
}

function venueStatusComponent(slug) {
  return `// components/VenueStatus.tsx
// CLAUDE.md: Real-time open/closed from Supabase venue_status table
'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Status {
  kitchen_open: boolean
  specials_text: string
  happy_hour_active: boolean
}

export default function VenueStatus({ lang = 'en' }: { lang?: 'en' | 'es' }) {
  const [status, setStatus] = useState<Status | null>(null)

  useEffect(() => {
    // Initial fetch
    supabase
      .from('venue_status')
      .select('*')
      .eq('client_slug', '${slug}')
      .single()
      .then(({ data }) => { if (data) setStatus(data) })

    // Real-time subscription
    const channel = supabase
      .channel('venue-status-${slug}')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'venue_status', filter: 'client_slug=eq.${slug}' },
        ({ new: next }) => setStatus(next as Status)
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  if (!status) return null

  const open   = { en: 'Open Now',   es: 'Abierto Ahora'  }
  const closed = { en: 'Closed',     es: 'Cerrado'        }

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      padding: '6px 14px', borderRadius: '20px',
      background: status.kitchen_open ? 'rgba(76,175,80,0.15)' : 'rgba(244,67,54,0.15)',
      border: \`1px solid \${status.kitchen_open ? '#4caf50' : '#f44336'}\`,
      fontSize: '13px', fontWeight: 500,
    }}>
      <span style={{
        width: 8, height: 8, borderRadius: '50%',
        background: status.kitchen_open ? '#4caf50' : '#f44336',
        animation: status.kitchen_open ? 'pulse 2s infinite' : 'none',
      }} />
      {status.kitchen_open ? open[lang] : closed[lang]}
      {status.specials_text && (
        <span style={{ opacity: 0.7, fontSize: '12px' }}>· {status.specials_text}</span>
      )}
    </div>
  )
}
`
}

function specialsBannerComponent(slug) {
  return `// components/SpecialsBanner.tsx
// CLAUDE.md: Owner-controlled specials/happy hour banner
'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function SpecialsBanner({ lang = 'en' }: { lang?: 'en' | 'es' }) {
  const [banner, setBanner] = useState<{ text_en: string; text_es: string; active: boolean } | null>(null)

  useEffect(() => {
    supabase
      .from('venue_status')
      .select('specials_text, happy_hour_active, specials_text_es')
      .eq('client_slug', '${slug}')
      .single()
      .then(({ data }) => {
        if (data?.happy_hour_active) {
          setBanner({
            text_en: data.specials_text || "Today's Special",
            text_es: data.specials_text_es || 'Especial de Hoy',
            active: true,
          })
        }
      })

    const channel = supabase
      .channel('specials-${slug}')
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'venue_status', filter: 'client_slug=eq.${slug}' },
        ({ new: next }: any) => {
          setBanner(next.happy_hour_active ? {
            text_en: next.specials_text || "Today's Special",
            text_es: next.specials_text_es || 'Especial de Hoy',
            active: true,
          } : null)
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  if (!banner?.active) return null

  return (
    <div style={{
      background: 'linear-gradient(90deg, var(--accent, #c9a96e), var(--accent-deep, #a07840))',
      color: '#fff',
      textAlign: 'center',
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: 600,
      letterSpacing: '0.05em',
      position: 'relative',
      zIndex: 50,
    }}>
      ✨ {lang === 'es' ? banner.text_es : banner.text_en}
    </div>
  )
}
`
}

function dashboardPage(slug, businessName) {
  return `// app/dashboard/page.tsx
// CLAUDE.md: Owner analytics dashboard — read-only, no auth complexity for Tier 1
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function getStats() {
  const today = new Date().toISOString().split('T')[0]
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString()

  const [views, chatSessions] = await Promise.all([
    supabase
      .from('canonical_events')
      .select('*', { count: 'exact', head: true })
      .eq('client_slug', '${slug}')
      .gte('created_at', weekAgo),
    supabase
      .from('chatbot_sessions')
      .select('*', { count: 'exact', head: true })
      .eq('client_slug', '${slug}')
      .gte('created_at', weekAgo),
  ])

  return {
    pageViewsWeek: views.count ?? 0,
    chatSessionsWeek: chatSessions.count ?? 0,
  }
}

export default async function Dashboard() {
  const stats = await getStats()

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', color: '#f0f0f0', padding: '40px 24px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 300, marginBottom: '8px' }}>
        ${businessName}
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '48px', fontSize: '14px' }}>
        Owner Dashboard · Last 7 days
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <StatCard label="Page Views" value={stats.pageViewsWeek} sub="this week" />
        <StatCard label="Chatbot Chats" value={stats.chatSessionsWeek} sub="this week" />
      </div>

      <p style={{ marginTop: '48px', fontSize: '12px', color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
        Powered by BlueTubeTV · Wilmington's Live Commerce Network
      </p>
    </main>
  )
}

function StatCard({ label, value, sub }: { label: string; value: number; sub: string }) {
  return (
    <div style={{
      background: '#1a1a1a', borderRadius: '8px', padding: '28px 24px',
      border: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{ fontSize: '42px', fontWeight: 300, color: '#c9a96e', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: '16px', fontWeight: 500, marginTop: '8px' }}>{label}</div>
      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>{sub}</div>
    </div>
  )
}
`
}

function langToggleSnippet() {
  return `
{/* ── LANGUAGE TOGGLE — add to nav in page.tsx ── */}
{/* Add state at top of component: const [lang, setLang] = useState<'en' | 'es'>('en') */}
<button
  onClick={() => setLang((l: 'en' | 'es') => l === 'en' ? 'es' : 'en')}
  style={{
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.2)',
    color: 'rgba(255,255,255,0.7)',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    letterSpacing: '0.08em',
  }}
>
  {lang === 'en' ? 'ES' : 'EN'}
</button>
`
}

// ─────────────────────────────────────────────────────────
// FIX RUNNER
// ─────────────────────────────────────────────────────────

let fixed = 0
let skipped = 0

for (const [slug, checks] of Object.entries(report.clients)) {
  const clientDir = path.join(CLIENTS_DIR, slug)
  const allIssues = Object.values(checks).flat()
  if (allIssues.length === 0) {
    console.log(`✅ ${slug} — nothing to fix`)
    continue
  }

  console.log(`\n🔧 Fixing: ${slug.toUpperCase()}`)

  // ── PoweredByBTV ──
  if (checks.poweredByBTV?.length > 0) {
    const componentPath = path.join(clientDir, 'app', 'components', 'PoweredByBTV.tsx')
    writeFile(componentPath, poweredByBTVComponent())

    // Add to layout.tsx if missing
    const layoutPath = path.join(clientDir, 'app', 'layout.tsx')
    const layout = readFile(layoutPath)
    if (layout && !layout.includes('PoweredByBTV')) {
      const updated = layout
        .replace(
          /import\s+/,
          `import PoweredByBTV from './components/PoweredByBTV'\nimport `
        )
        .replace(
          /<\/body>/,
          `  <PoweredByBTV />\n      </body>`
        )
      writeFile(layoutPath, updated)
    }
    fixed++
  }

  // ── VenueStatus ──
  if (checks.venueStatus?.length > 0) {
    const componentPath = path.join(clientDir, 'app', 'components', 'VenueStatus.tsx')
    if (!fs.existsSync(componentPath)) {
      writeFile(componentPath, venueStatusComponent(slug))
      console.log(`  💡 Add <VenueStatus lang={lang} /> to your hero/nav in page.tsx`)
      fixed++
    } else {
      console.log(`  ⏭  VenueStatus.tsx exists — check it has venue_status subscription`)
      skipped++
    }
  }

  // ── Specials Banner ──
  if (checks.specialsBanner?.length > 0) {
    const componentPath = path.join(clientDir, 'app', 'components', 'SpecialsBanner.tsx')
    if (!fs.existsSync(componentPath)) {
      writeFile(componentPath, specialsBannerComponent(slug))
      console.log(`  💡 Add <SpecialsBanner lang={lang} /> above your hero in page.tsx`)
      fixed++
    } else {
      skipped++
    }
  }

  // ── Dashboard ──
  if (checks.dashboard?.length > 0) {
    const dashPath = path.join(clientDir, 'app', 'dashboard', 'page.tsx')
    if (!fs.existsSync(dashPath)) {
      // Try to find business name from layout or package.json
      const pkg = readFile(path.join(clientDir, 'package.json'))
      const name = pkg ? JSON.parse(pkg).name : slug
      writeFile(dashPath, dashboardPage(slug, name))
      fixed++
    } else {
      skipped++
    }
  }

  // ── Bilingual hint ──
  if (checks.bilingual?.length > 0) {
    const hintsPath = path.join(clientDir, 'MISSING_BILINGUAL.md')
    const hint = `# Missing: Bilingual EN/ES — ${slug}

## What to add to page.tsx

\`\`\`tsx
// 1. Add state at top of component:
const [lang, setLang] = useState<'en' | 'es'>('en')

// 2. Add translation object above component:
const t = {
  // Add every user-facing string here
  heroTitle: { en: 'Your Title', es: 'Tu Título' },
  heroCta:   { en: 'Book Now',  es: 'Reservar'  },
}

// 3. Use in JSX:
<h1>{t.heroTitle[lang]}</h1>

// 4. Add toggle button to nav:
${langToggleSnippet()}

// 5. Pass lang to ChatBot:
<ChatBot lang={lang} />
\`\`\`

Issues found:
${checks.bilingual.map(i => `- ${i}`).join('\n')}
`
    writeFile(hintsPath, hint)
    console.log(`  💡 See MISSING_BILINGUAL.md for what to add`)
    fixed++
  }

  // ── SEO hint ──
  if (checks.seo?.length > 0) {
    const hintsPath = path.join(clientDir, 'MISSING_SEO.md')
    const hint = `# Missing: SEO — ${slug}

## Add to app/layout.tsx

\`\`\`typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '[Business Name] | Wilmington NC',
  description: '[What you do]. Serving Wilmington NC.',
  openGraph: {
    type: 'website',
    title: '[Business Name] | Wilmington NC',
    description: '[Description]',
    url: 'https://[domain].com',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '[Business Name] | Wilmington NC',
    description: '[Description]',
    images: ['/og-image.jpg'],
  },
  other: {
    'geo.region': 'US-NC',
    'geo.placename': 'Wilmington, North Carolina',
  },
}
\`\`\`

## Add JSON-LD to app/page.tsx

\`\`\`tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: '[Business Name]',
  telephone: '[phone]',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Wilmington',
    addressRegion: 'NC',
    addressCountry: 'US',
  },
  url: 'https://[domain].com',
}) }} />
\`\`\`

Issues found:
${checks.seo.map(i => `- ${i}`).join('\n')}
`
    writeFile(hintsPath, hint)
    console.log(`  💡 See MISSING_SEO.md for what to add`)
    fixed++
  }

  // ── Chatbot bilingual hint ──
  if (checks.chatbot?.some(i => i.includes('bilingual'))) {
    const routePath = path.join(clientDir, 'app', 'api', 'chat', 'route.ts')
    const route = readFile(routePath)
    if (route && !route.includes('lang')) {
      const updated = route
        .replace(
          /const { messages/,
          'const { messages, lang = \'en\''
        )
        .replace(
          /system:\s*`[^`]*`/,
          (match) => match.replace(/`$/, `\n\${lang === 'es' ? 'Respond in Spanish.' : 'Respond in English.'}\``)
        )
      if (updated !== route) {
        writeFile(routePath, updated)
        fixed++
      }
    }
  }
}

// ── SUMMARY ───────────────────────────────────────────────
console.log('\n╔══════════════════════════════════════════════════════╗')
console.log(`║  Fixed: ${String(fixed).padEnd(10)} Skipped (manual): ${String(skipped).padEnd(13)}║`)
console.log('╚══════════════════════════════════════════════════════╝')
console.log('\nNext steps:')
console.log('  1. Review any MISSING_BILINGUAL.md / MISSING_SEO.md files')
console.log('  2. Manually wire new components into page.tsx where noted')
console.log('  3. Run: node scripts/audit-clients.mjs  (verify clean)\n')
