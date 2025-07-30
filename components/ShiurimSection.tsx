'use client';

const shiurimData = [
  {
    image: '/shiurim/kolhalachon.png',
    title: 'שיעורים בקול הלשון',
    description: 'מגוון שיעורים בכל נושאי ההלכה',
    link: 'https://www2.kolhalashon.com/#/regularSite/ravs/1810/1/1'
  },
  {
    image: '/shiurim/Youtube.png',
    title: 'שיעורים ביוטיוב פתוח בנטפרי',
    description: 'שיעורים יומיים קצרים וכן כל שיעורי הרב',
    link: 'https://www.youtube.com/channel/UCiT6KgOE1IDJ2XHE23Zk2Cg'
  },
  {
    image: '/shiurim/bnebrak.png',
    title: 'השיעור ביה"כ יביע אומר בני ברק',
    description: 'ימי רביעי מ22:15 בטלפון 5047* שלוחה 4-9',
    link: 'https://www.youtube.com/playlist?list=PL8LYcFmuulgtvWotNo8CeOnZQ4M6noz9S'
  },
  {
    image: '/shiurim/kolhai.png',
    title: 'שאלות ותשובות ברדיו קול חי',
    description: 'כל יום חמישי בין 22:00 ל24:00',
    link: 'https://www.youtube.com/playlist?list=PL8LYcFmuulgsfQ2xQrF2NK9kMO7bpGYsD'
  },
  {
    image: '/shiurim/hidon.png',
    title: ' חידון הלכה למעשה תשפ"ה',
    description: 'על הלכות שבת ברדיו קול חי',
    link: 'https://www.youtube.com/playlist?list=PL8LYcFmuulgv8ikBgx8O6M-ORdVwNepJ5'
  }
];

const ShiurimSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-primary-800 mb-12">
          שיעורי תורה והלכה
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {shiurimData.map((shiur) => (
            <a
              key={shiur.title}
              href={shiur.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-square relative overflow-hidden rounded-t-xl w-full max-w-[160px] mx-auto">
                <img
                  src={shiur.image}
                  alt={shiur.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-base font-bold text-primary-800 mb-1">
                  {shiur.title}
                </h3>
                <p className="text-xs text-primary-600">
                  {shiur.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShiurimSection;
