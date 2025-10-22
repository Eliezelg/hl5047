import { ShehecheyanuItem } from '../shehecheyanu';

export const HethItems: ShehecheyanuItem = {
    lettre: 'ח',
    items: [
        {
            nom: "חבוש",
            benediction: {
                statut: true,
                texte: "מברך"
            },
            infestation: {
                texte: "תוצרת חו\"ל (קליפה צהובה חלקה) – נקי מחרקים. תוצרת הארץ – יש לחצות את הפרי ולבדוק אם יש זחל או מחילה עם פירורים כהים ולהסיר את האזור הנגוע"
            }
        },
        {
            nom: "חומוס",
            benediction: {
                statut: false,
                texte: "אין לברך משום שמצוי כל השנה"
            },
            infestation: {
                texte: "שימורים – נקי מחרקים. בשקיות – יש להתבונן חיצונית. אריזת וואקום נקי"
            }
        },
        {
            nom: "חמוציות",
            benediction: {
                statut: false,
                texte: "אין לברך משום שמצוי כל השנה"
            },
            infestation: {
                texte: "נקי מחרקים. אם הפרי רך מדאי יש לחצותו ולבודקו שאינו נגוע"
            }
        },
        {
            nom: "חסה",
            benediction: {
                statut: false,
                texte: "אין לברך משום שמצויה כל השנה"
            },
            infestation: {
                texte: "נגועה בחרקים, יש לקנות רק בכשרות מהודרת ולשוטפה כפי ההוראות שבאריזה"
            }
        },
        {
            nom: "חציל",
            benediction: {
                statut: false,
                texte: "אין לברך משום שמצוי כל השנה"
            },
            infestation: {
                texte: "יש לבדוק חזותית שאין סימני כירסום, נמצאו סימנים יש להסיר את המקום הנגוע, ולחתוך את עלי הכותרת עם מעט מבשר הפרי ולראות שאין סימני מחילה"
            }
        },
        {
            nom: "חרוב",
            benediction: {
                statut: false,
                texte: "אין לברך, דאין הבדל בין חדש לישן וגם שנועד בעיקר למאכל בהמה"
            },
            infestation: {
                texte: "לשטוף היטב, לשבור לחתיכות קטנות (2 ס\"מ) ולבדוק אם מצויים פירורים, קורי משי או תולעים וחרקים"
            }
        }
    ]
};
