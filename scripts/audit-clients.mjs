#!/usr/bin/env node
// scripts/audit-clients.mjs
// Run from repo root: node scripts/audit-clients.mjs
// Checks every client against CLAUDE.md Tier 1 requirements

import fs from 'fs'
import path from 'path'

const CLIENTS_DIR = './clients'
const REQUIRED_TIER1 = [
  'bilingual',
  'venueStatus',
  'specialsBanner',
  'dashboard',
  'chatbot',
  'poweredByBTV',
  'seo',
]

const results = {}

function readFile(filePath) {
  try { return fs.readFileSync(filePath, 'utf8') }
  catch { return null }
}

function findFiles(dir, ext) {
  const found = []
  if (!fs.existsSync(dir)) return found
  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name)
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        walk(full)
      } else if (entry.isFile() && entry.name.endsWith(ext)) {
        found.push(full)
      }
    }
  }
  walk(dir)
  return found
}

function getAllContent(clientDir) {
  const files = [
    ...findFiles(path.join(clientDir, 'app'), '.tsx'),
    ...findFiles(path.join(clientDir, 'app'), '.ts'),
    ...findFiles(path.join(clientDir, 'app'), '.css'),
    ...findFiles(path.join(clientDir, 'components'), '.tsx'),
  ]
  return files.map(f => ({ file: f, content: readFile(f) || '' }))
}

function checkBilingual(clientDir, allContent) {
  const issues = []
  const combined = allContent.map(f => f.content).join('\n')

  // Must have lang state or toggle
  if (!combined.includes("lang") || !combined.includes("'en'") && !combined.includes('"en"')) {
    issues.push('No lang state found (EN/ES toggle)')
  }
  if (!combined.includes("'es'") && !combined.includes('"es"')) {
    issues.push('No ES language strings found')
  }
  // Check for a toggle button
  if (!combined.includes('ES') || !combined.includes('EN')) {
    issues.push('No EN/ES toggle button found in UI')
  }

  return issues
}

function checkVenueStatus(clientDir, allContent) {
  const issues = []
  const combined = allContent.map(f => f.content).join('\n')

  if (!combined.includes('venue_status')) {
    issues.push('No venue_status Supabase subscription found')
  }
  if (!combined.includes('kitchen_open') && !combined.includes('isOpen') && !combined.includes('open')) {
    issues.push('No open/closed status indicator in UI')
  }

  return issues
}

function checkSpecialsBanner(clientDir, allContent) {
  const issues = []
  const combined = allContent.map(f => f.content).join('\n')

  const hasSpecials = combined.toLowerCase().includes('special') ||
                      combined.toLowerCase().includes('happy hour') ||
                      combined.toLowerCase().includes('banner')
  if (!hasSpecials) {
    issues.push('No specials/happy hour banner component found')
  }

  return issues
}

function checkDashboard(clientDir, allContent) {
  const issues = []
  const dashboardFile = path.join(clientDir, 'app', 'dashboard', 'page.tsx')
  const dashboardAlt  = path.join(clientDir, 'app', 'dashboard.tsx')

  if (!fs.existsSync(dashboardFile) && !fs.existsSync(dashboardAlt)) {
    issues.push('Missing: app/dashboard/page.tsx (owner analytics dashboard)')
  }

  return issues
}

function checkChatbot(clientDir, allContent) {
  const issues = []
  const combined = allContent.map(f => f.content).join('\n')

  if (!combined.includes('ChatBot') && !combined.includes('Chatbot') && !combined.includes('chatbot')) {
    issues.push('No ChatBot component found')
  }

  const chatRoute = path.join(clientDir, 'app', 'api', 'chat', 'route.ts')
  if (!fs.existsSync(chatRoute)) {
    issues.push('Missing: app/api/chat/route.ts')
  } else {
    const routeContent = readFile(chatRoute) || ''
    if (!routeContent.includes('claude-sonnet-4-20250514')) {
      issues.push('chat/route.ts not using claude-sonnet-4-20250514')
    }
    if (!routeContent.includes('lang') || !routeContent.includes('Spanish')) {
      issues.push('chat/route.ts missing bilingual system prompt (lang param)')
    }
  }

  return issues
}

function checkPoweredByBTV(clientDir, allContent) {
  const issues = []
  const combined = allContent.map(f => f.content).join('\n')

  // Check spelling: must be "Powered by BlueTubeTV" not "Powered By" or variations
  if (!combined.includes('Powered by BlueTubeTV')) {
    if (combined.includes('PoweredByBTV') || combined.includes('poweredbybtv') ||
        combined.toLowerCase().includes('powered by bluetubetv')) {
      issues.push('Wrong spelling — must be exactly: "Powered by BlueTubeTV" (lowercase "by")')
    } else {
      issues.push('Missing PoweredByBTV component entirely')
    }
  }

  // Must be in layout.tsx
  const layoutFile = path.join(clientDir, 'app', 'layout.tsx')
  const layoutContent = readFile(layoutFile) || ''
  if (!layoutContent.includes('PoweredByBTV')) {
    issues.push('PoweredByBTV not mounted in app/layout.tsx (must be global)')
  }

  return issues
}

function checkSEO(clientDir, allContent) {
  const issues = []
  const layoutFile = path.join(clientDir, 'app', 'layout.tsx')
  const layoutContent = readFile(layoutFile) || ''

  if (!layoutContent.includes('export const metadata') && !layoutContent.includes('export async function generateMetadata')) {
    issues.push('Missing metadata export in layout.tsx')
  }
  if (!layoutContent.includes('openGraph')) {
    issues.push('Missing openGraph in metadata')
  }
  if (!layoutContent.includes('twitter')) {
    issues.push('Missing twitter card in metadata')
  }

  // JSON-LD check in page.tsx
  const pageFile = path.join(clientDir, 'app', 'page.tsx')
  const pageContent = readFile(pageFile) || ''
  if (!pageContent.includes('application/ld+json')) {
    issues.push('Missing JSON-LD LocalBusiness schema in page.tsx')
  }
  if (!pageContent.includes('geo.region') && !layoutContent.includes('geo.region')) {
    issues.push('Missing geo.region meta tag (US-NC)')
  }

  return issues
}

// ── RUN AUDIT ──────────────────────────────────────────────

const clients = fs.readdirSync(CLIENTS_DIR).filter(d => {
  const full = path.join(CLIENTS_DIR, d)
  return fs.statSync(full).isDirectory() && !d.startsWith('.')
})

console.log('\n╔══════════════════════════════════════════════════════╗')
console.log('║       CLAUDE.md COMPLIANCE AUDIT — BluRing Agency    ║')
console.log('╚══════════════════════════════════════════════════════╝\n')

let totalIssues = 0
const clientReport = {}

for (const slug of clients) {
  const clientDir = path.join(CLIENTS_DIR, slug)
  const allContent = getAllContent(clientDir)

  const checks = {
    bilingual:     checkBilingual(clientDir, allContent),
    venueStatus:   checkVenueStatus(clientDir, allContent),
    specialsBanner:checkSpecialsBanner(clientDir, allContent),
    dashboard:     checkDashboard(clientDir, allContent),
    chatbot:       checkChatbot(clientDir, allContent),
    poweredByBTV:  checkPoweredByBTV(clientDir, allContent),
    seo:           checkSEO(clientDir, allContent),
  }

  const clientIssues = Object.values(checks).flat()
  totalIssues += clientIssues.length
  clientReport[slug] = checks

  const status = clientIssues.length === 0 ? '✅ PASS' : `❌ ${clientIssues.length} issues`
  console.log(`── ${slug.toUpperCase().padEnd(20)} ${status}`)

  for (const [check, issues] of Object.entries(checks)) {
    if (issues.length > 0) {
      console.log(`   ${check}:`)
      for (const issue of issues) {
        console.log(`     ⚠  ${issue}`)
      }
    }
  }
  console.log()
}

// ── SUMMARY ───────────────────────────────────────────────

console.log('╔══════════════════════════════════════════════════════╗')
console.log(`║  TOTAL ISSUES: ${String(totalIssues).padEnd(36)} ║`)
console.log('╚══════════════════════════════════════════════════════╝\n')

if (totalIssues > 0) {
  console.log('Run to auto-fix:')
  console.log('  node scripts/fix-clients.mjs\n')
}

// Write machine-readable report for fix-clients.mjs to consume
fs.writeFileSync(
  './scripts/audit-report.json',
  JSON.stringify({ clients: clientReport, totalIssues, timestamp: new Date().toISOString() }, null, 2)
)
console.log('Report saved: scripts/audit-report.json\n')
