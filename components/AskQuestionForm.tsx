'use client';

import { useState } from 'react';
import { QUESTION_TOPICS, QuestionTopic } from '@/types';
import { useToast } from "@/components/ui/toast";

interface AskQuestionFormProps {
  onSuccess?: () => void;
}

export default function AskQuestionForm({ onSuccess }: AskQuestionFormProps) {
  const [formData, setFormData] = useState<{
    topic: QuestionTopic;
    question: string;
    askerName?: string;
    askerEmail?: string;
  }>({
    topic: QUESTION_TOPICS[0],
    question: '',
    askerName: '',
    askerEmail: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/qa/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('שגיאה בשליחת השאלה');
      }

      toast('השאלה נשלחה בהצלחה', 'success');
      setFormData({
        topic: QUESTION_TOPICS[0],
        question: '',
        askerName: '',
        askerEmail: '',
      });
      onSuccess?.();
    } catch (error) {
      toast('שגיאה בשליחת השאלה', 'error');
      console.error('Error submitting question:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
          נושא
        </label>
        <select
          id="topic"
          value={formData.topic}
          onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value as QuestionTopic }))}
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
        <label htmlFor="question" className="block text-sm font-medium text-gray-700">
          השאלה שלך
        </label>
        <textarea
          id="question"
          value={formData.question}
          onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={4}
          required
        />
      </div>

      <div>
        <label htmlFor="askerName" className="block text-sm font-medium text-gray-700">
          שם (אופציונלי)
        </label>
        <input
          type="text"
          id="askerName"
          value={formData.askerName}
          onChange={(e) => setFormData(prev => ({ ...prev, askerName: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="askerEmail" className="block text-sm font-medium text-gray-700">
          דוא"ל (אופציונלי)
        </label>
        <input
          type="email"
          id="askerEmail"
          value={formData.askerEmail}
          onChange={(e) => setFormData(prev => ({ ...prev, askerEmail: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-burgundy-700 hover:bg-burgundy-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burgundy-500 disabled:opacity-50"
      >
        {isSubmitting ? 'שולח...' : 'שלח שאלה'}
      </button>
    </form>
  );
}
