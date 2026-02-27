import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getStats(supabase: any) {
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()

  const [resWeek, resMonth, chatWeek, totalCustomers, pending] = await Promise.all([
    supabase
      .from('reservations').select('*', { count: 'exact', head: true })
      .eq('client_slug', 'popcar').gte('created_at', weekAgo),
    supabase
      .from('reservations').select('*', { count: 'exact', head: true })
      .eq('client_slug', 'popcar').gte('created_at', monthAgo),
    supabase
      .from('canonical_events').select('*', { count: 'exact', head: true })
      .eq('client_slug', 'popcar').eq('event_type', 'chat.message').gte('occurred_at', weekAgo),
    supabase
      .from('customers').select('*', { count: 'exact', head: true })
      .eq('client_slug', 'popcar'),
    supabase
      .from('reservations').select('*')
      .eq('client_slug', 'popcar').eq('status', 'pending')
      .order('created_at', { ascending: false }).limit(15),
  ])

  return {
    appointmentsWeek: resWeek.count ?? 0,
    appointmentsMonth: resMonth.count ?? 0,
    chatWeek: chatWeek.count ?? 0,
    totalCustomers: totalCustomers.count ?? 0,
    pendingAppointments: pending.data ?? [],
  }
}

export default async function PopCarDashboard() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key || url.includes('placeholder')) {
    return (
      <main style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ color: '#666', textAlign: 'center' }}>
          <p>Dashboard not configured.</p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Set SUPABASE_SERVICE_ROLE_KEY in .env.local</p>
        </div>
      </main>
    )
  }

  const supabase = createClient(url, key)
  const stats = await getStats(supabase)

  const statCards = [
    { label: 'Appointments', sub: 'This Week',  value: stats.appointmentsWeek,  accent: '#cc0000' },
    { label: 'Appointments', sub: 'This Month', value: stats.appointmentsMonth, accent: '#cc0000' },
    { label: 'Chatbot Conversations', sub: 'This Week', value: stats.chatWeek,  accent: '#4ade80' },
    { label: 'Total Customers', sub: 'All Time', value: stats.totalCustomers,   accent: '#f5c518' },
  ]

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif", color: '#ffffff', padding: '0 0 4rem' }}>
      {/* HEADER */}
      <header style={{ borderBottom: '1px solid rgba(204,0,0,0.2)', padding: '1.5rem 2rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
            <span style={{ color: '#cc0000' }}>Pop Car</span> Auto Center · Owner Dashboard
          </h1>
          <p style={{ fontSize: '0.72rem', color: '#666', marginTop: '4px', letterSpacing: '0.05em' }}>
            Updated in real time · Powered by BlueTubeTV
          </p>
        </div>
        <div style={{ fontSize: '0.7rem', color: '#666', textAlign: 'right' }}>
          <div>1301 Dawson St · Wilmington, NC</div>
          <div style={{ marginTop: '2px' }}>(910) 834-3607</div>
        </div>
      </header>

      <div style={{ padding: '2rem' }}>
        {/* STAT CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {statCards.map((card, i) => (
            <div key={i} style={{ background: '#111', border: '1px solid rgba(204,0,0,0.2)', borderRadius: '10px', padding: '1.25rem 1.5rem' }}>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#666', marginBottom: '0.5rem' }}>
                {card.label}<br /><span style={{ color: card.accent, fontSize: '0.6rem' }}>{card.sub}</span>
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 700, color: card.accent, lineHeight: 1 }}>
                {card.value.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* CUSTOMER BOOK LINK */}
        <div style={{ marginBottom: '2.5rem' }}>
          <a href="/dashboard/customers" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1a0000', border: '1px solid rgba(204,0,0,0.3)', borderRadius: '10px', padding: '1.25rem 1.5rem', textDecoration: 'none' }}>
            <div>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#666', marginBottom: '0.4rem' }}>CRM</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff' }}>Customer Book</div>
              <div style={{ fontSize: '0.72rem', color: '#666', marginTop: '3px' }}>Customers, notes, visit history</div>
            </div>
            <div style={{ fontSize: '1.5rem', color: '#cc0000' }}>→</div>
          </a>
        </div>

        {/* PENDING APPOINTMENTS */}
        <div>
          <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#666', marginBottom: '1rem', fontWeight: 600 }}>
            Pending Appointments
          </h2>
          {stats.pendingAppointments.length === 0 ? (
            <div style={{ background: '#111', border: '1px solid rgba(204,0,0,0.15)', borderRadius: '10px', padding: '2rem', textAlign: 'center', color: '#666', fontSize: '0.85rem' }}>
              No pending appointments
            </div>
          ) : (
            <div style={{ background: '#111', border: '1px solid rgba(204,0,0,0.15)', borderRadius: '10px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(204,0,0,0.15)' }}>
                    {['Name', 'Phone', 'Service / Vehicle', 'Date', 'Time', 'Status'].map(h => (
                      <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#666', fontWeight: 600, fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {stats.pendingAppointments.map((r: any) => (
                    <tr key={r.id} style={{ borderBottom: '1px solid rgba(204,0,0,0.07)' }}>
                      <td style={{ padding: '0.75rem 1rem', color: '#fff' }}>{r.name}</td>
                      <td style={{ padding: '0.75rem 1rem', color: '#999' }}>{r.phone}</td>
                      <td style={{ padding: '0.75rem 1rem', color: '#999', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.notes || '—'}</td>
                      <td style={{ padding: '0.75rem 1rem', color: '#fff' }}>{r.date || '—'}</td>
                      <td style={{ padding: '0.75rem 1rem', color: '#fff' }}>{r.time || '—'}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.06em', background: 'rgba(245,197,24,0.1)', color: '#f5c518', border: '1px solid rgba(245,197,24,0.3)' }}>
                          PENDING
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ textAlign: 'center', padding: '1.5rem', borderTop: '1px solid rgba(204,0,0,0.1)', marginTop: '3rem' }}>
        <p style={{ color: '#444', fontSize: '0.7rem', letterSpacing: '0.08em' }}>
          BlueTubeTV · Blue Ring Holdings LLC
        </p>
      </footer>
    </main>
  )
}
