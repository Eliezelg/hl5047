'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw, Music, Folder, Trash2 } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string | null;
  folder: string;
  driveUrl: string;
  duration: string | null;
  order: number;
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [groupedCourses, setGroupedCourses] = useState<Record<string, Course[]>>({});
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // בדיקת אימות
    const isAuthenticated = document.cookie.includes('admin_auth=');
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    fetchCourses();
  }, [router]);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setCourses(data);
        
        // קבץ לפי תיקיה
        const grouped = data.reduce((acc: Record<string, Course[]>, course: Course) => {
          if (!acc[course.folder]) {
            acc[course.folder] = [];
          }
          acc[course.folder].push(course);
          return acc;
        }, {});
        
        setGroupedCourses(grouped);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const syncWithDrive = async () => {
    setSyncing(true);
    setSyncResult(null);
    try {
      const response = await fetch('/api/courses/sync-public');
      const result = await response.json();
      
      if (result.success) {
        setSyncResult(`הסנכרון הצליח! ${result.coursesAdded} שיעורים נוספו, ${result.coursesUpdated} שיעורים עודכנו.`);
        // טען מחדש את השיעורים
        await fetchCourses();
      } else {
        setSyncResult(`שגיאה: ${result.error || 'הסנכרון נכשל'}`);
      }
    } catch (error) {
      console.error('Error syncing with Drive:', error);
      setSyncResult('שגיאה בעת הסנכרון');
    } finally {
      setSyncing(false);
    }
  };

  const deleteCourse = async (id: string) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק שיעור זה?')) return;
    
    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await fetchCourses();
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">טוען...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">ניהול שיעורים</h1>
        <button
          onClick={syncWithDrive}
          disabled={syncing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-5 w-5 ${syncing ? 'animate-spin' : ''}`} />
          <span>{syncing ? 'מסנכרן...' : 'סנכרן עם Google Drive'}</span>
        </button>
      </div>

      {syncResult && (
        <div className={`mb-4 p-4 rounded-lg ${syncResult.includes('שגיאה') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {syncResult}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4 text-sm text-gray-600">
          סה"כ: {courses.length} שיעורים ב-{Object.keys(groupedCourses).length} תיקיות
        </div>

        <div className="space-y-6">
          {Object.entries(groupedCourses)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([folder, folderCourses]) => (
              <div key={folder} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Folder className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-semibold">{folder}</h2>
                  <span className="text-sm text-gray-500">({folderCourses.length} שיעורים)</span>
                </div>

                <div className="space-y-2">
                  {folderCourses
                    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
                    .map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <Music className="h-4 w-4 text-gray-400" />
                          <div className="flex-1">
                            <h3 className="font-medium">{course.title}</h3>
                            {course.duration && (
                              <span className="text-sm text-gray-500">משך: {course.duration}</span>
                            )}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => deleteCourse(course.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="מחק"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}