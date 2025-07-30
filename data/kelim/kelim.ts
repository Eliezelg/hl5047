export interface KelimItem {
    title: string;
    content: string;
    source?: string;
}

// Import des items par lettre
import { alefItems } from './letters/alef';
import { betItems } from './letters/bet';
import { gimelItems } from './letters/gimel';
import { daletItems } from './letters/dalet';
import { heyItems } from './letters/hey';
import { vavItems } from './letters/vav';
import { zayinItems } from './letters/zayin';
import { hetItems } from './letters/het';
import { tetItems } from './letters/tet';
import { yodItems } from './letters/yod';
import { kafItems } from './letters/kaf';
import { lamedItems } from './letters/lamed';
import { memItems } from './letters/mem';
import { nunItems } from './letters/nun';
import { samechItems } from './letters/samech';
import { ayinItems } from './letters/ayin';
import { peItems } from './letters/pe';
import { tsadiItems } from './letters/tsadi';
import { kufItems } from './letters/kuf';
import { reshItems } from './letters/resh';
import { shinItems } from './letters/shin';
import { tavItems } from './letters/tav';

// Export de tous les items
export const kelimItems = {
    'א': alefItems,
    'ב': betItems,
    'ג': gimelItems,
    'ד': daletItems,
    'ה': heyItems,
    'ו': vavItems,
    'ז': zayinItems,
    'ח': hetItems,
    'ט': tetItems,
    'י': yodItems,
    'כ': kafItems,
    'ל': lamedItems,
    'מ': memItems,
    'נ': nunItems,
    'ס': samechItems,
    'ע': ayinItems,
    'פ': peItems,
    'צ': tsadiItems,
    'ק': kufItems,
    'ר': reshItems,
    'ש': shinItems,
    'ת': tavItems
};

export const kelimData = {
    title: ["לוח ברכת שהחיינו והטוב והמטיב", "בגדים, כלים ואנשים"],
    introduction: [
        "דברים אחדים לקורא:",
        "א) המקורות בסוגריים הם לפי הסימנים והסעיפים שבספר ולא לפי סעיפי השו\"ע אלא אם כן צויין אחרת.",
        "ב) הלוח הינו עזרה ראשונה לדעת כיצד לנהוג למעשה בכל רגע נתון, את ההסבר והטעם ניתן לראות בגוף הספר.",
        "ג) בכל מקרה של ספק או חוסר הבנה, חובה לראות את שורשי הדברים בגוף הספר כדי לדעת כיצד לנהוג למעשה.",
        "ד) תודתי נתונה לאברך החשוב ר' דוד רחמים לילוף הי\"ו שסייע רבות בסידור הערכים."
    ]
};
