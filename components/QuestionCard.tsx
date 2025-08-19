'use client';

import { useState, useEffect } from 'react';
import { QA, Rabbi } from '@/types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface QuestionCardProps {
  qa: QA;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ qa }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [author, setAuthor] = useState<Rabbi | null>(null);

  useEffect(() => {
    // Cache pour éviter les requêtes répétées
    const cache = (window as any).__rabbiCache || ((window as any).__rabbiCache = new Map());
    
    const loadAuthor = async () => {
      // Vérifier le cache d'abord
      if (cache.has(qa.authorId)) {
        setAuthor(cache.get(qa.authorId));
        return;
      }
      
      try {
        const response = await fetch(`/api/rabbis/${qa.authorId}`, {
          // Ajouter cache HTTP
          headers: {
            'Cache-Control': 'max-age=3600'
          }
        });
        if (response.ok) {
          const data = await response.json();
          cache.set(qa.authorId, data); // Mettre en cache
          setAuthor(data);
        }
      } catch (error) {
        console.error('Error loading rabbi:', error);
      }
    };

    if (qa.authorId) {
      loadAuthor();
    }
  }, [qa.authorId]);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                {qa.topic}
              </span>
              <span className="text-gray-500 text-sm">
                {new Date(qa.createdAt).toLocaleDateString('he-IL')}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-primary-900 mb-2">
              {qa.question}
            </h3>
          </div>
          <button className="text-primary-600 p-2">
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6">
          <div className="pt-4 border-t">
            {qa.answer ? (
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: qa.answer }}
              />
            ) : (
              <div className="prose prose-lg max-w-none text-gray-500">
                אין תשובה עדיין
              </div>
            )}
            <div className="mt-4 text-sm text-gray-500 text-left">
              נכתב ע"י: {author ? `הרב ${author.firstName} ${author.lastName}` : 'טוען...'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
