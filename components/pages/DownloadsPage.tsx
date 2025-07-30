'use client';

import WeeklyDownload from '../WeeklyDownload';
import Link from 'next/link';

const DownloadsPage = () => {
  return (
    <div className="min-h-screen bg-wheat-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <WeeklyDownload />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">ארכיון</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">ארכיון גיליונות</h3>
              <Link 
                href="https://drive.google.com/drive/folders/15wm0pKC-s4o7h46mzb6fqiqZWZwJ11wo?usp=drive_link" 
                target="_blank"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
              >
                לצפייה בארכיון
              </Link>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">ארכיון עלונים</h3>
              <Link 
                href="https://drive.google.com/drive/folders/1x0tl4KtUUCZsqSTEh3tzdOQnIOxcti8k?usp=drive_link" 
                target="_blank"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
              >
                לצפייה בארכיון
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadsPage;