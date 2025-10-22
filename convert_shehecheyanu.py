#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
import os

# Mapping des lettres hébraïques vers les noms de fichiers
LETTER_NAMES = {
    'א': 'Alef',
    'ב': 'Beth',
    'ג': 'Gimel',
    'ד': 'Daleth',
    'ה': 'He',
    'ו': 'Vav',
    'ז': 'Zayin',
    'ח': 'Heth',
    'ט': 'Tet',
    'י': 'Yod',
    'כ': 'Kaf',
    'ל': 'Lamed',
    'מ': 'Mem',
    'נ': 'Noun',
    'ס': 'Samech',
    'ע': 'Ayin',
    'פ': 'Pe',
    'צ': 'Tzadik',
    'ק': 'Kouf',
    'ר': 'Resh',
    'ש': 'Shin',
    'ת': 'Tav'
}

def parse_ini_file(filepath):
    """Parse le fichier INI et retourne un dictionnaire des lettres et leurs items"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    letters = {}
    current_letter = None

    lines = content.split('\n')

    for line in lines:
        line = line.strip()

        # Détection d'une nouvelle lettre (ligne avec juste une lettre hébraïque)
        if line in LETTER_NAMES.keys():
            current_letter = line
            letters[current_letter] = []
        elif current_letter and line and '–' in line:
            # Parse l'entrée (format: nom – benediction. infestation)
            letters[current_letter].append(line)

    return letters

def parse_item(item_line):
    """Parse une ligne d'item et retourne un dictionnaire"""
    # Séparer le nom et le reste
    parts = item_line.split(' – ', 1)
    if len(parts) < 2:
        return None

    nom = parts[0].strip()
    rest = parts[1].strip()

    # Déterminer si c'est "מברך" ou "אין לברך"
    if rest.startswith('מברך'):
        statut = True
        texte_benediction = rest.split('.')[0].strip()
        # Le reste après le premier point est l'infestation
        remaining = '.'.join(rest.split('.')[1:]).strip()
    elif rest.startswith('אין לברך'):
        statut = False
        # Extraire le texte de bénédiction jusqu'au premier point
        texte_benediction = rest.split('.')[0].strip()
        remaining = '.'.join(rest.split('.')[1:]).strip()
    elif rest.startswith('לא נהגו לברך'):
        statut = False
        texte_benediction = rest.split('.')[0].strip()
        remaining = '.'.join(rest.split('.')[1:]).strip()
    else:
        # Cas par défaut
        statut = False
        texte_benediction = rest.split('.')[0].strip()
        remaining = '.'.join(rest.split('.')[1:]).strip()

    # L'infestation est tout ce qui reste
    infestation = remaining.strip() if remaining else None

    item = {
        'nom': nom,
        'benediction': {
            'statut': statut,
            'texte': texte_benediction
        }
    }

    if infestation:
        item['infestation'] = {
            'texte': infestation
        }

    return item

def escape_string(s):
    """Échappe les caractères spéciaux pour TypeScript"""
    # Remplacer les backslashes
    s = s.replace('\\', '\\\\')
    # Remplacer les guillemets doubles
    s = s.replace('"', '\\"')
    return s

def generate_typescript_file(letter, items, output_dir):
    """Génère un fichier TypeScript pour une lettre donnée"""
    letter_name = LETTER_NAMES.get(letter)
    if not letter_name:
        return

    filename = f"{letter_name}.ts"
    filepath = os.path.join(output_dir, filename)

    # Générer le contenu du fichier
    lines = [
        "import { ShehecheyanuItem } from '../shehecheyanu';",
        "",
        f"export const {letter_name}Items: ShehecheyanuItem = {{",
        f"    lettre: '{letter}',",
        "    items: ["
    ]

    parsed_items = []
    for item_line in items:
        item = parse_item(item_line)
        if item:
            parsed_items.append(item)

    for i, item in enumerate(parsed_items):
        lines.append("        {")
        lines.append(f'            nom: "{escape_string(item["nom"])}",')
        lines.append("            benediction: {")
        lines.append(f'                statut: {"true" if item["benediction"]["statut"] else "false"},')
        lines.append(f'                texte: "{escape_string(item["benediction"]["texte"])}"')
        lines.append("            }")

        if 'infestation' in item:
            lines.append(",")
            lines.append("            infestation: {")
            lines.append(f'                texte: "{escape_string(item["infestation"]["texte"])}"')
            lines.append("            }")

        if i < len(parsed_items) - 1:
            lines.append("        },")
        else:
            lines.append("        }")

    lines.append("    ]")
    lines.append("};")
    lines.append("")

    # Écrire le fichier
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))

    print(f"✓ Créé: {filename}")

def main():
    ini_file = 'docs/sheheyanou perot.ini'
    output_dir = 'data/shehecheyanu/letters'

    # Parser le fichier INI
    print("Parsing du fichier INI...")
    letters = parse_ini_file(ini_file)

    print(f"Trouvé {len(letters)} lettres")

    # Créer le dossier de sortie s'il n'existe pas
    os.makedirs(output_dir, exist_ok=True)

    # Générer les fichiers TypeScript
    print("\nGénération des fichiers TypeScript...")
    for letter, items in sorted(letters.items()):
        generate_typescript_file(letter, items, output_dir)

    print(f"\n✓ Terminé! {len(letters)} fichiers créés dans {output_dir}")

if __name__ == '__main__':
    main()
