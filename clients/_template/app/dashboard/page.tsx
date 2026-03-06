// app/dashboard/page.tsx
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
      .eq('client_slug', '_template')
      .gte('created_at', weekAgo),
    supabase
      .from('chatbot_sessions')
      .select('*', { count: 'exact', head: true })
      .eq('client_slug', '_template')
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
        _template
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
