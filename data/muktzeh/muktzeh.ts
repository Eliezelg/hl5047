import { alefMuktzeh } from './letters/alef';
import { ayinMuktzeh } from './letters/ayin';
import { betMuktzeh } from './letters/bet';
import { chetMuktzeh } from './letters/chet';
import { daletMuktzeh } from './letters/dalet';
import { gimelMuktzeh } from './letters/gimel';
import { heyMuktzeh } from './letters/hey';
import { kafMuktzeh } from './letters/kaf';
import { kufMuktzeh } from './letters/kuf';
import { lamedMuktzeh } from './letters/lamed';
import { memMuktzeh } from './letters/mem';
import { membisMuktzeh } from './letters/membis';
import { nunMuktzeh } from './letters/nun';
import { pehMuktzeh } from './letters/peh';
import { reishMuktzeh } from './letters/reish';
import { samechMuktzeh } from './letters/samech';
import { shinMuktzeh } from './letters/shin';
import { tavMuktzeh } from './letters/tav';
import { tetMuktzeh } from './letters/tet';
import { tsadiMuktzeh } from './letters/tsadi';
import { vavMuktzeh } from './letters/vav';
import { yudMuktzeh } from './letters/yud';
import { zayinMuktzeh } from './letters/zayin';

export interface MuktzehItem {
  name: string;
  status: string;
  source?: string;
  description?: string;
}

export interface MuktzehCategory {
  title: string;
  items: MuktzehItem[];
  letter: string;
}

export const muktzehItems: MuktzehCategory[] = [
  alefMuktzeh,
  ayinMuktzeh,
  betMuktzeh,
  chetMuktzeh,
  daletMuktzeh,
  gimelMuktzeh,
  heyMuktzeh,
  kafMuktzeh,
  kufMuktzeh,
  lamedMuktzeh,
  memMuktzeh,
  membisMuktzeh,
  nunMuktzeh,
  pehMuktzeh,
  reishMuktzeh,
  samechMuktzeh,
  shinMuktzeh,
  tavMuktzeh,
  tetMuktzeh,
  tsadiMuktzeh,
  vavMuktzeh,
  yudMuktzeh,
  zayinMuktzeh
];
