'use client';

import QuestionsPage from '@/components/pages/QuestionsPage';
import AskQuestionForm from '@/components/AskQuestionForm';
import { useState } from 'react';

export default function Questions() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="fixed top-36 left-0 right-0 z-30 flex justify-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-burgundy-700 text-white px-6 py-3 rounded-lg hover:bg-burgundy-600 transition-all duration-300 transform hover:scale-105 text-lg"
        >
          {showForm ? 'סגור טופס' : 'לשליחת שאלה לרבני בית ההוראה הקש כאן'}
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-40 bg-white/90 backdrop-blur-sm flex items-center justify-center pt-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl mx-auto border border-accent-gold-400 relative max-h-[80vh] overflow-y-auto">
            <button 
              onClick={() => setShowForm(false)}
              className="absolute top-4 left-4 text-burgundy-700 hover:text-burgundy-500"
              aria-label="סגור טופס"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h2 className="text-xl font-semibold mb-4 text-burgundy-700">שאל את הרב</h2>
            <AskQuestionForm onSuccess={() => setShowForm(false)} />
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-burgundy-700 hover:text-burgundy-500 border border-burgundy-700 rounded-md hover:bg-gray-50"
              >
                סגור ללא שליחה
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <QuestionsPage />
      </div>
    </div>
  );
}
