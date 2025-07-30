'use client';

import RabbiManager from '@/components/admin/RabbiManager';

export default function RabbisPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">ניהול רבנים</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <RabbiManager />
      </div>
    </div>
  );
}
