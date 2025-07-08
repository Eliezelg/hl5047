'use client';

import { useState } from 'react';
import { RabbiTopic, RABBI_TOPICS } from '@/types';
import { Search, ChevronDown } from 'lucide-react';

// Group topics by category
const topicGroups = {
  'מצוות בין אדם לחברו': ['חושן משפט', 'ממונות', 'ריבית'],
  'כשרות': ['איסור והיתר', 'טבילת כלים'],
  'תפילה וברכות': ['ברכות', 'תפילה'],
  'מועדים': ['מועדים', 'שבת'],
  'טהרת המשפחה': ['נדה'],
  'אישות': ['אבן העזר'],
  'בין אדם לחברו': ['לשון הרע ורכילות'],
} as const;

interface RabbiFiltersProps {
  cities: string[];
  selectedTopic: RabbiTopic | 'all';
  selectedCity: string;
  onTopicChange: (topic: RabbiTopic | 'all') => void;
  onCityChange: (city: string) => void;
  onSearchChange: (search: string) => void;
}

const RabbiFilters: React.FC<RabbiFiltersProps> = ({
  cities,
  selectedTopic,
  selectedCity,
  onTopicChange,
  onCityChange,
  onSearchChange,
}) => {
  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="חיפוש לפי שם הרב..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* City Dropdown */}
        <div className="relative w-full md:w-48">
          <button
            onClick={() => setIsCityOpen(!isCityOpen)}
            className="w-full px-4 py-2 text-right bg-white border border-gray-300 rounded-lg flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <span className="truncate">
              {selectedCity === 'all' ? 'כל הערים' : selectedCity}
            </span>
            <ChevronDown className={`w-5 h-5 transition-transform ${isCityOpen ? 'transform rotate-180' : ''}`} />
          </button>
          {isCityOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              <button
                onClick={() => {
                  onCityChange('all');
                  setIsCityOpen(false);
                }}
                className={`w-full px-4 py-2 text-right hover:bg-gray-100 ${
                  selectedCity === 'all' ? 'bg-primary-50 text-primary-600' : ''
                }`}
              >
                כל הערים
              </button>
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    onCityChange(city);
                    setIsCityOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-right hover:bg-gray-100 ${
                    selectedCity === city ? 'bg-primary-50 text-primary-600' : ''
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Topics */}
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTopicChange('all')}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedTopic === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            הכל
          </button>
          {Object.entries(topicGroups).map(([category, topics]) => (
            <div key={category} className="relative inline-block">
              <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => onTopicChange(topic as RabbiTopic)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      selectedTopic === topic
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RabbiFilters;
