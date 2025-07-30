'use client';

import { useState, useEffect } from 'react';
import { QA, QuestionTopic, Rabbi, QUESTION_TOPICS } from '@/types';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useToast } from "@/components/ui/toast";

const defaultQA: Partial<QA> = {
  topic: QUESTION_TOPICS[0],
  question: '',
  answer: '',
  authorId: '',
  createdAt: new Date().toISOString()
};

const QAManager = () => {
  const [qas, setQAs] = useState<QA[]>([]);
  const [rabbis, setRabbis] = useState<Rabbi[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentQA, setCurrentQA] = useState<Partial<QA>>(defaultQA);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unanswered' | 'answered'>('all');
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    loadRabbis();
    loadQAs();
  }, []);

  const loadRabbis = async () => {
    try {
      const response = await fetch('/api/rabbis');
      if (!response.ok) {
        throw new Error('שגיאה בטעינת רשימת הרבנים');
      }
      const data = await response.json();
      setRabbis(data);
    } catch (err) {
      toast('שגיאה בטעינת הרבנים', 'error');
      console.error('Error loading rabbis:', err);
    }
  };

  const loadQAs = async () => {
    try {
      const response = await fetch('/api/qa', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      if (!response.ok) {
        throw new Error('שגיאה בטעינת השאלות');
      }
      const data = await response.json();
      setQAs(data);
    } catch (err) {
      toast('שגיאה בטעינת השאלות', 'error');
      console.error('Error loading QAs:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        currentQA.id ? `/api/qa/${currentQA.id}` : '/api/qa',
        {
          method: currentQA.id ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(currentQA),
        }
      );

      if (!response.ok) {
        throw new Error('שגיאה בשמירת השאלה');
      }

      toast(
        currentQA.id ? 'השאלה עודכנה בהצלחה' : 'השאלה נוספה בהצלחה',
        'success'
      );
      setIsEditing(false);
      setCurrentQA(defaultQA);
      loadQAs();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בשמירת השאלה');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('האם אתה בטוח שברצונך למחוק שאלה זו?')) {
      return;
    }

    try {
      const response = await fetch(`/api/qa/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('שגיאה במחיקת השאלה');
      }

      toast('השאלה נמחקה בהצלחה', 'success');
      loadQAs();
    } catch (error) {
      toast('שגיאה במחיקת השאלה', 'error');
      console.error('Error deleting QA:', error);
    }
  };

  const filteredQAs = qas.filter(qa => {
    if (filter === 'unanswered') return qa.answer === null || qa.answer === undefined || qa.answer.trim() === '';
    if (filter === 'answered') return qa.answer !== null && qa.answer !== undefined && qa.answer.trim() !== '';
    return true;
  });

  if (!mounted) return null;

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">כל השאלות</option>
            <option value="unanswered">שאלות ללא מענה</option>
            <option value="answered">שאלות שנענו</option>
          </select>
        </div>
        <button
          onClick={() => {
            setCurrentQA(defaultQA);
            setIsEditing(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          הוסף שאלה חדשה
        </button>
      </div>

      {isEditing ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            {currentQA.id ? 'ערוך שאלה' : 'שאלה חדשה'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">נושא</label>
              <select
                value={currentQA.topic || ''}
                onChange={(e) => setCurrentQA(prev => ({ ...prev, topic: e.target.value as QuestionTopic }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                {QUESTION_TOPICS.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">שאלה</label>
              <textarea
                value={currentQA.question || ''}
                onChange={(e) => setCurrentQA(prev => ({ ...prev, question: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">תשובה</label>
              <textarea
                value={currentQA.answer || ''}
                onChange={(e) => setCurrentQA(prev => ({ ...prev, answer: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">רב</label>
              <select
                value={currentQA.authorId || ''}
                onChange={(e) => setCurrentQA(prev => ({ ...prev, authorId: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">בחר רב</option>
                {rabbis.map((rabbi) => (
                  <option key={rabbi.id} value={rabbi.id}>
                    {rabbi.firstName} {rabbi.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentQA(defaultQA);
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                ביטול
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'שומר...' : currentQA.id ? 'עדכן' : 'הוסף'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQAs.map((qa) => (
            <div key={qa.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-sm font-medium text-gray-500">{qa.topic}</span>
                  {(!qa.answer || qa.answer.trim() === '') && (
                    <span className="ml-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                      ממתין לתשובה
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setCurrentQA(qa);
                      setIsEditing(true);
                    }}
                    className="text-blue-600 hover:text-blue-700"
                    title="ערוך"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(qa.id)}
                    className="text-red-600 hover:text-red-700"
                    title="מחק"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <p className="text-gray-900 mb-2">{qa.question}</p>
              {qa.askerName && (
                <p className="text-sm text-gray-500">
                  נשאל על ידי: {qa.askerName}
                </p>
              )}
              {qa.answer && qa.answer.trim() !== '' && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-gray-900">{qa.answer}</p>
                  {qa.author && (
                    <p className="text-sm text-gray-500 mt-2">
                      נענה על ידי: {qa.author.firstName} {qa.author.lastName}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QAManager;
