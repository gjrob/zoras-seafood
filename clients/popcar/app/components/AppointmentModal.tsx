'use client'

import { useState } from 'react'

type Lang = 'en' | 'es'

const SERVICES_EN = [
  'Oil Change', 'Tire Service', 'Brake Service', 'Engine Repair',
  'Transmission', 'Diagnostics', 'Paint / Body Work',
  'Insurance Claim', 'Suspension', 'Other',
]
const SERVICES_ES = [
  'Cambio de Aceite', 'Servicio de Llantas', 'Servicio de Frenos', 'Reparación de Motor',
  'Transmisión', 'Diagnóstico', 'Pintura / Carrocería',
  'Reclamación de Seguro', 'Suspensión', 'Otro',
]
const TIMES = ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM']

const C = { red: '#cc0000', yellow: '#f5c518', bg: '#111', card: '#1a0000', border: 'rgba(204,0,0,0.25)', muted: '#888' }

export default function AppointmentModal({ open, onClose, lang }: { open: boolean; onClose: () => void; lang: Lang }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', vehicle: '', service: '', date: '', time: '', notes: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const es = lang === 'es'

  function set(k: keyof typeof form, v: string) { setForm(f => ({ ...f, [k]: v })) }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          vehicle: form.vehicle,
          service: form.service,
          date: form.date,
          time: form.time,
          notes: `Vehicle: ${form.vehicle} | Service: ${form.service}${form.notes ? ' | ' + form.notes : ''}`,
          party_size: 1,
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  function reset() { setForm({ name: '', phone: '', email: '', vehicle: '', service: '', date: '', time: '', notes: '' }); setStatus('idle'); onClose() }

  if (!open) return null

  const inputStyle: React.CSSProperties = {
    width: '100%', background: '#0a0a0a', border: '1px solid rgba(204,0,0,0.2)',
    borderRadius: '6px', padding: '0.6rem 0.8rem', color: '#fff',
    fontSize: '0.85rem', fontFamily: 'inherit', outline: 'none',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: C.muted, marginBottom: '4px',
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9990, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
      onClick={e => { if (e.target === e.currentTarget) reset() }}>
      <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: '16px', width: '100%', maxWidth: '540px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}>
        {/* Header */}
        <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '16px 16px 0 0' }}>
          <div>
            <h2 style={{ fontWeight: 900, fontSize: '1.05rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
              {es ? 'Reservar Cita' : 'Book Appointment'}
            </h2>
            <p style={{ fontSize: '0.72rem', color: C.muted, marginTop: '2px' }}>
              {es ? 'Confirmamos en 2 horas' : "We'll confirm within 2 hours"}
            </p>
          </div>
          <button onClick={reset} style={{ background: 'transparent', border: 'none', color: C.muted, fontSize: '1.4rem', cursor: 'pointer', lineHeight: 1, padding: '0 4px' }}>✕</button>
        </div>

        {/* Success state */}
        {status === 'success' ? (
          <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <h3 style={{ fontWeight: 900, fontSize: '1.2rem', color: '#fff', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              {es ? '¡Cita Solicitada!' : 'Appointment Requested!'}
            </h3>
            <p style={{ color: C.muted, fontSize: '0.88rem', marginBottom: '2rem' }}>
              {es
                ? `Te llamaremos al ${form.phone} en 2 horas.`
                : `We'll call ${form.phone} within 2 hours to confirm.`}
            </p>
            <button onClick={reset} style={{ background: C.red, color: '#fff', border: 'none', borderRadius: '8px', padding: '0.75rem 2rem', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}>
              {es ? 'Cerrar' : 'Close'}
            </button>
          </div>
        ) : (
          <form onSubmit={submit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Row: Name + Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={labelStyle}>{es ? 'Nombre *' : 'Name *'}</label>
                <input required value={form.name} onChange={e => set('name', e.target.value)} style={inputStyle} placeholder={es ? 'Tu nombre' : 'Your name'} />
              </div>
              <div>
                <label style={labelStyle}>{es ? 'Teléfono *' : 'Phone *'}</label>
                <input required type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} style={inputStyle} placeholder="(910) 555-0000" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>{es ? 'Correo (opcional)' : 'Email (optional)'}</label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)} style={inputStyle} placeholder={es ? 'tucorreo@email.com' : 'your@email.com'} />
            </div>

            {/* Vehicle */}
            <div>
              <label style={labelStyle}>{es ? 'Año / Marca / Modelo *' : 'Vehicle Year / Make / Model *'}</label>
              <input required value={form.vehicle} onChange={e => set('vehicle', e.target.value)} style={inputStyle} placeholder={es ? 'ej. 2018 Toyota Camry' : 'e.g. 2018 Toyota Camry'} />
            </div>

            {/* Service */}
            <div>
              <label style={labelStyle}>{es ? 'Servicio Necesario *' : 'Service Needed *'}</label>
              <select required value={form.service} onChange={e => set('service', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="">{es ? 'Seleccionar servicio…' : 'Select a service…'}</option>
                {(es ? SERVICES_ES : SERVICES_EN).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Date + Time */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={labelStyle}>{es ? 'Fecha Preferida' : 'Preferred Date'}</label>
                <input type="date" value={form.date} onChange={e => set('date', e.target.value)} style={inputStyle} min={new Date().toISOString().split('T')[0]} />
              </div>
              <div>
                <label style={labelStyle}>{es ? 'Hora Preferida' : 'Preferred Time'}</label>
                <select value={form.time} onChange={e => set('time', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="">{es ? 'Seleccionar…' : 'Select…'}</option>
                  {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label style={labelStyle}>{es ? 'Notas (opcional)' : 'Notes (optional)'}</label>
              <textarea value={form.notes} onChange={e => set('notes', e.target.value)} style={{ ...inputStyle, resize: 'vertical', minHeight: '72px' }} placeholder={es ? 'Cualquier detalle adicional…' : 'Any additional details…'} />
            </div>

            {/* Error */}
            {status === 'error' && (
              <p style={{ color: '#f87171', fontSize: '0.8rem', textAlign: 'center' }}>
                {es ? 'Error al enviar. Llámanos al (910) 834-3607.' : 'Error sending. Please call (910) 834-3607.'}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'sending'}
              style={{ background: status === 'sending' ? '#660000' : C.red, color: '#fff', border: 'none', borderRadius: '8px', padding: '0.9rem', fontSize: '0.9rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: status === 'sending' ? 'not-allowed' : 'pointer', boxShadow: '0 4px 16px rgba(204,0,0,0.35)' }}
            >
              {status === 'sending' ? (es ? 'Enviando…' : 'Sending…') : (es ? 'Reservar Cita' : 'Book Appointment')}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
