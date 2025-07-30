import Hero from '@/components/Hero';
import ShiurimSection from '@/components/ShiurimSection';
import DonationSection from '@/components/DonationSection';
import BooksSection from '@/components/BooksSection';
import WeeklyDownload from '@/components/WeeklyDownload';
import Script from 'next/script';

export default function HomePage() {
  return (
    <>
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'הלכה למעשה',
            'url': 'https://hl5047.co.il',
            'description': 'בית ההוראה הלכה למעשה - מרכז תורני להוראה והפצת תורה',
          })
        }}
      />
      <Hero />
      <ShiurimSection />        
      <DonationSection />
      <BooksSection />
      <WeeklyDownload />
    </>
  );
}