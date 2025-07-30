'use client';
import { shehecheyanuItems } from '@/data/shehecheyanu/shehecheyanu';
import { useState, useMemo } from 'react';
import { NoSelect } from '../../components/NoSelect';

const letters = Object.keys(shehecheyanuItems) as (keyof typeof shehecheyanuItems)[];

type HebrewLetter = typeof letters[number];

export default function ShehecheyanuPage() {
  const [selectedLetter, setSelectedLetter] = useState<HebrewLetter | null>(letters[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm) {
      return selectedLetter 
        ? shehecheyanuItems[selectedLetter]?.items || []
        : [];
    }

    return Object.values(shehecheyanuItems).flatMap(letterItems => 
      letterItems.items.filter(item => 
        item.nom.includes(searchTerm) || 
        item.benediction.texte.includes(searchTerm) ||
        (item.infestation?.texte || '').includes(searchTerm)
      )
    );
  }, [searchTerm, selectedLetter]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      setSelectedLetter(null);
    }
  };

  return (
    <NoSelect>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">לוח שהחיינו ותולעים</h1>
        
        {/* Introduction section */}
        <div className="mb-12 max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6" dir="rtl">
          <h2 className="text-2xl font-bold mb-4">דברים אחדים לקורא</h2>
          <div className="space-y-4 text-right">
            <p>
              א) הלוח הינו עזרה ראשונה לדעת כיצד לנהוג למעשה בכל רגע נתון, את ההסבר והטעם ניתן לראות בספרי הליכות ברכות לפי ציוני המקורות המופיעים שם בלוח ברכות.
            </p>
            <p>
              ב) בכל מקרה של ספק או חוסר הבנה, חובה לראות את שורשי הדברים בגוף הספר כדי לדעת כיצד לנהוג למעשה.
            </p>
            <p>
              ג) הכלל הקובע לברכת שהחיינו בפירות הוא, פרי עונתי שלא נמצא כל השנה בחנויות מברכים עליו שהחיינו, אך פרי הנמצא כל השנה בחנויות מכל סיבה שהיא, אין מברכים עליו שהחיינו.
            </p>
            <p>
              השקענו מאמצים רבים לברר על כל פרי ופרי האם ישנו כל השנה בחנויות או לא, ולפי הנתונים נכון לשנת תש"פ כתבנו את הלוח וכפי שהארכנו בספר בסימן רכ"ה. אך מכיון שבחלק מהפירות נתונים אלו עלולים להשתנות בשנים הבאות, הן מחמת יבוא הן מחמת חממות וקירור, לכן יש לעקוב בכל שנה מחדש ואף לשאול את המוכרים, וכל פרי הנמצא ברצף כל השנה בחנויות, אין לברך עליו שהחיינו ורק אם יש הפסקה של שלושים יום, ניתן לברך עליו בהתחדשותו.
            </p>
            <p>
              תודתי נתונה לאברך החשוב ר' דוד רחמים לילוף הי"ו שסייע רבות בסידור הערכים.
            </p>
            <p>
              תודתי נתונה לחקלאי מאיר חסן הי"ו על זמנו הרב שהקדיש עבורי לבירור זמני גידולי הפירות והירקות ומשך תקופתם בחנויות, ועל ידי בירור המציאות נקבעה ההלכה וכפי שכתבנו בגוף הספר. ימלא ה' כל משאלות לבו לטובה ולברכה ברוחניות וגשמיות הוא וכל בני ביתו.
            </p>
            <p>
              רוב תודות לרבנים הגאונים רבי משה ויא ורבי שניאור זלמן רווח שליט"א, שנעזרתי בספריהם החשובים לבירור נגיעות חרקים בפירות וירקות וצורת נקיונם, יתן ה' וימשיכו בהגדלת התורה והיראה מתוך בריאות ונחת כל הימים. כל מה שנכתב כאן הוא רק לגבי סחורה המשווקת לחנויות, אך פירות הגדלים בצידי הדרכים ובחצירות פעמים שנגועים בחרקים ויש לבודקם היטב.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="חפש..."
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              dir="rtl"
            />
          </div>
        </div>

        {/* Letter Grid */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-11 gap-2 text-center" dir="rtl">
            {letters.map((letter) => (
              <button
                key={letter}
                onClick={() => {
                  setSelectedLetter(letter);
                  setSearchTerm('');
                }}
                className={`p-2 rounded ${
                  selectedLetter === letter
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Items List */}
        <div className="max-w-4xl mx-auto" dir="rtl">
          <div className="space-y-8">
            {selectedLetter && !searchTerm && (
              <h2 className="text-3xl font-bold mb-4 text-right">{selectedLetter}</h2>
            )}
            <div className="space-y-4">
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4"
                  dir="rtl"
                >
                  <h3 className="text-xl font-semibold mb-2">{item.nom}</h3>
                  <div className="space-y-2">
                    <p>
                      <strong>שהחיינו: </strong>
                      {item.benediction.texte}
                    </p>
                    {item.infestation && (
                      <p>
                        <strong>בדיקת תולעים: </strong>
                        {item.infestation.texte}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </NoSelect>
  );
}
