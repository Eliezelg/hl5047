'use client';

import React, { useState, useEffect } from 'react';
import { Book } from '@/types/books';
import { useToast } from '@/components/ui/toast';

export default function BooksAdminPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [nedarimPlusLink, setNedarimPlusLink] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isReordering, setIsReordering] = useState(false);
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
      setBooks(data);
    } catch (err) {
      setError('שגיאה בטעינת הספרים');
      toast('שגיאה בטעינת הספרים', 'error');
      console.error('Error loading books:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('nedarimPlusLink', nedarimPlusLink);
      formData.append('isNew', isNew.toString());
      
      if (coverImage) {
        formData.append('image', coverImage);
      }

      const url = editingBook ? `/api/books/${editingBook.id}` : '/api/books';
      const method = editingBook ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'שגיאה בשמירת הספר');
      }

      toast(editingBook ? 'הספר עודכן בהצלחה' : 'הספר נוסף בהצלחה', 'success');
      resetForm();
      loadBooks();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'שגיאה בשמירת הספר';
      setError(message);
      toast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('האם אתה בטוח שברצונך למחוק ספר זה?')) {
      return;
    }

    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('שגיאה במחיקת הספר');
      }

      toast('הספר נמחק בהצלחה', 'success');
      loadBooks();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'שגיאה במחיקת הספר';
      setError(message);
      toast(message, 'error');
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setTitle(book.title);
    setDescription(book.description || '');
    setPrice(book.price || '');
    setNedarimPlusLink(book.nedarimPlusLink || '');
    setIsNew(book.isNew || false);
    setCoverImage(null);
  };

  const resetForm = () => {
    setEditingBook(null);
    setTitle('');
    setDescription('');
    setPrice('');
    setNedarimPlusLink('');
    setIsNew(false);
    setCoverImage(null);
  };

  const moveBook = (index: number, direction: 'up' | 'down') => {
    const newBooks = [...books];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= books.length) return;
    
    [newBooks[index], newBooks[newIndex]] = [newBooks[newIndex], newBooks[index]];
    setBooks(newBooks);
  };

  const saveOrder = async () => {
    setLoading(true);
    try {
      const bookOrders = books.map((book, index) => ({
        id: book.id,
        displayOrder: index
      }));

      const response = await fetch('/api/books/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookOrders })
      });

      if (!response.ok) {
        throw new Error('שגיאה בשמירת הסדר');
      }

      toast('סדר הספרים נשמר בהצלחה', 'success');
      setIsReordering(false);
      loadBooks();
    } catch (err) {
      toast('שגיאה בשמירת סדר הספרים', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">ניהול ספרים</h1>
      
      <div className="flex justify-center mb-6 gap-4">
        {!isReordering ? (
          <button
            onClick={() => setIsReordering(true)}
            className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600"
          >
            סדר תצוגה
          </button>
        ) : (
          <>
            <button
              onClick={saveOrder}
              disabled={loading}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
            >
              שמור סדר
            </button>
            <button
              onClick={() => {
                setIsReordering(false);
                loadBooks();
              }}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              ביטול
            </button>
          </>
        )}
      </div>

      {!isReordering && (
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12 space-y-6">
        <div>
          <label className="block text-lg mb-2">כותרת</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-lg mb-2">תיאור</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded h-32"
            required
          />
        </div>

        <div>
          <label className="block text-lg mb-2">מחיר</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-lg mb-2">קישור נדרים פלוס</label>
          <input
            type="url"
            value={nedarimPlusLink}
            onChange={(e) => setNedarimPlusLink(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isNew}
              onChange={(e) => setIsNew(e.target.checked)}
              className="form-checkbox"
            />
            <span className="text-lg">חדש</span>
          </label>
        </div>

        <div>
          <label className="block text-lg mb-2">תמונת כריכה</label>
          <input
            type="file"
            onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
            accept="image/*"
            className="w-full p-2 border rounded"
          />
        </div>

        {error && (
          <div className="text-red-500 text-center py-2">{error}</div>
        )}

        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'שומר...' : editingBook ? 'עדכן ספר' : 'הוסף ספר'}
          </button>
          {editingBook && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              ביטול
            </button>
          )}
        </div>
      </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book, index) => (
          <div key={book.id} className="border rounded-lg p-4 shadow relative">
            {isReordering && (
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                <button
                  onClick={() => moveBook(index, 'up')}
                  disabled={index === 0}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm disabled:bg-gray-300"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveBook(index, 'down')}
                  disabled={index === books.length - 1}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm disabled:bg-gray-300"
                >
                  ↓
                </button>
                <span className="text-center font-bold">{index + 1}</span>
              </div>
            )}
            {book.imageUrl && (
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-full h-48 object-cover mb-4 rounded"
              />
            )}
            <h2 className="text-xl font-bold mb-2">{book.title}</h2>
            <p className="text-gray-600 mb-4">{book.description}</p>
            {book.price && (
              <p className="text-lg font-semibold mb-2">מחיר: {book.price}</p>
            )}
            {book.nedarimPlusLink && (
              <a
                href={book.nedarimPlusLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline block mb-2"
              >
                לרכישה בנדרים פלוס
              </a>
            )}
            {book.isNew && (
              <span className="inline-block bg-green-500 text-white px-2 py-1 rounded text-sm mb-2">
                חדש!
              </span>
            )}
            {!isReordering && (
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(book)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                >
                  ערוך
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  מחק
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
