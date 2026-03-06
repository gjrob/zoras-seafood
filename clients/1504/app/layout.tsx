import PoweredByBTV from './components/PoweredByBTV'
import type { Metadata } from 'next';
import './globals.css';
import ChatBot from './components/ChatBot';

export const metadata: Metadata = {
  title: '1504 Resto-Bar — Wilmington, NC | Soul Food & Craft Cocktails',
  description: 'Late-night soul food and craft cocktails in downtown Wilmington, NC. Kitchen open Tue–Sun 5–10pm. Bar open nightly. Walk-ins welcome.',
  keywords: '1504, Resto-Bar, Wilmington NC, soul food, craft cocktails, late night dining, downtown Wilmington',
  openGraph: {
    title: '1504 Resto-Bar — Wilmington, NC',
    description: 'Where the kitchen closes at 10 and the bar never rushes you.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '1504 Resto-Bar — Wilmington, NC',
    description: 'Where the kitchen closes at 10 and the bar never rushes you.',
  },
  other: {
    'geo.region': 'US-NC',
    'geo.placename': 'Wilmington, North Carolina',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatBot />
        <PoweredByBTV />
      </body>
    </html>
  );
}
