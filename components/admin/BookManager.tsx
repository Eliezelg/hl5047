'use client';

import React, { useState, useEffect } from 'react';
import { Book } from '@/types';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useToast } from "@/components/ui/toast";

const BookManager = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState<Partial<Book>>({});
  const [currentImage, setCurrentImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await fetch('/api/books');
      if (!response.ok) {
        throw new Error('שגיאה בטעינת הספרים');
      }
      const data = await response.json();
      // Trier les livres par ID décroissant pour avoir les plus récents en premier
      const sortedBooks = (data || []).sort((a: Book, b: Book) => b.id.localeCompare(a.id));
      setBooks(sortedBooks);
    } catch (error) {
      console.error('Error loading books:', error);
      toast("שגיאה בטעינת הספרים", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!currentBook.title?.trim()) {
      setError('נא להזין כותרת');
      return;
    }

    setIsSubmitting(true);
    try {
      let imageUrl = currentBook.imageUrl;

      if (currentImage) {
        const formData = new FormData();
        formData.append('file', currentImage);
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!uploadResponse.ok) {
          throw new Error('שגיאה בהעלאת התמונה');
        }
        
        const { url } = await uploadResponse.json();
        imageUrl = url;
      }

      const bookData = {
        ...currentBook,
        imageUrl
      };

      const response = currentBook.id
        ? await fetch('/api/books', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: currentBook.id, ...bookData }),
          })
        : await fetch('/api/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData),
          });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'שגיאה בשמירת הספר');
      }

      toast(currentBook.id ? "הספר עודכן בהצלחה" : "הספר נוסף בהצלחה", "success");

      setIsEditing(false);
      setCurrentBook({});
      setCurrentImage(null);
      loadBooks();
    } catch (error) {
      console.error('Error saving book:', error);
      setError(error instanceof Error ? error.message : 'שגיאה בשמירת הספר');
      toast('שגיאה בשמירת הספר', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק ספר זה?')) return;
    try {
      const response = await fetch('/api/books', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      
      if (!response.ok) {
        throw new Error('שגיאה במחיקת הספר');
      }
      
      toast("הספר נמחק בהצלחה", "success");
      
      loadBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
      toast("שגיאה במחיקת הספר", "error");
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => {
          setCurrentBook({});
          setIsEditing(true);
          setError(null);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
      >
        <Plus size={20} />
        הוסף ספר חדש
      </button>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">כותרת</label>
              <input
                type="text"
                value={currentBook.title || ''}
                onChange={(e) => setCurrentBook(prev => ({ ...prev, title: e.target.value }))}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">מחיר</label>
              <input
                type="text"
                value={currentBook.price || ''}
                onChange={(e) => setCurrentBook(prev => ({ ...prev, price: e.target.value }))}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">תיאור</label>
            <textarea
              value={currentBook.description || ''}
              onChange={(e) => setCurrentBook(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">קישור לנדרים פלוס</label>
            <input
              type="text"
              value={currentBook.nedarimPlusLink || ''}
              onChange={(e) => setCurrentBook(prev => ({ ...prev, nedarimPlusLink: e.target.value }))}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">תמונה</label>
            <div className="mt-1">
              {currentBook.imageUrl && (
                <img
                  src={currentBook.imageUrl}
                  alt="Current"
                  className="w-32 h-32 object-cover mb-2 rounded"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setCurrentImage(file);
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={currentBook.isNew || false}
                onChange={(e) => setCurrentBook(prev => ({ ...prev, isNew: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="text-sm font-medium text-gray-700">ספר חדש</span>
            </label>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setCurrentBook({});
                setCurrentImage(null);
                setError(null);
              }}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              disabled={isSubmitting}
            >
              ביטול
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'שומר...' : 'שמור'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.id} className="bg-white p-4 rounded shadow">
            <div className="relative h-48 mb-4">
              <img
                src={book.imageUrl || '/books/default.png'}
                alt={book.title}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setCurrentBook(book);
                    setIsEditing(true);
                    setError(null);
                  }}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => handleDelete(book.id.toString())}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            {book.price && (
              <p className="text-gray-600 mb-2">₪{book.price}</p>
            )}
            {book.description && (
              <p className="text-sm text-gray-500 mb-2">{book.description}</p>
            )}
            {book.isNew && (
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">חדש</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookManager;
