import { alefBrachot } from './Alef';
import { bethBrachot } from './Beth';
import { gimelBrachot } from './Gimel';
import { dalethBrachot } from './Daleth';
import { heBrachot } from './He';
import { vavBrachot } from './Vav';
import { zayinBrachot } from './Zayin';
import { hethBrachot } from './Heth';
import { tetBrachot } from './Tet';
import { yodBrachot } from './Yod';
import { kafBrachot } from './Kaf';
import { lamedBrachot } from './Lamed';
import { memBrachot } from './Mem';
import { nounBrachot } from './Noun';
import { samechBrachot } from './Samech';
import { ayinBrachot } from './Ayin';
import { peBrachot } from './Pe';
import { tzadikBrachot } from './Tzadik';
import { koufBrachot } from './Kouf';
import { reshBrachot } from './Resh';
import { shinBrachot } from './Shin';
import { tavBrachot } from './Tav';

export interface Blessing {
  name: string;
  firstBlessing: string;
  lastBlessing: string;
  description?: string;
  quantity?: string;
}

export interface BlessingCategory {
  title: string;
  blessings?: Blessing[];
  items?: Blessing[];
  letter?: string;
}

// Trier les bénédictions selon l'ordre de l'alphabet hébreu
export const brachot: BlessingCategory[] = [
  alefBrachot,   // א
  bethBrachot,   // ב
  gimelBrachot,  // ג
  dalethBrachot, // ד
  heBrachot,     // ה
  vavBrachot,    // ו
  zayinBrachot,  // ז
  hethBrachot,   // ח
  tetBrachot,    // ט
  yodBrachot,    // י
  kafBrachot,    // כ
  lamedBrachot,  // ל
  memBrachot,    // מ
  nounBrachot,   // נ
  samechBrachot, // ס
  ayinBrachot,   // ע
  peBrachot,     // פ
  tzadikBrachot, // צ
  koufBrachot,   // ק
  reshBrachot,   // ר
  shinBrachot,   // ש
  tavBrachot     // ת
];
