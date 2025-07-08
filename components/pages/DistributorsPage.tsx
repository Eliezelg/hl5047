'use client';

import { MapPin, Phone, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Distributor } from '@/types';

const DistributorsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [distributors, setDistributors] = useState<Distributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const response = await fetch('/api/distributors');
        if (!response.ok) {
          throw new Error('Failed to fetch distributors');
        }
        const data = await response.json();
        setDistributors(data);
      } catch (err) {
        setError('Error loading distributors');
        console.error('Error loading distributors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDistributors();
  }, []);

  const filteredDistributors = distributors.filter(distributor => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      (distributor.city?.toLowerCase().includes(searchLower) ?? false) ||
      (distributor.name?.toLowerCase().includes(searchLower) ?? false)
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <main className="flex-grow">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-primary-800 mb-12">
          נקודות הפצה
        </h1>

        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <input
              type="text"
              placeholder="חיפוש לפי עיר או שם..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              dir="rtl"
            />
          </div>

          <div className="space-y-6">
            {filteredDistributors.map((distributor) => (
              <div
                key={distributor.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col space-y-4">
                  {distributor.city && (
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <MapPin className="text-primary-600" />
                      <h2 className="text-xl font-semibold text-primary-800">
                        {distributor.city}
                      </h2>
                    </div>
                  )}

                  {distributor.name && (
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <User className="text-primary-600" />
                      <span className="text-lg text-primary-700">
                        {distributor.name}
                      </span>
                    </div>
                  )}

                  {distributor.phone && (
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Phone className="text-primary-600" />
                      <a
                        href={`tel:${distributor.phone}`}
                        className="text-lg text-primary-600 hover:text-primary-800"
                      >
                        {distributor.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DistributorsPage;