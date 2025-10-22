import { ShehecheyanuItem } from '../shehecheyanu';

export const shinItems: ShehecheyanuItem = {
    lettre: 'ש',
    items: [
        {
            nom: "שום",
            benediction: {
                statut: false,
                texte: "אין לברך משום שמצוי כל השנה"
            },
            infestation: {
                texte: "טרי עם העלים, נקי מחרקים. יבש יש לקולפו ולשטוף את שיני השום תחת זרם מים. אם מבחינים בפירורים של זחלים או שהשום רך מדאי יש לזרוק את אותו חלק"
            }
        },
        {
            nom: "שומר",
            benediction: {
                statut: false,
                texte: "לא נהגו לברך. הרוצה לברך רשאי"
            },
            infestation: {
                texte: "העלים הירוקים נגועים מאוד ויש לזורקם. את השכבות העליונות יש להוריד ולבודקם מול האור, או להשרותם חמש דקות במים עם חומר השריה ולשוטפם היטב בזרם המים. השמיר נגוע מאוד ויש לקנות רק בכשרות מהודרת"
            }
        },
        {
            nom: "שומשום",
            benediction: {
                statut: false,
                texte: "אין לברך משום שמצוי כל השנה"
            },
            infestation: {
                texte: "נקי מחרקים"
            }
        },
        {
            nom: "שזיף",
            benediction: {
                statut: true,
                texte: "מברך רק על הזן שאוכל ראשון. שכח ולא בירך יברך על הזן האחר"
            },
            infestation: {
                texte: "יש לשטוף חיצונית את הפרי, אם ניכרים סימני כנימות יש לגרדם בשפשוף קל. פרי רך מדאי יש לחצותו ולהתבונן בבשר הפרי"
            }
        },
        {
            nom: "שסק",
            benediction: {
                statut: true,
                texte: "מברך"
            },
            infestation: {
                texte: "נקי מחרקים. כתמים בקליפה אינם סימן לנגיעות"
            }
        },
        {
            nom: "שעועית ירוקה טריה",
            benediction: {
                statut: false,
                texte: "לא נהגו לברך. הרוצה לברך רשאי ובתנאי שמרגיש היטב הבדל בטעם בין טרי לקפוא"
            },
            infestation: {
                texte: "לשטוף היטב את התרמילים תחת זרם מים חזק ולהתבונן שאין סימני חדירה. קפוא, נקי מחרקים. שעועית צהובה קפואה יש לקנות רק בכשרות מהודרת. בשקיות (כל הצבעים) – להתבונן חיצונית. אריזת וואקום נקי"
            }
        },
        {
            nom: "שקדים",
            benediction: {
                statut: false,
                texte: "אין לברך"
            },
            infestation: {
                texte: "נגיעותם ובדיקתם, ראה אגוזים"
            }
        },
        {
            nom: "שקדים ירוקים",
            benediction: {
                statut: false,
                texte: "אין לברך"
            },
            infestation: {
                texte: "נקי מחרקים"
            }
        }
    ]
};
