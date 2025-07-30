import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hl5047.co.il';
  
  // Liste des principales catégories de cours
  const categories = [
    'שיעורים הלכות שבת בעיון + גליון סיכום לכל שיעור',
    'שיעורים הלכות שבת תשפ"ב - תשפ"ה',
    'שיעורים הלכות שבת תשע"ג - תשע"ו',
    'שיעורים הלכות ברכות תשע"ז - תשפ"ב',
    'שיעורים הלכות המועדים',
    'שיעורים הלכות בשר וחלב',
    'שיעורים הלכות נדה -תשס"ט',
    'שיעורים הלכות בית הכנסת',
    'שיעורים הלכות ספר תורה',
    'שיעורים הלכות שמיטה - תשע"א',
    'חידון ההלכה העולמי',
    'חידון הלכות "החפץ חיים"',
    'שאלות ותשובות מהרדיו'
  ];

  return [
    {
      url: `${baseUrl}/cours`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...categories.map(category => ({
      url: `${baseUrl}/cours?folder=${encodeURIComponent(category)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}