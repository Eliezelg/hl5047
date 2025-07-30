'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Mapping des dossiers vers les icônes
const folderIcons: Record<string, string> = {
  // Shabbat
  'שיעורים הלכות שבת בעיון + גליון סיכום לכל שיעור': '/shiour/שיעורים בעיון_שבת__דרייב.png',
  'שיעורים הלכות שבת תשפ"ב - תשפ"ה': '/shiour/שבת__פה__דרייב.png',
  'שיעורים הלכות שבת תשע"ג - תשע"ו': '/shiour/שבת__עג__דרייב.png',
  
  // Autres domaines
  'שיעורים הלכות ברכות תשע"ז - תשפ"ב': '/shiour/ברכות_דרייב.png',
  'שיעורים הלכות המועדים': '/shiour/מועדים_דרייב.png',
  'איסור והיתר': '/shiour/איסור והיתר__דרייב.png',
  'שיעורים הלכות נדה -תשס"ט': '/shiour/נדה__דרייב.png',
  'שיעורים הלכות בית הכנסת': '/shiour/בית כנסת__דרייב.png',
  'שיעורים הלכות ספר תורה': '/shiour/ספר תורה__דרייב.png',
  'שיעורים הלכות שמיטה - תשע"א': '/shiour/שמיטה__דרייב.png',
  
  // Chidons et autres
  'חידון ההלכה העולמי': '/shiour/חידון הלכה למעשה__דרייב.png',
  'חידון הלכות "החפץ חיים"': '/shiour/חידון חפץ חיים__דרייב.png',
  'שאלות ותשובות מהרדיו': '/shiour/שות רדיו__דרייב.png',
};

const CourseFoldersCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(5);
  
  const folders = Object.entries(folderIcons).map(([name, icon]) => ({ name, icon }));
  const maxIndex = Math.max(0, folders.length - itemsPerView);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(2);
      else if (window.innerWidth < 768) setItemsPerView(3);
      else if (window.innerWidth < 1024) setItemsPerView(4);
      else setItemsPerView(5);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    }, 4000); // Change toutes les 4 secondes

    return () => clearInterval(interval);
  }, [maxIndex]);

  return (
    <section className="py-16 bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-primary-800 mb-12">
          שיעורי תורה והלכה
        </h2>
        
        <div className="relative">
          {/* Bouton précédent */}
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 transition-all ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-primary-800" />
          </button>

          {/* Carousel container */}
          <div className="overflow-hidden mx-12">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(${currentIndex * -(100 / itemsPerView)}%)` }}
            >
              {folders.map((folder, index) => (
                <Link
                  key={index}
                  href="/cours"
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="group block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="aspect-square relative overflow-hidden rounded-t-xl">
                      <img
                        src={folder.icon}
                        alt={folder.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3 text-center">
                      <h3 className="text-sm font-bold text-primary-800 line-clamp-2">
                        {folder.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bouton suivant */}
          <button
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 transition-all ${
              currentIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            }`}
          >
            <ChevronRight className="w-6 h-6 text-primary-800" />
          </button>
        </div>

        {/* Indicateurs */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'w-8 bg-primary-800' : 'bg-primary-300'
              }`}
            />
          ))}
        </div>

        {/* Lien vers tous les cours */}
        <div className="text-center mt-8">
          <Link
            href="/cours"
            className="inline-flex items-center px-6 py-3 bg-primary-800 text-white rounded-lg hover:bg-primary-900 transition-colors duration-300"
          >
            <span className="font-semibold">כל השיעורים</span>
            <ChevronLeft className="w-5 h-5 mr-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CourseFoldersCarousel;