'use client';

import React from 'react';

interface CityFilterProps {
  cities: string[];
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const CityFilter: React.FC<CityFilterProps> = ({ cities, selectedCity, onCityChange }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {[{ id: 'all', name: 'כל הערים' }, ...cities.map(city => ({ id: city, name: city }))].map((item) => (
        <button
          key={item.id}
          onClick={() => onCityChange(item.id)}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedCity === item.id
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default CityFilter;
