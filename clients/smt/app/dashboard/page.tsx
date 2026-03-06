'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
)

const CLIENT_NAME = 'SMT Services'
const LEADS_TABLE = 'smt_bookings'
const CLIENT_SLUG = 'smt'
const ACCENT = '#f5a623'
const ACCENT_TEXT = '#1a1a0a'

interface Lead {
  id: string
  name: string
  phone?: string
  email?: string
  service?: string
  notes?: string
  status: string
  created_at: string
}

interface NurtureMessage {
  id: string
  lead_name: string
  phone: string
  sequence_step: number
  status: string
  channel: string
  scheduled_at: string
}

function NurtureTab() {
  const [queue, setQueue] = useState<NurtureMessage[]>([])
  const [stats, setStats] = useState({ pending: 0, sent: 0, failed: 0, opted_out: 0 })

  useEffect(() => {
    supabase
      .from('nurture_queue')
      .select('*')
      .eq('client_slug', CLIENT_SLUG)
      .order('scheduled_at', { ascending: false })
      .limit(100)
      .then(({ data }) => {
        if (data) {
          setQueue(data)
          setStats({
            pending:   data.filter(m => m.status === 'pending').length,
            sent:      data.filter(m => m.status === 'sent').length,
            failed:    data.filter(m => m.status === 'failed').length,
            opted_out: data.filter(m => m.status === 'opted_out').length,
          })
        }
      })
  }, [])

  const statusColor: Record<string, string> = {
    pending: '#ffaa00', sent: ACCENT, failed: '#ff4444', opted_out: '#6b7a4d',
  }

  return (
    <div style={{ margin: '24px 32px 48px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: '#3a3510', marginBottom: '24px' }}>
        {[
          { label: 'PENDING',  value: stats.pending,   color: '#ffaa00' },
          { label: 'SENT',     value: stats.sent,      color: ACCENT },
          { label: 'FAILED',   value: stats.failed,    color: '#ff4444' },
          { label: 'OPT-OUT',  value: stats.opted_out, color: '#6b7a4d' },
        ].map(s => (
          <div key={s.label} style={{ background: '#1a1a0a', padding: '20px 24px' }}>
            <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#8a8050', letterSpacing: '.1em' }}>{s.label}</div>
            <div style={{ fontFamily: 'Fredoka One, monospace', fontSize: '40px', color: s.color, lineHeight: 1 }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: '10px', color: ACCENT, letterSpacing: '.15em', marginBottom: '12px' }}>// NURTURE QUEUE</div>
      {queue.length === 0 ? (
        <div style={{ color: '#8a8050', padding: '48px', textAlign: 'center', border: '1px solid #3a3510' }}>NO MESSAGES QUEUED YET</div>
      ) : (
        <div style={{ border: '1px solid #3a3510' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 80px 60px 90px', padding: '10px 16px', background: '#211e08', fontFamily: 'monospace', fontSize: '10px', color: '#8a8050', letterSpacing: '.1em', borderBottom: '1px solid #3a3510' }}>
            <span>NAME</span><span>SCHEDULED</span><span>STEP</span><span>CH</span><span>STATUS</span>
          </div>
          {queue.map((msg, i) => (
            <div key={msg.id} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 80px 60px 90px', padding: '12px 16px', fontFamily: 'monospace', fontSize: '12px', borderBottom: i < queue.length - 1 ? '1px solid #2a2810' : 'none', background: i % 2 === 0 ? '#1a1a0a' : '#211e08', alignItems: 'center' }}>
              <span style={{ color: '#faf5e0', fontWeight: 600 }}>{msg.lead_name}</span>
              <span style={{ color: '#8a8050' }}>{new Date(msg.scheduled_at).toLocaleDateString()}</span>
              <span style={{ color: '#8a8050' }}>Step {msg.sequence_step}</span>
              <span style={{ color: '#8a8050' }}>{msg.channel.toUpperCase()}</span>
              <span style={{ color: statusColor[msg.status] || '#666' }}>{msg.status.toUpperCase().replace('_', '-')}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState({ today: 0, week: 0, total: 0 })
  const [loading, setLoading] = useState(true)
  const [overlayActive, setOverlayActive] = useState(false)
  const [overlayMsg, setOverlayMsg] = useState('')
  const [activeTab, setActiveTab] = useState<'leads' | 'nurture'>('leads')

  useEffect(() => {
    fetchLeads()
    supabase.from('venue_status').select('specials_text, is_open').eq('client_slug', CLIENT_SLUG).single()
      .then(({ data }) => {
        if (data) {
          setOverlayMsg(data.specials_text || '')
          setOverlayActive(!!data.specials_text)
        }
      })
    const sub = supabase.channel('smt-leads')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: LEADS_TABLE },
        (payload) => {
          setLeads(prev => [payload.new as Lead, ...prev])
          setStats(prev => ({ ...prev, today: prev.today + 1, total: prev.total + 1 }))
        })
      .subscribe()
    return () => { supabase.removeChannel(sub) }
  }, [])

  async function fetchLeads() {
    const { data } = await supabase.from(LEADS_TABLE).select('*').order('created_at', { ascending: false }).limit(200)
    if (data) {
      setLeads(data)
      const now = new Date()
      const weekAgo = new Date(now); weekAgo.setDate(weekAgo.getDate() - 7)
      setStats({
        today: data.filter(l => new Date(l.created_at).toDateString() === now.toDateString()).length,
        week:  data.filter(l => new Date(l.created_at) >= weekAgo).length,
        total: data.length,
      })
    }
    setLoading(false)
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from(LEADS_TABLE).update({ status }).eq('id', id)
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
  }

  function exportCSV() {
    if (!leads.length) return
    const headers = Object.keys(leads[0]).join(',')
    const rows = leads.map(l => Object.values(l).map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([headers + '\n' + rows], { type: 'text/csv' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob)
    a.download = `smt-bookings-${new Date().toISOString().split('T')[0]}.csv`; a.click()
  }

  const statusColor = (s: string) => (
    ({ new: '#ffaa00', pending: ACCENT, confirmed: '#d4f033', completed: '#a8e063', cancelled: '#ff4444' } as Record<string, string>)[s] || '#666'
  )

  const tabStyle = (tab: 'leads' | 'nurture') => ({
    padding: '10px 28px',
    cursor: 'pointer' as const,
    fontFamily: 'monospace',
    fontSize: '11px',
    letterSpacing: '.1em',
    fontWeight: 700,
    border: 'none',
    background: 'transparent',
    color: activeTab === tab ? ACCENT : '#8a8050',
    borderBottom: activeTab === tab ? `2px solid ${ACCENT}` : '2px solid transparent',
  })

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a0a', color: '#faf5e0', fontFamily: 'monospace' }}>
      {/* Header */}
      <div style={{ borderBottom: `3px solid ${ACCENT}`, padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', background: ACCENT, clipPath: 'polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Fredoka One, monospace', fontSize: '20px', color: ACCENT_TEXT, lineHeight: 1 }}>S</span>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: ACCENT, letterSpacing: '.15em' }}>// DASHBOARD</div>
            <div style={{ fontFamily: 'Fredoka One, monospace', fontSize: '22px', color: '#faf5e0', letterSpacing: '.05em' }}>{CLIENT_NAME.toUpperCase()}</div>
          </div>
        </div>
        <button onClick={exportCSV} style={{ background: 'transparent', border: `1px solid ${ACCENT}`, color: ACCENT, padding: '8px 20px', cursor: 'pointer', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '.1em' }}>
          EXPORT CSV
        </button>
      </div>

      {/* Tab bar */}
      <div style={{ borderBottom: '1px solid #3a3510', display: 'flex', padding: '0 32px' }}>
        <button onClick={() => setActiveTab('leads')} style={tabStyle('leads')}>LEADS</button>
        <button onClick={() => setActiveTab('nurture')} style={tabStyle('nurture')}>NURTURE</button>
      </div>

      {activeTab === 'leads' ? (
        <>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: '#3a3510' }}>
            {[{ label: 'TODAY', value: stats.today }, { label: 'THIS WEEK', value: stats.week }, { label: 'ALL TIME', value: stats.total }].map(s => (
              <div key={s.label} style={{ background: '#1a1a0a', padding: '28px 32px' }}>
                <div style={{ fontSize: '10px', color: '#8a8050', letterSpacing: '.1em', marginBottom: '8px' }}>{s.label}</div>
                <div style={{ fontFamily: 'Fredoka One, monospace', fontSize: '56px', color: ACCENT, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '10px', color: '#8a8050', marginTop: '4px' }}>BOOKINGS</div>
              </div>
            ))}
          </div>

          {/* Overlay Control */}
          <div style={{ margin: '24px 32px', border: '1px solid #3a3510', padding: '20px' }}>
            <div style={{ fontSize: '10px', color: ACCENT, letterSpacing: '.15em', marginBottom: '12px' }}>// OVERLAY CONTROL</div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                value={overlayMsg}
                onChange={e => setOverlayMsg(e.target.value)}
                placeholder="e.g. AirBnB turnover special this weekend — call Stefanie"
                style={{ flex: 1, background: '#211e08', border: '1px solid #3a3510', color: '#faf5e0', padding: '10px 16px', fontFamily: 'monospace', fontSize: '13px', outline: 'none' }}
              />
              <button
                onClick={async () => {
                  if (overlayActive) {
                    await supabase.from('venue_status').update({ specials_text: '', is_open: true }).eq('client_slug', CLIENT_SLUG)
                    setOverlayActive(false)
                  } else {
                    await supabase.from('venue_status').update({ specials_text: overlayMsg, is_open: true }).eq('client_slug', CLIENT_SLUG)
                    setOverlayActive(true)
                  }
                }}
                style={{ background: overlayActive ? '#ff4444' : ACCENT, color: ACCENT_TEXT, border: 'none', padding: '10px 28px', cursor: 'pointer', fontFamily: 'monospace', fontWeight: 700, fontSize: '12px', letterSpacing: '.1em' }}
              >
                {overlayActive ? 'STOP' : 'GO LIVE'}
              </button>
            </div>
            {overlayActive && (
              <div style={{ marginTop: '12px', padding: '10px 16px', background: `rgba(245,166,35,.06)`, border: `1px solid ${ACCENT}`, fontSize: '12px', color: ACCENT }}>
                ● LIVE — &quot;{overlayMsg || 'No message set'}&quot;
              </div>
            )}
          </div>

          {/* Table */}
          <div style={{ margin: '0 32px 48px' }}>
            <div style={{ fontSize: '10px', color: ACCENT, letterSpacing: '.15em', marginBottom: '12px' }}>// BOOKINGS — REAL TIME</div>
            {loading ? (
              <div style={{ color: '#8a8050', padding: '48px', textAlign: 'center' }}>LOADING...</div>
            ) : leads.length === 0 ? (
              <div style={{ color: '#8a8050', padding: '48px', textAlign: 'center', border: '1px solid #3a3510' }}>NO BOOKINGS YET</div>
            ) : (
              <div style={{ border: '1px solid #3a3510' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr 1.5fr 1fr', padding: '10px 16px', background: '#211e08', fontSize: '10px', color: '#8a8050', letterSpacing: '.1em', borderBottom: '1px solid #3a3510' }}>
                  <span>NAME</span><span>PHONE</span><span>SERVICE</span><span>NOTES</span><span>STATUS</span>
                </div>
                {leads.map((lead, i) => (
                  <div key={lead.id} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr 1.5fr 1fr', padding: '14px 16px', fontSize: '12px', borderBottom: i < leads.length - 1 ? '1px solid #2a2810' : 'none', background: i % 2 === 0 ? '#1a1a0a' : '#211e08', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, color: '#faf5e0' }}>{lead.name}</span>
                    <span style={{ color: '#8a8050' }}>{lead.phone || '—'}</span>
                    <span style={{ color: '#8a8050' }}>{lead.service || '—'}</span>
                    <span style={{ color: '#8a8050', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '8px' }}>{lead.notes || '—'}</span>
                    <select
                      value={lead.status}
                      onChange={e => updateStatus(lead.id, e.target.value)}
                      style={{ background: '#211e08', border: `1px solid ${statusColor(lead.status)}`, color: statusColor(lead.status), padding: '4px 8px', fontSize: '10px', fontFamily: 'monospace', cursor: 'pointer' }}
                    >
                      <option value="new">NEW</option>
                      <option value="pending">PENDING</option>
                      <option value="confirmed">CONFIRMED</option>
                      <option value="completed">COMPLETED</option>
                      <option value="cancelled">CANCELLED</option>
                    </select>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <NurtureTab />
      )}
    </div>
  )
}
