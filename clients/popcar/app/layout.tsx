import PoweredByBTV from './components/PoweredByBTV'
import type { Metadata } from 'next'
import './globals.css'
import ChatBot from './components/ChatBot'

export const metadata: Metadata = {
  title: 'Pop Car Auto Center | Wilmington NC Auto Repair',
  description: 'Full service auto repair in Wilmington NC. Oil changes, tires, brakes, engine repair, transmission. Walk-ins welcome. Call (910) 834-3607.',
  openGraph: {
    type: 'website',
    title: 'Pop Car Auto Center | Wilmington NC Auto Repair',
    description: 'Full service auto repair in Wilmington NC. Oil changes, tires, brakes, engine repair, transmission.',
    url: 'https://popcarauto.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pop Car Auto Center | Wilmington NC Auto Repair',
    description: 'Full service auto repair in Wilmington NC. Oil changes, tires, brakes, engine repair, transmission.',
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
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <ChatBot />
        <PoweredByBTV />
      </body>
    </html>
  )
}
