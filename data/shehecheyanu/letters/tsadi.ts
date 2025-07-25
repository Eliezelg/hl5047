import { ShehecheyanuItem } from '../shehecheyanu';

export const tsadiItems: ShehecheyanuItem = {
    lettre: 'צ',
    items: [
        {
            nom: "צימוקים",
            benediction: {
                statut: false,
                texte: "אין לברך דמצויים כל השנה"
            },
            infestation: {
                texte: "יש בהם נגיעות פנימית, ולכן עדיף להשתמש כתחליף בחמוציות. אם רוצים להשתמש דוקא בצימוקים יש להעדיף לקנות בכשרות מהודרת שעוברים בדיקת מדגם כגון עדה החרדית, להשרותם במים חמים כרבע שעה, לערבב ולהעביר את המים העליונים לצלחת לבנה, אם נמצאו תולעים או חרקים חומים במים, אין להשתמש בצימוקים, אם לא נמצאה נגיעות יש לשוטפם היטב בזרם המים"
            }
        },
        {
            nom: "צנובר",
            benediction: {
                statut: false,
                texte: "אין לברך דמצוי כל השנה"
            },
            infestation: {
                texte: "יש לבודקם ביניהם ועל גביהם שאין סימנים של פירורים, קורים ואבקה, די בבדיקת מדגם"
            }
        },
        {
            nom: "צנון צנונית",
            benediction: {
                statut: false,
                texte: "אין לברך משום שמצויים כל השנה"
            },
            infestation: {
                texte: "יש להתבונן מבחוץ שאין סימני מחילות לתוך הצנון, לחתוך את הצנון בראשו חתך לרוחב הצנון ולראות שאין סימני נבירה. הכתמים על הצנון אינם סימן נגיעות"
            }
        }
    ]
};
