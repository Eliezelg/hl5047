'use client';

import Link from './Link';

const DonationSection = () => {
  return (
    <section className="relative py-16">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed md:bg-scroll"
        style={{
          backgroundImage: 'url(/BinyanCatalog/binyan01.jpg)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
        }}
      />
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col h-[420px] justify-between">
          <div className="flex-grow" />
          
          <div className="w-full flex flex-col gap-8">


            <div className="text-center">
              <a
                href="/Binyan"
                className="inline-block bg-burgundy-700 text-white px-8 py-5 rounded-lg hover:bg-burgundy-600 transition-all duration-300 transform hover:scale-105 text-xl font-semibold"
              >
                לשותפות בזכויות נצח
              </a>
            </div>



          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;