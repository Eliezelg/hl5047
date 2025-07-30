import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ToastProvider } from '@/components/ui/toast';
import ClientProviders from './ClientProviders';

export { metadata } from './layout.server';

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
        <ClientProviders>
          <div className="min-h-screen bg-wheat-50 flex flex-col">
            <ToastProvider>
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </ToastProvider>
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}