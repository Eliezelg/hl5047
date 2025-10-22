import { ShehecheyanuItem } from '../shehecheyanu';

export const NounItems: ShehecheyanuItem = {
    lettre: 'נ',
    items: [
        {
            nom: "נבטים (כל הסוגים)",
            benediction: {
                statut: false,
                texte: "אין לברך משום שמצוי כל השנה"
            },
            infestation: {
                texte: "נקי מחרקים, רצוי לבדוק מדגם. נבטוטים (עם הגרגיר) יש לבודקם במקום הגרגיר"
            }
        },
        {
            nom: "נענע",
            benediction: {
                statut: false,
                texte: "אין לברך משום שמצוי כל השנה"
            },
            infestation: {
                texte: "יש לקנות רק בכשרות מהודרת ולשוטפה כפי ההוראות שבאריזה"
            }
        },
        {
            nom: "נקטרינה",
            benediction: {
                statut: true,
                texte: "מברך אם לא בירך על אפרסק"
            },
            infestation: {
                texte: "יש להתבונן סביב הפרי אם ניכרים סימני מציצה של הכנימה ובמידה וישנם יש לשפשף קלות. פרי רך יש לחותכו במקום הרך ולהתבונן שאין זחלים. (כשיש נגיעות זחלים, מקום הנגיעות רך וכהה יותר). בפרי קשה די בחיתוך ראש הפרי לרוחב לוודא שאין סימני חדירת זחלים"
            }
        }
    ]
};
