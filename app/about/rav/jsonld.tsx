export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "הרב אופיר יצחק מלכא",
    "honorificPrefix": "הגאון",
    "honorificSuffix": "שליט\"א",
    "jobTitle": "ראש בית ההוראה",
    "url": "https://hl5047.co.il/about/rav",
    "image": "https://hl5047.co.il/rav.webp",
    "description": "הגאון הרב אופיר יצחק מלכא שליט\"א - ראש בית ההוראה הלכה למעשה. בקיאותו המופלאה בכל תחומי ההלכה ודרך לימודו הייחודית הצליחה לקרב רבים אל עולם ההלכה",
    "worksFor": {
      "@type": "Organization",
      "name": "בית ההוראה הלכה למעשה",
      "url": "https://hl5047.co.il"
    },
    "knowsLanguage": ["Hebrew", "English"],
    "alumniOf": "ישיבת הלכה למעשה",
    "sameAs": [
      "https://www.facebook.com/RabbiOphirMalka",
      "https://www.youtube.com/channel/RabbiOphirMalka"
    ],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://hl5047.co.il/about/rav"
    },
    "author": [
      {
        "@type": "Book",
        "name": "הליכות שבת",
        "bookEdition": "שלושה כרכים"
      },
      {
        "@type": "Book",
        "name": "הליכות ברכות",
        "bookEdition": "שני כרכים"
      },
      {
        "@type": "Book",
        "name": "הליכות מועד",
        "bookEdition": "שלושה כרכים"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
