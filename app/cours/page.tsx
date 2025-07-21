'use client';

import { useEffect, useState } from 'react';
import { ExternalLink, Clock, Folder, FolderOpen, RefreshCw, ChevronRight, ChevronDown, Music, Download } from 'lucide-react';
import dynamic from 'next/dynamic';

const AudioPlayer = dynamic(() => import('@/components/AudioPlayer'), { ssr: false });

interface Course {
  id: string;
  title: string;
  description: string | null;
  folder: string;
  driveUrl: string;
  duration: string | null;
  order: number;
}

// Clés pour le localStorage
const CACHE_KEY = 'courses_cache';
const CACHE_TIMESTAMP_KEY = 'courses_cache_timestamp';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [groupedCourses, setGroupedCourses] = useState<Record<string, Course[]>>({});
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [selectedMainFolder, setSelectedMainFolder] = useState<string | null>(null);
  const [mainFolders, setMainFolders] = useState<string[]>([]);

  const processCourses = (data: Course[]) => {
    // Vérifier que data est bien un tableau
    if (!Array.isArray(data)) {
      console.error('Les données reçues ne sont pas un tableau:', data);
      setCourses([]);
      setGroupedCourses({});
      setMainFolders([]);
      return;
    }
    
    setCourses(data);
    
    // Grouper les cours par dossier
    const grouped = data.reduce((acc: Record<string, Course[]>, course: Course) => {
        if (!acc[course.folder]) {
          acc[course.folder] = [];
        }
        acc[course.folder].push(course);
        return acc;
      }, {});
      
      // Trier les cours dans chaque dossier
      Object.keys(grouped).forEach(folder => {
        grouped[folder].sort((a: Course, b: Course) => {
          // Fonction pour extraire les nombres du début du titre
          const getNumber = (title: string) => {
            const match = title.match(/^(\d+)/);
            return match ? parseInt(match[1]) : 999999;
          };
          
          const numA = getNumber(a.title);
          const numB = getNumber(b.title);
          
          // Si les deux ont des nombres, trier par nombre
          if (numA !== 999999 && numB !== 999999) {
            return numA - numB;
          }
          
          // Sinon, trier alphabétiquement
          return a.title.localeCompare(b.title, 'he');
        });
      });
      
      setGroupedCourses(grouped);
      
      // Extraire les dossiers principaux (avant le ">")
      const mainFoldersSet = new Set<string>();
      Object.keys(grouped).forEach(folder => {
        const mainFolder = folder.includes(' > ') ? folder.split(' > ')[0] : folder;
        mainFoldersSet.add(mainFolder);
      });
      setMainFolders(Array.from(mainFoldersSet).sort());
  };

  const fetchCourses = async (forceRefresh = false) => {
    try {
      // Vérifier le cache sauf si on force le refresh
      if (!forceRefresh) {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        
        if (cachedData && cachedTimestamp) {
          const timestamp = parseInt(cachedTimestamp);
          const now = Date.now();
          
          // Si le cache est encore valide
          if (now - timestamp < CACHE_DURATION) {
            const data = JSON.parse(cachedData);
            processCourses(data);
            setLastSync(new Date(timestamp));
            setLoading(false);
            return;
          }
        }
      }
      
      // Sinon, récupérer depuis l'API
      const response = await fetch('/api/courses');
      const data = await response.json();
      
      // Vérifier si la réponse contient une erreur
      if (data.error) {
        console.error('Erreur API:', data.error);
        if (data.details) {
          console.error('Détails:', data.details);
        }
        if (data.hint) {
          console.error('Conseil:', data.hint);
        }
        processCourses([]);
        return;
      }
      
      // Mettre en cache
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
      
      processCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const syncWithDrive = async () => {
    setSyncing(true);
    try {
      const response = await fetch('/api/courses/sync-public');
      const result = await response.json();
      
      if (result.success) {
        setLastSync(new Date());
        // Invalider le cache et recharger les cours
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(CACHE_TIMESTAMP_KEY);
        await fetchCourses(true);
      }
    } catch (error) {
      console.error('Error syncing with Drive:', error);
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    // Charger les cours au chargement de la page
    fetchCourses();
    
    // Vérifier si on doit synchroniser (une fois par jour à 3h du matin)
    const checkAndSync = () => {
      const now = new Date();
      const lastSyncStr = localStorage.getItem('last_sync_date');
      const lastSyncDate = lastSyncStr ? new Date(lastSyncStr) : null;
      
      // Si jamais synchronisé ou si plus de 24h se sont écoulées
      if (!lastSyncDate || now.getTime() - lastSyncDate.getTime() > 24 * 60 * 60 * 1000) {
        // Si c'est entre 3h et 4h du matin, ou si jamais synchronisé
        if (!lastSyncDate || (now.getHours() === 3)) {
          syncWithDrive().then(() => {
            localStorage.setItem('last_sync_date', now.toISOString());
          });
        }
      }
    };
    
    checkAndSync();
    
    // Vérifier toutes les heures
    const interval = setInterval(checkAndSync, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleFolder = (folder: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folder)) {
      newExpanded.delete(folder);
    } else {
      newExpanded.add(folder);
    }
    setExpandedFolders(newExpanded);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8" dir="rtl">
        <div className="text-center">טוען שיעורים...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">שיעורי הרב</h1>
      </div>
      
      {/* Menu horizontal des dossiers principaux */}
      <div className="mb-8 border-b bg-gray-50">
        <div className="flex flex-wrap gap-4 p-6 justify-center">
          {mainFolders.map((folder) => (
            <button
              key={folder}
              onClick={() => setSelectedMainFolder(folder === selectedMainFolder ? null : folder)}
              className={`px-6 py-3 text-lg font-medium rounded-lg transition-all transform hover:scale-105 ${
                selectedMainFolder === folder
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 shadow-sm hover:shadow-md'
              }`}
            >
              {folder}
            </button>
          ))}
        </div>
      </div>

      {/* Contenu des sous-dossiers */}
      <div className="max-w-4xl mx-auto space-y-2">
        {selectedMainFolder && Object.entries(groupedCourses)
          .filter(([folder]) => {
            const mainFolder = folder.includes(' > ') ? folder.split(' > ')[0] : folder;
            return mainFolder === selectedMainFolder;
          })
          .sort(([folderA], [folderB]) => {
            // Extraire le nom du sous-dossier pour le tri
            const getSubfolderName = (folder: string) => {
              return folder.includes(' > ') ? folder.split(' > ')[1] : folder;
            };
            
            const nameA = getSubfolderName(folderA);
            const nameB = getSubfolderName(folderB);
            
            // Extraire les nombres pour un tri intelligent
            const getNumber = (name: string) => {
              const match = name.match(/(\d+)/);
              return match ? parseInt(match[1]) : 999999;
            };
            
            const numA = getNumber(nameA);
            const numB = getNumber(nameB);
            
            if (numA !== 999999 && numB !== 999999) {
              return numA - numB;
            }
            
            return nameA.localeCompare(nameB, 'he');
          })
          .map(([folder, folderCourses]) => {
            const isExpanded = expandedFolders.has(folder);
            const isSubFolder = folder.includes(' > ');
            const displayName = isSubFolder ? folder.split(' > ')[1] : folder;
            
            return (
              <div key={folder} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFolder(folder)}
                  className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <FolderOpen className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Folder className="h-5 w-5 text-blue-600" />
                    )}
                    <h2 className="text-lg font-semibold">{displayName}</h2>
                    <span className="text-sm text-gray-500">({folderCourses.length} שיעורים)</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                
                {isExpanded && (
                  <div className="bg-white border-t">
                    {folderCourses.map((course, index) => (
                      <div
                        key={course.id}
                        className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                          index !== folderCourses.length - 1 ? 'border-b' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <Music className="h-4 w-4 text-gray-400" />
                          <div className="flex-1">
                            <h3 className="font-medium">{course.title}</h3>
                            {course.description && (
                              <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                            )}
                            {course.duration && (
                              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                <Clock className="h-3 w-3" />
                                <span>{course.duration}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <AudioPlayer
                          fileId={course.driveUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1] || ''}
                          onDownload={() => {
                            const fileId = course.driveUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
                            if (fileId) {
                              window.open(`/api/courses/download/${fileId}`, '_blank');
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </div>
      
      {!selectedMainFolder && (
        <div className="text-center text-gray-500 mt-8">
          בחר תיקייה כדי לראות את השיעורים הזמינים
        </div>
      )}
      
      {courses.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          אין שיעורים זמינים כרגע
        </div>
      )}
    </div>
  );
}