'use client';
import { reahItems, ReahItem } from '@/data/reah/reah';
import { useState, useMemo } from 'react';
import { NoSelect } from '../../components/NoSelect';

const letters = Object.keys(reahItems) as (keyof typeof reahItems)[];

type HebrewLetter = typeof letters[number];

export default function ReachPage() {
  const [selectedLetter, setSelectedLetter] = useState<HebrewLetter | null>(letters[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm) {
      return selectedLetter 
        ? reahItems[selectedLetter] || []
        : [];
    }

    return Object.values(reahItems).flat().filter(item => 
      item.name.includes(searchTerm) || 
      item.status.includes(searchTerm) ||
      (item.description || '').includes(searchTerm)
    );
  }, [searchTerm, selectedLetter]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      setSelectedLetter(null);
    }
  };

  return (
    <NoSelect>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">לוח ברכות הריח</h1>
        
        {/* Introduction section */}
        <div className="mb-12 max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6" dir="rtl">
          <h2 className="text-2xl font-bold mb-4">כללי הלוח</h2>
          <div className="space-y-4 text-right">
            <p>
              א) הלוח הינו עזרה ראשונה לדעת כיצד לנהוג למעשה בכל רגע נתון, את ההסבר והטעם ניתן לראות בספרי הליכות ברכות לפי ציוני המקורות המופיעים שם בלוח ברכות.
            </p>
            <p>
              ב) בכל מקרה של ספק או חוסר הבנה, חובה לראות את שורשי הדברים בגוף הספר כדי לדעת כיצד לנהוג למעשה.
            </p>
          </div>
        </div>

        {/* Search and Letters */}
        <div className="mb-8">
          <div className="max-w-xl mx-auto mb-6">
            <input
              type="text"
              placeholder="חיפוש..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-3 border rounded-lg text-right shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              dir="rtl"
            />
          </div>

          <div className="grid grid-cols-11 gap-2 max-w-4xl mx-auto mb-8">
            {letters.map((letter) => (
              <button
                key={letter}
                onClick={() => {
                  setSelectedLetter(letter);
                  setSearchTerm('');
                }}
                className={`p-2 rounded ${
                  selectedLetter === letter
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                } ${searchTerm ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!!searchTerm}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Items List */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredItems.map((item: ReahItem, index: number) => (
              <div
                key={`${item.name}-${index}`}
                className="bg-white rounded-lg shadow-md p-4"
                dir="rtl"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    <p className="text-gray-700">
                      <span className="font-semibold">דינו: </span>
                      <span className={`${
                        item.status.includes('מותר') ? 'text-green-600' :
                        item.status.includes('אסור') ? 'text-red-600' :
                        'text-gray-800'
                      }`}>{item.status}</span>
                    </p>
                    {item.description && (
                      <p className="mt-2 text-gray-600">{item.description}</p>
                    )}
                  </div>
                  {item.source && (
                    <div className="text-right text-sm text-gray-500 ml-4">
                      <span className="font-semibold">מקור: </span>
                      {item.source}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </NoSelect>
  );
}
