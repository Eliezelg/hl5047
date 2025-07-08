'use client';

import React from 'react';
import { Clock, MapPin } from 'lucide-react';

interface Shiur {
  days: string[];
  time: string;
  location: string;
  address: string;
  city: string;
  note?: string;
}

const shiurim: Shiur[] = [
  {
    days: ['ראשון', 'שני', 'שלישי'],
    time: '19:30',
    location: 'ישיבת אור החיים',
    address: 'רחוב עזרא 1',
    city: 'ירושלים'
  },
  {
    days: ['רביעי'],
    time: '22:15',
    location: 'ביה"כ יביע אומר',
    address: 'הרב עוזיאל 43',
    city: 'בני ברק'
  },
  {
    days: ['חמישי'],
    time: '11:00',
    location: 'כולל תורת שמעון בהר נוף',
    address: 'הר נוף',
    city: 'ירושלים'
  },
  {
    days: ['חמישי'],
    time: '17:30',
    location: 'קרית נוער',
    address: 'בית וגן שער 9',
    city: 'ירושלים'
  },
  {
    days: ['שישי'],
    time: '12:30',
    location: 'ביה"כ החיד"א',
    address: 'יצחק הנשיא 22',
    city: 'אשדוד'
  },
  {
    days: ['שישי'],
    time: '11:00',
    location: 'ביה"כ אור החיים',
    address: '',
    city: 'קרית גת',
    note: 'אחת לשבועיים'
  },
  {
    days: ['שישי'],
    time: '11:00',
    location: 'ביה"כ יוסף שלום',
    address: 'רחוב עין גנים 5, גני תקווה, קרית אונו ',
    city: 'גני תקווה, קרית אונו',
    note: 'אחת לשבועיים'
  },
  {
    days: ['שבת'],
    time: 'אחר תפילת מוסף',
    location: 'ביה"כ שערי ניסים',
    address: 'רחוב שאול המלך 40',
    city: 'ירושלים'
  }
];

const ShiurimPage: React.FC = () => {
  // Grouper les shiurim par ville
  const shiurimByCity = shiurim.reduce((acc, shiur) => {
    if (!acc[shiur.city]) {
      acc[shiur.city] = [];
    }
    acc[shiur.city].push(shiur);
    return acc;
  }, {} as Record<string, Shiur[]>);

  return (
    <main className="flex-grow">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-primary-800 mb-4">
          שיעורי מורינו
        </h1>
        <h2 className="text-2xl text-center text-primary-600 mb-12">
          הגאון הרב אופיר מלכא שליט"א ברחבי הארץ
        </h2>

        <div className="max-w-4xl mx-auto">
          {Object.entries(shiurimByCity).map(([city, cityShiurim]) => (
            <div key={city} className="mb-10">
              <h3 className="text-2xl font-bold text-accent-gold-600 mb-6 text-center">
                {city}
              </h3>
              <div className="grid gap-6">
                {cityShiurim.map((shiur) => (
                  <div
                    key={`${shiur.city}-${shiur.location}-${shiur.time}`}
                    className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-accent-gold-400 flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-bold text-lg text-primary-800">
                            ימי {shiur.days.join(', ')} {shiur.time}
                          </div>
                          {shiur.note && (
                            <div className="text-accent-gold-600 text-sm mt-1">
                              {shiur.note}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-accent-gold-400 flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-bold text-primary-800">
                            {shiur.location}
                          </div>
                          {shiur.address && (
                            <div className="text-primary-600 text-sm">
                              {shiur.address}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ShiurimPage;