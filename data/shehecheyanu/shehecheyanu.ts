export interface ShehecheyanuBenediction {
    statut: boolean;
    texte: string;
}

export interface ShehecheyanuInfestation {
    texte: string;
}

export interface ShehecheyanuEntry {
    nom: string;
    benediction: ShehecheyanuBenediction;
    infestation?: ShehecheyanuInfestation;
}

export interface ShehecheyanuItem {
    lettre: string;
    items: ShehecheyanuEntry[];
}

// Import des items par lettre
import { AlefItems } from './letters/Alef';
import { BethItems } from './letters/Beth';
import { GimelItems } from './letters/Gimel';
import { DalethItems } from './letters/Daleth';
import { HeItems } from './letters/He';
import { VavItems } from './letters/Vav';
import { ZayinItems } from './letters/Zayin';
import { HethItems } from './letters/Heth';
import { TetItems } from './letters/Tet';
import { YodItems } from './letters/Yod';
import { KafItems } from './letters/Kaf';
import { LamedItems } from './letters/Lamed';
import { MemItems } from './letters/Mem';
import { NounItems } from './letters/Noun';
import { SamechItems } from './letters/Samech';
import { AyinItems } from './letters/Ayin';
import { PeItems } from './letters/Pe';
import { TzadikItems } from './letters/Tzadik';
import { KoufItems } from './letters/Kouf';
import { ReshItems } from './letters/Resh';
import { ShinItems } from './letters/Shin';
import { TavItems } from './letters/Tav';

// Export de tous les items
export const shehecheyanuItems = {
    'א': AlefItems,
    'ב': BethItems,
    'ג': GimelItems,
    'ד': DalethItems,
    'ה': HeItems,
    'ו': VavItems,
    'ז': ZayinItems,
    'ח': HethItems,
    'ט': TetItems,
    'י': YodItems,
    'כ': KafItems,
    'ל': LamedItems,
    'מ': MemItems,
    'נ': NounItems,
    'ס': SamechItems,
    'ע': AyinItems,
    'פ': PeItems,
    'צ': TzadikItems,
    'ק': KoufItems,
    'ר': ReshItems,
    'ש': ShinItems,
    'ת': TavItems
};
