import { ShehecheyanuItem } from '../shehecheyanu';

export const ayinItems: ShehecheyanuItem = {
    lettre: 'ע',
    items: [
        {
            nom: "עגבניה",
            benediction: {
                statut: false,
                texte: "אין לברך משום שמצויה כל השנה"
            },
            infestation: {
                texte: "נקיה מחרקים. טיב ירוד יש להתבונן מבחוץ ובפרט תחת העלים שאין סימני מחילות"
            }
        },
        {
            nom: "עדשים",
            benediction: {
                statut: false,
                texte: "אין לברך משום שמצויים כל השנה"
            },
            infestation: {
                texte: "יש לבדוק קלות לפני השימוש שאין ביניהם חרקים"
            }
        },
        {
            nom: "עוגה עם חתיכות פרי חדש",
            benediction: {
                statut: true,
                texte: "יאכל מעט מהפרי לבד ויברך"
            }
        },
        {
            nom: "עולשים",
            benediction: {
                statut: false,
                texte: "אין לברך משום שמצויים כל השנה"
            },
            infestation: {
                texte: "יש להפריד את העלים להשרותם במים עם חומר השרייה למשך חמש דקות, לשפשף היטב את העלים באמצעות ספוג רך ולהתבונן מול מקור אור שלא נותרו חרקים"
            }
        },
        {
            nom: "ענבי הדס",
            benediction: {
                statut: false,
                texte: "אין לברך"
            },
            infestation: {
                texte: "ראה גרעיני פירות"
            }
        },
        {
            nom: "ענבים",
            benediction: {
                statut: true,
                texte: "מברך רק על הזן שאוכל ראשון. שכח ולא בירך יברך על הזן האחר"
            },
            infestation: {
                texte: "שוטפים היטב ומסתכלים על כל ענב, אם רואים כתם כהה חותכים שם ובודקים אם יש תולעת בתוכו"
            }
        },
        {
            nom: "ערמונים טריים קלויים",
            benediction: {
                statut: true,
                texte: "מברך"
            },
            infestation: {
                texte: "לחצות ולבדוק מבפנים אם יש תולעת או פירורים כהים, ניתן לבדוק גם אחרי הבישול"
            }
        },
        {
            nom: "ערמונים קלויים בשקיות",
            benediction: {
                statut: false,
                texte: "אין לברך"
            },
            infestation: {
                texte: "נקי מחרקים באריזה הרמטית"
            }
        }
    ]
};
