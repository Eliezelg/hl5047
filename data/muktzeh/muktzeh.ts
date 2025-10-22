import { alefMuktzeh } from './letters/alef';
import { ayinMuktzeh } from './letters/ayin';
import { bethMuktzeh } from './letters/beth';
import { dalethMuktzeh } from './letters/daleth';
import { gimelMuktzeh } from './letters/gimel';
import { heMuktzeh } from './letters/he';
import { hethMuktzeh } from './letters/heth';
import { vavMuktzeh } from './letters/vav';
import { zayinMuktzeh } from './letters/zayin';
import { tetMuktzeh } from './letters/tet';
import { yodMuktzeh } from './letters/yod';
import { kafMuktzeh } from './letters/kaf';
import { lamedMuktzeh } from './letters/lamed';
import { mem1Muktzeh } from './letters/mem1';
import { mem2Muktzeh } from './letters/mem2';
import { nunMuktzeh } from './letters/nun';
import { samechMuktzeh } from './letters/samech';
import { peMuktzeh } from './letters/pe';
import { tzadikMuktzeh } from './letters/tzadik';
import { koufMuktzeh } from './letters/kouf';
import { reshMuktzeh } from './letters/resh';
import { shinMuktzeh } from './letters/shin';
import { tavMuktzeh } from './letters/tav';

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
  bethMuktzeh,
  gimelMuktzeh,
  dalethMuktzeh,
  heMuktzeh,
  vavMuktzeh,
  zayinMuktzeh,
  hethMuktzeh,
  tetMuktzeh,
  yodMuktzeh,
  kafMuktzeh,
  lamedMuktzeh,
  mem1Muktzeh,
  mem2Muktzeh,
  nunMuktzeh,
  samechMuktzeh,
  ayinMuktzeh,
  peMuktzeh,
  tzadikMuktzeh,
  koufMuktzeh,
  reshMuktzeh,
  shinMuktzeh,
  tavMuktzeh
];
