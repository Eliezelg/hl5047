import React from 'react';

interface Blessing {
  name: string;
  description: string;
}

interface BlessingCategoryProps {
  title: string;
  blessings: Blessing[];
}

const BlessingCategory: React.FC<BlessingCategoryProps> = ({ title, blessings }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4 text-right">{title}</h3>
      <div className="space-y-4">
        {blessings.map((blessing, index) => (
          <div key={index} className="border-b pb-4 text-right">
            <div className="font-medium text-lg">{blessing.name}</div>
            <div className="text-gray-600">{blessing.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlessingCategory;
