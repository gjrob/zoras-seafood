import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getStats(supabase: any) {
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const [chatWeek, totalCustomers, fishListTotal, fishListWeek] = await Promise.all([
    supabase
      .from('canonical_events').select('*', { count: 'exact', head: true })
      .eq('client_slug', 'zoras').eq('event_type', 'chat.message').gte('occurred_at', weekAgo),
    supabase
      .from('customers').select('*', { count: 'exact', head: true })
      .eq('client_slug', 'zoras'),
    supabase
      .from('fish_list_subscribers').select('*', { count: 'exact', head: true })
      .eq('client_slug', 'zoras'),
    supabase
      .from('fish_list_subscribers').select('*', { count: 'exact', head: true })
      .eq('client_slug', 'zoras').gte('subscribed_at', weekAgo),
  ])

  return {
    chatWeek: chatWeek.count ?? 0,
    totalCustomers: totalCustomers.count ?? 0,
    fishListTotal: fishListTotal.count ?? 0,
    fishListWeek: fishListWeek.count ?? 0,
  }
}

export default async function ZorasDashboard() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key || url.includes('placeholder')) {
    return (
      <main style={{ background: '#071929', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ color: '#4ab8e8', textAlign: 'center' }}>
          <p>Dashboard not configured.</p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Set SUPABASE_SERVICE_ROLE_KEY in .env.local</p>
        </div>
      </main>
    )
  }

  const supabase = createClient(url, key)
  const stats = await getStats(supabase)

  const statCards = [
    { label: 'Fish List Subscribers', sub: 'All Time',   value: stats.fishListTotal, accent: '#f5c518' },
    { label: 'Fish List Subscribers', sub: 'This Week',  value: stats.fishListWeek,  accent: '#f5c518' },
    { label: 'Chatbot Conversations', sub: 'This Week',  value: stats.chatWeek,      accent: '#4ade80' },
    { label: 'Total Customers',       sub: 'All Time',   value: stats.totalCustomers, accent: '#4ab8e8' },
  ]

  return (
    <main style={{ background: '#071929', minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif", color: '#e2f5fb', padding: '0 0 4rem' }}>

      {/* HEADER */}
      <header style={{ borderBottom: '1px solid rgba(245,197,24,0.12)', padding: '1.5rem 2rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
            <span style={{ color: '#f5c518' }}>Zora&apos;s</span> Seafood Market &amp; Kitchen · Owner Dashboard
          </h1>
          <p style={{ fontSize: '0.72rem', color: '#4ab8e8', marginTop: '4px', letterSpacing: '0.05em' }}>
            Updated in real time · Powered by BlueTubeTV
          </p>
        </div>
        <div style={{ fontSize: '0.7rem', color: '#7bbcd6', textAlign: 'right' }}>
          <div>1411 Castle St · Wilmington, NC</div>
          <div style={{ marginTop: '2px' }}>(910) 763-0992</div>
        </div>
      </header>

      <div style={{ padding: '2rem' }}>

        {/* STAT CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {statCards.map((card, i) => (
            <div key={i} style={{ background: '#0d2b45', border: '1px solid rgba(245,197,24,0.12)', borderRadius: '10px', padding: '1.25rem 1.5rem' }}>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7bbcd6', marginBottom: '0.5rem' }}>
                {card.label}<br /><span style={{ color: card.accent, fontSize: '0.6rem' }}>{card.sub}</span>
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 700, color: card.accent, lineHeight: 1 }}>
                {card.value.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* FISH LIST SUBSCRIBERS LINK */}
        <div style={{ marginBottom: '2rem' }}>
          <a href="/dashboard/fishlist" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0d2b45', border: '1px solid rgba(245,197,24,0.2)', borderRadius: '10px', padding: '1.25rem 1.5rem', textDecoration: 'none' }}>
            <div>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7bbcd6', marginBottom: '0.4rem' }}>Fish List</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff' }}>Subscriber List</div>
              <div style={{ fontSize: '0.72rem', color: '#7bbcd6', marginTop: '3px' }}>All Fish List email signups</div>
            </div>
            <div style={{ fontSize: '1.5rem', color: '#f5c518' }}>→</div>
          </a>
        </div>

        {/* CUSTOMER BOOK LINK */}
        <div style={{ marginBottom: '2.5rem' }}>
          <a href="/dashboard/customers" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0d2b45', border: '1px solid rgba(74,184,232,0.15)', borderRadius: '10px', padding: '1.25rem 1.5rem', textDecoration: 'none' }}>
            <div>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7bbcd6', marginBottom: '0.4rem' }}>CRM</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff' }}>Customer Book</div>
              <div style={{ fontSize: '0.72rem', color: '#7bbcd6', marginTop: '3px' }}>Customers, notes, visit history</div>
            </div>
            <div style={{ fontSize: '1.5rem', color: '#4ab8e8' }}>→</div>
          </a>
        </div>

      </div>

      {/* FOOTER */}
      <footer style={{ textAlign: 'center', padding: '1.5rem', borderTop: '1px solid rgba(245,197,24,0.08)', marginTop: '2rem' }}>
        <p style={{ color: '#4ab8e8', fontSize: '0.7rem', letterSpacing: '0.08em' }}>
          BlueTubeTV · Blue Ring Holdings LLC
        </p>
      </footer>
    </main>
  )
}
