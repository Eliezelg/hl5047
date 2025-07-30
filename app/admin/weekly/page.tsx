'use client';

import BrochureUploader from '@/components/admin/BrochureUploader';

export default function WeeklyUploadPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">העלאת שיעור שבועי</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <BrochureUploader />
      </div>
    </div>
  );
}
