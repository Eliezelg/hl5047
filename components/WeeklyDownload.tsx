'use client';

import { Download } from 'lucide-react';

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
      </div>
    </section>
  );
};

export default WeeklyDownload;