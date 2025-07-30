'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BrochureUploader from '@/components/admin/BrochureUploader';
import RabbiManager from '@/components/admin/RabbiManager';
import QAManager from '@/components/admin/QAManager';
import BookManager from '@/components/admin/BookManager';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'default_password';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('סיסמה שגויה');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-primary-800">
            כניסת מנהל
          </h2>
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div>
              <label htmlFor="password" className="sr-only">
                סיסמה
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="סיסמה"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              כניסה
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-grow">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-primary-800 mb-12">
          ניהול האתר
        </h1>

        <div className="max-w-6xl mx-auto space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-primary-700 mb-6">
              העלאת עלונים שבועיים
            </h2>
            <BrochureUploader />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 mb-6">
              ניהול רבני בית ההוראה
            </h2>
            <RabbiManager />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 mb-6">
              ניהול שאלות ותשובות
            </h2>
            <QAManager />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 mb-6">
              ניהול ספרים
            </h2>
            <BookManager />
          </section>
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
