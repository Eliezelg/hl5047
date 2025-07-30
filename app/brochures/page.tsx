'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Brochure {
  id: string;
  type: 'guilion' | 'alon';
  title: string;
  url: string;
  date: string;
}

export default function BrochuresPage() {
  const [guilionot, setGuilionot] = useState<Brochure[]>([]);
  const [alonot, setAlonot] = useState<Brochure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBrochures = async () => {
      try {
        const response = await fetch('/api/brochures');
        if (!response.ok) {
          throw new Error('Failed to load brochures');
        }
        const data = await response.json();
        
        // Séparer les guilionot et alonot
        setGuilionot(data.filter((b: Brochure) => b.type === 'guilion').slice(0, 5));
        setAlonot(data.filter((b: Brochure) => b.type === 'alon').slice(0, 5));
      } catch (err) {
        console.error('Error loading brochures:', err);
        setError('שגיאה בטעינת העלונים');
      } finally {
        setLoading(false);
      }
    };

    loadBrochures();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <main className="flex-grow">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-primary-800 mb-12">
          ברוכורים
        </h1>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Brochures de la semaine */}
          <section>
            <h2 className="text-2xl font-semibold text-primary-700 mb-6">
              עלוני השבוע
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {guilionot[0] && (
                <div className="bg-white shadow-lg rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">גיליון שבועי</h3>
                  <Link 
                    href={guilionot[0].url}
                    className="text-primary-600 hover:text-primary-800"
                    target="_blank"
                  >
                    {guilionot[0].title}
                  </Link>
                </div>
              )}
              {alonot[0] && (
                <div className="bg-white shadow-lg rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">עלון שבועי</h3>
                  <Link 
                    href={alonot[0].url}
                    className="text-primary-600 hover:text-primary-800"
                    target="_blank"
                  >
                    {alonot[0].title}
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* Archives récentes */}
          <section>
            <h2 className="text-2xl font-semibold text-primary-700 mb-6">
              ארכיון חודש אחרון
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">גיליונות אחרונים</h3>
                <ul className="space-y-3">
                  {guilionot.slice(1).map((guilion) => (
                    <li key={guilion.id}>
                      <Link 
                        href={guilion.url}
                        className="text-primary-600 hover:text-primary-800"
                        target="_blank"
                      >
                        {guilion.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">עלונים אחרונים</h3>
                <ul className="space-y-3">
                  {alonot.slice(1).map((alon) => (
                    <li key={alon.id}>
                      <Link 
                        href={alon.url}
                        className="text-primary-600 hover:text-primary-800"
                        target="_blank"
                      >
                        {alon.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Lien vers les archives complètes */}
          <section className="text-center">
            <Link 
              href="https://archive-brochures.example.com"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              target="_blank"
            >
              לארכיון המלא
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
