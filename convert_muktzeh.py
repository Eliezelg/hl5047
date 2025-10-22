#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Universal muktzeh INI to TypeScript converter
"""
import re
import sys

def remove_footnotes(text):
    """Remove superscript footnote numbers and regular numbers at end"""
    # Remove superscript numbers
    text = re.sub(r'[⁰¹²³⁴⁵⁶⁷⁸⁹]+', '', text)
    # Remove regular numbers that appear to be footnotes (single digit at end before period or parenthesis)
    text = re.sub(r'\d+(?=\s*[.)]?\s*$)', '', text)
    text = re.sub(r'\d+(?=\s*\()', '', text)
    return text.strip()

def parse_entry(line):
    """Parse a single muktzeh entry"""
    # Remove line numbers if present
    line = re.sub(r'^\s*\d+→', '', line).strip()

    if not line:
        return None

    # Split by hyphen to get name and rest
    parts = line.split(' - ', 1)
    if len(parts) < 2:
        # Handle entries without hyphen
        return {
            'name': remove_footnotes(line),
            'status': '',
            'source': '',
            'description': ''
        }

    name = parts[0].strip()
    rest = parts[1].strip()

    # Extract source in parentheses at the end
    source_match = re.search(r'\(([^)]+)\)\.?\s*$', rest)
    source = ""
    if source_match:
        source = source_match.group(1)
        rest = rest[:source_match.start()].strip()
        if rest.endswith('.'):
            rest = rest[:-1].strip()

    # Determine status and description
    status = ""
    description = ""

    # Check for cross-references (ראה)
    if rest.startswith('ראה '):
        description = rest
        status = ""
    else:
        # Try to extract status (order matters - longest first)
        status_keywords = [
            'מוקצה מחמת חסרון כיס',
            'מוקצה מחמת גופו',
            'מוקצה מחמת איסור',
            'מוקצה מחמת מצוה',
            'מלאכתו לאיסור שאין בו היתר',
            'מלאכתו לאיסור',
            'מלאכתו להיתר',
            'מוקצה',
            'מותר',
            'אינו מוקצה',
            'אינה מוקצה',
            'אינם מוקצה'
        ]

        for keyword in status_keywords:
            if keyword in rest:
                status = keyword
                # Everything after status is description
                idx = rest.find(keyword) + len(keyword)
                remaining = rest[idx:].strip()
                # Remove leading comma or period
                while remaining and remaining[0] in ',.':
                    remaining = remaining[1:].strip()
                if remaining:
                    description = remaining
                break

    # Remove footnote numbers
    name = remove_footnotes(name)
    status = remove_footnotes(status)
    source = remove_footnotes(source)
    description = remove_footnotes(description)

    # Escape quotes in all fields
    name = name.replace('"', '\\"')
    status = status.replace('"', '\\"')
    source = source.replace('"', '\\"')
    description = description.replace('"', '\\"')

    return {
        'name': name,
        'status': status,
        'source': source,
        'description': description
    }

def convert_file(input_file, output_file, letter_name, letter_hebrew):
    """Convert a muktzeh INI file to TypeScript"""
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = [line.strip() for line in f if line.strip()]

    entries = []
    for line in lines:
        entry = parse_entry(line)
        if entry:
            entries.append(entry)

    # Generate TypeScript
    ts_lines = [
        f'export const {letter_name}Muktzeh = {{',
        f'  title: "{letter_hebrew}",',
        f'  letter: "{letter_hebrew}",',
        '  items: ['
    ]

    for i, entry in enumerate(entries):
        ts_lines.append('    {')
        ts_lines.append(f'      name: "{entry["name"]}",')
        ts_lines.append(f'      status: "{entry["status"]}",')
        if entry['description']:
            ts_lines.append(f'      source: "{entry["source"]}",')
            ts_lines.append(f'      description: "{entry["description"]}"')
        else:
            ts_lines.append(f'      source: "{entry["source"]}"')
        ts_lines.append('    }' + (',' if i < len(entries) - 1 else ''))

    ts_lines.append('  ]')
    ts_lines.append('};')

    # Write output
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(ts_lines) + '\n')

    print(f"Created {output_file} with {len(entries)} entries")
    return len(entries)

if __name__ == '__main__':
    # Convert nun
    convert_file(
        '/home/eli/Documents/hl5047/docs/noun muktzeh.ini',
        '/home/eli/Documents/hl5047/data/muktzeh/letters/nun.ts',
        'nun',
        'נ'
    )

    # Convert samech
    convert_file(
        '/home/eli/Documents/hl5047/docs/sameh muktzeh.ini',
        '/home/eli/Documents/hl5047/data/muktzeh/letters/samech.ts',
        'samech',
        'ס'
    )
