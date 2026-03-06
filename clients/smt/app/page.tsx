'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import BookingForm from '@/components/BookingForm'
import VenueStatus from './components/VenueStatus'
import ChatBot from '../components/ChatBot'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const C = {
  bg:      '#0f0e0c',
  surface: '#161410',
  card:    '#1c1a16',
  border:  '#2a2620',
  gold:    '#c9a84c',
  goldDim: '#8a6e2f',
  cream:   '#f0ead8',
  muted:   '#6b6456',
}

function Nav({ lang, setLang }: { lang: 'en' | 'es'; setLang: (l: 'en' | 'es') => void }) {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(15,14,12,0.96)', backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${C.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 48px', height: '64px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: 32, height: 32, background: C.gold, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: 16, color: C.bg, lineHeight: 1 }}>S</span>
        </div>
        <div>
          <div style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: 16, color: C.cream, letterSpacing: '.02em', lineHeight: 1 }}>SMT Services</div>
          <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 9, color: C.muted, letterSpacing: '.18em', marginTop: 2, textTransform: 'uppercase' }}>Superhero Cleaning · Wilmington NC</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
        {['Services', 'About', 'Book'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: 12, fontWeight: 500,
            color: C.muted, textDecoration: 'none', letterSpacing: '.1em', textTransform: 'uppercase',
            transition: 'color .2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = C.cream}
            onMouseLeave={e => e.currentTarget.style.color = C.muted}
          >{item}</a>
        ))}
        <div style={{ display: 'flex', gap: 4 }}>
          {(['en', 'es'] as const).map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              fontFamily: '"DM Sans", sans-serif', fontSize: 10, fontWeight: 600,
              padding: '5px 10px', cursor: 'pointer',
              border: `1px solid ${lang === l ? C.gold : C.border}`,
              background: 'transparent', color: lang === l ? C.gold : C.muted,
              letterSpacing: '.12em', textTransform: 'uppercase',
            }}>{l}</button>
          ))}
        </div>
        <a href="#book" style={{
          fontFamily: '"DM Sans", sans-serif', fontSize: 12, fontWeight: 600,
          background: C.gold, color: C.bg, padding: '10px 24px',
          textDecoration: 'none', letterSpacing: '.08em', textTransform: 'uppercase',
        }}>{lang === 'es' ? 'Reservar' : 'Book Now'}</a>
      </div>
    </nav>
  )
}

function Marquee() {
  const txt = '  Residential  ·  Commercial  ·  AirBnB Turnover  ·  Post Construction  ·  Stefanie Tate  ·  910-620-0937  ·  Wilmington NC  ·  '
  return (
    <div style={{ background: C.gold, overflow: 'hidden', whiteSpace: 'nowrap', padding: '9px 0' }}>
      <div style={{ display: 'inline-block', animation: 'marquee 22s linear infinite', color: C.bg, fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase' }}>
        {txt}{txt}
      </div>
    </div>
  )
}

function Hero({ lang }: { lang: 'en' | 'es' }) {
  return (
    <section style={{
      minHeight: '88vh', background: C.bg, position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'flex-end', padding: '0 48px 72px',
    }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1527515637462-cff94aca0b83?w=1400&q=80)',
        backgroundSize: 'cover', backgroundPosition: 'center right', opacity: 0.07,
      }} />
      <div aria-hidden style={{
        position: 'absolute', top: '-20%', right: '-10%', width: '60vw', height: '60vw', borderRadius: '50%',
        background: `radial-gradient(circle, ${C.gold}08 0%, transparent 70%)`, pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 820 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 32,
          padding: '6px 14px', border: `1px solid ${C.border}`,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.gold }} />
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 10, color: C.muted, letterSpacing: '.2em', textTransform: 'uppercase' }}>
            Available Now · Wilmington NC
          </span>
        </div>
        <VenueStatus lang={lang} />
        <h1 style={{ margin: 0, lineHeight: .92, marginBottom: 28 }}>
          <span style={{ display: 'block', fontFamily: '"DM Serif Display", Georgia, serif', fontSize: 'clamp(72px, 11vw, 148px)', color: C.cream, letterSpacing: '-.02em' }}>Super</span>
          <span style={{ display: 'block', fontFamily: '"DM Serif Display", Georgia, serif', fontSize: 'clamp(72px, 11vw, 148px)', color: C.gold, letterSpacing: '-.02em' }}>Clean.</span>
        </h1>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 14, color: C.muted, lineHeight: 1.8, maxWidth: 460, marginBottom: 8 }}>
          Residential · Commercial · AirBnB · Post Construction. Stefanie Tate brings the same standard to every job.
        </p>
        <p style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: 16, color: C.gold, fontStyle: 'italic', marginBottom: 40 }}>
          &ldquo;Teamwork makes the dream work&rdquo;
        </p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a href="tel:9106200937" style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: 13, fontWeight: 600,
            background: C.gold, color: C.bg, padding: '16px 36px',
            textDecoration: 'none', letterSpacing: '.08em', textTransform: 'uppercase',
          }}>Call Stefanie</a>
          <a href="#book" style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: 12, fontWeight: 500,
            color: C.muted, textDecoration: 'none', letterSpacing: '.1em', textTransform: 'uppercase',
            borderBottom: `1px solid ${C.border}`, paddingBottom: 2,
          }}>Book Online →</a>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  const items = [
    { n: '4', l: 'Service Types' },
    { n: '24h', l: 'Response Time' },
    { n: '100%', l: 'Satisfaction' },
    { n: 'WNC', l: 'Wilmington NC' },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      {items.map((s, i) => (
        <div key={s.n} style={{ padding: '36px 24px', textAlign: 'center', borderRight: i < 3 ? `1px solid ${C.border}` : 'none' }}>
          <div style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: 40, color: C.gold, lineHeight: 1, marginBottom: 6 }}>{s.n}</div>
          <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 10, color: C.muted, letterSpacing: '.16em', textTransform: 'uppercase' }}>{s.l}</div>
        </div>
      ))}
    </div>
  )
}

function Services() {
  const cards = [
    { title: 'Residential', desc: 'Full home cleaning — regular, move-in, or move-out. Every surface.' },
    { title: 'Commercial', desc: 'Office and retail spaces. Cleaned on your schedule, no disruption.' },
    { title: 'AirBnB Turnover', desc: 'Fast turnovers. Fresh linens, deep clean, restocked. 5-star ready.' },
    { title: 'Post Construction', desc: 'After the builders leave, we make it shine.' },
  ]
  return (
    <section id="services" style={{ background: C.bg, padding: '96px 48px', borderBottom: `1px solid ${C.border}` }}>
      <div style={{ marginBottom: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: `1px solid ${C.border}`, paddingBottom: 24 }}>
        <div>
          <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 10, color: C.muted, letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 10 }}>What We Clean</div>
          <h2 style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: 'clamp(36px,5vw,52px)', color: C.cream, margin: 0, lineHeight: 1 }}>Services</h2>
        </div>
        <a href="tel:9106200937" style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 11, color: C.gold, textDecoration: 'none', letterSpacing: '.12em', textTransform: 'uppercase', borderBottom: `1px solid ${C.goldDim}`, paddingBottom: 2 }}>Get a Quote →</a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2, background: C.border }}>
        {cards.map(c => (
          <div key={c.title} style={{ background: C.card, padding: '48px 40px', borderBottom: '3px solid transparent', transition: 'border-color .2s, background .2s' }}
            onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderBottomColor = C.gold; d.style.background = '#201e18' }}
            onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderBottomColor = 'transparent'; d.style.background = C.card }}
          >
            <div style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: 24, color: C.cream, marginBottom: 12 }}>{c.title}</div>
            <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 13, color: C.muted, lineHeight: 1.8 }}>{c.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" style={{ background: C.surface, padding: '96px 48px', borderBottom: `1px solid ${C.border}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', maxWidth: 1100, margin: '0 auto' }}>
        <div>
          <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 10, color: C.muted, letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 10 }}>About</div>
          <h2 style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: 'clamp(32px,4vw,48px)', color: C.cream, margin: '0 0 20px', lineHeight: 1.1 }}>Stefanie Tate</h2>
          <p style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: 18, color: C.gold, fontStyle: 'italic', marginBottom: 20 }}>&ldquo;Teamwork makes the dream work&rdquo;</p>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 14, color: C.muted, lineHeight: 1.9, marginBottom: 32 }}>
            Stefanie built SMT on one principle — show up, work hard, leave it spotless. Every clean is personal. Every space is treated like it&apos;s her own.
          </p>
          {['Fast scheduling — call or text', 'No shortcuts, ever', 'Trusted across Wilmington', 'Every clean is a team effort'].map(b => (
            <div key={b} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
              <div style={{ width: 20, height: 1, background: C.gold, flexShrink: 0 }} />
              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 13, color: C.cream }}>{b}</span>
            </div>
          ))}
        </div>
        <div style={{ border: `1px solid ${C.border}`, background: C.card, padding: 40 }}>
          <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 10, color: C.muted, letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 24 }}>Contact</div>
          {[
            { label: 'Phone', value: '910-620-0937', href: 'tel:9106200937' },
            { label: 'Owner', value: 'Stefanie Tate', href: undefined },
            { label: 'Location', value: 'Wilmington, NC', href: undefined },
            { label: 'Services', value: 'Residential · Commercial · AirBnB · Post Construction', href: undefined },
          ].map((item, i, arr) => (
            <div key={item.label} style={{ marginBottom: i < arr.length - 1 ? 24 : 0, paddingBottom: i < arr.length - 1 ? 24 : 0, borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 9, color: C.muted, letterSpacing: '.16em', textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</div>
              {item.href
                ? <a href={item.href} style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: 20, color: C.gold, textDecoration: 'none' }}>{item.value}</a>
                : <div style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: 18, color: C.cream }}>{item.value}</div>
              }
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const photos = [
    { src: 'https://images.unsplash.com/photo-1527515637462-cff94aca0b83?w=800&q=85', label: 'Kitchen' },
    { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85', label: 'Bathroom' },
    { src: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=85', label: 'Move-Out' },
    { src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85', label: 'AirBnB' },
    { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85', label: 'Post Construction' },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 2, background: C.border, height: 220 }}>
      {photos.map(p => (
        <div key={p.label} style={{ position: 'relative', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.src} alt={p.label} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.55) saturate(.6)', transition: 'filter .3s, transform .3s' }}
            onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(.75) saturate(.9)'; e.currentTarget.style.transform = 'scale(1.05)' }}
            onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(.55) saturate(.6)'; e.currentTarget.style.transform = 'scale(1)' }}
          />
          <div style={{ position: 'absolute', bottom: 10, left: 12, fontFamily: '"DM Sans", sans-serif', fontSize: 9, color: C.gold, letterSpacing: '.14em', textTransform: 'uppercase' }}>{p.label}</div>
        </div>
      ))}
    </div>
  )
}

function BookingSection({ lang }: { lang: 'en' | 'es' }) {
  return (
    <section id="book" style={{ background: C.bg, padding: '96px 48px', borderTop: `1px solid ${C.border}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'start', maxWidth: 1100, margin: '0 auto' }}>
        <div>
          <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 10, color: C.muted, letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 10 }}>{lang === 'es' ? 'Reservar Limpieza' : 'Book a Clean'}</div>
          <h2 style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: 'clamp(36px,5vw,52px)', color: C.cream, margin: '0 0 16px', lineHeight: 1 }}>{lang === 'es' ? 'Empecemos' : "Let's Get Started"}</h2>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 14, color: C.muted, lineHeight: 1.8 }}>
            {lang === 'es' ? 'Llama, escribe o llena el formulario. Stefanie responde en 24 horas.' : 'Call, text, or fill out the form. Stefanie responds within 24 hours.'}
          </p>
          <div style={{ marginTop: 40, padding: '28px 32px', border: `1px solid ${C.border}`, background: C.surface }}>
            <div style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: 28, color: C.gold, marginBottom: 4 }}>910-620-0937</div>
            <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 12, color: C.muted }}>Stefanie Tate · Owner · Wilmington NC</div>
          </div>
        </div>
        <BookingForm lang={lang} />
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 28, height: 28, background: C.gold, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: 14, color: C.bg }}>S</span>
        </div>
        <span style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: 18, color: C.cream }}>SMT Services</span>
      </div>
      <span style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: 14, color: C.gold, fontStyle: 'italic' }}>&ldquo;Teamwork makes the dream work&rdquo;</span>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 11, color: C.muted }}>910-620-0937 · © 2025 SMT Services</span>
        <a href="https://bluetubetv.com" style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 10, color: C.muted, textDecoration: 'none', letterSpacing: '.1em' }}>Powered by BlueTubeTV</a>
      </div>
    </footer>
  )
}

export default function Home() {
  const [lang, setLang] = useState<'en' | 'es'>('en')
  const [status, setStatus] = useState<{ kitchen_open: boolean; specials_text: string } | null>(null)

  useEffect(() => {
    supabase.from('venue_status').select('*').eq('client_slug', 'smt').single()
      .then(({ data }) => { if (data) setStatus(data) })

    const ch = supabase.channel('smt-specials')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'venue_status', filter: 'client_slug=eq.smt' },
        ({ new: n }) => setStatus(n as { kitchen_open: boolean; specials_text: string }))
      .subscribe()

    return () => { supabase.removeChannel(ch) }
  }, [])

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0f0e0c; }
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
      `}</style>
      <Nav lang={lang} setLang={setLang} />
      {status?.specials_text && (
        <div style={{
          background: '#c9a84c', color: '#0f0e0c', padding: '12px',
          textAlign: 'center', fontFamily: '"DM Sans", sans-serif',
          fontSize: 13, fontWeight: 600, letterSpacing: '.06em',
        }}>
          ✦ {status.specials_text} · {lang === 'es' ? 'Llama al' : 'Call'} 910-620-0937
        </div>
      )}
      <Marquee />
      <Hero lang={lang} />
      <Stats />
      <Services />
      <About />
      <Gallery />
      <BookingSection lang={lang} />
      <Footer />
      <ChatBot lang={lang} />
    </>
  )
}