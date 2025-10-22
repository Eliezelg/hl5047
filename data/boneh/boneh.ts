export interface BonehItem {
    name: string;
    status: string;
    source?: string;
    description?: string;
}

// Import des items par lettre
import { alefItems } from './letters/Alef';
import { bethItems } from './letters/Beth';
import { gimelItems } from './letters/Gimel';
import { dalethItems } from './letters/Daleth';
import { heItems } from './letters/He';
import { vavItems } from './letters/Vav';
import { hethItems } from './letters/Heth';
import { tetItems } from './letters/Tet';
import { yodItems } from './letters/Yod';
import { kafItems } from './letters/Kaf';
import { lamedItems } from './letters/Lamed';
import { memItems } from './letters/Mem';
import { memBisItems } from './letters/MemBis';
import { memTerItems } from './letters/MemTer';
import { memQuaterItems } from './letters/MemQuater';
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
export const bonehItems = {
    'א': alefItems,
    'ב': bethItems,
    'ג': gimelItems,
    'ד': dalethItems,
    'ה': heItems,
    'ו': vavItems,
    'ח': hethItems,
    'ט': tetItems,
    'י': yodItems,
    'כ': kafItems,
    'ל': lamedItems,
    'מ': [...memItems, ...memBisItems, ...memTerItems, ...memQuaterItems],
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
