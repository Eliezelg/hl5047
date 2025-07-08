import { ShehecheyanuItem } from '../shehecheyanu';

export const reshItems: ShehecheyanuItem = {
    lettre: 'ר',
    items: [
        {
            nom: "ראיית פרי",
            benediction: {
                statut: false,
                texte: "אין לברך אף אם אין דעתו לאוכלו"
            }
        },
        {
            nom: "רוביא טרי",
            benediction: {
                statut: false,
                texte: "לא נהגו לברך. הרוצה לברך רשאי ובתנאי שמרגיש היטב הבדל בטעם בין טרי לקפוא"
            },
            infestation: {
                texte: "לשטוף היטב את התרמילים תחת זרם מים חזק ולהתבונן שאין סימני חדירה. קפוא, נקי מחרקים"
            }
        },
        {
            nom: "ריח מעצים ועשבים המתחדשים",
            benediction: {
                statut: false,
                texte: "אין לברך"
            }
        },
        {
            nom: "רימון",
            benediction: {
                statut: true,
                texte: "מברך"
            },
            infestation: {
                texte: "אם יש נקב בקליפה יש לפתוח ולבדוק אם יש תולעת. בעת פירוק הגרגירים יש להתבונן אם מצויות רימות לבנות קטנות או תולעת חומה בין הגרגירים. פס חום על הגרגיר אינו סימן לנגיעות"
            }
        }
    ]
};
