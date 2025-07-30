'use client';

import { useEffect, useState } from 'react';
import { Clock, Folder, FolderOpen, RefreshCw, ChevronRight, ChevronDown, Music, FileText, Download } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

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

// Structure hiérarchique
interface FolderStructure {
  name: string;
  path: string;
  subFolders?: FolderStructure[];
  files?: Course[];
}

// Mapping des dossiers vers les icônes
const folderIcons: Record<string, string> = {
  // Shabbat
  'שיעורים הלכות שבת בעיון + גליון סיכום לכל שיעור': '/shiour/שיעורים בעיון_שבת__דרייב.png',
  'שיעורים הלכות שבת תשפ"ב - תשפ"ה': '/shiour/שבת__פה__דרייב.png',
  'שיעורים הלכות שבת תשפ\'\'ב - תשפ\'\'ה': '/shiour/שבת__פה__דרייב.png',
  'שיעורים הלכות שבת תשע"ג - תשע"ו': '/shiour/שבת__עג__דרייב.png',
  'שיעורים הלכות שבת תשע\'\'ג - תשע\'\'ו': '/shiour/שבת__עג__דרייב.png',
  
  // Autres domaines
  'שיעורים הלכות ברכות תשע"ז - תשפ"ב': '/shiour/ברכות_דרייב.png',
  'שיעורים הלכות ברכות תשע\'\'ז - תשפ\'\'ב': '/shiour/ברכות_דרייב.png',
  'שיעורים הלכות המועדים': '/shiour/מועדים_דרייב.png',
  'איסור והיתר': '/shiour/איסור והיתר__דרייב.png',
  'שיעורים הלכות נדה -תשס"ט': '/shiour/נדה__דרייב.png',
  'שיעורים הלכות נדה -תשס\'\'ט': '/shiour/נדה__דרייב.png',
  'שיעורים הלכות בית הכנסת': '/shiour/בית כנסת__דרייב.png',
  'שיעורים הלכות ספר תורה': '/shiour/ספר תורה__דרייב.png',
  'שיעורים הלכות שמיטה - תשע"א': '/shiour/שמיטה__דרייב.png',
  'שיעורים הלכות שמיטה - תשע\'\'א': '/shiour/שמיטה__דרייב.png',
  
  // Chidons et autres
  'חידון ההלכה העולמי': '/shiour/חידון הלכה למעשה__דרייב.png',
  'חידון הלכות "החפץ חיים"': '/shiour/חידון חפץ חיים__דרייב.png',
  'שאלות ותשובות מהרדיו': '/shiour/שות רדיו__דרייב.png',
};

// Clés pour le localStorage
const CACHE_KEY = 'courses_cache';
const CACHE_TIMESTAMP_KEY = 'courses_cache_timestamp';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export default function CoursePageContent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [folderStructure, setFolderStructure] = useState<FolderStructure[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [selectedMainFolder, setSelectedMainFolder] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const buildFolderStructure = (courses: Course[]): FolderStructure[] => {
    const structure: { [key: string]: FolderStructure } = {};
    
    courses.forEach(course => {
      const parts = course.folder.split(' > ');
      
      // Niveau 1 (dossier principal)
      if (!structure[parts[0]]) {
        structure[parts[0]] = {
          name: parts[0],
          path: parts[0],
          subFolders: [],
          files: []
        };
      }
      
      if (parts.length === 1) {
        // Fichier directement dans le dossier principal
        structure[parts[0]].files!.push(course);
      } else if (parts.length === 2) {
        // Sous-dossier
        const mainFolder = structure[parts[0]];
        let subFolder = mainFolder.subFolders!.find(f => f.name === parts[1]);
        if (!subFolder) {
          subFolder = {
            name: parts[1],
            path: course.folder,
            subFolders: [],
            files: []
          };
          mainFolder.subFolders!.push(subFolder);
        }
        subFolder.files!.push(course);
      } else if (parts.length === 3) {
        // Sous-sous-dossier
        const mainFolder = structure[parts[0]];
        let subFolder = mainFolder.subFolders!.find(f => f.name === parts[1]);
        if (!subFolder) {
          subFolder = {
            name: parts[1],
            path: `${parts[0]} > ${parts[1]}`,
            subFolders: [],
            files: []
          };
          mainFolder.subFolders!.push(subFolder);
        }
        
        let subSubFolder = subFolder.subFolders!.find(f => f.name === parts[2]);
        if (!subSubFolder) {
          subSubFolder = {
            name: parts[2],
            path: course.folder,
            subFolders: [],
            files: []
          };
          subFolder.subFolders!.push(subSubFolder);
        }
        subSubFolder.files!.push(course);
      }
    });
    
    // Convertir en tableau et trier
    return Object.values(structure).sort((a, b) => a.name.localeCompare(b.name, 'he'));
  };

  const processCourses = (data: Course[]) => {
    setCourses(data);
    const structure = buildFolderStructure(data);
    setFolderStructure(structure);
  };

  const fetchCourses = async () => {
    try {
      // D'abord vérifier le cache local
      if (typeof window !== 'undefined') {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        
        if (cachedData && cachedTimestamp) {
          const timestamp = parseInt(cachedTimestamp);
          const now = Date.now();
          
          // Si le cache est encore valide
          if (now - timestamp < CACHE_DURATION) {
            const data = JSON.parse(cachedData);
            processCourses(data);
            setLoading(false);
            return;
          }
        }
      }
      
      // Sinon, récupérer depuis l'API
      const response = await fetch('/api/courses');
      const data = await response.json();
      
      processCourses(data);
      
      // Mettre en cache
      if (typeof window !== 'undefined') {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
      }
    } catch (error) {
      console.error('Erreur lors du chargement des cours:', error);
      
      // En cas d'erreur, essayer d'utiliser le cache même s'il est expiré
      if (typeof window !== 'undefined') {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const data = JSON.parse(cachedData);
          processCourses(data);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const syncWithDrive = async () => {
    try {
      setSyncing(true);
      
      // Appeler l'API de synchronisation
      const response = await fetch('/api/courses/sync-public', {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la synchronisation');
      }
      
      // Vider le cache
      if (typeof window !== 'undefined') {
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(CACHE_TIMESTAMP_KEY);
      }
      
      // Recharger les cours
      await fetchCourses();
    } catch (error) {
      console.error('Erreur lors de la synchronisation:', error);
      alert('Erreur lors de la synchronisation avec Google Drive');
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    
    // Synchronisation automatique toutes les 24h
    const now = new Date();
    const lastSyncStr = localStorage.getItem('last_sync_date');
    const lastSyncDate = lastSyncStr ? new Date(lastSyncStr) : null;
    
    // Si jamais synchronisé ou dernière sync > 24h
    if (!lastSyncDate || now.getTime() - lastSyncDate.getTime() > 24 * 60 * 60 * 1000) {
      // Et si c'est entre 3h et 4h du matin
      if (!lastSyncDate || (now.getHours() === 3)) {
        syncWithDrive().then(() => {
          localStorage.setItem('last_sync_date', now.toISOString());
        });
      }
    }

    // Gérer les paramètres de recherche
    const folderParam = searchParams.get('folder');
    if (folderParam) {
      setSelectedMainFolder(folderParam);
      setExpandedFolders(new Set([folderParam]));
    }
  }, [searchParams]);

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const selectMainFolder = (folderName: string | null) => {
    setSelectedMainFolder(folderName);
    if (folderName) {
      setExpandedFolders(new Set([folderName]));
    } else {
      setExpandedFolders(new Set());
    }
  };

  const getCourseDuration = (url: string): string => {
    const course = courses.find(c => c.driveUrl === url);
    return course?.duration || '';
  };

  const renderFolder = (folder: FolderStructure, level: number = 0) => {
    const isExpanded = expandedFolders.has(folder.path);
    const hasContent = (folder.files && folder.files.length > 0) || (folder.subFolders && folder.subFolders.length > 0);
    const folderIcon = folderIcons[folder.name] || null;
    
    return (
      <div key={folder.path} className={`${level > 0 ? 'mr-4' : ''}`}>
        <div
          className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
            level === 0 ? 'hover:bg-primary-50 font-semibold' : 'hover:bg-gray-50'
          }`}
          onClick={() => hasContent && toggleFolder(folder.path)}
        >
          {hasContent && (
            <div className="ml-2">
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </div>
          )}
          {folderIcon && (
            <img 
              src={folderIcon} 
              alt={folder.name} 
              className="w-8 h-8 ml-2 ml-2 object-contain"
            />
          )}
          {isExpanded ? <FolderOpen className={`w-5 h-5 text-primary-600 ${!folderIcon ? 'ml-2' : 'ml-1'}`} /> : <Folder className={`w-5 h-5 text-primary-600 ${!folderIcon ? 'ml-2' : 'ml-1'}`} />}
          <span className={`mr-2 ${level === 0 ? 'text-primary-800' : ''}`}>{folder.name}</span>
          {folder.files && folder.files.length > 0 && (
            <span className="text-sm text-gray-500">({folder.files.length})</span>
          )}
        </div>
        
        {isExpanded && (
          <div className="mr-4">
            {/* Sous-dossiers */}
            {folder.subFolders && folder.subFolders.map(subFolder => renderFolder(subFolder, level + 1))}
            
            {/* Fichiers */}
            {folder.files && folder.files.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center flex-1">
                  <Music className="w-4 h-4 text-gray-400 ml-2" />
                  <span className="mr-2 text-sm line-clamp-1">{course.title}</span>
                  {course.duration && (
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 ml-1" />
                      {course.duration}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <AudioPlayer 
                    fileId={course.id}
                    downloadUrl={course.driveUrl}
                  />
                  <a
                    href={course.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:bg-primary-100 rounded transition-colors"
                    title="הורדה"
                  >
                    <Download className="w-4 h-4 text-primary-600" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const filteredFolders = selectedMainFolder 
    ? folderStructure.filter(f => f.name === selectedMainFolder)
    : folderStructure;

  if (loading) {
    return (
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
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-primary-800">שיעורי הרב</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {courses.length} שיעורים
              </span>
              <button
                onClick={syncWithDrive}
                disabled={syncing}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? 'מסנכרן...' : 'סנכרון עם Drive'}
              </button>
            </div>
          </div>

          {/* כפתורי סינון */}
          <div className="flex flex-wrap gap-2 mb-6 p-4 bg-gray-50 rounded-lg">
            <button
              onClick={() => selectMainFolder(null)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                !selectedMainFolder 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              כל השיעורים
            </button>
            {folderStructure.map(folder => {
              const folderIcon = folderIcons[folder.name];
              return (
                <button
                  key={folder.name}
                  onClick={() => selectMainFolder(folder.name)}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    selectedMainFolder === folder.name 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {folderIcon && (
                    <img 
                      src={folderIcon} 
                      alt={folder.name} 
                      className="w-6 h-6 object-contain"
                    />
                  )}
                  {folder.name}
                </button>
              );
            })}
          </div>

          {/* מבנה תיקיות */}
          <div className="space-y-1">
            {filteredFolders.map(folder => renderFolder(folder))}
          </div>
        </div>
      </div>
    </div>
  );
}