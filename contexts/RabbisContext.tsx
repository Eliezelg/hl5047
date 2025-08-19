'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Rabbi {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  city?: string;
  topics: string[];
  languages: string[];
  description?: string;
  address?: string;
}

interface RabbisContextType {
  rabbis: Map<string, Rabbi>;
  getRabbi: (id: string) => Promise<Rabbi | null>;
  loading: boolean;
  preloadAll: () => Promise<void>;
}

const RabbisContext = createContext<RabbisContextType | null>(null);

export function RabbisProvider({ children }: { children: ReactNode }) {
  const [rabbis, setRabbis] = useState<Map<string, Rabbi>>(new Map());
  const [loading, setLoading] = useState(false);
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());
  const [allLoaded, setAllLoaded] = useState(false);

  const getRabbi = async (id: string): Promise<Rabbi | null> => {
    // Si déjà en cache, retourner immédiatement
    if (rabbis.has(id)) {
      return rabbis.get(id)!;
    }

    // Si déjà en cours de chargement, attendre
    if (loadingIds.has(id)) {
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (rabbis.has(id)) {
            clearInterval(checkInterval);
            resolve(rabbis.get(id)!);
          } else if (!loadingIds.has(id)) {
            clearInterval(checkInterval);
            resolve(null);
          }
        }, 100);
        
        // Timeout après 5 secondes
        setTimeout(() => {
          clearInterval(checkInterval);
          resolve(null);
        }, 5000);
      });
    }

    // Marquer comme en cours de chargement
    setLoadingIds(prev => new Set(prev).add(id));

    try {
      const response = await fetch(`/api/rabbis/${id}`, {
        headers: {
          'Cache-Control': 'max-age=3600'
        }
      });
      
      if (response.ok) {
        const rabbi = await response.json();
        setRabbis(prev => {
          const newMap = new Map(prev);
          newMap.set(id, rabbi);
          return newMap;
        });
        return rabbi;
      }
    } catch (error) {
      console.error('Error loading rabbi:', error);
    } finally {
      setLoadingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }

    return null;
  };

  const preloadAll = async () => {
    if (allLoaded || loading) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/rabbis', {
        headers: {
          'Cache-Control': 'max-age=3600'
        }
      });
      
      if (response.ok) {
        const allRabbis = await response.json();
        const rabbisMap = new Map<string, Rabbi>();
        allRabbis.forEach((rabbi: Rabbi) => {
          if (rabbi.id) {
            rabbisMap.set(rabbi.id, rabbi);
          }
        });
        setRabbis(rabbisMap);
        setAllLoaded(true);
      }
    } catch (error) {
      console.error('Error preloading rabbis:', error);
    } finally {
      setLoading(false);
    }
  };

  // Précharger les rabbis populaires au démarrage
  useEffect(() => {
    // IDs des rabbis les plus demandés
    const popularRabbis = [
      'f83df09e-7f11-4e82-8b07-ffb2c9a352f5', // Rav Ofir
      '5e99bd9b-b440-4498-8515-3b1106a869fc',
      '383e4c62-eb34-4ea0-9ffe-134804938a0b',
      '1d19ec2a-69ce-4062-b253-81e57e37d5d4'
    ];

    // Charger en parallèle les rabbis populaires
    Promise.all(popularRabbis.map(id => getRabbi(id)));
  }, []);

  return (
    <RabbisContext.Provider value={{ rabbis, getRabbi, loading, preloadAll }}>
      {children}
    </RabbisContext.Provider>
  );
}

export const useRabbis = () => {
  const context = useContext(RabbisContext);
  if (!context) {
    throw new Error('useRabbis must be used within RabbisProvider');
  }
  return context;
};