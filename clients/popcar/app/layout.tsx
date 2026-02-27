import type { Metadata } from 'next'
import './globals.css'
import ChatBot from './components/ChatBot'

export const metadata: Metadata = {
  title: 'Pop Car Auto Center | Wilmington NC Auto Repair',
  description: 'Full service auto repair in Wilmington NC. Oil changes, tires, brakes, engine repair, transmission, paint & body. Bilingual service. Call (910) 834-3607.',
  keywords: [
    'auto repair Wilmington NC',
    'oil change Wilmington',
    'brake service Wilmington',
    'engine repair Wilmington',
    'transmission repair Wilmington NC',
    'tire service Wilmington',
    'auto body paint Wilmington',
    'insurance claims auto repair',
    'Spanish speaking mechanic Wilmington',
    'Pop Car Auto Center',
    '1301 Dawson Street Wilmington',
    'check engine light Wilmington',
    'suspension repair Wilmington',
  ],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔧</text></svg>",
  },
  openGraph: {
    title: 'Pop Car Auto Center | Wilmington NC',
    description: 'Full service auto repair · 1301 Dawson St · Wilmington NC · (910) 834-3607 · Bilingual service',
    url: 'https://popcarauto.com',
    siteName: 'Pop Car Auto Center',
    locale: 'en_US',
    type: 'website',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://popcarauto.com' },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  name: 'Pop Car Auto Center',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1301 Dawson Street',
    addressLocality: 'Wilmington',
    addressRegion: 'NC',
    postalCode: '28401',
  },
  telephone: '(910) 834-3607',
  email: 'popcarllc@gmail.com',
  url: 'https://popcarauto.com',
  openingHours: ['Mo-Fr 08:00-18:00', 'Sa 08:00-16:00'],
  priceRange: '$$',
  sameAs: ['https://www.instagram.com/popcarauto'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>
        {children}
        <ChatBot />
      </body>
    </html>
  )
}
