import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Waypoint Innovation — Fabrication & Mechanical Engineering',
    template: '%s | Waypoint Innovation',
  },
  description:
    'Waypoint Innovation delivers fabrication, conceptual mechanical design and prototype development across automotive, industrial and agricultural sectors.',
  keywords: [
    'fabrication',
    'mechanical design',
    'prototype development',
    'agricultural attachment fabrication',
    'automotive fabrication South Africa',
    'industrial machinery fabrication',
    'Mercedes Benz',
    'RSI Smartcap',
  ],
  openGraph: {
    siteName: 'Waypoint Innovation',
    type: 'website',
    locale: 'en_ZA',
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Waypoint Innovation',
  url: 'https://waypointinnovation.co.za',
  description:
    'Fabrication, conceptual mechanical design and prototype development across automotive, industrial and agricultural sectors.',
  areaServed: 'ZA',
  knowsAbout: [
    'Fabrication',
    'Mechanical Design',
    'Prototype Development',
    'Automotive Engineering',
    'Agricultural Attachments',
    'Industrial Machinery',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
