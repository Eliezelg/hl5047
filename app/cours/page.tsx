'use client';

import { useEffect, useState } from 'react';
import { Clock, Folder, FolderOpen, RefreshCw, ChevronRight, ChevronDown, Music, FileText, Download } from 'lucide-react';
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

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [folderStructure, setFolderStructure] = useState<FolderStructure[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [selectedMainFolder, setSelectedMainFolder] = useState<string | null>(null);

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
            files: []
          };
          subFolder.subFolders!.push(subSubFolder);
        }
        subSubFolder.files!.push(course);
      }
    });
    
    // Trier les structures
    Object.values(structure).forEach(folder => {
      sortFolder(folder);
    });
    
    return Object.values(structure).sort((a, b) => a.name.localeCompare(b.name, 'he'));
  };

  const sortFolder = (folder: FolderStructure) => {
    // Trier les sous-dossiers
    if (folder.subFolders) {
      folder.subFolders.sort((a, b) => {
        const getYear = (name: string) => {
          const match = name.match(/תש[פעסנמלכיטחזוהדגבא]['״]{0,2}[א-ת]/);
          return match ? match[0] : name;
        };
        return getYear(a.name).localeCompare(getYear(b.name), 'he');
      });
      
      // Récursivement trier les sous-dossiers
      folder.subFolders.forEach(subFolder => sortFolder(subFolder));
    }
    
    // Trier les fichiers
    if (folder.files) {
      folder.files.sort((a, b) => a.title.localeCompare(b.title, 'he'));
    }
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
            setCourses(data);
            setFolderStructure(buildFolderStructure(data));
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
        setCourses([]);
        setFolderStructure([]);
        return;
      }
      
      // Mettre en cache
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
      
      setCourses(data);
      setFolderStructure(buildFolderStructure(data));
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFile = (course: Course) => {
    const isAudio = course.driveUrl.includes('.mp3') || 
                    course.title.toLowerCase().includes('.mp3') ||
                    course.driveUrl.includes('audio');
    
    const isPDF = course.driveUrl.includes('.pdf') || 
                  course.title.toLowerCase().includes('.pdf');
    
    const fileId = course.driveUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1] || '';
    
    return (
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 hover:bg-gray-50 rounded">
        <div className="flex items-center gap-3 min-w-0">
          {isAudio ? (
            <Music className="h-4 w-4 text-gray-400 flex-shrink-0" />
          ) : (
            <FileText className="h-4 w-4 text-gray-400 flex-shrink-0" />
          )}
          <div className="min-w-0">
            <h3 className="font-medium truncate">{course.title}</h3>
            {course.duration && (
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <Clock className="h-3 w-3" />
                <span>{course.duration}</span>
              </div>
            )}
          </div>
        </div>
        <div className="w-full sm:w-auto">
          {isAudio ? (
            <AudioPlayer
              fileId={fileId}
              onDownload={() => {
                if (fileId) {
                  window.open(`/api/courses/download/${fileId}`, '_blank');
                }
              }}
            />
          ) : (
            <button
              onClick={() => {
                if (fileId) {
                  window.open(`/api/courses/download/${fileId}`, '_blank');
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>הורד</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderFolder = (folder: FolderStructure, level: number = 0) => {
    const isExpanded = expandedFolders.has(folder.path);
    const hasContent = (folder.files && folder.files.length > 0) || 
                      (folder.subFolders && folder.subFolders.length > 0);
    
    if (!hasContent) return null;
    
    return (
      <div key={folder.path} className={`${level > 0 ? 'ml-4' : ''}`}>
        <button
          onClick={() => toggleFolder(folder.path)}
          className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between rounded-lg mb-2"
        >
          <div className="flex items-center gap-3">
            {level === 0 && folderIcons[folder.name] ? (
              <img 
                src={folderIcons[folder.name]} 
                alt={folder.name} 
                className="w-6 h-6 object-contain"
              />
            ) : isExpanded ? (
              <FolderOpen className="h-5 w-5 text-blue-600" />
            ) : (
              <Folder className="h-5 w-5 text-blue-600" />
            )}
            <h2 className={`${level === 0 ? 'text-lg font-semibold' : 'text-base font-medium'}`}>
              {folder.name}
            </h2>
            <span className="text-sm text-gray-500">
              ({(folder.files?.length || 0) + (folder.subFolders?.length || 0)})
            </span>
          </div>
          {isExpanded ? (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-400" />
          )}
        </button>
        
        {isExpanded && (
          <div className="mb-4">
            {folder.subFolders && folder.subFolders.map(subFolder => 
              renderFolder(subFolder, level + 1)
            )}
            {folder.files && folder.files.length > 0 && (
              <div className="bg-white rounded-lg border ml-4">
                {folder.files.map((file, index) => (
                  <div key={file.id} className={index !== folder.files!.length - 1 ? 'border-b' : ''}>
                    {renderFile(file)}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    fetchCourses();
  }, []);

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
          {folderStructure.map((folder) => {
            const icon = folderIcons[folder.name];
            return (
              <button
                key={folder.name}
                onClick={() => {
                  setSelectedMainFolder(
                    folder.name === selectedMainFolder ? null : folder.name
                  );
                  // Ouvrir automatiquement le dossier principal quand on clique sur l'icône
                  if (folder.name !== selectedMainFolder) {
                    const newExpanded = new Set(expandedFolders);
                    newExpanded.add(folder.path);
                    setExpandedFolders(newExpanded);
                  }
                }}
                className={`flex flex-col items-center gap-2 p-4 text-lg font-medium rounded-lg transition-all transform hover:scale-105 ${
                  selectedMainFolder === folder.name
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 shadow-sm hover:shadow-md'
                }`}
              >
                {icon && (
                  <img 
                    src={icon} 
                    alt={folder.name} 
                    className="w-16 h-16 object-contain"
                  />
                )}
                <span>{folder.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto">
        {selectedMainFolder && (
          <div>
            {folderStructure
              .filter(folder => folder.name === selectedMainFolder)
              .map(folder => renderFolder(folder))
            }
          </div>
        )}
        
        {!selectedMainFolder && (
          <div className="text-center text-gray-500 mt-8">
            בחר תיקייה כדי לראות את השיעורים הזמינים
          </div>
        )}
      </div>
    </div>
  );
}