import React from 'react';
import { muktzehItems, MuktzehItem, MuktzehCategory } from '@/data/muktzeh/muktzeh';

const MuktzehList = () => {
  return (
    <div className="space-y-8">
      {muktzehItems.map((category: MuktzehCategory) => (
        <div key={category.title} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold mb-4 text-right">{category.title}</h2>
          <div className="space-y-2">
            {category.items.map((item: MuktzehItem, index: number) => (
              <div 
                key={`${category.title}-${index}`}
                className="flex justify-between items-start p-2 hover:bg-gray-50 rounded-md"
                dir="rtl"
              >
                <div className="flex-1">
                  <span className="font-semibold">{item.name}</span>
                  <span className="mx-2">-</span>
                  <span className={`${
                    item.status === 'מותר' ? 'text-green-600' :
                    item.status.includes('מוקצה') ? 'text-red-600' :
                    'text-orange-600'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <span className="text-gray-500 text-sm">{item.source}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MuktzehList;
