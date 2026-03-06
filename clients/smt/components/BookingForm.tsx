'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
)

const TABLE = 'smt_bookings'
const ORANGE = '#f5a623'
const BORDER = '#3a3510'

const T = {
  name:        { en: 'YOUR NAME',        es: 'TU NOMBRE' },
  phone:       { en: 'PHONE',            es: 'TELÉFONO' },
  service:     { en: 'SERVICE NEEDED',   es: 'SERVICIO' },
  notes:       { en: 'ADDRESS / NOTES',  es: 'DIRECCIÓN / NOTAS' },
  selectPh:    { en: 'Select a service...', es: 'Selecciona un servicio...' },
  namePh:      { en: 'First Last',       es: 'Nombre Apellido' },
  notesPh:     { en: 'Your address and any details about the space...', es: 'Tu dirección y detalles del espacio...' },
  submit:      { en: '⚡ REQUEST BOOKING', es: '⚡ SOLICITAR RESERVA' },
  sending:     { en: 'SENDING...',       es: 'ENVIANDO...' },
  successTitle:{ en: 'BOOKING RECEIVED!', es: '¡SOLICITUD RECIBIDA!' },
  successSub:  { en: 'Stefanie will reach out shortly to confirm. Thank you!', es: 'Stefanie se comunicará pronto para confirmar. ¡Gracias!' },
  validation:  { en: 'Please enter your name and phone.', es: 'Por favor ingresa tu nombre y teléfono.' },
  services:    {
    en: ['Residential Cleaning', 'Commercial Cleaning', 'AirBnB Turnover', 'Post Construction'],
    es: ['Limpieza Residencial', 'Limpieza Comercial', 'Rotación AirBnB', 'Post Construcción'],
  },
}

export default function BookingForm({ lang = 'en' }: { lang?: 'en' | 'es' }) {
  const [form, setForm] = useState({ name: '', phone: '', service: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!form.name || !form.phone) return alert(T.validation[lang])
    setLoading(true)
    try {
      await supabase.from(TABLE).insert({ ...form, status: 'new' })
    } catch {}
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) return (
    <div style={{ border: `2px solid ${ORANGE}`, background: `${ORANGE}18`, padding: '48px', textAlign: 'center', borderRadius: '4px' }}>
      <div style={{ fontSize: '52px', marginBottom: '12px' }}>✅</div>
      <div style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: '28px', color: ORANGE }}>{T.successTitle[lang]}</div>
      <div style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '14px', color: '#8a8050', marginTop: '8px' }}>
        {T.successSub[lang]}
      </div>
    </div>
  )

  const inputStyle: React.CSSProperties = {
    background: '#1a1a0a',
    border: `2px solid ${BORDER}`,
    color: '#faf5e0',
    fontFamily: '"DM Sans", sans-serif',
    fontWeight: 600,
    fontSize: '14px',
    padding: '12px 14px',
    outline: 'none',
    width: '100%',
    transition: 'border-color .15s',
    borderRadius: '2px',
  }
  const labelStyle: React.CSSProperties = {
    fontFamily: '"DM Sans", sans-serif',
    fontWeight: 700,
    fontSize: '11px',
    letterSpacing: '.12em',
    color: '#8a8050',
    display: 'block',
    marginBottom: '6px',
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
      <div>
        <label style={labelStyle}>{T.name[lang]}</label>
        <input
          style={inputStyle}
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder={T.namePh[lang]}
          onFocus={e => (e.target.style.borderColor = ORANGE)}
          onBlur={e => (e.target.style.borderColor = BORDER)}
        />
      </div>
      <div>
        <label style={labelStyle}>{T.phone[lang]}</label>
        <input
          style={inputStyle}
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          placeholder="910-000-0000"
          onFocus={e => (e.target.style.borderColor = ORANGE)}
          onBlur={e => (e.target.style.borderColor = BORDER)}
        />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={labelStyle}>{T.service[lang]}</label>
        <select
          style={{ ...inputStyle, cursor: 'pointer' }}
          value={form.service}
          onChange={e => setForm({ ...form, service: e.target.value })}
          onFocus={e => (e.target.style.borderColor = ORANGE)}
          onBlur={e => (e.target.style.borderColor = BORDER)}
        >
          <option value="">{T.selectPh[lang]}</option>
          {T.services[lang].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={labelStyle}>{T.notes[lang]}</label>
        <textarea
          style={{ ...inputStyle, minHeight: '90px', resize: 'vertical' }}
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
          placeholder={T.notesPh[lang]}
          onFocus={e => (e.target.style.borderColor = ORANGE)}
          onBlur={e => (e.target.style.borderColor = BORDER)}
        />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            background: loading ? BORDER : ORANGE,
            color: '#1a1a0a',
            fontFamily: '"DM Serif Display", Georgia, serif',
            fontSize: '18px',
            letterSpacing: '.08em',
            padding: '16px',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            width: '100%',
            transition: 'background .15s',
          }}
        >
          {loading ? T.sending[lang] : T.submit[lang]}
        </button>
      </div>
    </div>
  )
}
