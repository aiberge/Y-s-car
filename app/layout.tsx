import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SchemaMarkup from '@/components/SchemaMarkup'
import { LanguageProvider } from '@/contexts/language-context'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

const SITE_URL = 'https://yscar-location.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Y-S car | Location de voitures premium à Fès et partout au Maroc',
  description: 'Y-S car propose une flotte récente de véhicules économiques, berlines et SUV avec livraison gratuite à l’aéroport de Fès. Réservation WhatsApp 24/7, tarifs transparents et kilométrage illimité.',
  keywords: [
    'location voiture Fès',
    'Y-S car',
    'location voiture Maroc',
    'louer voiture aéroport Fès',
    'voiture de location premium',
    'SUV location Fès',
    'kilométrage illimité Maroc'
  ],
  alternates: {
    languages: {
      'fr': '/',
      'en': '/en',
      'ar': '/ar'
    },
  },
  openGraph: {
    title: 'Y-S car | Location de voitures premium à Fès et partout au Maroc',
    description: 'Réservez votre voiture avec Y-S car : large choix de modèles récents, assistance 24/7 et confirmation immédiate par WhatsApp.',
    url: SITE_URL,
    siteName: 'Y-S car',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/yslogo.png`,
        width: 800,
        height: 600,
        alt: 'Y-S car Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Y-S car | Location de voitures premium à Fès et partout au Maroc',
    description: 'Réservez une voiture récente avec Y-S car : tarifs transparents, livraison aéroport et support WhatsApp.',
    images: [`${SITE_URL}/yslogo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={SITE_URL} />
        <link rel="shortcut icon" href="/favicon.ico" sizes="512x512" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="512x512" />
        <link rel="apple-touch-icon" href="/favicon.ico" sizes="512x512" />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17042830853"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17042830853');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <SchemaMarkup />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
