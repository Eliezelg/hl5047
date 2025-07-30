import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'שיעורי הרב | הלכה למעשה - שיעורי תורה והלכה',
  description: 'שיעורי הלכה מקיפים בנושאי שבת, ברכות, מועדים, בשר וחלב, נדה ועוד. האזינו לאלפי שיעורים מאת הרב אופיר יצחק מלכא  שליט"א',
  keywords: 'שיעורי הלכה, שיעורי תורה, הרב אופיר יצחק מלכא , הלכה למעשה, שיעורי שבת, הלכות ברכות, הלכות מועדים, שיעורים מוקלטים',
  openGraph: {
    title: 'שיעורי הרב אופיר יצחק מלכא  - הלכה למעשה',
    description: 'ארכיון מקיף של שיעורי הלכה בכל תחומי החיים היהודיים. שיעורים בהלכות שבת, מועדים, ברכות ועוד',
    type: 'website',
    url: 'https://hl5047.co.il/cours',
    siteName: 'הלכה למעשה',
    locale: 'he_IL',
    images: [
      {
        url: 'https://hl5047.co.il/shiour/שיעורים בעיון_שבת__דרייב.png',
        width: 1200,
        height: 630,
        alt: 'שיעורי הלכה למעשה',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'שיעורי הרב אופיר יצחק מלכא  - הלכה למעשה',
    description: 'ארכיון מקיף של שיעורי הלכה בכל תחומי החיים היהודיים',
    images: ['https://hl5047.co.il/shiour/שיעורים בעיון_שבת__דרייב.png'],
  },
  alternates: {
    canonical: 'https://hl5047.co.il/cours',
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
};