#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re

def remove_footnotes(text):
    """Remove superscript footnote numbers"""
    return re.sub(r'[⁰¹²³⁴⁵⁶⁷⁸⁹]+', '', text).replace('1', '').replace('2', '').replace('3', '').replace('4', '').replace('5', '').replace('6', '').replace('7', '').replace('8', '').replace('9', '').replace('0', '')

def parse_entry(line):
    """Parse a single muktzeh entry"""
    # Remove line numbers if present
    line = re.sub(r'^\s*\d+→', '', line).strip()

    # Split by hyphen to get name and rest
    parts = line.split(' - ', 1)
    if len(parts) < 2:
        return None

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
        # Try to extract status
        status_keywords = [
            'מוקצה מחמת גופו',
            'מוקצה מחמת חסרון כיס',
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
                if remaining.startswith(','):
                    remaining = remaining[1:].strip()
                if remaining:
                    description = remaining
                break

    # Remove footnote numbers
    name = remove_footnotes(name)
    status = remove_footnotes(status)
    source = remove_footnotes(source)
    description = remove_footnotes(description)

    # Escape quotes in source
    source = source.replace('"', '\\"')

    return {
        'name': name,
        'status': status,
        'source': source,
        'description': description
    }

def main():
    with open('/home/eli/Documents/hl5047/docs/mem muktzeh.ini', 'r', encoding='utf-8') as f:
        lines = [line.strip() for line in f if line.strip()]

    entries = []
    for line in lines:
        entry = parse_entry(line)
        if entry:
            entries.append(entry)

    # Generate TypeScript
    ts_lines = [
        'export const memMuktzeh = {',
        '  title: "מ",',
        '  letter: "מ",',
        '  items: ['
    ]

    for i, entry in enumerate(entries):
        ts_lines.append('    {')
        ts_lines.append(f'      name: "{entry["name"]}",')
        ts_lines.append(f'      status: "{entry["status"]}",')
        ts_lines.append(f'      source: "{entry["source"]}"')
        if entry['description']:
            ts_lines.append(f',      description: "{entry["description"]}"')
        ts_lines.append('    }' + (',' if i < len(entries) - 1 else ''))

    ts_lines.append('  ]')
    ts_lines.append('};')

    # Write output
    with open('/home/eli/Documents/hl5047/data/muktzeh/letters/mem.ts', 'w', encoding='utf-8') as f:
        f.write('\n'.join(ts_lines) + '\n')

    print(f"Created mem.ts with {len(entries)} entries")

if __name__ == '__main__':
    main()
