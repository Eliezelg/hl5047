'use client';

import { useState, useEffect } from 'react';
import { Rabbi, RabbiTopic, RABBI_TOPICS } from '@/types';
import RabbiCard from '@/components/RabbiCard';
import RabbiFilters from '@/components/RabbiFilters';

// ID du Rav Ofir Malka
const RAV_OFIR_ID = 'f83df09e-7f11-4e82-8b07-ffb2c9a352f5';

// Fonction pour trier les rabbins avec Rav Ofir Malka en premier
const sortRabbis = (rabbis: Rabbi[]) => {
  return [...rabbis].sort((a, b) => {
    // Mettre Rav Ofir en premier en utilisant son ID
    if (a.id === RAV_OFIR_ID) return -1;
    if (b.id === RAV_OFIR_ID) return 1;
    
    // Pour les autres rabbins, trier par nom
    return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`, 'he');
  });
};

const RabbisPage = () => {
  const [selectedTopic, setSelectedTopic] = useState<RabbiTopic | 'all'>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [rabbis, setRabbis] = useState<Rabbi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRabbis = async () => {
      try {
        const response = await fetch('/api/rabbis');
        if (!response.ok) {
          throw new Error('Failed to load rabbis');
        }
        const data = await response.json();
        // Filtrer les rabbins qui n'ont pas les données essentielles
        const validRabbis = data.filter((rabbi: Rabbi) => 
          rabbi.firstName && 
          rabbi.lastName && 
          Array.isArray(rabbi.topics) && 
          rabbi.topics.length > 0
        );
        
        // Log pour vérifier les IDs (temporaire)
        console.log('Rabbis data:', validRabbis.map((r: Rabbi) => ({
          id: r.id,
          name: `${r.firstName} ${r.lastName}`
        })));
        
        // Appliquer le tri avec Rav Ofir Malka en premier
        const sortedRabbis = sortRabbis(validRabbis);
        setRabbis(sortedRabbis);
      } catch (err) {
        console.error('Error loading rabbis:', err);
        setError('שגיאה בטעינת רשימת הרבנים');
      } finally {
        setLoading(false);
      }
    };

    loadRabbis();
  }, []);

  const filteredRabbis = rabbis.filter(rabbi => {
    const matchesTopic = selectedTopic === 'all' || rabbi.topics.includes(selectedTopic);
    const matchesCity = selectedCity === 'all' || rabbi.city === selectedCity;
    const matchesSearch = searchTerm === '' || 
      `${rabbi.firstName} ${rabbi.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rabbi.description && rabbi.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesTopic && matchesCity && matchesSearch;
  });

  const cities = Array.from(new Set(rabbis.map(rabbi => rabbi.city).filter((city): city is string => Boolean(city)))).sort();

  if (loading) {
    return (
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-primary-800 mb-8">
          רבני בית ההוראה
        </h1>
        
        <RabbiFilters
          cities={cities}
          selectedTopic={selectedTopic}
          selectedCity={selectedCity}
          onTopicChange={setSelectedTopic}
          onCityChange={setSelectedCity}
          onSearchChange={setSearchTerm}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRabbis.length > 0 ? (
            filteredRabbis.map((rabbi) => (
              <RabbiCard key={rabbi.id} rabbi={rabbi} />
            ))
          ) : (
            <div className="col-span-full bg-gray-50 rounded-lg p-8 text-center text-gray-600">
              <p className="text-lg font-medium mb-2">לא נמצאו רבנים התואמים את החיפוש</p>
              <p className="text-sm">נסה לשנות את הפילטרים או לחפש מחדש</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default RabbisPage;
