'use client';

import React, { useEffect } from 'react';
import BlessingList from './components/BlessingList';
import { brachot } from '@/data/brachots/brachot';

const LuachPage = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) && 
        (e.key === 'c' || e.key === 'C' || 
         e.key === 'v' || e.key === 'V' ||
         e.key === 'a' || e.key === 'A')
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('copy', (e) => e.preventDefault());
    document.addEventListener('paste', (e) => e.preventDefault());
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('copy', (e) => e.preventDefault());
      document.removeEventListener('paste', (e) => e.preventDefault());
      document.removeEventListener('contextmenu', (e) => e.preventDefault());
    };
  }, []);

  return (
    <div 
      className="container mx-auto px-4 py-8 select-none"
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      onSelect={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
    >
      <h1 className="text-4xl font-bold text-center mb-8">לוח ברכות</h1>
      
      {/* Introduction */}
      <div className="mb-12 max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6" dir="rtl">
        <h2 className="text-2xl font-bold mb-4">דברים אחדים לקורא</h2>
        <div className="space-y-4 text-right">
          <p>
            א) הלוח הינו עזרה ראשונה לדעת כיצד לנהוג למעשה בכל רגע נתון, את ההסבר והטעם ניתן לראות בספרי הליכות ברכות לפי ציוני המקורות המופיעים שם בלוח ברכות.
          </p>
          <p>
            ב) בכל מקרה של ספק או חוסר הבנה, חובה לראות את שורשי הדברים בגוף הספר כדי לדעת כיצד לנהוג למעשה.
          </p>
        </div>
      </div>

      {/* Liste des bénédictions */}
      <BlessingList categories={brachot} />
    </div>
  );
};

export default LuachPage;
