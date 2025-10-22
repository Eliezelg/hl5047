import { ShehecheyanuItem } from '../shehecheyanu';

export const YodItems: ShehecheyanuItem = {
    lettre: 'י',
    items: [
        {
            nom: "יין",
            benediction: {
                statut: false,
                texte: "אין לברך"
            },
            infestation: {
                texte: "נקי מחרקים"
            }
        },
        {
            nom: "ירקות (רוב הסוגים)",
            benediction: {
                statut: false,
                texte: "אין לברך"
            },
            infestation: {
                texte: "מלפפונים ועגבניות נקיים מחרקים. עגבניה מטיב ירוד יש להתבונן מבחוץ ובפרט תחת העלים שאין סימני מחילות"
            }
        }
    ]
};
