import { ShehecheyanuItem } from '../shehecheyanu';

export const SamechItems: ShehecheyanuItem = {
    lettre: 'ס',
    items: [
        {
            nom: "סברס",
            benediction: {
                statut: true,
                texte: "מברך"
            },
            infestation: {
                texte: "נקי מחרקים. אם הפרי רך מדאי באיזור מסויים יש לחתוך את אותו המקום ובמידה ונמצאה נגיעות יש לבדוק את כל הפירות"
            }
        },
        {
            nom: "סלק",
            benediction: {
                statut: false,
                texte: "אין לברך משום שמצוי כל השנה"
            },
            infestation: {
                texte: "יש לחותכו בראשו לרוחב ולראות אם יש סימני נבירה"
            }
        },
        {
            nom: "סלרי",
            benediction: {
                statut: false,
                texte: "אין לברך משום שמצוי כל השנה"
            },
            infestation: {
                texte: "נגוע בחרקים רבים, יש לקנות רק בכשרות מהודרת ולשוטפו כפי ההוראות שבאריזה. שורש הסלרי בחזקת נקי מחרקים"
            }
        }
    ]
};
