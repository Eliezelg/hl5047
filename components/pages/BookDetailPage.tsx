'use client';

import { ExternalLink } from 'lucide-react';
import Link from '@/components/Link';
import { useEffect, useState } from 'react';
import { Book } from '@/types';

interface BookDetailPageProps {
  id: string;
}

const BookDetailPage = ({ id }: BookDetailPageProps) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${id}`);
        if (!response.ok) {
          throw new Error('Book not found');
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError('Error loading book');
        console.error('Error loading book:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-700"></div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">הספר לא נמצא</h1>
          <Link href="/books" className="text-primary-600 hover:text-primary-700">
            חזרה לרשימת הספרים
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative aspect-[3/4] max-w-md mx-auto w-full flex items-center justify-center bg-white rounded-xl shadow-lg">
            <img
              src={book.imageUrl || '/books/default.png'}
              alt={book.title}
              className="w-full h-full object-contain object-center p-2"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-primary-900 mb-4">{book.title}</h1>
            <p className="text-xl text-primary-700 font-semibold mb-6">{book.price}</p>
            
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 whitespace-pre-line">{book.description}</p>
            </div>

            {book.nedarimPlusLink && (
              <a
                href={book.nedarimPlusLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
              >
                <span>לרכישה באתר נדרים פלוס</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;