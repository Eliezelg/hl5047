import { Suspense } from 'react';
import CoursePageContent from './CoursePageContent';

export default function CoursesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">טוען שיעורים...</p>
            </div>
          </div>
        </div>
      </div>
    }>
      <CoursePageContent />
    </Suspense>
  );
}