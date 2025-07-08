'use client';

import DistributorManager from '@/components/admin/DistributorManager';

export default function DistributorsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">ניהול מפיצים</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <DistributorManager />
      </div>
    </div>
  );
}
