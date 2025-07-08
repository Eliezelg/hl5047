export interface BonehItem {
    name: string;
    status: string;
    source?: string;
    description?: string;
}

// Import des items par lettre
import { alefItems } from './letters/alef';
import { betItems } from './letters/bet';
import { gimelItems } from './letters/gimel';
import { daletItems } from './letters/dalet';
import { heyItems } from './letters/hey';
import { vavItems } from './letters/vav';
import { hetItems } from './letters/het';
import { tetItems } from './letters/tet';
import { yodItems } from './letters/yod';
import { kafItems } from './letters/kaf';
import { lamedItems } from './letters/lamed';
import { memItems } from './letters/mem';
import { membisItems } from './letters/membis';
import { memterItems } from './letters/memter';
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
export const bonehItems = {
    'א': alefItems,
    'ב': betItems,
    'ג': gimelItems,
    'ד': daletItems,
    'ה': heyItems,
    'ו': vavItems,
    'ח': hetItems,
    'ט': tetItems,
    'י': yodItems,
    'כ': kafItems,
    'ל': lamedItems,
    'מ': [...memItems, ...membisItems, ...memterItems],
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
