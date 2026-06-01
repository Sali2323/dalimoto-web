import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin', 'latin-ext'], display: 'swap', variable: '--font-inter' })

export const metadata = {
  metadataBase: new URL('https://dalimoto.cz'),
  title: 'DaliMoto – Pneuservis a autoservis Kladno | Přezutí, vyvážení, klimatizace',
  description: 'Profesionální pneuservis a autoservis v Kladně. Přezutí pneumatik, vyvážení kol, pneuservis motocyklů, plnění klimatizací, výměna oleje. Rychlé termíny, férové ceny. ★ 4,8/5 hodnocení.',
  keywords: [
    'pneuservis Kladno',
    'přezutí pneumatik Kladno',
    'vyvážení kol Kladno',
    'pneuservis motocyklů Kladno',
    'plnění klimatizací Kladno',
    'autoservis Kladno',
    'výměna oleje Kladno',
    'DaliMoto'
  ],
  authors: [{ name: 'DaliMoto' }],
  openGraph: {
    title: 'DaliMoto – Prémiový pneuservis a autoservis v Kladně',
    description: 'Profesionální pneuservis bez zbytečného čekání. Přezutí, vyvážení, klimatizace, motocykly, dodávky. ★ 4,8/5.',
    url: 'https://dalimoto.cz',
    siteName: 'DaliMoto',
    locale: 'cs_CZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DaliMoto – Pneuservis Kladno',
    description: 'Profesionální pneuservis a autoservis v Kladně. ★ 4,8/5.',
  },
  alternates: { canonical: 'https://dalimoto.cz' },
  robots: { index: true, follow: true },
}

export const viewport = {
  themeColor: '#0a0f1f',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutomotiveBusiness',
  name: 'DaliMoto',
  image: 'https://dalimoto.cz/og.jpg',
  url: 'https://dalimoto.cz',
  telephone: '+420739263617',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '5. května 2679',
    addressLocality: 'Kladno – Kročehlavy',
    postalCode: '272 01',
    addressCountry: 'CZ',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 50.1404,
    longitude: 14.1031,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '12:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '46',
  },
  areaServed: 'Kladno a okolí',
  description: 'Profesionální pneuservis a autoservis v Kladně. Přezutí pneumatik, vyvážení kol, plnění klimatizací, výměna oleje, drobné opravy vozidel, uskladnění pneumatik.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="cs" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#070b18] text-white">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
