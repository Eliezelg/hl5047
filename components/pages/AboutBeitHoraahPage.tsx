import React from 'react';
import { Phone } from 'lucide-react';

const AboutBeitHoraahPage: React.FC = () => {
  return (
    <main className="flex-grow">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-primary-800 mb-4">
          בית ההוראה "הלכה למעשה"
        </h1>
        <h2 className="text-2xl text-center text-primary-600 mb-12">
          בשבילכם ולמענכם!
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8">
            <img
              className="w-full h-64 object-cover"
              src="/beit-horaah.jpg"
              alt="בית ההוראה הלכה למעשה"
            />
            <div className="p-8 text-right">
              <div className="prose prose-lg max-w-none text-primary-600 space-y-6">
                <p className="text-xl">
                  בית ההוראה "הלכה למעשה", בראשות הגאון הרב אופיר יצחק מלכא שליט"א, 
                  מציע מענה הלכתי מקיף ומקצועי 24/6
                </p>
                <p>
                  צוות של למעלה מ-80 מורי הוראה מומחים עומד לרשותך בכל שאלה הלכתית 
                  בתחומי אורח חיים, יורה דעה, וחושן משפט.
                </p>

                <div className="bg-primary-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">היתרונות שלנו:</h3>
                  <ul className="list-none space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-accent-gold-400 font-bold ml-2">•</span>
                      <span>
                        <strong>נגישות מקסימלית:</strong> מענה מהיר ומדויק לכל שאלה, 
                        בכל שעה ובכל יום בהכוונתו של מורינו ורבינו הגאון הרב אופיר יצחק מלכא שליט"א
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-gold-400 font-bold ml-2">•</span>
                      <span>
                        <strong>מומחיות:</strong> צוות מומחים בתחומים מגוונים, כולל דיני ממונות, 
                        ריבית, ייעוץ זוגי, חינוך ילדים והלכות לשון הרע
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-gold-400 font-bold ml-2">•</span>
                      <span>
                        <strong>התאמה אישית:</strong> מענה מותאם לכל קהל ולכל מגזר, 
                        מבני ספרד ובני אשכנז תוך שימת לב לחילוק הדינים
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-gold-400 font-bold ml-2">•</span>
                      <span>
                        <strong>שירותים נוספים:</strong> ייעוץ זוגי, הדרכת הורים, 
                        ומענה הלכתי בהלכות לשון הרע ורכילות
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-primary-50 p-6 rounded-lg mt-6">
                  <h3 className="text-xl font-bold mb-4">השירותים שלנו:</h3>
                  <ul className="list-none space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-accent-gold-400 font-bold ml-2">•</span>
                      <span>
                        <strong>קו הלכה 24/6:</strong> התקשר אלינו בכל שעה ותקבל מענה מיידי
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-gold-400 font-bold ml-2">•</span>
                      <span>
                        <strong>ייעוץ אישי:</strong> פגישת ייעוץ אישית עם רב מומחה
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-gold-400 font-bold ml-2">•</span>
                      <span>
                        <strong>הרצאות וסדנאות:</strong> הרצאות והדרכות בנושאים הלכתיים מגוונים
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-accent-gold-50 p-6 rounded-lg mt-8">
                  <h3 className="text-xl font-bold mb-4">צור קשר:</h3>
                  <div className="flex items-center justify-center gap-4 text-xl">
                    <div className="flex items-center gap-2">
                      <Phone className="w-6 h-6 text-accent-gold-400" />
                      <span className="font-bold">*5047</span>
                    </div>
                    <span>|</span>
                    <div>
                      למחייגים מחו"ל: <span dir="ltr">+972-7997173155</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutBeitHoraahPage;
