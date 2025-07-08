'use client';

import QAManager from '@/components/admin/QAManager';

export default function QAPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">ניהול שאלות ותשובות</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <QAManager />
      </div>
    </div>
  );
}
