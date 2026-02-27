'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { createClient } from '@supabase/supabase-js'
import AppointmentModal from './components/AppointmentModal'
import LiveStatusBadge from './components/LiveStatusBadge'
import SpecialsBanner from './components/SpecialsBanner'

// ── Language Context ──────────────────────────────────────────────────────────
type Lang = 'en' | 'es'
const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'en', setLang: () => {},
})
const t = (en: string, es: string, lang: Lang) => lang === 'es' ? es : en

// ── Services ──────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: '🔧', en: 'Auto Service',        es: 'Servicio General',          desc_en: 'Full-service maintenance and repairs for all makes and models.', desc_es: 'Mantenimiento y reparaciones completas para todas las marcas.' },
  { icon: '🔩', en: 'Engine Repair',        es: 'Reparación de Motor',       desc_en: 'Diagnostics and engine repair from minor to major overhaul.', desc_es: 'Diagnósticos y reparación de motor, desde menores hasta mayores.' },
  { icon: '🛑', en: 'Brake Service',        es: 'Servicio de Frenos',        desc_en: 'Pad replacement, rotor resurfacing, brake fluid flush.', desc_es: 'Cambio de pastillas, rectificado de rotores, purga de frenos.' },
  { icon: '📋', en: 'Insurance Claims',     es: 'Reclamaciones de Seguro',   desc_en: 'We work directly with your insurance company for claims.', desc_es: 'Trabajamos directamente con tu seguro para reclamaciones.' },
  { icon: '🎨', en: 'Paint & Restoration',  es: 'Pintura y Restauración',    desc_en: 'Color-matched paint, dent repair, and full body restoration.', desc_es: 'Pintura igualada, reparación de abolladuras y restauración.' },
  { icon: '🛢️', en: 'Oil Change',           es: 'Cambio de Aceite',          desc_en: 'Conventional and synthetic oil changes with multi-point inspection.', desc_es: 'Cambios convencionales y sintéticos con inspección multipunto.' },
  { icon: '⚠️', en: 'Check Engine',         es: 'Diagnóstico',               desc_en: 'Computer diagnostics to identify and clear engine codes.', desc_es: 'Diagnóstico computarizado para identificar y borrar códigos.' },
  { icon: '⚙️', en: 'Transmission',         es: 'Transmisión',               desc_en: 'Automatic and manual transmission repair and fluid service.', desc_es: 'Reparación de transmisión automática y manual, servicio de fluidos.' },
  { icon: '🔄', en: 'Suspension',           es: 'Suspensión',                desc_en: 'Shocks, struts, alignment, and full suspension diagnostics.', desc_es: 'Amortiguadores, alineación y diagnóstico completo de suspensión.' },
  { icon: '🔘', en: 'Tires',               es: 'Llantas',                   desc_en: 'Tire sales, mounting, balancing, rotation, and flat repair.', desc_es: 'Venta, montaje, balanceo, rotación y reparación de llantas.' },
]

// ── Colors ────────────────────────────────────────────────────────────────────
const C = {
  bg:     '#0a0a0a',
  card:   '#111111',
  red:    '#cc0000',
  redDim: '#1a0000',
  yellow: '#f5c518',
  white:  '#ffffff',
  muted:  '#999999',
  border: 'rgba(204,0,0,0.25)',
}

export default function PopCarPage() {
  const [lang, setLang] = useState<Lang>('en')
  const [modalOpen, setModalOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {/* ── NAV ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100, width: '100%',
        background: scrolled ? 'rgba(10,10,10,0.97)' : '#0a0a0a',
        borderBottom: `1px solid ${C.red}`,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background 0.3s',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
          {/* Brand */}
          <a href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontSize: '1.15rem', fontWeight: 900, color: C.red, letterSpacing: '0.05em' }}>POP CAR</span>
            <span style={{ fontSize: '0.6rem', fontWeight: 700, color: C.yellow, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Auto Center</span>
          </a>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a href="#services" style={{ color: C.muted, textDecoration: 'none', fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {t('Services', 'Servicios', lang)}
            </a>
            <button
              onClick={() => setModalOpen(true)}
              style={{ background: C.red, color: C.white, border: 'none', borderRadius: '6px', padding: '0.45rem 1.1rem', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}
            >
              {t('Book', 'Cita', lang)}
            </button>
            {/* EN/ES toggle */}
            <div style={{ display: 'flex', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)', fontSize: '0.7rem', fontWeight: 700 }}>
              <button onClick={() => setLang('en')} style={{ padding: '4px 10px', background: lang === 'en' ? C.yellow : 'transparent', color: lang === 'en' ? '#0a0a0a' : C.muted, border: 'none', cursor: 'pointer', letterSpacing: '0.05em' }}>EN</button>
              <button onClick={() => setLang('es')} style={{ padding: '4px 10px', background: lang === 'es' ? C.yellow : 'transparent', color: lang === 'es' ? '#0a0a0a' : C.muted, border: 'none', cursor: 'pointer', letterSpacing: '0.05em' }}>ES</button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── LIVE STATUS BAR ── */}
      <div style={{ background: C.redDim, borderBottom: `1px solid ${C.border}`, padding: '0.5rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
        <LiveStatusBadge clientSlug="popcar" />
        <span style={{ fontSize: '0.72rem', color: C.muted, letterSpacing: '0.06em' }}>
          {t('Mon–Fri 8am–6pm · Sat 8am–4pm · Sun Closed', 'Lun–Vie 8am–6pm · Sáb 8am–4pm · Dom Cerrado', lang)}
        </span>
      </div>

      {/* ── HERO ── */}
      <section style={{ background: C.bg, padding: '5rem 1.5rem 4rem', textAlign: 'center', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.red, marginBottom: '1rem' }}>
            {t('Wilmington, NC · Since 2010', 'Wilmington, NC · Desde 2010', lang)}
          </p>
          <h1 style={{ fontSize: 'clamp(2.6rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em', color: C.white, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <span style={{ color: C.red }}>POP CAR</span>
          </h1>
          <h2 style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', fontWeight: 700, color: C.yellow, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            {t('Auto Center', 'Centro Automotriz', lang)}
          </h2>
          <p style={{ fontSize: '1rem', color: C.muted, marginBottom: '0.5rem' }}>
            {t('Full Service Auto Repair · 1301 Dawson St · Wilmington NC', 'Centro de Servicio Automotriz Completo · 1301 Dawson St', lang)}
          </p>

          {/* Big phone */}
          <a href="tel:9108343607" style={{ display: 'block', fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 900, color: C.yellow, textDecoration: 'none', margin: '1.5rem 0', letterSpacing: '0.04em' }}>
            (910) 834-3607
          </a>
          <p style={{ fontSize: '0.75rem', color: C.muted, marginBottom: '2rem' }}>
            {t('Tap to call · We confirm within 2 hours', 'Toca para llamar · Confirmamos en 2 horas', lang)}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setModalOpen(true)}
              style={{ background: C.red, color: C.white, border: 'none', borderRadius: '8px', padding: '0.9rem 2.2rem', fontSize: '0.9rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 4px 20px rgba(204,0,0,0.4)' }}
            >
              {t('Book an Appointment', 'Reservar Cita', lang)}
            </button>
            <a
              href="tel:9108343607"
              style={{ background: C.yellow, color: '#0a0a0a', borderRadius: '8px', padding: '0.9rem 2.2rem', fontSize: '0.9rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block' }}
            >
              {t('Call Now', 'Llamar Ahora', lang)}
            </a>
          </div>

          {/* Specials */}
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <SpecialsBanner clientSlug="popcar" accentColor={C.red} />
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section id="services" style={{ padding: '5rem 1.5rem', background: '#0d0d0d' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.red, textAlign: 'center', marginBottom: '0.5rem' }}>
            {t('What We Do', 'Lo Que Hacemos', lang)}
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, textAlign: 'center', textTransform: 'uppercase', color: C.white, marginBottom: '3rem', letterSpacing: '-0.01em' }}>
            {t('Our Services', 'Nuestros Servicios', lang)}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
            {SERVICES.map(svc => (
              <div
                key={svc.en}
                style={{ background: C.redDim, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '1.5rem', cursor: 'default', transition: 'border-color 0.2s, transform 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = C.yellow; (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.02)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = C.border; (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)' }}
              >
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{svc.icon}</div>
                <h3 style={{ fontWeight: 800, fontSize: '0.95rem', color: C.white, marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {lang === 'es' ? svc.es : svc.en}
                </h3>
                <p style={{ fontSize: '0.78rem', color: C.muted, lineHeight: 1.5 }}>
                  {lang === 'es' ? svc.desc_es : svc.desc_en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPOINTMENT CTA ── */}
      <section style={{ padding: '4rem 1.5rem', background: C.redDim, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, textAlign: 'center' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 900, textTransform: 'uppercase', color: C.white, letterSpacing: '-0.01em', marginBottom: '0.75rem' }}>
            {t('Book Your Appointment', 'Reserva tu Cita', lang)}
          </h2>
          <p style={{ color: C.muted, fontSize: '0.9rem', marginBottom: '2rem' }}>
            {t("We'll confirm within 2 hours · Mon–Fri 8am–6pm · Sat 8am–4pm", 'Confirmamos en 2 horas · Lun–Vie 8am–6pm · Sáb 8am–4pm', lang)}
          </p>
          <button
            onClick={() => setModalOpen(true)}
            style={{ background: C.red, color: C.white, border: 'none', borderRadius: '8px', padding: '1rem 2.5rem', fontSize: '1rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 4px 24px rgba(204,0,0,0.4)' }}
          >
            {t('Book Now', 'Reservar Ahora', lang)}
          </button>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={{ padding: '5rem 1.5rem', background: C.bg }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.red, marginBottom: '0.5rem' }}>
            {t('Why Pop Car', 'Por Qué Pop Car', lang)}
          </p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 900, textTransform: 'uppercase', color: C.white, marginBottom: '3rem', letterSpacing: '-0.01em' }}>
            {t('Trusted by Wilmington', 'La Confianza de Wilmington', lang)}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '🏆', title_en: '10.4K Followers', title_es: '10.4K Seguidores', body_en: 'Wilmington\'s most followed auto shop on Instagram.', body_es: 'El taller automotriz más seguido de Wilmington en Instagram.' },
              { icon: '🔧', title_en: 'Full Service Shop', title_es: 'Taller Completo', body_en: 'From oil changes to engine rebuilds — one shop, all repairs.', body_es: 'Desde cambios de aceite hasta reconstrucción de motores.' },
              { icon: '🌎', title_en: 'Bilingual Service', title_es: 'Servicio en Español', body_en: 'Spanish and English — we speak your language.', body_es: 'Español e inglés — hablamos tu idioma.' },
            ].map(card => (
              <div key={card.icon} style={{ background: C.redDim, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '2rem 1.5rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{card.icon}</div>
                <h3 style={{ fontWeight: 800, fontSize: '1rem', color: C.yellow, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {lang === 'es' ? card.title_es : card.title_en}
                </h3>
                <p style={{ fontSize: '0.82rem', color: C.muted, lineHeight: 1.5 }}>
                  {lang === 'es' ? card.body_es : card.body_en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section style={{ padding: '4rem 1.5rem', background: '#0d0d0d', borderTop: `1px solid ${C.border}`, textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>⭐⭐⭐⭐⭐</div>
          <p style={{ fontSize: '1.3rem', fontWeight: 800, color: C.white, marginBottom: '0.25rem' }}>4.8 {t('stars on Google', 'estrellas en Google', lang)}</p>
          <p style={{ color: C.muted, fontSize: '0.85rem', marginBottom: '1.75rem' }}>
            {t('Hundreds of satisfied customers in Wilmington and beyond.', 'Cientos de clientes satisfechos en Wilmington y más allá.', lang)}
          </p>
          <a
            href="https://www.google.com/maps/search/Pop+Car+Auto+Center+Wilmington+NC"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', background: C.yellow, color: '#0a0a0a', borderRadius: '8px', padding: '0.75rem 2rem', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none' }}
          >
            {t('Leave a Review', 'Dejar una Reseña', lang)}
          </a>
        </div>
      </section>

      {/* ── CONTACT + MAP ── */}
      <section id="contact" style={{ padding: '5rem 1.5rem', background: C.bg, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.red, marginBottom: '0.5rem' }}>
              {t('Find Us', 'Encuéntranos', lang)}
            </p>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: C.white, textTransform: 'uppercase', marginBottom: '2rem' }}>
              {t('Contact', 'Contacto', lang)}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { icon: '📍', label_en: 'Address', label_es: 'Dirección', val: '1301 Dawson Street\nWilmington, NC 28401' },
                { icon: '📞', label_en: 'Phone', label_es: 'Teléfono', val: '(910) 834-3607', href: 'tel:9108343607' },
                { icon: '✉️', label_en: 'Email', label_es: 'Correo', val: 'popcarllc@gmail.com', href: 'mailto:popcarllc@gmail.com' },
                { icon: '🕐', label_en: 'Hours', label_es: 'Horario', val_en: 'Mon–Fri 8am–6pm\nSat 8am–4pm · Sun Closed', val_es: 'Lun–Vie 8am–6pm\nSáb 8am–4pm · Dom Cerrado' },
              ].map(item => (
                <div key={item.icon} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.2rem', marginTop: '2px' }}>{item.icon}</span>
                  <div>
                    <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.red, marginBottom: '2px' }}>
                      {lang === 'es' ? item.label_es : item.label_en}
                    </p>
                    {item.href ? (
                      <a href={item.href} style={{ fontSize: '0.9rem', color: C.white, textDecoration: 'none' }}>
                        {item.val}
                      </a>
                    ) : (
                      <p style={{ fontSize: '0.9rem', color: C.white, whiteSpace: 'pre-line' }}>
                        {lang === 'es' && item.val_es ? item.val_es : (item.val_en ?? item.val)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2rem' }}>
              <button
                onClick={() => setModalOpen(true)}
                style={{ background: C.red, color: C.white, border: 'none', borderRadius: '8px', padding: '0.85rem 2rem', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}
              >
                {t('Book Appointment', 'Reservar Cita', lang)}
              </button>
            </div>
          </div>

          {/* Google Maps embed */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', border: `1px solid ${C.border}` }}>
            <iframe
              title="Pop Car Auto Center location"
              width="100%"
              height="340"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=1301+Dawson+Street+Wilmington+NC+28401&output=embed"
            />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#050505', borderTop: `1px solid ${C.border}`, padding: '2rem 1.5rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.78rem', fontWeight: 700, color: C.white, marginBottom: '0.25rem', letterSpacing: '0.06em' }}>
          Pop Car Auto Center · 1301 Dawson St · (910) 834-3607
        </p>
        <p style={{ fontSize: '0.7rem', color: C.muted, marginBottom: '0.75rem' }}>
          {t('Powered by BlueTubeTV · Blue Ring Holdings LLC', 'Desarrollado por BlueTubeTV · Blue Ring Holdings LLC', lang)}
        </p>
        <a
          href="https://www.instagram.com/popcarauto"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '0.75rem', color: C.red, textDecoration: 'none', letterSpacing: '0.05em' }}
        >
          @popcarauto · 10.4K Followers
        </a>
      </footer>

      {/* ── APPOINTMENT MODAL ── */}
      <AppointmentModal open={modalOpen} onClose={() => setModalOpen(false)} lang={lang} />
    </LangContext.Provider>
  )
}
