'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

const shiurimData = [
  {
    image: '/shiurim/Youtube.png',
    title: 'שיעורים ביוטיוב פתוח בנטפרי',
    description: 'שיעורים יומיים קצרים וכן כל שיעורי הרב',
    link: 'https://www.youtube.com/channel/UCiT6KgOE1IDJ2XHE23Zk2Cg',
    isExternal: true
  }
];

const courseIcons = [
  {
    image: '/shiour/איסור והיתר__דרייב.png',
    title: 'שיעורים הלכות בשר וחלב',
    link: '/cours?folder=' + encodeURIComponent('שיעורים הלכות בשר וחלב')
  },
  {
    image: '/shiour/בית כנסת__דרייב.png',
    title: 'שיעורים הלכות בית הכנסת',
    link: '/cours?folder=' + encodeURIComponent('שיעורים הלכות בית הכנסת')
  },
  {
    image: '/shiour/ברכות_דרייב.png',
    title: 'שיעורים הלכות ברכות תשע"ז - תשפ"ב',
    link: '/cours?folder=' + encodeURIComponent('שיעורים הלכות ברכות תשע"ז - תשפ"ב')
  },
  {
    image: '/shiour/חידון הלכה למעשה__דרייב.png',
    title: 'חידון ההלכה העולמי',
    link: '/cours?folder=' + encodeURIComponent('חידון ההלכה העולמי')
  },
  {
    image: '/shiour/חידון חפץ חיים__דרייב.png',
    title: 'חידון הלכות "החפץ חיים"',
    link: '/cours?folder=' + encodeURIComponent('חידון הלכות "החפץ חיים"')
  },
  {
    image: '/shiour/מועדים_דרייב.png',
    title: 'שיעורים הלכות המועדים',
    link: '/cours?folder=' + encodeURIComponent('שיעורים הלכות המועדים')
  },
  {
    image: '/shiour/נדה__דרייב.png',
    title: 'שיעורים הלכות נדה -תשס"ט',
    link: '/cours?folder=' + encodeURIComponent('שיעורים הלכות נדה -תשס"ט')
  },
  {
    image: '/shiour/ספר תורה__דרייב.png',
    title: 'שיעורים הלכות ספר תורה',
    link: '/cours?folder=' + encodeURIComponent('שיעורים הלכות ספר תורה')
  },
  {
    image: '/shiour/שבת__עג__דרייב.png',
    title: 'שיעורים הלכות שבת תשע"ג - תשע"ו',
    link: '/cours?folder=' + encodeURIComponent('שיעורים הלכות שבת תשע"ג - תשע"ו')
  },
  {
    image: '/shiour/שבת__פה__דרייב.png',
    title: 'שיעורים הלכות שבת תשפ"ב - תשפ"ה',
    link: '/cours?folder=' + encodeURIComponent('שיעורים הלכות שבת תשפ"ב - תשפ"ה')
  },
  {
    image: '/shiour/שות רדיו__דרייב.png',
    title: 'שאלות ותשובות מהרדיו',
    link: '/cours?folder=' + encodeURIComponent('שאלות ותשובות מהרדיו')
  },
  {
    image: '/shiour/שיעורים בעיון_שבת__דרייב.png',
    title: 'שיעורים הלכות שבת בעיון + גליון סיכום לכל שיעור',
    link: '/cours?folder=' + encodeURIComponent('שיעורים הלכות שבת בעיון + גליון סיכום לכל שיעור')
  },
  {
    image: '/shiour/שמיטה__דרייב.png',
    title: 'שיעורים הלכות שמיטה - תשע"א',
    link: '/cours?folder=' + encodeURIComponent('שיעורים הלכות שמיטה - תשע"א')
  }
];

const allItems = [...shiurimData, ...courseIcons];

const ShiurimSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 220;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    // Créer une fonction pour vérifier si l'élément existe
    const checkAndScroll = () => {
      if (!scrollRef.current || isPaused) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      
      // Si on arrive au début, aller à la fin
      if (scrollLeft <= 10) {
        scrollRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
      } else {
        // Défiler vers la gauche
        scrollRef.current.scrollBy({
          left: -220,
          behavior: 'smooth'
        });
      }
    };

    // Attendre un peu que le DOM soit prêt
    const timeoutId = setTimeout(() => {
      // Positionner le carrousel à la fin au démarrage
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        scrollRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'auto' });
      }
      
      // Démarrer l'intervalle
      interval = setInterval(checkAndScroll, 3000);
      // Premier défilement après 1 seconde
      checkAndScroll();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      if (interval) clearInterval(interval);
    };
  }, [isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-primary-800 mb-8 md:mb-12">
          שיעורי תורה והלכה
        </h2>
        
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 md:p-3 transition-all hidden sm:block"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 md:p-3 transition-all hidden sm:block"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div 
            ref={scrollRef}
            className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-2 sm:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {allItems.map((item, index) => {
              const isExternal = 'isExternal' in item && item.isExternal;
              const ItemWrapper = isExternal ? 'a' : Link;
              const wrapperProps = isExternal 
                ? { href: item.link, target: "_blank", rel: "noopener noreferrer" }
                : { href: item.link };

              return (
                <ItemWrapper
                  key={`${item.title}-${index}`}
                  {...wrapperProps}
                  className="group flex-shrink-0 block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-[150px] sm:w-[180px] md:w-[200px]"
                >
                  <div className="aspect-square relative overflow-hidden rounded-t-xl w-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-2 sm:p-3 text-center">
                    <h3 className="text-xs sm:text-sm font-bold text-primary-800 mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    {(item as any).description && (
                      <p className="text-[10px] sm:text-xs text-primary-600 line-clamp-2">
                        {(item as any).description}
                      </p>
                    )}
                  </div>
                </ItemWrapper>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShiurimSection;
