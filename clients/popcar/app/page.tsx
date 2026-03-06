'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
)

type Lang = 'en' | 'es'
const t = (en: string, es: string, lang: Lang) => lang === 'es' ? es : en

// ── Services data ──────────────────────────────────────────────────────────────
const SERVICES = [
  { name: 'Oil Change',       nameEs: 'Cambio de Aceite',        desc: 'Synthetic oil + filter',           descEs: 'Aceite sintético + filtro',              price: '$49.99+',  category: 'MAINTENANCE', level: 1, icon: '🛢️' },
  { name: 'Tire Rotation',    nameEs: 'Rotación de Llantas',     desc: 'Rotate & balance all four',         descEs: 'Rotar y balancear las cuatro',           price: '$25.00+',  category: 'TIRES',       level: 1, icon: '🔄' },
  { name: 'New Tires',        nameEs: 'Llantas Nuevas',          desc: 'Used & new available',              descEs: 'Usadas y nuevas disponibles',            price: 'CALL',     category: 'TIRES',       level: 2, icon: '⚫' },
  { name: 'Brake Service',    nameEs: 'Servicio de Frenos',      desc: 'Pads, rotors, inspection',          descEs: 'Pastillas, rotores, inspección',         price: '$89.99+',  category: 'BRAKES',      level: 3, icon: '🔴' },
  { name: 'Check Engine',     nameEs: 'Diagnóstico',             desc: 'Full diagnostic scan',              descEs: 'Diagnóstico completo',                   price: 'FREE*',    category: 'DIAGNOSTICS', level: 2, icon: '⚠️' },
  { name: 'Engine Repair',    nameEs: 'Reparación de Motor',     desc: 'Full diagnosis & repair',           descEs: 'Diagnóstico y reparación completa',      price: 'CALL',     category: 'ENGINE',      level: 5, icon: '⚙️' },
  { name: 'Transmission',     nameEs: 'Transmisión',             desc: 'Fluid, filter, inspection',         descEs: 'Fluido, filtro, inspección',             price: '$129.99+', category: 'DRIVETRAIN',  level: 4, icon: '🔩' },
  { name: 'Paint & Restore',  nameEs: 'Pintura y Restauración',  desc: 'Scratch repair, restoration',       descEs: 'Reparación de raspaduras, restauración', price: 'CALL',     category: 'BODY',        level: 3, icon: '🎨' },
  { name: 'Insurance Claims', nameEs: 'Reclamaciones de Seguro', desc: 'All major carriers',                descEs: 'Todas las aseguradoras',                 price: 'CALL',     category: 'BODY',        level: 2, icon: '📋' },
  { name: 'Suspension',       nameEs: 'Suspensión',              desc: 'Shocks, struts, alignment',         descEs: 'Amortiguadores, alineación',             price: 'CALL',     category: 'SUSPENSION',  level: 3, icon: '🚗' },
]

const LIVE_CARDS = [
  { dot: '🔴', label: 'LIVE NOW', service: 'Oil Change',    detail: 'Bay 2',            borderColor: '#cc0000' },
  { dot: '🟡', label: 'QUEUED',   service: 'Brake Service', detail: 'Est. 45min',       borderColor: '#f5c518' },
  { dot: '✅', label: 'DONE',     service: 'Tire Rotation', detail: 'Ready for pickup', borderColor: '#4ade80' },
]

const TIMES = ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM']

const labelSt: React.CSSProperties = {
  display: 'block',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '11px',
  color: '#555',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginBottom: '6px',
}

// ── Inline grid styles (production-safe, never lost in CSS build) ─────────────
const GRID = {
  heroSplit: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 420px',
    gap: '3rem',
    alignItems: 'center',
    maxWidth: '1100px',
    margin: '0 auto',
    width: '100%',
  } as React.CSSProperties,
  serviceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '1.25rem',
  } as React.CSSProperties,
  bookingSplit: {
    display: 'grid',
    gridTemplateColumns: '1fr 340px',
    gap: '3rem',
    alignItems: 'start',
  } as React.CSSProperties,
  trustBar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    maxWidth: '1100px',
    margin: '0 auto',
  } as React.CSSProperties,
}

export default function PopCarPage() {
  const [lang, setLang] = useState<Lang>('en')
  const [scrolled, setScrolled] = useState(false)
  const [specials, setSpecials] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [confirmCode, setConfirmCode] = useState('')
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    year: '', make: '', model: '', mileage: '',
    service: '', date: '', time: '', notes: '',
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)

    supabase.from('venue_status').select('specials_text').eq('client_slug', 'popcar').single()
      .then(({ data }) => { if (data?.specials_text) setSpecials(data.specials_text) })

    const channel = supabase.channel('popcar-venue')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'venue_status', filter: 'client_slug=eq.popcar' },
        ({ new: next }) => setSpecials((next as { specials_text: string }).specials_text || ''))
      .subscribe()

    return () => {
      window.removeEventListener('scroll', onScroll)
      supabase.removeChannel(channel)
    }
  }, [])

  const f = (k: keyof typeof form, v: string) => setForm(prev => ({ ...prev, [k]: v }))
  const scrollToBook = () => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })

  const submitForm = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setConfirmCode(data.confirmationCode ?? `PC-${Date.now()}`)
      setSubmitted(true)
    } catch {
      alert(t('Error submitting. Please call (910) 834-3607.', 'Error al enviar. Llama al (910) 834-3607.', lang))
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setSubmitted(false)
    setStep(1)
    setForm({ name:'', phone:'', email:'', year:'', make:'', model:'', mileage:'', service:'', date:'', time:'', notes:'' })
  }

  return (
    <>
      {/* ══ NAV ══════════════════════════════════════════════════════════════ */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? 'rgba(10,10,10,0.97)' : '#0a0a0a',
        borderBottom: '2px solid #cc0000',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background 0.3s',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: '24px', color: '#cc0000', letterSpacing: '0.03em' }}>
              🔧 POP CAR
            </span>
          </a>

          {/* Desktop links */}
          <div className="desktop-nav">
            <a href="#services" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '14px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888', textDecoration: 'none' }}>
              {t('Services', 'Servicios', lang)}
            </a>
            <button className="btn-pit-stop" onClick={scrollToBook}>
              {t('BOOK PIT STOP', 'RESERVAR SERVICIO', lang)}
            </button>
            <a href="#contact" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '14px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888', textDecoration: 'none' }}>
              {t('Contact', 'Contacto', lang)}
            </a>
            {/* EN/ES toggle */}
            <div style={{ display: 'flex', border: '1px solid rgba(255,255,255,0.12)', overflow: 'hidden' }}>
              {(['en','es'] as Lang[]).map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  padding: '4px 12px',
                  background: lang === l ? '#f5c518' : 'transparent',
                  color: lang === l ? '#0a0a0a' : '#666',
                  border: 'none', cursor: 'pointer',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '11px', fontWeight: 700,
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                  transition: 'all 0.15s',
                }}>{l.toUpperCase()}</button>
              ))}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: 'transparent', border: 'none', color: '#cc0000', fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1 }}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {mobileMenuOpen && (
          <div style={{ background: '#111', borderTop: '1px solid #cc0000', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '16px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', textDecoration: 'none' }}>
              {t('Services', 'Servicios', lang)}
            </a>
            <button onClick={() => { setMobileMenuOpen(false); scrollToBook() }} style={{ background: '#cc0000', color: '#fff', border: '2px solid #f5c518', padding: '10px', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '15px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
              {t('BOOK PIT STOP', 'RESERVAR SERVICIO', lang)}
            </button>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '16px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', textDecoration: 'none' }}>
              {t('Contact', 'Contacto', lang)}
            </a>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {(['en','es'] as Lang[]).map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  flex: 1, padding: '8px',
                  background: lang === l ? '#f5c518' : '#1a1a1a',
                  color: lang === l ? '#0a0a0a' : '#666',
                  border: '1px solid #333', cursor: 'pointer',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '12px', fontWeight: 700,
                }}>{l.toUpperCase()}</button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ══ SPECIALS BANNER ══════════════════════════════════════════════════ */}
      {specials && (
        <div style={{ background: '#f5c518', color: '#0a0a0a', textAlign: 'center', padding: '10px 24px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', fontFamily: "'IBM Plex Mono', monospace" }}>
          🔧 {specials}
        </div>
      )}

      {/* ══ HERO — car background baked in inline ════════════════════════════ */}
      <section style={{
        minHeight: '100vh',
        background: `
          linear-gradient(
            to right,
            rgba(10,10,10,0.92) 0%,
            rgba(10,10,10,0.75) 45%,
            rgba(10,10,10,0.35) 100%
          ),
          url('/ref/car-hero.jpg') center right / cover no-repeat
        `,
        display: 'flex',
        alignItems: 'center',
        padding: '5rem 1.5rem',
        borderBottom: '2px solid #cc0000',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Scanline overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(204,0,0,0.025) 2px, rgba(204,0,0,0.025) 4px)',
          zIndex: 1,
        }} />

        <div style={{ ...GRID.heroSplit, position: 'relative', zIndex: 2 }}>
          {/* LEFT */}
          <div>
            <div style={{
              display: 'inline-block',
              border: '1px solid #f5c518',
              padding: '4px 14px',
              marginBottom: '2rem',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '12px',
              color: '#f5c518',
              letterSpacing: '0.12em',
            }}>
              [ WILMINGTON NC · EST. 2020 ]
            </div>

            <div>
              {[
                { text: 'POP CAR', color: '#f5c518', delay: '0s' },
                { text: 'AUTO',    color: '#ffffff', delay: '0.15s' },
                { text: 'CENTER',  color: '#cc0000', delay: '0.30s' },
              ].map(line => (
                <div key={line.text} style={{
                  fontFamily: "'Black Han Sans', sans-serif",
                  fontSize: 'clamp(56px, 8vw, 96px)',
                  color: line.color,
                  lineHeight: 0.95,
                  animation: 'slideInLeft 0.5s ease both',
                  animationDelay: line.delay,
                }}>
                  {line.text}
                </div>
              ))}
            </div>

            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '20px',
              color: '#ccc',
              maxWidth: '480px',
              margin: '1.75rem 0 2rem',
              lineHeight: 1.45,
              animation: 'fadeInUp 0.5s ease both',
              animationDelay: '0.45s',
            }}>
              {t(
                "Full-service auto repair. Wilmington's most trusted shop. We fix it right — the first time.",
                'Servicio automotriz completo. El taller de más confianza en Wilmington. Lo arreglamos bien — desde la primera vez.',
                lang
              )}
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem', animation: 'fadeInUp 0.5s ease both', animationDelay: '0.6s' }}>
              <button className="btn-hero-primary" onClick={scrollToBook}>
                ⚡ {t('BOOK PIT STOP', 'RESERVAR SERVICIO', lang)}
              </button>
              <a href="tel:9108343607" className="btn-hero-secondary">
                📞 (910) 834-3607
              </a>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', animation: 'fadeInUp 0.5s ease both', animationDelay: '0.75s' }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', color: '#555', letterSpacing: '0.15em', marginBottom: '6px', width: '100%' }}>
                ▓▓▓▓▓▓▓▓▓▓ 100% SATISFACTION
              </div>
              {[t('10+ YRS','10+ AÑOS',lang), t('ALL MAKES','TODAS LAS MARCAS',lang), t('FREE DIAG*','DIAG. GRATIS*',lang)].map(stat => (
                <div key={stat} style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '11px', color: '#555',
                  border: '1px solid #222',
                  padding: '8px 12px',
                  letterSpacing: '0.06em',
                }}>
                  {stat}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — live shop dashboard */}
          <div className="hero-cards" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative', zIndex: 2 }}>
            {LIVE_CARDS.map((card, i) => (
              <div key={i} style={{
                background: 'rgba(17,17,17,0.92)',
                border: '2px solid #222',
                borderLeft: `4px solid ${card.borderColor}`,
                padding: '16px',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '12px',
                animation: 'fadeInUp 0.4s ease both',
                animationDelay: `${0.2 + i * 0.15}s`,
                backdropFilter: 'blur(8px)',
              }}>
                <div style={{ color: '#555', marginBottom: '4px', letterSpacing: '0.08em', fontSize: '10px' }}>
                  {card.dot} {card.label}
                </div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '14px', letterSpacing: '0.03em' }}>{card.service}</div>
                <div style={{ color: '#555', marginTop: '3px', fontSize: '11px' }}>{card.detail}</div>
              </div>
            ))}
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '10px', color: '#2a2a2a',
              textAlign: 'center', marginTop: '0.25rem',
              letterSpacing: '0.1em',
            }}>
              ▓ LIVE SHOP STATUS ▓
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ═════════════════════════════════════════════════════════ */}
      <section id="services" style={{ background: '#0a0a0a', padding: '5rem 1.5rem', borderBottom: '2px solid #cc0000' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ width: '100%', height: '2px', background: '#cc0000', marginBottom: '1.25rem' }} />
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: '#f5c518', letterSpacing: '0.2em', marginBottom: '1rem' }}>
              // SERVICES //
            </p>
            <h2 style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: 'clamp(32px, 5vw, 56px)', color: '#fff', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.02em' }}>
              {t('SELECT YOUR SERVICE', 'SELECCIONA TU SERVICIO', lang)}
            </h2>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: '#444', letterSpacing: '0.05em' }}>
              {t('10 services available · All makes & models · Insurance accepted', '10 servicios disponibles · Todas las marcas · Seguros aceptados', lang)}
            </p>
          </div>

          <div style={GRID.serviceGrid}>
            {SERVICES.map(svc => (
              <div key={svc.name} style={{
                background: '#111',
                border: '1px solid #1a1a1a',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.2s',
              }}>
                <div style={{ marginBottom: '10px' }}>
                  <span style={{
                    background: '#cc0000', color: '#fff',
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '10px', fontWeight: 700,
                    padding: '3px 8px', letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>
                    {svc.category}
                  </span>
                </div>
                <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{svc.icon}</div>
                <h3 style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: '22px', color: '#fff', marginBottom: '6px', letterSpacing: '0.02em' }}>
                  {lang === 'es' ? svc.nameEs : svc.name}
                </h3>
                <div style={{ width: '100%', height: '1px', background: '#1a1a1a', marginBottom: '8px' }} />
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '14px', color: '#666', marginBottom: '12px', lineHeight: 1.4, flexGrow: 1 }}>
                  {lang === 'es' ? svc.descEs : svc.desc}
                </p>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: '#f5c518', marginBottom: '10px', fontWeight: 700 }}>
                  {svc.price === 'CALL'
                    ? t('PRICE: CALL FOR QUOTE', 'PRECIO: LLAMAR', lang)
                    : svc.price === 'FREE*'
                    ? 'PRICE: FREE*'
                    : `PRICE: ${svc.price}`}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ flex: 1, height: '4px', background: '#1a1a1a' }}>
                    <div style={{ width: `${svc.level * 20}%`, height: '100%', background: '#cc0000' }} />
                  </div>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', color: '#444', whiteSpace: 'nowrap' }}>
                    LVL {svc.level}
                  </span>
                </div>
                <button
                  onClick={scrollToBook}
                  style={{
                    background: 'transparent', color: '#666',
                    border: '1px solid #2a2a2a',
                    padding: '8px 14px',
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '11px', fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    cursor: 'pointer', width: '100%', marginTop: 'auto',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = '#cc0000'; (e.target as HTMLButtonElement).style.color = '#fff'; (e.target as HTMLButtonElement).style.borderColor = '#cc0000' }}
                  onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = 'transparent'; (e.target as HTMLButtonElement).style.color = '#666'; (e.target as HTMLButtonElement).style.borderColor = '#2a2a2a' }}
                >
                  {t('BOOK THIS SERVICE', 'RESERVAR ESTE SERVICIO', lang)}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BOOK YOUR PIT STOP ═══════════════════════════════════════════════ */}
      <section id="book" style={{ background: '#111111', padding: '5rem 1.5rem', borderTop: '2px solid #cc0000', borderBottom: '2px solid #cc0000' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: '#f5c518', letterSpacing: '0.2em', marginBottom: '1rem' }}>
              // {t('BOOK YOUR PIT STOP', 'RESERVA TU SERVICIO', lang)} //
            </p>
            <h2 style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: 'clamp(32px, 5vw, 56px)', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
              {t('SCHEDULE SERVICE', 'AGENDAR SERVICIO', lang)}
            </h2>
          </div>

          {/* Race checkpoint progress */}
          {!submitted && (
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginBottom: '3rem' }}>
              {[
                { n: 1, label: t('VEHICLE', 'VEHÍCULO', lang) },
                { n: 2, label: t('SERVICE', 'SERVICIO', lang) },
                { n: 3, label: t('CONFIRM', 'CONFIRMAR', lang) },
              ].map((s, i) => (
                <div key={s.n} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      background: step >= s.n ? '#cc0000' : '#222',
                      border: `2px solid ${step >= s.n ? '#cc0000' : '#333'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '12px', fontWeight: 700,
                      color: step >= s.n ? '#fff' : '#444',
                      transition: 'all 0.2s',
                    }}>
                      {step > s.n ? '✓' : s.n}
                    </div>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', letterSpacing: '0.1em', color: step >= s.n ? '#fff' : '#444' }}>
                      {s.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div style={{
                      width: '80px', height: '2px',
                      background: step > s.n ? '#cc0000' : 'transparent',
                      borderTop: step > s.n ? 'none' : '2px dashed #333',
                      marginBottom: '22px', marginLeft: '-1px', marginRight: '-1px',
                    }} />
                  )}
                </div>
              ))}
            </div>
          )}

          <div style={GRID.bookingSplit}>
            {/* FORM */}
            <div>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                  <h3 style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: '32px', color: '#fff', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.03em' }}>
                    {t('PIT STOP BOOKED!', '¡SERVICIO RESERVADO!', lang)}
                  </h3>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: '#555', marginBottom: '0.5rem' }}>
                    {t('Confirmation:', 'Confirmación:', lang)}{' '}
                    <span style={{ color: '#f5c518', fontWeight: 700 }}>{confirmCode}</span>
                  </p>
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '16px', color: '#888', marginBottom: '2rem' }}>
                    {t(`We'll call ${form.phone} within 2 hours.`, `Te llamaremos al ${form.phone} en 2 horas.`, lang)}
                  </p>
                  <button onClick={resetForm} style={{ background: '#cc0000', color: '#fff', border: '2px solid #f5c518', boxShadow: '3px 3px 0px #f5c518', padding: '10px 28px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
                    {t('BOOK ANOTHER', 'RESERVAR OTRO', lang)}
                  </button>
                </div>
              ) : (
                <>
                  {step === 1 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={labelSt}>{t('Full Name *', 'Nombre Completo *', lang)}</label>
                          <input className="pc-input" required value={form.name} onChange={e => f('name', e.target.value)} placeholder={t('Your name', 'Tu nombre', lang)} />
                        </div>
                        <div>
                          <label style={labelSt}>{t('Phone *', 'Teléfono *', lang)}</label>
                          <input className="pc-input" required type="tel" value={form.phone} onChange={e => f('phone', e.target.value)} placeholder="(910) 555-0000" />
                        </div>
                      </div>
                      <div>
                        <label style={labelSt}>{t('Email', 'Correo', lang)}</label>
                        <input className="pc-input" type="email" value={form.email} onChange={e => f('email', e.target.value)} placeholder="your@email.com" />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={labelSt}>{t('Year', 'Año', lang)}</label>
                          <input className="pc-input" type="number" min="1980" max="2025" value={form.year} onChange={e => f('year', e.target.value)} placeholder="2020" />
                        </div>
                        <div>
                          <label style={labelSt}>{t('Make', 'Marca', lang)}</label>
                          <input className="pc-input" value={form.make} onChange={e => f('make', e.target.value)} placeholder="Toyota" />
                        </div>
                        <div>
                          <label style={labelSt}>{t('Model', 'Modelo', lang)}</label>
                          <input className="pc-input" value={form.model} onChange={e => f('model', e.target.value)} placeholder="Camry" />
                        </div>
                      </div>
                      <div>
                        <label style={labelSt}>{t('Mileage (optional)', 'Kilometraje (opcional)', lang)}</label>
                        <input className="pc-input" type="number" value={form.mileage} onChange={e => f('mileage', e.target.value)} placeholder="85000" />
                      </div>
                      <button
                        onClick={() => {
                          if (!form.name.trim() || !form.phone.trim()) {
                            alert(t('Name and phone are required.', 'Nombre y teléfono son requeridos.', lang))
                            return
                          }
                          setStep(2)
                        }}
                        style={{ background: '#cc0000', color: '#fff', border: '2px solid #f5c518', boxShadow: '3px 3px 0px #f5c518', padding: '14px', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '18px', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', width: '100%' }}
                      >
                        {t('NEXT: SELECT SERVICE →', 'SIGUIENTE: SELECCIONAR SERVICIO →', lang)}
                      </button>
                    </div>
                  )}

                  {step === 2 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <label style={labelSt}>{t('Service Needed *', 'Servicio Necesario *', lang)}</label>
                        <select className="pc-input" required value={form.service} onChange={e => f('service', e.target.value)} style={{ cursor: 'pointer' }}>
                          <option value="">{t('Select a service…', 'Seleccionar servicio…', lang)}</option>
                          {SERVICES.map(s => (
                            <option key={s.name} value={s.name}>{lang === 'es' ? s.nameEs : s.name}</option>
                          ))}
                        </select>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={labelSt}>{t('Preferred Date', 'Fecha Preferida', lang)}</label>
                          <input className="pc-input" type="date" value={form.date} onChange={e => f('date', e.target.value)} min={new Date().toISOString().split('T')[0]} />
                        </div>
                        <div>
                          <label style={labelSt}>{t('Preferred Time', 'Hora Preferida', lang)}</label>
                          <select className="pc-input" value={form.time} onChange={e => f('time', e.target.value)} style={{ cursor: 'pointer' }}>
                            <option value="">{t('Select…', 'Seleccionar…', lang)}</option>
                            {TIMES.map(tm => <option key={tm} value={tm}>{tm}</option>)}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label style={labelSt}>{t('Notes (optional)', 'Notas (opcional)', lang)}</label>
                        <textarea className="pc-input" rows={3} value={form.notes} onChange={e => f('notes', e.target.value)} style={{ resize: 'vertical', minHeight: '80px' }} placeholder={t('Any additional details…', 'Detalles adicionales…', lang)} />
                      </div>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={() => setStep(1)} style={{ flex: 1, background: 'transparent', color: '#666', border: '1px solid #333', padding: '12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
                          ← {t('BACK', 'ATRÁS', lang)}
                        </button>
                        <button
                          onClick={() => {
                            if (!form.service) { alert(t('Please select a service.', 'Por favor selecciona un servicio.', lang)); return }
                            setStep(3)
                          }}
                          style={{ flex: 3, background: '#cc0000', color: '#fff', border: '2px solid #f5c518', boxShadow: '3px 3px 0px #f5c518', padding: '12px', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '18px', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
                        >
                          {t('CONFIRM PIT STOP →', 'CONFIRMAR SERVICIO →', lang)}
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div style={{ background: '#0a0a0a', border: '2px solid #cc0000', padding: '1.5rem' }}>
                        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: '#f5c518', letterSpacing: '0.15em', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
                          // {t('BOOKING SUMMARY', 'RESUMEN DE RESERVA', lang)} //
                        </p>
                        {[
                          { label: t('Name', 'Nombre', lang), val: form.name },
                          { label: t('Phone', 'Teléfono', lang), val: form.phone },
                          ...(form.email ? [{ label: t('Email', 'Correo', lang), val: form.email }] : []),
                          { label: t('Vehicle', 'Vehículo', lang), val: [form.year, form.make, form.model].filter(Boolean).join(' ') || '—' },
                          { label: t('Service', 'Servicio', lang), val: form.service },
                          ...(form.date ? [{ label: t('Date', 'Fecha', lang), val: form.date }] : []),
                          ...(form.time ? [{ label: t('Time', 'Hora', lang), val: form.time }] : []),
                        ].map(row => (
                          <div key={row.label} style={{ display: 'flex', gap: '1.25rem', marginBottom: '8px', borderBottom: '1px solid #1a1a1a', paddingBottom: '8px' }}>
                            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: '#444', minWidth: '72px' }}>{row.label}</span>
                            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: '#ddd' }}>{row.val}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={() => setStep(2)} style={{ flex: 1, background: 'transparent', color: '#666', border: '1px solid #333', padding: '12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
                          ← {t('BACK', 'ATRÁS', lang)}
                        </button>
                        <button
                          onClick={submitForm}
                          disabled={submitting}
                          style={{ flex: 3, background: submitting ? '#660000' : '#cc0000', color: '#fff', border: '2px solid #f5c518', boxShadow: '3px 3px 0px #f5c518', padding: '14px', fontFamily: "'Black Han Sans', sans-serif", fontSize: '20px', letterSpacing: '0.04em', textTransform: 'uppercase', cursor: submitting ? 'not-allowed' : 'pointer' }}
                        >
                          {submitting ? t('BOOKING...', 'RESERVANDO...', lang) : `✅ ${t('CONFIRM BOOKING', 'CONFIRMAR RESERVA', lang)}`}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* INFO PANEL */}
            <div className="booking-panel">
              <div style={{ background: '#0a0a0a', border: '2px solid #cc0000', boxShadow: '6px 6px 0px #f5c518', fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', position: 'sticky', top: '80px' }}>
                <div style={{ padding: '14px 20px', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', gap: '8px', background: '#0d0d0d' }}>
                  <span>🔧</span>
                  <span style={{ fontWeight: 700, color: '#fff', letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '12px' }}>SHOP INFO</span>
                </div>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #1a1a1a' }}>
                  <p style={{ color: '#888', lineHeight: 1.6 }}>1301 Dawson Street<br />Wilmington NC 28401</p>
                </div>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <a href="tel:9108343607" style={{ color: '#f5c518', textDecoration: 'none' }}>📞 (910) 834-3607</a>
                  <a href="mailto:popcarllc@gmail.com" style={{ color: '#888', textDecoration: 'none' }}>✉ popcarllc@gmail.com</a>
                </div>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #1a1a1a' }}>
                  <p style={{ color: '#f5c518', fontWeight: 700, marginBottom: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '11px' }}>HOURS</p>
                  {[
                    { day: 'Mon–Fri', hrs: '8AM – 6PM', closed: false },
                    { day: 'Saturday', hrs: '9AM – 4PM', closed: false },
                    { day: 'Sunday', hrs: 'Closed', closed: true },
                  ].map(row => (
                    <div key={row.day} style={{ display: 'flex', justifyContent: 'space-between', color: row.closed ? '#cc0000' : '#777', marginBottom: '4px' }}>
                      <span>{row.day}</span><span>{row.hrs}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {[
                    t('All Makes & Models', 'Todas las Marcas', lang),
                    t('Insurance Claims', 'Reclamaciones de Seguro', lang),
                    t('Free Diagnostics*', 'Diagnóstico Gratis*', lang),
                    t('Bilingual (EN/ES)', 'Bilingüe (EN/ES)', lang),
                  ].map(item => (
                    <p key={item} style={{ color: '#666', fontSize: '12px' }}>✓ {item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TRUST BAR ════════════════════════════════════════════════════════ */}
      <section style={{ background: '#0a0a0a', borderBottom: '2px solid #cc0000' }}>
        <div style={GRID.trustBar}>
          {[
            { num: '10K+', label: t('INSTAGRAM',    'INSTAGRAM',    lang) },
            { num: 'ALL',  label: t('INSURANCE',    'SEGUROS',      lang) },
            { num: 'FREE', label: t('DIAGNOSTICS*', 'DIAGNÓSTICO*', lang) },
            { num: '10+',  label: t('YEARS EXP',    'AÑOS EXP',     lang) },
          ].map((stat, i) => (
            <div key={i} style={{ padding: '3rem 1.5rem', textAlign: 'center', borderRight: i < 3 ? '1px solid #1a1a1a' : 'none' }}>
              <div style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: '48px', color: '#f5c518', lineHeight: 1 }}>{stat.num}</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: '#444', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '8px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
      <footer id="contact" style={{ background: '#0a0a0a', borderTop: '2px solid #cc0000', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
            <div>
              <div style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: '20px', color: '#cc0000', marginBottom: '0.75rem', letterSpacing: '0.03em' }}>
                🔧 POP CAR AUTO CENTER
              </div>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: '#444', lineHeight: 1.7 }}>
                1301 Dawson Street<br />Wilmington NC 28401<br />(910) 834-3607
              </p>
            </div>
            <div>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: '#f5c518', letterSpacing: '0.15em', marginBottom: '1rem', textTransform: 'uppercase' }}>QUICK LINKS</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { href: '#services', label: t('Services', 'Servicios', lang) },
                  { href: '#book', label: t('Book Appointment', 'Reservar Cita', lang) },
                  { href: '#contact', label: t('Contact', 'Contacto', lang) },
                ].map(link => (
                  <a key={link.href} href={link.href} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '14px', fontWeight: 700, color: '#444', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: '#f5c518', letterSpacing: '0.15em', marginBottom: '1rem', textTransform: 'uppercase' }}>FOLLOW US</p>
              <a href="https://www.instagram.com/popcarauto" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: '#cc0000', textDecoration: 'none', letterSpacing: '0.04em' }}>
                @popcarauto · 10.4K Followers
              </a>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: '#2a2a2a', letterSpacing: '0.08em' }}>
              © 2025 Pop Car Auto Center · Wilmington NC
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
