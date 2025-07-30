import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'הלכה למעשה | בית ההוראה',
  description: 'בית ההוראה הלכה למעשה - מרכז תורני להוראה והפצת תורה. שיעורים, שאלות ותשובות, ספרים והלכות יומיומיות',
  keywords: 'הלכה, בית הוראה, שיעורי תורה, שאלות ותשובות, ספרי הלכה, רבנים, לוח זמנים, הלכה למעשה',
  authors: [{ name: 'הלכה למעשה' }],
  applicationName: 'הלכה למעשה',
  generator: 'Next.js',
  metadataBase: new URL('https://hl5047.co.il'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'הלכה למעשה | בית ההוראה',
    description: 'בית ההוראה הלכה למעשה - מרכז תורני להוראה והפצת תורה',
    type: 'website',
    locale: 'he_IL',
    siteName: 'הלכה למעשה',
    url: 'https://hl5047.co.il',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'הלכה למעשה לוגו',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'הלכה למעשה | בית ההוראה',
    description: 'בית ההוראה הלכה למעשה - מרכז תורני להוראה והפצת תורה',
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-192x192.png' },
    ],
  },
  manifest: '/manifest.json',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="preload"
          href="/BethMidrash.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/BinyanCatalog/binyan02.jpg"
          as="image"
          type="image/jpeg"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "הלכה למעשה",
              "alternateName": "בית ההוראה הלכה למעשה",
              "url": "https://hl5047.co.il",
              "logo": "https://hl5047.co.il/logo.png",
              "description": "בית ההוראה הלכה למעשה - מרכז תורני להוראה והפצת תורה",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IL"
              }
            })
          }}
        />
      </head>
      <body className="bg-wheat-50 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}