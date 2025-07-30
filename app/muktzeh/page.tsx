'use client';
import { muktzehItems } from '@/data/muktzeh/muktzeh';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { NoSelect } from '../../components/NoSelect';

const letters = [
  'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י',
  'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר',
  'ש', 'ת'
];

export default function MuktzehPage() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>('א');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm) {
      if (selectedLetter === 'מ') {
        // Pour la lettre mem, combiner les items de mem et membis
        const memItems = muktzehItems.find(category => category?.letter === 'מ')?.items || [];
        const membisItems = muktzehItems.find(category => category?.letter === 'ם')?.items || [];
        return [...memItems, ...membisItems];
      } else {
        const category = muktzehItems.find(category => category?.letter === selectedLetter);
        return category && Array.isArray(category.items) ? category.items : [];
      }
    }

    return muktzehItems.flatMap(category => 
      (category && Array.isArray(category.items) ? category.items : []).filter(item => 
        item && (
          (item.name && item.name.includes(searchTerm)) || 
          (item.status && item.status.includes(searchTerm)) ||
          (item.description && item.description.includes(searchTerm))
        )
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
        <h1 className="text-4xl font-bold mb-8 text-center">דיני מוקצה</h1>
        
        {/* Introduction section */}
        <div className="mb-12 max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6" dir="rtl">
          <h2 className="text-2xl font-bold mb-4">כללי הלוח</h2>
          <div className="space-y-4 text-right">
            <p>
              דיני מוקצה רבים מסועפים ועמוקים, בכדי לדעת להגדיר כל חפץ לאיזה סוג מוקצה הוא שייך, יש ללמוד היטב את הטור והשו"ע עם נושאי כליהם מסימן ש"ח-שי"א, וכן את סימן רע"ט.
            </p>
            <p>
              מטרת לוח המוקצה היא להנגיש לציבור באופן מהיר כל חפץ מה דינו, כדי לדעת כיצד לנהוג בשעת מעשה, המעוניין לדעת את שורשם של דברים יוכל לעיין במקורות המצויינים בסוגריים, המקורות הם לפי סעיפי הספר והערותיו אא"כ צויין אחרת. דברים שלא נידונו בספר, נכתב ביאורם בהערות על לוח המוקצה.
            </p>
            <p>
              פעמים רבות שהמקור המצויין בסוגריים לא כתוב בו בדיוק את אותו ערך המופיע בלוח המוקצה, אלא דוגמאות אחרות שמשם יש להקיש לערך המדובר, ופעמים שיש להתבונן ולהעמיק כדי להבין. לא ניתן להרחיב בלוח המוקצה, לכן כל מקום שיש ספק בהבנת הערך, יש לפתוח את המקורות שצויינו בסוגריים.
            </p>
            <p>
              הלוח מתייחס גם ליום טוב, וכשאין התייחסות מיוחדת ליום טוב, הוי אומר שדינו כמו בשבת.
            </p>
          </div>

          <h3 className="text-xl font-bold mt-8 mb-4">סוגי המוקצה</h3>
          <div className="space-y-4 text-right">
            <p>סוגי המוקצה מחולקים לשש קבוצות, ואלו הם:</p>
            <ol className="list-decimal list-inside space-y-2 mr-4">
              <li>מוקצה מחמת גופו - אסור כלל לטלטלו.</li>
              <li>מוקצה מחמת חסרון כיס - אסור כלל לטלטלו.</li>
              <li>כלי שמלאכתו לאיסור - מותר לטלטלו רק לצורך גופו ומקומו.</li>
              <li>כלי שמלאכתו לאיסור שאין בו מלאכת היתר - נחלקו הפוסקים האם דינו ככלי שמלאכתו לאיסור או כמוקצה מחמת גופו. ולענין מעשה, לכתחילה יש להחמיר והמיקל יש לו על מה שיסמוך.</li>
              <li>כלי שמלאכתו להיתר - מותר לטלטלו אף מחמה לצל, אך שלא לצורך כלל אסור לטלטלו.</li>
              <li>אוכלין וכתבי הקודש - מותר לטלטלן אף שלא לצורך כלל.</li>
            </ol>
          </div>

          <h3 className="text-xl font-bold mt-8 mb-4">היתרי טלטול</h3>
          <div className="space-y-4 text-right">
            <ol className="list-[hebrew] list-inside space-y-2">
              <li>מוקצה מחמת גופו ומחמת חסרון כיס, אף שאסור כלל לטלטלם, מכל מקום מותר לטלטלם בגופו גם כשמטרת טלטולו לצורך דבר האסור.</li>
              <li>נגיעה במוקצה מותרת גם כשמטרת הנגיעה לצורך דבר האסור.</li>
              <li>נטל בידו כלי שמלאכתו לאיסור או מוקצה מחמת גופו וכן מוקצה מחמת חסרון כיס, באופנים מסויימים התירו לו להמשיך לטלטלו.</li>
              <li>ניתן לייחד מוקצה על ידי מחשבה או מעשה ובכך להפקיעו מתורת מוקצה.</li>
              <li>במקום שיש חשש היזק מהמוקצה, התירו חז"ל לפנותו בידיו.</li>
              <li>מוקצה שהוא מאוס הנמצא במקום שהות בני אדם, התירו חז"ל לפנותו משום כבוד האדם.</li>
            </ol>
          </div>

          <h3 className="text-xl font-bold mt-8 mb-4">סוגי מוקצה נוספים</h3>
          <div className="space-y-4 text-right">
            <ol className="list-[hebrew] list-inside space-y-2">
              <li>מוקצה מחמת דין בסיס, דינו כדין המוקצה שעליו.</li>
              <li>מה שהיה מוקצה בבין השמשות, אף אם הסתלקה סיבת המוקצה בשבת, החפץ נשאר מוקצה.</li>
              <li>דבר שלא היה קיים בעולם ונוצר בשבת, מוגדר כאיסור נולד כגון מים של מזגן, ודינו כמוקצה מחמת גופו.</li>
              <li>חפץ שהתפרק חלק ממנו, במקרים מסויימים אסרו חז"ל לטלטל את החפץ.</li>
              <li>מוקצה מחמת מצוה, הוא דבר שהוקצה למצותו בבין השמשות.</li>
              <li>מוקצה מחמת איסור, הוא דבר שמצד עצמו לא נאסר בבין השמשות.</li>
            </ol>
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
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
              dir="rtl"
            />
          </div>
        </div>

        {/* Letters Grid */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-11 gap-2 text-center" dir="rtl">
            {letters.map((letter) => (
              <button
                key={letter}
                className={`p-2 rounded ${
                  selectedLetter === letter
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                } ${searchTerm ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !searchTerm && setSelectedLetter(letter)}
                disabled={!!searchTerm}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Items List */}
        {(selectedLetter || searchTerm) && filteredItems.length > 0 && (
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
                      {item.source && (
                        <p><strong>מקור: </strong>{item.source}</p>
                      )}
                      {item.description && (
                        <p className="text-gray-600">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* No Results Message */}
        {(selectedLetter || searchTerm) && filteredItems.length === 0 && (
          <div className="text-center text-gray-500 mt-8" dir="rtl">
            <p>לא נמצאו תוצאות</p>
          </div>
        )}
      </div>
    </NoSelect>
  );
}
