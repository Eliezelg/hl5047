'use client';
import { bonehItems } from '@/data/boneh/boneh';
import { useState, useMemo } from 'react';
import { NoSelect } from '../../components/NoSelect';

const letters = Object.keys(bonehItems) as (keyof typeof bonehItems)[];

type HebrewLetter = typeof letters[number];

export default function BonehPage() {
  const [selectedLetter, setSelectedLetter] = useState<HebrewLetter | null>(letters[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm) {
      return selectedLetter 
        ? bonehItems[selectedLetter] || []
        : [];
    }

    return Object.values(bonehItems).flat().filter(item => 
      item.name.includes(searchTerm) || 
      item.status.includes(searchTerm) ||
      (item.description || '').includes(searchTerm)
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
        <h1 className="text-4xl font-bold mb-8 text-center">לוח בונה וסותר באוהל</h1>
        
        {/* Introduction section */}
        <div className="mb-12 max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6" dir="rtl">
          <h2 className="text-2xl font-bold mb-4">הקדמה</h2>
          <div className="space-y-4 text-right">
            <p>
              ישנם דינים רבים ומצויים סביב סוגיות בונה סותר ואוהל, בשבת וביום טוב, מהם הלכות שאינם ידועות לציבור, ופעמים כרוך אף באיסור דאורייתא, וזאת משום שהמקרים והדינים הנמצאים בסוגיות הגמ' ובשו"ע סימנים שי"ג-שט"ו, שונים בחלקם ממציאות ימינו, ולשם כך צריכים ללמוד היטב את הסימנים הנ"ל יחד עם הביאורים וההוספות של פוסקי דורינו, עם הפעלת ההגיון לדמויי מלתא למלתא למקרים שהתחדשו בימינו שלא הוזכרו בפוסקים.
            </p>
            <p>
              סימנים שי"ג-שי"ד עוסקים בדיני בונה וסותר בקרקע ובכלים, וסימן שט"ו בדיני עשיית וסתירת אוהל (שגם הוא תולדה של בונה וסותר), ובכולם יש ואיסור עשייתו או סתירתו מהתורה, יש ואיסורו מדרבנן ויש המותר לכתחילה.
            </p>
            <p>
              השתדלנו בסייעתא דשמיא להקיף בשלושת סימנים אלו, את כל הדינים המעשיים בהם אנו נתקלים, ושורשם בגמ' בראשונים ובשו"ע, עד לפוסקי דורינו ובתוספת נופך למקרים שלא דנו בהם הפוסקים.
            </p>
            <p>
              אולם מכיון שהשאלות בנושאים אלו מצויות, ולפעמים רוצים לדעת מיד את התשובה בלי טרחת החיפוש, עלה בדעתי בעזהי"ת לכתוב לוח לדינים אלו, והוא עזרה ראשונה לדעת כיצד לנהוג בשעת מעשה למי שקשה לו כעת לעיין בשורשם של דברים.
            </p>
            <p>
              ולתועלת הלומדים נציין גם אם איסורו מהתורה או מדרבנן, דיש בזה נפק"מ אם מותר לומר לגוי לעשות זאת בצורך גדול (כמבואר בשו"ע בסימן ש"ז ס"ה), וכן האם מותר ליהנות מזה כשנעשה בשוגג, דאיסור דרבנן בשוגג מותר ליהנות ממנו בשבת בדיעבד (כמבואר במשנ"ב סימן שי"ח סק"ג).
            </p>
            <p>
              ציוני המקורות הם לפי סעיפי הספר והערותיו (אא"כ צויין אחרת), ובכל מקרה של ספק בהבנה יש לעיין במקורות.
            </p>
            <p>
              הלוח מתייחס גם ליום טוב, משום שבדיני בונה סותר ואוהל, שבת ויום טוב שוים, כמבואר בבית יוסף בתחילת סימן תצ"ה.
            </p>
            <p>
              ובכל אלו הדברים, פעמים רבות שהחפץ המדובר הוא מוקצה, ויש לעיין בלוח המוקצה לדעת מה דינו.
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
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <div className="space-y-2">
                    <p><strong>דינו: </strong>{item.status}</p>
                    <p><strong>מקור: </strong>{item.source}</p>
                    {item.description && (
                      <p className="text-gray-600">{item.description}</p>
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
