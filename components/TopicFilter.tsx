'use client';

import { QuestionTopic, QUESTION_TOPICS } from '@/types';

interface TopicFilterProps {
  selectedTopic: QuestionTopic | 'all';
  onTopicChange: (topic: QuestionTopic | 'all') => void;
}

const TopicFilter: React.FC<TopicFilterProps> = ({ selectedTopic, onTopicChange }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <button
        onClick={() => onTopicChange('all')}
        className={`px-4 py-2 rounded-full transition-colors ${
          selectedTopic === 'all'
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
        }`}
      >
        הכל
      </button>
      {QUESTION_TOPICS.map((topic) => (
        <button
          key={topic}
          onClick={() => onTopicChange(topic)}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedTopic === topic
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
        >
          {topic}
        </button>
      ))}
    </div>
  );
};

export default TopicFilter;
