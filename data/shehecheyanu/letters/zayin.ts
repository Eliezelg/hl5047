import { ShehecheyanuItem } from '../shehecheyanu';

export const zayinItems: ShehecheyanuItem = {
    lettre: 'ז',
    items: [
        {
            nom: "זיתים",
            benediction: {
                statut: false,
                texte: "אין לברך גם לא על כבישה ביתית"
            },
            infestation: {
                texte: "אם יש כתם כהה, לחצות ולהתבונן אם יש מחילה בתוך הזית. זיתים שחורים – יש לחצות ולבדוק. טבעות זיתים – לשטוח על צלחת ולבדוק אם מצויה מחילה או תולעת"
            }
        },
        {
            nom: "זנגביל",
            benediction: {
                statut: false,
                texte: "אין לברך משום שמצוי כל השנה"
            },
            infestation: {
                texte: "נקי מחרקים"
            }
        },
        {
            nom: "זעתר",
            benediction: {
                statut: false,
                texte: "אין לברך משום שמצוי כל השנה"
            },
            infestation: {
                texte: "טחון נקי מחרקים"
            }
        }
    ]
};
