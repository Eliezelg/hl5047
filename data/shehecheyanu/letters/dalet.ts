import { ShehecheyanuItem } from '../shehecheyanu';

export const daletItems: ShehecheyanuItem = {
    lettre: 'ד',
    items: [
        {
            nom: "דבש",
            benediction: {
                statut: false,
                texte: "אין לברך משום שמצוי כל השנה"
            },
            infestation: {
                texte: "נקי מחרקים"
            }
        },
        {
            nom: "דובדבן",
            benediction: {
                statut: true,
                texte: "מברך רק על הזן שאוכל ראשון. שכח ולא בירך יברך על הזן האחר"
            },
            infestation: {
                texte: "נקי מחרקים רק תוצרת ארץ ישראל. מסוכרים ללא חרצנים – בדיקת מדגם כעשרה אחוז על ידי חצייתם, אם נמצא נגיעות יש לבדוק את כולם. בסירופ – תוצרת אירופה המתוקים יש לפתוח כל אחד ולבדוק, החמוצים נקיים. תוצרת ארה\"ב, נקיים. מיובשים עם החרצן – בדיקתם קשה. מיובשים ללא החרצן – תוצרת ארה\"ב בלבד בחזקת נקי"
            }
        },
        {
            nom: "דלורית",
            benediction: {
                statut: false,
                texte: "אין לברך משום שמצוי כל השנה"
            },
            infestation: {
                texte: "נקיה מחרקים"
            }
        },
        {
            nom: "דלעת",
            benediction: {
                statut: false,
                texte: "אין לברך משום שמצוי כל השנה"
            },
            infestation: {
                texte: "נקיה מחרקים"
            }
        }
    ]
};
