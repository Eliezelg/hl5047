'use client';

import { Download } from 'lucide-react';
import Link from 'next/link';

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

const WeeklyDownload = () => {
  return (
    <section id="weekly-download" className="py-16 bg-gradient-to-b from-white to-primary-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-primary-800 mb-8 text-center">
            הורדה שבועית
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
        
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
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
    </section>
  );
};

export default WeeklyDownload;