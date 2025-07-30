'use client';

import Link from '@/components/Link';
import { useEffect, useState } from 'react';
import { Book } from '@/types';

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError('Error loading books');
        console.error('Error loading books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-burgundy-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-wheat-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-center text-burgundy-700">ספרי מורינו הגאון הרב אופיר יצחק מלכא שליט"א</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {books.map(book => (
            <Link key={book.id} href={`/books/${book.id}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="relative aspect-[3/4] max-h-[300px] flex items-center justify-center bg-white">
                  {book.isNew && (
                    <div className="absolute top-2 right-2 bg-burgundy-600 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                      חדש
                    </div>
                  )}
                  {book.imageUrl ? (
                    <img 
                      src={book.imageUrl} 
                      alt={book.title} 
                      className="w-full h-full object-contain object-center p-2"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400">אין תמונה</span>
                    </div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg mb-2 text-burgundy-700">{book.title}</h3>
                  <span className="text-base font-semibold text-accent-gold-600 whitespace-pre-line">{book.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksPage;