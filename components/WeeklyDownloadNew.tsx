'use client';

import { Download, Folder, FolderOpen, FileText, ChevronRight, ChevronDown, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface ArchiveItem {
  id: string;
  title: string;
  driveUrl: string;
  folder: string;
  type: 'pdf' | 'folder';
  createdTime?: string;
  modifiedTime?: string;
}

interface FolderStructure {
  name: string;
  path: string;
  files: ArchiveItem[];
  subFolders?: FolderStructure[];
}

const DownloadCard = ({ title, description, downloadUrl }: { title: string; description: string; downloadUrl: string }) => (
  <div className="bg-white rounded-xl shadow-lg p-8">
    <h3 className="text-2xl font-bold text-primary-800 mb-4">{title}</h3>
    <p className="text-lg text-primary-600 mb-6">{description}</p>
    <div className="flex flex-col items-center gap-6">
      <a
        href={downloadUrl}
        download
        className="inline-flex items-center gap-3 bg-primary-700 text-white px-8 py-4 rounded-xl font-medium hover:bg-primary-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        <Download className="w-6 h-6" />
        <span>להורדה</span>
      </a>
    </div>
  </div>
);

const WeeklyDownloadNew = () => {
  const [archivesGiliionot, setArchivesGiliionot] = useState<ArchiveItem[]>([]);
  const [archivesAlonim, setArchivesAlonim] = useState<ArchiveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [folderStructureGiliionot, setFolderStructureGiliionot] = useState<FolderStructure[]>([]);
  const [folderStructureAlonim, setFolderStructureAlonim] = useState<FolderStructure[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'giliionot' | 'alonim'>('giliionot');

  const buildFolderStructure = (items: ArchiveItem[]): FolderStructure[] => {
    const structure: { [key: string]: FolderStructure } = {};
    
    items.forEach(item => {
      const parts = item.folder.split(' > ');
      
      // Extraire l'année du nom du fichier ou du dossier
      const yearMatch = item.title.match(/תש[פעסנמלכיטחזוהדגבא]['״]{0,2}[א-ת]/);
      const year = yearMatch ? yearMatch[0] : 'אחר';
      
      if (!structure[year]) {
        structure[year] = {
          name: year,
          path: year,
          files: [],
          subFolders: []
        };
      }
      
      structure[year].files.push(item);
    });
    
    // Trier les années
    const sortedYears = Object.keys(structure).sort((a, b) => {
      if (a === 'אחר') return 1;
      if (b === 'אחר') return -1;
      return b.localeCompare(a, 'he');
    });
    
    return sortedYears.map(year => structure[year]);
  };

  const fetchArchives = async () => {
    try {
      // Fetch both archives in parallel
      const [responseGiliionot, responseAlonim] = await Promise.all([
        fetch('/api/archives'),
        fetch('/api/archives-alonim')
      ]);
      
      const [dataGiliionot, dataAlonim] = await Promise.all([
        responseGiliionot.json(),
        responseAlonim.json()
      ]);
      
      if (dataGiliionot.error) {
        console.error('Error fetching giliionot archives:', dataGiliionot.error);
        setArchivesGiliionot([]);
        setFolderStructureGiliionot([]);
      } else {
        setArchivesGiliionot(dataGiliionot);
        setFolderStructureGiliionot(buildFolderStructure(dataGiliionot));
      }
      
      if (dataAlonim.error) {
        console.error('Error fetching alonim archives:', dataAlonim.error);
        setArchivesAlonim([]);
        setFolderStructureAlonim([]);
      } else {
        setArchivesAlonim(dataAlonim);
        setFolderStructureAlonim(buildFolderStructure(dataAlonim));
      }
    } catch (error) {
      console.error('Error fetching archives:', error);
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

  const renderFile = (file: ArchiveItem) => {
    const fileId = file.driveUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1] || file.id;
    
    return (
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 hover:bg-gray-50 rounded">
        <div className="flex items-center gap-3 min-w-0">
          <FileText className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <div className="min-w-0">
            <h3 className="font-medium truncate">{file.title}</h3>
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <a
            href={`/api/archives/download/${fileId}`}
            download
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>הורד</span>
          </a>
        </div>
      </div>
    );
  };

  const renderFolder = (folder: FolderStructure) => {
    const isExpanded = expandedFolders.has(folder.path);
    const hasContent = folder.files.length > 0;
    
    if (!hasContent) return null;
    
    return (
      <div key={folder.path} className="mb-4">
        <button
          onClick={() => toggleFolder(folder.path)}
          className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between rounded-lg mb-2"
        >
          <div className="flex items-center gap-3">
            {isExpanded ? (
              <FolderOpen className="h-5 w-5 text-blue-600" />
            ) : (
              <Folder className="h-5 w-5 text-blue-600" />
            )}
            <h2 className="text-lg font-semibold">{folder.name}</h2>
            <span className="text-sm text-gray-500">({folder.files.length})</span>
          </div>
          {isExpanded ? (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-400" />
          )}
        </button>
        
        {isExpanded && (
          <div className="bg-white rounded-lg border">
            {folder.files.map((file, index) => (
              <div key={file.id} className={index !== folder.files.length - 1 ? 'border-b' : ''}>
                {renderFile(file)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    fetchArchives();
  }, []);

  return (
    <section id="weekly-download" className="py-16 bg-gradient-to-b from-white to-primary-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-primary-800 mb-8 text-center">
            הורדה שבועית
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <DownloadCard
              title="עלון הלכות שבת"
              description="שיעור השבועי בהלכות שבת"
              downloadUrl="/downloads/weekly-alon.pdf"
            />
            <DownloadCard
              title="גליון בהלכות שבת"
              description="שיעור השבועי המורחב בהלכות שבת"
              downloadUrl="/downloads/weekly-gilion.pdf"
            />
          </div>
        </div>
        
        {/* Section Archives avec navigation similaire à la page cours */}
        <div className="max-w-5xl mx-auto mt-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">ארכיון</h2>
              <button
                onClick={() => fetchArchives()}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>רענן</span>
              </button>
            </div>
            
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b">
              <button
                onClick={() => {
                  setActiveTab('giliionot');
                  setSelectedYear(null);
                }}
                className={`px-6 py-3 font-medium transition-all ${
                  activeTab === 'giliionot'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                ארכיון גיליונות
              </button>
              <button
                onClick={() => {
                  setActiveTab('alonim');
                  setSelectedYear(null);
                }}
                className={`px-6 py-3 font-medium transition-all ${
                  activeTab === 'alonim'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                ארכיון עלונים
              </button>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">טוען ארכיון...</p>
              </div>
            ) : (
              <>
                {/* Menu horizontal des années */}
                <div className="flex flex-wrap gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
                  {(activeTab === 'giliionot' ? folderStructureGiliionot : folderStructureAlonim).map((folder) => (
                    <button
                      key={folder.name}
                      onClick={() => {
                        setSelectedYear(folder.name === selectedYear ? null : folder.name);
                        if (folder.name !== selectedYear) {
                          const newExpanded = new Set(expandedFolders);
                          newExpanded.add(folder.path);
                          setExpandedFolders(newExpanded);
                        }
                      }}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedYear === folder.name
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {folder.name}
                    </button>
                  ))}
                </div>
                
                {/* Contenu */}
                {selectedYear && (
                  <div>
                    {(activeTab === 'giliionot' ? folderStructureGiliionot : folderStructureAlonim)
                      .filter(folder => folder.name === selectedYear)
                      .map(folder => renderFolder(folder))
                    }
                  </div>
                )}
                
                {!selectedYear && (
                  <div className="text-center text-gray-500 py-8">
                    <p className="text-lg">
                      בחר שנה מהתפריט למעלה כדי לראות את ה{activeTab === 'giliionot' ? 'גיליונות' : 'עלונים'} הזמינים
                    </p>
                  </div>
                )}
              </>
            )}
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeeklyDownloadNew;