import PoweredByBTV from './components/PoweredByBTV'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SMT Services — Superhero Cleaning · Wilmington NC',
  description: 'Residential, Commercial, AirBnB & Post Construction cleaning in Wilmington NC. Call Stefanie: 910-620-0937',
  openGraph: {
    type: 'website',
    title: 'SMT Services — Superhero Cleaning · Wilmington NC',
    description: 'Residential, Commercial, AirBnB & Post Construction cleaning in Wilmington NC. Call Stefanie: 910-620-0937',
    url: 'https://smtservices.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SMT Services — Superhero Cleaning · Wilmington NC',
    description: 'Residential, Commercial, AirBnB & Post Construction cleaning in Wilmington NC. Call Stefanie: 910-620-0937',
  },
  other: {
    'geo.region': 'US-NC',
    'geo.placename': 'Wilmington, North Carolina',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <PoweredByBTV />
      </body>
    </html>
  )
}
