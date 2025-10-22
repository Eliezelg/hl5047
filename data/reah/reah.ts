export interface ReahItem {
    name: string;
    status: string;
    description?: string;
    source?: string;
}

// Import des items par lettre
import { alefItems } from './letters/Alef';
import { bethItems } from './letters/Beth';
import { gimelItems } from './letters/Gimel';
import { dalethItems } from './letters/Daleth';
import { heItems } from './letters/He';
import { vavItems } from './letters/Vav';
import { zayinItems } from './letters/Zayin';
import { hethItems } from './letters/Heth';
import { tetItems } from './letters/Tet';
import { yodItems } from './letters/Yod';
import { kafItems } from './letters/Kaf';
import { lamedItems } from './letters/Lamed';
import { memItems } from './letters/Mem';
import { nounItems } from './letters/Noun';
import { samechItems } from './letters/Samech';
import { ayinItems } from './letters/Ayin';
import { peItems } from './letters/Pe';
import { tzadikItems } from './letters/Tzadik';
import { koufItems } from './letters/Kouf';
import { reshItems } from './letters/Resh';
import { shinItems } from './letters/Shin';
import { tavItems } from './letters/Tav';

// Export de tous les items
export const reahItems = {
    'א': alefItems,
    'ב': bethItems,
    'ג': gimelItems,
    'ד': dalethItems,
    'ה': heItems,
    'ו': vavItems,
    'ז': zayinItems,
    'ח': hethItems,
    'ט': tetItems,
    'י': yodItems,
    'כ': kafItems,
    'ל': lamedItems,
    'מ': memItems,
    'נ': nounItems,
    'ס': samechItems,
    'ע': ayinItems,
    'פ': peItems,
    'צ': tzadikItems,
    'ק': koufItems,
    'ר': reshItems,
    'ש': shinItems,
    'ת': tavItems
};
