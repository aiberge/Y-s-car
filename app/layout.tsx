import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SchemaMarkup from '@/components/SchemaMarkup'
import { LanguageProvider } from '@/contexts/language-context'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://krilicar.com'),
  title: 'Location Maroc - Location de voitures à Fès, Maroc',
  description: 'Louez une voiture à Fès avec Location Maroc. Large choix de véhicules, prix compétitifs et service de qualité. Réservez votre voiture dès aujourd\'hui !',
  keywords: ['location voiture Fès', 'louer voiture Maroc', 'Location Maroc', 'voiture pas cher Fès', 'location aéroport Fès'],
  alternates: {
    languages: {
      'fr': '/',
      'en': '/en',
      'ar': '/ar'
    },
  },
  openGraph: {
    title: 'Location Maroc - Location de voitures à Fès, Maroc',
    description: 'Louez une voiture à Fès avec Location Maroc. Large choix de véhicules, prix compétitifs et service de qualité. Réservez votre voiture dès aujourd\'hui !',
    url: 'https://www.krilicar.com',
    siteName: 'Location Maroc',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://www.krilicar.com/Gelogo.png',
        width: 800,
        height: 600,
        alt: 'Location Maroc Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Location Maroc - Location de voitures à Fès, Maroc',
    description: 'Louez une voiture à Fès avec Location Maroc. Large choix de véhicules, prix compétitifs et service de qualité. Réservez votre voiture dès aujourd\'hui !',
    images: ['https://www.krilicar.com/Gelogo.png'],
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
        <link rel="canonical" href="https://krilicar.com" />
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
