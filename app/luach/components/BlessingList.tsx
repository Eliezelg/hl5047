'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { BlessingCategory } from '@/data/brachots/brachot';

interface BlessingListProps {
  categories: BlessingCategory[];
}

const BlessingList: React.FC<BlessingListProps> = ({ categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleCategorySelect = useCallback((categoryTitle: string) => {
    setSelectedCategory(prev => prev === categoryTitle ? null : categoryTitle);
  }, []);

  const filteredCategories = useMemo(() => {
    const filtered = categories.map(category => ({
      ...category,
      title: category.title || category.letter || '', // Utiliser letter si title n'existe pas
      blessings: (category.blessings || category.items || []).filter(blessing =>
        blessing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (blessing.description?.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }));
    
    // Si une recherche est en cours, montrer toutes les catégories qui ont des résultats
    if (searchTerm) {
      return filtered.filter(category => (category.blessings || []).length > 0);
    }
    
    // Si aucune recherche n'est en cours mais une catégorie est sélectionnée
    if (selectedCategory) {
      return filtered.filter(category => (category.title || category.letter || '') === selectedCategory);
    }
    
    // Sinon, retourner toutes les catégories
    return filtered;
  }, [categories, searchTerm, selectedCategory]);

  const BlessingItem = useCallback(({ blessing, index, categoryTitle }: { blessing: any, index: number, categoryTitle: string }) => {
    return (
      <div
        className="bg-white rounded-lg shadow-md p-4"
        dir="rtl"
      >
        <h3 className="text-xl font-semibold mb-2">{blessing.name}</h3>
        <div className="space-y-2">
          <p><strong>ברכה ראשונה:</strong> {blessing.firstBlessing}</p>
          {blessing.lastBlessing && (
            <p><strong>ברכה אחרונה:</strong> {blessing.lastBlessing}</p>
          )}
          {blessing.description && (
            <p className="text-gray-600">{blessing.description}</p>
          )}
        </div>
      </div>
    );
  }, []);

  return (
    <div 
      className="w-full max-w-4xl mx-auto select-none"
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      onSelect={(e) => e.preventDefault()}
    >
      {/* Barre de recherche */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="חיפוש ברכה..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border rounded-lg text-right"
          dir="rtl"
        />
      </div>

      {/* Navigation des catégories */}
      <div className="flex flex-wrap gap-2 mb-6 justify-end" dir="rtl">
        {categories.map((category, idx) => {
          const categoryTitle = category.title || category.letter || '';  // Provide empty string as fallback
          return (
            <button
              key={`nav-${categoryTitle}-${idx}`}
              onClick={() => handleCategorySelect(categoryTitle)}
              className={`px-4 py-2 rounded-lg ${
                categoryTitle === selectedCategory
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              } text-right`}
            >
              {categoryTitle}
            </button>
          );
        })}
      </div>

      {/* Liste des bénédictions */}
      <div className="space-y-8">
        {filteredCategories.map((category, categoryIndex) => {
          const categoryTitle = category.title || category.letter || '';  // Provide empty string as fallback
          return (
            <div 
              key={`category-${categoryTitle}-${categoryIndex}`}
              className="block"
            >
              <h2 className="text-3xl font-bold mb-4 text-right">{categoryTitle}</h2>
              <div className="space-y-4">
                {(category.blessings || category.items || []).map((blessing, index) => (
                  <BlessingItem
                    key={`filtered-blessing-${categoryIndex}-${index}-${blessing.name}`}
                    blessing={blessing}
                    index={index}
                    categoryTitle={categoryTitle}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(BlessingList);