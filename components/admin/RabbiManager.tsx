'use client';

import { useState, useEffect } from 'react';
import { Rabbi, RabbiTopic, RABBI_TOPICS } from '@/types';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import ImageUpload from './ImageUpload';

const LANGUAGES = ['עברית', 'אנגלית', 'צרפתית', 'רוסית'] as const;

const defaultRabbi: Partial<Rabbi> = {
  firstName: '',
  lastName: '',
  topics: [],
  languages: [],
  address: '',
  city: '',
  description: '',
  imageUrl: '/rabbis/rav.png'
};

const RabbiManager = () => {
  const [rabbis, setRabbis] = useState<Rabbi[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRabbi, setCurrentRabbi] = useState<Partial<Rabbi>>(defaultRabbi);
  const [currentImage, setCurrentImage] = useState<File | null>(null);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateForm = () => {
    if (!currentRabbi.firstName?.trim()) {
      setError('נא להזין שם פרטי');
      return false;
    }
    if (!currentRabbi.lastName?.trim()) {
      setError('נא להזין שם משפחה');
      return false;
    }
    if (!currentRabbi.topics || currentRabbi.topics.length === 0) {
      setError('נא לבחור לפחות נושא אחד');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      let imageUrl = currentRabbi.imageUrl;

      // Upload image if there's a new one
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

      const rabbiData = {
        ...currentRabbi,
        imageUrl,
        topics: currentRabbi.topics || [],
        languages: currentRabbi.languages || []
      };

      const response = currentRabbi.id
        ? await fetch('/api/rabbis', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: currentRabbi.id, ...rabbiData }),
          })
        : await fetch('/api/rabbis', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rabbiData),
          });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'שגיאה בשמירת הרב');
      }

      setIsEditing(false);
      setCurrentRabbi(defaultRabbi);
      setCurrentImage(null);
      loadRabbis();
    } catch (error) {
      console.error('Error saving rabbi:', error);
      setError(error instanceof Error ? error.message : 'שגיאה בשמירת הרב');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('האם אתה בטוח שברצונך למחוק רב זה?')) {
      return;
    }

    try {
      const response = await fetch('/api/rabbis', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'שגיאה במחיקת הרב');
      }

      loadRabbis();
    } catch (error) {
      console.error('Error deleting rabbi:', error);
      setError('שגיאה במחיקת הרב');
    }
  };

  const loadRabbis = async () => {
    try {
      const response = await fetch('/api/rabbis');
      if (!response.ok) {
        throw new Error('שגיאה בטעינת הרבנים');
      }
      const data = await response.json();
      // Trier les rabbins par ID décroissant pour avoir les plus récents en premier
      const sortedRabbis = (data || []).sort((a: Rabbi, b: Rabbi) => 
        Number(b.id.replace(/\D/g, '')) - Number(a.id.replace(/\D/g, ''))
      );
      setRabbis(sortedRabbis);
    } catch (error) {
      console.error('Error loading rabbis:', error);
      setError('שגיאה בטעינת הרבנים');
      setRabbis([]);
    }
  };

  useEffect(() => {
    loadRabbis();
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => {
          setCurrentRabbi(defaultRabbi);
          setIsEditing(true);
          setError(null);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
      >
        <Plus size={20} />
        הוסף רב חדש
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
              <label className="block text-sm font-medium text-gray-700">שם פרטי</label>
              <input
                type="text"
                value={currentRabbi.firstName || ''}
                onChange={(e) => setCurrentRabbi(prev => ({ ...prev, firstName: e.target.value }))}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">שם משפחה</label>
              <input
                type="text"
                value={currentRabbi.lastName || ''}
                onChange={(e) => setCurrentRabbi(prev => ({ ...prev, lastName: e.target.value }))}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">עיר</label>
              <input
                type="text"
                value={currentRabbi.city || ''}
                onChange={(e) => setCurrentRabbi(prev => ({ ...prev, city: e.target.value }))}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">כתובת</label>
              <input
                type="text"
                value={currentRabbi.address || ''}
                onChange={(e) => setCurrentRabbi(prev => ({ ...prev, address: e.target.value }))}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">תיאור</label>
            <textarea
              value={currentRabbi.description || ''}
              onChange={(e) => setCurrentRabbi(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">נושאים</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {RABBI_TOPICS.map(topic => (
                <label key={topic} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentRabbi.topics?.includes(topic) || false}
                    onChange={(e) => {
                      const topics = currentRabbi.topics || [];
                      setCurrentRabbi(prev => ({
                        ...prev,
                        topics: e.target.checked
                          ? [...topics, topic]
                          : topics.filter(t => t !== topic)
                      }));
                    }}
                    className="rounded border-gray-300"
                  />
                  <span className="mr-2">{topic}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">שפות</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {LANGUAGES.map(language => (
                <label key={language} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentRabbi.languages?.includes(language) || false}
                    onChange={(e) => {
                      const languages = currentRabbi.languages || [];
                      setCurrentRabbi(prev => ({
                        ...prev,
                        languages: e.target.checked
                          ? [...languages, language]
                          : languages.filter(l => l !== language)
                      }));
                    }}
                    className="rounded border-gray-300"
                  />
                  <span className="mr-2">{language}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">תמונה</label>
            <ImageUpload
              currentImage={currentRabbi.imageUrl}
              onImageChange={setCurrentImage}
              onImageRemove={() => setCurrentRabbi(prev => ({ ...prev, imageUrl: '/rabbis/rav.png' }))}
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setCurrentRabbi(defaultRabbi);
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

      <div className="grid grid-cols-1 gap-4">
        {rabbis.map(rabbi => (
          <div key={rabbi.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{`${rabbi.firstName} ${rabbi.lastName}`}</h3>
                <p className="text-gray-600">{rabbi.city}</p>
                <div className="mt-2">
                  <div className="flex flex-wrap gap-1">
                    {rabbi.topics.map(topic => (
                      <span key={topic} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {rabbi.languages.map(language => (
                      <span key={language} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setCurrentRabbi(rabbi);
                    setIsEditing(true);
                    setError(null);
                  }}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => handleDelete(rabbi.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RabbiManager;
