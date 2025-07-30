import { guimelBrachot } from './Guimel';
import { memBrachot } from './mem';
import { chetBrachot } from './Chet';
import { dalethBrachot } from './Daleth';
import { heyBrachot } from './Hey';
import { kafBrachot } from './Kaf';
import { lamedBrachot } from './Lamed';
import { tetBrachot } from './Tet';
import { vavBrachot } from './Vav';
import { yodBrachot } from './Yod';
import { zayinBrachot } from './Zayin';
import { nunBrachot } from './Nun';
import { samechBrachot } from './Samech';
import { ayinBrachot } from './Ayin';
import { peBrachot } from './Pe';
import { tzadiBrachot } from './Tzadi';
import { kufBrachot } from './Kuf';
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
  // א
  {
    title: "א",
    blessings: [
      {
        name: "אבוקדו",
        firstBlessing: "העץ",
        lastBlessing: "נפשות"
      },
      {
        name: "אבוקדו מרוסק",
        firstBlessing: "העץ",
        lastBlessing: ""
      },
      {
        name: "אבוקדו קשה הנאכל על ידי הדחק",
        firstBlessing: "העץ",
        lastBlessing: "נפשות"
      },
      {
        name: "אבוקדו קשה כאבן וריככו בחום התנור",
        firstBlessing: "העץ",
        lastBlessing: "נפשות"
      },
      {
        name: "אבוקדו על קרקרים",
        firstBlessing: "מזונות",
        lastBlessing: "על המחיה",
        description: "אם החתיכות גדולות מברך שתי ברכות"
      },
      {
        name: "אבטיח",
        firstBlessing: "אדמה",
        lastBlessing: "נפשות",
        description: "גם אם סוחטו בתוך פיו בשיניו"
      },
      {
        name: "אביעו",
        firstBlessing: "העץ",
        lastBlessing: "נפשות",
        description: "פרי אקזוטי צהוב הנראה כמו שזיף"
      },
      {
        name: "אבקת קפה נמס",
        firstBlessing: "",
        lastBlessing: "",
        description: "אין לברך. עירב בה סוכר, מברך העץ אם הרוב זה האבקת קפה"
      },
      {
        name: "אבקת קפה שחור",
        firstBlessing: "",
        lastBlessing: "",
        description: "אין לברך. עירב בה סוכר, מברך העץ אם הרוב זה האבקת קפה"
      },
      {
        name: "אבקת קקאו",
        firstBlessing: "",
        lastBlessing: "",
        description: "אין לברך. עירב בה סוכר, מברך העץ אם הרוב זה האבקת קקאו"
      },
      {
        name: "אבקת שוקו",
        firstBlessing: "שהכל",
        lastBlessing: "",
        description: "משום שהרוב סוכר"
      },
      {
        name: "אגו",
        firstBlessing: "מזונות",
        lastBlessing: "",
        description: "לענין ברכה אחרונה, אם אכל 70-80 גרם, יברך על המחיה, פחות מזה יברך נפשות"
      },
      {
        name: "אגו כשר לפסח",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות"
      },
      {
        name: "אגוז",
        firstBlessing: "העץ",
        lastBlessing: "נפשות",
        description: "כל סוגי האגוזים גדלים בעץ ולכן ברכתם עץ ונפשות, בין חיים בין קלויים, לפי שכך דרכם. השמות הנפוצים, מלך, פקאן, קשיו, פיסטוק, מקדמיה, ברזיל, לוז"
      },
      {
        name: "אגוז טחון",
        firstBlessing: "",
        lastBlessing: "",
        description: "אם ניכר צורתו מברך את ברכתו. לא ניכר צורתו מברך שהכל, ומי שהוא מבני ספרד ורוצה לברך את ברכת הפרי, יש לו על מה שיסמוך"
      },
      {
        name: "אגוז ממרח",
        firstBlessing: "שהכל",
        lastBlessing: ""
      },
      {
        name: "אגוז ממתק",
        firstBlessing: "",
        lastBlessing: "",
        description: "אם ניכר צורתו, עץ ונפשות. אם לא ניכר צורתו, שהכל ונפשות, ומי שהוא מבני ספרד ורוצה לברך העץ, יש לו על מה שיסמוך"
      },
      {
        name: "אגוז מצופה בשוקולד",
        firstBlessing: "העץ",
        lastBlessing: "נפשות",
        description: "אם מוצץ תחילה את השוקולד, מברך גם על השוקולד"
      },
      {
        name: "אגוז מצופה חלוה",
        firstBlessing: "העץ",
        lastBlessing: "נפשות"
      },
      {
        name: "אגוז מצופה לוטוס",
        firstBlessing: "מזונות",
        lastBlessing: "נפשות"
      },
      {
        name: "אגוז מצופה עוגיות",
        firstBlessing: "מזונות",
        lastBlessing: "נפשות"
      },
      {
        name: "אגוז מצופה שוקולד ובייגלה",
        firstBlessing: "מזונות",
        lastBlessing: "נפשות"
      },
      {
        name: "אגוזון",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות",
        description: "חברת ירושלים"
      },
      {
        name: "אגוזי",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות"
      },
      {
        name: "אגס",
        firstBlessing: "העץ",
        lastBlessing: "נפשות",
        description: "בשליש אגס גדול יש שיעור כזית"
      },
      {
        name: "אגרול",
        firstBlessing: "מזונות",
        lastBlessing: "על המחיה",
        description: "גם בקביעות סעודה משום שמטוגן בשמן עמוק"
      },
      {
        name: "אדי צ'יפס",
        firstBlessing: "אדמה",
        lastBlessing: "נפשות",
        description: "חטיף מחתיכות תפוחי אדמה"
      },
      {
        name: "אובלטים",
        firstBlessing: "מזונות",
        lastBlessing: "על המחיה",
        description: "גם אם קבע עליהם סעודתו, דאין עליהם תורת פת מחמת דקותן"
      },
      {
        name: "אובלי",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות",
        description: "חטיף שוקולד"
      },
      {
        name: "אוגלי",
        firstBlessing: "העץ",
        lastBlessing: "נפשות",
        description: "פרי טרופי המורכב מפירות הדר, נראה כמו מנדרינה"
      },
      {
        name: "אוזני המן",
        firstBlessing: "מזונות",
        lastBlessing: "על המחיה",
        description: "חברת אחוה. ביחידה אחת יש שיעור כזית"
      },
      {
        name: "אוכמניות",
        firstBlessing: "העץ",
        lastBlessing: ""
      },
      {
        name: "אורז",
        firstBlessing: "מזונות",
        lastBlessing: "נפשות",
        description: "אף אם לא נמעך או נדבק בבישולו, וכן באורז מלא, גם לבני אשכנז"
      },
      {
        name: "אורז דפים ואורז פריכיות",
        firstBlessing: "",
        lastBlessing: "",
        description: "דפי אורז- מזונות ונפשות. פריכיות אורז - אדמה ונפשות. אם נעשו מקמח אורז (מצויין ברכיבים), מזונות ונפשות"
      },
      {
        name: "אורז חי",
        firstBlessing: "",
        lastBlessing: "",
        description: "אינו מברך כלל"
      },
      {
        name: "אורז עם אפונה",
        firstBlessing: "מזונות",
        lastBlessing: "נפשות"
      },
      {
        name: "אורז עם בשר והרוב אורז",
        firstBlessing: "מזונות",
        lastBlessing: "נפשות",
        description: "וטוב לברך שתי ברכות"
      },
      {
        name: "אורז עם עוף טחון או עם בשר טחון",
        firstBlessing: "מזונות",
        lastBlessing: "",
        description: "מברך על הרוב, בדרך כלל זה האורז"
      },
      {
        name: "אורז עם צימוקים ושזיפים",
        firstBlessing: "מזונות",
        lastBlessing: "נפשות"
      },
      {
        name: "אורז עם תפוח אדמה, עוף, זיתים מבושלים",
        firstBlessing: "",
        lastBlessing: "",
        description: "אם אוכל כל מין בפני עצמו, מברך על כל מין ומין. אוכלם יחד מברך לפי הרוב, וטוב לברך על כל מין ומין"
      },
      {
        name: "אח של ביסלי",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות"
      },
      {
        name: "אחלה ביס",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות",
        description: "חטיף בוטנים"
      },
      {
        name: "אטריות",
        firstBlessing: "מזונות",
        lastBlessing: "על המחיה",
        description: "גם בקביעות סעודה. המים הבלועים בתוכם מצטרפים לשיעור על המחיה"
      },
      {
        name: "אטריות אורז",
        firstBlessing: "מזונות",
        lastBlessing: "נפשות",
        description: "עשוי מאורז טחון ומעובד"
      },
      {
        name: "אטריות אפונה",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות",
        description: "עשויות מקמח אפונה"
      },
      {
        name: "אטריות יפניות",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות",
        description: "עשויות מקמח כוסמת"
      },
      {
        name: "אטריות כוסמין",
        firstBlessing: "מזונות",
        lastBlessing: "על המחיה"
      },
      {
        name: "אטריות עם בשר",
        firstBlessing: "מזונות",
        lastBlessing: "על המחיה",
        description: "נכון לברך שתי ברכות תחילה וסוף. אם הבשר לא ניכר בפני עצמו, מברך רק מזונות ועל המחיה"
      },
      {
        name: "אטריות עם עוף וירקות מוקפצים",
        firstBlessing: "מזונות",
        lastBlessing: "על המחיה",
        description: "טוב לברך על כל מין ומין תחילה וסוף"
      },
      {
        name: "אטריות שיפון",
        firstBlessing: "מזונות",
        lastBlessing: "על המחיה"
      },
      {
        name: "אטריות שעועית",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות",
        description: "עשויות מקמח שעועית"
      },
      {
        name: "אטריות תירס",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות",
        description: "עשויות מקמח תירס"
      },
      {
        name: "אטריות תרד",
        firstBlessing: "מזונות",
        lastBlessing: "על המחיה",
        description: "עשויות מקמח דגן ומכילות גם תרד"
      },
      {
        name: "איגלו",
        firstBlessing: "שהכל",
        lastBlessing: "",
        description: "לענין ברכה אחרונה, ראה ארטיק"
      },
      {
        name: "אייר ביס",
        firstBlessing: "מזונות",
        lastBlessing: "על המחיה",
        description: "בצל פיקנטי –חברת בייגל בייגל. אחוזי הקמח שבו הם כ-60 אחוז, ולכן כדי לברך על המחיה צריך לאכול כ-30 גרם וטוב להחמיר ולאכול כ-40 גרם"
      },
      {
        name: "אינגה מתוקה",
        firstBlessing: "העץ",
        lastBlessing: "נפשות",
        description: "פרי אדמדם, נראה כמו שעועית"
      },
      {
        name: "אינגליש קייק",
        firstBlessing: "מזונות",
        lastBlessing: "על המחיה",
        description: "מעיקר הדין די בכזית עוגה כדי לברך על המחיה (פרוסה בעובי שתי אצבעות), אך טוב להחמיר ולאכול כשבעים גרם עוגה (חמישית פס) שאז יוצא שאוכל כזית דגן"
      },
      {
        name: "אלוורה",
        firstBlessing: "שהכל",
        lastBlessing: "",
        description: "משום שמשמש כתבלין בלבד. על משקה האלוורה יש לברך שהכל ודי בכה לפטור את קוביות האלוורה גם אם אוכלם בפני עצמן"
      },
      {
        name: "אלמנדוס",
        firstBlessing: "מזונות",
        lastBlessing: "",
        description: "תערובת פיצוחים בציפוי קמח חיטה. אם אכל מהציפוי לבד שיעור כזית תוך 4-7 דקות, מברך רק על המחיה. אם השיעור כזית הוא בצירוף הפיצוחים, נחלקו הפוסקים אם מברך נפשות או אינו מברך כלל.ולמעשה, לבני אשכנז מברך, ואף לבני ספרד יברך אם לא יכול לפטור במאכל אחר"
      },
      {
        name: "אמברלה",
        firstBlessing: "העץ",
        lastBlessing: "נפשות",
        description: "פרי אקזוטי, צבעו ירוק כתום, טעמו מתוק חמצמץ"
      },
      {
        name: "אמיגוס",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות",
        description: "חטיף מקמח תירס"
      },
      {
        name: "אנונה",
        firstBlessing: "העץ",
        lastBlessing: "נפשות"
      },
      {
        name: "אננס",
        firstBlessing: "אדמה",
        lastBlessing: "נפשות",
        description: "אם בירך העץ, עיין הליכות ברכות סימן רג סעיף ד'"
      },
      {
        name: "אנרג'י",
        firstBlessing: "מזונות",
        lastBlessing: "נפשות",
        description: "חטיף דגנים"
      },
      {
        name: "אנרג'י טעמי",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות",
        description: "חטיף דגנים עם שברי עוגיות"
      },
      {
        name: "אסימינה",
        firstBlessing: "העץ",
        lastBlessing: "נפשות",
        description: "פרי טרופי, צבעו צהוב וקליפתו ירוקה"
      },
      {
        name: "אסלי",
        firstBlessing: "מזונות",
        lastBlessing: "על המחיה",
        description: "חטיף מקמח חיטה"
      },
      {
        name: "אספרגוס",
        firstBlessing: "אדמה",
        lastBlessing: "נפשות"
      },
      {
        name: "אפונה",
        firstBlessing: "",
        lastBlessing: "",
        description: "מבושל האדמה, חי שהכל, ואם בירך האדמה יצא"
      },
      {
        name: "אפרופו",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות"
      },
      {
        name: "אפרסמון",
        firstBlessing: "העץ",
        lastBlessing: "נפשות",
        description: "בחצי פרי יש ודאי כזית"
      },
      {
        name: "אפרסק",
        firstBlessing: "העץ",
        lastBlessing: "נפשות",
        description: "בחצי פרי גודל בינוני יש כזית"
      },
      {
        name: "אפרשזיף",
        firstBlessing: "העץ",
        lastBlessing: "נפשות",
        description: "בחצי פרי גודל בינוני יש כזית"
      },
      {
        name: "אצבעות וופל",
        firstBlessing: "מזונות",
        lastBlessing: "",
        description: "לענין ברכה אחרונה, אם אכל 70-80 גרם, יברך על המחיה, פחות מזה יברך נפשות"
      },
      {
        name: "אצבעות שוקולד",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות"
      },
      {
        name: "אצות ים",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות",
        description: "לפי שאין להם יניקה מהקרקע ודינם כדין פטריות. בדרך כלל אצות ים נאכלים כטפל למאכל אחר ולכן נפטרים בברכת אותו מאכל, אך אם אכלם בפני עצמם ונהנה בטעמם אף בדוחק, מברך שהכל"
      },
      {
        name: "ארוניה",
        firstBlessing: "העץ",
        lastBlessing: "נפשות",
        description: "פרי יער חמצמץ"
      },
      {
        name: "ארטיק",
        firstBlessing: "שהכל",
        lastBlessing: "",
        description: "בני אשכנז נוהגים לברך נפשות אם אכל 27 גרם תוך 4 דקות. ובני ספרד נוהגים שלא לברך נפשות בשום מצב"
      },
      {
        name: "ארטיק ממיץ ענבים",
        firstBlessing: "שהכל",
        lastBlessing: "",
        description: "לענין ברכה אחרונה, ראה ארטיק"
      },
      {
        name: "ארטישוק",
        firstBlessing: "",
        lastBlessing: "",
        description: "מבושל האדמה, חי שהכל, ואם בירך האדמה יצא"
      },
      {
        name: "ארטישוק עם בשר",
        firstBlessing: "אדמה",
        lastBlessing: "נפשות",
        description: "וטוב לברך שתי ברכות"
      },
      {
        name: "אשחר",
        firstBlessing: "העץ",
        lastBlessing: "נפשות",
        description: "פרי בר הנאכל כשהוא חי"
      },
      {
        name: "אשכולית",
        firstBlessing: "העץ",
        lastBlessing: "נפשות",
        description: "בשני פלחים יש שיעור כזית"
      },
      {
        name: "אשכולית קליפה",
        firstBlessing: "שהכל",
        lastBlessing: "",
        description: "הקליפה הלבנה והחיצונית"
      },
      {
        name: "אשל",
        firstBlessing: "שהכל",
        lastBlessing: "",
        description: "בורא נפשות אם שתה רביעית (81 גרם) תוך 3-4 שניות. אכלו מוצק, ראה מעדן מוצק"
      },
      {
        name: "אתרוג",
        firstBlessing: "",
        lastBlessing: "",
        description: "מבושל העץ. לא מבושל, אם הוא מר, שהכל, אם הוא מתוק, העץ"
      },
      {
        name: "אתרוג קליפה",
        firstBlessing: "העץ",
        lastBlessing: ""
      }
    ]
  },
  // ב
  {
    title: "ב",
    blessings: [
      {
        name: "באגט",
        firstBlessing: "המוציא",
        lastBlessing: "ברכת המזון",
        description: "אף שכולו קשה ונכסס"
      },
      {
        name: "באגט טוסט",
        firstBlessing: "המוציא",
        lastBlessing: "ברכת המזון"
      },
      {
        name: "באגט קראנצ'",
        firstBlessing: "מזונות",
        lastBlessing: "על המחיה",
        description: "אם קבע סעודתו (216 גרם) המוציא וברכת המזון, כולל נטילת ידיים עם ברכה"
      },
      {
        name: "באגסי",
        firstBlessing: "מזונות",
        lastBlessing: "על המחיה",
        description: "חטיפי העמק. אחוזי הדגן שבו הם כ-55 אחוז, ולכן כדי לברך על המחיה צריך לאכול כ-30 גרם וטוב להחמיר ולאכול כ-40 גרם"
      },
      {
        name: "באולינג",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות",
        description: "חטיף מקמח תירס"
      },
      {
        name: "באלי",
        firstBlessing: "מזונות",
        lastBlessing: "על המחיה",
        description: "חטיפים ממין דגן"
      },
      {
        name: "באפי",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות",
        description: "חטיף מקמח תירס"
      },
      {
        name: "בבקו",
        firstBlessing: "אדמה",
        lastBlessing: "נפשות",
        description: "פרי שצבעו ירוק – צהוב, צורתו מאורכת, דומה בגידולו לפפאיה"
      },
      {
        name: "בואנו",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות",
        description: "חטיף שוקולד"
      },
      {
        name: "בובי",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות",
        description: "חטיף מקמח תירס"
      },
      {
        name: "בוגי",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות"
      },
      {
        name: "בוטו",
        firstBlessing: "אדמה",
        lastBlessing: "נפשות",
        description: "פרי אקזוטי, צבעו ירוק, מקורו באפריקה"
      },
      {
        name: "בוטן אמריקאי",
        firstBlessing: "מזונות",
        lastBlessing: "",
        description: "ברכה אחרונה, ראה אלמנדוס"
      },
      {
        name: "בוטנים",
        firstBlessing: "אדמה",
        lastBlessing: "",
        description: "בורא פרי האדמה גם כשאינם קלויים"
      },
      {
        name: "בוטנים ממתק",
        firstBlessing: "אדמה",
        lastBlessing: "נפשות"
      },
      {
        name: "בוטנים מסוכרים",
        firstBlessing: "אדמה",
        lastBlessing: "נפשות"
      },
      {
        name: "בולי",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות",
        description: "חטיף תירס ובוטנים"
      },
      {
        name: "בום",
        firstBlessing: "מזונות",
        lastBlessing: "",
        description: "וופל מצופה. לענין ברכה אחרונה, אם אכל 70-80 גרם, יברך על המחיה, פחות מזה יברך נפשות"
      },
      {
        name: "בום",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות",
        description: "חטיף מקמח תפוח אדמה"
      },
      {
        name: "בונבון",
        firstBlessing: "מזונות",
        lastBlessing: "",
        description: "חטיף וופלה ממולא בקרם. אין רגילות לאכול כמות כה גדולה כדי שיהא ניתן לברך על המחיה, מאידך גם אין רגילות לאכול כמות כזו שיהיה שיעור כזית רק במילוי. אך ניתן לצרף את המילוי לוופלה ולברך בורא נפשות לדעת רבים מהפוסקים. לשם כך צריך לאכול 2-3 יחידות"
      },
      {
        name: "בונביס",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות",
        description: "חטיף מקמח תירס עם אגוזים ושוקולד"
      },
      {
        name: "בונוס",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות",
        description: "חטיף מקמח תירס"
      },
      {
        name: "בונוסים",
        firstBlessing: "מזונות",
        lastBlessing: "",
        description: "אם אכל 50-60 גרם מברך על המחיה, אכל פחות מזה אך יותר מ-27 גרם נחלקו הפוסקים אם יברך נפשות או לא יברך כלל. גם בקביעות סעודה (216 גרם ויותר) מברך רק על המחיה, דאין עליהם תורת פת מחמת דקותן"
      },
      {
        name: "בוני",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות",
        description: "חטיף בוטנים"
      },
      {
        name: "בוען מצולע",
        firstBlessing: "אדמה",
        lastBlessing: "נפשות",
        description: "פרי בר, צבעו סגול – צהבהב, נאכל חי ומבושל"
      },
      {
        name: "בורגול",
        firstBlessing: "מזונות",
        lastBlessing: "על המחיה",
        description: "ג'רישה"
      },
      {
        name: "בוריטי",
        firstBlessing: "העץ",
        lastBlessing: "נפשות",
        description: "פרי טרופי דומה לליצ'י"
      },
      {
        name: "בוריקה",
        firstBlessing: "מזונות",
        lastBlessing: "על המחיה",
        description: "בצק ממין דגן ממולא בתבשילים. גם אם קבע סעודתו עליו היות ומטגנים אותו בשמן עמוק"
      },
      {
        name: "בורקס",
        firstBlessing: "מזונות",
        lastBlessing: "",
        description: "לאחריו על המחיה אם אכל בורקס אחד בינוני ואף במעט פחות (המילוי לא מצטרף), טוב להחמיר ולאכול בורקס ורבע. אם אכל שלושת רבעי בורקס, נחלקו הפוסקים אם יברך נפשות או לא יברך כלל"
      },
      {
        name: "בייגלה",
        firstBlessing: "מזונות",
        lastBlessing: "",
        description: "אם אכל 27 גרם (כ-8 בייגלך) מברך על המחיה"
      },
      {
        name: "ביסלי",
        firstBlessing: "מזונות",
        lastBlessing: "",
        description: "אם אכל 27 גרם (כשליש שקית) מברך על המחיה"
      },
      {
        name: "ביסקוויט",
        firstBlessing: "מזונות",
        lastBlessing: "",
        description: "אם אכל 30 גרם (כ-6 ביסקוויטים) מברך על המחיה"
      },
      {
        name: "ביצה",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות",
        description: "בין חיה בין מבושלת"
      },
      {
        name: "ביצת דג",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות"
      },
      {
        name: "בירה",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות",
        description: "אם שתה רביעית (81 גרם) בבת אחת או תוך כדי אכילת פרס"
      },
      {
        name: "בירה שחורה",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות",
        description: "אם שתה רביעית (81 גרם) בבת אחת או תוך כדי אכילת פרס"
      },
      {
        name: "בית יוסף",
        firstBlessing: "מזונות",
        lastBlessing: "",
        description: "אם אכל 27 גרם (כ-8 יחידות) מברך על המחיה"
      },
      {
        name: "בלינצ'ס",
        firstBlessing: "מזונות",
        lastBlessing: "על המחיה",
        description: "אף אם קבע סעודתו עליו"
      },
      {
        name: "במבה",
        firstBlessing: "אדמה",
        lastBlessing: "נפשות",
        description: "אף שמעורב בה מעט קמח"
      },
      {
        name: "בננה",
        firstBlessing: "העץ",
        lastBlessing: "נפשות",
        description: "אף שגדל כל שנה מחדש"
      },
      {
        name: "בננה צ'יפס",
        firstBlessing: "העץ",
        lastBlessing: "נפשות"
      },
      {
        name: "בצל",
        firstBlessing: "אדמה",
        lastBlessing: "נפשות"
      },
      {
        name: "בצק",
        firstBlessing: "מזונות",
        lastBlessing: "",
        description: "אם אכל 27 גרם מברך על המחיה"
      },
      {
        name: "בצק סוכר",
        firstBlessing: "מזונות",
        lastBlessing: "",
        description: "אם אכל 27 גרם מברך על המחיה"
      },
      {
        name: "בצק עלים",
        firstBlessing: "מזונות",
        lastBlessing: "",
        description: "אם אכל 27 גרם מברך על המחיה"
      },
      {
        name: "בצק שקדים",
        firstBlessing: "מזונות",
        lastBlessing: "",
        description: "אם אכל 27 גרם מברך על המחיה"
      },
      {
        name: "בקלאווה",
        firstBlessing: "מזונות",
        lastBlessing: "",
        description: "אם אכל 27 גרם מברך על המחיה"
      },
      {
        name: "ברוקולי",
        firstBlessing: "אדמה",
        lastBlessing: "נפשות"
      },
      {
        name: "ברנפלקס",
        firstBlessing: "מזונות",
        lastBlessing: "",
        description: "אם אכל 27 גרם מברך על המחיה"
      },
      {
        name: "ברנפלקס מייפל (חברת תלמה שפע)",
        firstBlessing: "מזונות",
        lastBlessing: "",
        description: "ברכה אחרונה, ראה ברנפלקס"
      },
      {
        name: "ברנפלקס נשנושים (חברת תלמה שפע)",
        firstBlessing: "מזונות",
        lastBlessing: "",
        description: "ברכה אחרונה, ראה ברנפלקס"
      },
      {
        name: "ברקטים",
        firstBlessing: "מזונות",
        lastBlessing: "על המחיה",
        description: "מאפה מבצק עלים עשוי כעין צלחת ונותנים לתוכו לפתן, סלטים וכדו'. אם כל מין נאכל בפני עצמו, שתי ברכות תחילה וסוף. אם נאכלים יחד, גם יברך שתי ברכות היות ולא נאפו יחד ויכווין במזונות שלא לפטור את הלפתן, וכן יעשה בברכה אחרונה שיכווין בעל המחיה לא לפטור את הלפתן וכדו' ויברך גם עליו בורא נפשות"
      },
      {
        name: "בשר",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות"
      },
      {
        name: "בשר עם חומוס",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות"
      },
      {
        name: "בשר צמחי ונקניקיות",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות"
      },
      {
        name: "בשר שמן ושתה יין להעביר השמנונית",
        firstBlessing: "שהכל",
        lastBlessing: "נפשות",
        description: "אם הוא בתוך הסעודה אינו מברך כלל"
      }
    ]
  },
  guimelBrachot, // ג
  dalethBrachot, // ד
  heyBrachot,    // ה
  vavBrachot,    // ו
  zayinBrachot,  // ז
  chetBrachot,   // ח
  tetBrachot,    // ט
  yodBrachot,    // י
  kafBrachot,    // כ
  lamedBrachot,  // ל
  memBrachot,    // מ
  nunBrachot,    // נ
  samechBrachot, // ס
  ayinBrachot,   // ע
  peBrachot,     // פ
  tzadiBrachot,  // צ
  kufBrachot,    // ק
  reshBrachot,   // ר
  shinBrachot,   // ש
  tavBrachot     // ת
];
