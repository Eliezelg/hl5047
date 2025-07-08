'use client';

import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useToast } from "@/components/ui/toast";

const BrochureUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<{ type: 'alon' | 'gilion'; file?: File }[]>([
    { type: 'alon' },
    { type: 'gilion' }
  ]);
  const { toast } = useToast();

  const handleFileChange = (type: 'alon' | 'gilion', file?: File) => {
    setFiles(prev => prev.map(item => 
      item.type === type ? { ...item, file } : item
    ));
  };

  const handleUpload = async () => {
    const hasFiles = files.some(f => f.file);
    if (!hasFiles) {
      toast("נא לבחור לפחות קובץ אחד להעלאה", "error");
      return;
    }

    setUploading(true);
    try {
      for (const { type, file } of files) {
        if (!file) continue;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);
        formData.append('password', 'Lemaaseh');

        const response = await fetch('/api/weekly-upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || `שגיאה בהעלאת קובץ ${type === 'alon' ? 'העלון' : 'הגליון'}`);
        }
      }

      toast("הקבצים הועלו בהצלחה", "success");
      setFiles([{ type: 'alon' }, { type: 'gilion' }]);
    } catch (error) {
      toast(error instanceof Error ? error.message : "שגיאה בהעלאת הקבצים", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {files.map(({ type, file }) => (
          <div
            key={type}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors"
          >
            <h3 className="text-lg font-semibold mb-4">
              {type === 'alon' ? 'עלון הלכות שבת' : 'גליון בהלכות שבת'}
            </h3>
            
            {file ? (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-sm text-gray-600">{file.name}</span>
                <button
                  onClick={() => handleFileChange(type)}
                  className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                  title="הסר קובץ"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer block">
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileChange(type, file);
                  }}
                />
                <div className="flex flex-col items-center space-y-2 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <Upload className="w-12 h-12 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {type === 'alon' ? 'העלאת עלון שבועי' : 'העלאת גליון שבועי'}
                  </span>
                  <span className="text-xs text-gray-400">לחץ או גרור קובץ PDF לכאן</span>
                </div>
              </label>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleUpload}
          disabled={uploading || !files.some(f => f.file)}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {uploading ? (
            <>
              <span className="animate-spin">⌛</span>
              מעלה...
            </>
          ) : (
            <>
              <Upload size={20} />
              העלה קבצים
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BrochureUploader;
