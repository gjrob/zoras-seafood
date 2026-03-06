'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
)

const TABLE = 'popcar_bookings'
const ACCENT = '#ff3333'
const BORDER = '#222222'

export default function BookingForm() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', date_requested: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!form.name || !form.phone) return alert('Name and phone required.')
    setLoading(true)
    try { await supabase.from(TABLE).insert({ ...form, status: 'new' }) } catch {}
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) return (
    <div style={{ border: `1px solid ${ACCENT}`, background: `${ACCENT}0d`, padding: '40px', textAlign: 'center' }}>
      <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
      <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', letterSpacing: '.1em', color: ACCENT }}>BOOKING RECEIVED</div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#666', marginTop: '8px' }}>We&apos;ll call to confirm your appointment. See you soon.</div>
    </div>
  )

  const inp: React.CSSProperties = { background: '#0a0a0a', border: `1px solid ${BORDER}`, color: '#f5f5f5', fontFamily: "'Inter', sans-serif", fontSize: '14px', padding: '12px 14px', outline: 'none', width: '100%', transition: 'border-color .15s' }
  const lbl: React.CSSProperties = { fontFamily: "'Inter', sans-serif", fontSize: '10px', letterSpacing: '.15em', color: '#666', display: 'block', marginBottom: '6px' }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
      <div>
        <label style={lbl}>YOUR NAME</label>
        <input style={inp} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="First Last" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = BORDER)} />
      </div>
      <div>
        <label style={lbl}>PHONE</label>
        <input style={inp} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="(910) 000-0000" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = BORDER)} />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={lbl}>SERVICE NEEDED</label>
        <select style={{ ...inp, cursor: 'pointer' }} value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = BORDER)}>
          <option value="">Select a service...</option>
          <option>Oil Change</option>
          <option>Brakes</option>
          <option>Tires</option>
          <option>Diagnostics</option>
          <option>AC Repair</option>
          <option>Transmission</option>
          <option>Battery</option>
          <option>General Repair</option>
        </select>
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={lbl}>PREFERRED DATE</label>
        <input type="date" style={inp} value={form.date_requested} onChange={e => setForm({ ...form, date_requested: e.target.value })} onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = BORDER)} />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={lbl}>NOTES / VEHICLE INFO</label>
        <textarea style={{ ...inp, minHeight: '90px', resize: 'vertical' }} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Year, make, model — and what's going on with the vehicle" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = BORDER)} />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <button onClick={handleSubmit} disabled={loading} style={{ background: loading ? '#222' : ACCENT, color: '#fff', fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px', padding: '16px', letterSpacing: '.15em', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', width: '100%', transition: 'background .15s' }}>
          {loading ? 'SENDING...' : '▶ BOOK MY SERVICE'}
        </button>
      </div>
    </div>
  )
}
