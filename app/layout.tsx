'use client';

import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ToastProvider } from '@/components/ui/toast';

// Metadata doit être dans un fichier séparé car c'est du code serveur
// export const metadata: Metadata = {
//   title: 'הלכה למעשה | בית ההוראה',
//   description: 'בית ההוראה הלכה למעשה - מרכז תורני להוראה והפצת תורה. שיעורים, שאלות ותשובות, ספרים והלכות יומיומיות',
//   keywords: 'הלכה, בית הוראה, שיעורי תורה, שאלות ותשובות, ספרי הלכה, רבנים, לוח זמנים',
//   authors: [{ name: 'הלכה למעשה' }],
//   openGraph: {
//     title: 'הלכה למעשה | בית ההוראה',
//     description: 'בית ההוראה הלכה למעשה - מרכז תורני להוראה והפצת תורה',
//     type: 'website',
//     locale: 'he_IL',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'הלכה למעשה | בית ההוראה',
//     description: 'בית ההוראה הלכה למעשה - מרכז תורני להוראה והפצת תורה',
//   },
// };

import { useEffect } from 'react';

function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(
          function(registration) {
            console.log('ServiceWorker registration successful');
          },
          function(err) {
            console.log('ServiceWorker registration failed: ', err);
          }
        );
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-wheat-50 flex flex-col">
      <ToastProvider>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </ToastProvider>
    </div>
  );
}

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
        <meta name="description" content="Halacha Lemaase - Guide pratique des lois juives" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
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
      </head>
      <body className="bg-wheat-50 min-h-screen flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}